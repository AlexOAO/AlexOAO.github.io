---
title: agent-customer-service
---

## Results

**I developed a prototype for the customer service assistant project and provided its cost-benefit framework.** It should be measured in the language of service: how many calls are handled with AI assistance, how many need to be transferred to a human agent, and the cost of service per call. The measurement framework and call volume benchmarks have been completed. Resource allocation and other aspects will be confirmed after the vendors update their assessments.

## Why this project

The Service Agent is responsible for the third stage of the customer journey: Smart Service. The goal is to provide proactive service and enhance satisfaction. During calls, customer service agents must listen to customers while looking up information. After hanging up, they must also write notes and await quality checks. Calls are concentrated during business hours, and they must be answered promptly: if resources are underestimated, there will be a bottleneck during peak hours; if they are overestimated, costs will be wasted.

## What it does

**Service recipients.** Customer service representatives. It's a Copilot for people, with customer service agents positioned between AI and customers.

**What it can do on its own:**

- Search the Knowledge Base to find the information needed to answer the customer's question.
- Draft reply.
- Write a post-call summary after the call ends.
- Perform initial quality inspection assessment.

Its input consists of call recordings and complete speech-to-text transcripts.

**What it needs to be handed over to someone:** When significant defects are identified during quality inspection, they are handed over to the responsible person for handling.

**What it can't do:** Respond directly to the customer. All content entered into the records must be confirmed by customer service personnel.

**How people supervise.** Each transaction is verified by a human (human-in-the-loop).

**framework** Because the processing of call recordings and personal data is entirely deployed locally, only local models are used: speech-to-text, along with local language models.

**How to verify it.** Sample and compare the summary with the original recording; compare the consistency between the quality control score and the manual score; confirm that the summary does not contain any personal information.

## My role

I developed a prototype for the Customer Service Assistant project. In terms of cost-benefit, it was a collaborative effort: my colleague was primarily responsible for estimating computing power, while I was responsible for providing the cost-benefit framework.

## What I did

**Phase 1 | Prototype.** Create prototypes based on customer service scenarios to allow business units to actually see the processes for knowledge base queries, draft responses, and post-call summaries. Prototype details: To be added.

**Phase 2 | Framework design.** The workload for voice and text is calculated using different units and then converted into a single unit cost: the cost of service per call.

**Phase 3 | Data collection and calculation.** The business unit provides the monthly call volume and schedules the workload during peak business hours. We held the first computing power meeting with the vendor to align on the assumptions and requested the vendor to update their assessment. We are currently waiting for the vendor's response.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business metrics: Number of calls handled with AI assistance ÷ Total number of calls; Transfer-to-agent rate.
- Realization ratios: actual service cost per call ÷ baseline; benefit realization.

## Next steps

With the vendor's updated estimate, confirm resources and finish the Customer Service baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
