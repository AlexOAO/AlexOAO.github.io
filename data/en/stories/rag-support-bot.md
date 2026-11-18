---
title: rag-support-bot
---

## Results

**We changed the chunking strategy, that is, how documents are cut into small pieces, and the answer accuracy of "Little t" rose from 60% to 85%, with answers in about 2 to 3 seconds.** Little t is the AI support bot on TEJ's website. Members ask questions in everyday language to search the technical manuals, and admins maintain the knowledge base in a console.

## Why this project

TEJ members often need to look up the technical manuals and how to use the database. The answers are in the manuals, but spread all over; when members cannot find one, they have to wait for support.

## My role

A team project, and my first internship project. I owned the RAG architecture, the vector database, and the front end and admin console from start to finish.

## What I did

**Phase 1 | Requirements.** What members wanted was simple: ask in everyday language and get the answer from the manual directly.

**Phase 2 | PoC.** We chose RAG over fine-tuning, which means retraining the model. The manuals change often, and retraining every time costs too much. With RAG, the AI looks things up in the knowledge base before it answers, and the knowledge base stays separate from the model: when a document changes, we only rebuild its embeddings, the search index. A vector database stores that index and finds similar content. I compared Pinecone, Weaviate, Chroma and Qdrant, and chose Qdrant for three reasons. It runs self-hosted on Docker, so data stays inside the company. It supports filtering by category, which suits category queries in finance. And it performs well at medium data volume.

**Phase 3 | Build.** A new way of cutting documents raised accuracy from 60% to 85%. At first we cut every 500 tokens (a token is the unit AI uses to count text), and the LLM often got incomplete context, so accuracy was only 60%. I switched to cutting by meaning: split by paragraph, let neighboring pieces overlap a little, and tag each piece with its source section as metadata.

**Phase 4 | Launch.** The system runs on Docker Compose. Qdrant finds the relevant passages, LangExtract parses documents, FastAPI runs the back end, and there is an HTML front end plus an admin console.

**Phase 5 | Operate.** Admins maintain the knowledge base themselves in the console, so document updates need no engineer.

## What I learned

The hardest part of putting AI to work is often agreeing on what a good answer looks like. I spent more time aligning with the business side than writing code, and that is where the real value was. My full write-up (in Chinese): [Lessons from building a RAG support bot](posts/rag-smart-customer-service.html).
