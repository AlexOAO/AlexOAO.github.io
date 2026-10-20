## Why this project

The Wealth Assistant is the bank's AI wealth management app (App 2.0). It has the most users: 324,959 logins per month, forecast to reach 495,000 in year 3. I did two things: a PoC to confirm that Q&A works, and compute planning for launch.

## What I did

### PoC: does it work?

- Tested the Q&A function.
- Drew the first system architecture.
- Documented the results and handed over to a senior colleague.

### Compute: usage will grow, so plan the GPUs first

- Forecast usage for years 1 to 3 from monthly logins.
- The Wealth Assistant's SLM runs all day, so its card-seconds fall in both the peak and off-peak windows.

## Results

- PoC completed and handed over.
- GPU allocation confirmed: 2 in production, 1 in test.
- The Wealth Assistant API was also tested in the Guardrails PoC: 1,100 cases across its 10 business areas.

## Next steps

The A2UI research will start its business scenarios with the Wealth Assistant.
