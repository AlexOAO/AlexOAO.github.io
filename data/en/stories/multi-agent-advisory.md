---
title: multi-agent-advisory
---

## Results

**We had five AI Agents split the work and debate like a fund team, then used Zipline, a backtesting tool, to simulate three years of trading on Taiwan stock history.** The numbers cannot be published, but the results gave the team confidence that the architecture works.

## Why this project

One person making investment decisions has blind spots, which is why fund companies use analysts with different roles. A single LLM is the same. It struggles to cover technicals, news sentiment and fundamentals at once, and you cannot see or check the reasoning behind its advice. What if AI split the work too?

## My role

I worked on the architecture: I designed each Agent's role and used MCP tools to connect TEJ data. MCP is a standard way for AI to call outside tools and data.

## What I did

**Phase 1 | Requirements.** We set out to fix two problems with a single LLM: it cannot cover technicals, news sentiment and fundamentals at once, and its advice has no reasoning trail to check.

**Phase 2 | Design.** Five Agents, one job each. A technical analyst reads indicators and trends. A news sentiment analyst turns market mood into a score. A fundamental analyst reads the financial statements and values the company. A bull-bear debater gathers the views and argues both sides. A trader turns the debate into a buy or sell signal. We compared CrewAI, AutoGen and LangGraph, and chose LangGraph, because in finance staying in control matters more than letting the AI decide on its own. How Agents pass data, which path they take under which condition, and how errors are handled can all be defined clearly as a flow chart.

**Phase 3 | Build.** The system does not just chat; it makes decisions from data. Through MCP, each Agent calls the TEJ API directly for data.

**Phase 4 | Validation.** We fed the signals into the Zipline backtest engine and tested them on three years of Taiwan stock history.

## What I learned

The biggest challenge in a multi-agent system is not making each Agent smarter. It is setting the rules for how they talk: who speaks first, who has the final say, and what happens when they disagree. That design sets the system's ceiling. More details (in Chinese): [A Multi-Agent investment architecture](posts/multi-agent-investment.html).
