---
## PARA CLAUDE (AI INSTRUCTIONS) - AGENT TEAMS

Você pode criar equipes de agentes para trabalhar em paralelo em tarefas complexas.

═══════════════════════════════════════════════════════════════════════════════
## O QUE SÃO AGENT TEAMS
═══════════════════════════════════════════════════════════════════════════════

Agent Teams permitem que múltiplos Claudes trabalhem juntos:
- **Team Lead:** Você (sessão principal) coordena o trabalho
- **Teammates:** Sessões independentes que executam tarefas

**Vantagem:** Trabalho em paralelo = mais rápido
**Custo:** Mais tokens usados

═══════════════════════════════════════════════════════════════════════════════
## QUANDO USAR AGENT TEAMS
═══════════════════════════════════════════════════════════════════════════════

| SITUAÇÃO | USAR AGENT TEAMS? | POR QUÊ |
|----------|-------------------|---------|
| Bug simples | ❌ Não | Um agente resolve |
| Bug complexo/misterioso | ✅ Sim | Múltiplas hipóteses em paralelo |
| Feature pequena | ❌ Não | Desnecessário |
| Feature grande (multi-arquivo) | ✅ Sim | Dividir trabalho por camada |
| Code review | ✅ Sim | Revisores com focos diferentes |
| Pesquisa de tecnologias | ✅ Sim | Comparar opções em paralelo |
| Refatoração grande | ✅ Sim | Um planeja, um executa, um valida |

═══════════════════════════════════════════════════════════════════════════════
## WORKFLOWS PRONTOS
═══════════════════════════════════════════════════════════════════════════════

### WORKFLOW 1: Investigar Bug Misterioso

```
Crie uma agent team para investigar esse bug.

Spawn 3 teammates:
1. "Hipótese Backend" - investiga se o problema está no servidor/API
2. "Hipótese Frontend" - investiga se o problema está na interface
3. "Hipótese Dados" - investiga se o problema está no banco de dados

Cada um deve testar sua hipótese independentemente e reportar achados.
Deixe-os debater entre si para encontrar a causa raiz.
```

### WORKFLOW 2: Code Review Completo

```
Crie uma agent team para revisar o código.

Spawn 3 revisores:
1. "Revisor de Segurança" - foca em vulnerabilidades, autenticação, permissões
2. "Revisor de Performance" - foca em otimizações, queries lentas, bundle size
3. "Revisor de Qualidade" - foca em testes, legibilidade, padrões

Cada um revisa do seu ângulo e reporta issues encontrados.
```

### WORKFLOW 3: Feature Grande (Multi-camada)

```
Crie uma agent team para implementar a feature [nome].

Spawn 3 desenvolvedores:
1. "Dev Frontend" - implementa a interface e componentes
2. "Dev Backend" - implementa APIs e lógica de negócio
3. "Dev Tests" - implementa testes unitários e de integração

Eles devem trabalhar em paralelo, cada um na sua camada.
O Dev Tests deve criar testes baseados no que os outros implementam.
```

### WORKFLOW 4: Decisão Arquitetural

```
Preciso decidir entre [opção A] e [opção B] para [contexto].

Crie uma agent team para analisar.

Spawn 2 advogados:
1. "Defensor da Opção A" - argumenta a favor de [A], lista vantagens
2. "Defensor da Opção B" - argumenta a favor de [B], lista vantagens

Depois crie um "Juiz" que analisa os argumentos e dá uma recomendação.
```

### WORKFLOW 5: Refatoração Segura

```
Crie uma agent team para refatorar [módulo].

Spawn 3 teammates:
1. "Arquiteto" - planeja a refatoração, identifica riscos
   (REQUER aprovação do plano antes de continuar)
2. "Implementador" - executa a refatoração seguindo o plano
3. "Validador" - roda testes e verifica que nada quebrou

O Arquiteto deve apresentar o plano primeiro. Só após aprovação, o Implementador começa.
```

═══════════════════════════════════════════════════════════════════════════════
## COMO CRIAR UM AGENT TEAM
═══════════════════════════════════════════════════════════════════════════════

### Passo 1: Verificar se Agent Teams está habilitado

```bash
# Verificar variável de ambiente
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS
# Deve retornar: 1
```

Se não estiver habilitado, oriente o usuário:

> "Para usar Agent Teams, você precisa habilitar. Execute isso no terminal:
> ```bash
> export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
> ```
> Ou adicione no settings.json do Claude Code."

### Passo 2: Criar o time com prompt natural

Exemplo de criação:

```
Crie uma agent team com 2 teammates para analisar se devemos usar MongoDB ou PostgreSQL para este projeto. Um teammate defende MongoDB, outro defende PostgreSQL. Eles devem debater e me dar uma recomendação.
```

═══════════════════════════════════════════════════════════════════════════════
## DICAS PARA INICIANTES
═══════════════════════════════════════════════════════════════════════════════

### Explique em linguagem simples:

> "Vou criar uma 'equipe' de assistentes virtuais para trabalhar em paralelo. Cada um vai focar em uma parte diferente do problema, assim a gente resolve mais rápido. É como ter 3 pessoas trabalhando ao mesmo tempo em vez de uma."

### Quando NÃO usar:

- Tarefas simples (um agente resolve)
- Arquivos que precisam ser editados pelo mesmo agente
- Tarefas com muitas dependências entre si

### Quando SIM usar:

- Investigação de bugs difíceis
- Features que tocam frontend E backend E tests
- Decisões importantes que precisam de múltiplas perspectivas
- Code review completo

═══════════════════════════════════════════════════════════════════════════════
## EXEMPLO DE DIÁLOGO
═══════════════════════════════════════════════════════════════════════════════

> Usuário: "Meu app está lento e não sei por quê"

**Resposta:**

> Vou criar uma equipe de investigadores para descobrir a causa em paralelo.
>
> [Cria agent team com 3 teammates: um investiga banco de dados, um investiga frontend, um investiga backend]
>
> Enquanto eles investigam, vou te explicando o que está acontecendo:
> - O "Investigador de Banco" está verificando se as queries estão lentas
> - O "Investigador de Frontend" está verificando se o bundle JavaScript está muito grande
> - O "Investigador de Backend" está verificando se as APIs estão demorando
>
> Assim que alguém encontrar algo, eu te aviso!

---
