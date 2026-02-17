---
## PARA CLAUDE (AI INSTRUCTIONS)

IMPORTANTE - LEIA COM ATENÇÃO:

1. Este comando é um TUTORIAL INTERATIVO
2. NÃO crie arquivos automaticamente
3. NÃO implemente código automaticamente
4. SEMPRE mostre o menu e ESPERE a resposta do usuário
5. Apenas DIRECIONE para o comando adequado
---

# 00-COMEÇAR.md - Tutorial Interativo

## Quando Usar

- `*começar` → Usuário quer iniciar algo novo
- Usuário não sabe por onde começar
- Primeira interação com o sistema

---

## COMPORTAMENTO OBRIGATÓRIO

### PASSO 1: Mostrar Menu Interativo

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🚀 BEM-VINDO AO EMPIRE VIBE CODING!                       ║
║                                                               ║
║     Desenvolvimento com IA para iniciantes.                   ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║     O que você quer fazer?                                    ║
║                                                               ║
║     1. 📝 Criar o PRD do meu projeto                          ║
║        → Documento que descreve a ideia completa              ║
║                                                               ║
║     2. 📊 Ver status do projeto atual                         ║
║        → Onde estamos, o que falta, próximos passos           ║
║                                                               ║
║     3. 🔧 Configurar ambiente técnico                         ║
║        → Setup de ferramentas, GitHub, Supabase               ║
║                                                               ║
║     4. 🐛 Reportar um bug ou erro                             ║
║        → Algo não está funcionando como deveria               ║
║                                                               ║
║     5. 💡 Tirar dúvida sobre um termo                         ║
║        → O que significa "commit", "deploy", etc?             ║
║                                                               ║
║     6. 📚 Ver todos os comandos disponíveis                   ║
║        → Lista completa de funcionalidades                    ║
║                                                               ║
║     7. 🤖 Usar agentes especializados                         ║
║        → Para tarefas complexas que precisam de equipe        ║
║                                                               ║
║     8. 🏗️ Preparar projeto para desenvolvimento              ║
║        → Guia completo: PRD + Arquitetura + Roadmap + Design  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Digite o número da opção ou descreva sua necessidade:
```

### PASSO 2: 🛑 STOP_POINT - ESPERAR Resposta

```
🛑 STOP_POINT_PERGUNTA
→ ESPERE o usuário responder
→ NÃO prossiga automaticamente
```

### PASSO 3: Direcionar para Comando Adequado

Baseado na resposta do usuário:

| Opção | Comando | O que fazer |
|-------|---------|-------------|
| 1 - Criar PRD | `*prd` | Leia `18-PRD.md` e siga o protocolo |
| 2 - Ver status | `*status` | Mostre `docs/ROADMAP.md` e resumo |
| 3 - Configurar ambiente | `*setup` | Leia `01-SETUP-TECNICO.md` |
| 4 - Reportar bug | `*bug` | Leia `02-BUGS.md` |
| 5 - Dúvida de termo | `*termo` | Leia `GLOSSARIO.md` |
| 6 - Ver comandos | `*ajuda` | Mostre `COMANDOS.md` |
| 7 - Agentes | `*agentes` | Leia `20-AGENTES.md` |
| 8 - Preparar projeto | Fluxo guiado | Veja seção específica abaixo |

---

## OPÇÃO 8: Preparar Projeto para Desenvolvimento

### Quando o usuário escolhe a opção 8:

```
CLAUDE: Ótimo! Você quer preparar o projeto completo para desenvolvimento.

        Isso vai criar toda a documentação necessária NA ORDEM CERTA:

        1️⃣ PRD         → O QUE vamos construir
        2️⃣ Arquitetura → COMO vamos construir
        3️⃣ Roadmap     → QUANDO vamos construir cada parte
        4️⃣ Design      → COMO VAI FICAR visualmente

        ⚠️ IMPORTANTE:
        - Vou fazer perguntas em cada etapa
        - Você precisa aprovar cada documento antes de continuar
        - NÃO vou implementar código (só documentação)

        Posso começar pelo PRD? (SIM/NÃO)

🛑 STOP_POINT_CONFIRMACAO
```

### Fluxo da Opção 8:

```
SE usuário disser SIM:

  ETAPA 1: *prd
  → Execute o protocolo 18-PRD.md
  → Crie docs/PRD.md
  → PARAR e esperar aprovação

  ETAPA 2: *arquitetura
  → Execute o protocolo 22-ARQUITETURA.md
  → Crie docs/ARQUITETURA/
  → PARAR e esperar aprovação

  ETAPA 3: *roadmap
  → Execute o protocolo 21-ROADMAP.md
  → Crie docs/ROADMAP.md
  → PARAR e esperar aprovação

  ETAPA 4: *design
  → Execute o protocolo 09-DESIGN.md
  → Crie docs/DESIGN/ ou configure Tailwind
  → PARAR e esperar aprovação

  FINALIZAÇÃO:
  → Mostre verificação de pré-requisitos (todos ✅)
  → Pergunte se quer começar a desenvolver (*desenvolver)

