---
type: grill-session
project: Day Trading Bot
status: resolved
created: 2026-06-16
tags:
  - app-ideas
  - trading
---

# Day Trading Bot — Grill Session

## Summary

A **fully automated US-stock day-trading bot**, built backtest-first and proven entirely on a **paper account (US$0 at risk)** before any real money. The strategy is **Opening Range Breakout (ORB)** — the only strategy in scope for v1. Execution runs through the **Futu OpenAPI** (already owned; IB held as a fallback). Risk is governed by a **1%-per-trade fixed-fractional sizing rule, a −3% daily-loss kill-switch, ~4 trades/day, 1–2 concurrent positions, and always-flat-by-close** (start live at 0.5% when that day comes).

The core honest framing that shaped every decision: the bot's *stop-loss/take-profit* is the easy, buildable half; the **entry edge** is the half that decides profit or loss. So the project's first real milestone is not code that trades — it's a **backtest that answers "does ORB have a positive expectancy after costs?"** If the answer is no, the disciplined move is to not trade it, not to force it live.

**Next action:** stand up the Python env + Alpaca data + Futu OpenD (paper), then build the ORB backtest in `backtesting.py` and read the go/no-go number.

> [!note] Build note
> Phase 0 & 1 developer guide (zero → runnable ORB backtest, with verified Futu/Alpaca/backtesting.py code + cost model + GO/NO-GO gate): [[Build - Phase 0 and 1 - ORB Backtest]].

## Build roadmap

| Phase | Goal | Done when |
|---|---|---|
| **0 — Setup** | Python env; `futu-api` + OpenD (paper) connected; Alpaca data key; pull months of 1-min bars for a small liquid universe (e.g. SPY + a few large-caps) | Can fetch historical + live bars and place a test paper order |
| **1 — Backtest ORB** ⭐ | Codify exact ORB rules (range = first 15 or 30 min, entry on break, stop = opposite side, target = 1–2R, flat by close) in `backtesting.py`; evaluate expectancy, profit factor, win rate, max drawdown — **after realistic commission + slippage** | **GO/NO-GO GATE:** positive expectancy after costs? No → tune params/universe or change strategy; do **not** proceed |
| **2 — Paper trade** | Run the bot on the Futu paper account during the US open (attended); bot manages entry + stop + target legs itself; log every trade; compare live fills to backtest (slippage reality check) | A meaningful sample of paper trades roughly matches backtest expectations |
| **3 — Harden & automate** | Kill-switch, startup state-reconciliation, disconnect/error recovery, logging + alerts; only then a VPS + a *tiny* live allocation at **0.5%** risk | Bot survives crashes/disconnects unattended; live track record begins small |

## Phase 1 result — first backtest (2026-06-16) → ❌ NO-GO

First runnable ORB backtest stood up at `/home/lmt/Projects/personal/day-trading-bot` (free Alpaca IEX 1-min data, `backtesting.py`). Tested on **QQQ, full-year 2024 (251 trades, ~1/day — mechanics verified correct).**

> [!danger] No edge — even before costs
> Across a 12-cell sweep (opening range 5/15/30 min × target 1/2/5/10 R), **every** configuration had **Profit Factor < 1 and a negative return at the idealised 5 bps/side cost** (best case PF 0.89, −13%). Realistic costs only deepen the loss. Per the gate's own rule: **do not trade this.**

