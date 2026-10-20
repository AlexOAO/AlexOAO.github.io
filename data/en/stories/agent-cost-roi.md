## Why this project

To launch four business AI Agents (Loan Assistant, Credit Review, Customer Service, Wealth Assistant), the bank must allocate GPUs and budgets. But their cost structures are different: some use on-premises GPUs, some use cloud tokens, and one uses only CPUs. Without one shared model, they cannot be compared, and nobody can decide who gets resources first.

## My role

I led the cost model and the 3-year TCO / ROI. Business units supplied volumes and benefits; I designed the models, did the calculations, and compared the results.

## What I did

### Split resources into "space × time"

I explain GPUs with a building: floor area decides how many AI models can move in; operating hours decide how many Agents can be served.

- **Space = GPU memory**: holds models, is never given back, and is a fixed cost.
- **Time = GPU compute**: runs requests, is reused, and is a variable cost.

The bank's pool is 5 RTX PRO 6000 cards at 96 GB each: 480 GB and 432,000 card-seconds per day.

### Look at the peak, not the daily total

KV cache memory depends on how many requests run at the same time, not on how many run in a day. So whether IT must buy more GPUs depends on peak concurrent use.

### Three cost models and one benefit model

- **Capacity model**: the memory and card-seconds each Agent's on-premises parts need.
- **On-premises amortization model**: memory is a fixed cost; a shared part counts once and is split by time share.
- **Cloud token model**: monthly cost = volume × tokens per journey × unit price.
- **Benefit model**: monthly benefit = volume × improvement per unit × value per unit.

The four Agents serve different cases, but all fit one formula: **number of events × resources per event × unit price**.

### Ask vendors for the right numbers

I designed a vendor data request form for on-premises parts only: model size, quantization, memory per token, concurrent requests, and representative test samples.

## Results

- 3 cost models and the vendor form are done; the GPU pool model and peak estimate are done.
- A 3-year TCO, TBE, and ROI comparison format for the 4 Agents is ready.
- Each Agent's estimate is in the sub-projects below.

## Next steps

Collect the four vendors' forms, add the business units' benefit data, and deliver the final TCO / ROI and GPU quotas as the basis for resource allocation.
