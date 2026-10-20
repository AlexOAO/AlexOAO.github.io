## Why this project

The Loan Assistant (Sales Agent) helps customers apply for loans. To compare it with the other three Agents on one baseline, the first step is to know which resources it uses.

## What I did

- **Listed the on-premises parts**: the Loan Assistant uses CPU only, for data masking. It needs no GPU memory.
- **Applied the cloud token model**: cost = volume × tokens per journey × unit price.
- **Requested the monthly volume** from the business unit.

## Current result

The Loan Assistant takes no space in the GPU pool; its cost will be in cloud tokens. The monthly volume is still pending, so cost and ROI cannot be calculated yet.

## Next steps

When the volume arrives, calculate TCO and ROI and add them to the 4-Agent comparison.
