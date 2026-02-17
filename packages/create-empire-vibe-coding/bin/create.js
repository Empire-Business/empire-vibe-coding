#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import prompts from 'prompts'
import ora from 'ora'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cores
const green = chalk.green
const blue = chalk.blue
const yellow = chalk.yellow
const bold = chalk.bold

// ASCII Art
const banner = `
${blue('═══════════════════════════════════════════════════════════')}
${bold('  EMPIRE VIBE CODING - Criador de Projetos')}
${blue('═══════════════════════════════════════════════════════════')}
`

console.log(banner)

// GitHub raw URL
const GITHUB_RAW = process.env.EMPIRE_VIBE_CODING_GITHUB_RAW || 'https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main'
const AGENT_TEAMS_ENV_KEY = 'CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS'
const RUNTIME_DIR = 'empire-dashboard'
const RUNTIME_MANIFEST_PATH = 'installer/runtime-files.manifest.txt'
const RUNTIME_DASHBOARD_SCRIPT = `npm --prefix ${RUNTIME_DIR} run dashboard`

function ensureAgentTeamsEnv(settingsPath) {
  if (!existsSync(settingsPath)) return false

  try {
    const raw = readFileSync(settingsPath, 'utf8')
    const parsed = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return false
    }

    if (!parsed.env || typeof parsed.env !== 'object' || Array.isArray(parsed.env)) {
      parsed.env = {}
    }

    parsed.env[AGENT_TEAMS_ENV_KEY] = '1'
    writeFileSync(settingsPath, `${JSON.stringify(parsed, null, 2)}\n`)
    return true
  } catch {
    return false
  }
}

function ensureLocalSettingsFile(targetDir) {
  const claudeDir = join(targetDir, '.claude')
  const settingsPath = join(claudeDir, 'settings.json')
  const settingsLocalPath = join(claudeDir, 'settings.local.json')

  if (!existsSync(claudeDir)) {
    mkdirSync(claudeDir, { recursive: true })
  }

  if (!existsSync(settingsLocalPath)) {
    if (existsSync(settingsPath)) {
      const content = readFileSync(settingsPath, 'utf8')
      writeFileSync(settingsLocalPath, `${content.replace(/\s*$/, '')}\n`)
    } else {
      writeFileSync(settingsLocalPath, `{\n  "env": {\n    "${AGENT_TEAMS_ENV_KEY}": "1"\n  }\n}\n`)
    }
  }

  ensureAgentTeamsEnv(settingsPath)
  ensureAgentTeamsEnv(settingsLocalPath)
}

function ensureDashboardScriptInPackageJson(targetDir) {
  const packageJsonPath = join(targetDir, 'package.json')

  if (!existsSync(packageJsonPath)) {
    const packageJson = {
      name: 'empire-vibe-project',
      private: true,
      scripts: {
        dashboard: RUNTIME_DASHBOARD_SCRIPT,
      },
    }
    writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
    return 'created'
  }

  try {
    const current = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      return 'invalid'
    }

    if (!current.scripts || typeof current.scripts !== 'object' || Array.isArray(current.scripts)) {
      current.scripts = {}
    }

    if (Object.prototype.hasOwnProperty.call(current.scripts, 'dashboard')) {
      return 'exists'
    }

    current.scripts.dashboard = RUNTIME_DASHBOARD_SCRIPT
    writeFileSync(packageJsonPath, `${JSON.stringify(current, null, 2)}\n`)
    return 'added'
  } catch {
    return 'invalid'
  }
}

