---
trigger: "*especificar"
aliases: ["*spec", "*espec"]
---

# Skill: especificar

## Propósito

Criar especificações detalhadas de features específicas antes de implementar.

---

## Comportamento

Quando o usuário executar `*especificar`, você deve:

### 1. Perguntar sobre a feature

```
Especificação de Feature

Qual feature você quer especificar?
(Descreva brevemente o que quer construir)
```

### 2. Fazer perguntas de detalhamento

```
Para criar uma especificação completa, preciso saber:

1. Qual o objetivo principal?
2. Quem vai usar esta feature?
3. Quais são os inputs?
4. Quais são os outputs esperados?
5. Tem integrações externas?
```

---

## Estrutura da Especificação

Salve em: `docs/specs/[nome-da-feature].md`

```markdown
# Spec: [Nome da Feature]

| Campo | Valor |
|-------|-------|
| **Data** | [Data] |
| **Status** | Draft |
| **Autor** | [Nome] |

---

## 1. Resumo

[Uma frase descrevendo a feature]

---

## 2. Objetivo

[O que esta feature deve alcançar]

---

## 3. Usuários

### Persona Principal
[Quem vai usar]

### Jobs To Be Done
- Quando [contexto], quero [ação], para [resultado]

---

## 4. Requisitos

### Funcionais
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | [Requisito] | MUST |
| RF-02 | [Requisito] | SHOULD |

### Não-Funcionais
| ID | Requisito | Meta |
|----|-----------|------|
| NF-01 | Performance | < 200ms |
| NF-02 | Acessibilidade | WCAG 2.1 AA |

---

## 5. Fluxo de Usuário

### Happy Path
1. Usuário faz X
2. Sistema faz Y
3. Resultado Z

### Fluxos Alternativos
| Condição | Caminho |
|----------|---------|
| Se A | Então B |

### Tratamento de Erros
| Erro | Mensagem | Ação |
|------|----------|------|
| E001 | [Mensagem] | [Ação] |

---

## 6. Interface

### Wireframe
[Descrição ou link para wireframe]

### Componentes
| Componente | Descrição |
|------------|-----------|
| [Nome] | [O que faz] |

### Estados
| Estado | Aparência |
|--------|-----------|
| Loading | [Spinner] |
| Empty | [Mensagem] |
| Error | [Ícone + mensagem] |

---

## 7. API

### Endpoints
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/feature | Cria recurso |

### Payloads

**Request:**
```json
{
  "campo": "valor"
}
```

**Response:**
```json
{
  "id": "123",
  "resultado": "sucesso"
}
```

---

## 8. Dados

### Entidades
| Entidade | Campos |
|----------|--------|
| [Nome] | id, nome, created_at |

### Migrações Necessárias
- [ ] Criar tabela X
- [ ] Adicionar coluna Y

---

## 9. Critérios de Aceite

```gherkin
Cenário: [Nome do cenário]
Dado que [contexto]
Quando [ação]
Então [resultado esperado]
```

---

## 10. Dependências

- [ ] Feature A precisa estar pronta
- [ ] API externa X configurada

---

## 11. Riscos

| Risco | Mitigação |
|-------|-----------|
| [Risco] | [Como prevenir] |

---

## 12. Estimativa

| Fase | Tamanho |
|------|---------|
| Backend | M |
| Frontend | M |
| Testes | S |
| **Total** | **L** |

---

## Próximos Passos

1. [ ] Revisar spec com time
2. [ ] Aprovar spec
3. [ ] Implementar
```

---

## Após Criar

```
✅ Especificação criada!

Arquivo: docs/specs/[nome-da-feature].md

Próximos passos:
1. Revise a especificação
2. Ajuste conforme necessário
3. Use *desenvolver para implementar
```

---

## Referências

- Protocolo PRD: `vibe-coding/PROTOCOLOS/18-PRD.md`
- Planejar: `vibe-coding/PROTOCOLOS/16-PLANEJAR.md`
