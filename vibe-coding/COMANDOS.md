# Lista de Comandos - Empire Vibe Coding

## Como Usar

Digite o comando no Claude Code para ativar a função correspondente.

---

## Comandos Principais

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*começar` | Iniciar projeto | Ativa o guia de planejamento, preenche PRD.md |
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
| `*prd` | Gerar PRD completo | PRD com seção leiga e técnica |

## Comandos de Integração

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*api` | Documentar API externa | Pesquisa e documenta API em docs/APIS-DOCS/, **sempre antes de integrar** |

## Comandos de Especialistas

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*nerd` | Problemas complexos | Debug profundo, profiling, otimização |
| `*agentes` | Usar Agent Teams | Cria equipe de agentes para tarefas complexas |
| `*melhorar` | Refatorar código | Sugere melhorias no código |

## Comando de Ajuda

| Comando | Função |
|---------|--------|
| `*ajuda` | Mostra todos os comandos disponíveis |

---

## Exemplos de Uso

### Começar projeto do zero
```
*começar
Quero criar um app de tarefas
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

### Orquestrar solução complexa
```
*orquestrar
Meu app está lento e não sei por quê
```

### Usar agentes para bug complexo
```
*agentes
O app está lento e não sei por quê
```

---

## Fluxo Recomendado para Iniciantes

1. `*começar` → Planeja o projeto
2. `*desenvolver` → Desenvolve features
3. `*mudança` → Documenta cada mudança
4. `*seguranca` → Verifica segurança
5. `*garantir` → Aprova mudanças
6. `*lançar` → Publica o projeto

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
| Especialistas | 3 | nerd, agentes, melhorar |
| **TOTAL** | **29** | |
