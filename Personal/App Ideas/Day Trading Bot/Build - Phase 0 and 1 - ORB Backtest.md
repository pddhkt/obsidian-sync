---
type: build-note
project: Day Trading Bot
status: draft
phase: 0-1
created: 2026-06-16
tags:
  - app-ideas
  - trading
  - build
---

# Build Note — Phase 0 & 1: Zero to a Runnable ORB Backtest

> [!info] What this note is
> A **DRAFT** developer guide that takes you from an empty machine to a runnable Opening Range Breakout (ORB) backtest, plus a paper-trading connection to Futu. Scope = [[Day Trading Bot|the design note]]'s **Phase 0 (Setup)** and **Phase 1 (Backtest ORB)** only. Phase 1 ends at a **GO/NO-GO gate**: does ORB show positive expectancy *after realistic costs*?
>
> Risk rules are already decided (see [[Day Trading Bot|Decisions D7]]): **1% risk/trade, −3% daily kill-switch, ~4 trades/day, flat by close.** This note wires up the plumbing and the backtest; the kill-switch and live sizing live in Phase 3.

> [!warning] PAPER-FIRST, ALWAYS
> Every Futu trade call below passes `trd_env=TrdEnv.SIMULATE`. The SDK's `place_order` **defaults to `TrdEnv.REAL`** — forgetting the override targets a live account. Pass it explicitly on *every* trade call.

---

## 0. Prerequisites at a glance

| Thing | Why | Free? |
|---|---|---|
| Python 3.10+ (venv) | Runtime | Yes |
| `futu-api` (or `moomoo-api`) | Execution SDK → talks to OpenD | Yes |
| **OpenD** gateway daemon | Local broker for all Futu API traffic | Yes |
| Futu/moomoo account with a **US paper account** | Paper US-stock trading | Yes |
| `alpaca-py` + Alpaca API keys (Basic plan) | Free historical 1-min bars | Yes |
| `backtesting.py` | ORB backtest engine | Yes |

---

## 1. Python environment setup

```bash
# One venv for the whole project
python3 -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate

pip install --upgrade pip
pip install "futu-api"              # US accounts: pip install "moomoo-api>=10.4.6408"
pip install "alpaca-py"
pip install "backtesting"
pip install pandas
```

> [!note] futu-api vs moomoo-api
> They are the **same API surface**, different brand. `futu-api` → `from futu import *`. `moomoo-api` → `from moomoo import *`. US users are steered to the moomoo build. **Pick one and stay consistent.** This note uses `from futu import *`.

> [!tip] backtesting.py commission behaviour is version-dependent
> Since **v0.4.0**, `commission=` is applied **twice** (entry + exit). Pin your version and confirm: a `commission=0.0005` round-trip costs ~0.10% total. On <0.4.0 it is charged once.

---

## 2. Futu OpenD + futu-api — paper US-stock connection

### 2.1 The architecture you must understand first

`futu-api` is a **thin client that talks ONLY to OpenD**, a local gateway daemon you download, run, and log into. OpenD brokers all traffic to Futu's servers. Python connects to OpenD over TCP at `127.0.0.1:11111` (default).

> [!danger] Nothing works until OpenD is running and logged in
> If OpenD is down or not logged in, **every** context call fails to connect. This is the #1 gotcha.

### 2.2 OpenD setup steps

1. Download OpenD (GUI or command-line) from `www.moomoo.com/download/OpenAPI` (or the Futu equivalent). Use **version ≥ 10.4.6408** for US margin paper support.
2. Launch OpenD and log in with your Futu/moomoo account ID + login password. (Command-line OpenD: set account/password in the config file.) It listens on `127.0.0.1:11111`.
3. Ensure your account has a **US paper trading account** provisioned (`sim_acc_type=STOCK_AND_OPTION`, the US margin paper account for stocks+options). **Paper trading needs no separate unlock.**

