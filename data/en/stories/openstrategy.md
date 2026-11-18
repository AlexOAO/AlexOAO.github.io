---
title: openstrategy
---

## Results

**I organized the research code for the TMBA investor conference event strategy into Python scripts in 10 stages. Using a composite factor built with in-sample weights, the Sharpe ratio for 2025 was 0.94, slightly below the market's 0.99, and did not meet the target.** This is an event study. I test the cumulative abnormal return (CAR) around investor conferences, meaning the sum of price moves beyond what would normally be expected. I then identify the factors that explain it and combine them into stock selection signals.

## Why this project

When a company proactively holds an investor conference, it may be signaling confidence in its operations to the market. I wanted to answer three questions: Are there abnormal returns around the investor conference? Which companies have larger abnormal returns? Can this become a tradable signal?

## My role

TMBA research project that I led. I did the research design, programming, and backtesting.

## What I did

**Phase 1 | Events and extraordinary items.** Investor conference events come from TEJ, with the conference date as the event date. Daily abnormal return = individual stock return − CAPM expected return, which removes the normal move driven by the market. Beta is a weighted shrinkage of the 1-year and 3-year betas: 0.7 × 1 year + 0.3 × 3 years. Finally, the abnormal returns within the event window are summed into the CAR.

**Phase 2 | Explanatory variables and regression.** The finding is that four variables are significant: prior returns, days since the last conference, size and price-to-book ratio. I first built nine variables: whether a public video recording was provided, the turnover rate in the 20 days before the event, the return in the 10 days before the event, changes in the top ten shareholders' holdings, days since the previous investor conference (logarithm), changes in retail investor holdings, market capitalization (logarithm), the price-to-book ratio, and industry. I then ran OLS regression tests and checked the correlation coefficients and VIF to confirm the variables did not overlap too much. In the [-3, 3] window, those four variables were significant; in the [-2, 2] window, the results were the same.

**Phase 3 | Integrated calculation.** Originally, each variable called the TEJ API separately. I combined them into a single calculator: it fetches data once, shares a cache, and then calculates all variables in parallel.

**Phase 4 | Strategy and out-of-sample validation.** Each of the four significant factors is standardized into a Z-score, and the in-sample Sharpe ratios set the weights that combine them into one score; a position is entered only when the score is above 0. Capital follows the score: the top 20% get 1.5 times, the middle 60% get 1 time, and the bottom 20% get 0.5 times. The in-sample period is 2020/2/1 to 2022/12/31, the out-of-sample period is 2023/1/1 to 2024/12/30, and 2025 is checked as well. The composite factor's Sharpe ratio was 1.21 in the training period (market 0.39), 1.37 over the full period (market 0.82), and 0.94 in 2025 (market 0.99). The win rate per trade is 45.1%.

## Next steps

- Identify the reasons for underperformance relative to the broader market in 2025.
- Add the strategy portfolio and backtesting code, plus the tools for retrieving TEJ data, to the repo so the whole study can be rerun. Currently, the repo only contains the event study and regression parts.

This study is also my project at TMBA. See [Event Trading Strategy: Earnings Calls](project.html?id=tmba-event-earnings-call).
