---
title: vibe-edge
---

## Results

**I took Vibe-Edge from zero to version 0.6.0 in 12 weeks and 281 commits: a five-layer process that runs all the way from raw data to paper trading lists (simulated orders, no real money), with all 3,749 tests passing.** It is a quantitative research platform for Taiwanese stocks that runs on my own machine. AI agents write the research nodes, which are the individual research steps. The platform guards them with a fixed statistical checking engine the agents cannot change. It checks for three common mistakes: look-ahead bias, using data that was not yet visible at the time; overfitting, a strategy that only works on past data; and multiple testing bias, where trying enough times makes something look good by luck.

So far, no version of a real research project has passed the tests and entered the new factor library. Research outcomes: To be added.

## Why this project

AI agents come up with strategy variations far faster than people can, and this raises two problems:

- If the agent that writes the strategy can also change the tests, it can get around the very check meant to "find backtesting blind spots."
- If nobody records how many attempts were made in total, metrics that discount for the number of attempts, such as the Deflated Sharpe Ratio, and the multiple testing correction will be wrong.

So I set the rules: an agent cannot also be the referee, and every attempt must be counted.

## My role

Independent developer. I own it end to end, from the vision, spec and architecture to daily operations.

**Vision**: one person should be able to do institutional-grade quant research. AI agents generate and implement ideas at scale, people ask the questions and judge the direction, and the platform keeps the gate. Research speed can be handed to AI; research credibility cannot.

**Value**:

- **Credible**: every result passes the same statistical tests, which agents cannot change, and every trial is counted, so no strategy looks good just because it was tried enough times.
- **Traceable**: data fingerprints, registered rounds and 412 numbered design decisions let any result be traced back to how it was produced.
- **Repeatable**: research follows a fixed ten-step flow, and the same nodes and tests apply to each new idea instead of a new backtest every time.
- **Cost-controlled**: AI spend has a global ledger and a hard cap, and the daily update runs in about 100 seconds.

## What I did

**Phase 1 | Specifications and node contracts.** I write the specification first, then the code. Each research step is a node folder, and every node uses the same `manifest.yaml` to spell out its inputs, outputs and parameters. Data types are defined once in Pydantic, and the TypeScript types for the canvas front end are generated automatically from OpenAPI. `vibe-edge validate` runs three checks on each node in order: a format check, a leak canary test, and a test run in an isolated environment. The leak canary test slips in a price jump that "has not happened yet" and watches whether the output changes, which catches nodes that peek at future data. These checks are hardcoded into the platform, and people who write nodes cannot change them.

**Phase 2 | Statistical validation.** I started with the Probabilistic / Deflated Sharpe Ratio, two adjusted performance metrics, plus walk-forward and purged k-fold, two ways of splitting samples so training and test data do not overlap. Then I moved testing to "rounds": first lock which cells this round will test, then measure; a cell that advances can open its held-back out-of-sample data only once. The m in multiple testing (how many things were compared) equals the number of distinct cells in the research project. Besides the default statistical chain, it can switch to Holm, Benjamini–Yekutieli, Romano–Wolf, SPA, or block bootstrap t.

**Phase 3 | Data layer.** FinCLI writes the raw data into a PostgreSQL database, and the platform only reads it. The data has three layers: the ODS raw layer, the DW warehouse layer and the DM research mart. The DW warehouse layer holds standard fields for each stock on each day, and every value is tagged with the date it became visible after being announced. I built the adjustment factors for ex-dividend and capital reduction myself from the exchange's reference prices; checked against TEJ across 13,093 events, 97.6% match. The stock pool removes survivorship bias, so it does not look only at stocks that survived to today, and every round records a data fingerprint.

**Phase 4 | Research flow.** Research starts from something observed in the market and goes through ten steps: recording the phenomenon, interpretation, analogy and borrowing, selecting a stock pool, registering rounds, testing, advancement, unsealing out-of-sample data, comparison, and entry into the library. AI can draft hypotheses from Zotero literature and Obsidian notes, but people fill in the expected direction and size. AI spending has a global ledger and a hard cap of $5 per month. In a trial run in the practice area, "hold disposition stocks for 10 days" advanced and passed the out-of-sample test. When it was borrowed into a moving-average golden cross study, it did not hold up, and that failure went into the track record too. Practice results do not count as evidence and cannot enter the library.

**Phase 5 | Allocation and trading.** Versions in the library go into the signal calendar, get paper capital, and are turned into a trade list in whole lots. Orders pass through a broker gate and by default go to paper trading only; the forward ledger records one entry per day. In Taiwan stocks the platform only buys (goes long), so a signal that expects a drop can only be used to stay away from that stock.

**Phase 6 | Operations and performance.** After optimization, the daily update went from over an hour to about 100 seconds. The daily update runs 77 nodes, and at its peak the process used to take about 12 GB of memory. I changed it so nodes hand data to each other through files, research windows are queried in segments, and duplicate outputs are kept only once. After that, two runs in a row peaked at 854 MB and 962 MB and finished in about 100 seconds.

## Next steps

- Take a real research project through all ten steps and get its first version into the new factor library.
- The code that connects to a broker and records fills is written, but there have been 0 real fills so far; for now it runs on paper only.
