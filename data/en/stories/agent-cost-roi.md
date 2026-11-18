---
title: agent-cost-roi
---

## Results

**The bank is launching four AI Agents for its business. I built a project prototype for each one, then measured their costs and benefits with the same method.** The prototypes let business units see how an Agent actually works before spending big money. The cost-benefit method puts all four Agents in one table for the first time, and after launch it tracks whether the original estimates came true.

- Four prototypes, each for one stage of the customer journey: acquisition, transaction, service, and wealth management.
- One shared cost-benefit framework, with two kinds of metrics we can track: business ratios and realization ratios.
- Each Agent's baseline is still being built. See the sub-projects below for details.

## Why this project

**The bank's goal is to connect the customer's whole journey with AI Agents.** The journey runs from a customer's first contact with the bank, through applying and using services, to long-term wealth management. Each stage gets one Agent. The four Agents share customer data, and what one stage achieves carries into the next.

**To decide who gets resources first, we have to answer two questions: how will it actually work, and is it worth doing?** The tricky part is that the four Agents serve different people, are deployed differently, and spend money in different ways.

## Four Agents and the Customer Journey

**Stage 1 | Smart customer acquisition: [Loan Assistant (Sales Agent)](project.html?id=agent-loan-assistant).** The goal is to reach the right customers and close more deals. It chats directly with customers on the digital application platform and social media: it introduces products, walks customers through applying, and negotiates within its authorized limits. Terms beyond those limits go to a supervisor, and it cannot promise that a loan will be approved. Within its limits it works on its own, and people step in only for exceptions (human-on-the-loop). It runs in the cloud, and data is de-identified first, meaning anything that shows who the customer is gets removed before it is sent.

**Stage 2 | Smart transactions: [Credit Review (Credit Agent)](project.html?id=agent-credit-review).** The goal is faster loan approval and higher efficiency. It does not face customers. It helps the credit officers who review loans with three tasks: reading proof-of-income documents, checking that their content makes sense, and working out annual income. Every judgment comes with a reason. Cases it is unsure about go to credit officers, and it never makes the loan decision or gives a credit score. A person reviews every case (human-in-the-loop). It uses both the cloud and the bank's own servers (on-premises), and processes cases in batches during off-peak hours.

**Stage 3 | Smart service: [Customer Service Assistant (Service Agent)](project.html?id=agent-customer-service).** The goal is proactive service and happier customers. It is an AI helper (Copilot) sitting beside customer service staff: it searches the knowledge base, drafts replies, writes a summary after each call, and does a first check on service quality. Staff confirm anything written into the records, and it never replies to customers directly (human-in-the-loop). Because it handles call recordings, it runs fully on-premises.

**Stage 4 | Smart wealth management: [Wealth Assistant (App 2.0)](project.html?id=agent-wealth-assistant).** The goal is good wealth management and deeper customer relationships. It is the money chat inside the app: it checks accounts, analyzes assets, and explains products. Before recommending anything, it must confirm the customer's risk level. It does not place trades, and never touches passwords or verification codes (human-in-the-loop). It uses both the cloud and on-premises: a small on-premises model first works out what the customer wants, and a cloud model then handles the query.

## The closed loop: how the four agents connect

- **One customer, one set of data.** Customer data from the app, online banking, and branches is combined. Whichever channel a customer comes in through, the Agents recognize the same person.
- **Decision hub.** Transaction data, plus what the customer has said to the Agents, adds up to a full picture of the customer (customer 360). A propensity model then decides what is best to offer next.
- **Feedback.** Each stage's results go back into the data, so the system keeps getting better and new business opportunities appear. Customers won in acquisition move on to transactions, and the service and wealth management after that create new needs.
- **Shared foundation.** The four Agents share the group's computing resources, AI operations management platform, and AI governance. For the checks before launch, see [AI Governance](project.html?id=agent-governance); for results after launch, see [AI Operations Performance Dashboard](project.html?id=ai-ops-dashboard).

## My role

I did two things:

- **Built the prototypes.** I made one project prototype for each of the four Agents, so business units could see and try them before deciding to invest.
- **Owned cost-benefit.** I designed the cost-benefit framework and the way it is managed across all four Agents. Business units provide business volume, IT provides usage, and I own the framework, the calculations, and the comparison.

## What I did

**Phase 1 | Prototype.** I built a prototype for each Agent's use case, turning "how it will work" into something people can see. For example, the Wealth Assistant prototype is a mobile banking MVP, the smallest version that still works, where you can log in, check accounts, and chat with the AI.

**Phase 2 | Framework design.** The four Agents spend money in completely different ways: some run in the cloud, some on-premises; some are billed per call, some per case. So I described them all with the same formulas. Cost = business volume × resources used per case × resource unit price; Benefit = business volume × benefit per case × value unit price. Both sides start from business volume, so they give unit costs and ROI (return on investment) that can be compared directly. On top of this framework, I defined two kinds of metrics:

- Business ratios: work handled by AI ÷ total business volume, such as AI handling rate and transfer-to-human rate. They answer "is the AI really doing the work?"
- Realization ratios: actual ÷ baseline, such as volume realization, cost execution, and benefit realization. They answer "did the original estimate come true?"

**The two tools fill different gaps: large Agents first prove they are worth it, and small requests first get put in order.** The three-year baseline suits large Agents with complex costs. The many small internal requests are ranked with a simpler scorecard instead: benefit, feasibility, compliance and cost, filled in by the BA or SA.

**Phase 3 | Data collection and calculation.** This phase is in progress. Business units provide business volume and benefits, and IT provides usage. Once the data is in, I will build a three-year baseline of business volume, cost, and benefit for each Agent. After launch, this baseline is the denominator when we calculate realization ratios.

**Phase 4 | Institutionalize.** I plan to build these metrics into how resources are allocated. Each Agent sets a baseline before launch, and its business ratios and realization ratios are tracked regularly after launch. When a realization ratio falls below the threshold, a review starts and resources or scope are adjusted.

## Next steps

- Complete the baselines for the four Agents.
- Connect to the AI operations dashboard so realization ratios are produced regularly.

## Further reading

To see how these metrics look on a dashboard (in Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
