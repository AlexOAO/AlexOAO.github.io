---
title: stage-plan
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## What this stage does

Business planning needs to answer one question: **Is this AI worth pursuing, and how should we measure it?** Before writing any code, define the scenario, value, cost, and specifications.

Deliverables for this phase:

- Scenario and Scope: Which part of the process is handled by AI, who is served, and through which channels.
- Boundaries: What AI can do on its own, what needs to be handed over to humans, and what it absolutely cannot do.
- Cost-benefit criteria: Estimates of workload, costs, and benefits, which are used for comparison after going live.
- Prototype: Confirm the feasibility of the approach at minimal cost.
- Risk classification: Determine which checks need to be performed afterward.

## Who takes part

- **AIBU (Business Unit)**: Present requirements and scenarios, define what success looks like (e.g., conversion rate, processing rate), and provide business volume. Ultimately, the value of AI must be recognized by the business unit.
- **AIBA (AI Business Analyst)**: Translate business requirements into tasks that AI can perform: break down processes, define inputs and outputs, and document boundaries and acceptance criteria.
- **SA (Systems Analyst)**: Determine which systems and data to connect, whether the data can be migrated to the cloud, and whether to use the cloud or on-premises solutions, and then draw up a preliminary architecture.
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
