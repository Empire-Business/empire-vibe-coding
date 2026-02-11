# Protocolo de Tarefas (*tarefas)

## Quando Usar

- Organizar trabalho em etapas
- Acompanhar progresso
- Dividir trabalho grande em partes
- Coordenar múltiplas atividades
- Ver o que está pendente

---

## Ferramentas do Claude Code

O Claude Code tem ferramentas nativas de tarefas. Este comando as utiliza:

| Ferramenta | Função |
|------------|--------|
| `TaskCreate` | Criar nova tarefa |
| `TaskList` | Listar todas as tarefas |
| `TaskGet` | Ver detalhes de uma tarefa |
| `TaskUpdate` | Atualizar status/campos |

---

## Criar Tarefas

### Uso Básico

```
Você digita:
*tarefas criar

Claude pergunta:
- Qual é a tarefa? (título)
- Descrição detalhada?
- Precisa de tarefas dependentes?
```

### Exemplo: Criar Feature

```
Você:
*tarefas criar Sistema de login

Claude cria:
✓ Tarefa criada: "Implementar sistema de login"
  ID: 1
  Status: pending

Quer que eu crie subtarefas?
- Criar página de login
- Configurar autenticação
- Proteger rotas
```

### Exemplo: Projeto Completo

```
Você:
*tarefas criar Projeto e-commerce com essas etapas:
1. Setup do projeto
2. Catálogo de produtos
3. Carrinho
4. Checkout
5. Área do cliente

Claude cria múltiplas tarefas:
✓ Tarefa 1: "Setup inicial do projeto" (pending)
✓ Tarefa 2: "Implementar catálogo de produtos" (pending)
  └── Bloqueada por: Tarefa 1
✓ Tarefa 3: "Criar carrinho de compras" (pending)
  └── Bloqueada por: Tarefa 2
✓ Tarefa 4: "Sistema de checkout" (pending)
  └── Bloqueada por: Tarefa 3
✓ Tarefa 5: "Área do cliente" (pending)
  └── Bloqueada por: Tarefa 4
```

---

## Listar Tarefas

### Ver Todas

```
Você:
*tarefas listar

Claude mostra:
┌─────────────────────────────────────────────────────────┐
│ TAREFAS DO PROJETO                                      │
├─────────────────────────────────────────────────────────┤
│ #1  ⏳ Implementar sistema de login                     │
│     Status: in_progress                                 │
│ #2  ⏸️  Criar página de login                           │
│     Status: pending | Bloqueada por: #1                 │
│ #3  ⏸️  Configurar autenticação                         │
│     Status: pending | Bloqueada por: #1                 │
│ #4  ⏸️  Proteger rotas                                  │
│     Status: pending | Bloqueada por: #3                 │
└─────────────────────────────────────────────────────────┘

Progresso: 0/4 concluídas
```

### Filtrar por Status

```
Você:
*tarefas listar pendentes

Claude mostra apenas tarefas pending
```

---

## Ver Detalhes

```
Você:
*tarefas ver 1

Claude mostra:
┌─────────────────────────────────────────────────────────┐
│ TAREFA #1: Implementar sistema de login                 │
├─────────────────────────────────────────────────────────┤
│ Status: in_progress                                     │
│ Criada em: 2024-01-15 10:30                             │
│                                                          │
│ Descrição:                                              │
│ Implementar sistema completo de autenticação com        │
│ Supabase Auth, incluindo login com email/senha e        │
│ OAuth (Google).                                         │
│                                                          │
│ Bloqueia:                                               │
│ - #2 Criar página de login                              │
│ - #3 Configurar autenticação                            │
│                                                          │
│ Bloqueada por: (nenhuma)                                │
└─────────────────────────────────────────────────────────┘
```

---

## Atualizar Status

### Status Disponíveis

```
pending      → Aguardando
in_progress  → Em andamento
completed    → Concluída
deleted      → Removida
```

### Marcar em Progresso

```
Você:
*tarefas iniciar 1

Claude:
✓ Tarefa #1 atualizada para "in_progress"
  "Implementar sistema de login" está em andamento.
```

### Concluir Tarefa

```
Você:
*tarefas concluir 1

Claude:
✓ Tarefa #1 concluída!

Tarefas desbloqueadas:
- #2 Criar página de login
- #3 Configurar autenticação

Quer iniciar a próxima?
```

---

## Fluxo de Trabalho

### Fluxo Recomendado

```
1. *tarefas criar → Planejar o que fazer
2. *tarefas listar → Ver todas as tarefas
3. *tarefas iniciar [id] → Começar uma tarefa
4. (trabalhar na tarefa)
5. *tarefas concluir [id] → Marcar como feita
6. *tarefas listar → Ver próxima pendente
7. Repetir
```

### Integração com *garantir

