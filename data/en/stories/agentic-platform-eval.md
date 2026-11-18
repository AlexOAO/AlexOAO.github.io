---
title: agentic-platform-eval
---

## Results

**I ran 26 hands-on tests on the Agatha platform and found 12 issues: 4 would stop an Agent from launching, and 1 is a security hole.** We found them before purchase, not after an Agent went live.

- For the other candidate, Dify, I designed 34 tests and delivered a PoC report.
- Both platforms were scored on the same holding-company scorecard (42 items in 9 categories), so the choice could be made side by side.

## Why this project

**I had to use real tests to find the risk of picking the wrong platform before we bought one.** The four business Agents need a platform to build and manage them on. The candidates were Agatha and the open-source Dify. A wrong pick is expensive: you might find a key feature missing halfway through, or a security hole after launch.

## My role

I ran the platform evaluation: I designed and ran the tests, logged the issues, and filled in the scorecards.

## What I did

**Phase 1 | Problem definition.** The evaluation had to answer not "which platform has more features" but "which platform will not break in the way we use it".

**Phase 2 | Test design.** A checklist written for another platform does not ask this platform's questions, so I built the tests around Dify's own modules. I read the official documentation and split Dify into five parts: Knowledge Pipeline (turning documents into data the AI can search, the RAG data processing step), Workflow, Agent, Plugins and MCP, and Publish and Monitor. I also went through Dify's official GitHub and collected real problems other users had reported that matter for us: Excel files that come out empty after upload, tables in PDFs that get skipped, sentences split in two across pages, and citations that work only some of the time in Workflow mode. I prepared a workaround for each one in advance.

**Phase 3 | Testing.** On Agatha I ran 26 hands-on tests, and gave every issue a severity: blocks launch, security, or general. On Dify I ran 34 tests in two levels. The basic tests used the bank's regulatory checking QA (238 questions) and penalty QA (119 questions) to see whether the knowledge base imports, reads, and searches documents correctly, and whether answers are accurate, cite their sources, and avoid hallucination, meaning the AI making up answers. The advanced tests covered Workflow, Agents, managing multiple models, adding tools through MCP, access control (RBAC, injection defense), monitoring, performance, and stability.

**Phase 4 | Comparison.** Both platforms were scored on the same sheets, so the results sit side by side: the department's own scorecard, and the holding company's 42-item scorecard in 9 categories.

**Phase 5 | Adoption decision.** My PoC reports and scorecards are what the holding company uses to choose the platform.

## Next steps

Once the platform is chosen, the versioned test set and pre-launch checks from the Guardrails PoC will be used on every Agent built on it.

## Further reading

I wrote up how I did this project in a post (in Chinese): [How to choose an AI agent platform: 12 issues found by testing before purchase](posts/ai-platform-poc.html).
