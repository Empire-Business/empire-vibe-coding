# Lista de Comandos - Empire Vibe Coding

## Como Usar

Digite comandos com `*` no Claude Code para ativar o comportamento correspondente.

---

## FLUXO OBRIGATÓRIO DE DOCUMENTAÇÃO

Antes de entrar em desenvolvimento amplo, siga a ordem recomendada:

1. `*prd` - define o que será construído
2. `*arquitetura` - define como será construído
3. `*roadmap` - define ordem e entregas
4. `*design` - define direção visual e UX
5. `*desenvolver` - implementação

Exceções: `*bug`, `*erro`, manutenção simples e ajustes localizados.

---

## Comandos Principais

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*começar` | Iniciar projeto | Tutorial interativo: mostra menu, espera resposta e direciona |
| `*desenvolver` | Modo desenvolvimento | Ativa protocolo de desenvolvimento |
| `*bug` | Reportar problema | Ativa protocolo de correção de bugs |
| `*erro` | Resolver erro | Ajuda guiada para erros de terminal/navegador |
| `*termo` | Explicar termo | Explica termo técnico com linguagem simples |
| `*comando` | Verificar comando | Checa risco antes de executar comandos |
| `*lançar` | Preparar lançamento | Executa checklist pré-publicação |

## Comandos de Documentação

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*roadmap` | Ver/atualizar roadmap | Atualiza `docs/ROADMAP.md` |
| `*decisão` | Registrar decisão | Atualiza `docs/DECISOES.md` |
| `*mudança` | Registrar mudança | Atualiza `docs/MUDANCAS.md` |
| `*arquitetura` | Atualizar arquitetura | Atualiza `docs/ARQUITETURA.md` |
| `*status` | Ver status do projeto | Resume progresso, pendências e próximos passos |

## Comandos de Design & UX

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*design` | Design System | Tokens, cores, tipografia e padronização visual |
| `*ux` | UX Design | Heurísticas, fluxos, acessibilidade e estados |

## Comandos de Qualidade

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*seguranca` | Auditoria de segurança | Checklist OWASP, segredos, superfícies de risco |
| `*qualidade` | Checar qualidade | Revisão de código, estrutura e padrões |
| `*garantir` | Garantidor de qualidade | Único comando que aprova mudanças |
| `*revisar` | Code review | Revisão completa com pontos de risco |

## Comandos de Infra & Banco

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*banco` | Saúde do banco | Diagnóstico de queries, índices e integridade |
| `*supabase` | Configurar Supabase | Setup e validação de configuração Supabase |

## Comandos de Automação

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*workflow` | Criar workflows | CI/CD e automações de projeto |
| `*orquestrar` | Orquestrar comandos | Combina comandos para resolver cenários complexos |
| `*tarefas` | Gerenciar tarefas | Planejamento e acompanhamento task-oriented |
| `*dashboard` | Abrir dashboard | Inicia dashboard local em localhost (somente leitura) |

## Comandos de Planejamento

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*planejar` | Planejamento detalhado | WBS, riscos, estimativas e critérios |
| `*especificar` | Criar spec de feature | Cria documento em `docs/specs/` |
| `*prd` | Gerar PRD completo | Cria documentação de requisitos (sem implementar código) |

## Comandos de Integração

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*api` | Documentar API externa | Pesquisa e documenta API antes da integração |

## Comandos de Especialistas

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*nerd` | Problemas complexos | Diagnóstico profundo e otimização avançada |
| `*agentes` | Usar Agent Teams | Cria líder (PM) e especialistas conforme escopo |
| `*melhorar` | Refatorar código | Propõe melhorias estruturais e técnicas |

## Comando de Ajuda

| Comando | Função |
|---------|--------|
| `*ajuda` | Mostra todos os comandos disponíveis |

---

## Comportamentos essenciais

### `*começar`

- sempre abre menu interativo
- sempre espera resposta do usuário
- não cria arquivos automaticamente

### `*dashboard`

- foco em acompanhamento local
- execução em `localhost`
- API de mutação bloqueada (`403`)

### `*agentes`

- usa líder PM + especialistas
- pode ativar automaticamente quando o escopo exigir coordenação

---

## Resumo por Categoria

| Categoria | Qtd | Comandos |
|-----------|-----|----------|
| Principais | 7 | começar, desenvolver, bug, erro, termo, comando, lançar |
| Documentação | 5 | roadmap, decisão, mudança, arquitetura, status |
| Design & UX | 2 | design, ux |
| Qualidade | 4 | seguranca, qualidade, garantir, revisar |
| Infra & Banco | 2 | banco, supabase |
| Automação | 4 | workflow, orquestrar, tarefas, dashboard |
| Planejamento | 3 | planejar, especificar, prd |
| Integração | 1 | api |
| Especialistas | 3 | nerd, agentes, melhorar |
| Ajuda | 1 | ajuda |
| **TOTAL** | **32** | |

---

## Referências principais

- `vibe-coding/PROTOCOLOS/00-COMEÇAR.md`
- `vibe-coding/PROTOCOLOS/20-AGENTES.md`
- `vibe-coding/PROTOCOLOS/15-TAREFAS.md`
- `vibe-coding/BANDEIRAS-VERMELHAS.md`
