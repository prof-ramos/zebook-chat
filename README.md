# ZeBook — Chatbot Jurídico para Concursos

Assistente em PT‑BR com RAG (Supabase + embeddings Gemini) para estudo de concursos. UI simples com textarea, alternância Flash/Pro e seção “Fontes”.

## Setup Rápido
- Dependências: `pnpm i`
- Ambiente: `cp .env.example .env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`. Não use `SUPABASE_SERVICE_ROLE_KEY` em produção.
- Supabase: rode a migração em `supabase/migrations/20250829_init.sql` (SQL Editor ou CLI) e confirme a função `match_chunks`.

## Ingestão de Documentos (local/CI)
1) Coloque PDFs/DOCX em `data/` (ex.: leis, decisões, apostilas)
2) Execute: `pnpm ingest data/`
   - Requer `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`.

## Desenvolvimento
- Dev: `pnpm dev` → http://localhost:3000
- Build: `pnpm build` | Produção local: `pnpm start`
- Lint: `pnpm lint`

## API
`POST /api/chat` com `{ messages, mode: 'flash'|'pro' }`.
- Faz embed da pergunta, recupera contextos via `rpc('match_chunks')` e faz streaming da resposta (Vercel AI SDK + Gemini). O modelo inclui uma seção “Fontes” com índices.

## Estrutura
- `app/api/chat/route.ts`: Rota de chat (streaming + RAG)
- `scripts/ingest.ts`: Parser de PDF/DOCX, chunking e embeddings
- `lib/supabase.ts`: Helper do client
- `lib/*Client.ts`: Integrações (Supabase SSR, Gemini)
- `messages/`: i18n

Licença: MIT
