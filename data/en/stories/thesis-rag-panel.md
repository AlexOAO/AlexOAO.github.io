---
title: thesis-rag-panel
---

## Results

**I had an LLM read financial statements and produce 6 scores. Adding them to the stock return model raised its within R² from 5.14% to 63.73%.** Within R² shows how much of the change in stock returns the model explains; higher means it explains more.

- All 6 LLM dimension scores are statistically significant at the 1% level.
- In a pilot reliability test, the ICC was 0.759. ICC measures whether scores are stable and consistent.

## Why this project

The financial ratios that research usually relies on explain only a small part of the changes in stock returns. Yet financial statements hold much more text and numbers. My question: **can a large language model extract stronger signals from financial statements?**

## My role

This is my master's thesis at NTUST's Graduate Institute of Finance, advised by Professors Chih-Lung Chou and Joseph C.P. Shieh.

## What I did

**Phase 1 | Question.** LLMs can read the text in financial statements. Can they explain the large part that traditional financial ratios miss?

**Phase 2 | Data.** 592 listed electronics companies over 64 quarters (2009Q3 to 2025Q2), for 37,888 company-quarter records.

**Phase 3 | Method.** I built a RAG-LLM system: the AI looks up the financial data, analyzes 101 financial variables, and scores 6 dimensions. I then used fixed-effects panel models, a statistical method that follows the same companies over time, to compare two models: a baseline with only traditional variables, and an enhanced model that adds the 6 LLM scores. I also had to show whether the scores were stable, so I ran a pilot ICC test of their reliability.

**Phase 4 | Evidence.** Within R² rose from 5.14% to 63.73%; all 6 dimension scores are significant at the 1% level; the pilot ICC is 0.759.

**Phase 5 | Conclusion.** Thesis done and degree earned. The full thesis is in the [NTUST thesis system](https://etheses.lib.ntust.edu.tw/detail/27b99ae63b98c427ee18434207d7cdc4/?seq=18).

## Next steps

The thesis applies RAG and LLMs to financial data and checks the results with statistics. I work the same way: build the system first, then prove with data that it works.
