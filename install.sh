#!/bin/bash

# EMPIRE VIBE CODING - Instalador
# Execute: curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
#
# Flags disponíveis:
#   --merge      Adiciona instruções ao final do CLAUDE.md existente
#   --separate   Cria CLAUDE.vibe-coding.md separado
#   --no-claude  Não cria/modifica CLAUDE.md (só baixa documentação)

GITHUB_RAW="https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main"

# Cores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'
BOLD='\033[1m'

# Parse flags
MERGE_MODE=false
SEPARATE_MODE=false
NO_CLAUDE=false

for arg in "$@"; do
  case $arg in
    --merge)
      MERGE_MODE=true
      shift
      ;;
    --separate)
      SEPARATE_MODE=true
      shift
      ;;
    --no-claude)
      NO_CLAUDE=true
      shift
      ;;
    --help|-h)
      echo ""
      echo -e "${BOLD}Uso:${RESET}"
      echo "  curl -fsSL https://raw.githubusercontent.com/.../install.sh | bash"
      echo "  curl -fsSL https://raw.githubusercontent.com/.../install.sh | bash -s -- --flag"
      echo ""
      echo -e "${BOLD}Flags disponíveis:${RESET}"
      echo "  --merge      Adiciona instruções ao final do CLAUDE.md existente"
      echo "  --separate   Cria CLAUDE.vibe-coding.md separado"
      echo "  --no-claude  Não cria/modifica CLAUDE.md (só baixa documentação)"
      echo ""
      echo -e "${BOLD}Comportamento padrão:${RESET}"
      echo "  Se CLAUDE.md NÃO existe → Cria CLAUDE.md completo"
      echo "  Se CLAUDE.md JÁ existe → Cria CLAUDE.vibe-coding.md separado (seguro)"
      exit 0
      ;;
  esac
done

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo -e "${BOLD}  EMPIRE VIBE CODING - Instalador${RESET}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo ""

# Criar estrutura de pastas
echo -e "${BLUE}📁 Criando estrutura de pastas...${RESET}"

# Criar pasta de documentação de referência (vibe-coding)
mkdir -p vibe-coding/PROTOCOLOS

# Criar pasta de documentação do PROJETO (docs)
mkdir -p docs/specs
mkdir -p docs/APIS-DOCS

# Criar README da pasta de APIs
cat > docs/APIS-DOCS/README.md << 'APISREADME'
# APIs-DOCS

Esta pasta contém documentações de APIs externas usadas no projeto.

## Como documentar uma API

Execute o comando no Claude Code:

```
*api nome-da-api
```

Exemplos:
- `*api openai` - Documenta a API da OpenAI
- `*api stripe` - Documenta a API do Stripe
- `*api --listar` - Lista todas as APIs documentadas

## APIs Documentadas

| API | Categoria | Arquivo |
|-----|-----------|---------|
| (nenhuma ainda) | - | - |

---

**IMPORTANTE:** Sempre documente a API ANTES de começar a integração.
APISREADME

# Baixar documentação de referência
echo ""
echo -e "${YELLOW}📚 Baixando documentação de referência...${RESET}"

