---
title: agent-credit-review
---

## Results

**I built the prototype for Smart Underwriting and set its unit cost and three-year cost baseline.** The next step is to turn the baseline into trackable metrics. The metrics answer two things: how many cases AI handled, and whether the estimates came true.

- The production resource allocation is confirmed.
- Processing runs in off-peak batches and uses no peak business-hour resources.

## Why this project

**Underwriters check piles of financial documents every day; it is slow, and standards are hard to keep consistent.** The Credit Agent covers the second stage of the customer journey, Smart Transactions, and aims to approve loans fast and work more efficiently. Underwriters check each document and calculate annual income by hand. Case volume grows every year, and management also has to answer: what does each case cost? How is the three-year budget actually being spent?

## What it does

**Who it serves.** Underwriting staff. It does not face customers.

**What it can do on its own:**

- Use OCR text recognition to read financial documents and non-standard documents.
- Check whether document content is consistent and reasonable.
- Calculate annual income and give the reason for each judgment.

**What it hands to people:** Cases below the confidence threshold go to underwriting staff. Until accuracy reaches the target, people review every credit-related output.

**What it can't do:** Make credit decisions, credit scores, or thresholds. The decision stays with people.

**How people supervise.** A person reviews every case, which is called human-in-the-loop. It is meant to take over part of the underwriting judgment and gradually reduce human review.

**Architecture.** A mix of cloud and on-premises. On-premises handles document recognition and the review of inconsistent content. Processing runs in off-peak batches.

**How to verify it.** Verification checks three things. First, use case samples with known answers to measure the accuracy of income and reasonableness judgments. Second, applicants with the same conditions but from different groups must get the same result. Third, every judgment must come with a reason.

## My role

I built the prototype for Smart Underwriting and owned its cost-benefit analysis.

## What I did

**Phase 1 | Prototype.** Built a prototype around the underwriting scenario. Underwriters could see document recognition, reasonableness checks, and income calculation actually working. Prototype details: to be added.

**Phase 2 | Framework design.** Split the process into two parts: on-premises recognition and review, and cloud processing. Each part is costed in the unit closest to its workload, then combined into a cost per case.

**Phase 3 | Data collection and calculation.** The business unit supplied current case volume and a three-year growth forecast. From this I finished the unit cost and three-year cost baseline, and confirmed the production resource allocation.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: cases handled by AI ÷ all cases; human review rate.
- Realization ratios: actual volume ÷ baseline volume; cost execution; benefit realization.

## Next steps

Add build and maintenance costs to finish the 3-year TCO and ROI baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
