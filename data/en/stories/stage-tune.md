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

- **AIBA**: Formulate acceptance criteria as test questions. Questions based on business scenarios and historical cases with known answers.
- **AIBU (Business Unit)**: Provide real-world business scenarios and cases to determine whether the answers are correct in a business context.
- **Data Team**: Data sources, cleaning, labeling, and quality.
- **TPM (Technical Project Manager)**: Coordinate technical decisions regarding model selection, prompts, and retrieval, and track the results of each round of testing.
- **Information Security**: Design attack scenarios and red team tests to ensure that personal data and confidential information are not leaked.
- **Compliance/Risk Management**: Confirm that the output does not violate regulations, such as the terminology used in investment advice and the fairness of credit extensions.

## Handoffs and checks

The business unit and the Compliance Department first establish the rules: what AI can do, when to switch to human intervention, and what it cannot do. The technology department then sets test questions and runs tests based on these rules. Models that do not meet the threshold do not proceed to the next stage.

## What I did in this stage

- PoC responsible for AI safety guardrails: Designed thousands of test questions, compared two guardrail products, and established industry-standard validation methods. See [Guardrails PoC](project.html?id=guardrails-poc) 。
- Clean the training data for the financial LLM and evaluate the model's regulatory interpretation. See [FinLLM](project.html?id=finllm) 。
- At TEJ, the RAG chunking strategy was adjusted, increasing the accuracy of customer service responses from 60% to 85%. See [AI-Powered Customer Service](project.html?id=rag-support-bot) 。
