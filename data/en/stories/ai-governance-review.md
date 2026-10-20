## Why this project

The holding company's group AI committee reviews AI usage reports from every subsidiary: is the content reasonable, is the risk level right, does it match the asset register? Manual review of each report was slow, and reviewers did not apply the same standard.

## My role

I developed the AI governance automated review system.

## What I did

- **SharePoint integration**: subsidiaries upload reports to SharePoint and get results back in the same place.
- **Content check**: Azure OpenAI judges whether the "current controls" and "risk treatment plan" are reasonable.
- **Automatic recalculation and cross-checks**: the system recalculates risk levels, cross-checks the asset register, assesses residual risk, and writes a review report with fixes ranked by severity.
- **Automatic deployment**: Azure DevOps CI/CD deploys to Azure Container Apps.

## Results

The system completes the content check, risk recalculation, and register check before a reviewer sees the report. CI/CD made development faster and the system more stable.

## Next steps

Measure review time per report before and after the system.
