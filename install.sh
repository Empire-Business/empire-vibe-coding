#!/bin/bash

# EMPIRE VIBE CODING - Instalador
# Execute: curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
#
# Flags disponíveis:
#   --merge      Adiciona instruções ao final do CLAUDE.md existente
#   --separate   Cria CLAUDE.vibe-coding.md separado
#   --no-claude  Não cria/modifica CLAUDE.md (só baixa documentação)
#   --docs-only  Instala apenas documentação/instruções (sem runtime local)
#   --refresh-runtime  Atualiza arquivos do runtime local (empire-dashboard/)

GITHUB_RAW="${EMPIRE_VIBE_CODING_GITHUB_RAW:-https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main}"
RUNTIME_DIR="empire-dashboard"
RUNTIME_MANIFEST_PATH="installer/runtime-files.manifest.txt"
RUNTIME_DASHBOARD_SCRIPT="npm --prefix ${RUNTIME_DIR} run dashboard"

# Cores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'
BOLD='\033[1m'

# Garante que o arquivo de settings tenha Agent Teams habilitado
ensure_agent_teams_env() {
  local settings_file="$1"

  if [ ! -f "$settings_file" ]; then
    return 0
  fi

  if command -v python3 >/dev/null 2>&1; then
    python3 - "$settings_file" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])

try:
    data = json.loads(path.read_text(encoding="utf-8"))
except Exception:
    sys.exit(0)

if not isinstance(data, dict):
    sys.exit(0)

env = data.get("env")
if not isinstance(env, dict):
    env = {}
    data["env"] = env

env["CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS"] = "1"

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
PY
  elif command -v node >/dev/null 2>&1; then
    node -e '
      const fs = require("fs");
      const p = process.argv[1];
      try {
        const data = JSON.parse(fs.readFileSync(p, "utf8"));
        if (typeof data !== "object" || data === null || Array.isArray(data)) process.exit(0);
        if (typeof data.env !== "object" || data.env === null || Array.isArray(data.env)) data.env = {};
        data.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1";
        fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
      } catch {
        process.exit(0);
      }
    ' "$settings_file"
  fi
}

ensure_dashboard_script() {
  local package_file="$1"
  local update_status=""

  if [ ! -f "$package_file" ]; then
    cat > "$package_file" <<EOF
{
  "name": "empire-vibe-project",
  "private": true,
  "scripts": {
    "dashboard": "$RUNTIME_DASHBOARD_SCRIPT"
  }
}
EOF
    echo -e "${GREEN}   ✓ package.json criado com script dashboard${RESET}"
    return 0
  fi

  if command -v python3 >/dev/null 2>&1; then
    update_status="$(python3 - "$package_file" "$RUNTIME_DASHBOARD_SCRIPT" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
dashboard_script = sys.argv[2]

try:
    data = json.loads(path.read_text(encoding="utf-8"))
except Exception:
    print("invalid-json")
    sys.exit(0)

if not isinstance(data, dict):
    print("invalid-object")
    sys.exit(0)

scripts = data.get("scripts")
if not isinstance(scripts, dict):
    scripts = {}
    data["scripts"] = scripts

if "dashboard" in scripts:
    print("exists")
    sys.exit(0)

scripts["dashboard"] = dashboard_script
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("added")
PY
)"
  elif command -v node >/dev/null 2>&1; then
    update_status="$(node -e '
      const fs = require("fs");
      const file = process.argv[1];
      const dashboardScript = process.argv[2];
      try {
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
          console.log("invalid-object");
          process.exit(0);
        }
        if (typeof data.scripts !== "object" || data.scripts === null || Array.isArray(data.scripts)) {
          data.scripts = {};
        }
        if (!Object.prototype.hasOwnProperty.call(data.scripts, "dashboard")) {
          data.scripts.dashboard = dashboardScript;
          fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
          console.log("added");
        } else {
          console.log("exists");
        }
      } catch {
        console.log("invalid-json");
      }
    ' "$package_file" "$RUNTIME_DASHBOARD_SCRIPT")"
  else
    echo -e "${YELLOW}   ⚠ Não foi possível atualizar package.json (python3/node ausente)${RESET}"
    return 0
  fi

  case "$update_status" in
    added)
      echo -e "${GREEN}   ✓ Script dashboard adicionado em package.json${RESET}"
      ;;
    exists)
      echo -e "${YELLOW}   ⚠ package.json já possui script dashboard (mantido)${RESET}"
      ;;
    *)
      echo -e "${YELLOW}   ⚠ Não foi possível garantir script dashboard no package.json${RESET}"
      ;;
  esac
}

