---
type: report
project: Day Trading Bot
status: resolved
created: 2026-06-16
tags:
  - app-ideas
  - trading
  - backtest
---

# Strategy Bake-off — 4 Strategies vs "Positive Every Year"

Parent: [[Day Trading Bot]] · Harness: [[Build - Phase 0 and 1 - ORB Backtest]]

**Goal of this round:** after intraday ORB came back [[Day Trading Bot#Round 2 — faithful published variant 2026-06-16 → still ❌ NO-GO|NO-GO twice]], web-research candidate strategies and backtest them on the existing harness, hunting for one with a **positive return in every year (2022, 2023, 2024)** across QQQ/SPY/AAPL/MSFT — Futu commissions + 2 bps spread, $25k/cell. Tested via an ultracode multi-agent run (4 backtests + 8 adversarial-review agents + synthesis).

> [!success] Result up front
> One strategy clears the bar with a defensible, regime-diversified edge — **IBS (Internal Bar Strength), a daily mean-reversion strategy.** But it **holds overnight → it's swing, not the intraday "day-trade" the project set out to build.** Both *intraday* strategies (VWAP reversion, EMA-cross) failed completely (0/12). Treat IBS's green numbers as **promising, not proven**, until validated on real consolidated (SIP) data.

## Verdict table

| Strategy | Type | 2022 | 2023 | 2024 | Every year +? | Trust |
|---|---|---|---|---|---|---|
| **IBS** | Daily swing (overnight) | +9.4% | +21.2% | +6.1% | **Yes** — 11/12 cells; SPY/AAPL/MSFT every year | **Medium — best candidate.** No lookahead; borderline on cost/data + overfit. Verify on SIP before capital. |
| RSI-2 | Daily swing (overnight) | +0.0% | +4.8% | +10.5% | Technically (pooled), but 2022 = +0.04% artifact | **Low.** NO-GO on overfit — does not really clear the bar. |
| VWAP reversion | Intraday day-trade | −51.1% | −29.9% | −34.7% | No (0/12) | **Reject.** Negative expectancy even at zero cost. |
| EMA-cross (15m) | Intraday day-trade | −56.1% | −32.0% | −56.4% | No (0/12) | **Reject.** Whipsaw + cost drag, ~900 trades/yr, ~30% win. |

Per-year = equal-weight pooled average across the 4 symbols. Full per-cell tables: `day-trading-bot/results/{ibs,rsi2,vwap,macross}.txt`. Code: `strategy_ibs.py`, `strategy_rsi2.py`, `strategy_vwap.py`, `strategy_macross.py`, runner `backtest_grid.py`, indicators `indicators.py`.

## Who actually clears the bar

**IBS — yes, and the edge looks real.** Rules (canonical literature defaults, applied identically to every symbol — no per-cell tuning): buy when `IBS = (Close−Low)/(High−Low) < 0.2`, exit when `IBS > 0.8`. Pooled-positive all three years; 11/12 cells positive (only QQQ-2022 at −6.5%); SPY, AAPL, MSFT each positive in all three years; ~23–40 trades/yr; max drawdown −7% to −16%.

> [!note] The decisive anti-overfit signal
> In the **2022 bear year IBS made +9.4% while buy-and-hold lost −27%**, and it *underperformed* buy-and-hold in the 2023/24 bull years. That **"make money down, lag up"** profile is the signature of genuine mean-reversion, not disguised long-beta. The edge is diffuse (≈388 pooled trades; top-5 trades only ~9% of gross profit) and survives a 10× spread stress test.

**RSI-2 — technically yes, but hollow.** The 2022 "positive" is **+0.04%**, carried *entirely by AAPL* (+6.7%); the other three symbols all lost in 2022 on just **2 trades each**. It flips negative at a conservative 5 bps spread, and the every-year property holds only at the *exact* Connors defaults (one notch either way breaks it). Single-digit trades/cell = statistical noise. Overfit lens = **NO-GO**. Keep only as a secondary confirmation signal, not a standalone bot.

## Honest caveat: asked for day-trading, got swing

The project set out to build an **intraday** bot (flat by the close). Both intraday strategies tested **lost money in all 12 cells**, deeply (−21% to −85%) — and not from costs or bugs: VWAP loses even with zero spread/commission (negative expectancy), and EMA-cross loses gross-after-cost on both the normal *and* inverted signal. On trend-prone large caps, intraday mean-reversion clips small wins at VWAP while carrying big losers into the forced close, then 430–950 round-trips/yr of friction bury the rest.

The only things that worked are **daily swing strategies that hold overnight** — which lines up with the project's existing [[Day Trading Bot#Round 2 — faithful published variant 2026-06-16 → still ❌ NO-GO|swing-pivot recommendation]]. If overnight risk is acceptable, IBS is the path. If intraday-only is a hard requirement, **none of the four qualify** and the search must continue.

## Why not to over-trust the green numbers yet

1. **Free Alpaca IEX daily feed, not consolidated SIP.** Daily OHLC reflects only IEX's ~1–3% of volume. IBS keys directly on each bar's High/Low/Close — exactly the values an IEX-only feed distorts (its highs/lows are systematically less extreme than the true SIP NBBO). Fills assumed at the next open may not be obtainable live. **This is the single biggest unknown, and it is signal-correlated, not random noise.**
2. **Tiny, correlated sample.** 3 years × 4 correlated symbols (SPY/QQQ, AAPL/MSFT overlap) over one market cycle ≈ 2–3 independent bets. No 2020 crash, no 2015–2021, no 2025.
3. **Selection bias.** IBS is the best of a 4-strategy bake-off scored on the *same* 12 cells (mitigated only by IBS being a pre-registered literature strategy, not parameter-mined).
4. **One cell is negative** (QQQ-2022); "positive every year" is true at the pooled level, not every cell.

## Recommended next step

**Take IBS forward as the single candidate — validate before risking a dollar:**

1. **Re-run IBS on paid consolidated SIP daily bars** (same harness, same defaults). *Gating test:* survives → confidence jumps; collapses → it was an IEX artifact. Do this first.
2. **Widen out-of-sample:** add 2015–2021 and 2025, plus **uncorrelated symbols** beyond the four mega-caps (sector/small-cap ETFs, non-tech names) to break the 2–3-independent-bets problem.
3. **Walk-forward** the 0.2/0.8 thresholds (keep literature defaults as baseline) to confirm a stable plateau, not a knife-edge.
4. **Drop VWAP and EMA-cross** for these symbols — negative expectancy is structural, not tunable.

**Net:** a plausible, literature-backed, regime-diversified edge worth pursuing in **IBS** — but it's a *swing* (overnight) strategy, and the GO/NO-GO must be re-confirmed on real SIP data and a wider sample before any capital.
