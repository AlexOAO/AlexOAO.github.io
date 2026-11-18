---
title: fincli
---

## Results

**FinCLI automatically extracts raw data from the Taiwan stock market after the market closes each day and writes it into PostgreSQL. Vibe-Edge's data layer reads data from here.** The core is `tw-fin-scraper`, a command-line tool. It currently has 23 source modules, including the Taiwan Stock Exchange (TWSE), the Taipei Exchange (TPEx), the Market Observation Post System (MOPS), TEJ, and the Taiwan Futures Exchange (TAIFEX).

## Why this project

Quantitative research needs raw, traceable data, but much Taiwan stock market data has no ready-made SDK package. Disposition stocks, attention stocks, investor conferences and net buying/selling by the three major institutional investors, for example, can only be collected by connecting to official APIs or web pages one by one.

I also set a rule: the extraction layer does not transform data. Whatever the source provides is stored as is, and cleaning is left downstream. If data is converted during extraction, downstream users can no longer get the original numbers back.

## My role

Independent developer of `tw-fin-scraper` and `yf-history`.

The QuantaAlpha in the same folder wasn't written by me. It's an external open-source project ([QuantaAlpha/QuantaAlpha](https://github.com/QuantaAlpha/QuantaAlpha)), which was not included in FinCLI's version control. I only modified two configuration files to point it at Taiwan stock data, and ran a benchmark test once.

## What I did

**Phase 1 | Get the information first.** I first used yfinance to backfill 51 Taiwan stocks from 2019-09-02 to 2026-08-31, covering 1,699 trading days, and saved them as raw CSV files. I also connected TWSE's T86 data on net buying and selling by the three major institutional investors. When the source hit rate limits during backfilling, I treated HTTP 428 like 429 and retried with exponential backoff, waiting longer each time.

**Phase 2 | Expand sources and implement a database.** Eight data sources were added at once, PostgreSQL grew to 26 tables, and `--resume` was added to continue scraping after an interruption. All 143 endpoints of TWSE's official OpenAPI are connected, as are all 225 OpenAPI endpoints of the Taipei Exchange. For TEJ, automated browser login saves snapshots of 238 tables as reference copies.

**Phase 3 | Replace handwritten code with specifications.** I deleted about 10,000 lines of handwritten code by switching to a "specification file + generic engine." TWSE's 141 OpenAPI data types had originally been written by hand, one by one. Before switching, I verified that the new and old approaches matched row by row, 141/141, and then made the switch.

**Phase 4 | Daily operations.** macOS launchd schedules automatic retrieval every day after market close. A nightly health check verifies whether the data is up to date, whether a schedule failed and whether the backup is outdated; the database is backed up weekly. If T86 data for the day is not yet released, it is retried every 20 minutes. If daily market data retrieval fails, it waits 5 minutes and retries, up to 3 times. TAIFEX's TAIEX futures day and night sessions are also updated daily.

**Phase 5 | Additional information required by Vibe-Edge.** Following Vibe-Edge's needs, I added several kinds of history: disposition and attention stock history, listing and delisting history on TWSE and TPEx, the holiday schedule, par value changes and stock splits, and treasury stock and capital reduction events. Every table is registered in the data layer catalog.

QuantaAlpha's Taiwan stock benchmark test ran through, but the result was poor: annualized excess return after costs was −11.8%, with an information ratio of −1.04.

## Next steps

To be added.