async function installRuntimeDashboard(targetDir, options) {
  if (options.docsOnly) {
    return { status: 'skipped', downloaded: 0, failed: 0 }
  }

  const runtimeDir = join(targetDir, RUNTIME_DIR)
  const runtimeExists = existsSync(runtimeDir)

  if (runtimeExists && !options.refreshRuntime) {
    return { status: 'exists', downloaded: 0, failed: 0 }
  }

  if (!runtimeExists) {
    mkdirSync(runtimeDir, { recursive: true })
  }

  const manifestUrl = `${GITHUB_RAW}/${RUNTIME_MANIFEST_PATH}`
  const manifestResponse = await fetch(manifestUrl)
  if (!manifestResponse.ok) {
    throw new Error(`Falha ao baixar manifesto do runtime (${manifestResponse.status})`)
  }

  const manifestContent = await manifestResponse.text()
  const runtimeFiles = manifestContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.startsWith('web/'))

  let downloaded = 0
  let failed = 0

  for (const remote of runtimeFiles) {
    const relative = remote.replace(/^web\//, '')
    const destination = join(runtimeDir, relative)
    const destinationDir = dirname(destination)

    if (!existsSync(destinationDir)) {
      mkdirSync(destinationDir, { recursive: true })
    }

    const ok = await downloadFile(`${GITHUB_RAW}/${remote}`, destination)
    if (ok) {
      downloaded++
    } else {
      failed++
    }
  }

  return {
    status: runtimeExists ? 'refreshed' : 'installed',
    downloaded,
    failed,
  }
}

// Arquivos para baixar
const FILES_TO_DOWNLOAD = {
  // Pasta vibe-coding
  'vibe-coding/COMANDOS.md': 'vibe-coding/COMANDOS.md',
  'vibe-coding/COMUNICACAO.md': 'vibe-coding/COMUNICACAO.md',
  'vibe-coding/GLOSSARIO.md': 'vibe-coding/GLOSSARIO.md',
  'vibe-coding/BANDEIRAS-VERMELHAS.md': 'vibe-coding/BANDEIRAS-VERMELHAS.md',
  'vibe-coding/TROUBLESHOOTING.md': 'vibe-coding/TROUBLESHOOTING.md',
  'vibe-coding/CLAUDE-INSTRUCTIONS.md': 'vibe-coding/CLAUDE-INSTRUCTIONS.md',

  // Protocolos
  'vibe-coding/PROTOCOLOS/00-COMEÇAR.md': 'vibe-coding/PROTOCOLOS/00-COMEÇAR.md',
  'vibe-coding/PROTOCOLOS/01-SETUP-TECNICO.md': 'vibe-coding/PROTOCOLOS/01-SETUP-TECNICO.md',
  'vibe-coding/PROTOCOLOS/01-DESENVOLVER.md': 'vibe-coding/PROTOCOLOS/01-DESENVOLVER.md',
  'vibe-coding/PROTOCOLOS/02-BUGS.md': 'vibe-coding/PROTOCOLOS/02-BUGS.md',
  'vibe-coding/PROTOCOLOS/03-MELHORAR.md': 'vibe-coding/PROTOCOLOS/03-MELHORAR.md',
  'vibe-coding/PROTOCOLOS/04-MANUTENCAO.md': 'vibe-coding/PROTOCOLOS/04-MANUTENCAO.md',
  'vibe-coding/PROTOCOLOS/05-LANCAR.md': 'vibe-coding/PROTOCOLOS/05-LANCAR.md',
  'vibe-coding/PROTOCOLOS/06-SEGURANCA.md': 'vibe-coding/PROTOCOLOS/06-SEGURANCA.md',
  'vibe-coding/PROTOCOLOS/07-QUALIDADE.md': 'vibe-coding/PROTOCOLOS/07-QUALIDADE.md',
  'vibe-coding/PROTOCOLOS/08-GARANTIDOR.md': 'vibe-coding/PROTOCOLOS/08-GARANTIDOR.md',
  'vibe-coding/PROTOCOLOS/09-DESIGN.md': 'vibe-coding/PROTOCOLOS/09-DESIGN.md',
  'vibe-coding/PROTOCOLOS/10-UX.md': 'vibe-coding/PROTOCOLOS/10-UX.md',
  'vibe-coding/PROTOCOLOS/11-BANCO.md': 'vibe-coding/PROTOCOLOS/11-BANCO.md',
  'vibe-coding/PROTOCOLOS/12-SUPABASE.md': 'vibe-coding/PROTOCOLOS/12-SUPABASE.md',
  'vibe-coding/PROTOCOLOS/13-WORKFLOW.md': 'vibe-coding/PROTOCOLOS/13-WORKFLOW.md',
  'vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md': 'vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md',
  'vibe-coding/PROTOCOLOS/15-TAREFAS.md': 'vibe-coding/PROTOCOLOS/15-TAREFAS.md',
  'vibe-coding/PROTOCOLOS/16-PLANEJAR.md': 'vibe-coding/PROTOCOLOS/16-PLANEJAR.md',
  'vibe-coding/PROTOCOLOS/17-NERD.md': 'vibe-coding/PROTOCOLOS/17-NERD.md',
  'vibe-coding/PROTOCOLOS/18-PRD.md': 'vibe-coding/PROTOCOLOS/18-PRD.md',
  'vibe-coding/PROTOCOLOS/19-API.md': 'vibe-coding/PROTOCOLOS/19-API.md',
  'vibe-coding/PROTOCOLOS/20-AGENTES.md': 'vibe-coding/PROTOCOLOS/20-AGENTES.md',
  'vibe-coding/PROTOCOLOS/21-ROADMAP.md': 'vibe-coding/PROTOCOLOS/21-ROADMAP.md',
  'vibe-coding/PROTOCOLOS/22-ARQUITETURA.md': 'vibe-coding/PROTOCOLOS/22-ARQUITETURA.md',

  // Claude configuration
  '.claude/settings.json': '.claude/settings.json',
  '.claude/custom_instructions.md': '.claude/custom_instructions.md',

  // Squads
  'squads/README.md': 'squads/README.md',
  'squads/ARCHITECT.md': 'squads/ARCHITECT.md',
  'squads/DEVELOPER.md': 'squads/DEVELOPER.md',
  'squads/REVIEWER.md': 'squads/REVIEWER.md',
  'squads/QA.md': 'squads/QA.md',
  'squads/SECURITY.md': 'squads/SECURITY.md',
  'squads/DESIGNER.md': 'squads/DESIGNER.md',
  'squads/DATA.md': 'squads/DATA.md',

  // Template de ambiente
  '.env.template': '.env.template',
}

