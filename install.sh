#!/bin/bash

# EMPIRE VIBE CODING - Instalador
# Execute: curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash

GITHUB_RAW="https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main"

# Cores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'
BOLD='\033[1m'

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo -e "${BOLD}  EMPIRE VIBE CODING - Instalador${RESET}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo ""

# Criar estrutura de pastas
echo -e "${BLUE}📁 Criando estrutura de pastas...${RESET}"

# Criar pasta da skill
mkdir -p .claude/skills/empire-vibe-coding

# Criar pasta de documentação de referência (vibe-coding)
mkdir -p vibe-coding/PROTOCOLOS

# Criar pasta de documentação do PROJETO (docs)
mkdir -p docs/specs

# Instalar Skill
echo ""
echo -e "${YELLOW}🔧 Instalando Claude Skill...${RESET}"
curl -fsSL "$GITHUB_RAW/claude-skill/SKILL.md" -o .claude/skills/empire-vibe-coding/SKILL.md
echo -e "${GREEN}   ✓ Skill instalada em: .claude/skills/empire-vibe-coding/${RESET}"

# Baixar documentação de referência
echo ""
echo -e "${YELLOW}📚 Baixando documentação de referência...${RESET}"

curl -fsSL "$GITHUB_RAW/docs/README.md" -o vibe-coding/README.md && echo -e "${GREEN}   ✓ vibe-coding/README.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/GUIA-DO-INICIANTE.md" -o vibe-coding/GUIA-DO-INICIANTE.md && echo -e "${GREEN}   ✓ vibe-coding/GUIA-DO-INICIANTE.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/BANDEIRAS-VERMELHAS.md" -o vibe-coding/BANDEIRAS-VERMELHAS.md && echo -e "${GREEN}   ✓ vibe-coding/BANDEIRAS-VERMELHAS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/TROUBLESHOOTING.md" -o vibe-coding/TROUBLESHOOTING.md && echo -e "${GREEN}   ✓ vibe-coding/TROUBLESHOOTING.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md" -o vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/01-DESENVOLVIMENTO.md" -o vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/02-CORRECAO-BUGS.md" -o vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/03-APRIMORAMENTO.md" -o vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md" -o vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md" -o vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md${RESET}"

# Criar templates de documentação do projeto
echo ""
echo -e "${YELLOW}📄 Criando templates de documentação do projeto (docs/)...${RESET}"

# PRD.md
if [ ! -f "docs/PRD.md" ]; then
cat > docs/PRD.md << 'EOF'
# Product Requirements Document (PRD)

## Nome do Projeto
[Definir nome]

## Visão em 1 frase
[O que o projeto faz em uma frase]

## Problema que resolve
[Qual problema o usuário tem que este projeto resolve]

## Público-alvo
[Quem vai usar]

## Funcionalidades Principais (MVP)
1. [Funcionalidade 1]
2. [Funcionalidade 2]
3. [Funcionalidade 3]

## Funcionalidades Futuras
- [Funcionalidade futura 1]
- [Funcionalidade futura 2]

## Sucesso = ?
[Como saber se o projeto é um sucesso?]

## Restrições
- [Restrição orçamentária, tempo, etc]

## Data de criação
[Data]
EOF
echo -e "${GREEN}   ✓ docs/PRD.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/PRD.md já existe${RESET}"
fi

# ARCHITECTURE.md
if [ ! -f "docs/ARCHITECTURE.md" ]; then
cat > docs/ARCHITECTURE.md << 'EOF'
# Arquitetura do Sistema

## Stack Tecnológica
- Frontend: [tecnologia]
- Backend: [tecnologia]
- Banco de dados: [tecnologia]
- Deploy: [plataforma]

## Estrutura de Pastas
```
[descrever estrutura]
```

## Decisões Arquiteturais
Ver arquivo DECISIONS.md

## Diagrama
[Inserir diagrama ou link se necessário]

## Integrações Externas
- [API/serviço 1]
- [API/serviço 2]

## Data de criação
[Data]
EOF
echo -e "${GREEN}   ✓ docs/ARCHITECTURE.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/ARCHITECTURE.md já existe${RESET}"
fi