### 2.3 Connect: quotes + US trade context (paper)

```python
# OpenD must already be running and logged in at 127.0.0.1:11111
from futu import *

# --- Quotes ---
quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

# --- US trading context (paper) ---
# Current/recommended: the unified context, filtered to the US market.
# Defaults are TrdMarket.HK / SecurityFirm.FUTUSECURITIES, so US callers
# MUST override BOTH or you get HK accounts / the wrong brokerage entity.
trd_ctx = OpenSecTradeContext(
    filter_trdmarket=TrdMarket.US,
    host='127.0.0.1',
    port=11111,
    security_firm=SecurityFirm.FUTUINC,   # US brokerage entity
)

# Paper trading needs NO unlock_trade(). (Live REAL trading must be unlocked
# in the OpenD GUI; SDK unlock for live is restricted on US accounts.)

# Confirm the US paper account exists
ret, accs = trd_ctx.get_acc_list()
if ret == RET_OK:
    print(accs[['acc_id', 'trd_env', 'trdmarket_auth', 'sim_acc_type']])
```

> [!note] `OpenSecTradeContext` vs `OpenUSTradeContext`
> Both exist. `OpenUSTradeContext` is a legacy independent subclass; `OpenSecTradeContext(filter_trdmarket=TrdMarket.US)` is the documented modern path — **use it.**

### 2.4 Place a hand-managed bracket (NO native OCO for US)

> [!warning] No native bracket/OCO for US stocks
> Your bot owns the OCO logic: it places entry + stop + take-profit legs and, when one protective leg fills, **cancels the sibling in code**.

```python
# 1) Entry: limit BUY
ret, data = trd_ctx.place_order(
    price=185.00, qty=10, code='US.AAPL',
    trd_side=TrdSide.BUY,
    order_type=OrderType.NORMAL,         # limit order
    trd_env=TrdEnv.SIMULATE,             # PAPER — never omit
)
if ret != RET_OK:
    raise RuntimeError(data)
entry_order_id = data['order_id'][0]

# After the entry FILLS (poll order_list_query / position_list_query), place legs:

# 2) Stop-loss: STOP order, aux_price = trigger price (REQUIRED for STOP)
ret, sl = trd_ctx.place_order(
    price=175.00, qty=10, code='US.AAPL',
    trd_side=TrdSide.SELL,
    order_type=OrderType.STOP,
    aux_price=175.50,                    # trigger for STOP / STOP_LIMIT
    trd_env=TrdEnv.SIMULATE,
)

# 3) Take-profit: limit SELL
ret, tp = trd_ctx.place_order(
    price=200.00, qty=10, code='US.AAPL',
    trd_side=TrdSide.SELL,
    order_type=OrderType.NORMAL,
    trd_env=TrdEnv.SIMULATE,
)

# When one protective leg fills, cancel the other (OCO done in code):
# trd_ctx.modify_order(ModifyOrderOp.CANCEL, order_id=<sibling>, qty=0, price=0,
#                      trd_env=TrdEnv.SIMULATE)
```

> [!note] Verified signatures
> `place_order(price, qty, code, trd_side, order_type=OrderType.NORMAL, adjust_limit=0, trd_env=TrdEnv.REAL, acc_id=0, acc_index=0, remark=None, time_in_force=TimeInForce.DAY, fill_outside_rth=False, aux_price=None, trail_type=None, trail_value=None, trail_spread=None, session=Session.NONE, jp_acc_type=SubAccType.JP_GENERAL, position_id=None, expire_time=None)`.
> `OrderType` members: `NORMAL` (limit), `MARKET`, `STOP`, `STOP_LIMIT`, `MARKET_IF_TOUCHED`, `LIMIT_IF_TOUCHED`, `TRAILING_STOP`, `TRAILING_STOP_LIMIT`. **`aux_price` is mandatory for `STOP` / `STOP_LIMIT` / `MARKET_IF_TOUCHED` / `LIMIT_IF_TOUCHED`.** `ModifyOrderOp.CANCEL` is the confirmed cancel op.

