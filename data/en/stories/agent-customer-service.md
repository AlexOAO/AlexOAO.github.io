---
title: agent-customer-service
---

## Results

**I built the prototype for the Customer Service Assistant and provided its cost-benefit framework.** It is measured in service terms: how many calls the AI helps handle, how many have to go to a person, and what each call costs to serve. The measurement framework and call-volume baseline are done. How much computing it needs will be confirmed once the vendor updates its estimate.

## Why this project

**During a call, service staff have to listen and look things up at the same time. After hanging up, they still have to write notes and wait for a quality check.** The Service Agent handles the third stage of the customer journey, Smart Service, which aims to serve customers proactively and make them happier. Calls bunch up during business hours and must be answered right away. Plan too few resources and peak hours jam; plan too many and money is wasted.

## What it does

**Who it serves.** Customer service staff. It is their AI helper at work (Copilot). The staff member talks to the customer, and the AI helps from behind.

**What it can do on its own:**

- Search the knowledge base for the information needed to answer the customer.
- Draft replies in advance.
- Write a post-call summary, a short recap of the call, after it ends.
- Do a first check on service quality (quality check).

It works from the call recording and the full transcript of the call turned into text.

**What it hands to people:** When a quality check finds a serious problem, a person handles it.

**What it can't do:** Reply to customers directly. Staff must confirm anything written into the records.

**How people supervise.** A person confirms every item, which is called human-in-the-loop.

**Architecture.** Because it handles call recordings and personal data, it runs fully on the bank's own servers (on-premises), with on-premises models only: one that turns speech into text, plus an on-premises language model.

**How to verify it.** Verification checks three things: compare a sample of summaries against the original recordings; check that the AI's quality scores match the scores people give; and confirm that summaries reveal no personal data.

## My role

I built the prototype for the Customer Service Assistant. The cost-benefit work was shared with a colleague: they led the computing estimate, and I provided the cost-benefit framework.

## What I did

**Phase 1 | Prototype.** I built the prototype around how customer service really works, so the business unit could see it search the knowledge base, draft replies, and write post-call summaries. Prototype details: to be added.

**Phase 2 | Framework design.** Voice and text workloads are counted in different units. I converted both into one unit cost: the service cost per call.

**Phase 3 | Data collection and calculation.** The business unit gave us monthly call volume and placed the workload into peak business hours. We held a first computing meeting with the vendor to agree on assumptions, then asked the vendor to update its estimate. We are waiting for the vendor's reply.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: calls handled with AI help ÷ all calls; transfer-to-human rate.
- Realization ratios: actual service cost per call ÷ baseline; benefit realization.

## Next steps

Once the vendor's updated estimate arrives, confirm the resources and finish the Customer Service Assistant's baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
