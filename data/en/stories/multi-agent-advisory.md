## Why this project

One person making investment decisions has blind spots, so fund companies use analysts with different roles. A single LLM is similar: it struggles to handle technicals, news sentiment, and fundamentals at once, and its advice has no reasoning trail to check. What if AI worked like a fund team?

## My role

I contributed to the architecture: the roles of the Agents, and the MCP tools that connect TEJ data.

## What I did

### Five Agents, five jobs

- Technical analyst: calculates indicators and reads the trend.
- News sentiment analyst: reads current news and scores market sentiment.
- Fundamental analyst: analyzes financial statements and values the company.
- Bull-bear debater: combines the views and argues both sides.
- Trader: turns the debate's conclusion into a buy or sell signal.

### Why LangGraph

Compared with CrewAI and AutoGen, LangGraph gave finer control of the flow: data passing between Agents, branches, and error handling are all defined clearly as a graph. In finance, control matters more than autonomy.

### Real data through MCP

With MCP, each Agent calls the TEJ API directly. The system does not just chat; it decides from data.

### Checked with backtests

The signals went into the Zipline backtest engine for a 3-year backtest on Taiwan stock history. The numbers cannot be published, but the results gave the team confidence in the architecture.

## What I learned

The biggest challenge in a multi-agent system is not making each Agent smarter. It is designing the protocol between them: who speaks first, who decides, and how conflicts are resolved. That design sets the system's ceiling.