# DECISIONS.md
if [ ! -f "docs/DECISIONS.md" ]; then
cat > docs/DECISIONS.md << 'EOF'
# Architecture Decision Records (ADRs)

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

EOF
echo -e "${GREEN}   ✓ docs/DECISIONS.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/DECISIONS.md já existe${RESET}"
fi

# CHANGELOG.md
if [ ! -f "docs/CHANGELOG.md" ]; then
cat > docs/CHANGELOG.md << 'EOF'
# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/)

## [Unreleased]
### Added
- [nova funcionalidade]

### Changed
- [mudança em funcionalidade existente]

### Fixed
- [bug corrigido]

### Removed
- [funcionalidade removida]

---

## [0.1.0] - [Data]
### Added
- Versão inicial do projeto

EOF
echo -e "${GREEN}   ✓ docs/CHANGELOG.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/CHANGELOG.md já existe${RESET}"
fi

# ROADMAP.md
if [ ! -f "docs/ROADMAP.md" ]; then
cat > docs/ROADMAP.md << 'EOF'
# Roadmap do Projeto

## Status Atual
[Em que fase o projeto está: ideia / planejamento / desenvolvimento / lançado]

## Próximos Passos (ordem de prioridade)
1. [ ] [Tarefa 1]
2. [ ] [Tarefa 2]
3. [ ] [Tarefa 3]

## Backlog (sem data definida)
- [ ] [Tarefa futura 1]
- [ ] [Tarefa futura 2]

## Concluído
- [x] [Tarefa concluída 1] - [data]

EOF
echo -e "${GREEN}   ✓ docs/ROADMAP.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/ROADMAP.md já existe${RESET}"
fi

# Criar CLAUDE.md na raiz do projeto
echo ""
echo -e "${YELLOW}📝 Criando CLAUDE.md...${RESET}"

# Só cria se não existir
if [ ! -f "CLAUDE.md" ]; then
cat > CLAUDE.md << 'CLAUDEMD'
# CLAUDE.md - Orquestrador do Projeto

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.

═══════════════════════════════════════════════════════════════════════════════
## ⚡ COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com `*`, execute a função correspondente:

### COMANDOS PRINCIPAIS

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*começar` | Iniciar projeto | Leia `vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md`, guie o planejamento, preencha `docs/PRD.md` |
| `*desenvolver` | Modo dev | Leia `vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md`, ative protocolo de desenvolvimento |
| `*bug` | Resolver bug | Leia `vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md`, investigue e corrija |
| `*erro` | Resolver erro | Leia `vibe-coding/TROUBLESHOOTING.md`, ajude passo a passo |
| `*termo` | Explicar termo | Leia `vibe-coding/GUIA-DO-INICIANTE.md`, explique com analogias |
| `*comando` | Verificar comando | Leia `vibe-coding/BANDEIRAS-VERMELHAS.md`, diga se é perigoso |
| `*lançar` | Preparar lançamento | Leia `vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md`, execute checklist |

### COMANDOS DE DOCUMENTAÇÃO

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*roadmap` | Ver/atualizar roadmap | Mostre `docs/ROADMAP.md`, pergunte o que atualizar |
| `*decisão` | Registrar decisão | Adicione ADR em `docs/DECISIONS.md` |
| `*mudança` | Registrar mudança | Adicione entrada em `docs/CHANGELOG.md` |
| `*arquitetura` | Atualizar arquitetura | Edite `docs/ARCHITECTURE.md` |
| `*status` | Ver status do projeto | Resuma: onde está, o que falta, próximos passos |

