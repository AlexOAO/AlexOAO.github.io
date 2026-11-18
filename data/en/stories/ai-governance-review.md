---
title: ai-governance-review
---

## Results

**Group AI governance reports used to be read one by one by hand. Now the system checks, recalculates and cross-checks each report first, then hands the results to a reviewer.** It deploys through CI/CD, which tests and ships every change automatically, so development is faster and the system is more stable.

## Why this project

The group AI committee at the financial holding company reviews the AI usage reports that every subsidiary submits. Each review checks three things: is the content reasonable, is the risk level right, and does it match the asset register? Reading every report by hand was slow, and reviewers did not all use the same standard.

## My role

I developed this automated review system for AI governance.

## What I did

**Phase 1 | Requirements.** Three parts of a review take the most work: judging whether the content is reasonable, recalculating the risk level, and checking against the asset register. Those are the three the system takes over.

**Phase 2 | Build.** I first connected SharePoint, where subsidiaries upload reports and get results back in the same place. Azure OpenAI then reads each report's "current controls" and "risk treatment plan" and judges whether they make sense. Next, the system recalculates risk levels, checks the asset register, and assesses residual risk, the risk that is left after controls. Finally, it writes a review report with suggested fixes ranked by severity.

**Phase 3 | Launch.** Every change goes through the same automated pipeline: Azure DevOps CI/CD deploys it to Azure Container Apps, a cloud service.

**Phase 4 | Operate.** Next, I want to measure how long each report takes to review, before and after the system.

## Next steps

Measure how long each report takes to review, before and after the system.
