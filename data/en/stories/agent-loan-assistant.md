---
title: agent-loan-assistant
---

## Results

**I built the Loan Assistant's project prototype and brought it into the cost-benefit framework shared by the four Agents.** Its value has to be measured in business terms: how many applications were completed with the AI's help, and how much of the estimated benefit actually came true. The measurement framework is done. We are still waiting for business volume from the business units, so the baseline is not set yet.

## Why this project

**Its value is not hours saved but extra applications won, so we cannot judge it only by what it costs.** The Loan Assistant (Sales Agent) handles the first stage of the customer journey: smart customer acquisition, which aims to reach the right customers and close more deals. When customers have a question on the application platform, they often leave because nobody answers right away.

## What it does

**Who it serves and where.** It deals directly with customers and potential borrowers, chatting with them on the digital application platform and social media.

**What it can do on its own:**

- Chat with customers and explain loan products.
- Walk customers through the application step by step.
- Negotiate within its authorized limits, adjusting its approach to the customer's situation.

**What it hands to people:** Negotiations beyond its authorized limits or the interest rate threshold go to a supervisor.

**What it cannot do:** Promise that a loan will be approved.

**How people oversee it.** Within its authorized limits it works on its own, and people take over only for exceptions (human-on-the-loop).

**Architecture.** Everything runs in the cloud. Customer data is de-identified first, meaning anything that shows who the customer is gets removed before it goes to the cloud. Daily usage is also capped.

**How it is tested.** A test set of business scenarios checks how well it chats. Past real cases check whether the prices it offers go beyond its authorization.

## My role

I built the Loan Assistant's project prototype and was responsible for bringing it into the cost-benefit framework shared by the four Agents.

## What I did

**Phase 1 | Prototype.** I built a prototype for the customer acquisition use case, so business units could see for themselves how it chats with customers, guides applications, and negotiates. Prototype details: to be added.

**Phase 2 | Framework design.** I first worked out where the costs go, then defined its metrics:

- Business ratios: applications completed with AI help ÷ all applications; application conversion rate.
- Realization ratios: actual applications ÷ baseline applications; benefit realization.

**Phase 3 | Data collection and calculation.** I have asked the business unit for business volume. Once it arrives, I will build a three-year baseline of business volume, cost, and benefit.

**Phase 4 | Institutionalize.** After launch, track conversion and realization ratios regularly and add them to the comparison table of the four Agents.

## Next steps

Once the volume arrives, finish the Loan Assistant's baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
