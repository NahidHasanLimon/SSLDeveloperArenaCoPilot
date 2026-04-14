# SSLCommerz Docs Copilot

Laravel-based SSLCommerz documentation workspace with:

- documentation-first UI
- backend-proxied sandbox API explorer
- AI chat with session history
- grounded chat foundation using a local SSLCommerz knowledge base

This project is currently focused on the chatbot experience first. It is not yet a full independent `SSLCommerz AI` agent.

## Current Scope

Implemented:

- SSLCommerz-themed documentation UI
- `Chat`, `API Explorer`, and `AI Tools` panel structure
- sandbox request proxy through Laravel
- chat sessions persisted in MySQL
- Ollama/OpenAI provider abstraction
- grounded chat foundation with local knowledge documents and citations

Not implemented yet:

- vector embeddings
- vector database
- full semantic RAG
- automatic doc crawling/ingestion
- codebase-aware agent behavior

## Stack

- Laravel
- MySQL
- Docker Compose
- Ollama for local AI development
- OpenAI-ready provider path for later use

## Run With Docker

From the project root:

```bash
docker compose up --build
```

Then open:

- App: [http://localhost:8000](http://localhost:8000)
- MySQL host port: `3307`

Current database credentials:

- host inside Docker: `mysql`
- host from your machine: `127.0.0.1`
- port from your machine: `3307`
- database: `sslcopilot`
- username: `sslcopilot`
- password: `sslcopilot`

## Local AI Configuration

The app is currently configured for local Ollama development.

Relevant environment values:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=llama3.2:latest
```

If you want to switch later:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
```

## Main API Endpoints

SSLCommerz sandbox proxy:

- `POST /api/sslcommerz/initiate`
- `POST /api/sslcommerz/validation`
- `POST /api/sslcommerz/refund`
- `POST /api/sslcommerz/transactionQuery`

AI endpoints:

- `POST /api/ai/chat`
- `GET /api/ai/sessions`
- `GET /api/ai/sessions/{id}`
- `POST /api/ai/analyze/payload`
- `POST /api/ai/analyze/log`

## How Chat Works Now

The current chat is no longer only plain LLM chat.

Flow:

1. The frontend sends the message to `POST /api/ai/chat`.
2. Laravel creates or loads the chat session.
3. `ChatOrchestrator` saves the user message.
4. `SslCommerzDocsRetriever` searches the local SSLCommerz knowledge chunks.
5. Retrieved chunks are inserted into the system prompt as grounded context.
6. The configured AI provider is called.
7. The assistant response is saved with metadata including sources.
8. The frontend renders the answer and citations under the message.

Important:

- this is a grounded chat foundation
- it is not vector RAG yet
- retrieval is currently keyword-scored over local knowledge chunks

## Knowledge Base Structure

The current knowledge layer is config-driven.

Source config:

- [config/sslcommerz_knowledge.php](config/sslcommerz_knowledge.php)

Persistence:

- `knowledge_documents`
- `knowledge_chunks`

Models:

- [app/Models/KnowledgeDocument.php](app/Models/KnowledgeDocument.php)
- [app/Models/KnowledgeChunk.php](app/Models/KnowledgeChunk.php)

Services:

- [app/Services/AI/SslCommerzKnowledgeBootstrapper.php](app/Services/AI/SslCommerzKnowledgeBootstrapper.php)
- [app/Services/AI/SslCommerzDocsRetriever.php](app/Services/AI/SslCommerzDocsRetriever.php)

### Documents vs Chunks

A document is a top-level source like:

- `Initiate Payment`
- `Order Validation`
- `IPN and Callbacks`

A chunk is a smaller retrievable unit inside that document, for example:

- `Required Session Parameters`
- `IPN vs Redirect URLs`
- `Validation Response and Risk`

This chunking is what the retriever searches against.

## What “Grounded” Means Here

Grounded means the chat tries to answer from stored SSLCommerz docs context instead of relying only on the model’s own memory.

Current grounded behavior:

- retrieves relevant local SSLCommerz chunks first
- includes sources in the assistant message metadata
- renders citations in the UI

Current limitation:

- if Ollama/OpenAI is unavailable, fallback responses are used
- citations may still appear, but the final wording may come from fallback logic rather than model generation

## Known Limitations

- not vector-based yet
- knowledge base is manually curated in config, not auto-ingested from the website
- local Ollama connectivity from Docker must work for fully model-generated answers
- payload/log analyzers exist, but chatbot quality is the current primary focus

## Next Recommended Step

To move from grounded chat foundation to real RAG:

1. add embeddings for knowledge chunks
2. add vector storage
3. swap keyword retrieval for vector or hybrid retrieval
4. keep the same citation-oriented chat contract

## MySQL Access From External Tools

If you want to inspect this project database from another tool or another container:

- host from your machine: `127.0.0.1`
- port: `3307`
- database: `sslcopilot`
- username: `sslcopilot`
- password: `sslcopilot`

If another Docker container needs access, either:

- connect to `host.docker.internal:3307`
- or join the same Docker network and use the service name `mysql`

## Notes

- The old static prototype files still exist in the repo root, but the live app is Laravel-served.
- The temporary `laravel-app/` scaffold directory is also still present.
- The current branch is using local commits only.
