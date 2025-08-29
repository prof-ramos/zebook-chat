# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router (layouts, pages like `page.tsx`).
- `components/`: Reusable UI components.
- `lib/`: Clients and helpers (`lib/supabaseClient.ts`, `lib/geminiClient.ts`).
- `messages/`: i18n resources (`en.json`, `pt-BR.json`).
- `public/`: Static assets.
- Config: `next.config.ts`, `tailwind.config.js`, `tsconfig.json`.

## Build, Test, and Development Commands
- Install: `pnpm install`.
- Dev server: `pnpm dev` (http://localhost:3000).
- Production build: `pnpm build`.
- Start production: `pnpm start`.
- Lint: `pnpm lint` (auto-fix: `pnpm lint -- --fix`).

## Coding Style & Naming Conventions
- TypeScript strict is enabled; prefer explicit types for exported APIs.
- React components: PascalCase filenames and exports (e.g., `ChatPanel.tsx`).
- Variables/functions: camelCase; constants UPPER_SNAKE_CASE when global.
- Routes: App Router folders in kebab-case; entry files `page.tsx`, `layout.tsx`.
- Styling: Tailwind CSS utilities; avoid ad‑hoc inline styles.
- i18n: Add keys under `messages/` and reference via your i18n hooks.

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Jest or Vitest + React Testing Library.
- Name tests `*.test.ts(x)` colocated with the unit under test or in `__tests__/`.
- Mock Supabase and external APIs; avoid network calls in unit tests.
- Target meaningful coverage for `lib/` and critical UI flows.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject; recommended types: `feat`, `fix`, `chore`, `docs`, `refactor`.
- PRs: include summary, linked issues, test steps, and screenshots for UI.
- CI: PRs trigger CodeRabbit review (`.github/workflows/coderabbit.yml`). Address comments, keep PRs small and focused.
- Pre‑merge: ensure `pnpm lint` passes and the app builds locally (`pnpm build`).

## Security & Configuration Tips
- Create `.env.local` with: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`. Never commit secrets.
- Do not log sensitive values; rotate keys if exposed.
- Use server components or API routes for secret-bound logic.
