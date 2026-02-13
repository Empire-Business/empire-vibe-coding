---
trigger: "*arquitetura"
aliases: ["*architecture", "*tech"]
---

# Skill: arquitetura

## Propósito

Definir a arquitetura técnica do projeto.

**IMPORTANTE:** Este comando deve ser executado APÓS o PRD estar pronto.

---

## Verificação Obrigatória

### ANTES de definir arquitetura, verifique:

```
PASSO 1: Verificar se PRD existe
─────────────────────────────────
Arquivos aceitos:
- docs/PRD.md
- docs/requisitos.md

Se NÃO existir:
→ BLOQUEAR execução
→ Mostrar mensagem de erro
→ Orientar para executar *prd primeiro
```

---

## Comportamento

Quando o usuário executar `*arquitetura`, você deve:

### 1. Verificar se PRD existe

```
Se PRD não existir:
❌ BLOQUEADO: PRD não encontrado!

Para definir a arquitetura, primeiro precisamos saber O QUE vamos construir.

Execute *prd para criar o documento de requisitos.

Depois volte aqui com *arquitetura!
```

### 2. Ler o PRD existente

```
PRD encontrado: docs/PRD.md

Analisando requisitos para definir a arquitetura...
```

### 3. Fazer perguntas técnicas (máx. 5)

```
Para definir a melhor arquitetura, preciso entender:

1. Framework preference? (Next.js, React, Vue, etc)
2. Banco de dados? (PostgreSQL/Supabase, MongoDB, etc)
3. Deployment? (Vercel, AWS, Railway, etc)
4. Tem requisitos especiais de performance?
5. Integrações externas conhecidas?

Responda o que souber, posso sugerir o resto.
```

---

## Estrutura do Documento

Salve em: `docs/ARQUITETURA.md`

```markdown
# Arquitetura Técnica: [Nome do Projeto]

| Campo | Valor |
|-------|-------|
| **Versão** | 1.0.0 |
| **Data** | [Data de hoje] |
| **Autor** | [Responsável] |

---

## 1. Visão Geral

### Stack Tecnológica
| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | [Framework] | [Por que] |
| Backend | [Framework] | [Por que] |
| Banco | [Database] | [Por que] |
| Deploy | [Plataforma] | [Por que] |

### Diagrama de Alto Nível
```
[Diagrama simples ASCII ou descrição]
```

---

## 2. Frontend

### Framework
- **Escolha:** [Framework]
- **Versão:** [Versão]

### Estrutura de Pastas
```
src/
├── app/           # Páginas/routes
├── components/    # Componentes reutilizáveis
├── features/      # Features por domínio
├── hooks/         # Hooks customizados
├── lib/           # Utilities e configs
└── types/         # Tipos TypeScript
```

### State Management
- [Context API / Zustand / Redux / etc]

### Styling
- [Tailwind CSS / CSS Modules / etc]

---

## 3. Backend

### API Design
- **Estilo:** [REST / GraphQL / tRPC]
- **Autenticação:** [Supabase Auth / Clerk / etc]

### Endpoints Principais
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/users | Lista usuários |
| POST | /api/users | Cria usuário |

---

## 4. Banco de Dados

### Schema Principal
```sql
-- Tabelas principais
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ
);
```

### Relacionamentos
```
Users 1:N Orders
Orders N:N Products
```

---

## 5. Integrações

### APIs Externas
| Serviço | Uso | Status |
|---------|-----|--------|
| [Nome] | [Para que] | [Configurado/Pendente] |

### Webhooks
| Evento | Endpoint | Ação |
|--------|----------|------|
| [Evento] | /api/webhooks/[nome] | [O que faz] |

---

## 6. Segurança

### Autenticação
- [Método de auth]

### Autorização
- [Roles/Permissions]

### Proteções
- [ ] CORS configurado
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection

---

## 7. Performance

### Metas
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Estratégias
- [ ] Code splitting
- [ ] Image optimization
- [ ] Caching
- [ ] Lazy loading

---

## 8. Deploy

### Ambientes
| Ambiente | URL | Propósito |
|----------|-----|-----------|
| Development | localhost:3000 | Desenvolvimento local |
| Staging | staging.app.com | Testes |
| Production | app.com | Produção |

### CI/CD
- [Plataforma e workflow]

---

## 9. Monitoramento

### Logs
- [Ferramenta de logs]

### Métricas
- [Ferramenta de métricas]

### Alertas
- [Configuração de alertas]

---

## 10. Decisões Arquiteturais

### ADRs (Architecture Decision Records)
Ver `.claude/memory/decisions/` para decisões detalhadas.

| ID | Decisão | Status |
|----|---------|--------|
| ADR-001 | Usar PostgreSQL | Accepted |

---

## Próximos Passos

1. [ ] Configurar projeto base
2. [ ] Setup do banco de dados
3. [ ] Implementar autenticação
4. [ ] Criar estrutura de pastas
5. [ ] Configurar CI/CD
```

---

## Após Criar

### 1. Mostrar resumo

```
✅ Arquitetura definida com sucesso!

Arquivo: docs/ARQUITETURA.md

Stack escolhida:
- Frontend: [Framework]
- Backend: [Framework]
- Banco: [Database]
- Deploy: [Plataforma]
```

### 2. Orientar próximo passo

```
Próximo passo:
Execute *planejar para criar o plano de implementação detalhado.
```

---

## Referências

- Protocolo: `vibe-coding/PROTOCOLOS/00-INICIAR.md`
- Decisões: `.claude/memory/decisions/`
