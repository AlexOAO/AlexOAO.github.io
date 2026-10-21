---
title: agent-cost-roi
---

## Results

**I put four Agents with completely different cost structures into one formula: number of events × resources per event × unit price.** For the first time, the Loan Assistant, Credit Review, Customer Service, and Wealth Assistant can be compared in one table.

- 3 cost models (capacity, on-premises amortization, cloud tokens) and 1 benefit model.
- The GPU pool model, the peak estimate, and a data request form for four vendors.
- A 3-year TCO, TBE, and ROI comparison format for the 4 Agents. Each Agent's estimate is in the sub-projects below.

## Why this project

The four business AI Agents were getting ready to launch, and the bank had to decide how to split GPUs and budgets. But their costs look completely different: some use on-premises GPUs, some use cloud tokens, one uses only CPUs. Without a shared model, they cannot be compared, and nobody can decide who gets resources first.

## My role

I led the cost model and the 3-year TCO / ROI. Business units supplied volumes and benefits; I designed the models, did the math, and compared the results.

## What I did

**Phase 1 | Problem definition.** Some of the four Agents use on-premises GPUs, some use cloud tokens, one uses only CPUs. To compare them in one table, the first step is a shared unit of measure.

**Phase 2 | Framework design.** I explain the GPU pool as a building: floor area decides how many AI models can move in; operating hours decide how many Agents can be served. Space is GPU memory: it holds models, is never given back, and is a fixed cost. Time is GPU compute: it runs requests, is reused, and is a variable cost. On this framework I built three cost models and one benefit model: a capacity model, an on-premises amortization model (a shared part counts once and is split by time share), a cloud token model (volume × tokens per journey × unit price), and a benefit model (volume × improvement per unit × value per unit). One key point in the space model: KV cache memory depends on how many requests run at the same time, not on how many run in a day.

**Phase 3 | Data collection.** I designed a vendor form that asks the four vendors only for on-premises specs (model size, quantization, memory per token, concurrent requests) plus representative test samples. Business units supply volumes and benefits. Collection is in progress.

**Phase 4 | Estimate.** I placed the four Agents' parts in the bank's pool (5 RTX PRO 6000 cards at 96 GB each: 480 GB and 432,000 card-seconds per day) and estimated peak use. The AI Agent compute estimate is in progress.

**Phase 5 | Institutionalize.** When the estimates settle, deliver the final 3-year TCO / ROI and GPU quotas as the basis for resource allocation.

## Next steps

- Collect the four vendors' forms and the business units' benefit data.
- Finish the AI Agent compute estimate, then deliver the final TCO / ROI and GPU quotas.