```
Recomendado:
*tarefas concluir → *garantir → Marcar completed

Isso garante que só concluímos tarefas
que passaram pela verificação de qualidade.
```

---

## Dependências

### Criar Dependências

```
Você:
*tarefas criar Fazer deploy
*tarefas bloquear 5 por 4

(Cria tarefa 5 "Deploy" bloqueada pela tarefa 4 "Testes")

Ou de uma vez:
*tarefas criar Fazer deploy após testes
Claude: Qual tarefa deve ser concluída primeiro?
Você: #4 Testes
```

### Ver Dependências

```
Você:
*tarefas ver 5

Claude mostra:
│ Bloqueada por:                                          │
│ - #4 Rodar testes (status: pending)                     │
│                                                          │
│ Esta tarefa só pode ser iniciada após #4 ser concluída. │
```

---

## Templates de Tarefas

### Nova Feature

```
*tarefas criar feature [nome]
  ├── #1: Planejar feature
  ├── #2: Criar especificação
  │   └── Bloqueada por: #1
  ├── #3: Implementar backend
  │   └── Bloqueada por: #2
  ├── #4: Implementar frontend
  │   └── Bloqueada por: #2
  ├── #5: Testar
  │   └── Bloqueada por: #3, #4
  └── #6: Fazer deploy
      └── Bloqueada por: #5
```

### Bug Fix

```
*tarefas criar bug [descrição]
  ├── #1: Reproduzir bug
  ├── #2: Identificar causa
  │   └── Bloqueada por: #1
  ├── #3: Implementar correção
  │   └── Bloqueada por: #2
  ├── #4: Testar correção
  │   └── Bloqueada por: #3
  └── #5: Fazer deploy
      └── Bloqueada por: #4
```

### Refatoração

```
*tarefas criar refatoração [nome]
  ├── #1: Analisar código atual
  ├── #2: Planejar mudanças
  │   └── Bloqueada por: #1
  ├── #3: Implementar mudanças
  │   └── Bloqueada por: #2
  ├── #4: Atualizar testes
  │   └── Bloqueada por: #3
  └── #5: Code review
      └── Bloqueada por: #4
```

---

## Exemplos Práticos

### Começando o Dia

```
Você:
*tarefas listar pendentes

Claude:
Tarefas disponíveis para começar:
- #2 Criar página de login (pendente, sem bloqueios)
- #5 Escrever documentação (pendente, sem bloqueios)

Qual quer iniciar?
```

### Fim do Dia

```
Você:
*tarefas listar

Claude:
📊 Resumo do dia:
- Concluídas: 3
- Em progresso: 1 (#3 - Configurar auth)
- Pendentes: 4

Amanhã, continue com #3 ou inicie #2 ou #5.
```

### Planning de Sprint

```
Você:
*tarefas criar sprint desta semana:
1. Finalizar autenticação
2. Criar dashboard
3. Implementar busca
4. Testes E2E

Claude cria 4 tarefas e pergunta sobre dependências.
```

---

## Comandos Rápidos

| Você digita | O que acontece |
|-------------|----------------|
| `*tarefas` | Lista todas as tarefas |
| `*tarefas criar [nome]` | Cria nova tarefa |
| `*tarefas ver [id]` | Mostra detalhes |
| `*tarefas iniciar [id]` | Marca in_progress |
| `*tarefas concluir [id]` | Marca completed |
| `*tarefas bloquear [id] por [id]` | Cria dependência |
| `*tarefas excluir [id]` | Remove tarefa |

---

## Integração com ROADMAP

### Sincronização

```
Tarefas do *tarefas devem refletir em docs/ROADMAP.md:

Quando tarefa concluída:
1. *tarefas concluir [id]
2. Atualizar ROADMAP.md
3. *mudança para documentar

Quando planejando:
1. *planejar
2. Criar tarefas baseadas no plano
3. *tarefas criar para cada etapa
```

---

## Dicas

### Boas Práticas

```
✓ Tarefas pequenas e específicas
✓ Uma tarefa = uma entrega
✓ Dependências claras
✓ Atualizar status regularmente
✓ Revisar lista diariamente
```

### Evitar

```
✗ Tarefas genéricas ("Melhorar app")
✗ Tarefas gigantes ("Fazer todo o backend")
✗ Esquecer de atualizar status
✗ Criar muitas dependências circulares
```

---

## Resumo para Iniciantes

| Ação | Comando |
|------|---------|
| Ver tarefas | `*tarefas` |
| Criar tarefa | `*tarefas criar [nome]` |
| Começar tarefa | `*tarefas iniciar [id]` |
| Terminar tarefa | `*tarefas concluir [id]` |
| Ver detalhes | `*tarefas ver [id]` |

**Lembre-se:** Tarefas quebram trabalho grande em pedaços menores. Cada pedaço concluído é uma vitória!