install_runtime_dashboard() {
  local docs_only="$1"
  local refresh_runtime="$2"

  if [ "$docs_only" = true ]; then
    echo ""
    echo -e "${YELLOW}📊 Runtime local: pulado (--docs-only)${RESET}"
    return 0
  fi

  if [ -d "$RUNTIME_DIR" ] && [ "$refresh_runtime" = false ]; then
    echo ""
    echo -e "${YELLOW}📊 Runtime local já existe em ${RUNTIME_DIR}/ (mantido). Use --refresh-runtime para atualizar.${RESET}"
    ensure_dashboard_script package.json
    return 0
  fi

  echo ""
  echo -e "${YELLOW}📊 Instalando runtime task-oriented em ${RUNTIME_DIR}/...${RESET}"
  mkdir -p "$RUNTIME_DIR"

  local manifest_tmp
  manifest_tmp="$(mktemp)"
  if ! curl -fsSL "$GITHUB_RAW/$RUNTIME_MANIFEST_PATH" -o "$manifest_tmp"; then
    echo -e "${RED}   ✗ Falha ao baixar manifesto do runtime: $RUNTIME_MANIFEST_PATH${RESET}"
    rm -f "$manifest_tmp"
    return 1
  fi

  local downloaded=0
  local failed=0

  while IFS= read -r runtime_file || [ -n "$runtime_file" ]; do
    runtime_file="${runtime_file%%$'\r'}"
    if [ -z "$runtime_file" ]; then
      continue
    fi
    case "$runtime_file" in
      \#*)
        continue
        ;;
    esac
    case "$runtime_file" in
      web/*)
        ;;
      *)
        continue
        ;;
    esac

    local relative_path="${runtime_file#web/}"
    local destination="${RUNTIME_DIR}/${relative_path}"
    mkdir -p "$(dirname "$destination")"

    if curl --globoff -fsSL "$GITHUB_RAW/$runtime_file" -o "$destination"; then
      downloaded=$((downloaded + 1))
    else
      failed=$((failed + 1))
      echo -e "${YELLOW}   ⚠ Falha ao baixar $runtime_file${RESET}"
    fi
  done < "$manifest_tmp"

  rm -f "$manifest_tmp"

  echo -e "${GREEN}   ✓ Runtime baixado: ${downloaded} arquivos${RESET}"
  if [ "$failed" -gt 0 ]; then
    echo -e "${YELLOW}   ⚠ Falhas no runtime: ${failed} arquivos${RESET}"
  fi

  ensure_dashboard_script package.json
}

# Parse flags
MERGE_MODE=false
SEPARATE_MODE=false
NO_CLAUDE=false
DOCS_ONLY=false
REFRESH_RUNTIME=false

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
    --docs-only)
      DOCS_ONLY=true
      shift
      ;;
    --refresh-runtime)
      REFRESH_RUNTIME=true
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
      echo "  --docs-only  Instala apenas documentação/instruções (sem runtime local)"
      echo "  --refresh-runtime  Força atualização de ${RUNTIME_DIR}/"
      echo ""
      echo -e "${BOLD}Comportamento padrão:${RESET}"
      echo "  Instala documentação + runtime local task-oriented em ${RUNTIME_DIR}/"
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
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/21-ROADMAP.md" -o vibe-coding/PROTOCOLOS/21-ROADMAP.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/21-ROADMAP.md${RESET}"
curl -fsSL "$GITHUB_RAW/vibe-coding/PROTOCOLOS/22-ARQUITETURA.md" -o vibe-coding/PROTOCOLOS/22-ARQUITETURA.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/22-ARQUITETURA.md${RESET}"

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
ensure_agent_teams_env .claude/settings.json
echo -e "${GREEN}   ✓ Agent Teams habilitado em .claude/settings.json${RESET}"
else
ensure_agent_teams_env .claude/settings.json
echo -e "${YELLOW}   ⚠ settings.json já existe${RESET}"
echo -e "${GREEN}   ✓ Agent Teams habilitado em .claude/settings.json${RESET}"
fi

# Sempre manter também um settings.local.json com Agent Teams habilitado
if [ ! -f ".claude/settings.local.json" ]; then
if [ -f ".claude/settings.json" ]; then
cp .claude/settings.json .claude/settings.local.json
else
cat > .claude/settings.local.json << 'EOF'
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
EOF
fi
echo -e "${GREEN}   ✓ .claude/settings.local.json criado${RESET}"
fi
ensure_agent_teams_env .claude/settings.local.json
echo -e "${GREEN}   ✓ Agent Teams habilitado em .claude/settings.local.json${RESET}"

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
  # CLAUDE.md não existe - copiar instruções oficiais
  cp vibe-coding/CLAUDE-INSTRUCTIONS.md CLAUDE.md
  echo -e "${GREEN}   ✓ CLAUDE.md criado na raiz do projeto${RESET}"
fi

# Instalar runtime local task-oriented
install_runtime_dashboard "$DOCS_ONLY" "$REFRESH_RUNTIME"

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
if [ "$DOCS_ONLY" = false ]; then
  echo "   ├── ${RUNTIME_DIR}/       ← Dashboard local task-oriented"
  echo "   │   ├── app/"
  echo "   │   ├── components/"
  echo "   │   └── package.json"
fi
echo "   └── CLAUDE.md             ← Instruções para o Claude"
echo ""
echo -e "${BLUE}🚀 Próximos passos:${RESET}"
echo "   1. Reinicie o Claude Code se estiver aberto"
echo "   2. Digite: *começar"
if [ "$DOCS_ONLY" = false ]; then
  echo "   3. Para abrir o dashboard local: npm run dashboard"
  echo "      (fallback: npm --prefix ${RUNTIME_DIR} run dashboard)"
  echo "   4. O Claude vai te guiar e documentar tudo em docs/"
else
  echo "   3. O Claude vai te guiar e documentar tudo em docs/"
fi
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE: Toda mudança deve ser documentada em docs/${RESET}"
echo ""
