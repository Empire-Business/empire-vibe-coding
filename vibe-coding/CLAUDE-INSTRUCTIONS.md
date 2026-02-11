═══════════════════════════════════════════════════════════════════════════════
## EMPIRE VIBE CODING - Comandos e Regras
═══════════════════════════════════════════════════════════════════════════════

Este projeto usa **Empire Vibe Coding** - desenvolvimento com IA para iniciantes.
Consulte a pasta `vibe-coding/` para documentação completa.

═══════════════════════════════════════════════════════════════════════════════
### COMANDOS DO USUÁRIO (começam com *)
═══════════════════════════════════════════════════════════════════════════════

Quando o usuário digitar um comando com `*`, execute a função correspondente:

#### COMANDOS PRINCIPAIS (7)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*começar` | Iniciar projeto | Leia `vibe-coding/PROTOCOLOS/00-INICIAR.md`, guie o planejamento, preencha `docs/PRD.md` |
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
| `*tarefas` | Gerenciar tarefas | Leia `vibe-coding/PROTOCOLOS/15-TAREFAS.md`, use TaskCreate/Update/Get/List |

#### COMANDOS DE PLANEJAMENTO (2)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*planejar` | Planejamento detalhado | Leia `vibe-coding/PROTOCOLOS/16-PLANEJAR.md`, crie WBS, estimativas, riscos |
| `*especificar` | Criar spec | Crie `docs/specs/nome-da-feature.md` |

#### COMANDOS DE ESPECIALISTAS (3)

| Comando | Ação | O que fazer |
|---------|------|-------------|
| `*nerd` | Problemas complexos | Leia `vibe-coding/PROTOCOLOS/17-NERD.md`, debug profundo, profiling, otimização |
| `*agentes` | Usar Agent Teams | Crie equipe de agentes para tarefa complexa |
| `*melhorar` | Refatorar | Leia `vibe-coding/PROTOCOLOS/03-MELHORAR.md` |

#### COMANDO DE AJUDA

| Comando | Ação |
|---------|------|
| `*ajuda` | Liste todos os comandos disponíveis |

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
├── CLAUDE.md              ← VOCÊ ESTÁ AQUI (orquestrador)
├── docs/                   ← DO PROJETO (sempre atualize!)
│   ├── PRD.md
│   ├── ARQUITETURA.md
│   ├── DECISOES.md
│   ├── MUDANCAS.md
│   ├── ROADMAP.md
│   └── specs/
├── vibe-coding/            ← REFERÊNCIA (consulte, não edite)
│   ├── COMANDOS.md
│   ├── COMUNICACAO.md
│   ├── GLOSSARIO.md
│   ├── BANDEIRAS-VERMELHAS.md
│   ├── TROUBLESHOOTING.md
│   └── PROTOCOLOS/
│       ├── 00-INICIAR.md
│       ├── 01-DESENVOLVER.md
│       ├── 02-BUGS.md
│       ├── 03-MELHORAR.md
│       ├── 04-MANUTENCAO.md
│       ├── 05-LANCAR.md
│       ├── 06-SEGURANCA.md
│       ├── 07-QUALIDADE.md
│       ├── 08-GARANTIDOR.md
│       ├── 09-DESIGN.md
│       ├── 10-UX.md
│       ├── 11-BANCO.md
│       ├── 12-SUPABASE.md
│       ├── 13-WORKFLOW.md
│       ├── 14-ORQUESTRAR.md
│       ├── 15-TAREFAS.md
│       ├── 16-PLANEJAR.md
│       └── 17-NERD.md
└── .env.local              ← CREDENCIAIS (nunca commitar!)
```

**docs/** = Documentação DO PROJETO (crie, edite, mantenha atualizada!)
**vibe-coding/** = Documentação de REFERÊNCIA (consulte quando precisar)

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
### CHECKLIST PÓS-MUDANÇA
═══════════════════════════════════════════════════════════════════════════════

Após implementar, verificar:

- [ ] Atualizei `docs/MUDANCAS.md`?
- [ ] Se foi decisão → `docs/DECISOES.md`?
- [ ] Se completei tarefa → `docs/ROADMAP.md`?
- [ ] Se mudei arquitetura → `docs/ARQUITETURA.md`?
- [ ] Passei por `*garantir` (se necessário)?

═══════════════════════════════════════════════════════════════════════════════
### RESUMO DOS 28 COMANDOS
═══════════════════════════════════════════════════════════════════════════════

| Categoria | Comandos |
|-----------|----------|
| Principais (7) | começar, desenvolver, bug, erro, termo, comando, lançar |
| Documentação (5) | roadmap, decisão, mudança, arquitetura, status |
| Design & UX (2) | design, ux |
| Qualidade (4) | seguranca, qualidade, garantir, revisar |
| Infra & Banco (2) | banco, supabase |
| Automação (3) | workflow, orquestrar, tarefas |
| Planejamento (2) | planejar, especificar |
| Especialistas (3) | nerd, agentes, melhorar |

═══════════════════════════════════════════════════════════════════════════════
### INÍCIO RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Para começar um projeto do zero, o usuário deve digitar:

```
*começar
```

Você deve:
1. Perguntar qual é a ideia do projeto
2. Ler `vibe-coding/PROTOCOLOS/00-INICIAR.md`
3. Seguir o protocolo de planejamento
4. Preencher `docs/PRD.md` com as informações
5. Criar `docs/ROADMAP.md` com os próximos passos

Para problemas complexos:

```
*orquestrar [descrição do problema]
```

O orquestrador vai sugerir a sequência de comandos adequada.
