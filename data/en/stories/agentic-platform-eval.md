---
title: agentic-platform-eval
---

## Results

**In 26 hands-on tests on Agatha, I found 12 issues: 4 would block launch, and 1 is a security issue.** They were found before purchase, not after an Agent went live.

- Dify: 34 test items designed and a PoC report delivered.
- Both platforms were scored on the holding company's 42-item scorecard in 9 categories, so the choice could be compared side by side.

## Why this project

**I had to find the risks of a wrong platform with real tests before purchase.** The four Agents need a platform to build and manage them. The candidates were Agatha and the open-source Dify. A wrong choice is expensive: you find a missing capability halfway through, or a security gap after launch.

## My role

I led the platform evaluation. I owned test design, test runs, issue logging, and the scorecards.

## What I did

**Phase 1 | Problem definition.** The evaluation must answer not "which platform has more features" but "which platform will not fail in our use cases". A wrong platform is expensive: you find a missing capability halfway through, or a security gap after launch.

**Phase 2 | Test design.** Another platform's checklist does not ask this platform's questions, so I designed tests around Dify's own modules. I split the official documentation into 5 modules (Knowledge Pipeline for RAG data processing, Workflow, Agent, Plugins and MCP, and Publish and Monitor). I also collected real reports from Dify's GitHub that matter to our case: empty content after Excel upload, PDF tables ignored, sentences split across pages, and unstable citations in Workflow mode. I prepared a response for each.

**Phase 3 | Testing.** Agatha had 26 hands-on tests, and every issue got a severity: blocking, security, or general. Dify had 34 tests in two levels. Basic tests used the bank's regulatory QA (238 questions) and penalty QA (119 questions) to check import, parsing, and retrieval, plus answer accuracy, citations, and hallucination control, meaning the AI does not make up answers. Advanced tests covered Workflow, Agents, multi-model management, MCP tools, access control (RBAC, injection defense), monitoring, performance, and stability.

**Phase 4 | Comparison.** Both platforms were scored on the same sheets, so results sit side by side: the department scorecard and the holding company's 42-item scorecard in 9 categories.

**Phase 5 | Adoption decision.** The PoC reports and scorecards are the basis for the holding company's selection decision.

## Next steps

After the platform is chosen, the Guardrails test set and the pre-launch check will apply to every Agent built on it.

## Further reading

I wrote up the method of this project in a post (Chinese): [How to choose an AI agent platform: 12 issues found by testing before purchase](posts/ai-platform-poc.html).
