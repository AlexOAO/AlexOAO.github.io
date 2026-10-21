---
title: multi-agent-advisory
---

## Results

**We had five AI Agents split the work and debate like a fund team, then ran a 3-year backtest on Taiwan stock history with Zipline.** The numbers cannot be published, but the results gave the team confidence in the architecture.

## Why this project

One person making investment decisions has blind spots, so fund companies use analysts with different roles. A single LLM is similar: it struggles to handle technicals, news sentiment, and fundamentals at once, and its advice has no reasoning trail to check. What if AI split the work too?

## My role

Architecture contributor: Agent roles, and MCP tools to connect TEJ data.

## What I did

**Phase 1: design the roles of 5 Agents.** A technical analyst reads indicators and trends; a news sentiment analyst scores market sentiment; a fundamental analyst values the company from its statements; a bull-bear debater argues both sides; a trader turns the debate into a buy or sell signal. We compared CrewAI, AutoGen, and LangGraph, and chose LangGraph: data passing, branches, and error handling between Agents are all defined clearly as a graph. In finance, control matters more than autonomy.

**Phase 2: connect TEJ data through MCP.** Each Agent calls the TEJ API directly. The system does not just chat; it decides from data.

**Phase 3: integrate Zipline backtests.** The signals went into the backtest engine and were tested over 3 years of Taiwan stock history.

## What I learned

The biggest challenge in a multi-agent system is not making each Agent smarter. It is the protocol between them: who speaks first, who decides, and how conflicts are resolved. That design sets the system's ceiling. More details (in Chinese): [A Multi-Agent investment architecture](posts/multi-agent-investment.html).
