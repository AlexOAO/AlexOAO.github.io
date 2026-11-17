---
title: vibe-edge
---

## Results

**Vibe-Edge went from zero to 0.6.0 in 12 weeks and 281 commits: a five-layer process that goes all the way from raw data to paper trading lists, with a full suite of 3,749 tests passed.** It is a local quantitative research platform for Taiwanese stocks. The AI agent is responsible for writing nodes for research purposes. The platform uses a fixed statistical validation engine that the agent cannot modify to check for look-ahead bias, overfitting, and multiple testing bias.

Currently, no version of the real research project has passed the assessment and been added to the new factor library. Research outcomes: To be added.

## Why this project

AI agents generate strategy variants much faster than humans. This raises two issues:

- If the agent who writes the strategy can also modify the validation, the task of "identifying backtesting blind spots" will be circumvented by the agent itself.
- If the total number of attempts is not recorded, the Deflated Sharpe Ratio and the multiple testing correction will be inaccurate.

So, I set the rules: agents cannot also serve as referees, and the number of trials must be recorded.

## My role

Independently developed. I am responsible for the specifications, architecture, programming, and documentation. Most of the code was written by me and CLI agents like Claude Code. Each design decision is numbered and recorded, with a total of 412 to date.

## What I did

**Phase 1 | Specifications and node contracts.** Write the specification first, then write the program. Each research step is a node folder, using the same `manifest.yaml` Declare inputs, outputs, and parameters. The type is defined only once using Pydantic, and the TypeScript type for the Canvas frontend is generated from OpenAPI. `vibe-edge validate` For each node, perform a format check, a leak canary test (inject a future gap to see if the output changes), and a test run in an isolated environment, in that order. These checks are hardcoded into the platform and cannot be modified by the node author.

**Phase 2 | Statistical validation.** First, perform Probabilistic / Deflated Sharpe Ratio, walk-forward, and purged k-fold sample splitting. Afterward, change the test to "rounds": first, lock the cells to be tested, then measure; cells that advance can only be unsealed once, excluding the out-of-sample data. The m in multiple testing is equal to the number of different cells in the study. In addition to the default statistical chain, it can also be replaced with Holm, Benjamini–Yekutieli, Romano–Wolf, SPA, or block bootstrap t.

**Phase 3 | data tier** The raw data is written into PostgreSQL by FinCLI, and the platform is read-only. The data is divided into three layers: the ODS raw layer, the DW storage layer (standard fields for each stock on a daily basis, with each value having a "visible after announcement" date), and the DM data mart. The adjustment factors for ex-dividend and capital reduction are established using the exchange's reference price. A comparison of 13,093 events with TEJ shows a 97.6% consistency. The stock pool eliminates survivor bias, and data fingerprints are recorded in each round.

**Phase 4 | Study procedures.** Research begins with a phenomenon and proceeds through ten steps: recording the phenomenon, interpretation, analogy and borrowing, selecting a stock pool, registering rounds, verification, advancement, unsealing out-of-sample data, comparison, and entry into the repository. AI can draft hypotheses from Zotero literature and Obsidian notes, but the expected direction and magnitude are entered by humans. AI costs have a global ledger and a hard cap ($5 per month). During the test run in the practice area, "Holding the stock for 10 days before selling" was promoted and passed the out-of-sample test. However, when it was borrowed for the moving average golden cross study, it did not replicate the results. This failure was also recorded in the performance history. The results of the practice are not considered evidence and cannot be added to the repository.

**Phase 5 | Allocation and trading.** The version is entered into the signal calendar, the paper funds are then reallocated and converted into a complete list of trades. Orders are placed through the brokerage gateway, and by default, only paper trading is used. The forward account records one entry per day. We only go long in the Taiwan stock market. Signals indicating an expected decline can only be used to avoid trading.

**Phase 6 | Operations and Performance.** The daily update runs 77 nodes. The original process peaked at around 12 GB and took over an hour to run. After switching to file handover between nodes, implementing segment-based queries in the research window, and removing duplicates from the output, the peak usage for two consecutive runs was 854 MB and 962 MB, with each run completing in approximately 100 seconds.

## Next steps

- Let the real research project go through ten steps and let the first version enter the new factor library.
- The broker adapter and transaction backfill have been written, but the actual transaction sample is 0; currently, it is only on paper.
