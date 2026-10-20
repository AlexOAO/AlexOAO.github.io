## Why this project

The Customer Service Agent handles service calls: on premises, STT turns speech into text, then an SLM processes it. Speech recognition is one of the heaviest GPU loads, and calls come during business hours. A wrong estimate means congestion at peak time.

## What I did

- Used 43,000 calls per month as the volume base.
- **Measured STT work in minutes, not tokens**: in the same 3-minute call, fast and slow speakers can differ almost two times in tokens, but GPU time is about the same.
- **Counted it in the peak window**: customer service must answer during business hours and cannot move to off-peak like a batch job.
- Customer Service is the only Agent with two work units (minutes and tokens), so each is multiplied separately and then added.

## Progress

A colleague leads the compute estimate; I contribute the cost model. The first vendor compute meeting was on 10/16, and the vendor plans to update its estimate on 10/23.

## Next steps

After the vendor's update, confirm the GPU allocation and calculate the Customer Service TCO.
