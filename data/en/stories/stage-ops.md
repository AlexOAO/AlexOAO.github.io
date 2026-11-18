---
title: stage-ops
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## What this stage does

Operations Monitoring needs to answer: **After going live, has the AI continued to function well? Is anyone using it? Have the initially estimated benefits been realized?** Going live is not the end. Models degrade, usage changes, and costs fluctuate, so continuous monitoring is essential, with the results fed back into the next planning cycle.

Deliverables for this phase:

- Monitoring: Whether the service is functioning normally, whether the quality of responses is consistent, and whether there are any abnormal outputs.
- Performance indicators: utilization rate, AI processing rate, escalation rate, cost execution rate, and benefit realization rate.
- Periodic revalidation: Run the test again after the model or data has changed.
- Promotion and education/training: Ensure employees actually use it.

## Who takes part

- **End Users and Frontline Staff**: Customers, as well as underwriting and customer service personnel who work with AI. Their usage records and feedback serve as the starting point for improvement.
- **AIBU (Business Unit)**: Promote usage, report on business performance, and propose requirements for the next round.
- **PMO**: Consolidate the performance of each project, compare the actual values with the benchmarks, and decide whether to increase or adjust resources.
- **MLOps/SRE**: In addition to monitoring whether the service is functioning normally, it is also necessary to monitor the quality of responses, model degradation, and token costs.
- **BA also owns cost-benefit**: Compares actual business volume, cost and benefit with the pre-launch baseline to calculate the realization rate.
- **Infra (Infrastructure)**: Monitor computing power usage and expand or reallocate as needed.
- **AIBA**: Analyze usage records and error cases to identify areas for improvement.
- **Information Security and Compliance/Risk Management**: Continuously monitor risks and regularly review whether they still comply with regulations.
- **CXO/Decision-Makers**: Reallocate resources based on realization rates.

## Handoffs and checks

Operational figures feed back into business planning: projects with an excessively low achievement rate require a review of their scope or resources, while those performing well can be expanded. This is the closed loop of the AI SDLC.

Worse answers do not always mean model drift; the content may be out of date. Business units have to keep the knowledge base current, so there needs to be a standard maintenance request process: the business unit raises it with the BA, prepares the material, and it is ranked together with new requests. Count maintenance in that ranking and keep development capacity for it, or new requests will crowd it out.

## What I did in this stage

- Design metrics for the AI Operations Performance Dashboard, using the same set of metrics to evaluate both internal AI tools and external agents. See [AI Operations Performance Dashboard](project.html?id=ai-ops-dashboard) 。
- Gemini courses designed for real-world business scenarios to help employees apply AI to their work. See [Gemini Training Program](project.html?id=gemini-training) 。
- Operating Your Own Product FinJourney: Accounts, Backups, AI Usage Limits, and User Consent. See [FinJourney](project.html?id=finjourney) 。
