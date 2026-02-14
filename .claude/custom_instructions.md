# CUSTOM INSTRUCTIONS - EMPIRE VIBE CODING

> **IMPORTANTE:** Este arquivo tem PRIORIDADE MÁXIMA sobre todas as outras instruções.
> Se houver conflito entre este arquivo e qualquer outro, ESTE prevalece.

---

## LEIS FUNDAMENTAIS (INALTERÁVEIS)

### LEI #1: NUNCA PULE ETAPAS

```
PROIBIDO pular etapas de documentação ou validação.

Antes de implementar código:
  1. Documentar em docs/PRD.md (se for feature nova)
  2. Documentar em docs/ROADMAP.md (tarefas)
  3. Pedir confirmação do usuário

VIOLAÇÃO: Implementar sem documentar = ERRO CRÍTICO
```

### LEI #2: DOCUMENTAÇÃO PRIMEIRO

```
ORDEM OBRIGATÓRIA:
  1. PRIMEIRO → Criar/atualizar documentação
  2. DEPOIS → Pedir confirmação
  3. SÓ ENTÃO → Implementar código

NUNCA implementar código antes de documentar.
```

### LEI #3: CHECKPOINT OBRIGATÓRIO

```
Antes de CADA ação significativa:

  ┌─────────────────────────────────────────────┐
  │  CHECKPOINT                                 │
  │                                             │
  │  VOU FAZER: [descrever ação]                │
  │  NÃO VOU FAZER: [o que fica de fora]        │
  │  ARQUIVOS AFETADOS: [lista]                 │
  │                                             │
  │  Posso continuar? (SIM/NÃO)                 │
  └─────────────────────────────────────────────┘

SÓ prosseguir após confirmação EXPLÍCITA do usuário.
```

### LEI #4: COMANDOS NÃO SÃO AUTOMÁTICOS

```
Quando o usuário digitar *comando:

  1. LER o protocolo correspondente
  2. EXPLICAR o que o protocolo diz
  3. SEGUIR o protocolo PASSO A PASSO
  4. NÃO assumir que deve "fazer tudo automaticamente"

Exemplo ERRADO:
  *começar → [cria PRD, ROADMAP, arquitetura, código...]

Exemplo CORRETO:
  *começar → [mostra menu, espera resposta, direciona]
```

### LEI #5: DESENVOLVIMENTO BLOQUEADO SEM PRÉ-REQUISITOS

```
PROIBIDO implementar código sem verificar antes:

┌─────────────────────────────────────────────────────────────┐
│  CHECKLIST OBRIGATÓRIO ANTES DE *desenvolver:               │
│                                                              │
│  1. [ ] docs/PRD.md existe e está preenchido?                │
│  2. [ ] docs/ARQUITETURA.md existe e está preenchido?        │
│  3. [ ] docs/ROADMAP.md existe e tem tarefas?                │
│  4. [ ] Design System está definido?                         │
│       → docs/DESIGN/tokens.md OU                             │
│       → Tailwind configurado OU                              │
│       → Padrões visuais documentados                         │
│                                                              │
│  Se QUALQUER item estiver FALTANDO:                          │
│  🛑 BLOQUEAR desenvolvimento                                 │
│  → Mostrar qual está faltando                                │
│  → Direcionar para comando correto (*prd, *arquitetura, etc) │
│  → NÃO PROSSEGUIR até resolver                               │
└─────────────────────────────────────────────────────────────┘

EXCEÇÕES (quando NÃO bloquear):
- *bug e *erro → não precisam dos 4 pré-requisitos
- Manutenção simples (typos, dependências, refatoração sem mudança de comportamento)
- Projetos já estabelecidos com código funcionando
```

---

## CICLO DE TRABALHO OBRIGATÓRIO

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   1. ENTENDIMENTO                                            │
│      └─→ O que o usuário quer?                               │
│      └─→ Qual comando se aplica?                             │
│                                                              │
│   2. LEITURA                                                 │
│      └─→ Ler o protocolo correspondente                      │
│      └─→ Entender os passos OBRIGATÓRIOS                     │
│                                                              │
│   3. CHECKPOINT                                              │
│      └─→ Explicar O QUE vou fazer                            │
│      └─→ Explicar O QUE NÃO vou fazer                        │
│      └─→ Pedir confirmação                                   │
│                                                              │
│   4. EXECUÇÃO                                                │
│      └─→ Seguir o protocolo EXATAMENTE                       │
│      └─→ PARAR em cada STOP POINT                            │
│                                                              │
│   5. VERIFICAÇÃO                                             │
│      └─→ Documentação atualizada?                            │
│      └─→ Checklist pós-ação completo?                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ÁRVORE DE PRIORIDADE

```
┌─────────────────────────────────────────┐
│  PRIORIDADE 1: Este arquivo              │
│  (.claude/custom_instructions.md)        │
├─────────────────────────────────────────┤
│  PRIORIDADE 2: CLAUDE.md                 │
│  (orquestrador principal)                │
├─────────────────────────────────────────┤
│  PRIORIDADE 3: PROTOCOLOS/               │
│  (instruções específicas de comando)     │
├─────────────────────────────────────────┤
│  PRIORIDADE 4: CLAUDE-INSTRUCTIONS.md    │
│  (referência geral)                      │
├─────────────────────────────────────────┤
│  PRIORIDADE 5: Outros arquivos           │
│  (GLOSSARIO, COMUNICACAO, etc)           │
└─────────────────────────────────────────┘
```

