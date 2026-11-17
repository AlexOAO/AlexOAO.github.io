---
title: agent-cost-roi
---

## Results

**I created a project prototype for each of the four business-service agents and then used the same mechanism to measure their costs and benefits.** The prototype allows business units to see how agents actually work before committing a substantial budget. The cost-benefit mechanism enables four agents to be compared on the same table for the first time, and, after going live, it also allows for tracking whether the estimates have been realized.

- Four prototypes, each corresponding to one of the four stages of the customer journey: acquisition, transaction, service, and operations.
- A common cost-benefit framework and two types of observable indicators: business ratios and realization ratios.
- The baselines for each agent are being established. Please see the sub-projects below for details.

## Why this project

The bank's goal is to use AI Agents to connect the entire customer journey: from the first point of contact, through application and use of services, to long-term wealth management. Each stage is handled by one Agent, with four Agents sharing customer data, and the outcomes from each stage feeding into the next.

However, the four agents differ in terms of their target clientele, deployment methods, and cost structures. To decide who should receive resources first, we must first answer two questions: How will it actually work? Is it worth it?

## Four Agents and the Customer Journey

**Stage 1 | Smart customer acquisition: [Loan Assistant (Sales Agent)](project.html?id=agent-loan-assistant).** The goal is to achieve precise targeting and improve conversion rates. It engages directly with customers on digital application platforms and social media: explaining products, guiding the application process, and negotiating within the scope of its authorization. Conditions that exceed the authorized scope are referred to supervisors. It cannot make promises regarding the outcome of loan approvals. It operates autonomously within the scope of its authorization, with humans handling exceptions (human-on-the-loop). Deployed in the cloud, data is de-identified before being sent.

**Stage 2 | Smart transactions: [Credit Review (Credit Agent)](project.html?id=agent-credit-review).** The goal is to expedite loan approvals and enhance efficiency. It does not interact with customers directly but instead assists credit review officers in identifying financial documents, verifying the reasonableness of their content, and calculating annual income, with each assessment accompanied by a justification. Cases with insufficient confidence are referred to credit reviewers; the system does not make credit decisions or generate scores. Each case is reviewed by a human (human-in-the-loop). A hybrid of cloud and on-premises systems, with batch processing during off-peak hours.

**Stage 3 | Smart service: [Customer Service Assistant (Service Agent)](project.html?id=agent-customer-service).** The goal is to provide proactive service and enhance satisfaction. It serves as a Copilot for customer service representatives: searching the knowledge base, drafting responses, writing post-call summaries, and conducting initial quality checks. All content entered into the records must be confirmed by personnel, and it does not directly respond to customers (human-in-the-loop). Since it processes call recordings, everything is deployed locally.

**Stage 4 | Smart wealth management: [Wealth Assistant (App 2.0)](project.html?id=agent-wealth-assistant).** The goal is wealth management and value enhancement. It is a financial management conversation within the app: checking accounts, analyzing assets, and explaining products. Before making recommendations, the customer's risk level must be confirmed. It does not execute transactions, nor does it handle passwords or verification codes (human-in-the-loop). Hybrid of cloud and on-premises: The small on-premises model determines intent, while the cloud-based model handles queries.

## The closed loop: how the four agents connect

- **The same customer, the same information.** Customer data from the app, online banking, and branches are integrated. Regardless of which channel the customer uses, the agent recognizes them as the same person.
- **Decision-making hub.** Transaction data, combined with the memory of interactions with agents, forms a 360-degree view of the customer, and the propensity model then determines what is appropriate to offer next.
- **Feedback** The results of each stage feed back into the data, leading to continuous optimization and the creation of the next business opportunity: customer acquisition brings customers into transactions, and post-transaction services and operations generate new demands.
- **Common ground.** The four Agents share the Group's computing power, AI operations management platform, and AI governance. See Pre-Launch Checks [AI Governance](project.html?id=agent-governance), see the results after going live [AI Operations Performance Dashboard](project.html?id=ai-ops-dashboard) 。

## My role

I did two things:

- **Build a prototype.** Each of the four Agents creates a prototype for a project, making it visible and usable for the business units, who then decide whether to invest in it.
- **Responsible for cost-benefit.** Designed a cost-benefit framework and management mechanism shared by four agents. The business volume is provided by the business unit, the usage is provided by the IT unit, and I am responsible for the framework, calculation, and comparison.

## What I did

**Phase 1 | Prototype.** Create a prototype based on the scenario of each Agent, turning "how it will work" into something visible. For example, the prototype of WealthButler is an MVP for mobile banking, where users can perform various actions, from logging in and checking account details to engaging in AI conversations.

**Phase 2 | Framework design.** The cost structures of the four agents are completely different: some are in the cloud, while others are on-premises; some are billed per call, while others are billed per case. I describe them using the same set of formulas: Cost = Business Volume × Resource Usage per Case × Resource Unit Price; Benefit = Business Volume × Benefit per Case × Value Unit Price. Both sides start from the business volume, so we can directly obtain comparable unit costs and ROI. Within this framework, I define two types of metrics:

- Task Ratio: Tasks handled by AI ÷ Total task volume, such as AI handling rate and human transfer rate. It answers the question, "Is AI really doing anything?"
- Realization ratios: actual ÷ baseline, such as volume realization, cost execution, and benefit realization. They answer "did the original estimate come true?"

**Phase 3 | Data collection and calculation.** The business unit provides the business volume and benefits, while the IT unit provides the usage. Once the data is complete, establish a three-year baseline for workload, cost, and benefits for each agent. This baseline serves as the denominator for calculating the achievement rate after going live. This is currently in progress.

**Phase 4 | Institutionalize.** Planning to integrate indicators into the resource allocation process: Establish benchmarks before launch, and regularly monitor business ratios and achievement rates after launch. Initiate reviews when achievement rates fall below the threshold, and adjust resources or scope accordingly.

## Next steps

- Complete the benchmarks for four Agents.
- Connect to the AI operations dashboard so realization ratios are produced regularly.

## Further reading

How the metrics appear on a dashboard (Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
