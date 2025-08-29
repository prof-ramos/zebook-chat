# README.md
# ZeBook - Chatbot Jurídico para Concursos Públicos

Este é um projeto OpenSource e build-in-public de um chatbot especializado em conteúdo jurídico para auxiliar candidatos em provas de concursos públicos no Brasil.

## Tecnologias

- Next.js
- React
- TypeScript
- pnpm
- Supabase
- Tailwind CSS
- Shadcn/ui
- Lucide React
- React Hook Form
- Zod
- AI Vercel SDK
- LangChain
- Google Gemini API
- i18next
- react-markdown
- pdf-parse
- mammoth

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Configure as variáveis de ambiente no arquivo `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_da_api_do_gemini
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

- `app/`: Rotas e layouts da aplicação (App Router do Next.js)
- `components/`: Componentes reutilizáveis da UI
- `lib/`: Funções utilitárias e lógica de negócios
- `public/`: Arquivos estáticos
- `messages/`: Arquivos de tradução para i18next
- `tailwind.config.js`: Configuração do Tailwind CSS
- `tsconfig.json`: Configuração do TypeScript
- `next.config.ts`: Configuração do Next.js

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

MIT