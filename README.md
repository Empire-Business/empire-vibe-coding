# Empire Vibe Coding

Framework task-oriented para desenvolvimento com Claude Code, com documentação guiada, protocolos e dashboard local de acompanhamento.

## Instalação padrão (com runtime local)

```bash
curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
```

Por padrão, a instalação cria:

- `CLAUDE.md`
- `vibe-coding/`
- `docs/`
- `empire-dashboard/` (runtime local do dashboard)
- `.claude/settings.local.json` com `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

### Comandos pós-instalação

```bash
claude
# no Claude Code:
*começar

# dashboard local (consulta/read-only)
npm run dashboard
# fallback
npm --prefix empire-dashboard run dashboard
```

## Flags de compatibilidade

```bash
# somente docs/instruções (sem runtime local)
curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash -s -- --docs-only

# força atualização do runtime local já instalado
curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash -s -- --refresh-runtime
```

## Criador via npx

```bash
npx create-empire-vibe-coding
npx create-empire-vibe-coding meu-projeto --refresh-runtime
npx create-empire-vibe-coding meu-projeto --docs-only
```

## Dashboard local

- Endereço padrão: `http://localhost:3001`
- Objetivo: acompanhamento visual de tarefas/squads
- Modo: somente consulta (rotas de mutação retornam `403`)

## Agent Teams

O projeto garante a configuração em `.claude/settings.local.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Com isso, fluxos com `*agentes` e ativações automáticas de time ficam habilitados no ambiente do projeto.

## Desenvolvimento deste repositório

```bash
npm run test
npm run web:dev
npm run dashboard
```

## Licença

MIT
