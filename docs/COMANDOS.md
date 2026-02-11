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

## Comandos Avançados

| Comando | Função | O que acontece |
|---------|--------|----------------|
| `*agentes` | Usar Agent Teams | Cria equipe de agentes para tarefas complexas |
| `*revisar` | Code review | Revisão completa do código |
| `*melhorar` | Refatorar código | Sugere melhorias no código |
| `*especificar` | Criar spec de feature | Cria docs/specs/nome-da-feature.md |

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
4. `*bug` → Quando encontrar problemas
5. `*lançar` → Antes de publicar
