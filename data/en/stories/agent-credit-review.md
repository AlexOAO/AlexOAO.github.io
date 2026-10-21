---
title: agent-credit-review
---

## Results

**Credit Review costs about NT$1.92 in cloud tokens per case; over three years, the annual token cost grows from about NT$346,591 to NT$427,034.**

- Production uses 1 GPU.
- The on-premises parts run as off-peak batches and take no peak business-hour compute.

## Why this project

Credit Review (Credit Agent) handles credit review documents. Case volume grows every year: 13,513 cases per month today, 18,480 forecast in year 3. A budget based on today's cost will be wrong next year. I had two questions: what does one case cost, and what is the 3-year total?

## My role

I estimate Credit Review's cost and GPU allocation.

## What I did

**Phase 1 | Framework design.** I split the flow in two: on premises, two OCR models read the documents and an SLM checks inconsistencies; a cloud LLM processes the results. OCR work is measured in pages, not tokens: a dense table page and a one-line title differ ten times in tokens but take similar scan time. The on-premises parts run as off-peak batches and take no peak business-hour compute.

**Phase 2 | Data collection.** From 13,513 cases per month today, the business unit forecasts 14,999, 16,649, and 18,480 in years 1 to 3.

**Phase 3 | Estimate.** Each case uses 11,250 input and 2,500 output tokens. With a GPT5.5 price assumption ($2.5 input / $15 output), that is about NT$1.92 per case; multiplied by the growing volume, it gives the 3-year token cost. Production GPU allocation was also confirmed at 1.

**Phase 4 | Institutionalize.** Add build and maintenance costs, then deliver the full 3-year TCO and ROI.

## Next steps

Add build and maintenance costs, then deliver the full 3-year TCO and ROI.
