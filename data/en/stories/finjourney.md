---
title: finjourney
---

## Results

**FinJourney is live ([finjourney.xiang-wei-li.com](https://finjourney.xiang-wei-li.com)). It took less than two weeks from the first line of code (the first commit) to launch, and I built all of it myself.** It draws a person's finances as one "personal financial overview" map, with each box showing the user's current numbers. The AI financial advisor in the lower-right corner reads the user's data, points out problems, flags risks, and suggests ways to improve. For quality, the back end has 656 automated tests covering the formulas, the APIs, and the AI flows.

Number of users and user feedback: To be added.

## Why this project

Money concepts are not hard to understand; the hard part is applying them to your own numbers. Income and spending, emergency savings, investments, debt, insurance, and retirement each have their own math, and they are scattered across different spreadsheets and apps. So it is hard to see at a glance where things are really going wrong.

I wanted to build a product that puts all of this on one map: see the whole picture first, then click into the part that has a problem.

## My role

I built it on my own. I handled product planning, tuning the AI model, front-end and back-end development, deployment, and operations.

## What I did

**Phase 1 | Business planning.** I broke personal finances into ten areas to manage, based on the "Personal Financial Overview" diagram from the book "Investment 101". The ten are income and spending, emergency savings, net worth, investments, debt, taxes, insurance, retirement funds, passing on wealth, and goals. Every area follows the same cycle: set a goal → make an action plan → compare actual results with the target each month → adjust the plan or the goal.

**Phase 2 | Model tuning.** The core rule is that the AI only suggests plans, and the system calculates every number, because numbers are where AI makes the most mistakes. The AI's "adjustment plan" must follow a strict format (a JSON schema), and it can only pick from options the system gives it: which items it may adjust and how. The system first checks that each change uses valid fields and ranges, then runs the plan through a lifetime income-and-spending simulation and every stress scenario. The instructions given to the AI also change with the card the user is looking at, so the AI acts as the advisor for that card.

**Phase 3 | Development and deployment.** The back end uses FastAPI, SQLModel, and SQLite, with all the formulas kept in one core module (the domain layer). The front end uses React and TypeScript and only shows the results the API has calculated; it does no math itself. I also built an API for receiving data, so other apps can send in balances and transactions and users don't have to type them in every month. The system runs on my own Mac and is opened to the internet through Cloudflare Tunnel. The user site and the admin back office have two separate addresses, and the back office has an extra login layer from Cloudflare Access.

**Phase 4 | Operations and monitoring.** Accounts and data are protected: users need an invitation code to sign up, each user gets their own database file, and it is backed up automatically every day and kept for 14 days. Before someone uses the AI for the first time, the system asks them to agree to send their financial numbers to OpenAI, and records which version they agreed to and when. Without that consent, it reads no data and does not call the AI model. The free version has a monthly limit on AI uses, and a use only counts when the AI answers successfully.

## Next steps

To be added.
