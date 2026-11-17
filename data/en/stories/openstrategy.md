---
title: openstrategy
---

## Results

**I organized the research process for the TMBA investor conference event strategy into a Python script consisting of 10 stages. Using a composite factor composed of in-sample weights, the Sharpe ratio for 2025 was 0.94, slightly lower than the market's 0.99, and did not meet the target.** This is an event study: we calculate the cumulative abnormal return (CAR) before and after the earnings conference call, identify the factors that explain it, and then formulate stock selection signals.

## Why this project

When a company proactively holds an investor conference, it may be signaling its confidence in its operations to the market. The question I want to answer is: Are there any abnormal returns before and after the investor conference? Which companies have higher abnormal returns? Can this become a tradable signal?

## My role

I was responsible for TMBA's research project. I was responsible for the research design, programming, and backtesting.

## What I did

**Phase 1 | Events and extraordinary items.** Obtain investor conference events from TEJ, with the investor conference date as the event date. Daily abnormal return = Individual stock return − CAPM expected return; Beta is weighted and adjusted using 1-year and 3-year periods (0.7 × 1 year + 0.3 × 3 years). Then, the abnormal returns within the event window are summed to obtain the CAR.

**Phase 2 | Explanatory variables and regression.** Nine variables were created: whether a public video recording was provided, the turnover rate in the 20 days prior to the event, the return in the 10 days prior to the event, changes in the shareholdings of the top ten shareholders, the number of days since the previous investor conference (logarithm), changes in retail investor shareholdings, market capitalization (logarithm), the price-to-book ratio, and industry. We used OLS regression testing and examined the correlation coefficients and VIF. In the [-3, 3] window, four variables – prior returns, number of days since the last event, size, and price-to-book ratio – were significant. The results were the same when the window was changed to [-2, 2].

**Phase 3 | Integrated calculation.** Originally, each variable called the TEJ API once. I integrated them into a single calculator: fetching data once, sharing the cache, and calculating all variables in parallel.

**Phase 4 | Strategy and out-of-sample validation.** Each of the four significant factors is standardized into a Z-score, and the weights are determined using the in-sample Sharpe ratio to form a composite score. Only scores greater than 0 are used for entry. The top 20% of scores are allocated 1.5 times the capital, the middle 60% are allocated 1 time, and the bottom 20% are allocated 0.5 times. The in-sample period is from February 1, 2020, to December 31, 2022, and the out-of-sample period is from January 1, 2023, to December 30, 2024, with 2025 to be considered next. The Sharpe ratio of the composite factor during the training period was 1.21 (0.39 for the overall market), 1.37 for the entire period (0.82 for the overall market), and 0.94 for 2025 (0.99 for the overall market). The win rate for a single trade is 45.1%.

## Next steps

- Identify the reasons for underperformance relative to the broader market in 2025.
- The strategy portfolio and backtesting program, as well as the tools for retrieving TEJ data, are also included in the repo, allowing the entire research process to be rerun. Currently, the repo only contains the event study and regression sections.

This study is also my project at TMBA. See [Event Trading Strategy: Earnings Calls](project.html?id=tmba-event-earnings-call) 。
