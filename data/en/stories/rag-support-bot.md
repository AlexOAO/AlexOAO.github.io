---
title: rag-support-bot
---

## Results

**After a chunking change, the accuracy of "Little t" rose from 60% to 85%, with answers in about 2 to 3 seconds.** Little t is the AI support bot on TEJ's website: members search technical manuals in natural language, and admins maintain the knowledge base in a console.

## Why this project

TEJ members often look up technical manuals and database usage. The answers are in the manuals but spread across them; when members cannot find one, they wait for support.

## My role

A team project and my first internship project. I owned the RAG architecture, the vector database, and the front end and admin console end to end.

## What I did

**Phase 1: build the Qdrant vector database.** We first considered fine-tuning a model, but the manuals change often and retraining each time costs too much. RAG separates the knowledge base from the model: when a document changes, only its embeddings are rebuilt. I compared Pinecone, Weaviate, Chroma, and Qdrant, and chose Qdrant: it runs self-hosted on Docker so data stays inside the company, it supports filtering for category queries, and it performs well at medium data volume.

**Phase 2: RAG Q&A and chunk tuning.** With fixed 500-token chunks, the LLM often got incomplete context, and accuracy was 60%. I switched to semantic chunks (by paragraph, with overlap) and tagged each chunk with its source section. Accuracy rose to 85%.

**Phase 3: front end, admin console, and launch.** The system runs on Docker Compose: Qdrant for vector search, LangExtract for parsing, FastAPI for the back end, plus an HTML front end and an admin console.

## What I learned

The hardest part of putting AI to work is often defining what a good answer is. Aligning with the business side took more time than code, and it is where the real value is. My full write-up (in Chinese): [Lessons from building a RAG support bot](posts/rag-smart-customer-service.html).
