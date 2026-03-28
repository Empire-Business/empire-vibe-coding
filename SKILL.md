---
name: empire-vibe-coding
description: |
  Framework "vibe coding" completo para apps React + TypeScript + Supabase + Vercel.
  Instala e mantém o CLAUDE.md do projeto seguindo o padrão Empire Business, garante
  que a skill /security-auditor está instalada e atualizada globalmente, e executa
  qualquer trabalho de desenvolvimento guiado pelo CLAUDE.md — com tasks 100% do tempo.

  Use SEMPRE que o usuário pedir para começar um projeto novo, codar qualquer feature,
  estruturar documentação, auditar segurança, ou sempre que mencionar "empire",
  "vibe coding", "empire-vibe-coding", ou pedir para "ativar o framework".
  Em projetos novos, esta skill é o primeiro passo obrigatório antes de qualquer código.
---

# Empire Vibe Coding

> Framework de desenvolvimento orientado a clareza, segurança e documentação viva.
> Tudo que você faz aqui é guiado pelo `CLAUDE.md` do projeto e executado com tasks visíveis.

---

## Versão e configuração

| Campo | Valor |
|-------|-------|
| Versão da skill | **1.0** |
| Security-auditor mínimo requerido | **v1.5** |
| GitHub | https://github.com/Empire-Business/empire-vibe-coding |
| State document | `.empire/state.json` (na raiz do projeto do usuário) |

---

## Passo 0 — Criar tasks antes de qualquer ação

**Esta é a regra mais importante da skill: nunca execute nada sem criar tasks primeiro.**

Antes de fazer qualquer coisa, use `TaskCreate` para listar o que será feito. Isso dá ao usuário visibilidade total sobre cada etapa. Não importa se são 2 ou 20 tarefas — todas precisam aparecer antes de começar.

---

## Passo 1 — Detectar fase do projeto

Ao ser ativada, leia o state document para decidir o que fazer:

```bash
# Verificar se o state document existe
cat .empire/state.json
```

**Lógica de decisão:**

| Situação | Ação |
|----------|------|
| `.empire/state.json` não existe | → Fase de Setup (primeira vez) |
| `setup_complete: false` | → Continuar Setup incompleto |
| `setup_complete: true` | → Modo de Trabalho Normal |

Se o usuário pediu explicitamente "verificar atualizações" ou "atualizar skill" → ir direto para a seção **Auto-atualização**.

---

## Fase de Setup

### Tasks obrigatórias (criar todas antes de começar)

```
Task 1: Inicializar state document (.empire/state.json)
Task 2: Verificar e instalar/mesclar CLAUDE.md
Task 3: Verificar e instalar/atualizar skill /security-auditor
Task 4: Finalizar setup — marcar setup_complete: true
```

### Task 1 — State document

Crie a pasta `.empire/` e o arquivo `state.json` se ainda não existirem:

```json
{
  "empire_version": "1.0",
  "setup_complete": false,
  "claude_md_installed": false,
  "claude_md_merged_at": null,
  "security_auditor_installed": false,
  "security_auditor_version": null,
  "last_update_check": null
}
```

Se o arquivo já existe, leia e preserve todos os campos existentes — apenas atualize os campos que forem alterados nesta execução.

Adicione `.empire/` ao `.gitignore` do projeto **somente** se o usuário não quiser versionar o state. Por padrão, pergunte se deve versionar ou não.

### Task 2 — CLAUDE.md

**Cenário A — CLAUDE.md não existe no projeto:**

Copie o conteúdo de `references/modelo-claude.md` (deste repositório da skill) como `CLAUDE.md` na raiz do projeto do usuário. Informe ao usuário que o arquivo foi criado e que ele deve revisar e personalizar as seções marcadas.

**Cenário B — CLAUDE.md já existe:**

Este é o cenário mais delicado. O objetivo é enriquecer sem destruir. Siga esta lógica:

1. Leia o `CLAUDE.md` existente do usuário
2. Leia o template em `references/modelo-claude.md`
3. Para cada seção do template que **não existe** no CLAUDE.md do usuário → adicione ao final
4. Para seções que **já existem** → preserve o conteúdo do usuário sem alteração
5. Se o CLAUDE.md do usuário tiver blocos de documentação longa (>30 linhas numa seção) que não são índices → mova-os para `docs/[NOME-DA-SECAO].md` e substitua no CLAUDE.md por uma linha de referência assim:

   ```
   → Documentação completa em `docs/[NOME-DA-SECAO].md`
   ```

6. Atualize a tabela "Índice de Documentos" do CLAUDE.md para listar os arquivos movidos para `docs/`

**Regra de ouro do merge:** o usuário nunca perde informação. Tudo que estava lá continua — apenas reorganizado.

Após concluir, atualize no state:
```json
"claude_md_installed": true,
"claude_md_merged_at": "<data ISO atual>"
```

### Task 3 — Security Auditor

Verifique se a skill está instalada globalmente e na versão correta:

```bash
# Verificar se existe
cat ~/.claude/skills/security-auditor/CHANGELOG.md | head -5
```

**Lógica de versão:**

1. Se o arquivo não existe → a skill não está instalada
2. Leia a primeira linha `## vX.Y` do CHANGELOG.md para obter a versão instalada
3. Compare com a versão mínima requerida: **v1.5**

