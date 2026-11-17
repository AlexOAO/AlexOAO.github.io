---
title: finjourney
---

## Results

**FinJourney is now live ([finjourney.xiang-wei-li.com](https://finjourney.xiang-wei-li.com)), it took less than two weeks from the first commit to the launch, and I did it all by myself.** It presents personal finances as a "comprehensive overview of personal financial management," with each box displaying the user's real-time figures. The AI financial advisor in the lower-right corner analyzes the user's data to provide assessments, identify risks, and recommend actions for improvement. The backend features 656 tests, covering formulas, APIs, and AI processes.

Number of users and user feedback: To be added.

## Why this project

The concept of financial management is not difficult to understand; the challenge lies in applying it to your own numbers. There are different calculation methods for income and expenses, reserves, investments, liabilities, insurance, and retirement, and they are scattered across various spreadsheets and apps, making it difficult to quickly identify where the overall problem lies.

I want to create a product that puts all of these on the same chart: first, view the overall picture, then click on the problematic section.

## My role

I worked on my own. I was responsible for product planning, model tuning, front-end and back-end development, deployment, and operations.

## What I did

**Phase 1 | Business planning.** Using the "Personal Financial Overview" diagram from "Investment 101" as a framework, personal finances are broken down into ten management projects: income and expenses, reserves, net worth, investments, liabilities, taxes, insurance, retirement funds, wealth transfer, and goals. Each project follows the same management process: Set goals → Develop an action plan → Compare actual results with targets monthly → Revise the plan or goals.

**Phase 2 | Model tuning.** The area where AI is most prone to errors is with numbers, so I have the AI only propose solutions, while the system calculates the numbers. The AI's "adjustment plan" is output using a strict JSON schema and can only be selected from the leverage and change types provided by the system. The system first checks the fields and scopes referenced by each change, then runs the plan through a lifetime income and expense simulation and each stress scenario. The prompts are also adjusted based on the card the user is looking at, allowing the AI to act as an advisor for that card.

**Phase 3 | Development and deployment.** The backend uses FastAPI, SQLModel, and SQLite, with all formulas concentrated in the domain layer. The frontend uses React and TypeScript, displaying only the results from the API without performing calculations itself. There is also a data-receiving API that allows other apps to push balances and transactions, eliminating the need for monthly manual entry. It is deployed on my own Mac and exposed to the outside world via Cloudflare Tunnel. The user interface and the backend are separated into two URLs, with the backend additionally protected by Cloudflare Access.

**Phase 4 | Operations and monitoring.** Users register with an invitation code, and each user has one database file, which is automatically backed up daily and retained for 14 days. Before using AI for the first time, the system will ask the user to consent to sending financial data to OpenAI and will record the version and time of consent. Without consent, the data will not be read and the model will not be called. The free version has a monthly limit on the number of AI uses, and only one use is deducted when the model successfully provides an answer.

## Next steps

To be added.
