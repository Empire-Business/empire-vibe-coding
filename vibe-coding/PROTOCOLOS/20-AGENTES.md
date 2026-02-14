---
## PARA CLAUDE (AI INSTRUCTIONS)

IMPORTANTE - LEIA COM ATENÇÃO:

1. Sempre identifique a natureza da tarefa primeiro
2. Selecione agentes apropriados do diretório squads/
3. Use TaskCreate para criar tarefas para cada agente
4. Execute agentes sequencialmente, passando contexto
5. Reporte progresso após cada agente
6. Pare e informe o usuário se encontrar problemas críticos
---

# 20-AGENTES.md - Protocolo de Sistema de Squads

## Quando Usar

- `*agentes` → Ativar sistema de squads
- Tarefas complexas que precisam de múltiplas especialidades
- Quando usuário pede ajuda para problema complexo
- Features grandes que envolvem arquitetura + código + testes

---

## PM - O Orquestrador

O PM (Project Manager) é o agente que **dá um jeito**. Ele não é especialista em nada específico — é especialista em **resolver problemas**.

Quando usar o PM:
- Não sabe qual agente chamar? → PM
- Tarefa complexa com múltiplas etapas? → PM
- Precisa orquestrar vários agentes? → PM
- Usuário pediu algo vago? → PM

**O PM é o ponto de entrada padrão.** Leia `squads/PM.md` para entender como ele funciona.

---

## CHECKPOINT INICIAL (OBRIGATÓRIO)

### ANTES de começar, SEMPRE mostre:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🤖 Sistema de Squads - Agentes Especializados                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Analisei sua solicitação e identifiquei que precisamos         │
│  de uma equipe de agentes especializados.                       │
│                                                                 │
│  ✅ VOU FAZER:                                                  │
│                                                                 │
│     1. Identificar agentes necessários                          │
│     2. Criar tarefas com TaskCreate                             │
│     3. Executar cada agente sequencialmente                     │
│     4. Passar contexto entre agentes                            │
│     5. Reportar progresso após cada etapa                       │
│                                                                 │
│  ❌ NÃO VOU FAZER:                                              │
│                                                                 │
│     ✗ Pular etapas de validação                                 │
│     ✗ Executar agentes em paralelo (para manter contexto)       │
│     ✗ Ignorar problemas reportados por agentes                  │
│                                                                 │
│  📋 AGENTES DISPONÍVEIS:                                        │
│                                                                 │
│     - ARCHITECT (Arquitetura)                                   │
│     - DEVELOPER (Desenvolvimento)                               │
│     - REVIEWER (Code Review)                                    │
│     - QA (Testes e Qualidade)                                   │
│     - SECURITY (Segurança)                                      │
│     - DESIGNER (Design e UX)                                    │
│     - DATA (Dados e Performance)                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Agentes sugeridos para sua tarefa: [lista]                     │
│                                                                 │
│  Posso continuar? (SIM/NÃO)                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

🛑 STOP_POINT_CONFIRMACAO
```

---

## FLUXO DE EXECUÇÃO

### PASSO 1: Identificar Necessidade

```
Analise a solicitação do usuário e identifique:

1. Tipo de tarefa:
   - [ ] Feature nova
   - [ ] Bug/correção
   - [ ] Performance
   - [ ] Segurança
   - [ ] Refatoração
   - [ ] Design/UX
   - [ ] Dados/analytics

2. Agentes necessários (consultar squads/):
   - [ ] ARCHITECT
   - [ ] DEVELOPER
   - [ ] REVIEWER
   - [ ] QA
   - [ ] SECURITY
   - [ ] DESIGNER
   - [ ] DATA

3. Ordem de execução
```

### PASSO 2: Criar Tarefas

```
Para cada agente, criar tarefa com TaskCreate:

{
  subject: "[AGENTE]: [Tarefa específica]",
  description: "[Contexto e objetivos detalhados]",
  activeForm: "[Agente] está trabalhando..."
}
```

### PASSO 3: Executar Sequencialmente

```
Para cada agente na ordem definida:

1. Marcar tarefa como in_progress (TaskUpdate)
2. Ler arquivo do agente em squads/
3. Executar comportamento do agente
4. Capturar output
5. Marcar tarefa como completed (TaskUpdate)
6. Reportar progresso ao usuário
7. Passar contexto para próximo agente
```

### PASSO 4: Reportar Progresso

```
Após cada agente, mostrar:

┌─────────────────────────────────────────┐
│  ✅ [AGENTE] concluído                   │
│                                         │
│  Resultado:                             │
│  [Resumo do que o agente fez]           │
│                                         │
│  Próximo: [PRÓXIMO_AGENTE]              │
└─────────────────────────────────────────┘
```

---

## SQUADS PRÉ-DEFINIDOS

### Feature Squad
Para desenvolver novas funcionalidades:

```
ORDEM: ARCHITECT → DEVELOPER → REVIEWER → QA

┌─────────────┐
│  ARCHITECT  │ → Define arquitetura e estrutura
└──────┬──────┘
       │ Output: Estrutura, decisões técnicas
       ▼
┌─────────────┐
│ DEVELOPER   │ → Implementa código
└──────┬──────┘
       │ Output: Código implementado
       ▼
┌─────────────┐
│  REVIEWER   │ → Revisa qualidade do código
└──────┬──────┘
       │ Output: Aprovação ou ajustes
       ▼
