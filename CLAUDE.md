# CLAUDE.md

> **ORQUESTRADOR DO PROJETO**
>
> Este arquivo coordena todo o comportamento do Claude neste projeto.
>
> **PRIORIDADE DE LEITURA:**
> 1. `.claude/custom_instructions.md` (LEIS FUNDAMENTAIS)
> 2. Este arquivo (CLAUDE.md)
> 3. `vibe-coding/PROTOCOLOS/*.md` (protocolos específicos)

---

## LEIS FUNDAMENTAIS (RESUMO)

> Consulte `.claude/custom_instructions.md` para detalhes completos.

### LEI #1: NUNCA PULE ETAPAS
Antes de implementar código: documente, pergunte, confirme.

### LEI #2: DOCUMENTAÇÃO PRIMEIRO
PRIMEIRO criar documentação, DEPOIS implementar código.

### LEI #3: CHECKPOINT OBRIGATÓRIO
Antes de cada ação: explique O QUE vai fazer, O QUE NÃO vai fazer, peça confirmação.

### LEI #4: COMANDOS NÃO SÃO AUTOMÁTICOS
Comandos são GUIAS, não autorizações para fazer tudo automaticamente.

### LEI #5: DESENVOLVIMENTO BLOQUEADO SEM PRÉ-REQUISITOS
Antes de `*desenvolver`, verificar: PRD, ARQUITETURA, ROADMAP, Design System.
Se faltar qualquer um → BLOQUEAR e direcionar para comando correto.

---

## CICLO DE TRABALHO OBRIGATÓRIO

```
1. ENTENDIMENTO → O que o usuário quer?
2. LEITURA      → Ler o protocolo correspondente
3. CHECKPOINT   → Explicar + Pedir confirmação
4. EXECUÇÃO     → Seguir protocolo EXATAMENTE + PARAR em Stop Points
5. VERIFICAÇÃO  → Documentação atualizada? Checklist completo?
```

---

## CHECKLIST PÓS-AÇÃO (OBRIGATÓRIO)

Após CADA implementação:

- [ ] Atualizei `docs/MUDANCAS.md`?
- [ ] Se foi decisão → `docs/DECISOES.md`?
- [ ] Se completei tarefa → `docs/ROADMAP.md`?
- [ ] Se mudei arquitetura → `docs/ARQUITETURA.md`?
- [ ] Pedi confirmação antes de implementar?
- [ ] Parei em todos os STOP POINTS?

---

## Project Overview

Empire Vibe Coding is a beginner-friendly framework for AI-assisted software development ("vibe coding"). It provides:
- A structured command system (`*command`) for Claude Code to guide non-technical users
- Reference documentation in `vibe-coding/` (glossary, protocols, troubleshooting)
- Templates for project documentation in `docs/`
- A Next.js web app at `web/` for the interactive documentation site
- An npm package `create-empire-vibe-coding` for project scaffolding
- A squad system (`squads/`) for multi-agent workflows

---

## Development Commands

```bash
# Run web app locally (port 3000)
npm run web:dev

# Build web app for production
npm run web:build

# Start web app in production mode
npm run web:start

# Run from web directory directly
cd web && npm run dev
cd web && npm run build
cd web && npm run lint
```

---

## Repository Structure

```
empire-vibe-coding/
├── .claude/                    ← CONFIGURAÇÃO DO CLAUDE (alta prioridade)
│   ├── custom_instructions.md  ← LEIS FUNDAMENTAIS (ler primeiro!)
│   └── settings.json           ← Permissões
│
├── vibe-coding/                ← Reference documentation (read-only for users)
│   ├── COMANDOS.md             ← List of * commands
│   ├── COMUNICACAO.md          ← Communication rules (no techniquês)
│   ├── GLOSSARIO.md            ← Technical terms with analogies
│   ├── BANDEIRAS-VERMELHAS.md  ← Dangerous command warnings
│   ├── TROUBLESHOOTING.md      ← Error resolution guides
│   └── PROTOCOLOS/             ← Protocol files
│       ├── 00-COMEÇAR.md       ← Tutorial interativo (novo projeto)
│       ├── 01-SETUP-TECNICO.md ← Setup técnico
│       ├── ... (outros protocolos)
│       └── 20-AGENTES.md       ← Protocolo de agentes/squads
│
├── squads/                     ← Sistema de agentes especializados
│   ├── README.md               ← Como usar o sistema
│   ├── ARCHITECT.md            ← Agente arquiteto
│   ├── DEVELOPER.md            ← Agente desenvolvedor
│   ├── REVIEWER.md             ← Agente revisor
│   ├── QA.md                   ← Agente de qualidade
│   ├── SECURITY.md             ← Agente de segurança
│   ├── DESIGNER.md             ← Agente de design
│   ├── DATA.md                 ← Agente de dados
│   └── custom/                 ← Agentes customizados pelo usuário
│
├── docs/                       ← Advanced architecture/design templates
│   ├── ARQUITETURA/            ← Project structure, DB schema, RLS, state management
│   ├── DESIGN/                 ← Design tokens, components, accessibility
│   ├── SEGURANCA/              ← Security guidelines (frontend/backend/dependencies)
│   └── QUALIDADE/              ← TypeScript strict mode, testing, CI/CD
│
├── web/                        ← Next.js 14 web application
│   ├── app/                    ← App Router pages (page.tsx files)
│   ├── components/             ← React components (Header, Footer, Card, etc.)
│   └── lib/                    ← Utility functions (docs.ts for parsing markdown)
│
├── packages/
│   └── create-empire-vibe-coding/  ← npm package for scaffolding
│       └── bin/create.js           ← CLI entry point
│
└── install.sh                  ← Bash installer script (curl | bash)
```

