---
title: ai-ops-dashboard
---

## Results

**I designed a metric framework for the AI operations performance dashboard, split into five parts: adoption, quality, value, cost, and risk.** The same framework works for the tools staff use (Copilot, Gemini, the Ella assistant) and for the four Agents that serve customers.

The dashboard is still being planned: the AI ROI (return on investment) metrics are being designed, and the Copilot monthly report first needs IT to confirm what data is available.

## Why this project

The bank's AI now runs on two tracks: tools for staff (internal) and services for customers (external). Internally, Copilot is being rolled out further: all 25 departments have applied, for 771 licenses in total. Gemini training is about to start, and the Ella assistant has no dashboard yet for seeing how it is doing. Externally, the four Agents are getting ready to launch.

Each track has its own numbers, but no single view answers the question managers care about most: **are these AI investments worth it?**

## My role

Contributor. I help design the metric framework, and I plan to connect the four Agents' cost model and the Guardrails PoC test results to the same dashboard.

## What I did

**Phase 1 | Problem definition.** A dashboard needs to answer just one question: is this AI investment worth it?

**Phase 2 | Framework design.** To answer it, you need to look at five things:

- Adoption: is anyone using it? Licenses, activation rate, active users, and how many departments use it.
- Quality: does it work well? Answer accuracy, the share of cases handed over to a person, and user feedback.
- Value: what did it save or add? Hours saved, plus business numbers such as volume handled and conversion rate.
- Cost: what did it cost? License fees, token use (how much text the model processes), and GPU use.
- Risk: is it safe? The miss rate (attacks the guardrail should block but lets through), the false-block rate (normal requests it blocks by mistake), and incidents.

Adoption and quality answer "is it being used"; value, cost, and risk answer "is it worth it". The AI ROI metrics for the four AI projects and new projects are being designed on this framework, in response to the DDT request.

**Phase 3 | Data collection.** For internal tools, the vendors' own reports already have the usage data. Microsoft's Copilot Dashboard has readiness, adoption, impact, and sentiment metrics; Google Workspace's Gemini reports show licenses, active users, and usage trends. Ella was built in-house, so analysis has to wait until IT opens back-end access and provides the raw data. For the four external Agents, the metrics must tie to business results: conversion rate for the Loan Assistant, volume handled for Credit Review, service cost for Customer Service, and engagement and AUM (the assets customers have the bank manage) for the Wealth Assistant. Cost comes from the four Agents' cost model; risk comes from the miss and false-block rates measured in the Guardrails PoC.

**Phase 4 | Pilot.** Once IT confirms what Copilot data exists, agree on Agent management and business metrics, and produce the first monthly report.

**Phase 5 | Institutionalize.** Over time, these metrics will become part of "AI operations analytics (quality / value / assets)" in the bank's AI operations platform.

## Next steps

- Confirm which fields each data source really provides, and build the first dashboard version for the internal tools.
- Set a target for each metric, so the dashboard shows not just numbers but whether each one is on target.

## Further reading

I wrote up the full thinking behind this framework in a post (in Chinese): [How to read AI operations performance: one dashboard that answers "is AI worth it?"](posts/ai-ops-dashboard.html).
