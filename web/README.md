# Empire Vibe Coding - Dashboard

Dashboard em tempo real para consulta e acompanhamento de tarefas do sistema de squads.

## Iniciar

```bash
# Recomendado: Node 20.x (veja .nvmrc)
nvm use

# A partir da raiz do projeto
npm run dashboard

# Ou diretamente na pasta web
cd web
npm run dev -- -p 3001
```

Abra [http://localhost:3001](http://localhost:3001) no navegador.

## Modo Consulta (Read-only)

O dashboard opera em modo consulta:
- UI sem ações destrutivas/criação
- Rotas de escrita (`POST`, `PATCH`, `DELETE`) retornam `403`

## Funcionalidades

### Task Board (Kanban)

Visualize tarefas organizadas por status:
- **Pending** — Aguardando
- **Ready** — Pronta para executar (dependências resolvidas)
- **Running** — Em execução
- **Blocked** — Bloqueada por dependências
- **Completed** — Concluída
- **Failed** — Falhou

### DAG View

Visualização gráfica de dependências entre tarefas:
- Nós por tarefa, coloridos por status
- Arestas direcionadas mostrando bloqueios (`blockedBy`)
- Filtro automático por squad selecionada

### Terminal Prompts

Prompts prontos para copiar/colar no Claude Code:
```bash
claude "Implemente o sistema de pagamentos conforme definido em docs/ARQUITETURA.md. Use o protocolo 01-DESENVOLVER.md..."
```

Clique no botão "Copiar" na tarefa para usar.

### Logs em Tempo Real

Acompanhe execução via Server-Sent Events (SSE):
- Progress bars por tarefa
- Mensagens de sucesso/erro
- Timestamp de cada evento

## API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tasks` | Lista todas as tarefas |
| GET | `/api/tasks/[id]` | Busca tarefa por ID |
| GET | `/api/tasks/events` | SSE para updates em tempo real |
| POST/PATCH/DELETE | `/api/tasks*` | Bloqueado no dashboard (403, modo consulta) |

### Squads

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/squads` | Lista squads |
| GET | `/api/squads/[id]` | Busca squad por ID |
| POST/DELETE | `/api/squads*` | Bloqueado no dashboard (403, modo consulta) |

## Modelo de Dados

### Task

```typescript
interface Task {
  id: string;
  subject: string;
  description: string;
  activeForm: string;
  status: 'pending' | 'ready' | 'running' | 'blocked' | 'completed' | 'failed';
  agent: 'PM' | 'ARCHITECT' | 'DEVELOPER' | 'REVIEWER' | 'QA' | 'SECURITY' | 'DESIGNER' | 'DATA';

  // Dependências (DAG)
  blockedBy: string[];
  blocks: string[];
  level: number;

  // Prompt para terminal
  terminalPrompt: string;

  // Metadados
  protocol?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  progress: number;
  logs: TaskLog[];
  output?: string;
  error?: string;
}
```

### Squad

```typescript
interface Squad {
  id: string;
  name: string;
  type: 'feature' | 'bug' | 'performance' | 'security' | 'design';
  tasks: string[];
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  currentLevel: number;
  totalLevels: number;
  progress: number;
}
```

## Execução Paralela

O orchestrator executa tarefas por nível de dependência:

```
Nível 0 (PARALELO): 3 tarefas independentes
├── ARCHITECT
├── DESIGNER
└── DATA

Nível 1 (SEQUENCIAL): 1 tarefa que depende do nível 0
└── DEVELOPER

Nível 2 (PARALELO): 3 tarefas que dependem do nível 1
├── REVIEWER
├── QA
└── SECURITY
```

Tarefas no mesmo nível executam simultaneamente, reduzindo tempo total em 60-80%.

## Stack

- **Next.js 14** — App Router
- **React 18** — UI
- **Tailwind CSS** — Styling
- **Zustand** — State management
- **SQLite** — Persistência local
- **Server-Sent Events** — Real-time updates
- **React Flow** — DAG visualization (opcional)

## Estrutura

```
web/
├── app/
│   ├── api/
│   │   ├── tasks/
│   │   │   ├── route.ts        # GET/POST /api/tasks
│   │   │   ├── [id]/route.ts   # GET/PATCH/DELETE /api/tasks/:id
│   │   │   └── events/route.ts # GET /api/tasks/events (SSE)
│   │   └── squads/
│   │       ├── route.ts        # GET/POST /api/squads
│   │       └── start/route.ts  # POST /api/squads/start
│   └── dashboard/
│       ├── page.tsx            # Página principal
│       └── layout.tsx          # Layout
├── components/
│   └── dashboard/
│       ├── TaskBoard.tsx       # Kanban view
│       ├── TaskCard.tsx        # Card de tarefa
│       ├── DAGView.tsx         # Grafo de dependências
│       ├── SquadStatus.tsx     # Status do squad
│       ├── TerminalPrompt.tsx  # Prompt copiável
│       └── LogFeed.tsx         # Feed de logs
├── hooks/
│   └── useTaskUpdates.ts       # SSE hook
├── stores/
│   └── tasks.ts                # Zustand store
└── lib/
    ├── types.ts                # TypeScript interfaces
    ├── db.ts                   # SQLite connection
    ├── orchestrator.ts         # DAG engine
    ├── events.ts               # EventEmitter
    └── prompts.ts              # Gerador de prompts
```

## Desenvolvimento

```bash
# Instalar dependências
cd web && npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start
```

## Testes

```bash
# Teste manual: criar tarefa via API
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Implementar login",
    "description": "Sistema de autenticação",
    "agent": "DEVELOPER",
    "level": 0
  }'

# Ver tarefas criadas
curl http://localhost:3001/api/tasks
```
