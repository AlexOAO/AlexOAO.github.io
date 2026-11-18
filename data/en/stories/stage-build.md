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

- **IT PM (IT Project Manager)**: Manage the schedule, scope, vendors, and acceptance, and set milestones for initiation, requirements, UAT, and go-live.
- **SA (Systems Analyst)**: Write system specifications: data flow, APIs, and how to connect with existing systems.
- **UI/UX Design**: Design interfaces and conversational experiences, such as how AI responses should be presented and when to escalate to a human agent.
- **RD (Research and Development Team)**: Develop features and write unit tests.
- **IT AP (Application System Responsible Unit)**: The core systems and APIs that AI needs to integrate with are under their control, and the integration needs to be scheduled according to their timeline.
- **TPM (Technical Project Manager)**: Coordinate cross-team technical decisions, such as platform selection, performance, and technical risks.
- **Infra (Infrastructure)**: Prepare computing power, network, and environment, and plan capacity based on business volume.
- **DevOps/MLOps**: In addition to CI/CD, we also need to manage the versions of models and prompts, so that every update can be traced back.
- **QA + AI Evaluation**: In addition to integration testing, the evaluation set is rerun for every change to ensure that the quality of the answers has not deteriorated.
- **Information Security**: Review access control, data isolation, and pre-launch security recommendations.
- **AIBU (Business Unit)**: Participate in UAT, confirm that the features meet the requirements, and approve acceptance.
- **PMO**: Track progress and resources to ensure the project is progressing as planned.

## Handoffs and checks

A review process must be completed before going live. The business unit writes the rules, the technology unit prepares and conducts the tests, the working group performs the initial review, and higher-risk items are further approved by the committee. UAT or a limited rollout can be approved first, followed by a full rollout.

## What I did in this stage

- Evaluate two enterprise AI agent platforms with 60 tests to identify issues in advance and use the results as a basis for selection. See [Platform PoC](project.html?id=agentic-platform-eval) 。
- At KGI Financial Group, from initial requirements to launch, we lead the AI market and individual stock assistants. See [Webai Finance](project.html?id=webai-finance) 。
- FinJourney: From development to launch – front-end, back-end, accounts, deployment, and AI features. See [FinJourney](project.html?id=finjourney) 。