---

## CHECKLIST PÓS-AÇÃO (OBRIGATÓRIO)

Após CADA implementação, verificar:

```markdown
- [ ] Criei/atualizei docs/MUDANCAS.md?
- [ ] Se foi decisão técnica → docs/DECISOES.md?
- [ ] Se completei tarefa → docs/ROADMAP.md?
- [ ] Se mudei arquitetura → docs/ARQUITETURA.md?
- [ ] Pedi confirmação antes de implementar?
- [ ] Segui o protocolo EXATAMENTE como escrito?
- [ ] Parei em todos os STOP POINTS?
```

---

## STOP POINTS

Stop Points são momentos onde você DEVE parar e esperar confirmação:

```
┌─────────────────────────────────────────────────────────────┐
│  STOP POINT TIPOS:                                           │
│                                                              │
│  🛑 STOP_POINT_PERGUNTA                                      │
│     → Fiz uma pergunta, ESPERE a resposta                    │
│                                                              │
│  🛑 STOP_POINT_CONFIRMACAO                                   │
│     → Pedi confirmação, ESPERE o "sim" ou "não"              │
│                                                              │
│  🛑 STOP_POINT_ETAPA                                         │
│     → Completei uma etapa, PERGUNTE se continua              │
│                                                              │
│  🛑 STOP_POINT_DOCUMENTACAO                                  │
│     → Criei documentação, MOSTRE e ESPERE aprovação          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## COMANDOS ESPECIAIS

### `*começar` - TUTORIAL INTERATIVO

```
COMPORTAMENTO OBRIGATÓRIO:

1. MOSTRAR menu de opções:
   ╔═══════════════════════════════════════╗
   ║  BEM-VINDO AO EMPIRE VIBE CODING!     ║
   ╠═══════════════════════════════════════╣
   ║  O que você quer fazer?               ║
   ║                                       ║
   ║  1. 📝 Criar PRD do projeto           ║
   ║  2. 📊 Ver status do projeto          ║
   ║  3. 🐛 Reportar um bug                ║
   ║  4. ❓ Tirar dúvida sobre termo       ║
   ║  5. 📚 Ver todos os comandos          ║
   ╚═══════════════════════════════════════╝

2. ESPERAR resposta do usuário (NÃO prosseguir automaticamente)

3. DIRECIONAR para o comando adequado:
   - Opção 1 → *prd
   - Opção 2 → *status
   - Opção 3 → *bug
   - Opção 4 → *termo
   - Opção 5 → *ajuda

PROIBIDO: Criar arquivos automaticamente
```

### `*prd` - GERADOR DE PRD

```
COMPORTAMENTO OBRIGATÓRIO:

ETAPA 1 - CHECKPOINT INICIAL:
┌─────────────────────────────────────────────┐
│  Vou criar um PRD (documento de requisitos) │
│                                             │
│  VOU FAZER:                                 │
│  ✓ Fazer até 5 perguntas de entendimento    │
│  ✓ Criar docs/PRD.md com as respostas       │
│                                             │
│  NÃO VOU FAZER:                             │
│  ✗ Implementar código                       │
│  ✗ Criar arquivos de programação            │
│  ✗ Configurar ambiente                      │
│                                             │
│  Posso continuar?                           │
└─────────────────────────────────────────────┘

🛑 STOP_POINT_CONFIRMACAO

ETAPA 2 - PERGUNTAS (máximo 5):
  1. [Pergunta 1]
  2. [Pergunta 2]
  ...

🛑 STOP_POINT_PERGUNTA (esperar todas as respostas)

ETAPA 3 - CRIAR DOCUMENTO:
  - Gerar docs/PRD.md
  - MOSTRAR o conteúdo gerado

🛑 STOP_POINT_DOCUMENTACAO (esperar aprovação)

ETAPA 4 - PRÓXIMOS PASSOS:
  - Sugerir próximos passos (ex: *desenvolver)
  - NÃO implementar automaticamente

PROIBIDO: Implementar código durante *prd
```

### `*agentes` - SISTEMA DE SQUADS

```
COMPORTAMENTO OBRIGATÓRIO:

1. IDENTIFICAR necessidade
2. MOSTRAR agentes disponíveis (consultar squads/)
3. CRIAR tarefas com TaskCreate
4. EXECUTAR sequencialmente
5. REPORTAR progresso

Consultar: vibe-coding/PROTOCOLOS/20-AGENTES.md
```

---

## ERROS COMUNS A EVITAR

| Erro | Correto |
|------|---------|
| Implementar código sem documentar | Documentar PRIMEIRO, implementar DEPOIS |
| Assumir que *começar = criar tudo | *começar = mostrar menu e esperar |
| Pular Stop Points | PARAR em cada Stop Point |
| Não pedir confirmação | SEMPRE pedir "Posso continuar?" |
| Criar arquivos automaticamente | PERGUNTAR antes de criar |

---

## LEMBRETE FINAL

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║  "Documentação primeiro, código depois."                      ║
║                                                               ║
║  "Perguntar é melhor que assumir."                            ║
║                                                               ║
║  "Stop Points existem por um motivo - USE OS STOP POINTS!"    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```