### 2.5 Startup state reconciliation (Phase 3 constraint, wire it early)

```python
ret, positions = trd_ctx.position_list_query(trd_env=TrdEnv.SIMULATE)
if ret == RET_OK:
    print(positions[['code', 'qty', 'cost_price', 'pl_ratio']])

ret, orders = trd_ctx.order_list_query(trd_env=TrdEnv.SIMULATE)
if ret == RET_OK:
    print(orders[['order_id', 'code', 'trd_side', 'order_type',
                  'order_status', 'qty', 'price']])

# For US margin paper, pass refresh_cache=True to force a server read if cached
# data looks stale (e.g. position_list_query(trd_env=TrdEnv.SIMULATE, refresh_cache=True)).
```

> [!tip] Always close your contexts
> `quote_ctx.close()` / `trd_ctx.close()` when done, to avoid exhausting OpenD connections. Every context method returns `(ret, data)` — check `if ret == RET_OK:` before using `data`; errors come back as `ret != RET_OK`, not exceptions.

### 2.6 (Optional) Futu live/realtime 1-min K — sanity check the connection

```python
ret, _ = quote_ctx.subscribe(['US.AAPL'], [SubType.K_1M])   # 1 quota per code x subtype
if ret == RET_OK:
    ret, kl = quote_ctx.get_cur_kline('US.AAPL', num=10, ktype=SubType.K_1M)
    if ret == RET_OK:
        print(kl[['time_key', 'open', 'high', 'low', 'close', 'volume']])
```

> [!note] Backtest data comes from Alpaca, not Futu
> Futu historical K-line works (`request_history_kline`, max 1000/req, ~60 req/30s, paginate via `page_req_key`), but for the **backtest** we use free Alpaca minute bars (Section 3). Futu quotes are for the *live/paper* bot. US realtime quotes are currently free at LV3 during a **promo period** — verify your quote rights in OpenD before relying on it.

---

## 3. Alpaca free 1-min data → backtesting.py format (ET timezone)

Alpaca's **Basic plan is free**: IEX feed, history since 2016, latest 15 min withheld, 200 req/min. (SIP is the paid Algo Trader Plus tier, $99/mo — thicker 1-min volume.) For ORB on liquid names, free IEX is a fine first pass; just know IEX 1-min volume is thinner than paid SIP.

```python
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame, TimeFrameUnit
from alpaca.data.enums import DataFeed
from datetime import datetime

client = StockHistoricalDataClient(API_KEY, SECRET_KEY)
req = StockBarsRequest(
    symbol_or_symbols="AAPL",
    timeframe=TimeFrame(1, TimeFrameUnit.Minute),  # or TimeFrame.Minute
    start=datetime(2024, 1, 1),
    end=datetime(2024, 1, 31),
    feed=DataFeed.IEX,   # free Basic plan
)
bars = client.get_stock_bars(req)

# .df is a MultiIndex (symbol, timestamp); the timestamp level is tz-aware UTC.
sym = "AAPL"
df = bars.df.xs(sym, level="symbol")   # level MUST be the string 'symbol' (or 0)

# Convert THEN slice: tz_convert to ET first, else the RTH window is wrong.
df = df.tz_convert("America/New_York")
df = df.between_time("09:30", "16:00")

# backtesting.py wants EXACTLY Open/High/Low/Close/Volume (capitalised).
df = df.rename(columns={
    "open": "Open", "high": "High", "low": "Low",
    "close": "Close", "volume": "Volume",
}).drop(columns=["trade_count", "vwap"])
```

