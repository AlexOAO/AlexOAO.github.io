---
title: agent-credit-review
---

## Results

**I built the prototype for Credit Review and worked out its cost per case and a three-year cost baseline.** The next step is to turn the baseline into metrics we can track, answering two things: how many cases the AI handled, and whether the original estimates came true.

- How much computing the live system needs is now confirmed.
- The work runs in batches during off-peak hours, so it takes no resources away from busy business hours.

## Why this project

**Underwriters check piles of proof-of-income documents every day. It takes a lot of time, and it is hard to apply the same standard every time.** The Credit Agent handles the second stage of the customer journey, Smart Transactions, which aims to approve loans faster and work more efficiently. Underwriters check documents one by one and work out annual income by hand. Case volume grows every year, and management also needs to know: what does each case cost, and how is the three-year budget really being spent?

## What it does

**Who it serves.** Underwriting staff. It does not face customers.

**What it can do on its own:**

- Use OCR text recognition to read proof-of-income documents and documents in all kinds of formats.
- Check whether what the documents say is consistent and makes sense.
- Work out annual income and give the reason for each judgment.

**What it hands to people:** Cases it is unsure about (below the confidence threshold) go to underwriting staff. Until accuracy reaches the target, a person double-checks every result related to lending.

**What it can't do:** Make lending decisions, give credit scores, or set thresholds. The decision stays with people.

**How people supervise.** A person reviews every case, which is called human-in-the-loop. The aim is for it to take over part of the underwriting judgment, so human review can slowly shrink.

**Architecture.** It uses both the cloud and the bank's own servers (on-premises). On-premises handles reading the documents, and a second check when the content does not match up. The work runs in off-peak batches.

**How to verify it.** Verification checks three things. First, use cases where the right answer is already known to test how accurately it works out income and judges whether things make sense. Second, applicants with the same conditions but from different groups must get the same result. Third, every judgment must come with a reason.

## My role

I built the prototype for Credit Review and owned its cost-benefit analysis.

## What I did

**Phase 1 | Prototype.** I built the prototype around how underwriting really works, so underwriters could see it read documents, check whether they make sense, and work out income. Prototype details: to be added.

**Phase 2 | Framework design.** I split the process into two parts: reading and re-checking on-premises, and processing in the cloud. Each part is costed in the unit that best matches its workload, then added up into a cost per case.

**Phase 3 | Data collection and calculation.** The business unit gave me current case volume and a three-year growth forecast. From that I worked out the cost per case and the three-year cost baseline, and confirmed how much computing the live system needs.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: cases handled by AI ÷ all cases; human review rate.
- Realization ratios: actual volume ÷ baseline volume; cost execution; benefit realization.

## Next steps

Add build and maintenance costs to finish the 3-year TCO (total cost of ownership) and ROI (return on investment) baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
