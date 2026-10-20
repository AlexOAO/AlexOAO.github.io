## Why this project

The FSC AI guidelines have six principles: accountability, fairness, privacy, robustness and security, transparency and explainability, and sustainability. The principles are clear; the hard part is how to check them. Before the four Agents launch, the bank must show evidence that they meet all six. And every future AI project must be checked the same way.

## My role

I led the design of the bank's internal pre-launch check for AI.

## What I did

### Turn principles into three things you can check

Principles are the regulator's language; a check needs concrete objects. I split it into three layers:

- **Documents**: was the process followed, are records kept, who approved (principles 1 and 6).
- **AI output**: is the answer correct and fair, does it leak data, can it explain itself (principles 2 to 5).
- **AI behavior**: what data it read, what it changed, whether it exceeded its permissions (principles 1, 3, 4, 5).

The review showed that existing policies covered only the first layer. The second and third were empty.

### Three layers × three questions = nine cells

The examiners' eight inspection items come down to three questions: was it assessed before launch? Are records kept? Is it still managed after launch? Three layers times three questions make nine cells.

> The definition of the check: before any AI launches, fill all nine cells and keep the evidence.

### Five steps inside the existing process

The check sits after "risk assessment" and before "approval":

- Decide if it applies: required for medium and high risk; low risk keeps self-assessment.
- Set this AI's rules: what it must never do, and when it must hand over to a person.
- Prepare the test set.
- Test the output quality, and test whether guardrails and permissions hold.
- Submit the report: no pass, no launch.

Only the business units can answer step 2: how far the Loan Assistant may negotiate, what share of Credit Review cases need human review, whether the Wealth Assistant may touch transactions. Guardrail vendors and platforms do not know this. Clear business rules are what let them block the right things.

### Four AI types, four test methods

The four Agents are different types, so the second layer changes its method:

- Conversational: ask test questions and check the answers.
- Decision: use cases with known answers to test accuracy and consistency across groups.
- Generative: sample and compare the source with the output for invented or missing content.
- Scoring: compare with human scores for consistency.

One pass rule applies to all: **zero critical errors**. Leaking another person's data, giving a loan decision directly, being led to change behavior, or taking an unauthorized action fails the check at once.

## Results

- Delivered the survey and framework for pre-launch AI Agent checks.
- Proposed adding it as a chapter of the bank's AI lifecycle management rules: it starts at SIT / UAT, and no check report means no production release.
- A new project fills in only two things: its rules and its business test set. The framework, steps, pass rule, and report format stay the same.

## Next steps

Complete the checks for the four Agents against the six principles. The first Agent (Loan Assistant) sets up the framework, methods, and pass rules; each later Agent only adds its own rules and test set.
