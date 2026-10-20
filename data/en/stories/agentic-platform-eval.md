## Why this project

To launch four Agents, the bank needs a platform to build and manage them. The candidates were Agatha and the open-source Dify. A wrong choice is expensive: you find a missing capability halfway through, or a security gap after launch. I had to find the risks with real tests before purchase.

## My role

I led the platform evaluation: test design, test runs, issue logging, and the scorecards.

## What I did

### Do not reuse another platform's checklist

For Dify, I first split the official documentation into 5 modules: Knowledge Pipeline (RAG data processing), Workflow, Agent, Plugins and MCP, and Publish and Monitor. Then I designed tests per module. Another platform's checklist does not ask this platform's questions.

### Two levels of tests

- **Basic tests**: with the bank's regulatory QA set (238 questions) and penalty QA set (119 questions), check import, parsing, and retrieval, plus answer accuracy, citations, and hallucination control.
- **Advanced tests**: Workflow, Agents, multi-model management, MCP tools, access control (RBAC, injection defense), monitoring, performance, and stability.

Dify had 34 test items. Agatha had 26 hands-on tests.

### Read the community's known issues first

Before testing, I collected real reports from Dify's GitHub that matter to our case: empty content after Excel upload, PDF tables ignored, sentences split across pages, unstable citations in Workflow mode. I prepared a response for each. The tests then aimed at the places most likely to fail.

### Log severity, fill in the scorecards

Every issue got a severity: blocking, security, or general. Then I filled in the department scorecard and the holding company's 42-item scorecard in 9 categories.

## Results

- 26 hands-on tests on Agatha found 12 issues: 4 would block launch, and 1 is a security issue.
- Dify: 34 test items designed and a PoC report delivered.
- Both platforms were scored on the same 42-item scorecard, so the selection had a comparable, quantitative basis.

## Key point

These 12 issues were found in the PoC, not after an Agent went live.
