---
title: ai-ops-dashboard
---

## Results

**I designed a five-part metric framework for the AI operations performance dashboard: adoption, quality, value, cost, and risk.** The same framework covers the internal tools (Copilot, Gemini, the Ella assistant) and the four external Agents.

The dashboard is still in planning: the AI ROI metrics are being designed, and the Copilot monthly report waits for IT to confirm the current data.

## Why this project

The bank's AI now runs on two tracks. Internally, Copilot is expanding: all 25 departments have applied, for 771 licenses in total; Gemini training is about to start; and the Ella assistant has no operations dashboard. Externally, the four Agents are getting ready to launch.

Each track has its own numbers, but no single view answers the question managers care about most: **are these AI investments worth it?**

## My role

Contributor. I take part in designing the metric framework, and I plan to connect the four Agents' cost model and the Guardrails PoC results to the same dashboard.

## What I did

**Phase 1 | Problem definition.** A dashboard needs to answer one question: is this AI investment worth it?

**Phase 2 | Framework design.** Answering it takes five parts:

- Adoption: is anyone using it? Licenses, activation rate, active users, department coverage.
- Quality: does it work well? Answer accuracy, hand-over-to-human rate, user feedback.
- Value: what did it save or add? Hours saved, plus business measures such as volume handled and conversion rate.
- Cost: what did it cost? License fees, token use, GPU card-seconds.
- Risk: is it safe? Guardrail miss and false-block rates, incidents.

Adoption and quality answer "is it being used"; value, cost, and risk answer "is it worth it". The AI ROI metrics for the four AI projects and new projects are being designed on this framework, in response to the DDT request.

**Phase 3 | Data collection.** For internal tools, the vendors' reports already give adoption data: Microsoft's Copilot Dashboard has readiness, adoption, impact, and sentiment metrics; Google Workspace's Gemini reports show licenses, active users, and usage trends. Ella is built in-house, so its analysis waits for IT to open back-end access and provide raw data. For the four external Agents, metrics must connect to business results: conversion rate for the Loan Assistant, volume handled for Credit Review, service cost for Customer Service, and engagement and AUM for the Wealth Assistant; cost comes from the four Agents' cost model, and risk from the Guardrails PoC miss and false-block rates.

**Phase 4 | Pilot.** After IT confirms Copilot's current data, agree on Agent management and business metrics, and publish the first monthly report.

**Phase 5 | Institutionalize.** Over time, these metrics become part of "AI operations analytics (quality / value / assets)" in the bank's AI operations platform.

## Next steps

- Confirm which fields each data source actually provides, and build the first dashboard version for the internal tools.
- Set a target for each metric, so the dashboard shows not just numbers but whether each one is on target.

## Further reading

I wrote up the full thinking behind this framework (in Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
