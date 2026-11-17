---
title: agent-wealth-assistant
---

## Results

**I built the Wealth Assistant as a functional prototype of a mobile banking app, featuring 118 function pages and an AI financial assistant capable of checking accounts and answering financial questions.** Prior to this, the PoC had already validated the Q&A function, and the resource allocation required for the launch had also been confirmed. After its launch, its value will depend on whether customers are actually using it.

- It is the highest-volume of the four Agents; its 3-year usage forecast is in the baseline.

## Why this project

WealthButler is the AI financial assistant in the Bank's financial management app (App 2.0), responsible for the fourth stage of the customer journey: Smart Management. The goal is wealth management and value enhancement: customers don't have to go through various accounts themselves. They can simply ask a question to find out the status of their assets, and then naturally move on to the next step of receiving recommendations.

Questions to answer before launch: Can the Q&A feature be used? After usage increases, will there be enough resources? Questions to answer after launch: Have customers started using it more frequently as a result?

## What it does

**Service recipients and channels.** For regular customers, it is used through conversations in the app.

**What it can do on its own:**

- Inquire about your own accounts: credit cards, investments (funds, overseas stocks and ETFs, bonds, structured products), loans, insurance, TWD and foreign currency deposits, securities, trusts, group asset overview, exchange rates and interest rates, and payment records – a total of 10 data categories.
- Analyze the asset status.
- Provide general product information.

**The first thing it needs to confirm:** Before recommending any product, the client's risk level must be obtained.

**What it needs to be handed over to someone:** Asset allocation recommendations for high-net-worth clients are referred to dedicated specialists.

**What it can't do:** Executing any transactions, handling passwords or verification codes, or using terms such as "guaranteed profit."

**How a question is answered.**

1. Input guardrails: Block personal data, prompt injection, and jailbreaking attacks.
2. Intent determination: The small model on the client side determines what the customer wants to ask.
3. Handle in two ways. Answers to general questions are retrieved from the FAQ, while feature-related questions are accompanied by links to relevant pages. For billing issues, the query agent determines which APIs to call and then constructs the response based on a template.
4. Output guardrail: Check for investment terminology and personal data leaks before deciding whether to correct, block, or allow.
5. Conversation memory: Retains the short-term context of the conversation and only stores the content after masking.

**How people supervise.** human-in-the-loop。

## My role

I was responsible for PoC testing and resource planning for the launch, and I personally developed the mobile banking prototype for Smart Wealth Manager.

## What I did

**Phase 1 | PoC.** Confirm that the AI wealth assistant's Q&A works.

**Phase 2 | Build.** Draw the first system architecture, document the results, and hand over to a senior colleague for development.

**Phase 3 | Prototype.** Based on the requirements specification and the work specification, I developed a functional MVP for mobile banking:

- **Full-featured mobile banking.** Mobile banking and online banking (desktop and mobile versions) offer a total of 118 interactive feature pages, including transfers, foreign exchange, time deposits, bill payments, installment plans, fund and bond orders, loans, and settings. Transactions are recorded in the simulated bank and are immediately reflected on the account page and in the AI's responses.
- **AI Financial Assistant.** Streaming responses, follow-up questions, and feedback. Billing inquiries are supported by 36 billing tools provided through MCP, covering 240 fields defined in the specifications.
- **Guardrail.** 31 input rules, 32 output rules, plus personal data masking. The model only receives de-identified questions and cannot see the accounting figures.
- **Animated visuals.** According to the A2UI v0.9 specifications, the AI can include visuals such as charts and tables in its responses. All official test cases have passed.
- **Admin** The 12-page management backend features three levels of role permissions, submission for approval, change records, and CSV export.
- **Compatible with in-house environments.** Language models always use the OpenAI API format, which can be replaced with any compatible endpoint, or a small model can be used on-premises. To connect to the in-house testing environment, simply change the settings and the API mapping table.

**Phase 4 | Launch readiness.** Estimate the usage over three years based on login volume to confirm the resource allocation for both the production and test environments.

**Phase 5 | Launch.** Driven by the team taking over. Track two types of metrics after launch:

- Business ratios: users of AI Q&A ÷ users who log in (engagement rate).
- Realization rate: Actual usage ÷ Baseline usage; the benefit realization rate measured by activity and asset size.

## Next steps

The technical research on A2UI will start with the business scenarios of WealthPro. A2UI has already been implemented in the prototype and can be used directly for validation.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
