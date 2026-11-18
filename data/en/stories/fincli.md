---
title: fincli
---

## Results

**Every day after the market closes, FinCLI automatically collects raw Taiwan stock market data and stores it in a PostgreSQL database. Vibe-Edge's data layer gets its data from here.** The core is `tw-fin-scraper`, a command-line tool (a program you run by typing commands). It currently connects to 23 data sources, including the Taiwan Stock Exchange (TWSE), the Taipei Exchange (TPEx), the Market Observation Post System (MOPS), TEJ, and the Taiwan Futures Exchange (TAIFEX).

## Why this project

Quantitative research needs raw data you can trace back to its source, but much Taiwan stock market data has no ready-made SDK package. Disposition stocks, attention stocks, investor conferences and net buying/selling by the three major institutional investors, for example, can only be collected by connecting to official APIs or web pages one by one.

I also set a rule: the layer that collects the data does not change it. Whatever the source gives is stored as is, and cleaning happens later in the process. If data is converted while it is being collected, nobody downstream can ever get the original numbers back.

## My role

Independent developer of `tw-fin-scraper` and `yf-history`.

The QuantaAlpha in the same folder wasn't written by me. It's an outside open-source project ([QuantaAlpha/QuantaAlpha](https://github.com/QuantaAlpha/QuantaAlpha)), and it is not part of FinCLI's version control. I only changed two configuration files so it uses Taiwan stock data, and ran a benchmark test once.

## What I did

**Phase 1 | Get the data first.** I first used yfinance to fill in history for 51 Taiwan stocks from 2019-09-02 to 2026-08-31, covering 1,699 trading days, and saved it as raw CSV files. I also connected TWSE's T86 data on net buying and selling by the three major institutional investors. When the source limited how fast I could download, I treated HTTP 428 the same as 429 ("too many requests") and retried with exponential backoff: after each failure, it waits a bit longer before trying again.

**Phase 2 | More sources, into a database.** I added eight data sources at once, grew PostgreSQL to 26 tables, and added `--resume`, so collection can pick up where it left off after an interruption. All 143 endpoints of TWSE's official OpenAPI are connected, and so are all 225 OpenAPI endpoints of the Taipei Exchange. For TEJ, an automated browser logs in and saves snapshots of 238 tables as reference copies.

**Phase 3 | Replace handwritten code with specifications.** I deleted about 10,000 lines of handwritten code and switched to a "specification file + generic engine": each kind of data only needs one specification, and the same engine collects it. TWSE's 141 OpenAPI data types had each been written by hand, one by one. Before switching, I checked that the old and new approaches produced the same data row by row, 141/141, and only then made the switch.

**Phase 4 | Daily operations.** I use launchd, the scheduler built into macOS, to collect data automatically every day after the market closes. A health check runs every night: is the data up to date, did a scheduled job fail, is the backup out of date; the database is backed up weekly. If the day's T86 data is not out yet, it tries again every 20 minutes. If the daily market data fails to download, it waits 5 minutes and retries, up to 3 times. TAIFEX's TAIEX futures day and night sessions are also updated daily.

**Phase 5 | Fill the data Vibe-Edge needs.** Based on what Vibe-Edge needed, I added several kinds of history: disposition and attention stock history, delisting history for TWSE and TPEx companies, market holidays, par value changes and stock splits, and treasury stock and capital reduction events. Every table is registered in the data layer's catalog.

QuantaAlpha's Taiwan stock benchmark test ran all the way through, but the result was poor: after trading costs, the excess return was −11.8% a year, with an information ratio of −1.04.

## Next steps

To be added.
