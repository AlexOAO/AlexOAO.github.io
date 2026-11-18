---
title: agent-customer-service
---

## Results

**I built the prototype for the Customer Service Assistant and provided its cost-benefit framework.** It is measured in service terms: how many calls AI helps handle, how many go to a human, and the service cost per call. The measurement framework and call-volume baseline are done. Resource allocation will be confirmed after the vendor updates its estimate.

## Why this project

**During a call, agents listen and look up information at the same time; after it, they write notes and wait for quality checks.** The Service Agent covers the third stage of the customer journey, Smart Service, and aims to serve proactively and raise satisfaction. Calls cluster in business hours and must be answered right away. Underestimate resources and peak hours jam; overestimate and money is wasted.

## What it does

**Who it serves.** Customer service agents. It is their Copilot, an AI helper at work. The agent stands between the AI and the customer.

**What it can do on its own:**

- Search the knowledge base for the information needed to answer the customer.
- Draft replies.
- Write a post-call summary, a short recap of the call, after it ends.
- Make a first-pass quality-check judgment.

Its input is the call recording and the full speech-to-text transcript.

**What it hands to people:** When a quality check finds a serious problem, a person handles it.

**What it can't do:** Reply to customers directly. Anything written into the records must be confirmed by the agent.

**How people supervise.** A person confirms every item, which is called human-in-the-loop.

**Architecture.** Everything runs on-premises with on-premises models only, because it handles call recordings and personal data. The models are speech-to-text plus an on-premises language model.

**How to verify it.** Verification checks three things: sample summaries against the original recordings; compare quality-check scores with human scores for consistency; confirm summaries reveal no personal data.

## My role

I built the prototype for the Customer Service Assistant. The cost-benefit work was shared: a colleague led the computing estimate, and I provided the cost-benefit framework.

## What I did

**Phase 1 | Prototype.** Built a prototype around the customer service scenario. The business unit could see knowledge-base search, draft replies, and post-call summaries actually working. Prototype details: to be added.

**Phase 2 | Framework design.** Voice and text workloads are counted in different units, then converted into one unit cost: the service cost per call.

**Phase 3 | Data collection and calculation.** The business unit supplied monthly call volume and placed the workload into peak business hours. We held a first computing meeting with the vendor to align assumptions and asked the vendor to update its estimate. We are waiting for the vendor's reply.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: calls handled with AI help ÷ all calls; transfer-to-human rate.
- Realization ratios: actual service cost per call ÷ baseline; benefit realization.

## Next steps

With the vendor's updated estimate, confirm resources and finish the Customer Service baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
