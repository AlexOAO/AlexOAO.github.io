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

- **[AIC AI Committee](roles.html#role-aic)**: Approves medium- and high-risk AI launches.
- **[MRM Model Risk Management](roles.html#role-mrm)**: The second line; validates models independently.
- **[WG AI Working Group](roles.html#role-wg)**: Keeps the AI inventory, confirms risk ratings and does the first review of checks.
- **[BU Business Unit](roles.html#role-bu)**: The first line. Fills in the risk rating for the department head's approval, and writes the AI's rules and red lines with compliance.
- **[ISO Information Security](roles.html#role-iso)**: The second line. Data protection, access control and defense against attacks on the model.
- **[CCO Compliance](roles.html#role-cco)**: The second line. Interprets regulations, sets red lines and gives an opinion on each AI.
- **[CRO Risk](roles.html#role-cro)**: The second line. Risk rating and ongoing monitoring.
- **[IA Internal Audit](roles.html#role-ia)**: The third line; independently checks that the whole process followed the rules.
- **[BA AI Business Analyst](roles.html#role-ba)**: Helps the business unit complete governance documents and test questions.
- **[SA Systems Analyst](roles.html#role-sa)**: Writes the technical governance documents and turns the rules into system controls.

## Handoffs and checks

The common approach involves three lines of defense: the first is the requirements and development units, the second is information security, compliance, and risk management, and the third is auditing. The pre-launch checkpoint is where the three lines of defense converge.

The requesting unit fills in the risk rating, the department head approves it, and the coordinating unit confirms and files it; it is done at planning and before launch, then reviewed every year after launch. Governance documents come in two layers: one for the shared platform, and one for each department's use case, because data, permissions and users differ; N departments on one platform means N+1 documents. The BA helps the business unit write the use-case documents; the SA writes the technical side.

## What I did in this stage

- Design a pre-launch verification mechanism for AI Agents: A three-tiered verification process aligned with regulatory principles, transforming guidelines into verifiable criteria. See [Agent Online Detection Mechanism](project.html?id=agent-governance) 。
- At KGI Financial Group, the manual review of AI usage reports has been replaced with automation. See [Automated Review System](project.html?id=ai-governance-review) 。
