// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { streamText, embed } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function retrieveContext(question: string) {
  const model = google.textEmbedding('gemini-embedding-001');
  const { embedding: queryEmbedding } = await embed({
    model,
    value: question,
    providerOptions: { google: { taskType: 'RETRIEVAL_QUERY', outputDimensionality: 1536 } }
  });

  const { data, error } = await sb.rpc('match_chunks', {
    query_embedding: queryEmbedding,
    match_count: 8,
    min_score: 0.65
  });
  if (error) throw error;

  const ctx = (data ?? []).map((d: any, i: number) =>
    `### [${i + 1}] Fonte=${d.source_id} | Score=${d.score.toFixed(3)}\n${d.content}`
  ).join('\n\n');

  const citations = (data ?? []).map((d: any, i: number) => `[${i + 1}] src:${d.source_id}`).join(' ');
  return { ctx, citations };
}

export async function POST(req: NextRequest) {
  const { messages, mode } = await req.json(); // mode: 'flash' | 'pro'
  const last = messages?.[messages.length - 1]?.content ?? '';

  const { ctx, citations } = await retrieveContext(last);

  const system = `
Você é o ZéBook, tutor de Direito para concursos no Brasil.
Responda em PT-BR, objetivo e didático, com passo-a-passo quando útil.
Use APENAS o contexto recuperado para fundamentar; se faltar base, diga explicitamente.
Inclua seção "Fontes" com os índices retornados.
Evite aconselhamento jurídico; foque em preparação para prova.
`;

  const modelId = mode === 'pro' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

  const result = await streamText({
    model: google(modelId),
    system,
    messages: [
      ...(Array.isArray(messages) ? messages.slice(0, -1) : []),
      {
        role: 'user',
        content: `Pergunta:\n${last}\n\n---\nContexto (trechos recuperados):\n${ctx}\n\n[Cite por índice]\n\nFontes: ${citations}`
      }
    ],
    providerOptions: {
      google: { thinkingConfig: { thinkingBudget: 2048, includeThoughts: false } }
    }
  });

  return result.toAIStreamResponse();
}

