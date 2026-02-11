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
# Instruções para o Claude

Este projeto usa **Empire Vibe Coding** - um sistema para desenvolvimento com IA para iniciantes.

═══════════════════════════════════════════════════════════════════════════════
## ⚠️ REGRA MAIS IMPORTANTE: DOCUMENTE TUDO
═══════════════════════════════════════════════════════════════════════════════

**SEMPRE que fizer qualquer mudança significativa no projeto, VOCÊ DEVE:**

### 1. Atualizar o CHANGELOG
Adicione em `docs/CHANGELOG.md`:

```markdown
## [Unreleased]
### Added
- Nova funcionalidade X
### Fixed
- Bug Y corrigido
```

### 2. Se for decisão técnica, registrar em DECISIONS.md
Adicione em `docs/DECISIONS.md`:

```markdown
## ADR-XXX: Título da Decisão
**Data:** [data]
**Decisão:** [o que foi decidido]
**Contexto:** [por que]
**Motivo:** [razão]
**Consequências:** [impacto]
```

### 3. Se completar tarefa, atualizar ROADMAP.md
Marque como concluído em `docs/ROADMAP.md`

### 4. Se mudar escopo ou arquitetura, atualizar PRD.md ou ARCHITECTURE.md

**NUNCA deixe de documentar mudanças!** A documentação em `docs/` é viva e deve ser mantida atualizada.

═══════════════════════════════════════════════════════════════════════════════
## ESTRUTURA DE PASTAS
═══════════════════════════════════════════════════════════════════════════════

```
projeto/
├── CLAUDE.md              ← VOCUÊ ESTÁ AQUI (instruções para o Claude)
├── docs/                   ← DOCUMENTAÇÃO DO PROJETO (SEMPRE ATUALIZE!)
│   ├── PRD.md             # Requisitos do produto
│   ├── ARCHITECTURE.md    # Arquitetura técnica
│   ├── DECISIONS.md       # Decisões tomadas (ADRs)
│   ├── CHANGELOG.md       # Histórico de mudanças
│   ├── ROADMAP.md         # Próximos passos
│   └── specs/             # Especificações de features
├── vibe-coding/            ← REFERÊNCIA (não editar, baixada do GitHub)
│   ├── README.md
│   ├── GUIA-DO-INICIANTE.md
│   ├── BANDEIRAS-VERMELHAS.md
│   ├── TROUBLESHOOTING.md
│   └── PROTOCOLOS/
└── .claude/skills/         ← Skills do Claude Code
```

**docs/** = Documentação DO PROJETO (crie, edite, mantenha atualizada!)
**vibe-coding/** = Documentação de REFERÊNCIA (consulte, não edite)

═══════════════════════════════════════════════════════════════════════════════
## REGRAS DE COMUNICAÇÃO
═══════════════════════════════════════════════════════════════════════════════

### NUNCA use tecniquês - o usuário NÃO é programador

| ❌ Não diga | ✅ Diga |
|------------|---------|
| "Vou fazer deploy" | "Vou publicar o site na internet" |
| "Execute o comando" | "Digite isso e aperte Enter" |
| "Commit" | "Salvar essa versão" |
| "API" | "Sistema que conversa com outro sistema" |
| "Branch" | "Cópia separada do projeto" |
| "Merge" | "Juntar as mudanças" |

### USE analogias do dia a dia

- **Commit** = Salvar jogo no videogame
- **Bug** = Um buraco na estrada
- **API** = Um garçom que leva pedidos
- **Deploy** = Entregar o trabalho pro cliente
- **Branch** = Cópia do documento pra editar sem estragar o original
- **Banco de dados** = Arquivo de fichas onde guarda informações

### ESTRUTURE suas respostas

1. O QUE vou fazer (uma frase simples)
2. POR QUE (se necessário)
3. O QUE PODE DAR ERRADO (se houver risco)
4. CONFIRMAÇÃO ("Posso continuar?")

═══════════════════════════════════════════════════════════════════════════════
## ARQUIVOS DE REFERÊNCIA (vibe-coding/)
═══════════════════════════════════════════════════════════════════════════════

Consulte os arquivos em `vibe-coding/` conforme a situação:

| Situação | Arquivo |
|----------|---------|
| Começar projeto | `vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md` |
| Desenvolver | `vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md` |
| Bug/erro | `vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md` |
| Melhorar código | `vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md` |
| Manutenção | `vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md` |
| Lançar | `vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md` |
| Termo técnico | `vibe-coding/GUIA-DO-INICIANTE.md` |
| Comando perigoso? | `vibe-coding/BANDEIRAS-VERMELHAS.md` |

═══════════════════════════════════════════════════════════════════════════════
## ANTES DE EXECUTAR COMANDOS
═══════════════════════════════════════════════════════════════════════════════

1. VERIFIQUE se é perigoso em `vibe-coding/BANDEIRAS-VERMELHAS.md`
2. EXPLIQUE o que faz em português simples
3. PERGUNTE se pode continuar

═══════════════════════════════════════════════════════════════════════════════
## PARA COMEÇAR
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário disser "quero começar um projeto" ou similar:
1. Pergunte qual é a ideia
2. Leia `vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md`
3. Siga o protocolo de planejamento
4. Preencha `docs/PRD.md` com as informações coletadas

═══════════════════════════════════════════════════════════════════════════════
## CHECKLIST PÓS-MUDANÇA
═══════════════════════════════════════════════════════════════════════════════

Após implementar qualquer mudança, verificar:

- [ ] Atualizei `docs/CHANGELOG.md`?
- [ ] Se foi decisão técnica, registrei em `docs/DECISIONS.md`?
- [ ] Se completei tarefa, marquei em `docs/ROADMAP.md`?
- [ ] Se mudei arquitetura, atualizei `docs/ARCHITECTURE.md`?

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