SE usuário disser NÃO:
  → Pergunte qual opção do menu ele prefere
```

---

## EXEMPLOS DE INTERAÇÃO

### Exemplo 1: Usuário quer criar PRD

```
USUÁRIO: *começar

CLAUDE: [Mostra menu]

USUÁRIO: 1

CLAUDE: Ótimo! Você quer criar o PRD (documento de requisitos).

        ┌─────────────────────────────────────────────┐
        │  CHECKPOINT                                 │
        │                                             │
        │  VOU FAZER:                                 │
        │  ✓ Fazer algumas perguntas para entender    │
        │    sua ideia                                │
        │  ✓ Criar docs/PRD.md com as respostas       │
        │                                             │
        │  NÃO VOU FAZER:                             │
        │  ✗ Implementar código                       │
        │  ✗ Criar arquivos de programação            │
        │                                             │
        │  Posso continuar?                           │
        └─────────────────────────────────────────────┘

🛑 STOP_POINT_CONFIRMACAO
```

### Exemplo 2: Usuário tem dúvida

```
USUÁRIO: *começar

CLAUDE: [Mostra menu]

USUÁRIO: O que é commit?

CLAUDE: Ah, você quer entender o que é "commit"!

        **Commit** é como "salvar o jogo" no videogame.

        Imagine que você está jogando e faz progresso. Se você não
        salvar, perde tudo se o jogo travar, né?

        No desenvolvimento é a mesma coisa:
        - Cada "commit" é um ponto de salvamento
        - Se algo der errado, você pode voltar para esse ponto

        Quer que eu explique mais termos? Digite *termo [palavra]
        ou escolha uma opção do menu acima.
```

### Exemplo 3: Usuário descreve problema

```
USUÁRIO: *começar
Meu app está dando erro quando faço login

CLAUDE: Entendi! Você está com um problema de login.

        Isso se encaixa na opção 4 (Reportar bug/erro).

        Para te ajudar melhor, vou ativar o protocolo de bugs.
        Você pode me mostrar:

        1. Qual erro aparece na tela?
        2. O que você estava tentando fazer?
        3. Isso sempre acontece ou só às vezes?

        Quer que eu investigue esse erro? (SIM/NÃO)

🛑 STOP_POINT_CONFIRMACAO
```

---

## O QUE NÃO FAZER

### PROIBIDO:

```
❌ Criar arquivos automaticamente
❌ Implementar código sem permissão
❌ Assumir que o usuário quer X ou Y
❌ Pular o menu e ir direto para PRD
❌ Fazer múltiplas perguntas de uma vez
```

### CORRETO:

```
✓ Mostrar menu primeiro
✓ Esperar resposta do usuário
✓ Direcionar para o comando adequado
✓ Fazer uma pergunta de cada vez
✓ Pedir confirmação antes de agir
```

---

## FLUXO VISUAL

```
┌─────────────┐
│  *começar   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Mostrar     │
│ Menu        │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 🛑 ESPERAR  │ ◄── STOP POINT!
│ resposta    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Direcionar  │
│ para comando│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Executar    │
│ comando     │
└─────────────┘
```

---

## SCRIPT DO MENU (copie e cole)

```markdown
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🚀 BEM-VINDO AO EMPIRE VIBE CODING!                       ║
║                                                               ║
║     O que você quer fazer?                                    ║
║                                                               ║
║     1. 📝 Criar PRD do projeto                                ║
║     2. 📊 Ver status do projeto                               ║
║     3. 🔧 Configurar ambiente                                 ║
║     4. 🐛 Reportar bug/erro                                   ║
║     5. 💡 Tirar dúvida sobre termo                            ║
║     6. 📚 Ver todos os comandos                               ║
║     7. 🤖 Usar agentes especializados                         ║
║     8. 🏗️ Preparar projeto para desenvolvimento              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## RESUMO

| Ação | Comportamento |
|------|---------------|
| Menu | SEMPRE mostrar primeiro |
| Espera | PARAR e esperar resposta |
| Direção | Encaminhar para comando adequado |
| Confirmação | PEDIR antes de qualquer ação |

**Lembre-se:** Este comando é um GUIA, não uma ação automática!
