---
title: stage-gov
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## What this stage does

AI governance is not a single stage but spans the entire lifecycle: **Establish standards during business planning, conduct checks at each stage, and continuously monitor during operations.** It needs to answer: Does this AI comply with regulations and internal standards? If there's a problem, who's responsible?

Deliverables for this phase:

- Standards: Principles for the use of AI, risk classification, and the checks to be performed for each level.
- Pre-launch review: Documentation, output testing, and behavioral controls, aligned with regulatory principles.
- Division of responsibilities: Who creates, who approves, who publishes, and who audits. The same person cannot handle all of these tasks.
- Regular reviews: Continuous monitoring after launch, with guidelines updated regularly.

## Who takes part

- **Compliance/Risk Management**: Interpret regulations, establish risk classifications, and provide opinions on each AI system.
- **Information Security**: Data protection, access control, and protection against model attacks.
- **PMO/AI Working Group**: Take stock of all AI applications, confirm their classification, and review the initial assessment results.
- **AIBU (Business Unit)**: Conduct risk assessments and collaborate with the Compliance team to establish rules and boundaries for AI.
- **AIBA and SA**: Transform specifications into testable items and system controls.
- **Admin commission**: Approve the launch of AI with higher risk.
- **audit**: Conduct an independent inspection to determine whether the entire process complies with regulations.

## Handoffs and checks

The common approach involves three lines of defense: the first is the requirements and development units, the second is information security, compliance, and risk management, and the third is auditing. The pre-launch checkpoint is where the three lines of defense converge.

## What I did in this stage

- Design a pre-launch verification mechanism for AI Agents: A three-tiered verification process aligned with regulatory principles, transforming guidelines into verifiable criteria. See [Agent Online Detection Mechanism](project.html?id=agent-governance) 。
- At KGI Financial Group, the manual review of AI usage reports has been replaced with automation. See [Automated Review System](project.html?id=ai-governance-review) 。
