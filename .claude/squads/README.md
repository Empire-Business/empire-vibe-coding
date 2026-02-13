# Sistema de Squads - Empire Vibe Coding

## O que são Squads?

Squads são times de agentes especializados que trabalham juntos para resolver tarefas complexas.

Cada squad é composto por agentes com papéis específicos que colaboram entre si.

---

## Estrutura de Pastas

```
.claude/squads/
├── templates/         # Squads pré-configurados
│   ├── frontend.json  # Squad de frontend
│   ├── backend.json   # Squad de backend
│   └── fullstack.json # Squad completo
├── custom/            # Seus squads personalizados
│   └── (seus arquivos)
└── README.md          # Esta documentação
```

---

## Como Usar

### Listar squads disponíveis

```
*agentes
> listar
```

### Usar um squad

```
*agentes
> usar frontend
> Quero criar uma página de login com design moderno
```

### Criar novo squad

```
*agentes
> criar
> Nome: meu-squad-personalizado
> Agentes: designer, desenvolvedor, tester
```

---

## Formato de Squad (JSON)

```json
{
  "name": "Nome do Squad",
  "description": "Descrição do que o squad faz",
  "agents": [
    {
      "name": "nome-do-agente",
      "role": "Papel do agente",
      "tools": ["Read", "Write", "Edit", "Bash"],
      "focus": "O que este agente foca"
    }
  ],
  "workflow": [
    "agente1 faz X",
    "agente2 faz Y",
    "agente3 revisa"
  ],
  "outputs": [
    "Arquivos que este squad produz"
  ]
}
```

---

## Squads Disponíveis

### Frontend Squad

**Arquivo:** `templates/frontend.json`

**Agentes:**
- **ui-designer** - Cria interfaces visuais e design
- **frontend-dev** - Implementa componentes React/Vue/etc
- **tester** - Testa componentes e acessibilidade

**Uso ideal:** Desenvolvimento de UI, páginas, componentes

### Backend Squad

**Arquivo:** `templates/backend.json`

**Agentes:**
- **backend-dev** - Implementa lógica de servidor
- **dba** - Modela banco de dados e queries
- **devops** - Configura infraestrutura

**Uso ideal:** APIs, banco de dados, infraestrutura

### Fullstack Squad

**Arquivo:** `templates/fullstack.json`

**Agentes:**
- **ui-designer** - Design de interface
- **frontend-dev** - Desenvolvimento frontend
- **backend-dev** - Desenvolvimento backend
- **dba** - Banco de dados
- **tester** - Testes e QA

**Uso ideal:** Features completas end-to-end

---

## Criando Seu Próprio Squad

### Passo 1: Definir o objetivo

```
O que este squad vai resolver?
Ex: "Criar landing pages de alta conversão"
```

### Passo 2: Identificar agentes necessários

```
Quais especialidades preciso?
Ex: copywriter, designer, frontend-dev
```

### Passo 3: Criar arquivo JSON

Salve em `.claude/squads/custom/seu-squad.json`:

```json
{
  "name": "Landing Page Squad",
  "description": "Cria landing pages de alta conversão",
  "agents": [
    {
      "name": "copywriter",
      "role": "Escreve copy persuasiva",
      "tools": ["Read", "Write", "Edit"],
      "focus": "Headlines, CTAs, benefícios"
    },
    {
      "name": "ui-designer",
      "role": "Design visual atraente",
      "tools": ["Read", "Write", "Edit"],
      "focus": "Layout, cores, tipografia"
    },
    {
      "name": "frontend-dev",
      "role": "Implementa a página",
      "tools": ["Read", "Write", "Edit", "Bash"],
      "focus": "HTML, CSS, JavaScript"
    }
  ],
  "workflow": [
    "copywriter cria a copy",
    "ui-designer cria o layout baseado na copy",
    "frontend-dev implementa"
  ],
  "outputs": [
    "Landing page HTML/CSS",
    "Copy documentada"
  ]
}
```

### Passo 4: Usar o squad

```
*agentes
> usar landing-page
> Criar landing page para curso de marketing digital
```

---

## Workflow de Execução

Quando um squad é ativado:

1. **Leitura do contexto** - Entender o que o usuário quer
2. **Planejamento** - Definir como cada agente vai contribuir
3. **Execução sequencial** - Agentes trabalham em ordem
4. **Integração** - Resultados são combinados
5. **Entrega** - Output final apresentado ao usuário

---

## Agentes Disponíveis

### Agentes Base (em `.claude/agents/`)

| Agente | Papel | Foco |
|--------|-------|------|
| **interlocutor** | Comunicação | Interage com usuário, faz perguntas |
| **relator** | Documentação | Cria relatórios, documenta decisões |
| **especialista** | Técnico | Resolve problemas complexos |

### Como criar novo agente

Crie `.claude/agents/seu-agente/main.md`:

```markdown
# Agente: seu-agente

## Papel
[O que este agente faz]

## Responsabilidades
- [Responsabilidade 1]
- [Responsabilidade 2]

## Ferramentas
- Read
- Write
- Edit
- Bash

## Comportamento
[Como este agente deve se comportar]
```

---

## Dicas

### Escolha o squad certo

- **Frontend só:** Use `frontend.json`
- **Backend só:** Use `backend.json`
- **Feature completa:** Use `fullstack.json`
- **Nenhum encaixa:** Crie seu próprio em `custom/`

### Combinando squads

Você pode usar múltiplos squads em sequência:

```
1. *agentes usar backend
   > Criar API de usuários

2. *agentes usar frontend
   > Criar interface de login
```

### Debugging

Se o squad não funcionar como esperado:

1. Verifique se o JSON está válido
2. Verifique se os agentes existem
3. Verifique o workflow definido
4. Tente com um squad mais simples

---

## Referências

- Comando: `*agentes`
- Protocolos: `vibe-coding/PROTOCOLOS/`
- Agents: `.claude/agents/`
