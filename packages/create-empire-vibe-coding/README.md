# create-empire-vibe-coding

CLI para instalar Empire Vibe Coding em um projeto novo ou existente.

## Uso

```bash
# pasta específica
npx create-empire-vibe-coding minha-pasta

# somente docs/instruções
npx create-empire-vibe-coding minha-pasta --docs-only

# atualizar runtime local já existente
npx create-empire-vibe-coding minha-pasta --refresh-runtime
```

## Modo único obrigatório

A instalação sempre cria:

- `CLAUDE.md`
- `AGENTS.md`
- `.claude/settings.local.json` com `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

E sempre garante:

- `vibe-coding/` (comandos + protocolos)
- `docs/` (templates do projeto)
- `empire-dashboard/` (runtime local, exceto `--docs-only`)

Também garante script na raiz:

```json
{
  "scripts": {
    "dashboard": "npm --prefix empire-dashboard run dashboard"
  }
}
```

## Flags válidas

- `--docs-only`
- `--refresh-runtime`

Flags legadas removidas (erro explícito):

- `--platform`
- `--merge`
- `--separate`
- `--no-claude`

## Após instalar

```bash
# no Claude Code ou Codex
*sincronizar
*começar

# dashboard local
npm run dashboard
```

## Atualizar instalação existente

```text
*atualizar
*atualizar vX.Y.Z
```

Sempre com checkpoint completo antes do upgrade.

## Requisitos

- Node.js 18+
- Claude Code e/ou Codex

## Links

- [Repositório](https://github.com/Empire-Business/empire-vibe-coding)
- [Issues](https://github.com/Empire-Business/empire-vibe-coding/issues)

## Licença

MIT
