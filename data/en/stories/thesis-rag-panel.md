## Why this project

Financial statements hold a lot of text and numbers, but the financial ratios that research usually uses explain only a small part of stock return variance. My research question: **can a large language model extract stronger signals from financial statements?**

## My role

This is my master's thesis at NTUST's Graduate Institute of Finance, advised by Professors Chih-Lung Chou and Joseph C.P. Shieh.

## What I did

### Data

592 listed electronics companies over 64 quarters (2009Q3 to 2025Q2): 37,888 firm-quarter observations.

### Method

- Built a RAG-LLM system that analyzes 101 financial variables.
- Had the LLM produce scores on 6 dimensions.
- Compared two fixed-effects panel models: a baseline with traditional financial variables, and an enhanced model that adds the 6 LLM scores.
- Ran a pilot ICC test on score reliability: does the same statement get stable scores?

## Results

- Within R² rose from 5.14% with traditional variables to 63.73% with the LLM scores.
- All 6 LLM dimension scores are significant at the 1% level.
- The pilot reliability test gave an ICC of 0.759.

## How this connects to my work

The thesis applies RAG and LLMs to financial data and checks the results with statistics. That is also what I do at work: build the system, then prove with data that it works.