> [!warning] Two timezone/reshape traps
> 1. The `.df` index is a **MultiIndex even for one symbol** — reduce with `df.xs(sym, level="symbol")` (string, not a bare name, or you get `NameError`).
> 2. `tz_convert("America/New_York")` must run **before** `between_time` (the index is tz-aware UTC; use `tz_convert`, not `tz_localize`). Otherwise RTH filtering and the force-flat logic fire on the wrong bars.

---

## 4. The precise ORB rules

Baseline = the **Zarattini & Aziz (2023)** "Can Day Trading Really Be Profitable?" variant (SSRN 4416622). Pin Phase 1 to these so your numbers are comparable to a published reference, then tune.

```text
1. Opening range = HIGH/LOW of the FIRST 5-min bar after 09:30 ET.
2. Direction filter (per the paper):
     first bar close > open  => LONG only
     first bar close < open  => SHORT only
     doji (open ~= close)    => NO trade today
3. Entry = OPEN of the SECOND 5-min bar, in the filtered direction.
     (This is the paper's SIMPLIFIED variant. Classic textbook ORB instead
      rests a buy-stop above the range high / sell-stop below the low.
      Different fill assumptions — pick one and document it.)
4. Stop = opposite extreme of the FIRST bar (low for long, high for short).
     R = abs(entry - stop).
5. Target = entry +/- 10*R. If not hit, EXIT AT THE CLOSE (mandatory flat by EoD).
6. Position size: lose exactly 1% of equity on a stop-out, capped by 4x leverage:
     shares = floor( min( 0.01*Account / R, 4*Account / entry ) )
7. ONE trade per day.
```

> [!note] Aligning the paper with our decided risk rules
> The paper's **1% risk/trade** matches our [[Day Trading Bot|D7]]. Our design also adds a **−3% daily kill-switch** and **~4 trades/day** ceiling — the paper is 1 trade/day, so our cap is non-binding at baseline. The kill-switch is a Phase 3 runtime control, not a backtest rule; in the backtest, equity-curve drawdown stands in for it. Our design uses **target = 1–2R**; the paper uses **10R-or-EoD**. Treat target multiple as the **first parameter to sweep** in Phase 1 (see Section 8).

> [!warning] The opening-range length is a parameter
> The paper uses a **5-min** range; our design note floats **15 or 30 min**. The skeleton below defaults to a configurable `or_minutes` so you can sweep 5 / 15 / 30 and confirm the edge is not a knife-edge on one value.

---

## 5. backtesting.py — ORB Strategy skeleton

```python
import pandas as pd
from datetime import time
from backtesting import Backtest, Strategy


class OpeningRangeBreakout(Strategy):
    # --- tunable parameters (override via Backtest.run(**kwargs) / optimize) ---
    or_minutes = 30          # opening-range window length in minutes (sweep 5/15/30)
    rth_open = time(9, 30)   # RTH open (ET)
    rth_close = time(16, 0)  # RTH close (ET)
    flat_time = time(15, 55) # force-flat before close
    risk_frac = 0.95         # fraction of equity per entry (0<size<1 => fraction of liquidity)

    def init(self):
        # Per-day opening-range state. We do NOT precompute an indicator here:
        # the range is per-day and path-dependent, so track it bar-by-bar in next().
        self._cur_date = None
        self._or_high = None
        self._or_low = None
        self._or_ready = False
        self._or_end = None
        self._traded_today = False   # one breakout entry per day (enforced HERE)

    def next(self):
        # self.data.index[-1] is the timestamp of the CURRENT (just-closed) bar.
        ts = self.data.index[-1]
        bar_time = ts.time()
        bar_date = ts.date()
        price = self.data.Close[-1]
        high = self.data.High[-1]
        low = self.data.Low[-1]

        # --- restrict to regular trading hours ---
        if bar_time < self.rth_open or bar_time >= self.rth_close:
            if self.position:
                self.position.close()
            return

        # --- new trading day -> reset the opening range AND the daily trade gate ---
        if bar_date != self._cur_date:
            self._cur_date = bar_date
            self._or_high = high
            self._or_low = low
            self._or_ready = False
            self._traded_today = False
            end_minutes = self.rth_open.hour * 60 + self.rth_open.minute + self.or_minutes
            self._or_end = time(end_minutes // 60, end_minutes % 60)

        # --- force flat near session close (runs BEFORE the entry block) ---
        if bar_time >= self.flat_time:
            if self.position:
                self.position.close()
            return

        # --- build the opening range during the first N minutes ---
        if bar_time < self._or_end:
            self._or_high = max(self._or_high, high)
            self._or_low = min(self._or_low, low)
            return  # do NOT trade while the range is still forming

        self._or_ready = True

        # --- breakout entry: at most ONE entry per day, only when flat ---
        if self._or_ready and not self._traded_today and not self.position:
            rng = self._or_high - self._or_low
            if rng <= 0:
                return  # guard against a degenerate / zero-width range
            if price > self._or_high:
                self.buy(size=self.risk_frac,
                         sl=self._or_low,
                         tp=self._or_high + rng)   # 1R target; swap to 10R per paper
                self._traded_today = True
            elif price < self._or_low:
                self.sell(size=self.risk_frac,
                          sl=self._or_high,
                          tp=self._or_low - rng)
                self._traded_today = True
```

