---
title: agent-wealth-assistant
---

## Results

**I built the Wealth Assistant into a working mobile banking prototype: 118 feature pages, plus an AI wealth assistant that checks accounts and answers money questions.** Before this, a PoC, a proof of concept, had already confirmed the Q&A works, and the resources needed for launch were confirmed. After launch, its value depends on whether customers actually use it.

- It is the highest-volume of the four Agents; its three-year usage forecast is in the baseline.

## Why this project

**Customers don't have to dig through every account; one question tells them where their assets stand.** The Wealth Assistant is the AI wealth assistant in the bank's wealth app (App 2.0) and covers the fourth stage of the customer journey, Smart Management. The goal is wealth management and deeper value: after the asset question, it moves naturally to the next-step advice.

Before launch there are two questions: does the Q&A work? Will resources hold up as usage grows? After launch: do customers use the app more because of it?

## What it does

**Who it serves and where.** Everyday customers, through chat inside the app.

**What it can do on its own:**

- Look up the customer's own accounts across 10 data areas: credit cards, investments (funds, overseas stocks and ETFs, bonds, structured products), loans, insurance, TWD and foreign currency deposits, securities, trusts, group asset overview, exchange and interest rates, and payment records.
- Analyze the customer's asset position.
- Explain general product information.

**What it must confirm first:** Before recommending any product, it must get the customer's risk level.

**What it hands to people:** Asset allocation advice for high-net-worth customers goes to a dedicated specialist.

**What it can't do:** Execute any transaction, handle passwords or verification codes, or use phrases like "guaranteed profit."

**How a question is answered.**

1. Input guardrails: block personal data, prompt injection, and jailbreak attacks, which are attempts to trick the AI into breaking rules.
2. Intent detection: a small on-premises model works out what the customer is asking.
3. Two paths. General questions get answers from the FAQ, and feature questions get a link to the right page. Account questions go to a query agent that plans which APIs to call, then builds the answer from a template.
4. Output guardrails: check investment wording and personal data leaks, then decide to fix, block, or allow.
5. Conversation memory: keeps short-term conversation context and stores only masked content.

**How people supervise.** human-in-the-loop, with people in control.

## My role

I led PoC testing and launch resource planning, and built the Wealth Assistant mobile banking prototype myself.

## What I did

**Phase 1 | PoC.** Confirm that the AI wealth assistant's Q&A works.

**Phase 2 | Build.** Drew the first system architecture draft, organized test results and documents, then handed over to a senior colleague to continue development.

**Phase 3 | Prototype.** Following the requirements specification and statement of work, I built a working mobile banking MVP:

- **Full mobile banking.** Mobile banking and online banking (desktop and mobile) with 118 working feature pages. Features include transfers, currency exchange, time deposits, bill payments, installments, fund and bond orders, loans, and settings. Transactions are written to a simulated bank and show up at once on account pages and in the AI's answers.
- **AI wealth assistant.** Supports streaming replies, follow-up questions, and feedback. Account queries use 36 account tools provided through MCP, covering the 240 fields defined in the specification.
- **Guardrails.** 31 input rules and 32 output rules, plus personal data masking. The model receives only de-identified questions and never sees account figures.
- **Dynamic screens.** Following the A2UI v0.9 specification, the AI can attach charts, tables, and other screens to its answers. All official test cases pass.
- **Admin.** A 12-page admin back office with three role levels, approval workflow, change logs, and CSV export.
- **Ready for the bank's environment.** All language models use the OpenAI API format, so any compatible endpoint or a small on-premises model can be swapped in. Connecting to the bank's test environment needs only a settings change and an API mapping table.

**Phase 4 | Launch readiness.** Estimated three-year usage from login volume and confirmed resources for production and test environments.

**Phase 5 | Launch.** Led by the team that took over. After launch, track two kinds of metrics:

- Business ratios: users of AI Q&A ÷ users who log in (engagement rate).
- Realization ratios: actual usage ÷ baseline usage; benefit realization measured by engagement and asset size.

## Next steps

A2UI technical research will start from the Wealth Assistant's business scenarios. The prototype already implements A2UI, so it can be used directly for validation.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi).
