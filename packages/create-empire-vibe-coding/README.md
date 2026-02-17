# create-empire-vibe-coding

CLI para instalar Empire Vibe Coding em um projeto novo ou existente.

## Uso

```bash
# pasta atual
npx create-empire-vibe-coding

# pasta específica
npx create-empire-vibe-coding minha-pasta

# somente docs/instruções
npx create-empire-vibe-coding minha-pasta --docs-only

# atualizar runtime local já existente
npx create-empire-vibe-coding minha-pasta --refresh-runtime
```

## O que instala por padrão

- `vibe-coding/` (comandos + protocolos)
- `docs/` (templates do projeto)
- `CLAUDE.md` (instruções para o Claude)
- `empire-dashboard/` (runtime local task-oriented)
- `.claude/settings.local.json` com `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

Também garante script na raiz:

```json
{
  "scripts": {
    "dashboard": "npm --prefix empire-dashboard run dashboard"
  }
}
```

## Após instalar

```bash
claude
# no Claude Code
*começar

# dashboard local
npm run dashboard
```

## Requisitos

- Node.js 18+
- Claude Code instalado ([docs](https://docs.anthropic.com/claude-code))

## Links

- [Repositório](https://github.com/Empire-Business/empire-vibe-coding)
- [Issues](https://github.com/Empire-Business/empire-vibe-coding/issues)

## Licença

MIT