> [!danger] Lookahead / same-bar fill — the one bias that matters
> With default settings, the `buy()`/`sell()` here fills on the **NEXT bar's open**, NOT at `price` (this bar's close). That is realistic and lookahead-**safe** — `next()` only sees data up to `[-1]`. Do **not** assume a guaranteed same-bar entry at `Close[-1]`. If you genuinely want close-of-bar fills, pass `trade_on_close=True` deliberately.

> [!warning] One-trade-per-day is enforced in `next()`, NOT by `exclusive_orders`
> `exclusive_orders=True` only guarantees **at most one position at a time** — it does **not** cap trades per day. The `self._traded_today` flag (reset on date rollover) is what enforces the paper's one-trade-per-day rule. Do not delegate the daily cap to `exclusive_orders`.

> [!note] Skeleton correctness notes
> - `if self.position:` works because `Position` is falsy when `size == 0`.
> - `sl`/`tp` must be on the correct side of entry (long: `sl < price < tp`) or backtesting.py **raises an AssertionError** — hence the zero-width range guard.
> - Force-flat runs **before** the entry block, so you never open a position you can't exit before close.
> - The intraday logic **requires a DatetimeIndex** (to read `.time()`/`.date()`), and bars must be in ET (Section 3).

---

## 6. Realistic cost model

> [!danger] This is the half that decides GO vs NO-GO
> The paper assumed **ZERO slippage** and only **$0.0005/share** commission. That is the optimistic case. Phase 1 must re-run the *same* rules under **honest Futu costs + slippage**. If the edge collapses between the two, that is a **NO-GO** — and the honest expected outcome for many published ORB results.

### 6.1 Quick proxy (first pass, liquid names)

```python
from backtesting import Backtest

# commission is a FRACTION OF TRADE VALUE, charged at BOTH entry and exit (v0.4.0+).
# 0.0005 => 0.05%/side => ~0.10% round-trip. Reasonable all-in proxy for a liquid
# name on Futu (commission+platform are a fraction of a bp of notional on a
# normally-priced ETF; the rest is a slippage buffer).
bt = Backtest(
    data,                   # OHLCV minute bars, DatetimeIndex (ET)
    OpeningRangeBreakout,
    cash=25_000,
    commission=0.0005,      # 5 bps/side; bump to 0.001 for less liquid names
    margin=1/4,             # 4x intraday leverage, matches the paper
    trade_on_close=False,   # market orders fill on NEXT bar's open (lookahead-safe)
    exclusive_orders=True,  # single concurrent position (NOT a daily cap)
)
stats = bt.run()
```

### 6.2 Faithful per-share Futu cost (callable)

