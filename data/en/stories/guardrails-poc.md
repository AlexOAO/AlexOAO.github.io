---
title: guardrails-poc
---

## Results

**I followed the holding company's AI guardrails PoC, which evaluates two vendors: XecGuard is done, and Vulcan is in progress.** For XecGuard, I recommended not buying an add-on guardrail for now, and using the platform's built-in protection instead:

- XecGuard blocked 98.3% of the red-team attacks, but also blocked 20 of 30 normal questions, and added about 0.8 seconds per check.
- The platform's built-in guardrail had already blocked all of the same attacks. XecGuard scored 62.5 / 100 on a 9-dimension scorecard.
- Custom Policies work for specific business scenarios: on 1,500 cases, the miss rate fell from 10.2% to 2.2%. General governance rules barely helped: on 1,000 cases it moved only from 21.1% to 20.0%.
- The PoC left a versioned 3,600-case test set, so every future Agent can be checked with the same ruler.

## Why this project

The bank was preparing to launch four business AI Agents. Taiwan's FSC AI guidelines require us to show that AI is fair, protects privacy, is secure, and is transparent (principles 2 to 5). Policy documents could prove that the process was followed. They could not prove that the AI's output was safe.

So the holding company started an AI guardrails PoC with two vendors: CyCraft's XecGuard, a guardrail that blocks attacks in real time; and Vulcan, an AI security platform for red-team attacks and validation. Both vendors' reports looked good, but neither tested KGI's business. So the PoC answered one question: **can it block attacks aimed at KGI, without blocking customers' normal questions?**

## My role

I led the bank's side of the PoC: test design, test sets, case-by-case runs, analysis, and the adoption proposal.

## What I did

**Phase 1 | Problem definition.** The PoC had to prove not how strong the guardrail is, but whether it works in KGI's business. So I first listed the 6 Policies XecGuard actually runs (prompt attack protection, system prompt enforcement, harmful content, malicious skills, PII and sensitive data, content bias) and mapped them to FSC principles 2, 3, 4, and 5, so every case can say which principle it checks.

**Phase 2 | Test design.** Based on the OWASP AI Testing Guide, I built three sets with 3,600 cases: general conversational AI (1,000 cases); business-specific scenarios (1,500 cases: 1,330 from Vulcan's red team, 170 of my own); and business areas (1,100 cases across the Wealth Assistant's 10 business areas, each mapped to real API fields). Attacks and normal cases are 4:1, and each case has a risk level.

**Phase 3 | Testing.** R1 ran all 3,600 cases with the 6 Policies only. R2 added system prompts and custom Policies written from R1's missed cases, then re-ran the same cases. I recorded each Policy's verdict and response time in a case-by-case matrix, so I can say which Policy caught which attack type.

**Phase 4 | Comparison.** XecGuard's own score was not enough. On a 9-dimension AI Safety scorecard (protection, false blocks, integration, governance evidence, cost, and more), I compared it side by side with the platform's built-in guardrail.

**Phase 5 | Adoption decision.** The built-in guardrail already blocked every attack. Another layer could not raise the block rate, but would add false blocks, integration work, and license cost. So I recommended the platform's built-in guardrail for now.

**The Vulcan track: testing in progress.** Vulcan's 1,330-case red-team baseline covers 44 risk types, and each case is tagged with FSC principles. On the same scorecard, its validation scored 73.4 / 100; but its job is to find problems, not to block them. The Vulcan PoC testing is still in progress.

## Next steps

- Complete the Vulcan PoC evaluation and make an adoption proposal.
- Set acceptance thresholds for the UNSAFE block rate and the SAFE false-block rate.
- Build versioned test sets for the other three Agents.
- The missed cases show that content guardrails control what the AI says, not what it does, such as tool calls and transactions. That belongs at the AI Gateway layer.

## Further reading

I wrote up the full AI guardrails framework (in Chinese): [How a bank builds AI guardrails: from FSC principles to a 3,600-case test](posts/ai-guardrails-framework.html).
