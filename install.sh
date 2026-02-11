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

# Criar pasta de documentação
mkdir -p vibe-coding/PROTOCOLOS

# Instalar Skill
echo ""
echo -e "${YELLOW}🔧 Instalando Claude Skill...${RESET}"
curl -fsSL "$GITHUB_RAW/claude-skill/SKILL.md" -o .claude/skills/empire-vibe-coding/SKILL.md
echo -e "${GREEN}   ✓ Skill instalada em: .claude/skills/empire-vibe-coding/${RESET}"

# Baixar documentação
echo ""
echo -e "${YELLOW}📚 Baixando documentação...${RESET}"

# Documentos principais
curl -fsSL "$GITHUB_RAW/docs/README.md" -o vibe-coding/README.md && echo -e "${GREEN}   ✓ vibe-coding/README.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/GUIA-DO-INICIANTE.md" -o vibe-coding/GUIA-DO-INICIANTE.md && echo -e "${GREEN}   ✓ vibe-coding/GUIA-DO-INICIANTE.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/BANDEIRAS-VERMELHAS.md" -o vibe-coding/BANDEIRAS-VERMELHAS.md && echo -e "${GREEN}   ✓ vibe-coding/BANDEIRAS-VERMELHAS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/TROUBLESHOOTING.md" -o vibe-coding/TROUBLESHOOTING.md && echo -e "${GREEN}   ✓ vibe-coding/TROUBLESHOOTING.md${RESET}"

# Protocolos
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md" -o vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/01-DESENVOLVIMENTO.md" -o vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/01-DESENVOLVIMENTO.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/02-CORRECAO-BUGS.md" -o vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/02-CORRECAO-BUGS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/03-APRIMORAMENTO.md" -o vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/03-APRIMORAMENTO.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md" -o vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/04-MANUTENCAO-PROJETOS-PRONTOS.md${RESET}"
curl -fsSL "$GITHUB_RAW/docs/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md" -o vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md && echo -e "${GREEN}   ✓ vibe-coding/PROTOCOLOS/05-CHECKLIST-LANCAMENTO.md${RESET}"

# Resumo
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo -e "${BOLD}  INSTALAÇÃO CONCLUÍDA!${RESET}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo ""
echo -e "${BLUE}📋 Próximos passos:${RESET}"
echo "   1. Reinicie o Claude Code se estiver aberto"
echo "   2. Digite: \"quero começar um projeto\""
echo "   3. O Claude vai te guiar passo a passo!"
echo ""
echo -e "${YELLOW}📖 Documentação: vibe-coding/${RESET}"
echo -e "${YELLOW}🔧 Skill: .claude/skills/empire-vibe-coding/${RESET}"
echo ""
