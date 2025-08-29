// scripts/ingest.ts
// Uso: pnpm ingest data/   (pasta com .pdf/.docx)
// Requer: SUPABASE_SERVICE_ROLE_KEY no .env (somente local/CI)

import fs from 'node:fs/promises';
import path from 'node:path';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { google } from '@ai-sdk/google';
import { embedMany } from 'ai';
import { encode } from 'gpt-tokenizer';

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY');

const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
const EMBED_DIM = 1536;
const embedModel = google.textEmbedding('gemini-embedding-001');
const providerOptions = { google: { taskType: 'RETRIEVAL_DOCUMENT', outputDimensionality: EMBED_DIM } } as const;

function chunkText(txt: string, targetTokens = 700, overlap = 120) {
  const words = txt.split(/\s+/);
  const chunks: string[] = [];
  let buf: string[] = [];
  for (const w of words) {
    buf.push(w);
    const tokens = encode(buf.join(' ')).length;
    if (tokens >= targetTokens) {
      chunks.push(buf.join(' '));
      buf = buf.slice(-overlap);
    }
  }
  if (buf.length) chunks.push(buf.join(' '));
  return chunks;
}

async function parseFile(filePath: string) {
  const buffer = await fs.readFile(filePath);
  if (filePath.endsWith('.pdf')) {
    const res = await pdf(buffer);
    return res.text;
  }
  if (filePath.endsWith('.docx')) {
    const res = await mammoth.extractRawText({ buffer });
    return res.value;
  }
  throw new Error(`Formato não suportado: ${filePath}`);
}

async function ingestFile(fp: string) {
  const text = (await parseFile(fp)).replace(/\s+\n/g, '\n').trim();
  if (!text) return console.warn(`Vazio: ${fp}`);

  const source = {
    title: path.parse(fp).name,
    kind: 'outro',
    disciplina: null as any,
    banca: null as any,
    year: null as any,
    url: null as any,
    language: 'pt-BR'
  };

  const { data: src, error: e1 } = await sb.from('sources').insert(source).select().single();
  if (e1) throw e1;

  const parts = chunkText(text);
  if (parts.length === 0) return console.warn(`Sem chunks: ${fp}`);

  const { embeddings } = await embedMany({
    model: embedModel,
    values: parts,
    providerOptions
  });

  const rows = parts.map((content, i) => ({
    source_id: (src as any).id,
    chunk_index: i,
    content,
    tokens: encode(content).length,
    metadata: {},
    embedding: (embeddings[i] as any).value as unknown as any
  }));

  const { error: e2 } = await sb.from('chunks').insert(rows);
  if (e2) throw e2;

  console.log(`✓ Ingerido: ${path.basename(fp)} → ${rows.length} chunks`);
}

async function main() {
  const dir = process.argv[2] ?? 'data';
  const files = (await fs.readdir(dir))
    .filter(f => f.endsWith('.pdf') || f.endsWith('.docx'))
    .map(f => path.join(dir, f));

  if (files.length === 0) {
    console.warn(`Nenhum PDF/DOCX em ${dir}`);
    return;
  }

  for (const fp of files) {
    await ingestFile(fp);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