---

## The `*command` System

When users type commands starting with `*` (e.g., `*começar`, `*bug`), Claude should:

1. **LER** o protocolo correspondente em `vibe-coding/PROTOCOLOS/`
2. **MOSTRAR** checkpoint (O QUE vai fazer, O QUE NÃO vai fazer)
3. **PEDIR** confirmação
4. **SEGUIR** o protocolo EXATAMENTE como escrito
5. **PARAR** em cada STOP POINT
6. **ATUALIZAR** documentação em `docs/` após execução

### TABELA DE COMANDOS

| Comando | Protocolo | O que faz |
|---------|-----------|-----------|
| `*começar` | 00-COMEÇAR.md | Tutorial interativo para novos projetos |
| `*prd` | 18-PRD.md | Gera PRD com checkpoints |
| `*desenvolver` | 01-DESENVOLVER.md | Modo desenvolvimento |
| `*bug` | 02-BUGS.md | Correção de bugs |
| `*agentes` | 20-AGENTES.md | Sistema de squads |
| `*api` | 19-API.md | Documenta API externa |
| `*ajuda` | - | Lista todos os comandos |

> Para lista completa, consulte `vibe-coding/COMANDOS.md`

---

## COMPORTAMENTO ESPERADO POR COMANDO

### `*começar` - Tutorial Interativo

```
COMPORTAMENTO OBRIGATÓRIO:

1. MOSTRAR menu de opções
2. ESPERAR resposta do usuário
3. DIRECIONAR para comando adequado

PROIBIDO: Criar arquivos automaticamente
```

### `*prd` - Gerador de PRD

```
COMPORTAMENTO OBRIGATÓRIO:

1. CHECKPOINT: Explicar que VAI criar documento, NÃO VAI implementar código
2. FAZER perguntas (máx. 5)
3. CRIAR docs/PRD.md
4. PARAR e mostrar resultado
5. NÃO implementar código

PROIBIDO: Implementar código durante *prd
```

### `*agentes` - Sistema de Squads

```
COMPORTAMENTO OBRIGATÓRIO:

1. IDENTIFICAR necessidade
2. MOSTRAR agentes disponíveis em squads/
3. CRIAR tarefas com TaskCreate
4. EXECUTAR sequencialmente
5. REPORTAR progresso
```

---

## Documentation Rules

- `docs/` = Project-specific docs (users edit these)
- `vibe-coding/` = Reference docs (read-only, consult when needed)
- `squads/` = Agent definitions (can be extended with `squads/custom/`)
- All changes must be documented via `*mudança`, `*decisão`, or `*roadmap` commands

---

## Communication Style

When working with this codebase, avoid techniquês:

| Não diga | Diga |
|----------|------|
| "deploy" | "publicar na internet" |
| "commit" | "salvar essa versão" |
| "branch" | "cópia separada do projeto" |
| "API" | "sistema que conversa com outro sistema" |

Use analogies:
- **Commit** = Save game checkpoint
- **Bug** = Pothole in the road
- **API** = Waiter taking orders
- **Deploy** = Delivering work to client

---

## Installer Options

The `install.sh` script supports flags:
- `--merge` - Append vibe-coding instructions to existing CLAUDE.md
- `--separate` - Create CLAUDE.vibe-coding.md instead of modifying CLAUDE.md
- `--no-claude` - Only download documentation, don't create CLAUDE.md

---

## Quick Start

Para começar um projeto, o usuário digita:

```
*começar
```

Você deve:
1. MOSTRAR menu interativo
2. ESPERAR resposta
3. DIRECIONAR para o comando adequado

**NÃO criar arquivos automaticamente!**