┌─────────────┐
│     QA      │ → Testa e valida
└─────────────┘
       │ Output: Validação final
       ▼
    CONCLUÍDO
```

### Bug Squad
Para corrigir problemas:

```
ORDEM: DEVELOPER → QA → SECURITY (se crítico)

┌─────────────┐
│ DEVELOPER   │ → Investiga e corrige
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     QA      │ → Valida correção
└──────┬──────┘
       │
       ▼ (se crítico)
┌─────────────┐
│  SECURITY   │ → Verifica vulnerabilidades
└─────────────┘
```

### Performance Squad
Para otimizações:

```
ORDEM: DATA → DEVELOPER → QA

┌─────────────┐
│    DATA     │ → Identifica gargalos
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ DEVELOPER   │ → Implementa otimizações
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     QA      │ → Valida melhorias
└─────────────┘
```

### Security Squad
Para auditorias:

```
ORDEM: SECURITY → DEVELOPER → REVIEWER

┌─────────────┐
│  SECURITY   │ → Faz auditoria
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ DEVELOPER   │ → Corrige vulnerabilidades
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  REVIEWER   │ → Revisa correções
└─────────────┘
```

### Design Squad
Para UI/UX:

```
ORDEM: DESIGNER → DEVELOPER → QA

┌─────────────┐
│  DESIGNER   │ → Define UX e visual
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ DEVELOPER   │ → Implementa interface
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     QA      │ → Valida experiência
└─────────────┘
```

---

## EXEMPLOS DE USO

### Exemplo 1: Feature Nova

```
USUÁRIO: *agentes
Quero criar um sistema de pagamentos com Stripe

CLAUDE: [Mostra checkpoint]

USUÁRIO: SIM

CLAUDE: Analisando sua solicitação...

        Agentes selecionados: Feature Squad
        - ARCHITECT: Planejar integração
        - DEVELOPER: Implementar código
        - REVIEWER: Revisar implementação
        - QA: Testar fluxo de pagamento

        Iniciando execução...

        ─────────────────────────────
        🏗️ ARCHITECT - Trabalhando...
        ─────────────────────────────

        [Executa ARCHITECT]

        ✅ ARCHITECT concluído
        Resultado: Arquitetura definida, endpoints mapeados

        ─────────────────────────────
        💻 DEVELOPER - Trabalhando...
        ─────────────────────────────

        [Executa DEVELOPER]

        ✅ DEVELOPER concluído
        Resultado: Código implementado

        [... continua com REVIEWER e QA ...]

        ═══════════════════════════════════
        🎉 SQUAD CONCLUÍDO!
        ═══════════════════════════════════

        Resumo:
        - ✅ Arquitetura definida
        - ✅ Código implementado
        - ✅ Code review aprovado
        - ✅ Testes passando

        Próximos passos sugeridos:
        1. *api stripe - Documentar API (se não feito)
        2. *lançar - Checklist de deploy
```

### Exemplo 2: Bug Crítico

```
USUÁRIO: *agentes
Login está permitindo acessar conta de outros usuários

CLAUDE: 🚨 BUG CRÍTICO IDENTIFICADO!

        Este é um problema de segurança grave.
        Ativando Bug Squad + Security:

        - DEVELOPER: Corrigir
        - QA: Validar
        - SECURITY: Auditoria completa

        Posso continuar? (SIM/NÃO)
```

---

## TRATAMENTO DE ERROS

### Se um agente encontrar problema crítico:

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ PROBLEMA CRÍTICO DETECTADO                                  │
│                                                                 │
│  Agente: [AGENTE]                                               │
│  Problema: [Descrição]                                          │
│                                                                 │
│  🔴 BLOQUEIO: Não é seguro continuar sem resolver.              │
│                                                                 │
│  Opções:                                                        │
│  1. Resolver agora (vou tentar corrigir)                        │
│  2. Pausar e discutir solução                                   │
│  3. Cancelar execução do squad                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

🛑 STOP_POINT - ESPERE decisão do usuário
```

---

## REGRAS DO SISTEMA

### Regra #1: Ordem é Importante
Execute agentes na ordem correta. ARCHITECT antes de DEVELOPER, REVIEWER antes de QA.

### Regra #2: Contexto é Passado
O output de um agente alimenta o próximo. Mantenha contexto.

### Regra #3: Pare em Problemas
Se encontrar problema crítico, pare e informe. Não continue automaticamente.

### Regra #4: Documente Tudo
Cada agente deve atualizar documentação apropriada em `docs/`.

### Regra #5: Reporte Progresso
Mostre ao usuário o que cada agente está fazendo e fez.

---

## SCRIPT DE PROGRESSO

Use este template para reportar progresso:

```markdown
─────────────────────────────────────
🔄 [AGENTE] - [Ação em andamento]
─────────────────────────────────────

[Detalhes do que está sendo feito]

✅ [AGENTE] concluído

**Resultado:**
- [Item 1]
- [Item 2]

**Próximo:** [PRÓXIMO_AGENTE] ou "Nenhum (concluído)"
```

---

## RESUMO

| Ação | Comportamento |
|------|---------------|
| Identificar | Analisar tarefa e selecionar agentes |
| Criar | Usar TaskCreate para cada agente |
| Executar | Rodar agentes em sequência |
| Contexto | Passar output de um para outro |
| Reportar | Mostrar progresso após cada agente |
| Parar | Interromper se problema crítico |

**Lembre-se:** Squads são equipes coordenadas, não execuções paralelas aleatórias!
