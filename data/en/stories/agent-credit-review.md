---
title: agent-credit-review
---

## Results

**I developed a prototype for the Smart Underwriting project and established its unit cost and three-year cost baseline.** The next step is to turn the benchmarks into trackable indicators: how many cases AI has handled, and whether the estimates have been fulfilled.

- The production resource allocation is confirmed.
- Processing runs as off-peak batches and takes no peak business-hour resources.

## Why this project

Credit Agent is responsible for the second stage of the customer journey: Smart Transactions. The goal is to approve loans quickly and improve efficiency. Credit review officers have to go through a large number of financial documents every day, checking each one and calculating annual income. This is time-consuming, and it is not easy to maintain consistent standards. The number of cases grows every year, and management also needs to answer the question: What is the cost of each case? How well has the three-year budget been implemented in practice?

## What it does

**Service recipients.** Underwriting staff. It does not interact directly with customers.

**What it can do on its own:**

- Recognize financial documents and non-standard documents (OCR).
- Check whether the content of the document is consistent and reasonable.
- Calculate the annual income and provide the rationale for the determination.

**What it needs to be handed over to someone:** Cases with a confidence level below the threshold are referred to credit review personnel for handling. All credit-related outputs are reviewed by humans until the accuracy target is met.

**What it can't do:** Generate credit decisions, credit scores, or thresholds. The decision-making authority remains with people.

**How people supervise.** Each item is reviewed by a human (human-in-the-loop). It is positioned to replace part of the underwriting assessment and gradually reduce the need for human review.

**framework** A hybrid of cloud and on-premises. The on-premises system is responsible for document recognition and the review of inconsistencies, with the processing workflow scheduled to run in batches during off-peak hours.

**How to verify it.** Using a sample of cases with known answers, measure the accuracy of annual income and reasonableness judgments; applicants with the same conditions but belonging to different groups must receive the same results; each judgment must be accompanied by a justification.

## My role

I developed a prototype for the smart underwriting project and was responsible for its cost-benefit analysis.

## What I did

**Phase 1 | Prototype.** Create a prototype based on the underwriting scenario, allowing underwriters to actually see the processes of document recognition, reasonableness checks, and annual income calculation. Prototype details: To be added.

**Phase 2 | Framework design.** The process is divided into two stages: on-premises identification and review, and cloud processing. The cost of each stage is calculated using the unit that most closely reflects the workload, and then the unit costs are combined to determine the cost per item.

**Phase 3 | Data collection and calculation.** The business unit provides the current case volume and a three-year growth forecast. Complete the unit cost and three-year cost baseline, and confirm the resource allocation for the production environment.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: cases handled by AI ÷ all cases; human review rate.
- Realization ratios: actual volume ÷ baseline volume; cost execution; benefit realization.

## Next steps

Add build and maintenance costs to finish the 3-year TCO and ROI baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
