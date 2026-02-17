═══════════════════════════════════════════════════════════════════════════════
## EMPIRE VIBE CODING - Comandos e Regras
═══════════════════════════════════════════════════════════════════════════════

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.
Consulte a pasta `vibe-coding/` para documentação completa.

---

## LEIS FUNDAMENTAIS

> Consulte `.claude/custom_instructions.md` para detalhes completos.

### LEI #1: NUNCA PULE ETAPAS
Antes de implementar código: documente, pergunte, confirme.

### LEI #2: DOCUMENTAÇÃO PRIMEIRO
PRIMEIRO criar documentação, DEPOIS implementar código.

### LEI #3: CHECKPOINT OBRIGATÓRIO
Antes de cada ação: explique O QUE vai fazer, O QUE NÃO vai fazer, peça confirmação.

### LEI #4: COMANDOS NÃO SÃO AUTOMÁTICOS
Comandos são GUIAS, não autorizações para fazer tudo automaticamente.

### LEI #5: DESENVOLVIMENTO BLOQUEADO SEM PRÉ-REQUISITOS

```
ANTES DE *desenvolver, VERIFICAR:

1. [ ] docs/PRD.md existe?
2. [ ] docs/ARQUITETURA.md existe?
3. [ ] docs/ROADMAP.md existe?
4. [ ] Design System definido?

Se QUALQUER item faltar:
🛑 BLOQUEAR desenvolvimento
→ Mostrar o que falta
→ Direcionar para comando correto
→ NÃO PROSSEGUIR até resolver

EXCEÇÕES: *bug, *erro, manutenção simples
```

---

## CICLO DE TRABALHO OBRIGATÓRIO

```
1. ENTENDIMENTO → O que o usuário quer?
2. LEITURA      → Ler o protocolo correspondente
3. CHECKPOINT   → Explicar + Pedir confirmação
4. EXECUÇÃO     → Seguir protocolo EXATAMENTE + PARAR em Stop Points
5. VERIFICAÇÃO  → Documentação atualizada? Checklist completo?
```

---

## CHECKLIST PÓS-AÇÃO (OBRIGATÓRIO)

Após CADA implementação:

- [ ] Atualizei `docs/MUDANCAS.md`?
- [ ] Se foi decisão → `docs/DECISOES.md`?
- [ ] Se completei tarefa → `docs/ROADMAP.md`?
- [ ] Se mudei arquitetura → `docs/ARQUITETURA.md`?
- [ ] Pedi confirmação antes de implementar?
- [ ] Parei em todos os STOP POINTS?

---

═══════════════════════════════════════════════════════════════════════════════
### COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com `*`, execute a função correspondente:

#### COMANDOS PRINCIPAIS (7)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*começar` | Iniciar projeto | Leia `vibe-coding/PROTOCOLOS/00-COMEÇAR.md` - **Tutorial interativo, NÃO criar arquivos automaticamente** |
| `*desenvolver` | Modo dev | Leia `vibe-coding/PROTOCOLOS/01-DESENVOLVER.md`, ative protocolo de desenvolvimento |
| `*bug` | Resolver bug | Leia `vibe-coding/PROTOCOLOS/02-BUGS.md`, investigue e corrija |
| `*erro` | Resolver erro | Leia `vibe-coding/TROUBLESHOOTING.md`, ajude passo a passo |
| `*termo` | Explicar termo | Leia `vibe-coding/GLOSSARIO.md`, explique com analogias |
| `*comando` | Verificar comando | Leia `vibe-coding/BANDEIRAS-VERMELHAS.md`, diga se é perigoso |
| `*lançar` | Preparar lançamento | Leia `vibe-coding/PROTOCOLOS/05-LANCAR.md`, execute checklist |

#### COMANDOS DE DOCUMENTAÇÃO (5)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*roadmap` | Ver/atualizar roadmap | Mostre `docs/ROADMAP.md`, pergunte o que atualizar |
| `*decisão` | Registrar decisão | Adicione ADR em `docs/DECISOES.md` |
| `*mudança` | Registrar mudança | Adicione entrada em `docs/MUDANCAS.md` |
| `*arquitetura` | Atualizar arquitetura | Edite `docs/ARQUITETURA.md` |
| `*status` | Ver status do projeto | Resuma: onde está, o que falta, próximos passos |

