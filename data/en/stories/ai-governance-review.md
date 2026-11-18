---
title: ai-governance-review
---

## Results

**Review of group AI governance reports moved from reading each report by hand to the system checking, recalculating, and cross-checking first, then passing results to a reviewer.** CI/CD deployment, which tests and ships every change automatically, made development faster and the system more stable.

## Why this project

Manual review of each report was slow, and reviewers did not apply the same standard. The group AI committee reviews AI usage reports from every subsidiary. A review checks three things: is the content reasonable, is the risk level right, does it match the asset register?

## My role

I developed the AI governance automated review system.

## What I did

**Phase 1 | Requirements.** Three parts of a review take the most labor: judging whether the content is reasonable, recalculating the risk level, and cross-checking the asset register. Those three are what the system takes over.

**Phase 2 | Build.** I first connected SharePoint: subsidiaries upload reports there and get results back in the same place. Azure OpenAI then judges whether the "current controls" and "risk treatment plan" are reasonable. The system recalculates risk levels, cross-checks the asset register, and assesses residual risk. Finally it writes a review report with fixes ranked by severity.

**Phase 3 | Launch.** Every change goes through the same automated pipeline. Azure DevOps CI/CD deploys the system to the Azure Container Apps cloud service.

**Phase 4 | Operate.** The next step is to measure review time per report before and after the system.

## Next steps

Measure review time per report before and after the system.
