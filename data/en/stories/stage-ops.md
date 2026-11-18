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

- **[EU End User](roles.html#role-eu)**: Customers. They use the AI and give feedback.
- **[OP Frontline Staff](roles.html#role-op)**: Underwriters and call-center agents who work with the AI and confirm each output; their feedback is where improvement starts.
- **[MLOps Model Operations](roles.html#role-mlops)**: Beyond service health, monitors answer quality, model drift and token cost.
- **[FDE Forward-Deployed Eng](roles.html#role-fde)**: Collects issues on site and adjusts the workflow and prompts.
- **[Ops Operations](roles.html#role-ops)**: System monitoring, backups and incident handling.
- **[AP Application Owner](roles.html#role-ap)**: Takes over maintenance.
- **[SD Service Desk](roles.html#role-sd)**: Takes user issues and passes them to the team responsible.
- **[BA AI Business Analyst](roles.html#role-ba)**: Analyzes error cases; compares actual business volume, cost and benefit with the baseline to calculate the realization rate.
- **[BU Business Unit](roles.html#role-bu)**: Drives adoption, keeps the knowledge base current and reports business results.
- **[PMO Project Office](roles.html#role-pmo)**: Decides from the realization rate whether to scale up or adjust resources.
- **[CXO Executives](roles.html#role-cxo)**: Reallocates resources.
- **[CRO Risk](roles.html#role-cro)**: With security, keeps monitoring risk and periodically checks that the AI still meets the rules.

## Handoffs and checks

Operational figures feed back into business planning: projects with an excessively low achievement rate require a review of their scope or resources, while those performing well can be expanded. This is the closed loop of the AI SDLC.

Worse answers do not always mean model drift; the content may be out of date. Business units have to keep the knowledge base current, so there needs to be a standard maintenance request process: the business unit raises it with the BA, prepares the material, and it is ranked together with new requests. Count maintenance in that ranking and keep development capacity for it, or new requests will crowd it out.

## What I did in this stage

- Design metrics for the AI Operations Performance Dashboard, using the same set of metrics to evaluate both internal AI tools and external agents. See [AI Operations Performance Dashboard](project.html?id=ai-ops-dashboard) 。
- Gemini courses designed for real-world business scenarios to help employees apply AI to their work. See [Gemini Training Program](project.html?id=gemini-training) 。
- Operating Your Own Product FinJourney: Accounts, Backups, AI Usage Limits, and User Consent. See [FinJourney](project.html?id=finjourney) 。