#### COMANDOS DE DESIGN & UX (2)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*design` | Design System | Leia `vibe-coding/PROTOCOLOS/09-DESIGN.md`, configure tokens, cores, tipografia |
| `*ux` | UX Design | Leia `vibe-coding/PROTOCOLOS/10-UX.md`, aplique heurísticas de Nielsen |

#### COMANDOS DE QUALIDADE (4)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*seguranca` | Auditoria de segurança | Leia `vibe-coding/PROTOCOLOS/06-SEGURANCA.md`, execute checklist OWASP |
| `*qualidade` | Checar qualidade | Leia `vibe-coding/PROTOCOLOS/07-QUALIDADE.md`, analise code smells, SOLID |
| `*garantir` | Garantidor de qualidade | Leia `vibe-coding/PROTOCOLOS/08-GARANTIDOR.md`, **ÚNICO que pode marcar [x] em MUDANCAS.md** |
| `*revisar` | Code review | Faça revisão completa do código |

#### COMANDOS DE INFRA & BANCO (2)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*banco` | Saúde do banco | Leia `vibe-coding/PROTOCOLOS/11-BANCO.md`, execute queries de diagnóstico |
| `*supabase` | Configurar Supabase | Leia `vibe-coding/PROTOCOLOS/12-SUPABASE.md`, configure CLI/MCP/RLS |

#### COMANDOS DE AUTOMAÇÃO (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*workflow` | Criar workflows | Leia `vibe-coding/PROTOCOLOS/13-WORKFLOW.md`, configure CI/CD, automações |
| `*orquestrar` | Orquestrar comandos | Leia `vibe-coding/PROTOCOLOS/14-ORQUESTRAR.md`, combine múltiplos comandos |
| `*tarefas` | Gerenciar tarefas | Leia `vibe-coding/PROTOCOLOS/15-TAREFAS.md`, use Task tool |

#### COMANDOS DE PLANEJAMENTO (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*planejar` | Planejamento detalhado | Leia `vibe-coding/PROTOCOLOS/16-PLANEJAR.md`, crie WBS, estimativas, riscos |
| `*especificar` | Criar spec | Crie `docs/specs/nome-da-feature.md` |
| `*prd` | Gerar PRD completo | Leia `vibe-coding/PROTOCOLOS/18-PRD.md` - **Com checkpoints, NÃO implementa código** |

#### COMANDOS DE INTEGRAÇÃO (1)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*api` | Documentar API externa | Leia `vibe-coding/PROTOCOLOS/19-API.md`, pesquise e documente API em `docs/APIS-DOCS/`, **SEMPRE antes de integrar** |

#### COMANDOS DE ESPECIALISTAS (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*nerd` | Problemas complexos | Leia `vibe-coding/PROTOCOLOS/17-NERD.md`, debug profundo, profiling, otimização |
| `*agentes` | Usar Agent Teams | Leia `vibe-coding/PROTOCOLOS/20-AGENTES.md` - líder + subagentes |
| `*melhorar` | Refatorar | Leia `vibe-coding/PROTOCOLOS/03-MELHORAR.md` |

#### COMANDO DE AJUDA

| Comando | Ação |
|---------|------|
| `*ajuda` | Liste todos os comandos disponíveis |

---

## COMPORTAMENTO ESPECÍFICO POR COMANDO

### `*começar` - Tutorial Interativo

```
COMPORTAMENTO OBRIGATÓRIO:

1. MOSTRAR menu de opções
2. 🛑 ESPERAR resposta do usuário
3. DIRECIONAR para comando adequado

PROIBIDO: Criar arquivos automaticamente
```

### `*prd` - Gerador de PRD

