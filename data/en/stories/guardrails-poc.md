---
title: guardrails-poc
---

## Results

**The holding company was testing AI safety guardrails from two vendors, and I ran the bank's side: XecGuard is done, and Vulcan is still being tested.** After testing XecGuard, I recommended not buying this add-on guardrail for now, and using the protection the platform already has:

- XecGuard blocked 98.3% of the red-team attacks, meaning simulated hacker attacks. But it also blocked 20 of 30 normal questions, and each check took about 0.8 seconds longer.
- The platform's built-in protection had already blocked every one of the same attacks. On a 9-dimension scorecard, XecGuard scored only 62.5 / 100.
- Rules tailored to a specific business (custom Policies) did help: on 1,500 cases, the share of attacks that got through fell from 10.2% to 2.2%. General governance rules barely helped: on 1,000 cases it moved only from 21.1% to 20.0%.
- The PoC left behind a versioned set of 3,600 test cases. Every future Agent can be checked with the same ruler.

## Why this project

**Policy documents could prove that we followed the process, but not that what the AI says is safe.** The bank was getting ready to launch four AI Agents for its business. Taiwan's FSC AI guidelines require us to show that AI is fair, protects privacy, is secure, and is transparent (principles 2 to 5).

So the holding company started an AI guardrails PoC and brought in two vendors. CyCraft's XecGuard is a guardrail that stops attacks in real time. Vulcan is an AI security platform that simulates hacker attacks (red-teaming) and validates the results. Both vendors had great-looking reports, but neither had tested KGI's own business. So the PoC set out to answer one question: **can it stop attacks aimed at KGI without blocking customers' normal questions?**

## My role

I ran the bank's side of this PoC. I designed the tests, built the test sets, ran every case, analyzed the results, and wrote the adoption proposal.

## What I did

**Phase 1 | Problem definition.** I had to prove not how strong the guardrail is, but whether it is useful in KGI's business. I first listed the six kinds of protection rules (Policies) that XecGuard actually had turned on: stopping prompt attacks, keeping the AI within its task, stopping harmful content, stopping malicious skills, protecting personal and sensitive data, and avoiding biased content. Then I matched them to FSC principles 2, 3, 4, and 5, so every case can say which principle it checks.

**Phase 2 | Test design.** Using the OWASP AI Testing Guide, an industry testing guide, I built three test sets with 3,600 cases in total. The first covers general conversational AI: 1,000 cases. The second covers specific business scenarios: 1,500 cases, 1,330 from Vulcan's red team and 170 that I wrote myself. The third covers business areas: 1,100 cases across the Wealth Assistant's 10 business areas, each tied to a real API field in the system. Attacks and normal questions are 4:1, and each case has a risk level.

**Phase 3 | Testing.** In round one (R1), I ran all 3,600 cases with only the six Policies on. In round two (R2), I took the attacks that got through in round one, added system prompts and custom rules for them, and re-ran the same cases. I recorded every rule's verdict and response time in a case-by-case table. So I can say exactly which rule stopped which type of attack.

**Phase 4 | Comparison.** XecGuard's own score was not enough, so I put it side by side with the platform's built-in protection. I used a 9-dimension AI Safety scorecard that looks at how much it blocks, how often it blocks by mistake, how easy it is to connect, whether it leaves governance evidence, what it costs, and more.

**Phase 5 | Adoption decision.** I recommended using the platform's built-in protection for now. It already stopped every attack. Another layer could not stop more, but it would block more normal questions by mistake, and need extra integration work and extra fees.

**The Vulcan track: testing in progress.** Vulcan's job is to find problems, not to block them. It has 1,330 red-team baseline cases covering 44 types of risk, and each case is tagged with the FSC principle it relates to. On the same scorecard, its validation scored 73.4 / 100. The Vulcan PoC is still being tested.

## Next steps

- Finish the Vulcan PoC evaluation and make an adoption proposal.
- Set pass criteria: what share of risky prompts (UNSAFE) must be stopped, and at most what share of normal prompts (SAFE) may be stopped by mistake.
- Build versioned test sets for the other three Agents too.
- The attacks that got through show that content guardrails only control what the AI says, not what it does, such as calling tools or making transactions. That job belongs to the AI Gateway, the shared entry point that every AI call passes through.

## Further reading

I wrote up the whole AI guardrails approach in a post (in Chinese): [How a bank builds AI guardrails: from FSC principles to a 3,600-case test](posts/ai-guardrails-framework.html).
