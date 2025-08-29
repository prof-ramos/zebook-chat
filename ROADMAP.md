# Roadmap do Projeto ZeBook

## Visão Geral
ZeBook é um chatbot de código aberto especializado em conteúdo jurídico para concursos públicos no Brasil. Este roadmap define as etapas para o desenvolvimento completo da aplicação, desde a configuração inicial até o deployment em produção.

## Fase 1: Preparação do Ambiente

- [ ] **Configurar ambiente de desenvolvimento**
  - [ ] Instalar Node.js LTS (versão 18 ou superior) para garantir compatibilidade com as dependências modernas
  - [ ] Escolher entre npm (padrão) ou yarn como gerenciador de pacotes
  - [ ] Instalar editor de código (VS Code recomendado) com extensões essenciais: ESLint, Prettier, Tailwind CSS IntelliSense
  - [ ] Configurar terminal com suporte a comandos Unix (Git Bash no Windows, Terminal no macOS/Linux)

- [ ] **Inicializar projeto React**
  - [ ] Criar projeto com Next.js: `npx create-next-app@latest zebook --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - [ ] Configurar estrutura de pastas recomendada:
    ```
    src/
      app/
      components/
      lib/
      hooks/
      utils/
      styles/
      assets/
      App.tsx
      main.tsx
    ```
  - [ ] Configurar TypeScript com strict mode ativado para melhor type safety

## Fase 2: Instalação e Configuração de Dependências

- [ ] **Instalar Tailwind CSS**
  - [ ] Seguir guia oficial para integração com Next.js
  - [ ] Configurar `tailwind.config.js` com presets personalizados se necessário
  - [ ] Adicionar plugins oficiais como `@tailwindcss/forms` e `@tailwindcss/typography`
  - [ ] Configurar PostCSS com `autoprefixer` para compatibilidade cross-browser

- [ ] **Instalar Shadcn/UI**
  - [ ] Executar comando de instalação: `npx shadcn-ui@latest init`
  - [ ] Configurar `components.json` com paths corretos para componentes
  - [ ] Instalar dependências adicionais: `lucide-react` para ícones, `class-variance-authority` para variantes de estilo
  - [ ] Configurar aliases de importação (`@/components`, `@/lib`) no `tsconfig.json`

- [ ] **Configurar linters e formatadores**
  - [ ] Instalar ESLint com preset recomendado para React/TypeScript
  - [ ] Configurar Prettier com integração ao ESLint
  - [ ] Adicionar regras específicas para acessibilidade (jsx-a11y)
  - [ ] Configurar husky e lint-staged para validação pré-commit

## Fase 3: Design e Planejamento de UX/UI

- [ ] **Definir design system**
  - [ ] Estabelecer paleta de cores primária, secundária e de feedback (sucesso, erro, aviso)
  - [ ] Definir tipografia com fontes e hierarquia de títulos
  - [ ] Criar escala de espaçamento e bordas consistentes
  - [ ] Documentar estados de interação (hover, focus, active, disabled)

- [ ] **Planejar arquitetura de componentes**
  - [ ] Criar inventário de componentes baseado nas necessidades do projeto
  - [ ] Definir hierarquia e composição de componentes
  - [ ] Estabelecer padrões de nomenclatura e estrutura de props
  - [ ] Planejar variantes de estilo com class-variance-authority

- [ ] **Aplicar princípios de acessibilidade**
  - [ ] Garantir contraste mínimo de 4.5:1 para texto
  - [ ] Implementar navegação por teclado completa
  - [ ] Adicionar labels e ARIA attributes apropriados
  - [ ] Testar com leitores de tela (NVDA, VoiceOver)

## Fase 4: Implementação de Componentes

- [ ] **Criar componentes base**
  - [ ] Implementar botões com variantes (primary, secondary, ghost, link) usando cva
  - [ ] Criar inputs e formulários com validação integrada
  - [ ] Desenvolver componentes de layout (cards, grids, containers)
  - [ ] Implementar componentes de feedback (toasts, alerts, modals)

- [ ] **Integrar componentes Shadcn**
  - [ ] Adicionar componentes necessários via CLI: `npx shadcn-ui@latest add [component]`
  - [ ] Customizar estilos dos componentes para atender ao design system
  - [ ] Garantir consistência de variantes e tamanhos
  - [ ] Implementar dark mode se aplicável

- [ ] **Desenvolver componentes customizados**
  - [ ] Criar componentes reutilizáveis seguindo padrões da comunidade
  - [ ] Utilizar React Hooks para lógica compartilhada
  - [ ] Implementar forwardRef para componentes controlados
  - [ ] Documentar props com TypeScript interfaces

## Fase 5: Testes e Otimização

- [ ] **Testar componentes**
  - [ ] Configurar Jest e React Testing Library
  - [ ] Escrever testes unitários para componentes críticos
  - [ ] Implementar testes de acessibilidade com axe-core
  - [ ] Realizar testes de snapshot para regressão visual

- [ ] **Otimizar performance**
  - [ ] Analisar bundle size com webpack-bundle-analyzer
  - [ ] Implementar code splitting para rotas e componentes pesados
  - [ ] Otimizar imagens e assets com formatos modernos (webp, avif)
  - [ ] Utilizar React.memo e useMemo para evitar renders desnecessários

- [ ] **Validar responsividade**
  - [ ] Testar em múltiplos dispositivos e tamanhos de tela
  - [ ] Implementar breakpoints do Tailwind de forma consistente
  - [ ] Verificar touch targets para dispositivos móveis
  - [ ] Otimizar para diferentes densidades de pixel

## Fase 6: Manutenção e Escalabilidade

- [ ] **Documentar componentes**
  - [ ] Criar storybook ou documentação interna dos componentes
  - [ ] Documentar props, variantes e casos de uso
  - [ ] Manter changelog de alterações e breaking changes
  - [ ] Criar guia de estilo para novos desenvolvedores

- [ ] **Estabelecer processos de atualização**
  - [ ] Configurar dependabot para atualizações automáticas
  - [ ] Estabelecer plano de migração para breaking changes
  - [ ] Monitorar deprecations nas dependências
  - [ ] Realizar code reviews com foco em padrões de UI/UX

- [ ] **Implementar monitoramento**
  - [ ] Adicionar analytics para tracking de interações do usuário
  - [ ] Configurar relatórios de erro em produção
  - [ ] Monitorar métricas de performance (Core Web Vitals)
  - [ ] Coletar feedback de usuários para melhorias contínuas

## Fase 7: Integração com Supabase

- [ ] **Configurar projeto no Supabase**
  - [ ] Criar conta e projeto no Supabase
  - [ ] Configurar banco de dados com tabelas necessárias para o chatbot
  - [ ] Definir políticas de segurança e autenticação
  - [ ] Configurar storage para arquivos (se necessário)

- [ ] **Implementar autenticação**
  - [ ] Criar componentes de login/registro
  - [ ] Integrar com Supabase Auth
  - [ ] Implementar proteção de rotas
  - [ ] Adicionar recuperação de senha

- [ ] **Desenvolver API com Supabase**
  - [ ] Criar funções para interação com o banco de dados
  - [ ] Implementar queries otimizadas
  - [ ] Adicionar tratamento de erros
  - [ ] Criar testes para as funções do Supabase

## Fase 8: Integração com Google Gemini

- [ ] **Configurar acesso à API do Google AI**
  - [ ] Criar projeto no Google Cloud Console
  - [ ] Habilitar a API do Google AI
  - [ ] Gerar chave de API
  - [ ] Configurar variáveis de ambiente

- [ ] **Implementar cliente do Google Gemini**
  - [ ] Criar serviço para comunicação com a API
  - [ ] Implementar tratamento de respostas e erros
  - [ ] Adicionar rate limiting se necessário
  - [ ] Criar testes para o cliente do Gemini

- [ ] **Desenvolver funcionalidade de chat**
  - [ ] Criar interface de chat com histórico
  - [ ] Implementar streaming de respostas
  - [ ] Adicionar contexto às perguntas
  - [ ] Implementar diferentes modos (Flash, Pro)

## Fase 9: Processamento de Documentos

- [ ] **Integrar pdf-parse**
  - [ ] Implementar parser de PDFs
  - [ ] Extrair texto e metadados
  - [ ] Adicionar tratamento de erros
  - [ ] Criar testes para processamento de PDF

- [ ] **Integrar mammoth**
  - [ ] Implementar parser de DOCX
  - [ ] Extrair texto e formatação
  - [ ] Adicionar tratamento de erros
  - [ ] Criar testes para processamento de DOCX

- [ ] **Desenvolver sistema de upload**
  - [ ] Criar componente de upload de arquivos
  - [ ] Implementar validação de tipos de arquivo
  - [ ] Adicionar feedback visual durante o upload
  - [ ] Integrar com Supabase Storage (se necessário)

## Fase 10: Internacionalização

- [ ] **Configurar i18next**
  - [ ] Instalar e configurar i18next e react-i18next
  - [ ] Criar estrutura de arquivos de tradução
  - [ ] Implementar detecção de idioma
  - [ ] Adicionar fallback de idioma

- [ ] **Implementar traduções**
  - [ ] Traduzir interface para português e inglês
  - [ ] Criar componente de seleção de idioma
  - [ ] Adicionar suporte a RTL (se necessário)
  - [ ] Testar consistência das traduções

## Fase 11: Deployment e Monitoramento

- [ ] **Configurar CI/CD**
  - [ ] Criar workflows no GitHub Actions
  - [ ] Adicionar testes automatizados
  - [ ] Implementar deployment automático
  - [ ] Configurar ambientes de staging e produção

- [ ] **Deploy em produção**
  - [ ] Configurar domínio personalizado (sherlockramos.tech)
  - [ ] Configurar SSL/TLS
  - [ ] Otimizar para performance
  - [ ] Configurar monitoramento de erros

- [ ] **Monitoramento e analytics**
  - [ ] Implementar Google Analytics ou alternativa
  - [ ] Configurar monitoramento de performance
  - [ ] Adicionar logging de erros
  - [ ] Criar dashboard de métricas