curl -fsSL "$GITHUB_RAW/vibe-coding/COMANDOS.md" -o vibe-coding/COMANDOS.md && echo -e "${GREEN}   ✓ vibe-coding/COMANDOS.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/COMUNICACAO.md" -o vibe-coding/COMUNICACAO.md && echo -e "${GREEN}   ✓ vibe-coding/COMUNICACAO.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/GLOSSARIO.md" -o vibe-coding/GLOSSARIO.md && echo -e "${GREEN}   ✓ vibe-coding/GLOSSARIO.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/BANDEIRAS-VERMELHAS.md" -o vibe-coding/BANDEIRAS-VERMELHAS.md && echo -e "${GREEN}   ✓ vibe-coding/BANDEIRAS-VERMELHAS.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/TROUBLESHOOTING.md" -o vibe-coding/TROUBLESHOOTING.md && echo -e "${GREEN}   ✓ vibe-coding/TROUBLESHOOTING.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/CLAUDE-INSTRUCTIONS.md" -o vibe-coding/CLAUDE-INSTRUCTIONS.md && echo -e "${GREEN}   ✓ vibe-coding/CLAUDE-INSTRUCTIONS.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/00-COMEÇAR.md" -o vibe-coding/PROTOCOLOS/00-COMEÇAR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/00-COMEÇAR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/01-SETUP-TECNICO.md" -o vibe-coding/PROTOCOLOS/01-SETUP-TECNICO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/01-SETUP-TECNICO.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/01-DESENVOLVER.md" -o vibe-coding/PROTOCOLOS/01-DESENVOLVER.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/01-DESENVOLVER.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/02-BUGS.md" -o vibe-coding/PROTOCOLOS/02-BUGS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/02-BUGS.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/03-MELHORAR.md" -o vibe-coding/PROTOCOLOS/03-MELHORAR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/03-MELHORAR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/04-MANUTENCAO.md" -o vibe-coding/PROTOCOLOS/04-MANUTENCAO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/04-MANUTENCAO.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/05-LANCAR.md" -o vibe-coding/PROTOCOLOS/05-LANCAR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/05-LANCAR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/06-SEGURANCA.md" -o vibe-coding/PROTOCOLOS/06-SEGURANCA.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/06-SEGURANCA.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/07-QUALIDADE.md" -o vibe-coding/PROTOCOLOS/07-QUALIDADE.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/07-QUALIDADE.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/08-GARANTIDOR.md" -o vibe-coding/PROTOCOLOS/08-GARANTIDOR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/08-GARANTIDOR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/09-DESIGN.md" -o vibe-coding/PROTOCOLOS/09-DESIGN.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/09-DESIGN.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/10-UX.md" -o vibe-coding/PROTOCOLOS/10-UX.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/10-UX.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/11-BANCO.md" -o vibe-coding/PROTOCOLOS/11-BANCO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/11-BANCO.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/12-SUPABASE.md" -o vibe-coding/PROTOCOLOS/12-SUPABASE.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/12-SUPABASE.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/13-WORKFLOW.md" -o vibe-coding/PROTOCOLOS/13-WORKFLOW.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/13-WORKFLOW.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md" -o vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/15-TAREFAS.md" -o vibe-coding/PROTOCOLOS/15-TAREFAS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/15-TAREFAS.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/16-PLANEJAR.md" -o vibe-coding/PROTOCOLOS/16-PLANEJAR.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/16-PLANEJAR.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/17-NERD.md" -o vibe-coding/PROTOCOLOS/17-NERD.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/17-NERD.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/18-PRD.md" -o vibe-coding/PROTOCOLOS/18-PRD.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/18-PRD.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/19-API.md" -o vibe-coding/PROTOCOLOS/19-API.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/19-API.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/20-AGENTES.md" -o vibe-coding/PROTOCOLOS/20-AGENTES.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/20-AGENTES.md${RESET}"

# Baixar template de ambiente
echo ""
echo -e "${YELLOW}⚙️  Baixando template de ambiente...${RESET}"
if [ ! -f ".env.template" ]; then
curl -fsSL "$GITHUB_RAW/.env.template" -o .env.template && echo -e "${GREEN}   ✓ .env.template${RESET}"
else
echo -e "${YELLOW}   ⚠ .env.template já existe${RESET}"
fi

# Baixar configuração de permissões do Claude Code
echo ""
echo -e "${YELLOW}🔐 Configurando permissões do Claude Code...${RESET}"
mkdir -p .claude
if [ ! -f ".claude/settings.json" ]; then
curl -fsSL "$GITHUB_RAW/.claude/settings.json" -o .claude/settings.json && echo -e "${GREEN}   ✓ .claude/settings.json${RESET}"
else
curl -fsSL "$GITHUB_RAW/.claude/settings.json" -o .claude/settings.local.json
echo -e "${YELLOW}   ⚠ settings.json já existe${RESET}"
echo -e "${GREEN}   ✓ .claude/settings.local.json criado como alternativa${RESET}"
fi

# Baixar instruções customizadas de compliance
if [ ! -f ".claude/custom_instructions.md" ]; then
curl -fsSL "$GITHUB_RAW/.claude/custom_instructions.md" -o .claude/custom_instructions.md && echo -e "${GREEN}   ✓ .claude/custom_instructions.md${RESET}"
else
echo -e "${YELLOW}   ⚠ .claude/custom_instructions.md já existe${RESET}"
fi

# Criar estrutura de squads
echo ""
echo -e "${YELLOW}🤖 Configurando sistema de Squads...${RESET}"
mkdir -p squads/custom
curl -fsSL "$GITHUB_RAW/squads/README.md" -o squads/README.md && echo -e "${GREEN}   ✓ squads/README.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/ARCHITECT.md" -o squads/ARCHITECT.md && echo -e "${GREEN}   ✓ squads/ARCHITECT.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/DEVELOPER.md" -o squads/DEVELOPER.md && echo -e "${GREEN}   ✓ squads/DEVELOPER.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/REVIEWER.md" -o squads/REVIEWER.md && echo -e "${GREEN}   ✓ squads/REVIEWER.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/QA.md" -o squads/QA.md && echo -e "${GREEN}   ✓ squads/QA.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/SECURITY.md" -o squads/SECURITY.md && echo -e "${GREEN}   ✓ squads/SECURITY.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/DESIGNER.md" -o squads/DESIGNER.md && echo -e "${GREEN}   ✓ squads/DESIGNER.md${RESET}"
curl -fsSL "$GITHUB_RAW/squads/DATA.md" -o squads/DATA.md && echo -e "${GREEN}   ✓ squads/DATA.md${RESET}"

