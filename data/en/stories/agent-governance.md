---
title: agent-governance
---

## Results

**I turned the FSC's six AI principles into a nine-cell table: before any AI launches, it fills in all nine cells and keeps the evidence, and that means it passes the check.**

- Delivered the survey of current practice and the framework design for checking AI Agents before launch.
- It can be reused: a new AI project only adds two things, the rules for that AI and test questions for its business use.

## Why this project

**The FSC's six principles are clearly written, but nobody could clearly say how to check them.** Four Agents were getting ready to launch at the time. The six principles are: accountability, fairness, privacy, robustness and security, transparency and explainability, sustainability.

## My role

I led the design of the bank's internal check for AI before launch.

## What I did

**Phase 1 | Problem definition.** Principles are written in the regulator's language, but a check needs concrete things to look at, so I split it into three layers. The first is **documents**: was the process followed, are records kept, and who approved it. The second is **AI output**: are the answers correct and fair, do they leak data, and can the AI say what they are based on. The third is **AI behavior**: what data it looked up, what it changed, and whether it went beyond its permissions. When I took stock, the bank's existing policies only covered the first layer. The second and third were completely empty.

**Phase 2 | Framework design.** Three layers times three questions make nine cells. When you break down the FSC examiners' eight inspection items, they really ask only three things: was it assessed before launch? Are records kept? Is it still being managed after launch? The check sits after "risk assessment" and before "approval" in the existing process, in five steps: decide whether it is needed → set this AI's rules → prepare the test questions → run the tests → submit the report for review. Four types of AI get four ways of testing. Conversational AI is quizzed on how it answers; decision-making AI is tested on cases with known answers, for accuracy and for treating different groups the same; generative AI is checked by comparing samples against the source; scoring AI is compared with scores people give. All four share one pass rule: **zero critical errors**.

**Phase 3 | Data collection.** Guardrails only know what to block once the business rules are clear. This step maps each of the four Agents to the six FSC principles, and needs the business units to answer: how far can the Loan Assistant negotiate? What share of Credit Review cases need a human review? Can the Wealth Assistant touch transactions? In progress.

**Phase 4 | Pilot.** The Loan Assistant goes first, and is used to set up the framework, the test methods, and the pass rules.

**Phase 5 | Institutionalize.** Write the check into the bank's AI lifecycle management rules as one chapter. The check starts when a project enters SIT / UAT testing (system testing and user acceptance testing), and without a check report it cannot go live. Each later AI only adds its own rules and test questions.

## Next steps

- Finish mapping the four Agents to the six principles.
- Start the pilot with the Loan Assistant, then write the check into the AI rules.

## Further reading

I wrote up how I did this project in a post (in Chinese): [What to check before an AI Agent launches: turning six FSC principles into a nine-cell table](posts/ai-agent-prelaunch-check.html).
