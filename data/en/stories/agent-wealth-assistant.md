---
title: agent-wealth-assistant
---

## Results

**I turned the Wealth Assistant into a mobile banking prototype you can actually use: 118 feature pages, plus an AI wealth assistant that checks accounts and answers money questions.** Before this, a PoC, a proof of concept, had already shown that the Q&A works, and the resources needed for launch were confirmed. After launch, whether it is worth it depends on whether customers really use it.

- It is the most heavily used of the four Agents; its three-year usage forecast is already in the baseline.

## Why this project

**Customers don't have to dig through every account; one question tells them where their money stands.** The Wealth Assistant is the AI wealth assistant in the bank's wealth app (App 2.0). It handles the fourth stage of the customer journey, Smart Management, which aims at good wealth management and deeper customer relationships. After a customer asks about their assets, it can carry the conversation on to advice on the next step.

Before launch there are two questions: does the Q&A work, and will resources hold up as more people use it? After launch: do customers use the app more because of it?

## What it does

**Who it serves and where.** Everyday customers, by chatting inside the app.

**What it can do on its own:**

- Look up the customer's own accounts across 10 data areas: credit cards, investments (funds, overseas stocks and ETFs, bonds, structured products), loans, insurance, TWD and foreign currency deposits, securities, trusts, group asset overview, exchange and interest rates, and payment records.
- Analyze the customer's asset position.
- Explain general product information.

**What it must confirm first:** Before recommending any product, it must get the customer's risk level.

**What it hands to people:** Asset allocation advice for high-net-worth customers goes to a dedicated specialist.

**What it can't do:** Make any transaction for the customer, handle passwords or verification codes, or say things like "guaranteed profit."

**How a question is answered.**

- **Step 1, input guardrails:** First block personal data, prompt injection, and jailbreak attacks, which are attempts to trick the AI into breaking its rules.
- **Step 2, intent detection:** A small model on the bank's own servers (on-premises) works out what the customer is asking.
- **Step 3, two paths:** General questions get answers from the FAQ, and questions about features get a link to the right page. Account questions go to a query agent that decides which APIs (the interfaces systems use to fetch data) to call, then builds the answer from a template.
- **Step 4, output guardrails:** Check the investment wording and whether any personal data leaks, then decide to fix, block, or allow the answer.
- **Step 5, conversation memory:** Remember only the recent conversation, and store only a version with personal data masked.

**How people supervise.** human-in-the-loop, with people in control.

## My role

I led PoC testing and launch resource planning, and built the Wealth Assistant mobile banking prototype myself.

## What I did

**Phase 1 | PoC.** Confirm that the AI wealth assistant's Q&A works.

**Phase 2 | Build.** I drew the first draft of the system architecture, organized the test results and documents, then handed the work to a senior colleague to continue development.

**Phase 3 | Prototype.** Following the requirements specification and statement of work, I built a working mobile banking MVP (the smallest version that still works):

- **Full banking features.** Mobile banking and online banking (desktop and mobile) with 118 working feature pages, including transfers, currency exchange, time deposits, bill payments, installments, placing fund and bond orders, loans, and settings. Every transaction is written to a simulated bank, and the account pages and the AI's answers update right away.
- **AI wealth assistant.** Replies appear word by word as they are written, and customers can ask follow-up questions and leave feedback. To check accounts, it uses 36 account tools through MCP (a standard that lets AI use outside tools), covering the 240 fields defined in the specification.
- **Guardrails.** 31 input rules and 32 output rules, plus personal data masking. The model only receives questions with identifying details removed, and never sees any account amounts.
- **Dynamic screens.** Following the A2UI v0.9 specification, the AI can put charts, tables, and other screens right into its answers. All official test cases pass.
- **Admin.** A 12-page admin back office with three role levels, approval workflow, change logs, and CSV export.
- **Ready to plug into the bank's systems.** All language models use the OpenAI API format, so any compatible service can be swapped in, or a small on-premises model. Connecting to the bank's test environment only needs a settings change and an API mapping table.

**Phase 4 | Launch readiness.** I estimated three-year usage from the number of logins and confirmed the resources for the production and test environments.

**Phase 5 | Launch.** Led by the team that took over. After launch, track two kinds of metrics:

- Business ratios: users of AI Q&A ÷ users who log in (engagement rate).
- Realization ratios: actual usage ÷ baseline usage; benefit realization measured by engagement and asset size.

## Next steps

A2UI technical research will start from the Wealth Assistant's business scenarios. The prototype already has A2UI built in, so it can be used to test it right away.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