// Templates de documentação do projeto
const TEMPLATES = {
  'docs/PRD.md': `# PRD: [Nome do Projeto]

| Campo | Valor |
|-------|-------|
| **One-liner** | [Uma frase descrevendo o projeto] |
| **Owner** | [Quem é responsável] |
| **Status** | Draft |
| **Data** | ${new Date().toISOString().split('T')[0]} |

---

## 1. Resumo para Leigos

### O que é
[Explicar em 2-3 frases simples]

### Para quem é
[Descrever o tipo de pessoa que vai usar]

### Qual problema resolve
[Usar exemplo do dia a dia]

### Como funciona (passo a passo simples)
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

### O que o usuário consegue fazer
- [ ] [Ação 1]
- [ ] [Ação 2]
- [ ] [Ação 3]

### O que NÃO faz
- [ ] [Limitação 1]
- [ ] [Limitação 2]

---

## 2. Objetivos e Sucesso

### Objetivos
1. [Objetivo 1]
2. [Objetivo 2]

### Definição de Sucesso
| Métrica | Baseline | Meta |
|---------|----------|------|
| [Métrica 1] | [Atual] | [Desejado] |

---

## 3. Escopo

### MUST (obrigatório para MVP)
- [ ] [Feature 1]
- [ ] [Feature 2]

### SHOULD (importante)
- [ ] [Feature 3]

### WON'T (fora de escopo)
- [ ] [Feature 4]

---

## 4. Próximos Passos

1. [ ] [Ação 1]
2. [ ] [Ação 2]
`,

  'docs/ROADMAP.md': `# Roadmap do Projeto

## Status Atual
 ideia / planejamento / desenvolvimento / lançado

## Próximos Passos (ordem de prioridade)
1. [ ] [Tarefa 1]
2. [ ] [Tarefa 2]
3. [ ] [Tarefa 3]

## Backlog (sem data definida)
- [ ] [Tarefa futura 1]
- [ ] [Tarefa futura 2]

## Concluído
- [x] [Tarefa concluída 1] - ${new Date().toISOString().split('T')[0]}
`,

  'docs/MUDANCAS.md': `# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/)

## [Unreleased]
### Added
- [nova funcionalidade]

### Changed
- [mudança em funcionalidade existente]

### Fixed
- [bug corrigido]

---

## [0.1.0] - ${new Date().toISOString().split('T')[0]}
### Added
- Versão inicial do projeto
`,

  'docs/DECISOES.md': `# Architecture Decision Records (ADRs)

Formato de cada decisão:
- **Data:** [data]
- **Decisão:** [o que foi decidido]
- **Contexto:** [por que precisava decidir]
- **Opções consideradas:** [quais alternativas]
- **Motivo da escolha:** [por que essa opção]
- **Consequências:** [o que muda com essa decisão]

---

## ADR-001: [Título da primeira decisão]

**Data:** [data]
**Decisão:** [o que foi decidido]
**Contexto:** [por que]
**Opções:** [alternativas]
**Motivo:** [razão]
**Consequências:** [impacto]
`,

  'docs/ARQUITETURA.md': `# Arquitetura do Sistema

## Stack Tecnológica
- Frontend: [tecnologia]
- Backend: [tecnologia]
- Banco de dados: [tecnologia]
- Deploy: [plataforma]

## Estrutura de Pastas
\`\`\`
[descrever estrutura]
\`\`\`

## Decisões Arquiteturais
Ver arquivo DECISOES.md

## Diagrama
[Inserir diagrama ou link se necessário]

## Integrações Externas
- [API/serviço 1]
- [API/serviço 2]

## Data de criação
${new Date().toISOString().split('T')[0]}
`,

  'docs/APIS-DOCS/README.md': `# APIs-DOCS

Esta pasta contém documentações de APIs externas usadas no projeto.

## Como documentar uma API

Execute o comando no Claude Code:

\`\`\`
*api nome-da-api
\`\`\`

Exemplos:
- \`*api openai\` - Documenta a API da OpenAI
- \`*api stripe\` - Documenta a API do Stripe
- \`*api --listar\` - Lista todas as APIs documentadas

## APIs Documentadas

| API | Categoria | Arquivo |
|-----|-----------|---------|
| (nenhuma ainda) | - | - |

---

**IMPORTANTE:** Sempre documente a API ANTES de começar a integração.
`,

  'CLAUDE.md': `# CLAUDE.md - Orquestrador do Projeto

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.

═══════════════════════════════════════════════════════════════════════════════
## COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com \`*\`, execute a função correspondente:

### COMANDOS PRINCIPAIS (7)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*começar\` | Iniciar projeto | Leia \`vibe-coding/PROTOCOLOS/00-COMEÇAR.md\` e \`vibe-coding/PROTOCOLOS/18-PRD.md\`, guie o planejamento, preencha \`docs/PRD.md\` |
| \`*desenvolver\` | Modo dev | Leia \`vibe-coding/PROTOCOLOS/01-DESENVOLVER.md\`, ative protocolo de desenvolvimento |
| \`*bug\` | Resolver bug | Leia \`vibe-coding/PROTOCOLOS/02-BUGS.md\`, investigue e corrija |
| \`*erro\` | Resolver erro | Leia \`vibe-coding/TROUBLESHOOTING.md\`, ajude passo a passo |
| \`*termo\` | Explicar termo | Leia \`vibe-coding/GLOSSARIO.md\`, explique com analogias |
| \`*comando\` | Verificar comando | Leia \`vibe-coding/BANDEIRAS-VERMELHAS.md\`, diga se é perigoso |
| \`*lançar\` | Preparar lançamento | Leia \`vibe-coding/PROTOCOLOS/05-LANCAR.md\`, execute checklist |

### COMANDOS DE DOCUMENTAÇÃO (5)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*roadmap\` | Ver/atualizar roadmap | Mostre \`docs/ROADMAP.md\`, pergunte o que atualizar |
| \`*decisão\` | Registrar decisão | Adicione ADR em \`docs/DECISOES.md\` |
| \`*mudança\` | Registrar mudança | Adicione entrada em \`docs/MUDANCAS.md\` |
| \`*arquitetura\` | Atualizar arquitetura | Edite \`docs/ARQUITETURA.md\` |
| \`*status\` | Ver status do projeto | Resuma: onde está, o que falta, próximos passos |

### COMANDOS DE DESIGN & UX (2)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*design\` | Design System | Leia \`vibe-coding/PROTOCOLOS/09-DESIGN.md\`, configure tokens, cores, tipografia |
| \`*ux\` | UX Design | Leia \`vibe-coding/PROTOCOLOS/10-UX.md\`, aplique heurísticas de Nielsen |

### COMANDOS DE QUALIDADE (4)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*seguranca\` | Auditoria de segurança | Leia \`vibe-coding/PROTOCOLOS/06-SEGURANCA.md\`, execute checklist OWASP |
| \`*qualidade\` | Checar qualidade | Leia \`vibe-coding/PROTOCOLOS/07-QUALIDADE.md\`, analise code smells, SOLID |
| \`*garantir\` | Garantidor de qualidade | Leia \`vibe-coding/PROTOCOLOS/08-GARANTIDOR.md\`, **ÚNICO que pode marcar [x] em MUDANCAS.md** |
| \`*revisar\` | Code review | Faça revisão completa do código |

### COMANDOS DE INFRA & BANCO (2)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*banco\` | Saúde do banco | Leia \`vibe-coding/PROTOCOLOS/11-BANCO.md\`, execute queries de diagnóstico |
| \`*supabase\` | Configurar Supabase | Leia \`vibe-coding/PROTOCOLOS/12-SUPABASE.md\`, configure CLI/MCP/RLS |

### COMANDOS DE AUTOMAÇÃO (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*workflow\` | Criar workflows | Leia \`vibe-coding/PROTOCOLOS/13-WORKFLOW.md\`, configure CI/CD, automações |
| \`*orquestrar\` | Orquestrar comandos | Leia \`vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md\`, combine múltiplos comandos |
| \`*tarefas\` | Gerenciar tarefas | Leia \`vibe-coding/PROTOCOLOS/15-TAREFAS.md\`, use TaskCreate/Update/Get/List |

### COMANDOS DE PLANEJAMENTO (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*planejar\` | Planejamento detalhado | Leia \`vibe-coding/PROTOCOLOS/16-PLANEJAR.md\`, crie WBS, estimativas, riscos |
| \`*especificar\` | Criar spec | Crie \`docs/specs/nome-da-feature.md\` |
| \`*prd\` | Gerar PRD completo | Leia \`vibe-coding/PROTOCOLOS/18-PRD.md\`, gere PRD com seção leiga e técnica |

### COMANDOS DE INTEGRAÇÃO (1)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*api\` | Documentar API externa | Leia \`vibe-coding/PROTOCOLOS/19-API.md\`, pesquise e documente API em \`docs/APIS-DOCS/\`, **SEMPRE antes de integrar** |

### COMANDOS DE ESPECIALISTAS (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*nerd\` | Problemas complexos | Leia \`vibe-coding/PROTOCOLOS/17-NERD.md\`, debug profundo, profiling, otimização |
| \`*agentes\` | Usar Agent Teams | Crie equipe de agentes para tarefa complexa |
| \`*melhorar\` | Refatorar | Leia \`vibe-coding/PROTOCOLOS/03-MELHORAR.md\` |

### COMANDO DE AJUDA

| Comando | Ação |
|---------|------|
| \`*ajuda\` | Liste todos os comandos disponíveis |

═══════════════════════════════════════════════════════════════════════════════
## REGRA #1: DOCUMENTE TUDO
═══════════════════════════════════════════════════════════════════════════════

**SEMPRE que fizer qualquer mudança significativa, VOCÊ DEVE atualizar a documentação:**

1. **Mudança implementada** → \`docs/MUDANCAS.md\`
2. **Decisão técnica tomada** → \`docs/DECISOES.md\`
3. **Tarefa concluída** → \`docs/ROADMAP.md\`
4. **Arquitetura mudou** → \`docs/ARQUITETURA.md\`

**NUNCA deixe de documentar!**

═══════════════════════════════════════════════════════════════════════════════
## REGRA #2: O COMANDO *garantir É ESPECIAL
═══════════════════════════════════════════════════════════════════════════════

O comando \`*garantir\` é o **ÚNICO** que pode:
- Marcar checkboxes \`[x]\` em \`docs/MUDANCAS.md\`
- Aprovar mudanças para produção
- Gerar assinatura de aprovação

**Nenhum outro comando pode aprovar mudanças diretamente.**

═══════════════════════════════════════════════════════════════════════════════
## ESTRUTURA DE PASTAS
═══════════════════════════════════════════════════════════════════════════════

\`\`\`
projeto/
├── CLAUDE.md              ← VOCÊ ESTÁ AQUI (orquestrador)
├── docs/                   ← DO PROJETO (sempre atualize!)
│   ├── PRD.md
│   ├── ARQUITETURA.md
│   ├── DECISOES.md
│   ├── MUDANCAS.md
│   ├── ROADMAP.md
│   └── specs/
├── vibe-coding/            ← REFERÊNCIA (consulte, não edite)
│   ├── COMANDOS.md
│   ├── COMUNICACAO.md
│   ├── GLOSSARIO.md
│   ├── BANDEIRAS-VERMELHAS.md
│   ├── TROUBLESHOOTING.md
│   └── PROTOCOLOS/
│       ├── 00-COMEÇAR.md
│       ├── 01-DESENVOLVER.md
│       ├── 02-BUGS.md
│       ├── 03-MELHORAR.md
│       ├── 04-MANUTENCAO.md
│       ├── 05-LANCAR.md
│       ├── 06-SEGURANCA.md
│       ├── 07-QUALIDADE.md
│       ├── 08-GARANTIDOR.md
│       ├── 09-DESIGN.md
│       ├── 10-UX.md
│       ├── 11-BANCO.md
│       ├── 12-SUPABASE.md
│       ├── 13-WORKFLOW.md
│       ├── 14-ORQUESTRAR.md
│       ├── 15-TAREFAS.md
│       ├── 16-PLANEJAR.md
│       ├── 17-NERD.md
│       └── 18-PRD.md
└── .env.local              ← CREDENCIAIS (nunca commitar!)
\`\`\`

**docs/** = Documentação DO PROJETO (crie, edite, mantenha atualizada!)
**vibe-coding/** = Documentação de REFERÊNCIA (consulte quando precisar)

═══════════════════════════════════════════════════════════════════════════════
## REGRAS DE COMUNICAÇÃO
═══════════════════════════════════════════════════════════════════════════════

Consulte \`vibe-coding/COMUNICACAO.md\` para regras completas.

### NUNCA use tecniquês

| Não diga | Diga |
|----------|------|
| "deploy" | "publicar na internet" |
| "commit" | "salvar essa versão" |
| "branch" | "cópia separada do projeto" |
| "API" | "sistema que conversa com outro sistema" |
| "banco de dados" | "arquivo de fichas" |

### USE analogias

- **Commit** = Salvar jogo no videogame
- **Bug** = Buraco na estrada
- **API** = Garçom que leva pedidos
- **Deploy** = Entregar trabalho pro cliente

### ESTRUTURE respostas

1. O QUE vou fazer
2. POR QUE (se necessário)
3. O QUE PODE DAR ERRADO
4. CONFIRMAÇÃO ("Posso continuar?")

═══════════════════════════════════════════════════════════════════════════════
## ANTES DE EXECUTAR COMANDOS
═══════════════════════════════════════════════════════════════════════════════

1. VERIFIQUE em \`vibe-coding/BANDEIRAS-VERMELHAS.md\`
2. EXPLIQUE em português simples
3. PERGUNTE se pode continuar

═══════════════════════════════════════════════════════════════════════════════
## CHECKLIST PÓS-MUDANÇA
═══════════════════════════════════════════════════════════════════════════════

Após implementar, verificar:

- [ ] Atualizei \`docs/MUDANCAS.md\`?
- [ ] Se foi decisão → \`docs/DECISOES.md\`?
- [ ] Se completei tarefa → \`docs/ROADMAP.md\`?
- [ ] Se mudei arquitetura → \`docs/ARQUITETURA.md\`?
- [ ] Passei por \`*garantir\` (se necessário)?

═══════════════════════════════════════════════════════════════════════════════
## RESUMO DOS 30 COMANDOS
═══════════════════════════════════════════════════════════════════════════════

| Categoria | Comandos |
|-----------|----------|
| Principais (7) | começar, desenvolver, bug, erro, termo, comando, lançar |
| Documentação (5) | roadmap, decisão, mudança, arquitetura, status |
| Design & UX (2) | design, ux |
| Qualidade (4) | seguranca, qualidade, garantir, revisar |
| Infra & Banco (2) | banco, supabase |
| Automação (3) | workflow, orquestrar, tarefas |
| Planejamento (3) | planejar, especificar, prd |
| Integração (1) | api |
| Especialistas (3) | nerd, agentes, melhorar |

═══════════════════════════════════════════════════════════════════════════════
## INÍCIO RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Para começar um projeto do zero, o usuário deve digitar:

\`\`\`
*começar
\`\`\`

Você deve:
1. Perguntar qual é a ideia do projeto
2. Ler \`vibe-coding/PROTOCOLOS/00-COMEÇAR.md\`
3. Seguir o protocolo de planejamento
4. Preencher \`docs/PRD.md\` com as informações
5. Criar \`docs/ROADMAP.md\` com os próximos passos

Para problemas complexos:

\`\`\`
*orquestrar [descrição do problema]
\`\`\`

O orquestrador vai sugerir a sequência de comandos adequada.
`
}

