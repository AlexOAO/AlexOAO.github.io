---
title: agent-customer-service
---

## Results

**Customer Service is the only one of the four Agents measured in two units: minutes for speech, tokens for text.** Its workload is counted in the business-hour peak from 43,000 calls per month; the GPU allocation follows the vendor's updated estimate.

## Why this project

The Customer Service Agent handles service calls: on premises, STT turns speech into text, then an SLM processes it. Speech recognition is one of the heaviest GPU loads, and calls come during business hours. A wrong estimate means congestion at peak time.

## My role

Contributor. A colleague leads the compute estimate; I provide the cost model.

## What I did

**Phase 1: call volume and time-window assumptions.** Tokens look like the obvious unit, but they do not fit speech: in the same 3-minute call, fast and slow speakers can differ almost two times in tokens, while GPU time is about the same. So STT is measured in minutes and the SLM in tokens, multiplied separately and then added. From 43,000 calls per month, I placed the workload in the business-hour peak: it must answer in real time and cannot move to off-peak like a batch job.

**Phase 2: the first vendor compute meeting.** We aligned the assumptions with the vendor and asked for an updated estimate.

**Phase 3: the vendor's updated estimate.** Waiting for the vendor.

## Next steps

With the updated estimate, confirm the GPU allocation and calculate the Customer Service TCO.
