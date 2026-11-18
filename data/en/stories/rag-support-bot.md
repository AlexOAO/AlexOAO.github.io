---
title: rag-support-bot
---

## Results

**After a change in chunking, that is, how documents are split, the accuracy of "Little t" rose from 60% to 85%, with answers in about 2 to 3 seconds.** Little t is the AI support bot on TEJ's website. Members search technical manuals in natural language, and admins maintain the knowledge base in a console.

## Why this project

The answers are in the manuals but spread across them. TEJ members often look up technical manuals and database usage; when members cannot find an answer, they wait for support.

## My role

A team project and my first internship project. I owned the RAG architecture, the vector database, and the front end and admin console end to end.

## What I did

**Phase 1 | Requirements.** The answers were in the technical manuals, but spread across them. Members needed to ask in natural language and get the manual's answer directly.

**Phase 2 | PoC.** We chose RAG over fine-tuning because the manuals change often and retraining the model each time costs too much. RAG lets the AI look up the knowledge base before it answers, and keeps the knowledge base separate from the model: when a document changes, only its embeddings, the search index, are rebuilt. I compared Pinecone, Weaviate, Chroma, and Qdrant, and chose Qdrant. It runs self-hosted on Docker so data stays inside the company, it supports filtering for category queries, and it performs well at medium data volume.

**Phase 3 | Build.** A new way of splitting raised accuracy from 60% to 85%. With fixed 500-token chunks, the LLM often got incomplete context, and accuracy was 60%. I switched to semantic chunks, split by paragraph with overlap so neighboring chunks share some text, and tagged each chunk with its source section as metadata.

**Phase 4 | Launch.** The system runs on Docker Compose. Qdrant does vector search, LangExtract parses documents, FastAPI runs the back end, plus an HTML front end and an admin console.

**Phase 5 | Operate.** Admins maintain the knowledge base in the console, so document updates need no engineer.

## What I learned

The hardest part of putting AI to work is often defining what a good answer is. Aligning with the business side took more time than code, and it is where the real value is. My full write-up (in Chinese): [Lessons from building a RAG support bot](posts/rag-smart-customer-service.html).