Verified against `futuhk.com/en/support/topic2_283` (Fixed plan). The callable signature is `func(order_size: int, price: float) -> cash_cost` (`order_size` is **negative for shorts**); it does **not** tell you buy vs sell.

```python
# Futu HK US-stock Fixed plan:
#   commission  : $0.0049/share, min $0.99/order        (all transactions)
#   platform fee: $0.0050/share, min $1.00/order        (all transactions)
#   settlement  : $0.003/share                           (ALL transactions)
#   CAT (NMS)   : $0.000003/share                         (ALL transactions)
#   SEC         : $0.0000206 * notional, min $0.01        (SELL side only)
#   FINRA TAF   : $0.000195/share, min $0.01, max $9.79   (SELL side only)
# Sell-side-only fees (SEC, TAF) are averaged at ~0.5 across the round trip;
# settlement and CAT apply on BOTH sides => full rate per fill.

def futu_commission(order_size: int, price: float) -> float:
    shares = abs(order_size)
    comm = max(0.0049 * shares, 0.99)
    plat = max(0.0050 * shares, 1.00)
    # both-sides fees: full rate every fill
    settlement = 0.003 * shares
    cat = 0.000003 * shares
    # sell-side-only fees: ~half per fill across the round trip, with floors
    taf = max(0.000195 * shares, 0.01) * 0.5
    sec = max(0.0000206 * price * shares, 0.01) * 0.5
    return comm + plat + settlement + cat + taf + sec

bt = Backtest(data, OpeningRangeBreakout, cash=25_000,
              commission=futu_commission, margin=1/4, exclusive_orders=True)
```

> [!warning] `commission=` cannot model slippage — add it separately
> backtesting.py's commission models only a cost proportional to trade value (or a callable returning cash). **Slippage is not commission.** Add it by filling at a **worse price**: e.g. enter longs at `open * (1 + slip)`, exit at `open * (1 - slip)`, with `slip` ≈ 1–3 bps. On minute bars you will *not* get the candle's open — the 2nd-candle-open is exactly where everyone else trades. Realistic slippage often **equals or exceeds** commission and is the single most likely thing to kill the edge.

> [!note] Fee caveats
> - SEC rate is **time-varying** — `$0.0000206` is the current page-verified figure (the older `$0.0000278` is historical). Refresh it at backtest time; don't hardcode it forever.
> - **Tiered vs Fixed plan** changes per-share cost materially at low volume ($0.010/share for the first 500 shares tiered vs $0.005 fixed). For a high-share-count intraday strategy, model the plan you'll actually use.

---

## 7. How to run + read the metrics

```python
stats = bt.run()
print(stats)

# Headline metrics by key:
print(stats['Return [%]'])
print(stats['Sharpe Ratio'])
print(stats['Win Rate [%]'])
print(stats['Max. Drawdown [%]'])
print(stats['# Trades'])
print(stats['Profit Factor'])
print(stats['Expectancy [%]'])      # NOTE the [%] suffix

# Detail:
trades = stats['_trades']           # per-trade DataFrame
equity = stats['_equity_curve']     # Equity / DrawdownPct over time

# Override params at run time / sweep:
# stats = bt.run(or_minutes=15, risk_frac=0.5)
```

| Metric | What it tells you for ORB |
|---|---|
| **Expectancy [%]** | Avg % gained per trade. **This is the edge.** ≤ 0 after costs = no edge. |
| **Profit Factor** | Gross profit / gross loss. > 1 = net-positive; aim comfortably > 1.0, not 1.01. |
| **Win Rate [%]** | Lower is fine for a 10R-target strategy (few big winners). Read it *with* Expectancy. |
| **Max. Drawdown [%]** | Worst peak-to-trough. Stand-in for the −3% daily kill-switch's protective intent. |
| **# Trades** | Sample size. A handful of trades = statistically meaningless; want a few hundred. |
| **Sharpe Ratio** | Risk-adjusted return. Paper's QQQ result was ~1.12–1.18. |

