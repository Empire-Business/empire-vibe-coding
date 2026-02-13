---
trigger: "*ajuda"
aliases: ["*help", "*?"]
---

# Skill: ajuda

## Propósito

Mostrar todos os comandos disponíveis e como usá-los.

---

## Comportamento

Quando o usuário executar `*ajuda`, mostre:

```
╔══════════════════════════════════════════════════════════════╗
║           EMPIRE VIBE CODING - Comandos Disponíveis          ║
╚══════════════════════════════════════════════════════════════╝

╭─ PRINCIPAIS ─────────────────────────────────────────────────╮
│ *começar     → Tutorial inicial (primeiro uso)               │
│ *prd         → Cria documento de requisitos                  │
│ *arquitetura → Define arquitetura técnica                    │
│ *planejar    → Cria plano de implementação                   │
│ *desenvolver → Modo desenvolvimento                           │
│ *bug         → Corrige problemas e bugs                      │
│ *erro        → Resolve mensagens de erro                     │
╰──────────────────────────────────────────────────────────────╯

╭─ DOCUMENTAÇÃO ───────────────────────────────────────────────╮
│ *roadmap     → Ver/atualizar roadmap                         │
│ *decisão     → Registrar decisão arquitetural                │
│ *mudança     → Registrar mudança no changelog                │
│ *status      → Ver status atual do projeto                   │
╰──────────────────────────────────────────────────────────────╯

╭─ QUALIDADE ──────────────────────────────────────────────────╮
│ *seguranca   → Auditoria de segurança (OWASP)                │
│ *qualidade   → Verificar qualidade do código                 │
│ *garantir    → Único que pode aprovar mudanças               │
│ *revisar     → Code review                                   │
╰──────────────────────────────────────────────────────────────╯

╭─ DESIGN & UX ────────────────────────────────────────────────╮
│ *design      → Configurar Design System                      │
│ *ux          → Aplicar heurísticas de UX                     │
╰──────────────────────────────────────────────────────────────╯

╭─ INFRA & BANCO ──────────────────────────────────────────────╮
│ *banco       → Saúde e diagnóstico do banco                  │
│ *supabase    → Configurar Supabase                           │
╰──────────────────────────────────────────────────────────────╯

╭─ AUTOMAÇÃO ──────────────────────────────────────────────────╮
│ *workflow    → Criar workflows (CI/CD)                       │
│ *orquestrar  → Combinar múltiplos comandos                   │
│ *tarefas     → Gerenciar tarefas do projeto                  │
╰──────────────────────────────────────────────────────────────╯

╭─ ESPECIALISTAS ──────────────────────────────────────────────╮
│ *nerd        → Debug profundo e análise complexa             │
│ *agentes     → Criar times de agentes especializados         │
│ *melhorar    → Refatorar e otimizar código                   │
╰──────────────────────────────────────────────────────────────╯

╭─ INTEGRAÇÃO ─────────────────────────────────────────────────╮
│ *api         → Documentar API externa (antes de integrar!)   │
╰──────────────────────────────────────────────────────────────╯

╭─ OUTROS ─────────────────────────────────────────────────────╮
│ *termo       → Explicar termo técnico                        │
│ *comando     → Verificar se comando é perigoso               │
│ *lançar      → Checklist antes de publicar                   │
│ *especificar → Criar spec de feature específica              │
│ *manutencao  → Tarefas de manutenção                         │
│ *ajuda       → Esta mensagem                                 │
╰──────────────────────────────────────────────────────────────╯

```

---

## Fluxo Recomendado

```
ORDEM OBRIGATÓRIA para novos projetos:

1. *começar     → Ver tutorial
2. *prd         → Criar requisitos
3. *arquitetura → Definir arquitetura
4. *planejar    → Criar plano
5. *desenvolver → Começar a codar

NUNCA pule etapas!
```

---

## Documentação Completa

```
Arquivos de referência:

├── vibe-coding/COMANDOS.md       → Lista completa de comandos
├── vibe-coding/GLOSSARIO.md      → Termos técnicos explicados
├── vibe-coding/TROUBLESHOOTING.md → Resolução de problemas
├── vibe-coding/BANDEIRAS-VERMELHAS.md → Comandos perigosos
└── vibe-coding/PROTOCOLOS/       → Protocolos detalhados
    ├── 00-INICIAR.md
    ├── 01-DESENVOLVER.md
    ├── 02-BUGS.md
    └── ... (22 protocolos)
```

---

## Exemplos de Uso

```bash
# Iniciar projeto
*começar

# Criar PRD
*prd
Quero criar um app de tarefas

# Resolver erro
*erro
TypeError: Cannot read property 'map' of undefined

# Documentar API
*api stripe
```

---

## Dicas

```
1. Sempre comece com *começar se é primeira vez
2. Nunca pule o PRD - ele define o que você vai construir
3. Use *termo quando não entender algo técnico
4. Use *erro quando tiver uma mensagem de erro
5. Use *garantir antes de fazer deploy em produção
```

---

## Referências

- Lista completa: `vibe-coding/COMANDOS.md`
- Glossário: `vibe-coding/GLOSSARIO.md`