| Situação | Ação |
|----------|------|
| Não instalada | Copiar de `bundled-skills/security-auditor/` para `~/.claude/skills/security-auditor/` |
| Versão < v1.5 | Substituir `~/.claude/skills/security-auditor/` com o conteúdo bundled |
| Versão >= v1.5 | Nada a fazer — reportar versão encontrada |

Instalação:
```bash
mkdir -p ~/.claude/skills/security-auditor/references
cp bundled-skills/security-auditor/SKILL.md ~/.claude/skills/security-auditor/
cp bundled-skills/security-auditor/CHANGELOG.md ~/.claude/skills/security-auditor/
cp bundled-skills/security-auditor/references/*.md ~/.claude/skills/security-auditor/references/
```

Após concluir, atualize no state:
```json
"security_auditor_installed": true,
"security_auditor_version": "<versão instalada>"
```

### Task 4 — Finalizar setup

Marque o setup como concluído:

```json
"setup_complete": true
```

Apresente ao usuário um resumo do que foi feito:

```
✅ Setup Empire Vibe Coding concluído

- CLAUDE.md: [instalado / mesclado com projeto existente]
- /security-auditor: [instalado v1.5 / já estava atualizado v1.X]
- State document: .empire/state.json criado

Agora você pode usar esta skill a qualquer momento para codar,
documentar ou auditar segurança. O CLAUDE.md é o seu índice — tudo parte dele.
```

---

## Modo de Trabalho Normal

Quando `setup_complete: true` e o usuário pede qualquer coisa (codar, refatorar, documentar, deletar feature, etc.):

### Regras obrigatórias

**1. Sempre criar tasks primeiro**
Antes de qualquer ação, crie tasks com `TaskCreate` descrevendo cada etapa. Nunca execute sem tasks visíveis.

**2. Ler CLAUDE.md antes de começar**
O `CLAUDE.md` é o ponto de entrada de todo projeto. Leia-o antes de qualquer decisão técnica. Não assuma nada que não esteja documentado lá.

**3. Documentar em `docs/`, indexar no CLAUDE.md**
- Toda documentação técnica vai para `docs/[NOME].md`
- O `CLAUDE.md` é um índice enxuto — aponta para os docs, não os contém
- Após criar ou atualizar qualquer doc, atualize o campo "Atualizado em" da tabela no CLAUDE.md

**4. Sem código morto, sem documentação morta**
Ao remover uma feature ou componente:
- Delete o código
- Delete o arquivo de doc relacionado em `docs/`
- Remova a entrada correspondente no índice do CLAUDE.md
- Remova imports, referências e testes que não servem mais

**5. Seguir a stack obrigatória**
React 18 + TypeScript strict + Vite + Tailwind + shadcn/ui + Supabase + Vercel. Não introduza dependências fora desta stack sem aprovar com o usuário e documentar a decisão em `docs/ARQUITETURA.md`.

**6. Seguir as fases do CLAUDE.md**
Se o projeto ainda não tem PRD, ROADMAP ou ARQUITETURA aprovados → não comece a codar. Siga a trilha obrigatória descrita no CLAUDE.md.

### Quando usar agentes em time

Para tarefas que envolvem múltiplos domínios em paralelo (ex: migração de banco + atualização de UI + testes), use subagentes com o tool `Agent`. Cada agente recebe:
- O contexto do `CLAUDE.md` do projeto
- Sua tarefa específica
- Instrução para usar `TaskCreate` e não agir fora do escopo dado

---

## Auto-atualização

Quando o usuário pedir "verifique atualizações", "atualize a skill" ou similar:

### Tasks a criar

```
Task 1: Verificar instalação git da skill
Task 2: git pull no diretório da skill
Task 3: Comparar versão do security-auditor bundled com instalado
Task 4: Atualizar security-auditor se necessário
Task 5: Registrar last_update_check no state document
Task 6: Reportar ao usuário o que mudou
```

### Execução

```bash
# Task 2: atualizar skill via git
cd ~/.claude/skills/empire-vibe-coding && git pull

# Task 6: mostrar o que mudou no CHANGELOG
git diff HEAD@{1} HEAD -- CHANGELOG.md
```

**Task 3-4:** após o pull, leia `bundled-skills/security-auditor/CHANGELOG.md` para obter a nova versão bundled. Se for maior que a versão instalada em `~/.claude/skills/security-auditor/`, reinstale conforme a lógica da Fase de Setup > Task 3.

**Task 5:** atualize no state do projeto:
```json
"last_update_check": "<data ISO atual>"
```

**Task 6:** apresente ao usuário:
- Versão anterior vs nova versão da skill
- O que mudou (extraído do CHANGELOG.md)
- Se o security-auditor foi atualizado ou já estava na versão mais recente

---

## Referências

| Arquivo | Conteúdo |
|---------|----------|
| `references/modelo-claude.md` | Template padrão do CLAUDE.md a instalar nos projetos |
| `bundled-skills/security-auditor/SKILL.md` | Skill de auditoria de segurança bundled |
| `bundled-skills/security-auditor/CHANGELOG.md` | Versão atual do security-auditor bundled |
| `CHANGELOG.md` | Histórico de versões desta skill |