> [!note] Reading order
> Look at **# Trades first** (enough sample?), then **Expectancy [%]** (positive after costs?), then **Profit Factor** and **Max Drawdown** (is it survivable?). Sharpe last.

---

## 8. The GO / NO-GO gate

> [!important] Phase 1 exit criterion
> Run the **same rules** under TWO cost models and compare:
> - **(a) Idealised** — `commission=0.0005`, zero slippage (the paper's optimistic case).
> - **(b) Realistic** — `futu_commission` callable **+ slippage in the fill price** (Section 6).
>
> **GO** only if expectancy/profit-factor stays clearly positive in **(b)**, on a **meaningful sample (hundreds of trades)**, and is **not a knife-edge** of one parameter set on one instrument.
>
> **NO-GO** if the edge only exists in (a) and collapses in (b). The disciplined move is to **not trade it** — tune params/universe or change strategy, do not force it live.

**Robustness sweeps before you trust a GO** (use `bt.optimize(...)` or a loop):
- [ ] Cost sensitivity: 5 vs 10 vs 15 bps/side. Does the edge survive higher costs?
- [ ] Opening-range length: `or_minutes` = 5 vs 15 vs 30.
- [ ] Target multiple: 1R vs 2R vs 10R-or-EoD (paper's value).
- [ ] Direction: longs-only vs longs+shorts.
- [ ] Universe: more than one symbol (SPY + a few large-caps), not just one hand-picked ticker.
- [ ] Out-of-sample: hold back a date range the params were not tuned on.

---

## 9. Honest reality-check — ORB may have no edge after costs

> [!danger] Read this before you get attached to a number
> The headline figures behind ORB are **fragile**:
> - The paper's **clean QQQ** result is **675% total / ~33% annualised alpha** (2016–2023), **not 1,484%**. The eye-catching **1,484% requires trading TQQQ** (a 3× leveraged ETF, with volatility decay) specifically to escape the 4× broker leverage cap. **Do not quote 1,484% as the QQQ strategy's return.**
> - It assumed **zero slippage** and a flat **$0.0005/share** — costs far lower than reality on minute-bar fills at the exact price everyone else is trading.
> - The **2016–2023 sample** was a strongly bullish, high-volatility, tech-favourable window; the instrument (QQQ) was hand-picked as "most liquid"; the window is short. The authors themselves flag the sample as a limitation.
> - The paper's variant is the **simplified ORB** (enter at 2nd-candle open), not the classic resting-stop breakout. Different fill assumptions.
>
> **Many published ORB backtests do not survive realistic cost + slippage.** That is *exactly why* Phase 1 is a GO/NO-GO gate and not a foregone conclusion. A NO-GO here is a successful, money-saving outcome — it stops you risking capital on a non-edge. See [[Day Trading Bot|the design note]]: "the disciplined move is to not trade it, not to force it live."

---

## Phase 0 & 1 checklist

- [ ] venv + `futu-api` + `alpaca-py` + `backtesting` installed; backtesting.py version pinned & confirmed ≥ 0.4.0
- [ ] OpenD running, logged in, US paper account confirmed via `get_acc_list()`
- [ ] Placed a test paper order (`trd_env=TrdEnv.SIMULATE`) and saw it in `order_list_query`
- [ ] Pulled months of Alpaca 1-min bars, reshaped to ET RTH OHLCV
- [ ] ORB skeleton runs end-to-end on a small slice
- [ ] Realistic cost model wired in (Futu callable + slippage in fill price)
- [ ] Robustness sweeps done (cost / range length / target / direction / universe / OOS)
- [ ] **GO/NO-GO decision recorded** in [[Day Trading Bot|the design note's Log]]

## See also
- [[Day Trading Bot|Day Trading Bot — design / grill session]] (Decisions, build roadmap)
