---
title: ai-ops-platform
---

## Results

**I developed an AI operations platform that consolidates the operations, costs, performance, and governance of four agents into a single location, and connects the paths taken by the same customer across these four agents into a unified journey.** The platform also compares each agent's business plan (projections) with their actual performance figures to directly calculate the achievement rate.

- The actual data from the four Agent prototypes has been connected, and the platform receives it once per minute.
- For the same customer, from customer acquisition, credit review, service to management, a complete timeline can be viewed on the platform. The platform cannot see the ID number.
- When we compared the expected and actual figures for the first time, we identified three "calibration" issues: the expected and actual figures used different calculation methods, which resulted in a discrepancy of several times. After the correction, the platform listed the agents who were truly lagging behind under "Needs Review."

## Why this project

**Each of the four agents has their own backend, but the issues that matter most to the supervisor are scattered across four different places.** Are these AIs worth it? How much did it cost? Is it running stably? What paths did the same customer take, from customer acquisition to management? To answer these questions, we used to have to open four back-end systems, perform separate calculations, and then piece the results together.

[Four AI Agents](project.html?id=agent-cost-roi) cost-benefit framework, and [AI Ops Dashboard](project.html?id=ai-ops-dashboard) "What to look at" has already been determined for all five aspects. What this platform aims to answer is "how to truly see": where the data comes from, how to align it, and how to compare it.

## What it does

**Service recipients.** PMO, business unit heads, and AI project managers. It does not interact with customers.

**Five modules:**

- **Operations Overview:** Four agents are placed on the same table to examine five aspects: adoption, quality, efficiency, cost, and risk.
- **customer journey** Journey flows, conversion funnels, how long users stay at each stage, and the complete timeline of an individual customer (Customer 360).
- **Cost and Efficiency:** Unit cost, three-year baseline, and achievement rate; delays, error rate, availability rate, and alerts.
- **Business Planning:** Investment portfolio and business plan for each Agent. Each figure shows the expected, actual, and achievement rates side by side.
- **Governance** Pre-launch nine-grid checklist, guardrail interception statistics, consistency rate between AI and human judgment, and timeline for configuration changes.

**Two URLs, two types of people.** The report URL is read-only and cannot be modified in any way; only the management URL contains the price list, alert rules, and accounts. Both URLs require Zero Trust login first.

## My role

I was primarily responsible for designing and implementing the data exchange format, the platform itself, and the export functions of the four agents.

## What I did

**Phase 1 | Problem definition.** The platform does only three things: collect data, calculate indicators, and make comparisons. It does not change any Agent's rules or data. Business rules, benchmarks, and guardrails are all kept in each Agent's own backend. This way, if the platform goes down, the Agents continue to operate as usual; and if the Agents are replaced, the platform doesn't need to be changed.

**Phase 2 | Framework design.** Instead of having four agents share the same set of programs, I first define a data exchange format that all four agents follow:

- **Each Agent opens a read-only egress.** Provide incidents, daily metrics, governance information, and business plans, which the platform regularly pulls. The endpoint must have a key and only accept internal calls. Calls from public URLs are always rejected.
- **Customer identity is represented by a hash value instead of an ID number.** The four Agents use the same key to calculate the customer ID as a string of hash values. If the values calculated for the same customer are identical on all four sides, the platform can link the records together. However, it is not possible to reverse-engineer the ID number from the hash value. Only the masked ID is displayed on the screen.
- **Costs are calculated using the same standard.** Each agent only reports usage: the amount of text processed by the model, the number of seconds of OCR, and the number of seconds of calls. The platform then uses the same price list to convert the amounts into New Taiwan Dollars, allowing for a comparison between the four Agents.
- **Only use real information.** The platform does not generate any simulated numbers. When there are fewer than 5 samples, only the number of samples is displayed, and the percentage is not shown, to avoid giving the impression of greater precision than is actually the case.

**Phase 3 | Implementation and verification.** I built the platform itself and also added exits for the four agents. There are three layers of verification:

- Each agent must pass a format check and confirm that calls from public URLs are definitely rejected.
- I used the same test customer to go through four Agents: applying for a loan with the Loan Assistant, exporting the case package, submitting it to Smart Underwriting for identification and review, then taking a customer service call, and finally asking a question in WealthButler. The platform linked these four segments into the journey of a single customer, picked up the case package, and factored in the costs.
- While going through this process, I noticed that the receipt time for smart underwriting is in a different time zone format, and the platform places "Receipt" before "Application." Both sides have been changed, and tests have been added.

**Phase 4 | Business Planning: Expected vs. Actual.** Each Agent's business plan is maintained in its own back-end system, edited by the responsible officer, and approved by the supervisor. The platform only has read-only access to the approved version. The plan has four phases: the 2026 pilot phase and 2027 to 2029. The platform converts the annual plan to the selected period based on the number of days and then places it side by side with the actual data.

When comparing for the first time, three figures differed by several times, but the issue wasn't with the calculations, but rather with the metrics:

- **Benefits of a Loan Assistant:** What actually counts is "all AI-assisted applications," but what is expected to count is "the 18% of them that are AI-driven."
- **Cost of a Customer Service Assistant:** The per-call cost in the plan does not include speech recognition, but the actual cost is calculated based on the number of seconds of the call.
- **The Cost of Smart Underwriting:** The historical data only records the amount, not the usage. After the platform's conversion, the usage is almost zero.

So, I added a "performance metric" to the plan to compare the expected and actual results using the same outcome and unit price. Costs were also broken down into variable and fixed costs. The revised plan was submitted for approval through the formal process and became Version 2. Now, the platform lists agents who are truly lagging behind under "Needs Review." For example, a loan assistant whose facilitation achievement rate falls below the 80% threshold they set for themselves.

## Next steps

- Please ask the business unit to provide the actual figures in the planning document, and ask the IT unit to provide the actual unit prices in the price list. The current screen is marked with "assumed values."
- Share the report URL with supervisors and regularly review the achievement rate according to the PMO's review schedule.
- Also connect internal AI tools (Copilot, Gemini, Aira Assistant) to the same five dimensions to complete the process. [AI Ops Dashboard](project.html?id=ai-ops-dashboard) The overall picture.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