// Função para baixar arquivo do GitHub
async function downloadFile(url, dest) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const content = await response.text()
    writeFileSync(dest, content)
    return true
  } catch (error) {
    return false
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2)
  const docsOnly = args.includes('--docs-only')
  const refreshRuntime = args.includes('--refresh-runtime')

  if (args.includes('--help') || args.includes('-h')) {
    console.log('Uso: create-empire-vibe-coding [caminho] [--docs-only] [--refresh-runtime]')
    console.log('  --docs-only        Instala apenas docs/instruções (sem runtime local)')
    console.log('  --refresh-runtime  Atualiza arquivos de runtime em empire-dashboard/')
    process.exit(0)
  }

  const pathArg = args.find((arg) => !arg.startsWith('-')) || '.'

  // Perguntar onde instalar
  const response = await prompts({
    type: 'text',
    name: 'path',
    message: 'Onde você quer instalar o Empire Vibe Coding?',
    initial: pathArg,
    validate: (value) => {
      if (!value) return 'Digite um caminho'
      return true
    }
  })

  if (!response.path) {
    console.log(yellow('\nOperação cancelada.'))
    process.exit(0)
  }

  const targetDir = join(process.cwd(), response.path)

  // Criar diretório se não existir
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }

  console.log('')
  const spinner = ora('Criando estrutura de pastas...').start()

  try {
    // Criar pastas
    const folders = [
      'vibe-coding/PROTOCOLOS',
      'docs/specs',
      'docs/APIS-DOCS',
      '.claude',
      'squads/custom'
    ]

    for (const folder of folders) {
      const fullPath = join(targetDir, folder)
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true })
      }
    }

    spinner.text = 'Baixando arquivos de referência...'

    // Baixar arquivos do GitHub
    let downloaded = 0
    let failed = 0

    for (const [remote, local] of Object.entries(FILES_TO_DOWNLOAD)) {
      const url = `${GITHUB_RAW}/${remote}`
      const dest = join(targetDir, local)

      // Criar pasta pai se necessário
      const parentDir = dirname(dest)
      if (!existsSync(parentDir)) {
        mkdirSync(parentDir, { recursive: true })
      }

      const success = await downloadFile(url, dest)
      if (success) {
        downloaded++
      } else {
        failed++
      }
    }

    spinner.text = 'Criando documentação do projeto...'

    // Criar templates de documentação
    for (const [file, content] of Object.entries(TEMPLATES)) {
      const dest = join(targetDir, file)

      // Criar pasta pai se necessário
      const parentDir = dirname(dest)
      if (!existsSync(parentDir)) {
        mkdirSync(parentDir, { recursive: true })
      }

      // CLAUDE.md é sincronizado a partir do arquivo oficial baixado
      if (file === 'CLAUDE.md') {
        continue
      }

      // Só criar se não existir
      if (!existsSync(dest)) {
        writeFileSync(dest, content)
      }
    }

    const officialClaudeInstructions = join(targetDir, 'vibe-coding', 'CLAUDE-INSTRUCTIONS.md')
    const rootClaudePath = join(targetDir, 'CLAUDE.md')
    if (!existsSync(rootClaudePath) && existsSync(officialClaudeInstructions)) {
      writeFileSync(rootClaudePath, readFileSync(officialClaudeInstructions, 'utf8'))
    }

    spinner.text = 'Configurando Agent Teams...'
    ensureLocalSettingsFile(targetDir)

    spinner.text = `Configurando runtime local (${RUNTIME_DIR})...`
    const runtimeResult = await installRuntimeDashboard(targetDir, { docsOnly, refreshRuntime })
    const packageScriptStatus =
      runtimeResult.status === 'skipped'
        ? 'skipped'
        : ensureDashboardScriptInPackageJson(targetDir)

    spinner.succeed('Instalação concluída!')

    console.log('')
    console.log(blue('═══════════════════════════════════════════════════════════'))
    console.log(bold('  INSTALAÇÃO CONCLUÍDA!'))
    console.log(blue('═══════════════════════════════════════════════════════════'))
    console.log('')
    console.log(`${green('✓')} ${downloaded} arquivos baixados`)
    console.log(`${green('✓')} .claude/settings.local.json com Agent Teams habilitado`)
    if (runtimeResult.status === 'installed' || runtimeResult.status === 'refreshed') {
      console.log(`${green('✓')} Runtime task-oriented em ${RUNTIME_DIR}/ (${runtimeResult.downloaded} arquivos)`)
      if (runtimeResult.failed > 0) {
        console.log(`${yellow('⚠')} ${runtimeResult.failed} arquivos de runtime falharam (tente --refresh-runtime)`)
      }
    } else if (runtimeResult.status === 'exists') {
      console.log(`${yellow('⚠')} Runtime já existia em ${RUNTIME_DIR}/ (mantido)`)
    } else if (runtimeResult.status === 'skipped') {
      console.log(`${yellow('⚠')} Runtime pulado (--docs-only)`)
    }

    if (packageScriptStatus === 'created') {
      console.log(`${green('✓')} package.json criado com script dashboard`)
    } else if (packageScriptStatus === 'added') {
      console.log(`${green('✓')} Script dashboard adicionado ao package.json`)
    } else if (packageScriptStatus === 'exists') {
      console.log(`${yellow('⚠')} package.json já possui script dashboard (mantido)`)
    } else if (packageScriptStatus === 'skipped') {
      console.log(`${yellow('⚠')} Script dashboard pulado (--docs-only)`)
    } else {
      console.log(`${yellow('⚠')} Não foi possível garantir script dashboard no package.json`)
    }
    if (failed > 0) {
      console.log(`${yellow('⚠')} ${failed} arquivos falharam (verifique sua conexão)`)
    }
    console.log('')
    console.log(blue('Estrutura criada em:'), targetDir)
    console.log('')
    console.log(blue('Próximos passos:'))
    console.log('  1. Abra o terminal na pasta do projeto')
    console.log('  2. Digite: claude')
    console.log('  3. Digite: *começar')
    if (!docsOnly) {
      console.log(`  4. Para dashboard local: npm run dashboard`)
      console.log(`     (fallback: ${RUNTIME_DASHBOARD_SCRIPT})`)
      console.log('  5. Descreva sua ideia!')
    } else {
      console.log('  4. Descreva sua ideia!')
    }
    console.log('')
    console.log(yellow('⚠ IMPORTANTE: Toda mudança deve ser documentada em docs/'))
    console.log('')

  } catch (error) {
    spinner.fail('Erro durante a instalação')
    console.error(error.message)
    process.exit(1)
  }
}

main()
