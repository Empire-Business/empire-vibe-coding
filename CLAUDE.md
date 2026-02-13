# Empire Vibe Coding - Sistema de Orquestração

> **LEIA ESTE ARQUIVO PRIMEIRO** - Este é o arquivo principal de configuração do sistema.

---

## REGRA #0 - NUNCA IGNORE ESTE ARQUIVO

Antes de QUALQUER ação, verifique:

- [ ] O comando existe em `vibe-coding/COMANDOS.md`?
- [ ] O fluxo correto está sendo seguido? (PRD → Arquitetura → Plano → Desenvolvimento)
- [ ] A documentação está sendo criada/atualizada?

---

## BLOQUEIOS OBRIGATÓRIOS

### NUNCA execute código antes de:

1. **Ter PRD criado** (`docs/PRD.md` ou `docs/requisitos.md`)
2. **Ter arquitetura definida** (`docs/ARQUITETURA.md` ou `docs/arquitetura.md`)
3. **Ter plano aprovado** (usar `*planejar`)

### Ordem Obrigatória de Comandos

```
*prd         → Cria PRD (documento de requisitos)     [OBRIGATÓRIO PRIMEIRO]
*arquitetura → Define arquitetura técnica             [OBRIGATÓRIO SEGUNDO]
*planejar    → Cria plano de implementação            [RECOMENDADO]
*desenvolver → Começa a desenvolver                   [SÓ APÓS OS ANTERIORES]
```

### Verificação Automática

Antes de executar `*desenvolver`, o sistema verifica:

```bash
# Verifica se PRD existe
if [ ! -f "docs/PRD.md" ] && [ ! -f "docs/requisitos.md" ]; then
    echo "ERRO: PRD não encontrado!"
    echo "Execute *prd primeiro para criar o documento de requisitos."
    exit 1
fi

# Verifica se arquitetura existe
if [ ! -f "docs/ARQUITETURA.md" ] && [ ! -f "docs/arquitetura.md" ]; then
    echo "ERRO: Arquitetura não encontrada!"
    echo "Execute *arquitetura para definir a arquitetura técnica."
    exit 1
fi
```

---

## COMANDOS DISPONÍVEIS

Ver `vibe-coding/COMANDOS.md` para lista completa (29 comandos).

### Comandos Principais

| Comando | Função | Quando usar |
|---------|--------|-------------|
| `*começar` | Tutorial inicial | Primeira vez usando o sistema |
| `*prd` | Criar PRD | Início de qualquer projeto |
| `*arquitetura` | Definir arquitetura | Após PRD estar pronto |
| `*planejar` | Criar plano detalhado | Após arquitetura definida |
| `*desenvolver` | Modo desenvolvimento | Após plano aprovado |
| `*bug` | Corrigir problema | Quando encontrar bugs |
| `*erro` | Resolver erro | Quando tiver mensagens de erro |
| `*garantir` | Aprovar mudanças | Antes de lançar em produção |

### Comandos de Documentação

| Comando | Função |
|---------|--------|
| `*roadmap` | Ver/atualizar roadmap |
| `*decisão` | Registrar decisão arquitetural |
| `*mudança` | Registrar mudança no changelog |
| `*status` | Ver status atual do projeto |

### Comandos de Qualidade

| Comando | Função |
|---------|--------|
| `*seguranca` | Auditoria OWASP Top 10 |
| `*qualidade` | Verificar código |
| `*garantir` | **Único que pode aprovar mudanças** |
| `*revisar` | Code review |

### Comandos Especiais

| Comando | Função |
|---------|--------|
| `*agentes` | Criar times de agentes |
| `*nerd` | Debug profundo e profiling |
| `*api` | Documentar APIs externas |

---

## PROTOCOLOS

Os protocolos estão em `vibe-coding/PROTOCOLOS/`:

| Protocolo | Arquivo | Função |
|-----------|---------|--------|
| Iniciar | `00-INICIAR.md` | Setup inicial do projeto |
| Desenvolver | `01-DESENVOLVER.md` | Fluxo de desenvolvimento |
| Bugs | `02-BUGS.md` | Correção de problemas |
| Melhorar | `03-MELHORAR.md` | Refatoração |
| Manutenção | `04-MANUTENCAO.md` | Tarefas de manutenção |
| Lançar | `05-LANCAR.md` | Checklist de deploy |
| Segurança | `06-SEGURANCA.md` | Auditoria de segurança |
| Qualidade | `07-QUALIDADE.md` | Code review |
| Garantidor | `08-GARANTIDOR.md` | Aprovação de mudanças |
| PRD | `18-PRD.md` | Documento de requisitos |

---

## SISTEMA DE SQUADS

O sistema suporta times de agentes especializados.

### Localização

```
.claude/squads/
├── templates/     # Templates prontos (frontend, backend, fullstack)
├── custom/        # Seus squads personalizados
└── README.md      # Documentação completa
```

### Como usar

```
*agentes
> Quero criar um squad para desenvolvimento frontend
```

### Templates disponíveis

- **frontend.json** - UI Designer + Frontend Dev + Tester
- **backend.json** - Backend Dev + DBA + DevOps
- **fullstack.json** - Time completo

---

## MEMÓRIA DO PROJETO

O sistema mantém memória em `.claude/memory/`:

| Pasta | Conteúdo |
|-------|----------|
| `decisions/` | Decisões arquiteturais (ADRs) |
| `gotchas/` | Lições aprendidas e armadilhas |
| `insights/` | Descobertas importantes |
| `patterns/` | Padrões de código usados |

---

## ESTRUTURA DE DOCUMENTOS

```
docs/
├── PRD.md              # Requisitos do projeto
├── ARQUITETURA.md      # Arquitetura técnica
├── ROADMAP.md          # Planejamento futuro
├── CHANGELOG.md        # Histórico de mudanças
├── DECISIONS.md        # Decisões arquiteturais
└── APIS-DOCS/          # Documentação de APIs externas
    ├── stripe.md
    └── openai.md
```

---

## CHECKLIST DE INICIAÇÃO

Quando iniciar um novo projeto, siga ESTA ORDEM:

1. [ ] Execute `*começar` para ver o tutorial
2. [ ] Execute `*prd` para criar o documento de requisitos
3. [ ] Execute `*arquitetura` para definir a arquitetura
4. [ ] Execute `*planejar` para criar o plano de implementação
5. [ ] Execute `*desenvolver` para começar a codar

---

## BANDEIRAS VERMELHAS

NUNCA execute comandos da lista em `vibe-coding/BANDEIRAS-VERMELHAS.md` sem:

1. Explicar o que o comando faz
2. Pedir confirmação do usuário
3. Ter certeza que não vai destruir dados

---

## GLOSSÁRIO

Se encontrar um termo técnico desconhecido, consulte `vibe-coding/GLOSSARIO.md`.

---

## TROUBLESHOOTING

Se algo der errado, consulte `vibe-coding/TROUBLESHOOTING.md`.

---

## VERSÃO

- **Versão:** 1.0.0
- **Sistema:** Empire Vibe Coding
- **Atualizado:** 2025-02-13
