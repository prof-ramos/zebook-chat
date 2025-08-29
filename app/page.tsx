"use client";

import { useState, useRef } from 'react';

type Mode = 'flash' | 'pro';

export default function Home() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('flash');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [fontes, setFontes] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  async function ask() {
    if (!input.trim()) return;
    setLoading(true);
    setAnswer('');
    setFontes('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          messages: [
            { role: 'system', content: 'Você é o ZéBook.' },
            { role: 'user', content: input }
          ]
        })
      });
      if (!res.body) throw new Error('Resposta vazia');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value);
          setAnswer(prev => prev + chunk);
          // tentativa simples de extrair a seção "Fontes"
          const match = (prev: string) => (prev + chunk).match(/(^|\n)\s*Fontes\s*:\s*(.+)$/i);
          const m = match('');
          if (m) setFontes(m[2]);
          // autoscroll
          queueMicrotask(() => {
            containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
          });
        }
      }
    } catch (e) {
      setAnswer(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">ZeBook · Tutor Jurídico</h1>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Modo</label>
            <div className="inline-flex items-center rounded-md border bg-background text-sm">
              <button
                className={`px-3 py-1.5 ${mode === 'flash' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setMode('flash')}
                aria-pressed={mode === 'flash'}
              >
                Flash
              </button>
              <button
                className={`px-3 py-1.5 ${mode === 'pro' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setMode('pro')}
                aria-pressed={mode === 'pro'}
              >
                Pro
              </button>
            </div>
          </div>
        </header>

        <section className="space-y-3">
          <label htmlFor="q" className="text-sm font-medium">Pergunta</label>
          <textarea
            id="q"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ex.: Diferencie ato administrativo vinculado e discricionário."
            className="min-h-[120px] w-full rounded-md border bg-background p-3 outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-end">
            <button
              onClick={ask}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            >
              {loading ? 'Gerando…' : 'Perguntar'}
            </button>
          </div>
        </section>

        <section className="rounded-md border p-4">
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">Resposta</h2>
          <div ref={containerRef} className="max-h-[50vh] overflow-auto whitespace-pre-wrap leading-relaxed">
            {answer || <span className="text-muted-foreground">Aguardando sua pergunta…</span>}
          </div>
        </section>

        <footer className="rounded-md border p-4 text-sm">
          <div className="font-semibold">Fontes</div>
          <div className="text-muted-foreground mt-1">
            {fontes || 'Nenhuma fonte exibida ainda.'}
          </div>
        </footer>
      </div>
    </main>
  );
}
