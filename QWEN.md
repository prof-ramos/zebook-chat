# ZeBook - Chatbot Jurídico para Concursos Públicos

## Visão Geral

ZeBook é um chatbot de código aberto (OpenSource) e desenvolvido de forma pública (build-in-public) que utiliza Inteligência Artificial para auxiliar candidatos em provas de concursos públicos na área jurídica no Brasil. Ele se especializa em responder perguntas e fornecer explicações sobre conteúdo jurídico com base em uma base de conhecimento (RAG - Retrieval-Augmented Generation).

## Tecnologias Principais

O projeto é construído utilizando uma stack moderna e robusta:

*   **Frontend/Backend:** Next.js (React, TypeScript)
*   **Gerenciamento de Pacotes:** pnpm
*   **Banco de Dados & Backend:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
*   **Estilização & UI:** Tailwind CSS, Shadcn/ui, Lucide React
*   **Gerenciamento de Estado & Formulários:** React Hook Form, Zod
*   **IA & LLMs:** AI Vercel SDK (`ai`), LangChain, SDKs para diversos provedores (Google, OpenAI, Anthropic, Azure, Mistral)
*   **Processamento de Documentos:** `pdf-parse`, `mammoth` (para PDF e DOCX)
*   **Internacionalização:** i18next
*   **Markdown:** React Markdown
*   **Utils CSS:** `class-variance-authority`, `clsx`, `tailwind-merge`
*   **DevOps & Qualidade:** ESLint, Prettier, Husky, Jest, React Testing Library

## Arquitetura

O ZeBook segue uma arquitetura de aplicação Next.js, onde o frontend e o backend (APIs) coexistem no mesmo projeto. A interface do usuário é construída com React e componentes Shadcn/ui, estilizados com Tailwind CSS. A lógica de negócios e acesso ao banco de dados é gerenciada pelo Supabase. A funcionalidade central de IA é implementada usando o AI Vercel SDK e LangChain para integrar e orquestrar os modelos de linguagem (LLMs) e o mecanismo de RAG.

## Estrutura de Diretórios (Esperada)

Embora o diretório atual esteja vazio, a estrutura típica de um projeto Next.js com essas tecnologias inclui:

*   `app/`: Contém as rotas da aplicação, layouts e componentes específicos da página (App Router).
*   `components/`: Componentes reutilizáveis da UI.
*   `lib/` ou `utils/`: Funções utilitárias, configurações do cliente Supabase, helpers de IA, etc.
*   `public/`: Arquivos estáticos (imagens, ícones).
*   `styles/`: Arquivos globais de CSS/Tailwind.
*   `supabase/`: Configurações e schemas do Supabase.
*   `tests/`: Arquivos de teste (Jest, React Testing Library).
*   `messages/`: Arquivos de tradução para i18next.
*   `node_modules/`: Dependências instaladas pelo pnpm (não versionado).
*   Arquivos de configuração como `next.config.js`, `tsconfig.json`, `tailwind.config.js`, `pnpm-lock.yaml`, `.eslintrc`, `.prettierrc`, etc.

## Comandos de Desenvolvimento

Os comandos exatos devem ser verificados no `package.json` quando ele for criado ou adicionado. Os comandos padrão para um projeto Next.js com pnpm são:

*   **Instalar Dependências:** `pnpm install`
*   **Desenvolvimento Local:** `pnpm run dev` (Inicia o servidor de desenvolvimento)
*   **Build de Produção:** `pnpm run build` (Cria a build otimizada)
*   **Executar Build Localmente:** `pnpm run start` (Executa a versão buildada)
*   **Linting:** `pnpm run lint` (Executa ESLint)
*   **Testes:** `pnpm run test` ou `pnpm run test:unit` (Executa os testes, se configurados com Jest)

## Convenções de Desenvolvimento

*   **Linguagem:** TypeScript é utilizado para garantir tipagem estática e segurança.
*   **Estilo de Código:** O código será formatado com Prettier e verificado com ESLint para manter a consistência.
*   **Componentização:** A UI será construída com componentes reutilizáveis, preferencialmente usando Shadcn/ui como base.
*   **Estilização:** Tailwind CSS é usado para estilização utilitária.
*   **Commits:** Husky pode ser configurado para executar hooks pré-commit, como linting e formatação.
*   **Testes:** Testes unitários e de componentes devem ser escritos usando Jest e React Testing Library.

## Deploy

O deploy inicial será realizado no FreeTier da Vercel. O domínio `sherlockramos.tech` está disponível para uso com o projeto.

## Objetivo

O objetivo principal é criar uma ferramenta eficaz e acessível para estudantes de Direito se prepararem para concursos públicos, utilizando tecnologia de ponta em IA generativa.