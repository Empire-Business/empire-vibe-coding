---
trigger: "*agentes"
aliases: ["*agents", "*squad"]
---

# Skill: agentes

## Propósito

Gerenciar e usar times de agentes especializados (squads) para resolver tarefas complexas.

---

## Comportamento

Quando o usuário executar `*agentes`, você deve:

### 1. Mostrar opções disponíveis

```
Sistema de Agentes - Empire Vibe Coding

Opções:
1. listar    - Ver todos os squads disponíveis
2. usar      - Usar um squad específico
3. criar     - Criar um novo squad personalizado
4. info      - Ver detalhes de um squad

Exemplo: *agentes usar frontend
```

---

## Comando: listar

Mostra todos os squads disponíveis:

```
Squads Disponíveis:

Templates (prontos):
├── frontend   - UI Designer + Frontend Dev + Tester
├── backend    - Backend Dev + DBA + DevOps
└── fullstack  - Time completo (5 agentes)

Custom (seus):
└── (nenhum ainda)

Para usar: *agentes usar [nome]
```

---

## Comando: usar

Ativa um squad específico:

```
Usuário: *agentes usar frontend

Resposta:
✅ Squad Frontend ativado!

Agentes:
- ui-designer: Cria interfaces visuais
- frontend-dev: Implementa componentes
- tester: Testa e valida

Workflow:
1. ui-designer cria o design
2. frontend-dev implementa
3. tester valida

Qual tarefa você quer que este squad execute?
```

### Execução com Squad

Quando o usuário descrever a tarefa:

```
Usuário: *agentes usar frontend
Usuário: Criar uma página de login com Google OAuth

Resposta:
Entendido! Vou executar com o Squad Frontend:

[Step 1/3] ui-designer trabalhando...
- Criando layout da página de login
- Definindo componentes: logo, input de email, botão Google
- Design responsivo para mobile e desktop

[Step 2/3] frontend-dev trabalhando...
- Implementando componente LoginForm
- Integrando com Google OAuth
- Adicionando validação de formulário

[Step 3/3] tester trabalhando...
- Testando renderização em diferentes telas
- Verificando fluxo de OAuth
- Validando acessibilidade

✅ Completo!
Arquivos criados:
- src/components/LoginForm.tsx
- src/pages/login.tsx
- src/tests/LoginForm.test.tsx
```

---

## Comando: criar

Guia o usuário a criar um novo squad:

```
Usuário: *agentes criar

Resposta:
Vamos criar seu squad personalizado!

Pergunta 1: Qual o nome do squad?
(ex: landing-page, api-rest, mobile-app)

Pergunta 2: Qual o objetivo deste squad?
(ex: Criar landing pages de alta conversão)

Pergunta 3: Quais agentes você precisa?
Opções disponíveis:
- ui-designer (interface visual)
- frontend-dev (React/Vue/etc)
- backend-dev (APIs/servidor)
- dba (banco de dados)
- devops (infraestrutura)
- tester (QA/testes)
- copywriter (textos)
- Ou digite o nome de um agente customizado

Pergunta 4: Qual a ordem de execução?
(ex: designer → dev → tester)
```

### Salvando o Squad

```
✅ Squad criado com sucesso!

Arquivo: .claude/squads/custom/[nome].json

Para usar: *agentes usar [nome]
```

---

## Comando: info

Mostra detalhes de um squad:

```
Usuário: *agentes info frontend

Resposta:
📦 Squad: Frontend

Descrição:
Time especializado em desenvolvimento de interfaces

Agentes (3):
┌────────────────┬──────────────────────────────┐
│ Agente         │ Papel                        │
├────────────────┼──────────────────────────────┤
│ ui-designer    │ Cria interfaces visuais      │
│ frontend-dev   │ Implementa componentes       │
│ tester         │ Testa e valida               │
└────────────────┴──────────────────────────────┘

Workflow:
1. ui-designer → Design e layout
2. frontend-dev → Implementação
3. tester → Validação
4. frontend-dev → Correções (se necessário)

Melhor para:
- Criação de páginas
- Componentes React/Vue
- Melhorias de UI/UX

Não indicado para:
- Lógica de backend
- Banco de dados
- APIs
```

---

## Squads Padrão

### frontend.json

```json
{
  "name": "Squad Frontend",
  "agents": ["ui-designer", "frontend-dev", "tester"],
  "bestFor": ["UI", "componentes", "páginas"]
}
```

### backend.json

```json
{
  "name": "Squad Backend",
  "agents": ["backend-dev", "dba", "devops"],
  "bestFor": ["APIs", "banco de dados", "infra"]
}
```

### fullstack.json

```json
{
  "name": "Squad Fullstack",
  "agents": ["ui-designer", "frontend-dev", "backend-dev", "dba", "tester"],
  "bestFor": ["features completas", "MVPs"]
}
```

---

## Fluxo de Execução

Quando um squad é ativado:

1. **Carregar** definição do squad do JSON
2. **Ler** contexto do usuário (o que ele quer)
3. **Executar** cada agente na ordem definida
4. **Passar** outputs de um agente como input do próximo
5. **Integrar** resultados no final
6. **Reportar** arquivos criados/modificados

---

## Criando Agente Customizado

Se o usuário precisar de um agente que não existe:

```
Usuário: Preciso de um agente copywriter

Resposta:
O agente 'copywriter' não existe ainda.
Vou criar para você!

O que este agente deve fazer?
→ Escrever textos persuasivos para marketing

Quais ferramentas ele precisa?
→ Read, Write, Edit

Criando agente...
✅ Agente 'copywriter' criado em .claude/agents/copywriter/main.md

Agora você pode usá-lo em seus squads!
```

---

## Referências

- Squads: `.claude/squads/`
- Agents: `.claude/agents/`
- README: `.claude/squads/README.md`
