---
title: finjourney
---

## Results

**FinJourney is now live ([finjourney.xiang-wei-li.com](https://finjourney.xiang-wei-li.com)), it took less than two weeks from the first commit to the launch, and I did it all by myself.** It draws personal finances as one "personal financial overview," with each box showing the user's real-time figures. The AI financial advisor in the lower-right corner reads the user's data and gives a diagnosis, risks and actions for improvement. For quality, the backend has 656 automated tests covering formulas, APIs and AI flows.

Number of users and user feedback: To be added.

## Why this project

Financial concepts are not hard to understand; the hard part is applying them to your own numbers. Income and expenses, reserves, investments, liabilities, insurance and retirement each have their own calculation, and they are scattered across different spreadsheets and apps. As a result, it is hard to see at a glance where the overall problem lies.

I want to create a product that puts all of these on the same chart: first, view the overall picture, then click on the problematic section.

## My role

I worked on my own. I was responsible for product planning, model tuning, front-end and back-end development, deployment, and operations.

## What I did

**Phase 1 | Business planning.** I broke personal finances into ten management projects, using the "Personal Financial Overview" diagram from "Investment 101" as the framework. The ten are income and expenses, reserves, net worth, investments, liabilities, taxes, insurance, retirement funds, wealth transfer, and goals. Each project follows the same management process: Set goals → Develop an action plan → Compare actual results with targets monthly → Revise the plan or goals.

**Phase 2 | Model tuning.** The core rule is that the AI only proposes plans and the system calculates the numbers, because numbers are where AI makes the most mistakes. The AI's "adjustment plan" must follow a strict JSON schema format and can only choose from the levers and change types the system provides. The system first checks the fields and ranges each change refers to, then runs the plan through a lifetime income and expense simulation and every stress scenario. The prompts also adapt to the card the user is looking at, so the AI acts as the advisor for that card.

**Phase 3 | Development and deployment.** The backend uses FastAPI, SQLModel and SQLite, with all formulas kept in the domain layer, the core module. The frontend uses React and TypeScript and only displays the API's results, without calculating anything itself. A data-receiving API lets other apps push balances and transactions, so users don't have to enter them by hand every month. The system runs on my own Mac and is exposed to the internet through Cloudflare Tunnel. The user site and the admin back office have two separate URLs, and the back office has an extra login layer from Cloudflare Access.

**Phase 4 | Operations and monitoring.** Accounts and data are protected: users register with an invitation code, each user has one database file, and it is backed up automatically every day and kept for 14 days. Before using AI for the first time, the system asks the user to consent to sending financial figures to OpenAI, and records the version and time of consent. Without consent, it reads no data and does not call the model. The free version has a monthly limit on AI uses, and a use is counted only when the model answers successfully.

## Next steps

To be added.