# Criar templates de documentação do projeto
echo ""
echo -e "${YELLOW}📄 Criando templates de documentação do projeto (docs/)...${RESET}"

# PRD.md
if [ ! -f "docs/PRD.md" ]; then
cat > docs/PRD.md << 'EOF'
# PRD: [Nome do Projeto]

| Campo | Valor |
|-------|-------|
| **One-liner** | [Uma frase descrevendo o projeto] |
| **Owner** | [Quem é responsável] |
| **Status** | Draft |
| **Data** | [Data de hoje] |

---

## 1. Resumo para Leigos

### O que é
[Explicar em 2-3 frases simples, como se estivesse explicando para um amigo]

### Para quem é
[Descrever o tipo de pessoa que vai usar]

### Qual problema resolve
**Exemplo:**
> "Hoje, Maria perde 2 horas por dia..."

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

### Exemplo Prático
> **João é...** [História com começo, meio e fim]

---

## 2. Contexto e Problema

### Dor do Usuário
[Descrever a dor em detalhes]

### Impacto
- **Quantitativo:** [Números]
- **Qualitativo:** [Como afeta o dia a dia]

### Por que agora?
[Timing]

---

## 3. Objetivos e Sucesso

### Objetivos
1. [Objetivo 1]
2. [Objetivo 2]

### Não-Objetivos
1. [O que NÃO vamos fazer]

### Definição de Sucesso
| Métrica | Baseline | Meta |
|---------|----------|------|
| [Métrica 1] | [Atual] | [Desejado] |

---

## 4. Usuários e Personas

### Persona Primária
**Nome:** [Nome fictício]
**Dor principal:** [O que mais sofre]
**Motivação:** [O que a move]

---

## 5. Escopo e Priorização

### MUST (obrigatório para MVP)
- [ ] [Feature 1]
- [ ] [Feature 2]
- [ ] [Feature 3]

### SHOULD (importante)
- [ ] [Feature 4]

### COULD (nice to have)
- [ ] [Feature 5]

### WON'T (fora de escopo)
- [ ] [Feature 6]

---

## 6. Fluxos de Usuário

### Happy Path
1. [Passo 1]
2. [Passo 2]
3. [Resultado]

### Fluxos de Erro
| Erro | Mensagem | Ação |
|------|----------|------|
| [Erro 1] | "[Mensagem]" | [Recuperação] |

---

## 7. Requisitos Funcionais

### FR-001: [Nome da funcionalidade]
**Descrição:** [O que deve fazer]

**Regras de negócio:**
- RN1: [Regra]

**Validações:**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| [Campo 1] | [Tipo] | Sim/Não |

---

## 8. Requisitos Não-Funcionais

### Performance
- API p95: < 300ms
- LCP p95: < 2.5s

### Segurança
- [ ] HTTPS obrigatório
- [ ] Inputs sanitizados
- [ ] Rate limiting

### LGPD
- [ ] Dados PII identificados
- [ ] Política de retenção

---

## 9. Critérios de Aceitação

### AC-001: [Nome]
```gherkin
Dado que [contexto]
Quando [ação]
Então [resultado]
```

---

## 10. Roadmap

| Fase | Entregáveis | Estimativa |
|------|-------------|------------|
| MVP | [Itens] | [T-shirt] |
| V1.0 | [Itens] | [T-shirt] |

---

## 11. Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| [Risco 1] | Alta/Média/Baixa | [Ação] |

---

## 12. Próximos Passos

1. [ ] [Ação 1]
2. [ ] [Ação 2]
3. [ ] [Ação 3]

---

## 13. Suposições

| Suposição | Se errado |
|-----------|-----------|
| [Suposição] | [Impacto] |
EOF
echo -e "${GREEN}   ✓ docs/PRD.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/PRD.md já existe${RESET}"
fi

# ARQUITETURA.md
if [ ! -f "docs/ARQUITETURA.md" ]; then
cat > docs/ARQUITETURA.md << 'EOF'
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
Ver arquivo DECISOES.md

## Diagrama
[Inserir diagrama ou link se necessário]

## Integrações Externas
- [API/serviço 1]
- [API/serviço 2]

