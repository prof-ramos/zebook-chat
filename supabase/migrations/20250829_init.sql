-- Extensões
create extension if not exists vector;
create extension if not exists pgcrypto;

-- Tabelas
create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text check (kind in ('lei','juris','doutrina','edital','apostila','outro')) default 'outro',
  disciplina text,
  banca text,
  year int,
  url text,
  language text default 'pt-BR',
  checksum text,
  created_at timestamptz default now()
);

create table if not exists chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references sources(id) on delete cascade,
  chunk_index int,
  content text not null,
  tokens int,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- Index de vetor
create index if not exists idx_chunks_embedding
  on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create index if not exists idx_chunks_source on chunks(source_id);

-- Row Level Security
alter table sources enable row level security;
alter table chunks  enable row level security;

-- Políticas: somente service_role insere; sem select direto por ANON
drop policy if exists p_sources_insert on sources;
create policy p_sources_insert on sources
  for insert to authenticated
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists p_chunks_insert on chunks;
create policy p_chunks_insert on chunks
  for insert to authenticated
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- (Opcional) permitir admin ver listas de fontes
-- create policy p_sources_read_admin on sources for select to authenticated using (auth.jwt() ->> 'role' = 'authenticated');

-- Função de busca vetorial (SECURITY DEFINER para ignorar RLS ao buscar)
create or replace function match_chunks(
  query_embedding vector(1536),
  match_count int default 8,
  min_score float default 0.65
) returns table(
  id uuid,
  source_id uuid,
  content text,
  metadata jsonb,
  score float
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return query
  select c.id, c.source_id, c.content, c.metadata,
         1 - (c.embedding <=> query_embedding) as score
  from chunks c
  where 1 - (c.embedding <=> query_embedding) >= min_score
  order by c.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Permissões para a função
revoke all on function match_chunks(vector, int, float) from public;
grant execute on function match_chunks(vector, int, float) to anon, authenticated, service_role;

-- Observação: buscamos via RPC com SECURITY DEFINER para não expor chunks diretamente.

