---
title: vibe-edge
---

## Results

**Vibe-Edge went from zero to 0.6.0 in 12 weeks and 281 commits: a five-layer process that goes all the way from raw data to paper trading lists, with a full suite of 3,749 tests passed.** It is a quantitative research platform for Taiwanese stocks that runs on my own machine. AI agents write the research nodes, which are the individual research steps. The platform guards them with a fixed statistical validation engine the agents cannot change, which checks for three common errors: look-ahead bias, using data not yet visible at the time; overfitting, working only on past data; and multiple testing bias from trying too many times.

So far, no version of a real research project has passed the tests and entered the new factor library. Research outcomes: To be added.

## Why this project

AI agents generate strategy variants much faster than humans, and this raises two issues:

- If the agent that writes the strategy can also change the tests, it can bypass the very check meant to "find backtesting blind spots."
- If the total number of attempts is not recorded, metrics that discount for the number of trials, such as the Deflated Sharpe Ratio, and the multiple testing correction will be inaccurate.

So I set the rules: agents cannot also serve as referees, and the number of trials must be recorded.

## My role

Independent developer. I own it end to end, from the vision, spec and architecture to daily operations.

**Vision**: one person should be able to do institutional-grade quant research. AI agents generate and implement ideas at scale, people ask the questions and judge the direction, and the platform keeps the gate. Research speed can be handed to AI; research credibility cannot.

**Value**:

- **Credible**: every result passes the same statistical tests, which agents cannot change, and every trial is counted, so no strategy looks good just because it was tried enough times.
- **Traceable**: data fingerprints, registered rounds and 412 numbered design decisions let any result be traced back to how it was produced.
- **Repeatable**: research follows a fixed ten-step flow, and the same nodes and tests apply to each new idea instead of a new backtest every time.
- **Cost-controlled**: AI spend has a global ledger and a hard cap, and the daily update runs in about 100 seconds.

## What I did

**Phase 1 | Specifications and node contracts.** Write the specification first, then the code. Each research step is a node folder, and every node uses the same `manifest.yaml` to declare its inputs, outputs and parameters. Types are defined once in Pydantic, and the TypeScript types for the canvas frontend are generated automatically from OpenAPI. `vibe-edge validate` runs three checks on each node in order: a format check, a leak canary test and a test run in an isolated environment. The leak canary test injects a future price gap to see whether the output changes, which catches nodes that peek at future data. These checks are hardcoded into the platform, and node authors cannot change them.

**Phase 2 | Statistical validation.** First came the Probabilistic / Deflated Sharpe Ratio, two adjusted performance metrics, plus walk-forward and purged k-fold, two ways of splitting samples that avoid data overlap. Testing then moved to "rounds": lock the cells to be tested first, then measure; a cell that advances can unseal its out-of-sample data only once. The m in multiple testing equals the number of distinct cells in the research project. Besides the default statistical chain, it can switch to Holm, Benjamini–Yekutieli, Romano–Wolf, SPA, or block bootstrap t.

**Phase 3 | data tier** Raw data is written into PostgreSQL by FinCLI, and the platform only reads it. The data has three layers: the ODS raw layer, the DW warehouse layer and the DM research mart. The DW warehouse layer holds standard fields per stock per day, and each value carries a "visible after announcement" date. Adjustment factors for ex-dividend and capital reduction are built in-house from the exchange's reference prices; compared with TEJ across 13,093 events, 97.6% match. The stock pool removes survivorship bias, so it does not look only at stocks that survived to today, and every round records a data fingerprint.

**Phase 4 | Study procedures.** Research begins with a phenomenon and proceeds through ten steps: recording the phenomenon, interpretation, analogy and borrowing, selecting a stock pool, registering rounds, testing, advancement, unsealing out-of-sample data, comparison, and entry into the library. AI can draft hypotheses from Zotero literature and Obsidian notes, but people fill in the expected direction and size. AI costs have a global ledger and a hard cap of $5 per month. In a practice-area trial run, "hold disposition stocks for 10 days" advanced and passed the out-of-sample test. Borrowed into a moving-average golden cross study, it did not replicate, and that failure was recorded in the track record too. Practice results do not count as evidence and cannot enter the library.

**Phase 5 | Allocation and trading.** Versions in the library go into the signal calendar, receive paper capital, and are converted into a trade list in whole lots. Orders pass through a broker gate and by default go to paper trading only; the forward ledger records one entry per day. In Taiwan stocks the platform only goes long, so signals that expect a decline can only be used to avoid stocks.

**Phase 6 | Operations and Performance.** After optimization, the daily update went from over an hour to about 100 seconds. The daily update runs 77 nodes, and the process originally peaked at around 12 GB of memory. I switched to file handover between nodes, segment-based queries for research windows and de-duplicated outputs. After that, two consecutive runs peaked at 854 MB and 962 MB and finished in about 100 seconds.

## Next steps

- Take a real research project through all ten steps and get the first version into the new factor library.
- The broker adapter and fill backfill are written, but there are 0 real fills so far; it runs on paper only for now.
