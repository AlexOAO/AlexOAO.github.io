---
title: agent-cost-roi
---

## Results

**I put four Agents with different cost structures into one management mechanism: before launch, each writes down a baseline for volume, cost, and benefit; after launch, ratios track how much of that baseline came true.**

- Built a shared cost-benefit framework. For the first time, the four Agents can be compared in one table.
- Defined two kinds of observable metrics: business ratios show how much work the AI actually handles; realization ratios show whether the original estimates came true.
- Each Agent's baseline is in progress; see the sub-projects below.

## Why it mattered

Four business-service Agents were preparing to launch, and the bank had to decide which got resources first. Build cost alone cannot answer that: some Agents cost on premises, some in the cloud, and each describes its benefit in different terms. The bigger problem comes after launch: if nobody checks whether the estimates came true, the assessment is only an application form.

## My role

I led the design of the cost-benefit framework and the management mechanism. Business units (BUs) provide volumes and benefits; I own the framework, calculation, and comparison.

## What I did

**Phase 1 | Problem definition.** The four Agents have completely different cost structures. To compare them in one table, the first step is a shared way to measure.

**Phase 2 | Framework design.** One pair of formulas describes every Agent: cost = volume × resource use per case × resource unit price; benefit = volume × benefit per case × value per unit. Both start from volume, so they give comparable unit cost and ROI. On this framework I defined two kinds of observable metrics:

- Business ratios: work handled by AI ÷ total volume, such as AI handling rate, automation rate, and hand-over-to-human rate. They answer "is the AI actually doing the work?"
- Realization ratios: actual ÷ baseline, such as volume realization, cost execution, and benefit realization. They answer "did the original estimate come true?"

**Phase 3 | Data collection.** BUs provide volumes and benefits; vendors provide technical specs. Collection is in progress.

**Phase 4 | Estimate.** With the collected data, build a 3-year baseline of volume, cost, and benefit for each Agent. This baseline is the denominator of every realization ratio after launch. In progress.

**Phase 5 | Institutionalize.** The plan is to connect the metrics to resource allocation: submit a baseline before launch, track business and realization ratios regularly after launch, and start a review to adjust resources or scope when a realization ratio falls below the threshold.

## Next steps

- Collect the BUs' volume and benefit data and finish the four baselines.
- Connect to the AI operations dashboard so realization ratios are produced regularly.

## Further reading

How the metrics appear on a dashboard (Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
