---
title: stage-plan
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## Who does what: an overview

Traditional system development follows a downward trajectory: the business department presents its requirements, which are then analyzed, designed, developed, tested, and launched. The process concludes when the system is handed over to the users. AI projects are different. There are three areas that need to be changed:

- **More roles.** Data engineers (DE), data scientists (DS), ML engineers (MLE), AI evaluation and MLOps don't exist in traditional projects; they're purple in the diagram.
- **Some roles come in earlier.** Information security, compliance, and risk management need to set red lines during the planning stage. Infrastructure needs to estimate capacity during the planning stage because GPUs have long lead times. The unit responsible for IT application systems needs to arrange the integration beforehand.
- **The end connects back to the start.** The performance figures after going live should be used to inform business planning and decide whether to increase or adjust the budget for the next round.

The division of labor process above, along with the other four stage pages, incorporates these three points into each stage. A full comparison of traditional development and AI development can be found in this article: [Traditional vs. AI Development: How the Team Chart Changes](posts/traditional-vs-ai-development.html) 。

## How to drive it: needs first, top-down

AI often stalls because of how it is pushed, not because of the technology. Three shifts:

- **From pushing a product to needs first.** A standard AI tool pitched to every department rarely fixes their end-to-end processes. Start with four questions instead: scenario, process, pain point, benefit.
- **From bottom-up to top-down.** Working only with colleagues who want to be more productive never earns the department's formal mandate. Get the department head's support and resources, and put the benefit into the department's goals.
- **From quick wins to benefit first.** Early on, building up cases is fine; once there are many, rank them by benefit, resources and technical feasibility.

## What this stage does

Business planning needs to answer one question: **Is this AI worth pursuing, and how should we measure it?** Before writing any code, define the scenario, value, cost, and specifications.

Deliverables for this phase:

- Scenario and Scope: Which part of the process is handled by AI, who is served, and through which channels.
- Boundaries: What AI can do on its own, what needs to be handed over to humans, and what it absolutely cannot do.
- Cost-benefit criteria: Estimates of workload, costs, and benefits, which are used for comparison after going live.
- Prototype: Confirm the feasibility of the approach at minimal cost.
- Risk classification: Determine which checks need to be performed afterward.

## Who takes part

- **[CXO Executives](roles.html#role-cxo)**: Sets the AI strategy and KPIs, and approves the budget ceiling.
- **[PMO Project Office](roles.html#role-pmo)**: Sets the process, prioritizes across AI projects and allocates resources.
- **[PO Product Owner](roles.html#role-po)**: Takes part in prioritizing, advises from a strategic view, and allocates BA and SA resources.
- **[BU Business Unit](roles.html#role-bu)**: Raises the scenario and pain points, defines what success looks like (for example conversion or processing rates) and supplies business volume; in the end, the business unit books the value of the AI.
- **[BA AI Business Analyst](roles.html#role-ba)**: The business units' contact. Finds and confirms needs (scenario, process, pain point, benefit) and hands them to the SA to assess; turns them into the AI task's limits and acceptance criteria, and builds the cost-benefit baseline.
- **[UX User Experience](roles.html#role-ux)**: A specialist team in the digital unit: user research, customer 360 analysis and conversation design.
- **[PM Project Manager](roles.html#role-pm)**: Owns the schedule and scope, and coordinates teams and vendors.
- **[TPM Technical PM](roles.html#role-tpm)**: Coordinates the technical plan, such as the choice of model, platform and architecture.
- **[IT PM IT Project Manager](roles.html#role-itpm)**: Represents the IT department; assesses in-house systems, environments and resources, and fits the work into IT's schedule.
- **[PR Procurement](roles.html#role-pr)**: Runs bids and contracts from the RFP; AI models and platforms get a PoC before purchase.
- **[SA Systems Analyst](roles.html#role-sa)**: Assesses feasibility and development resources, decides cloud or on-prem, and builds a prototype.
- **[TA Technical Architect](roles.html#role-ta)**: Part of Infrastructure. Plans the cloud or on-prem architecture and compute; GPUs take months to arrive, so this happens now.
- **[ISO Information Security](roles.html#role-iso)**: Confirms data classification and which data may go to external models.
- **[CCO Compliance](roles.html#role-cco)**: Determines which rules apply and sets the AI's red lines with the business unit.
- **[CRO Risk](roles.html#role-cro)**: Assesses and rates the project risk.

## Handoffs and checks

The business unit proposes a scenario, and BA and SA turn it into a specification that can be estimated. The IT department estimates the usage, and the business department provides the business volume. Together, they form the cost-benefit benchmark. The risk classification determines how stringent the subsequent verification should be.

Once there are many requests, a show of hands can't decide what to build. Every request gets done; the only question is the order, ranked with one scorecard:

- **Benefit** (BA): people affected, uses per month, hours saved per use, budget saved.
- **Feasibility** (SA): technology, resources and expected accuracy.
- **Compliance** (BA and SA): whether security, compliance and AI governance are confirmed.
- **Cost** (SA): person-days for development and infrastructure.

The PO, BA and SA review the scorecard together on a regular cadence, and the SA schedules the work from the result.

## What I did in this stage

My role at this stage is PM and SA:

- Create prototypes for four business service agents and design a common cost-benefit framework. See [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
- Design a verification mechanism before the agent goes online to ensure that risk levels correspond to specific checks. See [AI Governance](project.html?id=agent-governance) 。
- Investigate whether new technologies can be applied to business scenarios, such as [A2UI](project.html?id=a2ui-research) 。
