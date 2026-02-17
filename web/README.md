# Empire Dashboard (web)

Dashboard local para acompanhamento task-oriented do Empire Vibe Coding.

## Objetivo

- Exibir tarefas, squads, dependências e logs em tempo real
- Operar em modo consulta (read-only)
- Servir como monitor de execução local em `localhost`

## Executar localmente

```bash
# na raiz do projeto
npm run dashboard

# fallback direto no runtime
npm --prefix empire-dashboard run dashboard
```

No repositório principal (desenvolvimento do dashboard web):

```bash
cd web
npm install
npm run dashboard
```

Abra `http://localhost:3001`.

## Modo read-only

As rotas de mutação são bloqueadas:

- `POST /api/tasks` -> `403`
- `PATCH /api/tasks/[id]` -> `403`
- `DELETE /api/tasks*` -> `403`
- `POST /api/squads` -> `403`
- `POST /api/squads/start` -> `403`
- `DELETE /api/squads*` -> `403`

## Persistência

O SQLite usa diretório configurável via `DASHBOARD_DATA_DIR`.
Fallback automático:

1. `DASHBOARD_DATA_DIR`
2. `<cwd>/data`
3. diretório temporário do sistema

Exemplo:

```bash
DASHBOARD_DATA_DIR=/tmp/empire-dashboard-data npm run dashboard
```

## Testes

```bash
# raiz do monorepo
npm run tutorial:check
npm run test:behavior
npm run web:test
```

## Sincronia do tutorial

Os dados didáticos do site são gerados por:

```bash
node ./scripts/generate-web-tutorial-data.mjs
```

Arquivo gerado:

- `web/data/tutorial.generated.json`

Validação (falha se houver drift):

```bash
node ./scripts/generate-web-tutorial-data.mjs --check
```
