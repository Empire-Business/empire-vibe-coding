---
## PARA CLAUDE (AI INSTRUCTIONS) - DOCUMENTAÇÃO DE PROJETO

Você deve criar e manter a documentação do projeto do usuário.

═══════════════════════════════════════════════════════════════════════════════
## ESTRUTURA DE PASTAS DO PROJETO
═══════════════════════════════════════════════════════════════════════════════

Quando começar um projeto novo, crie esta estrutura:

```
meu-projeto/
├── project-docs/                    # ← DOCUMENTAÇÃO DO PROJETO
│   ├── PRD.md                       # Product Requirements Document
│   ├── ARCHITECTURE.md              # Arquitetura do projeto
│   ├── DECISIONS.md                 # Decisões tomadas (ADRs)
│   ├── CHANGELOG.md                 # Histórico de mudanças
│   ├── ROADMAP.md                   # Próximos passos
│   └── specs/                       # Especificações técnicas
│       └── [feature-name].md        # Uma spec por feature
│
├── src/                             # Código fonte
├── vibe-coding/                     # Documentação de referência (skills)
└── README.md                        # README público
```

═══════════════════════════════════════════════════════════════════════════════
## CRIAR A ESTRUTURA
═══════════════════════════════════════════════════════════════════════════════

Execute este comando para criar a estrutura:

```bash
mkdir -p project-docs/specs

# Criar arquivos vazios com templates
cat > project-docs/PRD.md << 'EOF'
# Product Requirements Document (PRD)

## Nome do Projeto
[Nome do projeto]

## Visão em 1 frase
[O que o projeto faz em uma frase]

## Problema que resolve
[Qual problema o usuário tem que este projeto resolve]

## Público-alvo
[Quem vai usar]

## Funcionalidades Principais (MVP)
1. [Funcionalidade 1]
2. [Funcionalidade 2]
3. [Funcionalidade 3]

## Funcionalidades Futuras
- [Funcionalidade futura 1]
- [Funcionalidade futura 2]

## Sucesso = ?
[Como saber se o projeto é um sucesso?]

## Restrições
- [Restrição orçamentária, tempo, etc]

## Data de criação
[Data]
EOF

cat > project-docs/ARCHITECTURE.md << 'EOF'
# Arquitetura do Sistema

## Stack Tecnológica
- Frontend: [tecnologia]
- Backend: [tecnologia]
- Banco de dados: [tecnologia]
- Deploy: [plataforma]

## Estrutura de Pastas
[Descrever estrutura]

## Decisões Arquiteturais
Ver arquivo DECISIONS.md

## Diagrama (se necessário)
[Inserir diagrama ou link]

## Integrações Externas
- [API/serviço 1]
- [API/serviço 2]

## Data de criação
[Data]
EOF

cat > project-docs/DECISIONS.md << 'EOF'
# Architecture Decision Records (ADRs)

Formato de cada decisão:
- **Data:** [data]
- **Decisão:** [o que foi decidido]
- **Contexto:** [por que precisava decidir]
- **Opções consideradas:** [quais alternativas]
- **Motivo da escolha:** [por que essa opção]
- **Consequências:** [o que muda com essa decisão]

---

## ADR-001: [Título da decisão]

**Data:** [data]
**Decisão:** [o que foi decidido]
**Contexto:** [por que]
**Opções:** [alternativas]
**Motivo:** [razão]
**Consequências:** [impacto]

EOF

cat > project-docs/CHANGELOG.md << 'EOF'
# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/)

## [Unreleased]
### Added
- [nova funcionalidade]

### Changed
- [mudança em funcionalidade existente]

### Fixed
- [bug corrigido]

### Removed
- [funcionalidade removida]

---

## [1.0.0] - 2024-01-15
### Added
- Versão inicial do projeto

EOF

cat > project-docs/ROADMAP.md << 'EOF'
# Roadmap do Projeto

## Status Atual
[Em que fase o projeto está]

## Próximos Passos (ordem de prioridade)
1. [ ] [Tarefa 1] - [data estimada]
2. [ ] [Tarefa 2] - [data estimada]
3. [ ] [Tarefa 3] - [data estimada]

## Backlog (sem data definida)
- [ ] [Tarefa futura 1]
- [ ] [Tarefa futura 2]

## Concluído
- [x] [Tarefa concluída 1] - [data]

EOF

echo "Estrutura de documentação criada em project-docs/"
```

