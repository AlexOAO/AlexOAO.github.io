## Results

**In 26 hands-on tests on Agatha, I found 12 issues: 4 would block launch, and 1 is a security issue.** They were found before purchase, not after an Agent went live.

- Dify: 34 test items designed and a PoC report delivered.
- Both platforms were scored on the holding company's 42-item scorecard in 9 categories, so the choice could be compared side by side.

## Why this project

The four Agents need a platform to build and manage them. The candidates were Agatha and the open-source Dify. A wrong choice is expensive: you find a missing capability halfway through, or a security gap after launch. I had to find the risks with real tests before purchase.

## My role

I led the platform evaluation: test design, test runs, issue logging, and the scorecards.

## What I did

**Phase 1: split the features first, do not copy a checklist.** For Dify, I split the official documentation into 5 modules: Knowledge Pipeline (RAG data processing), Workflow, Agent, Plugins and MCP, and Publish and Monitor, then designed tests per module. Another platform's checklist does not ask this platform's questions. I also collected real reports from Dify's GitHub that matter to our case (empty content after Excel upload, PDF tables ignored, sentences split across pages, unstable citations in Workflow mode) and prepared a response for each.

**Phase 2: 26 hands-on tests on Agatha.** Every issue got a severity: blocking, security, or general.

**Phase 3: 34 tests on Dify, in two levels.** Basic tests used the bank's regulatory QA (238 questions) and penalty QA (119 questions) to check import, parsing, and retrieval, plus answer accuracy, citations, and hallucination control. Advanced tests covered Workflow, Agents, multi-model management, MCP tools, access control (RBAC, injection defense), monitoring, performance, and stability.

**Phase 4: one scorecard.** I filled in the department scorecard and the holding company's 42-item scorecard, so the two platforms could be compared side by side.

## Next steps

After the platform is chosen, the Guardrails test set and the pre-launch check will apply to every Agent built on it.
