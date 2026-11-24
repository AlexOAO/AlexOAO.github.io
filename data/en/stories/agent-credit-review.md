---
title: agent-credit-review
---

## Results

**I built the prototype for Credit Review and worked out its cost per case and a three-year cost baseline.** The prototype actually recognizes documents: On the evaluation set with known answers, the field accuracy is 96.6%, and all annual incomes are calculated correctly. The next step is to turn the benchmark into a trackable indicator to answer two questions: how many cases the AI has processed, and whether the initial estimates have been met.

- How much computing the live system needs is now confirmed.
- The work runs in batches during off-peak hours, so it takes no resources away from busy business hours.

## Why this project

**Underwriters check piles of proof-of-income documents every day. It takes a lot of time, and it is hard to apply the same standard every time.** The Credit Agent handles the second stage of the customer journey, Smart Transactions, which aims to approve loans faster and work more efficiently. Underwriters check documents one by one and work out annual income by hand. Case volume grows every year, and management also needs to know: what does each case cost, and how is the three-year budget really being spent?

## What it does

**Service recipients.** Underwriting staff. It does not interact directly with customers.

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

**Phase 1 | prototype** I created a prototype based on the underwriting process, allowing underwriters to see firsthand how it identifies documents, checks for reasonableness, and calculates annual income. The prototype can be operated in practice:

- **Files in different formats.** I wrote a generator to create six types of synthetic financial documents: pay stubs, withholding tax statements, salary bank statements, income statements, employment certificates, and individual income tax payment forms. Each type has a different layout, along with skewing, noise, and stamps. The documents do not contain real customer information, and each one has the correct answer for comparison.
- **It really recognizes things, and you can switch the engine.** By default, OCR is performed locally, representing the on-premises side. You can also switch to a cloud-based visual model (OpenAI API format) or directly read the pre-stored results. If a date or amount is unclear, that cell will be cropped and read again, which is a re-check on the local end.
- **Check and calculate annual income.** Cross-document comparison: Check if the pay stubs, withholding tax statements, and bankbook entries match; verify the consistency between occupation, income ranges, and whether the income is continuous. The annual income section lists the rules and formulas used, along with the rationale for each step. It also includes figures calculated from other sources for the underwriters to compare.
- **If you're not sure, hand it over to someone else.** If the case confidence is below the threshold (default 0.75), it is transferred to a human agent. The underwriting officer can accept or modify the decision. If modifying, the reason must be provided. The screen does not display credit approval recommendations or credit scores.
- **Off-peak batch.** Cases can be scheduled for batch processing during off-peak hours, or you can select "Execute Now".
- **Continue from the previous leg of the journey.** You can import the "Application Case Package" sent by the Loan Assistant and perform OCR on the document images uploaded by the customer.
- **Admin** 12-page admin dashboard, including evaluation sets, fairness checks, rule management (changes require review), and confidence thresholds.

Actual test results (actually running OCR, without using pre-stored results):

- Evaluation Set 12: Field accuracy was 96.6%. All annual incomes were calculated correctly, and all issues embedded in the documents were identified.
- 12 case studies: Field accuracy of 97.7%, all annual revenues were calculated correctly, and all issues embedded in the documents were identified.
- Four sets of paired tests for fairness yielded identical results: in each set, two applicants had identical qualifications, differing only in one aspect—gender, age, place of residence, or name.

**Trial Prototype:** [kgib-credit.xiang-wei-li.com](https://kgib-credit.xiang-wei-li.com). Log in to the Underwriting Workbench using the test account shown on the screen. Both the documents and the applicants are simulated.

**Phase 2 | Framework design.** I split the process into two parts: reading and re-checking on-premises, and processing in the cloud. Each part is costed in the unit that best matches its workload, then added up into a cost per case.

**Phase 3 | Data collection and calculation.** The business unit gave me current case volume and a three-year growth forecast. From that I worked out the cost per case and the three-year cost baseline, and confirmed how much computing the live system needs.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: cases handled by AI ÷ all cases; human review rate.
- Realization ratios: actual volume ÷ baseline volume; cost execution; benefit realization.

## Next steps

Add build and maintenance costs to finish the 3-year TCO (total cost of ownership) and ROI (return on investment) baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
