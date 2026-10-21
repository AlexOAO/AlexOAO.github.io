## Results

**I recommended that the bank not buy an add-on AI guardrail for now, and use the platform's built-in protection instead.** The recommendation rests on 3,600 test cases:

- XecGuard blocked 98.3% of the red-team attacks, but also blocked 20 of 30 normal questions, and added about 0.8 seconds per check.
- The platform's built-in guardrail had already blocked all of the same attacks. XecGuard scored 62.5 / 100 on a 9-dimension scorecard.
- Custom Policies work for specific business scenarios: on 1,500 cases, the miss rate fell from 10.2% to 2.2%. General governance rules barely helped: on 1,000 cases it moved only from 21.1% to 20.0%.
- The PoC left a versioned test set and a case-by-case behavior matrix, so every future Agent can be checked with the same ruler.

## Why this project

The bank was preparing to launch four business AI Agents. Taiwan's FSC AI guidelines require us to show that AI is fair, protects privacy, is secure, and is transparent (principles 2 to 5). Policy documents could prove that the process was followed. They could not prove that the AI's output was safe.

CyCraft's XecGuard was the candidate. The vendor's report looked good, but it did not test KGI's business. So the PoC answered one question: **can it block attacks aimed at KGI, without blocking customers' normal questions?**

## My role

I led the PoC: test design, test sets, case-by-case runs, analysis, and the adoption proposal.

## What I did

**Phase 1: take the product apart, do not reuse a checklist.** First I listed the 6 Policies XecGuard actually runs (prompt attack protection, system prompt enforcement, harmful content, malicious skills, PII and sensitive data, content bias) and mapped them to FSC principles 2, 3, 4, and 5, so every case can say which principle it checks. Then I built a 240-case baseline from the OWASP AI Testing Guide. The miss rate was 36.4%: more than a third of the attacks passed every Policy. Malicious-skills protection blocked only 32.5%, and PII protection only 38.5%. The weak spots were clear.

**Phase 2: grow to 600 cases and verify every change.** Each case ran twice: with the 6 Policies, and with system prompts and custom Policies written from the missed cases. One result surprised me: with a new set of custom Policies, the miss rate went from 7.7% to 8.8%, up, not down. It showed that every change must be re-run on the same cases and proven with numbers, not assumed to work.

**Phase 3: the full 3,600-case test.** I expanded to three sets: general conversational AI (1,000 cases), external business scenarios (1,500, of which 1,330 came from a third-party red team), and the Wealth Assistant API (1,100 across 10 business areas, each mapped to real API fields). Attacks and normal cases are 4:1, and each case has a risk level. I recorded each Policy's verdict and response time in a case-by-case matrix, so I can say which Policy caught which attack type.

**Phase 4: one scorecard for both options.** XecGuard's own score was not enough. On a 9-dimension AI Safety scorecard (protection, false blocks, integration, governance evidence, cost, and more), I compared it side by side with the platform's built-in guardrail. The built-in guardrail already blocked every attack. Another layer could not raise the block rate, but would add false blocks, integration work, and license cost. So I made the adoption proposal.

## Next steps

- Set acceptance thresholds for the UNSAFE block rate and the SAFE false-block rate.
- Build versioned test sets for the other three Agents.
- The missed cases show that content guardrails control what the AI says, not what it does, such as tool calls and transactions. That belongs at the AI Gateway layer.
- If the bank later manages many AI platforms in one place, XecGuard can be a candidate vendor.
