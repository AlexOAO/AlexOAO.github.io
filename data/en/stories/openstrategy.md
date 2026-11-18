---
title: openstrategy
---

## Results

**I organized the research code for the TMBA investor conference event strategy into Python scripts in 10 stages. A composite factor with weights set on in-sample data had a Sharpe ratio (how much return you get for each unit of risk) of 0.94 in 2025, slightly below the market's 0.99, so it did not meet the target.** This is an event study. I tested the cumulative abnormal return (CAR) around investor conferences, meaning how much the share price moved beyond what would normally be expected, added up. I then found the factors that explain it and combined them into stock-picking signals.

## Why this project

When a company chooses to hold an investor conference, it may be telling the market it feels confident about its business. I wanted to answer three questions: does the share price move unusually around the conference? Which companies see bigger abnormal returns? Can this become a signal you can trade on?

## My role

This was a TMBA research project that I led. I did the research design, the programming, and the backtesting.

## What I did

**Phase 1 | Events and abnormal returns.** I took investor conference events from TEJ, using the conference date as the event date. Daily abnormal return = the stock's return − the CAPM expected return, which removes the normal move driven by the market. Beta (how much a stock moves with the market) is a weighted mix of the 1-year and 3-year betas: 0.7 × 1 year + 0.3 × 3 years. Finally, the abnormal returns inside the event window are added up to give the CAR.

**Phase 2 | Explanatory variables and regression.** The finding is that four variables are significant: prior returns, days since the last conference, company size, and price-to-book ratio. I started with nine variables: whether a public video recording was provided, turnover in the 20 days before the event, return in the 10 days before the event, changes in the top ten shareholders' holdings, days since the previous investor conference (logarithm), changes in retail investor holdings, market capitalization (logarithm), the price-to-book ratio, and industry. I then tested them with OLS regression and checked the correlations and VIF to make sure the variables did not overlap too much. In the [-3, 3] window, those four variables were significant; in the [-2, 2] window, the results were the same.

**Phase 3 | Integrated calculation.** Originally, each variable called the TEJ API on its own. I combined them into one calculator: it fetches the data once, shares a cache, and then calculates all the variables at the same time.

**Phase 4 | Strategy and out-of-sample validation.** Each of the four significant factors is turned into a Z-score, and the in-sample Sharpe ratios set the weights that combine them into one score; a position is opened only when the score is above 0. Money follows the score: the top 20% get 1.5 times, the middle 60% get 1 time, and the bottom 20% get 0.5 times. The in-sample period is 2020/2/1 to 2022/12/31, the out-of-sample period is 2023/1/1 to 2024/12/30, and 2025 is checked separately. The composite factor's Sharpe ratio was 1.21 in the training period (market 0.39), 1.37 over the full period (market 0.82), and 0.94 in 2025 (market 0.99). The win rate per trade is 45.1%.

## Next steps

- Find out why it trailed the market in 2025.
- Add the code that builds the strategy and runs the backtests, plus the tools for pulling TEJ data, to the repo so the whole study can be rerun. Right now the repo only has the event study and regression parts.

This study is also my project at TMBA. See [Event Trading Strategy: Earnings Calls](project.html?id=tmba-event-earnings-call).
