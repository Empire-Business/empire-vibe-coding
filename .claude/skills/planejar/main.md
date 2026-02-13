---
trigger: "*planejar"
aliases: ["*plan", "*plano"]
---

# Skill: planejar

## Propósito

Criar um plano detalhado de implementação com WBS, estimativas e riscos.

---

## Verificação Obrigatória

Antes de planejar, verifique se existem:

1. **PRD** (`docs/PRD.md`)
2. **Arquitetura** (`docs/ARQUITETURA.md`)

Se não existirem, oriente o usuário a criá-los primeiro.

---

## Comportamento

Quando o usuário executar `*planejar`, você deve:

### 1. Ler documentos existentes

```
Lendo documentos:
- docs/PRD.md ✓
- docs/ARQUITETURA.md ✓

Analisando requisitos para criar plano...
```

### 2. Criar WBS (Work Breakdown Structure)

Divida o projeto em partes menores:

```
📦 [Nome do Projeto]
├── 🎯 Fase 1: [Nome]
│   ├── Feature 1.1
│   │   ├── Tarefa 1.1.1
│   │   └── Tarefa 1.1.2
│   └── Feature 1.2
├── 🎯 Fase 2: [Nome]
│   └── ...
└── 🎯 Fase 3: [Nome]
```

### 3. Estimar tarefas (T-Shirt Sizing)

```
XS  → < 2 horas
S   → 2-4 horas
M   → 4-8 horas
L   → 1-2 dias
XL  → 3-5 dias
XXL → > 1 semana (quebrar!)
```

### 4. Identificar riscos

```
| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| API externa instável | Alta | Alto | Cache + retry |
```

### 5. Priorizar (MoSCoW)

```
MUST    → Obrigatório para MVP
SHOULD → Importante, agrega valor
COULD   → Nice to have
WON'T   → Não vai ter desta versão
```

---

## Estrutura do Documento

Salve em: `docs/PLANO.md` ou `docs/ROADMAP.md`

```markdown
# Plano de Implementação: [Nome do Projeto]

| Campo | Valor |
|-------|-------|
| **Versão** | 1.0.0 |
| **Data** | [Data] |
| **Status** | Draft |

---

## 1. Visão Geral

[Resumo do que será implementado]

---

## 2. Work Breakdown Structure (WBS)

### Fase 1: [Nome]
**Objetivo:** [O que esta fase entrega]
**Estimativa:** [T-shirt size]

#### Feature 1.1: [Nome]
| Tarefa | Estimativa | Prioridade | Dependências |
|--------|------------|------------|--------------|
| 1.1.1 [Tarefa] | S | MUST | - |
| 1.1.2 [Tarefa] | M | MUST | 1.1.1 |

### Fase 2: [Nome]
...

---

## 3. Critérios de Aceite

### Feature 1.1
```gherkin
Dado que [contexto]
Quando [ação]
Então [resultado esperado]
```

---

## 4. Matriz de Riscos

| Risco | Prob. | Impacto | Mitigação | Dono |
|-------|-------|---------|-----------|------|
| [Risco] | Alta | Alto | [Ação] | [Quem] |

---

## 5. Cronograma

| Fase | Início | Fim | Status |
|------|--------|-----|--------|
| Fase 1 | [Data] | [Data] | Pendente |
| Fase 2 | [Data] | [Data] | Pendente |

---

## 6. Definição de Pronto (DoD)

Uma tarefa está PRONTA quando:
- [ ] Código funciona
- [ ] Testes passando
- [ ] Code review aprovado
- [ ] Documentado

---

## Próximos Passos

1. [ ] Aprovar plano
2. [ ] Iniciar Fase 1
3. [ ] Setup do ambiente
```

---

## Após Criar

```
✅ Plano criado com sucesso!

Arquivo: docs/PLANO.md

Resumo:
- [X] fases identificadas
- [X] tarefas estimadas
- [X] riscos mapeados
- [X] critérios de aceite definidos

Próximo passo:
Execute *desenvolver para começar a implementação!
```

---

## Referências

- Protocolo completo: `vibe-coding/PROTOCOLOS/16-PLANEJAR.md`
- PRD: `docs/PRD.md`
- Arquitetura: `docs/ARQUITETURA.md`
