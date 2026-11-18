---
title: stage-plan
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## Who does what: an overview

Traditional system development follows a downward trajectory: the business department presents its requirements, which are then analyzed, designed, developed, tested, and launched. The process concludes when the system is handed over to the users. AI projects are different. There are three areas that need to be changed:

- **More roles.** The data team, ML/LLM engineers, AI evaluation, and MLOps are all absent from traditional projects (shown in purple in the diagram).
- **Some roles come in earlier.** Information security, compliance, and risk management need to set red lines during the planning stage. Infrastructure needs to estimate capacity during the planning stage because GPUs have long lead times. The unit responsible for IT application systems needs to arrange the integration beforehand.
- **The end connects back to the start.** The performance figures after going live should be used to inform business planning and decide whether to increase or adjust the budget for the next round.

The division of labor process above, along with the other four stage pages, incorporates these three points into each stage. A full comparison of traditional development and AI development can be found in this article: [Traditional vs. AI Development: How the Team Chart Changes](posts/traditional-vs-ai-development.html) 。

## What this stage does

Business planning needs to answer one question: **Is this AI worth pursuing, and how should we measure it?** Before writing any code, define the scenario, value, cost, and specifications.

Deliverables for this phase:

- Scenario and Scope: Which part of the process is handled by AI, who is served, and through which channels.
- Boundaries: What AI can do on its own, what needs to be handed over to humans, and what it absolutely cannot do.
- Cost-benefit criteria: Estimates of workload, costs, and benefits, which are used for comparison after going live.
- Prototype: Confirm the feasibility of the approach at minimal cost.
- Risk classification: Determine which checks need to be performed afterward.

## Who takes part

- **CXO/Decision-Makers**: Set annual strategies and KPIs, and approve budget limits.
- **AIBU (Business Unit)**: Present requirements and scenarios, define what success looks like (e.g., conversion rate, processing rate), and provide business volume. Ultimately, the value of AI must be recognized by the business unit.
- **PO (Product Owner)**: Define the product roadmap and prioritize requirements.
- **AIBA (AI Business Analyst)**: Translate business requirements into tasks that AI can perform: break down processes, define inputs and outputs, and document boundaries and acceptance criteria.
- **SA (Systems Analyst)**: Determine which systems and data to connect, whether the data can be migrated to the cloud, and whether to use the cloud or on-premises solutions, and then draw up a preliminary architecture.
- **Infra (Infrastructure)**: Estimate computing power and capacity based on business volume. The lead time for GPUs is long, so estimates need to be made at this stage.
- **Cost-benefit**: Establish a baseline for costs and benefits using "business volume × usage per unit × unit price," and use it to calculate the realization rate after going live.
- **PMO**: Prioritize among multiple AI projects. The cost-benefit benchmark serves as the basis for its resource allocation.
- **Compliance/Risk Management**: Determine which regulations apply, work with business units to establish AI red lines, and decide on risk levels.
- **Information Security**: Confirm the data classification and which data can be sent to external models.

## Handoffs and checks

The business unit proposes a scenario, and AIBA and SA turn it into a specification that can be estimated. The IT department estimates the usage, and the business department provides the business volume. Together, they form the cost-benefit benchmark. The risk classification determines how stringent the subsequent verification should be.

## What I did in this stage

My role at this stage is PM and SA:

- Create prototypes for four business service agents and design a common cost-benefit framework. See [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
- Design a verification mechanism before the agent goes online to ensure that risk levels correspond to specific checks. See [AI Governance](project.html?id=agent-governance) 。
- Investigate whether new technologies can be applied to business scenarios, such as [A2UI](project.html?id=a2ui-research) 。
