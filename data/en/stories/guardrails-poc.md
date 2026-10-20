## Why this project

KGI Bank plans to launch four business AI Agents. Taiwan's FSC AI guidelines require financial institutions to show that AI systems are fair, protect privacy, are secure, and are transparent (principles 2 to 5). The bank's policy documents could prove that the process was followed. Nothing could prove that the AI's output was actually safe.

CyCraft offers an AI guardrail product, XecGuard. The vendor's test report looked good, but it did not test our business scenarios. So this PoC had to answer one concrete question: **can XecGuard block attacks aimed at KGI's business, without blocking customers' normal questions?** The answer would decide whether to adopt it.

## My role

I led this PoC from 2026/08/24 to 09/24: test design, test sets, case-by-case runs, analysis, and the final adoption proposal.

## What I did

### 1. Take the product apart before designing tests

I did not reuse the vendor's test list. I first listed the 6 Policies that XecGuard actually runs: prompt attack protection, system prompt enforcement, harmful content, malicious skills, PII and sensitive data, and content bias. Then I mapped them to FSC principles 2, 3, 4, and 5. Each test case can then say which principle it checks.

### 2. Build three labeled test sets

Based on the OWASP AI Testing Guide, I built three test sets with 3,600 cases. Attack cases (UNSAFE) and normal cases (SAFE) are 4:1, and each case has a risk level:

- General conversational AI: 1,000 cases (100 per module, plus 400 for governance principles)
- External business scenarios: 1,500 cases (1,330 from a third-party red team, plus 170 of my own)
- Wealth Assistant API: 1,100 cases (10 business areas, each mapped to real API fields)

The sets grew in rounds: a 240-case baseline in R1, 600 cases in R2, and the full 3,600 in the final round.

### 3. Two settings, case by case

Each case ran twice: once with the 6 Policies, and once with custom Policies and system prompts written from the missed cases. I recorded every Policy's verdict and response time in a case-by-case matrix. So I can say which attack type each Policy caught, not just give one total score.

### 4. One scorecard for both options

Last, I used a 9-dimension AI Safety scorecard (protection, usability and false blocks, integration, governance evidence, and more) to compare XecGuard with the AI platform's built-in guardrail.

## Results

- **Custom Policies work for business scenarios**: on the 1,500 cases, the miss rate fell from 10.2% to 2.2%.
- **More rules are not a cure-all**: on the general 1,000 cases, extra governance rules moved the miss rate only from 21.1% to 20.0%.
- **Blocking has a cost**: XecGuard blocked 98.3% of the red-team attacks, but also blocked 20 of 30 normal questions, and added about 0.8 seconds per check.
- **The built-in guardrail was enough**: the platform's own guardrail blocked all of the same attacks. XecGuard scored 62.5 / 100.

My recommendation: **use the platform's built-in guardrail for now, and do not buy an add-on guardrail.** If the bank later manages many AI platforms in one place, XecGuard can be a candidate vendor. The PoC also left a reusable, versioned test set, so every future Agent can be checked with the same ruler.

## Next steps

- Set acceptance thresholds for the UNSAFE block rate and the SAFE false-block rate.
- Build versioned test sets for the other three Agents.
- The missed cases show that content guardrails cannot control tool calls or transactions. The next stage must handle that at the AI Gateway layer.
