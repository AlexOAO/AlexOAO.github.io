## Why this project

Credit Review (Credit Agent) handles credit review documents. Case volume grows every year; a budget based on today's cost will be wrong next year. I had two questions: what does one case cost, and what is the 3-year total?

## What I did

- **Mapped the flow**: on premises, two OCR models read the documents and an SLM checks inconsistencies; a cloud LLM processes the results.
- **Measured OCR work in pages, not tokens**: a dense table page and a one-line title differ ten times in tokens, but take similar scan time.
- **Ran it as an off-peak batch**: the on-premises parts do not take peak business-hour compute.
- **Estimated cloud token cost**: 11,250 input and 2,500 output tokens per case, with a GPT5.5 price assumption ($2.5 input / $15 output).
- **Forecast the volume**: from 13,513 cases per month today to 14,999, 16,649, and 18,480 in years 1 to 3.

## Results

- Cloud token cost is about NT$1.92 per case.
- Token cost for years 1 to 3 is about NT$346,591, 384,717, and 427,034.
- Production uses 1 GPU.

## Next steps

Add build and maintenance costs, then deliver the full 3-year TCO and ROI.
