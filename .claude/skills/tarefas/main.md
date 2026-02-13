---
trigger: "*tarefas"
aliases: ["*tasks", "*todo"]
---

# Skill: tarefas

## Propósito

Gerenciar tarefas do projeto usando o sistema de tarefas do Claude Code.

---

## Comportamento

Quando o usuário executar `*tarefas`, você deve:

### 1. Mostrar opções

```
Gerenciamento de Tarefas

Comandos disponíveis:
1. criar     - Criar nova tarefa
2. listar    - Ver todas as tarefas
3. ver       - Ver detalhes de uma tarefa
4. atualizar - Atualizar status de tarefa
5. completar - Marcar tarefa como completa

Exemplo: *tarefas criar
```

---

## Comando: criar

### Criar nova tarefa

Pergunte:
```
Criar Nova Tarefa

1. Título da tarefa: [breve descrição]
2. Descrição detalhada: [o que precisa ser feito]
3. Prioridade: [alta/média/baixa]
```

### Usar TaskCreate

```
Use a ferramenta TaskCreate para criar a tarefa com:
- subject: Título breve
- description: Descrição completa
- activeForm: "Trabalhando em [tarefa]"
```

---

## Comando: listar

### Listar todas as tarefas

Use a ferramenta TaskList para mostrar:

```
Tarefas do Projeto

Pendentes:
├── #1: [Título] (alta)
└── #2: [Título] (média)

Em Progresso:
└── #3: [Título]

Completadas:
└── #4: [Título] ✓

Total: 4 tarefas (1 completa, 1 em progresso, 2 pendentes)
```

---

## Comando: ver

### Ver detalhes de uma tarefa

```
Use TaskGet com o ID da tarefa para mostrar:

Tarefa #1
─────────────────────
Título: [Título]
Status: [pendente/em progresso/completa]
Descrição: [Descrição completa]
Dependências: [Se houver]
```

---

## Comando: atualizar

### Atualizar status

```
Atualizar Tarefa #[ID]

Opções:
1. iniciar    - Marcar como em progresso
2. bloquear   - Adicionar dependência
3. desbloquear - Remover dependência
4. reabrir    - Voltar para pendente
```

Use TaskUpdate com:
- status: "in_progress" ou "pending"
- addBlockedBy: [IDs de dependências]

---

## Comando: completar

### Marcar como completa

```
Completar Tarefa #[ID]

Verificando se pode ser completada...
- Dependências: [OK/Pendente]
- Status atual: [status]

Confirmar conclusão? (sim/não)
```

Use TaskUpdate com status: "completed"

---

## Boas Práticas

### Criando tarefas

```
✅ Bom:
- "Implementar tela de login com OAuth"
- "Corrigir bug do carrinho duplicando itens"
- "Criar API de listagem de produtos"

❌ Ruim:
- "Fazer umas coisas"
- "Consertar"
- "Feature nova"
```

### Estimativas

```
Use estimativas realistas:
- XS: < 2 horas
- S: 2-4 horas
- M: 4-8 horas
- L: 1-2 dias
- XL: 3-5 dias
```

### Dependências

```
Sempre que uma tarefa depende de outra:
1. Identifique a dependência
2. Use TaskUpdate com addBlockedBy
3. O sistema bloqueia automaticamente
```

---

## Workflow Recomendado

```
1. *tarefas criar → Criar tarefas do sprint
2. *tarefas listar → Ver o que tem que fazer
3. *tarefas [id] → Ver detalhes
4. *tarefas atualizar [id] iniciar → Começar trabalho
5. *tarefas completar [id] → Finalizar tarefa
```

---

## Referências

- Protocolo: `vibe-coding/PROTOCOLOS/15-TAREFAS.md`
- Planejar: `vibe-coding/PROTOCOLOS/16-PLANEJAR.md`
