---
title: agent-customer-service
---

## Results

**I built the prototype for the Customer Service Assistant and provided its cost-benefit framework.** The prototype can start by playing a phone call and then go through the real-time transcript, knowledge base suggestions, post-call summary, and quality control. It should be measured in terms of service: how many calls are handled by AI, how many need to be transferred to a human agent, and the cost of service per call. The measurement framework and call volume benchmarks have been completed. The amount of resources required will be confirmed after the vendor updates its assessment.

## Why this project

**During a call, service staff have to listen and look things up at the same time. After hanging up, they still have to write notes and wait for a quality check.** The Service Agent handles the third stage of the customer journey, Smart Service, which aims to serve customers proactively and make them happier. Calls bunch up during business hours and must be answered right away. Plan too few resources and peak hours jam; plan too many and money is wasted.

## What it does

**Who it serves.** Customer service staff. It is their AI helper at work (Copilot). The staff member talks to the customer, and the AI helps from behind.

**What it can do on its own:**

- Search the Knowledge Base to find the information needed to answer the customer's question.
- Draft replies in advance.
- Write a post-call summary, a short recap of the call, after it ends.
- Do a first check on service quality (quality check).

It works from the call recording and the full transcript of the call turned into text.

**What it hands to people:** When a quality check finds a serious problem, a person handles it.

**What it can't do:** Respond directly to the customer. All content entered into the records must be confirmed by customer service personnel.

**How people supervise.** A person confirms every item, which is called human-in-the-loop.

**Architecture.** Because it handles call recordings and personal data, it runs fully on the bank's own servers (on-premises), with on-premises models only: one that turns speech into text, plus an on-premises language model.

**How to verify it.** Verification checks three things: compare a sample of summaries against the original recordings; check that the AI's quality scores match the scores people give; and confirm that summaries reveal no personal data.

## My role

I built the prototype for the Customer Service Assistant. The cost-benefit work was shared with a colleague: they led the computing estimate, and I provided the cost-benefit framework.

## What I did

**Phase 1 | prototype** I created a prototype based on the customer service team's work context, allowing the business unit to see firsthand how it searches the knowledge base, drafts responses, and writes post-call summaries. The prototype can be operated in practice:

- **Synthesized call recording.** I made 12 customer service calls using computer-generated speech, covering scenarios such as lost cards, billing disputes, failed transfers, customer complaints, and suspected fraud. The recordings are in dual-channel audio, with one channel for the customer service representative and the other for the customer. This is a common recording method used in customer service centers. The recordings do not contain any real customer information.
- **It's real speech-to-text, and you can switch the engine.** By default, the Whisper model is run locally, representing the on-premises side. You can also switch to a speech service in OpenAI API format, or directly read a pre-prepared transcript. The system identifies who is speaking based on the audio channel. When set to "Local Only," the service refuses to start as soon as a cloud address is detected.
- **Customer service staff's workstation.** The transcript appears in real time as the call progresses. Alongside it are customer details with personal information redacted, knowledge base suggestions updated based on the conversation, and draft responses. The draft is read to the customer by the customer service representative themselves; the AI does not respond directly to the customer. You can also make live calls using your browser's microphone.
- **Post-call summary and quality check.** After the call ends, the AI first writes a summary. The summary will only be entered into the customer record after the customer service representative has revised and confirmed it. Personal data will be redacted again before it is entered. Quality control scores each item according to the scoring rubric. If serious issues are identified, they are automatically forwarded to the supervisor.
- **Admin** 12-page admin dashboard, including the Quality Control Center (comparing AI and human scores), critical to-do items, peak capacity (comparing underestimation and overestimation of resources), and costs and benchmarks.

Test results: The word error rate of the local Whisper is approximately 14%. The identification of speakers, classification of incoming calls, and assessment of serious issues were all accurate, and the full card number did not appear in the summary.

**Trial Prototype:** [kgib-service.xiang-wei-li.com](https://kgib-service.xiang-wei-li.com). Select a test customer service representative to log in, and then select a call from the call queue to play. Both the recording and the customer information are simulated.

**Phase 2 | Framework design.** Voice and text workloads are counted in different units. I converted both into one unit cost: the service cost per call.

**Phase 3 | Data collection and calculation.** The business unit gave us monthly call volume and placed the workload into peak business hours. We held a first computing meeting with the vendor to agree on assumptions, then asked the vendor to update its estimate. We are waiting for the vendor's reply.

**Phase 4 | Institutionalize.** After launch, track two kinds of metrics:

- Business ratios: calls handled with AI help ÷ all calls; transfer-to-human rate.
- Realization ratios: actual service cost per call ÷ baseline; benefit realization.

## Next steps

Once the vendor's updated estimate arrives, confirm the resources and finish the Customer Service Assistant's baseline.

Back to the parent project: [The Four Major AI Agents](project.html?id=agent-cost-roi) 。
