#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, copyFileSync, readdirSync, statSync } from 'fs'
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
const GITHUB_RAW = 'https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main'

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
  'vibe-coding/PROTOCOLOS/00-INICIAR.md': 'vibe-coding/PROTOCOLOS/00-INICIAR.md',
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

  'CLAUDE.md': `# CLAUDE.md - Orquestrador do Projeto

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.

═══════════════════════════════════════════════════════════════════════════════
## COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com \`*\`, execute a função correspondente:

### COMANDOS PRINCIPAIS

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*começar\` | Iniciar projeto | Leia \`vibe-coding/PROTOCOLOS/00-INICIAR.md\` e \`vibe-coding/PROTOCOLOS/18-PRD.md\`, guie o planejamento |
| \`*desenvolver\` | Modo dev | Leia \`vibe-coding/PROTOCOLOS/01-DESENVOLVER.md\` |
| \`*bug\` | Resolver bug | Leia \`vibe-coding/PROTOCOLOS/02-BUGS.md\` |
| \`*erro\` | Resolver erro | Leia \`vibe-coding/TROUBLESHOOTING.md\` |
| \`*termo\` | Explicar termo | Leia \`vibe-coding/GLOSSARIO.md\` |
| \`*comando\` | Verificar comando | Leia \`vibe-coding/BANDEIRAS-VERMELHAS.md\` |
| \`*lançar\` | Preparar lançamento | Leia \`vibe-coding/PROTOCOLOS/05-LANCAR.md\` |

### COMANDOS DE DOCUMENTAÇÃO

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*roadmap\` | Ver/atualizar roadmap | Mostre \`docs/ROADMAP.md\` |
| \`*decisão\` | Registrar decisão | Adicione ADR em \`docs/DECISOES.md\` |
| \`*mudança\` | Registrar mudança | Adicione entrada em \`docs/MUDANCAS.md\` |
| \`*arquitetura\` | Atualizar arquitetura | Edite \`docs/ARQUITETURA.md\` |
| \`*status\` | Ver status | Resuma onde o projeto está |

### COMANDOS DE QUALIDADE

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*seguranca\` | Auditoria segurança | Leia \`vibe-coding/PROTOCOLOS/06-SEGURANCA.md\` |
| \`*garantir\` | Garantidor qualidade | **ÚNICO que pode marcar [x] em MUDANCAS.md** |
| \`*revisar\` | Code review | Faça revisão completa |

### COMANDOS DE PLANEJAMENTO

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*planejar\` | Planejamento detalhado | Leia \`vibe-coding/PROTOCOLOS/16-PLANEJAR.md\` |
| \`*prd\` | Gerar PRD completo | Leia \`vibe-coding/PROTOCOLOS/18-PRD.md\` |
| \`*especificar\` | Criar spec | Crie \`docs/specs/nome-da-feature.md\` |

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
└── vibe-coding/            ← REFERÊNCIA (consulte, não edite)
    ├── COMANDOS.md
    ├── COMUNICACAO.md
    ├── GLOSSARIO.md
    ├── BANDEIRAS-VERMELHAS.md
    ├── TROUBLESHOOTING.md
    └── PROTOCOLOS/
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

### ESTRUTURE respostas

1. O QUE vou fazer
2. POR QUE (se necessário)
3. O QUE PODE DAR ERRADO
4. CONFIRMAÇÃO ("Posso continuar?")

═══════════════════════════════════════════════════════════════════════════════
## INÍCIO RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Para começar um projeto do zero, o usuário deve digitar:

\`\`\`
*começar
\`\`\`

Você deve:
1. Perguntar qual é a ideia do projeto
2. Ler os protocolos de planejamento
3. Preencher \`docs/PRD.md\` com as informações
4. Criar o roadmap em \`docs/ROADMAP.md\`
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
  // Perguntar onde instalar
  const response = await prompts({
    type: 'text',
    name: 'path',
    message: 'Onde você quer instalar o Empire Vibe Coding?',
    initial: '.',
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
      'docs/specs'
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

      // Só criar se não existir
      if (!existsSync(dest)) {
        writeFileSync(dest, content)
      }
    }

    spinner.succeed('Instalação concluída!')

    console.log('')
    console.log(blue('═══════════════════════════════════════════════════════════'))
    console.log(bold('  INSTALAÇÃO CONCLUÍDA!'))
    console.log(blue('═══════════════════════════════════════════════════════════'))
    console.log('')
    console.log(`${green('✓')} ${downloaded} arquivos baixados`)
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
    console.log('  4. Descreva sua ideia!')
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
