---
title: fincli
---

## Results

**FinCLI automatically extracts raw data from the Taiwan stock market after the market closes each day and writes it into PostgreSQL. Vibe-Edge's data layer reads data from here.** The core is `tw-fin-scraper` This CLI currently has 23 source modules, including the Taiwan Stock Exchange (TWSE), the Taipei Exchange (TPEx), the Market Observation Post System (MOPS), TEJ, and the Taiwan Futures Exchange (TAIFEX).

## Why this project

Quantitative research requires raw, traceable data. For much of the Taiwan stock market data, such as stocks under observation, stocks under special supervision, investor conferences, and net buying/selling by the three major institutional investors, there are no readily available SDKs. The only option is to connect to official APIs or web pages one by one.

I also set a rule: The extraction layer does not transform data. Whatever the source provides is stored as is, and the cleaning is left to downstream processes. If you arbitrarily convert data during extraction, downstream users won't be able to retrieve the original numbers.

## My role

Independent `tw-fin-scraper` And `yf-history` 。

The QuantaAlpha in the same folder wasn't written by me. It's an external open-source project ([QuantaAlpha/QuantaAlpha](https://github.com/QuantaAlpha/QuantaAlpha)), which was not included in FinCLI's version control. I only modified two configuration files, pointed them to Taiwan stock market data, and ran a benchmark test.

## What I did

**Phase 1 | Get the information first.** Use yfinance to backfill 51 Taiwan stocks from 2019-09-02 to 2026-08-31, covering a total of 1,699 trading days, and save the data as a raw CSV file. Additionally, the net buying and selling of the three major institutional investors from the Taiwan Stock Exchange (TSE) T86 was integrated. When rate limits were encountered during backfilling, HTTP 428 was also treated as 429, and exponential backoff was used for retries.

**Phase 2 | Expand sources and implement a database.** Eight data sources were added at once, PostgreSQL was expanded to 26 tables, and `--resume` Continued scraping. All 143 endpoints of the Taiwan Stock Exchange's official OpenAPI have been connected, as have all 225 OpenAPI endpoints of the Taipei Exchange. TEJ uses automated browser login to save snapshots of 238 tables as drafts.

**Phase 3 | Replace handwritten code with specifications.** The 141 OpenAPI data types of the Taiwan Stock Exchange were originally written by hand, one by one. I switched to "specification file + generic engine." First, I verified that the new and old approaches were consistent row by row (141/141), then I made the switch, eliminating about 10,000 lines of handwritten code.

**Phase 4 | Daily operations.** Use macOS launchd to schedule data retrieval every day after market close. Perform a nightly health check to verify if the data is up to date, if the schedule has failed, and if the backup is outdated. Back up the database weekly. For T86, if the data for the day has not been released, it is retrieved every 20 minutes. If the daily market data retrieval fails, wait 5 minutes and retry, up to 3 times. The Taiwan Futures Exchange's TXF day and night sessions are also updated daily.

**Phase 5 | Additional information required by Vibe-Edge.** In accordance with Vibe-Edge's requirements, add the history of stocks under special supervision and stocks under observation, the history of listing and delisting on the TSE and TPEx, the holiday schedule, changes in par value and stock splits, treasury stocks, and capital reduction events, and register each table in the data layer directory.

QuantaAlpha's Taiwan stock benchmark test was successful, but the annualized excess return after deducting costs was −11.8%, with an information ratio of −1.04.

## Next steps

To be added.
