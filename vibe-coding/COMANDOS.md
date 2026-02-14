# Lista de Comandos - Empire Vibe Coding

## Como Usar

Digite o comando no Claude Code para ativar a função correspondente.

---

## Comandos Principais

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*começar` | Iniciar projeto | **Tutorial interativo** - mostra menu, espera resposta, direciona para comando adequado |
| `*desenvolver` | Modo desenvolvimento | Ativa protocolo de desenvolvimento |
| `*bug` | Reportar problema | Ativa protocolo de correção de bugs |
| `*erro` | Resolver erro | Cole o erro e recebe ajuda passo a passo |
| `*termo` | Explicar termo | Pergunte qualquer termo técnico |
| `*comando` | Verificar comando | Verifica se comando é perigoso |
| `*lançar` | Preparar lançamento | Checklist antes de publicar |

## Comandos de Documentação

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*roadmap` | Ver/atualizar roadmap | Mostra próximos passos e progresso |
| `*decisão` | Registrar decisão | Adiciona ADR em DECISIONS.md |
| `*mudança` | Registrar mudança | Atualiza CHANGELOG.md |
| `*arquitetura` | Atualizar arquitetura | Edita ARCHITECTURE.md |
| `*status` | Ver status do projeto | Resumo de onde o projeto está |

## Comandos de Design & UX

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*design` | Design System | Configura cores, tipografia, tokens, Tailwind |
| `*ux` | UX Design | Aplica heurísticas de Nielsen, estados, acessibilidade |

## Comandos de Qualidade

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*seguranca` | Auditoria de segurança | Checklist OWASP Top 10, RLS, npm audit |
| `*qualidade` | Checar qualidade | Code smells, SOLID, métricas, cobertura |
| `*garantir` | Garantidor de qualidade | **Único que pode aprovar mudanças** |
| `*revisar` | Code review | Revisão completa do código |

## Comandos de Infra & Banco

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*banco` | Saúde do banco | Queries de diagnóstico, índices, VACUUM |
| `*supabase` | Configurar Supabase | CLI setup, MCP config, RLS |

## Comandos de Automação

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*workflow` | Criar workflows | GitHub Actions, CI/CD, automações |
| `*orquestrar` | Orquestrar comandos | Combina múltiplos comandos |
| `*tarefas` | Gerenciar tarefas | TaskCreate/Update/Get/List do Claude Code |

## Comandos de Planejamento

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*planejar` | Planejamento detalhado | WBS, estimativas, riscos, critérios |
| `*especificar` | Criar spec de feature | Cria docs/specs/nome-da-feature.md |
| `*prd` | Gerar PRD completo | **Com checkpoints e stop points** - cria documentação, NÃO código |

## Comandos de Integração

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*api` | Documentar API externa | Pesquisa e documenta API em docs/APIS-DOCS/, **sempre antes de integrar** |

## Comandos de Especialistas

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*nerd` | Problemas complexos | Debug profundo, profiling, otimização |
| `*agentes` | Usar Agent Teams | **Sistema de Squads** - cria equipe de agentes especializados |
| `*melhorar` | Refatorar código | Sugere melhorias no código |

## Comando de Ajuda

| Comando | Função |
|---------|--------|
| `*ajuda` | Mostra todos os comandos disponíveis |

---

## Comandos Atualizados

### `*começar` - Tutorial Interativo (NOVO COMPORTAMENTO)

```
╔═══════════════════════════════════════╗
║  BEM-VINDO AO EMPIRE VIBE CODING!     ║
╠═══════════════════════════════════════╣
║  O que você quer fazer?               ║
║                                       ║
║  1. 📝 Criar PRD do projeto           ║
║  2. 📊 Ver status do projeto          ║
║  3. 🐛 Reportar um bug                ║
║  4. 💡 Tirar dúvida sobre termo       ║
║  5. 📚 Ver todos os comandos          ║
║  6. 🤖 Usar agentes especializados    ║
╚═══════════════════════════════════════╝
```

**NÃO cria arquivos automaticamente!**

### `*prd` - Com Checkpoints (NOVO COMPORTAMENTO)

```
┌─────────────────────────────────────────────┐
│  VOU FAZER:                                 │
│  ✓ Fazer perguntas                         │
│  ✓ Criar docs/PRD.md                       │
│                                             │
│  NÃO VOU FAZER:                             │
│  ✗ Implementar código                       │
│  ✗ Criar arquivos de programação            │
│                                             │
│  Posso continuar?                           │
└─────────────────────────────────────────────┘
```

**NÃO implementa código!**

### `*agentes` - Sistema de Squads (NOVO)

```
USUÁRIO: *agentes
Quero criar um sistema de pagamentos

CLAUDE: Agentes selecionados: Feature Squad
        - PM → Orquestrar e garantir entrega
        - ARCHITECT → Planejar
        - DEVELOPER → Implementar
        - REVIEWER → Revisar
        - QA → Testar

        Posso continuar?
