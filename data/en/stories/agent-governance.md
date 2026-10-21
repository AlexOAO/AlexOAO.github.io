## Results

**I turned the FSC's six AI principles into a nine-cell table: before any AI launches, fill all nine cells and keep the evidence, and it passes the check.**

- Delivered the survey and framework for pre-launch AI Agent checks.
- It is reusable: a new AI project fills in only two things, its rules and its business test set.

## Why this project

The four Agents were getting ready to launch. The FSC's six principles are clear: accountability, fairness, privacy, robustness and security, transparency and explainability, sustainability. But nobody could say clearly how to check them.

## My role

I led the design of the bank's internal pre-launch check for AI.

## What I did

**Phase 1: the pre-launch check survey.** Principles are the regulator's language; a check needs concrete objects. I split it into three layers: **documents** (was the process followed, are records kept, who approved), **AI output** (is it correct and fair, does it leak data, can it explain itself), and **AI behavior** (what data it read, what it changed, whether it exceeded its permissions). Existing policies covered only the first layer. The second and third were empty.

I then took apart the examiners' eight inspection items and found they ask only three questions: was it assessed before launch? Are records kept? Is it still managed after launch? Three layers times three questions make nine cells.

The check sits after "risk assessment" and before "approval", in five steps: decide if it applies → set this AI's rules → prepare the test set → test it → submit the report. No pass, no launch. Only business units can answer step two: how far may the Loan Assistant negotiate? What share of Credit Review cases need a human? May the Wealth Assistant touch transactions? Clear business rules are what let guardrails block the right things.

The four Agents are different types, so the second layer changes method: conversational AI is tested with questions; decision AI with cases that have known answers, for accuracy and consistency across groups; generative AI by sampling output against the source; scoring AI against human scores. One pass rule is shared: **zero critical errors**. Leaking another person's data, giving a loan decision directly, being led to change behavior, or taking an unauthorized action fails at once.

**Phase 2: checks for the four Agents.** In progress: mapping each Agent to the six FSC principles.

## Next steps

- Proposed adding this as a chapter of the bank's AI lifecycle rules: it starts at SIT / UAT, and no check report means no production release.
- The first Agent (Loan Assistant) sets up the framework and test methods; each later Agent adds only its own rules and test set.