═══════════════════════════════════════════════════════════════════════════════
## QUANDO ATUALIZAR CADA ARQUIVO
═══════════════════════════════════════════════════════════════════════════════

| ARQUIVO | QUANDO ATUALIZAR |
|---------|------------------|
| **PRD.md** | Ao mudar o escopo do projeto ou adicionar features grandes |
| **ARCHITECTURE.md** | Ao mudar tecnologia ou estrutura do projeto |
| **DECISIONS.md** | Ao tomar qualquer decisão técnica importante |
| **CHANGELOG.md** | A cada mudança implementada (commit significativo) |
| **ROADMAP.md** | Ao planejar próximos passos ou concluir tarefas |
| **specs/[feature].md** | Ao planejar uma feature nova antes de implementar |

═══════════════════════════════════════════════════════════════════════════════
## REGRA DE OURO: DOCUMENTE MUDANÇAS
═══════════════════════════════════════════════════════════════════════════════

**SEMPRE que fizer uma mudança significativa:**

1. **Atualize o CHANGELOG.md:**

```markdown
## [Unreleased]
### Added
- Nova página de login com autenticação via Google
```

2. **Se for decisão técnica, adicione em DECISIONS.md:**

```markdown
## ADR-002: Usar Google OAuth ao invés de senha

**Data:** 2024-01-15
**Decisão:** Implementar login apenas via Google OAuth
**Contexto:** Usuários esquecem senhas e queremos reduzir fricção
**Opções:** (1) Senha tradicional, (2) Google OAuth, (3) Magic link
**Motivo:** Mais seguro, sem senha para esquecer, rápido
**Consequências:** Usuários precisam ter conta Google
```

3. **Se for feature completa, atualize ROADMAP.md:**

```markdown
## Concluído
- [x] Sistema de login - 2024-01-15
```

═══════════════════════════════════════════════════════════════════════════════
## TEMPLATE DE SPEC DE FEATURE
═══════════════════════════════════════════════════════════════════════════════

Antes de implementar uma feature grande, criar `project-docs/specs/[nome-da-feature].md`:

```markdown
# Spec: [Nome da Feature]

## Descrição
[O que é essa feature]

## Motivação
[Por que precisamos dela]

## Comportamento Esperado
### Cenário de sucesso
[Como funciona quando dá certo]

### Cenários de erro
[O que pode dar errado e como tratar]

## Interface
### Frontend
[Como vai aparecer na tela]

### Backend
[APIs necessárias]

## Banco de Dados
[Tabelas/campos necessários]

## Critérios de Aceite
- [ ] [Critério 1]
- [ ] [Critério 2]
- [ ] [Critério 3]

## Dependências
[Outras features ou sistemas necessários]

## Riscos
[Riscos conhecidos]

## Estimativa
[Tempo estimado]

## Status
[ ] Planejada | [ ] Em desenvolvimento | [ ] Em teste | [x] Concluída
```

═══════════════════════════════════════════════════════════════════════════════
## EXEMPLO PRÁTICO
═══════════════════════════════════════════════════════════════════════════════

> Usuário: "Quero criar um app de tarefas"

**Resposta do Claude:**

> Vou criar a estrutura de documentação do seu projeto primeiro. Isso ajuda a gente a ter clareza do que vamos construir.
>
> [Cria pasta project-docs/ com todos os templates]
>
> Agora vou te fazer algumas perguntas para preencher o PRD:
>
> 1. **Qual o nome do projeto?**
> 2. **Para quem é esse app?** (só você, sua equipe, ou público geral?)
> 3. **Quais são as 3 funcionalidades mais importantes?** (ex: criar tarefa, marcar como feita, categorias)
>
> Me responde e vou preencher a documentação para você!

---