**What this does and does not prove.** One symbol, one year, thin free **IEX** data, and a *specific* ORB variant: intrabar break of the range, both directions allowed daily, symmetric R targets. It is **not** the Zarattini & Aziz variant (first-5-min-bar direction filter, entry at the 2nd bar's open, 10R-or-EoD exit, their instruments/period). So this is a NO-GO for **this implementation on this data** — not proof ORB is universally dead. (Also noted: the repo's "realistic" 15 bps/side cost proxy is too harsh for a $400 ETF and leverage-amplified; but it's moot here since the idealised case already fails.)

### Round 2 — faithful published variant (2026-06-16) → still ❌ NO-GO

Chose **iterate**. Built the exact Zarattini & Aziz variant (`strategy_paper.py`: first-5-min-bar direction filter, entry at the 2nd bar's open, **10R**-or-EoD exit) with a **faithful per-share Futu cost model** (`costs.py`) + 2 bps slippage spread, tested across **4 symbols × 3 years (2022–2024) = 12 runs**.

> [!danger] No robust edge across symbols & years
> A single cell (QQQ 2024) looked like a GO at +12.8% / PF 1.15. The full matrix: **only 4 / 12 runs positive, average −6.4% return.** It worked in high-volatility **2022** (QQQ +30%, SPY +38%) but broke down in 2023/2024; **AAPL lost all 3 years** (−25% to −48%); drawdowns ran **−20% to −49%** — far beyond the 1%-risk design intent (a sign real per-trade losses exceed the modelled R, likely the fill-vs-proxy gap). The multi-symbol/multi-year test killed a result that looked positive in isolation — exactly its job.

**Caveats:** free thin IEX data, entry-price proxy (1st-bar close ≈ 2nd-bar open), and a 2022–2024 window that differs from the paper's 2016–2023 QQQ/TQQQ + likely SIP data.

> [!warning] The overfitting trap (why we stop, not keep hunting)
> The tempting move — keep searching for the symbol / range / period / target that *is* green — is **data dredging**, the exact failure backtest-first exists to prevent. A green cell found by trying enough combinations is almost always noise, not edge.

**Recommendation:** treat intraday ORB as **NO-GO for live automation.** Stop or pivot — a longer-timeframe / swing approach fights both trading costs and the 21:30-HK babysitting problem far less. Decision logged below.

### Round 3 — 4-strategy bake-off (2026-06-16) → ✅ a candidate found (IBS, swing)

Web-researched candidate strategies, then backtested 4 on the same harness (4 symbols × 3 years, Futu costs + 2 bps spread) hunting for **positive return in every year**. Full write-up + adversarial review: [[Strategy Bake-off - 4 Strategies (2026-06-16)]].

> [!success] IBS clears the bar — but it's swing, not intraday
> **IBS (Internal Bar Strength)** daily mean-reversion (buy IBS<0.2 / exit >0.8) is **pooled-positive every year** (2022 +9.4% / 2023 +21.2% / 2024 +6.1%), 11/12 cells positive, SPY/AAPL/MSFT positive every year. The tell that it's real, not overfit: it **made +9.4% in the 2022 bear (buy-and-hold −27%) and lagged in the bull years** — true mean-reversion, not hidden long-beta. No lookahead found.
>
> Both **intraday** strategies failed hard: **VWAP reversion** and **15-min EMA-cross** lost in all 12 cells (−21% to −85%), negative expectancy even at zero cost. **RSI-2** is a NO-GO on overfit (its 2022 "+0.0%" is an AAPL/parameter artifact). So the only survivor **holds overnight** — confirming the swing pivot.

**Caveats / next step:** free IEX daily data (not SIP) distorts exactly the High/Low/Close IBS depends on; sample is small + correlated. **Don't trust the green numbers until IBS is re-run on paid SIP data** and a wider symbol/year set. Take IBS forward as the single candidate.

## Remaining for the build (implementation/tuning, not design)
- ORB parameters to settle in Phase 1: range length (15 vs 30 min), target multiple (1R vs 2R vs trailing), whether to take shorts or longs-only.
- Universe definition: which symbols, and liquidity/spread/price filters.
- Futu OpenD paper setup + market-data subscription for US stocks.
- Cost model for the backtest (Futu US commission + assumed slippage).

## Decisions
| # | Question | Decision | Rationale |
|---|---|---|---|
| 1 | Role of the system | **Fully automated bot** — scans, enters, and exits with no human in the loop | Highest payoff/risk path. Hard constraint adopted: a fully-auto bot MUST run on a backtested edge, never a hunch. |
| 2 | Market / instrument | **US stocks (NYSE/NASDAQ)** | Deepest liquidity + richest backtestable-strategy literature + best API support on both Futu & IB. Trade-off: triggers the US Pattern Day Trader (PDT) rule. |
| 3 | Capital / phase | **Phase 1 = paper (simulation) only, US$0 at risk.** Live-capital number deferred until the bot is proven. | De-risks the build; paper accounts let you day-trade freely (sidesteps PDT). Both Futu & IB offer free paper accounts. |
| 4 | Edge source | **Start from ONE known, documented strategy.** Codify exact rules → backtest on history → paper trade → automate only if it survives. | A fully-auto bot is only as good as its entry signal. Disciplined, learnable pipeline. ML/pattern-discovery rejected as a starting point (overfitting trap). |
| 5 | Strategy | **Opening Range Breakout (ORB).** Mark first 15–30 min hi/lo; long on break above, short on break below; stop = opposite side of range; target = 1–2R or trailing. | Crisp mechanical rules + fixed time window (easy to automate/babysit) + best-documented (reference numbers to validate the backtest). |
| 6 | Broker / execution API | **Futu OpenAPI** (start here), paper account first. | Already have it, zero signup, US stocks + free paper (模擬) + clean `futu-api` Python SDK via OpenD. Trade-off: no native bracket order → bot manages stop+target legs (fine for ORB). IB kept as long-term fallback. |
| 7 | Risk model | **1% risk/trade, −3% daily-loss kill-switch, ~4 trades/day, 1–2 concurrent.** Sizing: `shares = (account × 1%) ÷ (entry − stop)`. | Classic "1% rule." ⚠️ **Revisit before live:** start live at 0.5% until the bot has a real track record — 1% on an unproven live bot compounds mistakes fast. The kill-switch is the top safety feature for an unattended bot. |
| 8 | Backtest stack | **`backtesting.py` framework + free Alpaca historical minute data.** | Fastest path to a trustworthy ORB result; built-in lookahead-bias guards; free US minute bars; focus on strategy logic not plumbing. vectorbt+Polygon deferred to the optimization phase. |
| 9 | Runtime / infra | **Phase 1: local machine + attended** during the US open (~21:30 HK). Promote to always-on VPS only in the automation phase. | Eyes on a new, unproven bot to catch bugs live; zero deployment work; build trust before leaving it unattended. |
| 10 | Restart safety (constraint, not a fork) | **On every startup the bot must reconcile its state against the broker** — query Futu for actual open positions/orders and resume managing stops; never assume it starts flat. | A crash mid-position must not leave a naked, unmanaged position. Non-negotiable for any unattended/fully-auto bot. |

## Open questions
_All design branches resolved (see Decisions + Build roadmap). Implementation/tuning items are tracked under "Remaining for the build" above._

- [ ] **Revisit before going live:** drop per-trade risk from 1% → 0.5% until a real track record exists.

## Log
- 2026-06-16 session start — captured raw concept: a day-trading system that manages stop-loss + take-profit; has Futu API, could register IB; asking what strategies to use.
- 2026-06-16 checkpoint — resolved D1 (role = fully automated bot) + D2 (market = US stocks). PDT rule now a live constraint; capital is the next gate.
- 2026-06-16 checkpoint — resolved D3 (paper-only Phase 1) + D4 (edge = one known documented strategy, backtest-first). Next: pick the specific strategy.
- 2026-06-16 checkpoint — resolved D5 (strategy = ORB) + D6 (broker = Futu OpenAPI, paper first). Next: risk model.
- 2026-06-16 wrap-up — resolved D7 (risk = 1%/trade, −3% kill-switch), D8 (backtest = backtesting.py + Alpaca), D9 (runtime = local+attended Phase 1), D10 (restart state-reconciliation constraint). Wrote Summary + 4-phase build roadmap with a GO/NO-GO backtest gate. Status → resolved.
- 2026-06-16 Phase 1 build — scaffolded runnable repo at `/home/lmt/Projects/personal/day-trading-bot` (data.py / strategy.py / backtest.py), connected free Alpaca IEX data, ran ORB on QQQ 2024.
- 2026-06-16 **Phase 1 GO/NO-GO = ❌ NO-GO** — 12-cell param sweep, no edge even at idealised 5 bps cost (best PF 0.89). Jack chose: iterate the exact paper variant.
- 2026-06-16 **Phase 1 Round 2 = ❌ NO-GO** — faithful Zarattini variant (`strategy_paper.py` + `costs.py`), 4 symbols × 3 years: only 4/12 positive, avg −6.4%, regime-dependent (good 2022, bad 2023/24), −20–49% drawdowns. Intraday ORB = NO-GO for live automation. Recommend stop/pivot to swing; avoid data-dredging for a green cell.
- 2026-06-16 **Round 3 — 4-strategy bake-off = ✅ candidate found** — web-researched + backtested IBS, RSI-2, VWAP-reversion, EMA-cross on the harness (added `data.py` daily fetch, `indicators.py`, `strategy_{ibs,rsi2,vwap,macross}.py`, `backtest_grid.py`). **IBS (daily mean-reversion)** is pooled-positive every year (11/12 cells); the +9.4% in the 2022 bear vs −27% buy-and-hold is the anti-overfit tell. Both intraday strategies failed 0/12 (VWAP/EMA-cross negative expectancy); RSI-2 = overfit NO-GO. Survivor is **swing (overnight)**, confirming the pivot. Full report: [[Strategy Bake-off - 4 Strategies (2026-06-16)]]. Next: re-run IBS on paid SIP data + wider sample before trusting it.
