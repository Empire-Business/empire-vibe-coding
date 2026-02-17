# Empire Vibe Coding

Framework task-oriented para desenvolvimento com IA, com modo único obrigatório para Claude Code e Codex.

## Instalação

```bash
curl -fsSL https://raw.githubusercontent.com/Empire-Business/empire-vibe-coding/main/install.sh | bash
```

A instalação sempre cria e sincroniza:

- `CLAUDE.md`
- `AGENTS.md`
- `.claude/settings.local.json` com `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

Também instala runtime local em `empire-dashboard/` (exceto com `--docs-only`) e garante script raiz:

```json
{
  "scripts": {
    "dashboard": "npm --prefix empire-dashboard run dashboard"
  }
}
```

## Flags válidas

```bash
--docs-only
--refresh-runtime
```

Flags legadas removidas (agora geram erro explícito):

```bash
--platform
--merge
--separate
--no-claude
```

## CLI via npx

```bash
npx create-empire-vibe-coding meu-projeto
npx create-empire-vibe-coding meu-projeto --docs-only
npx create-empire-vibe-coding meu-projeto --refresh-runtime
```

## Operação diária

Regra dura:

1. `CLAUDE.md` e `AGENTS.md` são de leitura obrigatória.
2. Os dois devem estar idênticos byte a byte.
3. Se houver drift, bloquear comandos críticos e executar `*sincronizar`.

Comandos-chave:

- `*começar`
- `*dashboard`
- `*agentes`
- `*sincronizar`
- `*atualizar`

## Atualizar instalação existente

```text
*atualizar
*atualizar vX.Y.Z
```

Fluxo seguro obrigatório:

1. preflight completo;
2. checkpoint (backup + snapshot Git quando disponível);
3. atualização via instalador oficial;
4. validação pós-update + rollback documentado;
5. sincronização final de `CLAUDE.md` e `AGENTS.md`.

## Dashboard local

- endereço padrão: `http://localhost:3001`
- objetivo: acompanhamento visual de tarefas/squads
- modo: somente consulta/read-only (`POST/PATCH/DELETE` de mutação retornam `403`)

## Agentes

- Claude Code: Agent Teams nativo
- Codex: emulação de squads (líder PM + especialistas + consolidação)

## Desenvolvimento deste repositório

```bash
npm run test
npm run web:dev
npm run dashboard
npm run agents:check
```

## Licença

MIT