```
COMPORTAMENTO OBRIGATÓRIO:

1. CHECKPOINT: Explicar que VAI criar documento, NÃO VAI implementar código
2. FAZER perguntas (máx. 5)
3. 🛑 ESPERAR respostas
4. CRIAR docs/PRD.md
5. 🛑 MOSTRAR resultado e esperar aprovação
6. NÃO implementar código

PROIBIDO: Implementar código durante *prd
```

### `*agentes` - Agent Teams

```
COMPORTAMENTO OBRIGATÓRIO:

1. IDENTIFICAR necessidade
2. CRIAR PM-líder com Task tool
3. GERAR plano de especialistas
4. CRIAR subagentes com Task tool
5. EXECUTAR por dependências/paralelismo
6. CONSOLIDAR progresso e resultado final

Consultar: vibe-coding/PROTOCOLOS/20-AGENTES.md
```

### ATIVAÇÃO AUTOMÁTICA DE AGENT TEAMS

Ative Agent Teams mesmo sem `*agentes` quando houver:
- multi-domínio técnico
- alto risco (segurança, auth, pagamentos, dados sensíveis)
- escopo grande com várias frentes

---

═══════════════════════════════════════════════════════════════════════════════
### REGRA #1: DOCUMENTE TUDO
═══════════════════════════════════════════════════════════════════════════════

**SEMPRE que fizer qualquer mudança significativa, VOCÊ DEVE atualizar a documentação:**

1. **Mudança implementada** → `docs/MUDANCAS.md`
2. **Decisão técnica tomada** → `docs/DECISOES.md`
3. **Tarefa concluída** → `docs/ROADMAP.md`
4. **Arquitetura mudou** → `docs/ARQUITETURA.md`

**NUNCA deixe de documentar!**

═══════════════════════════════════════════════════════════════════════════════
### REGRA #2: O COMANDO *garantir É ESPECIAL
═══════════════════════════════════════════════════════════════════════════════

O comando `*garantir` é o **ÚNICO** que pode:
- Marcar checkboxes `[x]` em `docs/MUDANCAS.md`
- Aprovar mudanças para produção
- Gerar assinatura de aprovação

**Nenhum outro comando pode aprovar mudanças diretamente.**

═══════════════════════════════════════════════════════════════════════════════
### ESTRUTURA DE PASTAS
═══════════════════════════════════════════════════════════════════════════════

```
projeto/
├── .claude/                   ← CONFIGURAÇÃO (alta prioridade)
│   ├── custom_instructions.md ← LEIS FUNDAMENTAIS
│   └── settings.json
│
├── CLAUDE.md                  ← VOCÊ ESTÁ AQUI (orquestrador)
├── docs/                       ← DO PROJETO (sempre atualize!)
│   ├── PRD.md
│   ├── ARQUITETURA.md
│   ├── DECISOES.md
│   ├── MUDANCAS.md
│   ├── ROADMAP.md
│   └── specs/
├── vibe-coding/                ← REFERÊNCIA (consulte, não edite)
│   ├── COMANDOS.md
│   ├── COMUNICACAO.md
│   ├── GLOSSARIO.md
│   ├── BANDEIRAS-VERMELHAS.md
│   ├── TROUBLESHOOTING.md
│   └── PROTOCOLOS/
│       ├── 00-COMEÇAR.md       ← Tutorial interativo
│       ├── 01-SETUP-TECNICO.md ← Setup técnico
│       ├── ... (outros)
│       └── 20-AGENTES.md       ← Agent Teams (líder + subagentes)
│
├── squads/                     ← AGENTES ESPECIALIZADOS
│   ├── README.md
│   ├── ARCHITECT.md
│   ├── DEVELOPER.md
│   ├── REVIEWER.md
│   ├── QA.md
│   ├── SECURITY.md
│   ├── DESIGNER.md
│   ├── DATA.md
│   └── custom/                 ← Agentes customizados
│
└── .env.local                  ← CREDENCIAIS (nunca commitar!)
```

