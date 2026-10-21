---
title: thesis-rag-panel
---

## Results

**Adding 6 scores that an LLM produced from financial statements raised the within R² of the stock return model from 5.14% to 63.73%.**

- All 6 LLM dimension scores are significant at the 1% level.
- The pilot reliability test gave an ICC of 0.759.

## Why this project

Financial statements hold a lot of text and numbers, but the financial ratios research usually uses explain only a small part of stock return variance. My question: **can a large language model extract stronger signals from financial statements?**

## My role

This is my master's thesis at NTUST's Graduate Institute of Finance, advised by Professors Chih-Lung Chou and Joseph C.P. Shieh.

## What I did

**Phase 1 | Question.** Traditional financial ratios explain only a small part of stock return variance. LLMs can read the text in financial statements; can they fill the gap?

**Phase 2 | Data.** 592 listed electronics companies over 64 quarters (2009Q3 to 2025Q2): 37,888 firm-quarters.

**Phase 3 | Method.** A RAG-LLM system analyzes 101 financial variables and scores 6 dimensions; fixed-effects panel models then compare a baseline with traditional variables against an enhanced model with the 6 LLM scores. Whether the scores are stable also needs an answer, so a pilot ICC test checks their reliability.

**Phase 4 | Evidence.** Within R² rose from 5.14% to 63.73%; all 6 dimension scores are significant at the 1% level; the pilot ICC is 0.759.

**Phase 5 | Conclusion.** Thesis done and degree earned. The full thesis is in the [NTUST thesis system](https://etheses.lib.ntust.edu.tw/detail/27b99ae63b98c427ee18434207d7cdc4/?seq=18).

## Next steps

The thesis applies RAG and LLMs to financial data and checks the results with statistics. That is also how I work: build the system, then prove with data that it works.
