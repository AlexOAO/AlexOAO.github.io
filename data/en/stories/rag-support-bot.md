## Why this project

TEJ members need to look up technical manuals and database usage, but the answers are spread across manuals; when they cannot find one, they wait for support. "Little t" is the AI support bot on TEJ's website: a logged-in member asks in natural language, and the AI finds the answer in the manuals.

## My role

This was a team project. I owned the RAG architecture, the vector database, and the front end and admin console end to end.

## What I did

### Why RAG, not fine-tuning

Financial product manuals change often; retraining a model each time costs too much. RAG separates the knowledge base from the model: when a document changes, only its embeddings need to be rebuilt.

### Why Qdrant

I compared Pinecone, Weaviate, Chroma, and Qdrant, and chose Qdrant:

- It runs self-hosted on Docker, so data stays inside the company.
- It supports filtering, which suits category queries in finance.
- It performs well at medium data volume.

### Chunking was the key

At first I split text into fixed 500-token chunks, and the LLM often got incomplete context. I switched to semantic chunks (by paragraph, with overlap) and tagged each chunk with its source section. Accuracy rose from 60% to 85%.

### Final architecture

The system runs on Docker Compose: Qdrant for vector search, LangExtract for document parsing, FastAPI for the back end, plus an HTML front end and an admin console. An answer takes about 2 to 3 seconds.

## Results

- The support bot launched; members search manuals in natural language.
- After the chunking change, accuracy rose from 60% to 85%.
- Admins maintain the knowledge base in the console.

## What I learned

The hardest part of putting AI to work is often defining what a good answer is. Aligning with the business side took more time than writing code, and it is where the real value is.

My full write-up (in Chinese) is under further reading.