## Data de criação
[Data]
EOF
echo -e "${GREEN}   ✓ docs/ARQUITETURA.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/ARQUITETURA.md já existe${RESET}"
fi

# DECISOES.md
if [ ! -f "docs/DECISOES.md" ]; then
cat > docs/DECISOES.md << 'EOF'
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
echo -e "${GREEN}   ✓ docs/DECISOES.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/DECISOES.md já existe${RESET}"
fi

# MUDANCAS.md
if [ ! -f "docs/MUDANCAS.md" ]; then
cat > docs/MUDANCAS.md << 'EOF'
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
echo -e "${GREEN}   ✓ docs/MUDANCAS.md${RESET}"
else
echo -e "${YELLOW}   ⚠ docs/MUDANCAS.md já existe${RESET}"
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
echo -e "${YELLOW}📝 Configurando CLAUDE.md...${RESET}"

# Verificar flag --no-claude
if [ "$NO_CLAUDE" = true ]; then
  echo -e "${YELLOW}   ⚠ Flag --no-claude: pulando CLAUDE.md${RESET}"
elif [ -f "CLAUDE.md" ]; then
  # CLAUDE.md já existe
  if [ "$MERGE_MODE" = true ]; then
    # Modo merge: adicionar ao final
    echo "" >> CLAUDE.md
    echo "---" >> CLAUDE.md
    cat vibe-coding/CLAUDE-INSTRUCTIONS.md >> CLAUDE.md
    echo -e "${GREEN}   ✓ Instruções adicionadas ao CLAUDE.md (--merge)${RESET}"
  elif [ "$SEPARATE_MODE" = true ]; then
    # Modo separado explícito
    cp vibe-coding/CLAUDE-INSTRUCTIONS.md CLAUDE.vibe-coding.md
    echo -e "${GREEN}   ✓ CLAUDE.vibe-coding.md criado (--separate)${RESET}"
  else
    # Comportamento padrão quando já existe: criar separado
    cp vibe-coding/CLAUDE-INSTRUCTIONS.md CLAUDE.vibe-coding.md
    echo -e "${YELLOW}   ⚠ CLAUDE.md já existe${RESET}"
    echo -e "${GREEN}   ✓ CLAUDE.vibe-coding.md criado${RESET}"
    echo -e "${BLUE}   Dica: Adicione 'Consulte também: CLAUDE.vibe-coding.md' ao seu CLAUDE.md${RESET}"
  fi
else
  # CLAUDE.md não existe - criar completo
cat > CLAUDE.md << 'CLAUDEMD'
# CLAUDE.md - Orquestrador do Projeto

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.

═══════════════════════════════════════════════════════════════════════════════
## COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com `*`, execute a função correspondente:

### COMANDOS PRINCIPAIS (7)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| \`*começar\` | Iniciar projeto | Leia \`vibe-coding/PROTOCOLOS/00-INICIAR.md\` e \`vibe-coding/PROTOCOLOS/18-PRD.md\`, guie o planejamento, preencha \`docs/PRD.md\` |
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
│       ├── 00-INICIAR.md
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
2. Ler \`vibe-coding/PROTOCOLOS/00-INICIAR.md\`
3. Seguir o protocolo de planejamento
4. Preencher \`docs/PRD.md\` com as informações
5. Criar \`docs/ROADMAP.md\` com os próximos passos

Para problemas complexos:

\`\`\`
*orquestrar [descrição do problema]
\`\`\`

O orquestrador vai sugerir a sequência de comandos adequada.

CLAUDEMD
echo -e "${GREEN}   ✓ CLAUDE.md criado na raiz do projeto${RESET}"
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
echo "   │   ├── ARQUITETURA.md"
echo "   │   ├── DECISOES.md"
echo "   │   ├── MUDANCAS.md"
echo "   │   ├── ROADMAP.md"
echo "   │   └── specs/"
echo "   ├── vibe-coding/          ← Referência (consulte quando precisar)"
echo "   │   ├── COMANDOS.md"
echo "   │   ├── COMUNICACAO.md"
echo "   │   ├── GLOSSARIO.md"
echo "   │   ├── BANDEIRAS-VERMELHAS.md"
echo "   │   ├── TROUBLESHOOTING.md"
echo "   │   └── PROTOCOLOS/"
echo "   └── CLAUDE.md             ← Instruções para o Claude"
echo ""
echo -e "${BLUE}🚀 Próximos passos:${RESET}"
echo "   1. Reinicie o Claude Code se estiver aberto"
echo "   2. Digite: *começar"
echo "   3. O Claude vai te guiar e documentar tudo em docs/"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE: Toda mudança deve ser documentada em docs/${RESET}"
echo ""
