---
title: stage-build
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## What this stage does

The development and deployment team needs to answer: **How can we turn a solution that has passed testing into a service that can be used every day?** In this phase, we need to select a platform, integrate the system, and migrate to the production environment.

Deliverables for this phase:

- Platforms and architectures: Which AI platform to use, and whether to deploy the model in the cloud or on-premises.
- System Integration: Integration with existing systems, APIs, and data.
- Environment and Computing Power: Production and test environments, computing power allocation, and capacity planning.
- Go-live verification results and go-live approval.

## Who takes part

- **[PM Project Manager](roles.html#role-pm)**: Schedule and acceptance; the contact for vendors and units.
- **[TPM Technical PM](roles.html#role-tpm)**: Coordinates the technical plan for build, platform and deployment.
- **[IT PM IT Project Manager](roles.html#role-itpm)**: Represents the IT department; coordinates integration, environments and the release schedule, and handles IT procurement and the change process.
- **[FDE Forward-Deployed Eng](roles.html#role-fde)**: Works inside the business unit and wires AI into the real workflow.
- **[SA Systems Analyst](roles.html#role-sa)**: Assigns the technical team; writes the system spec: data flow, APIs, and how it connects to existing systems.
- **[AP Application Owner](roles.html#role-ap)**: Deploying onto the bank's servers and connecting to core systems are theirs to manage; they take over maintenance after launch.
- **[SDE Software Engineer](roles.html#role-sde)**: Builds features and unit tests. Most bank projects are outsourced: the vendor builds and delivers to the spec, with warranty and maintenance in the contract.
- **[DBA Database Admin](roles.html#role-dba)**: Designs the application database.
- **[MLOps Model Operations](roles.html#role-mlops)**: Beyond CI/CD, manages model and prompt versions so every change can be traced.
- **[SE System Engineer](roles.html#role-se)**: Part of Infrastructure. Builds GPU servers, network, and production and test environments to the TA's design.
- **[QA Testing](roles.html#role-qa)**: Beyond integration tests, reruns the evaluation set on every change to make sure answers have not got worse.
- **[ISO Information Security](roles.html#role-iso)**: Security scans, access control and data isolation; gives the pre-launch security opinion.
- **[BU Business Unit](roles.html#role-bu)**: Takes part in UAT, confirms the features meet the need and signs off; uses the pilot and reports issues.
- **[EA Enterprise Architect](roles.html#role-ea)**: Architecture review (ARB): checks the bank's architecture and technology standards.
- **[CAB Change Advisory Board](roles.html#role-cab)**: Approves production changes, models and prompts included.
- **[Ops Operations](roles.html#role-ops)**: Deploys to production.
- **[BA AI Business Analyst](roles.html#role-ba)**: Compares pilot results with the baseline before full launch is approved.

## Handoffs and checks

A review process must be completed before going live. The business unit writes the rules, the technology unit prepares and conducts the tests, the working group performs the initial review, and higher-risk items are further approved by the committee. UAT or a limited rollout can be approved first, followed by a full rollout.

A bank's actual pre-launch gates usually include:

- Requirements and acceptance documents: the business unit head approves the test report.
- AI governance documents: the AI asset register and the risk rating.
- Asset registration and architecture review (ARB).
- Security scans: white-box, black-box and host vulnerability scans, with exemptions requested where needed.
- Environment setup and the launch checklist: code changes, test report and scan reports all signed off.
- The formal launch request and the launch announcement.

## What I did in this stage

- Evaluate two enterprise AI agent platforms with 60 tests to identify issues in advance and use the results as a basis for selection. See [Platform PoC](project.html?id=agentic-platform-eval) 。
- At KGI Financial Group, from initial requirements to launch, we lead the AI market and individual stock assistants. See [Webai Finance](project.html?id=webai-finance) 。
- FinJourney: From development to launch – front-end, back-end, accounts, deployment, and AI features. See [FinJourney](project.html?id=finjourney) 。