### COMANDOS AVANÇADOS

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*agentes` | Usar Agent Teams | Crie equipe de agentes para tarefa complexa |
| `*revisar` | Code review | Faça revisão completa do código |
| `*melhorar` | Refatorar | Leia `vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md` |
| `*especificar` | Criar spec | Crie `docs/specs/nome-da-feature.md` |

### COMANDO DE AJUDA

| Comando | Ação |
|---------|------|
| `*ajuda` | Liste todos os comandos disponíveis |

═══════════════════════════════════════════════════════════════════════════════
## ⚠️ REGRA #1: DOCUMENTE TUDO
═══════════════════════════════════════════════════════════════════════════════

**SEMPRE que fizer qualquer mudança significativa, VOCÊ DEVE atualizar a documentação:**

1. **Mudança implementada** → `docs/CHANGELOG.md`
2. **Decisão técnica tomada** → `docs/DECISIONS.md`
3. **Tarefa concluída** → `docs/ROADMAP.md`
4. **Arquitetura mudou** → `docs/ARCHITECTURE.md`

**NUNCA deixe de documentar!**

═══════════════════════════════════════════════════════════════════════════════
## 📁 ESTRUTURA DE PASTAS
═══════════════════════════════════════════════════════════════════════════════

```
projeto/
├── CLAUDE.md              ← VOCÊ ESTÁ AQUI (orquestrador)
├── docs/                   ← DO PROJETO (sempre atualize!)
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DECISIONS.md
│   ├── CHANGELOG.md
│   ├── ROADMAP.md
│   └── specs/
├── vibe-coding/            ← REFERÊNCIA (consulte, não edite)
│   ├── README.md
│   ├── GUIA-DO-INICIANTE.md
│   ├── BANDEIRAS-VERMELHAS.md
│   ├── TROUBLESHOOTING.md
│   └── PROTOCOLOS/
└── .claude/skills/
```

**docs/** = Documentação DO PROJETO (crie, edite, mantenha atualizada!)
**vibe-coding/** = Documentação de REFERÊNCIA (consulte quando precisar)

═══════════════════════════════════════════════════════════════════════════════
## 💬 REGRAS DE COMUNICAÇÃO
═══════════════════════════════════════════════════════════════════════════════

### NUNCA use tecniquês

| ❌ Não diga | ✅ Diga |
|------------|---------|
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
## 🛡️ ANTES DE EXECUTAR COMANDOS
═══════════════════════════════════════════════════════════════════════════════

1. VERIFIQUE em `vibe-coding/BANDEIRAS-VERMELHAS.md`
2. EXPLIQUE em português simples
3. PERGUNTE se pode continuar

═══════════════════════════════════════════════════════════════════════════════
## ✅ CHECKLIST PÓS-MUDANÇA
═══════════════════════════════════════════════════════════════════════════════

Após implementar, verificar:

- [ ] Atualizei `docs/CHANGELOG.md`?
- [ ] Se foi decisão → `docs/DECISIONS.md`?
- [ ] Se completei tarefa → `docs/ROADMAP.md`?
- [ ] Se mudei arquitetura → `docs/ARCHITECTURE.md`?

═══════════════════════════════════════════════════════════════════════════════
## 🚀 INÍCIO RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Para começar um projeto do zero, o usuário deve digitar:

```
*começar
```

Você deve:
1. Perguntar qual é a ideia do projeto
2. Ler `vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md`
3. Seguir o protocolo de planejamento
4. Preencher `docs/PRD.md` com as informações
5. Criar `docs/ROADMAP.md` com os próximos passos

CLAUDEMD
echo -e "${GREEN}   ✓ CLAUDE.md criado na raiz do projeto${RESET}"
else
echo -e "${YELLOW}   ⚠ CLAUDE.md já existe, mantendo arquivo atual${RESET}"
fi

# Resumo
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo -e "${BOLD}  INSTALAÇÃO CONCLUÍDA!${RESET}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo ""
echo -e "${BLUE}📋 Estrutura criada:${RESET}"
echo "   ├── docs/                 ← Documentação do PROJETO (mantenha atualizada!)"
echo "   │   ├── PRD.md"
echo "   │   ├── ARCHITECTURE.md"
echo "   │   ├── DECISIONS.md"
echo "   │   ├── CHANGELOG.md"
echo "   │   ├── ROADMAP.md"
echo "   │   └── specs/"
echo "   ├── vibe-coding/          ← Referência (consulte quando precisar)"
echo "   ├── .claude/skills/       ← Skill do Claude"
echo "   └── CLAUDE.md             ← Instruções para o Claude"
echo ""
echo -e "${BLUE}🚀 Próximos passos:${RESET}"
echo "   1. Reinicie o Claude Code se estiver aberto"
echo "   2. Digite: \"quero começar um projeto\""
echo "   3. O Claude vai te guiar e documentar tudo em docs/"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE: Toda mudança deve ser documentada em docs/${RESET}"
echo ""
