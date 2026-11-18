---
title: stage-tune
---

> Below is a common division of labor for AI projects in the financial industry. The names and divisions of units vary from bank to bank. Here, we use job titles to explain what each person is responsible for at this stage.

## What this stage does

Questions to answer for model tuning: **Are the model's answers correct and safe?** The performance of the same model can vary significantly when the data, prompts, or retrieval methods are changed. At this stage, repeatable tests should be used to demonstrate that the model's performance is sufficient.

Deliverables for this phase:

- Data: Cleaned training or retrieval data, as well as labeled test sets.
- Prompt and retrieval settings: For example, RAG's chunking method and prompt version.
- Evaluation results: Accuracy, consistency, and the rationale behind each judgment.
- Red Team Testing: Uses attack prompts to test whether the model will leak data, be bypassed, or say things it shouldn't.
- Guardrail settings: Enter what you want to block for inputs and outputs.

## Who takes part

- **[BU Business Unit](roles.html#role-bu)**: Supplies real business cases and model answers, and judges whether answers are right for the business.
- **[BA AI Business Analyst](roles.html#role-ba)**: Writes the rules and acceptance criteria as test questions, and agrees the launch bar with the business unit.
- **[CCO Compliance](roles.html#role-cco)**: Sets rules and red lines, and checks that output breaks no regulation, such as the wording of investment advice or fairness in lending.
- **[DE Data Engineer](roles.html#role-de)**: Data sources, cleaning, labeling and quality.
- **[DS Data Scientist](roles.html#role-ds)**: Features, model experiments and analysis of results.
- **[MLE ML Engineer](roles.html#role-mle)**: Tunes prompts, designs RAG retrieval, chooses models and fine-tunes when needed.
- **[QA Testing](roles.html#role-qa)**: Replaces traditional testing. Traditional tests check that input A always gives B; AI needs an evaluation set that measures accuracy, consistency and the reasons behind each answer.
- **[ISO Information Security](roles.html#role-iso)**: Designs attack questions and red-team tests to make sure personal and confidential data do not leak.
- **[TPM Technical PM](roles.html#role-tpm)**: Coordinates technical decisions on models, prompts and retrieval, and tracks each round of results.
- **[MRM Model Risk Management](roles.html#role-mrm)**: The second line; validates the model independently of the team that built it.
- **[WG AI Working Group](roles.html#role-wg)**: Confirms the model has passed the bar before it moves on to build.

## Handoffs and checks

The business unit and the Compliance Department first establish the rules: what AI can do, when to switch to human intervention, and what it cannot do. The technology department then sets test questions and runs tests based on these rules. Models that do not meet the threshold do not proceed to the next stage.

Agree the launch bar with the business unit up front. Generative AI will never give word-for-word identical answers; without an agreed bar, testing never ends and the launch keeps slipping. Ask the business unit to set the acceptance criteria: how many test questions and what accuracy. Once the agreed bar is met, launch and keep iterating.

## What I did in this stage

- PoC responsible for AI safety guardrails: Designed thousands of test questions, compared two guardrail products, and established industry-standard validation methods. See [Guardrails PoC](project.html?id=guardrails-poc) 。
- Clean the training data for the financial LLM and evaluate the model's regulatory interpretation. See [FinLLM](project.html?id=finllm) 。
- At TEJ, the RAG chunking strategy was adjusted, increasing the accuracy of customer service responses from 60% to 85%. See [AI-Powered Customer Service](project.html?id=rag-support-bot) 。