**docs/** = Documentação DO PROJETO (crie, edite, mantenha atualizada!)
**vibe-coding/** = Documentação de REFERÊNCIA (consulte quando precisar)
**squads/** = Definições de AGENTES (podem ser estendidos em squads/custom/)

═══════════════════════════════════════════════════════════════════════════════
### REGRAS DE COMUNICAÇÃO
═══════════════════════════════════════════════════════════════════════════════

Consulte `vibe-coding/COMUNICACAO.md` para regras completas.

#### NUNCA use tecniquês

| Não diga | Diga |
|----------|------|
| "deploy" | "publicar na internet" |
| "commit" | "salvar essa versão" |
| "branch" | "cópia separada do projeto" |
| "API" | "sistema que conversa com outro sistema" |
| "banco de dados" | "arquivo de fichas" |

#### USE analogias

- **Commit** = Salvar jogo no videogame
- **Bug** = Buraco na estrada
- **API** = Garçom que leva pedidos
- **Deploy** = Entregar trabalho pro cliente

#### ESTRUTURE respostas

1. O QUE vou fazer
2. POR QUE (se necessário)
3. O QUE PODE DAR ERRADO
4. CONFIRMAÇÃO ("Posso continuar?")

═══════════════════════════════════════════════════════════════════════════════
### ANTES DE EXECUTAR COMANDOS
═══════════════════════════════════════════════════════════════════════════════

1. VERIFIQUE em `vibe-coding/BANDEIRAS-VERMELHAS.md`
2. EXPLIQUE em português simples
3. PERGUNTE se pode continuar

═══════════════════════════════════════════════════════════════════════════════
### SISTEMA DE SQUADS
═══════════════════════════════════════════════════════════════════════════════

### Agentes Disponíveis

| Agente | Especialidade | Arquivo |
|--------|---------------|---------|
| ARCHITECT | Arquitetura de software | squads/ARCHITECT.md |
| DEVELOPER | Desenvolvimento | squads/DEVELOPER.md |
| REVIEWER | Code review | squads/REVIEWER.md |
| QA | Qualidade e testes | squads/QA.md |
| SECURITY | Segurança | squads/SECURITY.md |
| DESIGNER | Design e UX | squads/DESIGNER.md |
| DATA | Dados e performance | squads/DATA.md |

### Squads Pré-definidos

| Squad | Ordem | Quando Usar |
|-------|-------|-------------|
| Feature Squad | ARCHITECT → DEVELOPER → REVIEWER → QA | Features novas |
| Bug Squad | DEVELOPER → QA → SECURITY (se crítico) | Correções |
| Performance Squad | DATA → DEVELOPER → QA | Otimizações |
| Security Squad | SECURITY → DEVELOPER → REVIEWER | Auditorias |
| Design Squad | DESIGNER → DEVELOPER → QA | UI/UX |

═══════════════════════════════════════════════════════════════════════════════
### RESUMO DOS 30 COMANDOS
═══════════════════════════════════════════════════════════════════════════════

| Categoria | Comandos |
|-----------|----------|
| Principais (7) | começar, desenvolver, bug, erro, termo, comando, lançar |
| Documentação (5) | roadmap, decisão, mudança, arquitetura, status |
| Design & UX (2) | design, ux |
| Qualidade (4) | seguranca, qualidade, garantir, revisar |
| Infra & Banco (2) | banco, supabase |
| Automação (3) | workflow, orquestrar, tarefas |
| Planejamento (3) | planejar, especificar, prd |
| Integração (1) | api |
| Especialistas (3) | nerd, agentes, melhorar |

═══════════════════════════════════════════════════════════════════════════════
### INÍCIO RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Para começar um projeto do zero, o usuário deve digitar:

```
*começar
```

Você deve:
1. MOSTRAR menu interativo
2. 🛑 ESPERAR resposta
3. DIRECIONAR para o comando adequado

**NÃO criar arquivos automaticamente!**

Para problemas complexos:

```
*agentes
[descrição do problema]
```

O sistema de squads vai criar equipe apropriada.

---

**Consulte também:**
- `.claude/custom_instructions.md` - Leis fundamentais detalhadas
- `vibe-coding/COMANDOS.md` - Lista completa de comandos
- `squads/README.md` - Documentação do sistema de agentes
