# Sistema de Squads - Empire Vibe Coding

## O que são Squads?

Squads são equipes de agentes especializados que trabalham juntos para resolver tarefas complexas. Cada agente tem uma especialidade específica e contribui de forma única para o resultado final.

**Analogia:** Pense como uma equipe de construção civil - tem o arquiteto, o pedreiro, o eletricista, o encanador. Cada um faz sua parte, mas todos trabalham juntos para construir a casa.

---

## PM (Project Manager)

**O dono do projeto.** Responsável por receber pedidos, planejar estratégia, delegar para especialistas e garantir entrega.

| Quando usar | Sempre que o usuário pedir algo e você não souber qual agente chamar |
|-------------|----------------------------------------------------------------------|
| Arquivo | `squads/PM.md` |

**O PM é o orquestrador padrão.** Se você não sabe qual agente usar, use o PM.

---

## Agentes Especializados

| Agente | Especialidade | Quando Usar |
|--------|---------------|-------------|
| **ARCHITECT** | Arquitetura de software | Planejar estrutura, decisões técnicas, banco de dados |
| **DEVELOPER** | Desenvolvimento | Implementar código, features, refatoração |
| **REVIEWER** | Code review | Revisar código, detectar problemas, sugerir melhorias |
| **QA** | Qualidade e testes | Criar testes, validar funcionamento, edge cases |
| **SECURITY** | Segurança | Auditoria de segurança, vulnerabilidades, LGPD |
| **DESIGNER** | Design e UX | Interface, experiência do usuário, acessibilidade |
| **DATA** | Dados e performance | Queries, otimização, analytics |

---

## Como Usar

### Ativar o Sistema de Squads

```
*agentes
[descrição da tarefa complexa]
```

### Exemplos de Uso

```
*agentes
Quero criar um sistema de pagamentos com Stripe

→ Claude vai:
1. Identificar os agentes necessários
2. Criar tarefas com TaskCreate
3. Executar cada agente na ordem correta
4. Reportar progresso
```

---

## Squads Pré-definidos

### Feature Squad
Para desenvolver novas funcionalidades:

```
ARCHITECT → Define arquitetura
    ↓
DEVELOPER → Implementa código
    ↓
REVIEWER → Revisa implementação
    ↓
QA → Testa e valida
```

### Bug Squad
Para corrigir problemas:

```
DEVELOPER → Investiga e corrige
    ↓
QA → Valida correção
    ↓
SECURITY → Verifica se introduziu vulnerabilidades
```

### Performance Squad
Para otimizações:

```
DATA → Identifica gargalos
    ↓
DEVELOPER → Implementa otimizações
    ↓
QA → Valida melhorias
```

### Security Squad
Para auditorias:

```
SECURITY → Faz auditoria completa
    ↓
DEVELOPER → Corrige vulnerabilidades
    ↓
REVIEWER → Revisa correções
```

---

## Fluxo de Trabalho

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. IDENTIFICAR necessidade                                 │
│      └─→ Qual tipo de tarefa?                                │
│      └─→ Quais habilidades são necessárias?                  │
│                                                              │
│   2. SELECIONAR agentes                                      │
│      └─→ Escolher agentes apropriados                        │
│      └─→ Definir ordem de execução                           │
│                                                              │
│   3. CRIAR tarefas                                           │
│      └─→ Usar TaskCreate para cada agente                    │
│      └─→ Definir dependências entre tarefas                  │
│                                                              │
│   4. EXECUTAR sequencialmente                                │
│      └─→ Executar cada agente na ordem                       │
│      └─→ Passar output de um para o próximo                  │
│                                                              │
│   5. REPORTAR progresso                                      │
│      └─→ Mostrar o que cada agente fez                       │
│      └─→ Consolidar resultados finais                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Criando Agentes Customizados

Você pode criar seus próprios agentes em `squads/custom/`:

### Template de Agente Customizado

```markdown
# NOME-DO-AGENTE.md

## Especialidade
[O que este agente faz de melhor]

## Quando Invocar
[Em quais situações chamar este agente]

## Comportamento
[Como este agente deve se comportar]

## Output Padrão
[Qual formato de resposta este agente deve produzir]

## Checklist de Validação
- [ ] Item 1
- [ ] Item 2
```

### Exemplo: Agente de Documentação

```markdown
# DOCUMENTADOR.md

## Especialidade
Criar e manter documentação clara e atualizada

## Quando Invocar
- Após implementar nova funcionalidade
- Quando documentação está desatualizada
- Para criar tutoriais e guias

## Comportamento
1. Ler código existente
2. Identificar pontos que precisam de documentação
3. Criar documentação em linguagem simples
4. Atualizar docs/ relevantes

## Output Padrão
- Arquivo .md atualizado ou criado
- Resumo das mudanças

## Checklist de Validação
- [ ] Linguagem clara e acessível
- [ ] Exemplos práticos incluídos
- [ ] Links funcionando
```

---

## Regras do Sistema de Squads

### Regra #1: Ordem Importa
Os agentes devem ser executados na ordem correta. ARCHITECT antes de DEVELOPER, REVIEWER antes de QA.

### Regra #2: Output de um é Input de outro
O resultado de um agente alimenta o próximo. Mantenha contexto entre execuções.

### Regra #3: Documente Tudo
Cada agente deve atualizar a documentação apropriada em `docs/`.

### Regra #4: Pare em Problemas
Se um agente encontrar um problema crítico, pare e informe o usuário antes de continuar.

---

## Próximos Passos

Para usar o sistema de squads:

1. Digite `*agentes` seguido da descrição da tarefa
2. Aguarde a identificação dos agentes necessários
3. Confirme a execução
4. Acompanhe o progresso de cada agente
5. Revise o resultado final

---

**Dica:** Squads são mais eficientes para tarefas complexas. Para tarefas simples, use os comandos individuais como `*desenvolver` ou `*bug`.