```

**O PM é o orquestrador padrão.** Ele recebe o pedido, planeja estratégia, delega para especialistas e garante entrega.

**Usa TaskCreate para coordenar agentes!**

---

## Exemplos de Uso

### Começar projeto do zero
```
*começar
→ Mostra menu interativo
→ Espera sua escolha
→ Direciona para comando adequado
```

### Criar PRD (sem implementar código)
```
*prd
→ Faz perguntas primeiro
→ Cria docs/PRD.md
→ PARA e não implementa código
```

### Resolver um erro
```
*erro
Deu esse erro: npm ERR! code ERESOLVE
```

### Registrar uma decisão
```
*decisão
Vamos usar PostgreSQL ao invés de MongoDB
```

### Ver status do projeto
```
*status
```

### Auditoria de segurança
```
*seguranca
```

### Usar agentes para tarefa complexa
```
*agentes
Quero implementar um sistema de pagamentos com Stripe
→ Cria Feature Squad (PM → ARCHITECT → DEVELOPER → REVIEWER → QA)
```

### Orquestrar solução complexa
```
*orquestrar
Meu app está lento e não sei por quê
```

---

## Fluxo Recomendado para Iniciantes

1. `*começar` → Escolhe opção no menu interativo
2. `*prd` → Cria documentação (não código!)
3. `*desenvolver` → Desenvolve features
4. `*mudança` → Documenta cada mudança
5. `*seguranca` → Verifica segurança
6. `*garantir` → Aprova mudanças
7. `*lançar` → Publica o projeto

---

## Agentes do Sistema de Squads

**PM é o orquestrador padrão.** Se não souber qual agente usar, use o PM.

| Agente | Especialidade | Arquivo |
|--------|---------------|---------|
| **PM** | Orquestração e entrega | squads/PM.md |
| ARCHITECT | Arquitetura de software | squads/ARCHITECT.md |
| DEVELOPER | Desenvolvimento | squads/DEVELOPER.md |
| REVIEWER | Code review | squads/REVIEWER.md |
| QA | Qualidade e testes | squads/QA.md |
| SECURITY | Segurança | squads/SECURITY.md |
| DESIGNER | Design e UX | squads/DESIGNER.md |
| DATA | Dados e performance | squads/DATA.md |

---

## Squads Pré-definidos

| Squad | Agentes | Quando Usar |
|-------|---------|-------------|
| Feature Squad | PM → ARCHITECT → DEVELOPER → REVIEWER → QA | Features novas |
| Bug Squad | PM → DEVELOPER → QA → SECURITY (se crítico) | Correções |
| Performance Squad | PM → DATA → DEVELOPER → QA | Otimizações |
| Security Squad | PM → SECURITY → DEVELOPER → REVIEWER | Auditorias |
| Design Squad | PM → DESIGNER → DEVELOPER → QA | UI/UX |

**PM sempre lidera** — ele é responsável pela entrega.

---

## Resumo por Categoria

| Categoria | Qtd | Comandos |
|-----------|-----|----------|
| Principais | 7 | começar, desenvolver, bug, erro, termo, comando, lançar |
| Documentação | 5 | roadmap, decisão, mudança, arquitetura, status |
| Design & UX | 2 | design, ux |
| Qualidade | 4 | seguranca, qualidade, garantir, revisar |
| Infra & Banco | 2 | banco, supabase |
| Automação | 3 | workflow, orquestrar, tarefas |
| Planejamento | 3 | planejar, especificar, prd |
| Integração | 1 | api |
| Especialistas | 3 | nerd, agentes, melhorar |
| **TOTAL** | **30** | |

---

## Arquivos de Protocolo

| Protocolo | Arquivo |
|-----------|---------|
| Tutorial Interativo | PROTOCOLOS/00-COMEÇAR.md |
| Setup Técnico | PROTOCOLOS/01-SETUP-TECNICO.md |
| Desenvolvimento | PROTOCOLOS/01-DESENVOLVER.md |
| Bugs | PROTOCOLOS/02-BUGS.md |
| PRD Generator | PROTOCOLOS/18-PRD.md |
| API Externa | PROTOCOLOS/19-API.md |
| Sistema de Squads | PROTOCOLOS/20-AGENTES.md |

---

## Regras Fundamentais

### LEI #1: NUNCA PULE ETAPAS
Antes de implementar código: documente, pergunte, confirme.

### LEI #2: DOCUMENTAÇÃO PRIMEIRO
PRIMEIRO criar documentação, DEPOIS implementar código.

### LEI #3: CHECKPOINT OBRIGATÓRIO
Antes de cada ação: explique O QUE vai fazer, O QUE NÃO vai fazer, peça confirmação.

### LEI #4: COMANDOS NÃO SÃO AUTOMÁTICOS
Comandos são GUIAS, não autorizações para fazer tudo automaticamente.

---

**Consulte também:**
- `.claude/custom_instructions.md` - Leis fundamentais
- `vibe-coding/GLOSSARIO.md` - Termos técnicos
- `squads/README.md` - Sistema de agentes
