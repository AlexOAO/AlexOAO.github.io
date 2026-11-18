---
title: agent-cost-roi
---

## Results

**I built a project prototype for each of the four business-service Agents, then measured their costs and benefits with one shared mechanism.** The prototypes let business units see how an Agent actually works before committing a large budget. The cost-benefit mechanism puts all four Agents in one table for the first time, and after launch it tracks whether the estimates came true.

- Four prototypes, one for each of the four stages of the customer journey: acquisition, transaction, service, and wealth management.
- One shared cost-benefit framework, with two kinds of observable metrics: business ratios and realization ratios.
- Each Agent's baseline is being built. See the sub-projects below for details.

## Why this project

**The bank's goal is to connect the customer's whole journey with AI Agents.** The journey runs from first contact, through applying and using services, to long-term wealth management. One Agent handles each stage; the four Agents share customer data, and each stage's results feed into the next.

**To decide who gets resources first, we must answer two questions: how will it actually work, and is it worth it?** The hard part is that the four Agents differ in who they serve, how they are deployed, and how their costs are built.

## Four Agents and the Customer Journey

**Stage 1 | Smart customer acquisition: [Loan Assistant (Sales Agent)](project.html?id=agent-loan-assistant).** The goal is precise targeting and higher conversion. It talks directly with customers on the digital application platform and social media: it explains products, guides applications, and negotiates within its authorized limits. Terms beyond those limits go to a supervisor, and it cannot promise a loan approval. It runs on its own within its limits, with humans handling exceptions (human-on-the-loop). It is deployed in the cloud, and data is de-identified, meaning anything that identifies the customer is removed, before it is sent.

**Stage 2 | Smart transactions: [Credit Review (Credit Agent)](project.html?id=agent-credit-review).** The goal is faster loan approval and higher efficiency. It does not face customers. It helps credit officers with three tasks: reading financial documents, checking that their content makes sense, and calculating annual income. Every judgment comes with a reason. Low-confidence cases go to credit officers, and it makes no credit decisions or scores. A human reviews every case (human-in-the-loop). It runs on a cloud and on-premises mix, in batches during off-peak hours.

**Stage 3 | Smart service: [Customer Service Assistant (Service Agent)](project.html?id=agent-customer-service).** The goal is proactive service and higher satisfaction. It is a Copilot, an AI helper at the agent's side, for customer service staff: it searches the knowledge base, drafts replies, writes after-call summaries, and makes a first quality-check call. Staff confirm anything written into the records, and it never replies to customers directly (human-in-the-loop). Because it handles call recordings, it is fully on-premises.

**Stage 4 | Smart wealth management: [Wealth Assistant (App 2.0)](project.html?id=agent-wealth-assistant).** The goal is wealth management and deeper customer value. It is the wealth chat inside the app: it checks accounts, analyzes assets, and explains products. Before any recommendation, the customer's risk level must be confirmed. It does not execute trades, and never touches passwords or verification codes (human-in-the-loop). It runs on a cloud and on-premises mix: a small on-premises model detects intent, and a cloud model handles the queries.

## The closed loop: how the four agents connect

- **One customer, one set of data.** Customer data from the app, online banking, and branches is combined. Whichever channel the customer comes from, the Agents recognize the same person.
- **Decision hub.** Transaction data plus the memory of past Agent conversations forms a 360-degree view of the customer. A propensity model then decides what is right to offer next.
- **Feedback.** Each stage's results flow back into the data for continuous improvement and the next business opportunity: acquisition brings customers into transactions, and service and wealth management after the transaction create new needs.
- **Shared foundation.** The four Agents share the group's computing power, AI operations management platform, and AI governance. For pre-launch checks, see [AI Governance](project.html?id=agent-governance); for results after launch, see [AI Operations Performance Dashboard](project.html?id=ai-ops-dashboard).

## My role

I did two things:

- **Built the prototypes.** I made one project prototype for each of the four Agents, so business units could see and try them before deciding to invest.
- **Owned cost-benefit.** I designed the cost-benefit framework and management mechanism shared by the four Agents. Business units provide business volume, IT provides usage, and I own the framework, calculation, and comparison.

## What I did

**Phase 1 | Prototype.** I built a prototype for each Agent's scenario, turning "how it will work" into something people can see. For example, the Wealth Assistant prototype is a mobile banking MVP, a minimum usable version, where you can log in, check accounts, and chat with the AI.

**Phase 2 | Framework design.** The four Agents' cost structures are completely different, so I described them all with the same formulas. Some run in the cloud, some on-premises; some are billed per call, some per case. Cost = business volume × resource usage per case × resource unit price; Benefit = business volume × benefit per case × value unit price. Both sides start from business volume, so comparable unit costs and ROI follow directly. On this framework, I defined two kinds of metrics:

- Business ratios: work handled by AI ÷ total business volume, such as AI handling rate and transfer-to-human rate. They answer "is the AI really doing the work?"
- Realization ratios: actual ÷ baseline, such as volume realization, cost execution, and benefit realization. They answer "did the original estimate come true?"

**The two tools complement each other: large Agents first prove they are worth it, small requests first get an order.** The three-year baseline suits large Agents with complex cost structures. The many small internal requests are ranked with a lighter scorecard instead: benefit, feasibility, compliance and cost, each filled in by the BA or SA.

**Phase 3 | Data collection and calculation.** This phase is in progress. Business units provide business volume and benefits, and IT provides usage. Once the data is in, I build a three-year baseline of business volume, cost, and benefit for each Agent. That baseline is the denominator for realization ratios after launch.

**Phase 4 | Institutionalize.** I plan to connect the metrics to the resource allocation process. Each Agent sets a baseline before launch, and business ratios and realization ratios are tracked regularly after launch. When a realization ratio falls below the threshold, a review starts and resources or scope are adjusted.

## Next steps

- Complete the baselines for the four Agents.
- Connect to the AI operations dashboard so realization ratios are produced regularly.

## Further reading

How the metrics appear on a dashboard (Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
