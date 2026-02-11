---
## PARA CLAUDE (AI INSTRUCTIONS)

Ao guiar o usuário através deste documento:
1. Leia as instruções completamente
2. Explique cada passo em português simples
3. Antes de executar comandos, explique O QUE o comando faz
4. Antes de deletar/modificar dados, CONFIRME com o usuário
5. Use analogias do dia a dia quando possível
6. Se o usuário perguntar sobre um termo técnico, verifique o glossário em GUIA-DO-INICIANTE.md
7. Nunca execute comandos da lista de BANDEIRAS-VERMELHAS.md sem explicar primeiro
8. Pergunte ao usuário se ele entendeu antes de prosseguir
9. Se algo der errado, consulte TROUBLESHOOTING.md
10. Seja paciente - o usuário está aprendendo enquanto constrói
---

# Guia para Iniciantes - Vibe Coding

Este é um guia projetado para pessoas que não conhecem programação e querem usar **vibe coding** (desenvolvimento com IA) para criar projetos.

## O que é Vibe Coding?

**Vibe coding** é quando você usa uma IA (como o Claude) para desenvolver software, sem precisar entender toda a complexidade técnica. Você descreve o que quer em linguagem simples, e a IA escreve o código para você.

### Analogia
Imagine que você é o **arquiteto** e a IA é a **construtora**:
- Você diz: "Quero uma casa com 2 quartos e uma cozinha grande"
- A construtora (IA) constrói a casa exatamente como você pediu
- Você não precisa saber como usar cada ferramenta de construção

## Como Usar Este Guia

### Passo 1: Enviar este README para a IA
Quando você for usar o Claude Code ou qualquer outra IA para desenvolver, comece enviando este documento:

```
"Sou iniciante completo em programação. Vou seguir o guia de documentação para vibe coding.
Por favor, leia o README.md e me guie passo a passo através do processo."
```

### Passo 2: A IA vai te guiar
A IA vai:
- Explicar cada conceito em português simples
- Mostrar comandos do terminal e explicar o que fazem
- Esperar você confirmar antes de executar algo perigoso
- Perguntar se você entendeu antes de prosseguir

### Passo 3: Aprenda enquanto constrói
Ao seguir o guia, você vai aprender conceitos de programação naturalmente, sem se sobrecarregar.

---

## Ordem de Leitura dos Documentos

Para um iniciante completo, siga esta ordem:

### 1. Onde Começar
📄 **Este documento** - Você está aqui!

### 2. Entenda os Conceitos Básicos
📄 **GUIA-DO-INICIANTE.md** - Glossário de termos técnicos explicados de forma simples

### 3. Saiba o que NÃO fazer
📄 **BANDEIRAS-VERMELHAS.md** - Lista de comandos perigosos que nunca deve executar sozinho

### 4. Configure Seu Projeto
📄 **PROTOCOLOS/00-PLANEJAMENTO-INICIAL.md** - Como começar um novo projeto do zero

### 5. Desenvolvimento Diário
📄 **PROTOCOLOS/01-DESENVOLVIMENTO.md** - Como trabalhar com a IA no dia a dia

### 6. Quando Der Errado
📄 **TROUBLESHOOTING.md** - O que fazer quando aparecer erros

---

## Termos Básicos (Explicação Rápida)

Aqui estão os principais termos que você vai ouvir. Para explicações completas, veja `GUIA-DO-INICIANTE.md`.

| Termo | O que é (Simples) |
|-------|-------------------|
| **Repositório** | Uma pasta especial que guarda todo o histórico do seu projeto |
| **Commit** | Como "salvar" uma versão do código (como salvar no Word) |
| **Branch** | Uma cópia do projeto para testar sem quebrar o original |
| **Migration** | Instruções para criar/modificar tabelas no banco de dados |
| **RLS Policy** | Regras de segurança no banco (quem pode ver o que) |
| **Environment Variables** | Dados sensíveis que não ficam no código (senhas, chaves) |
| **Dependencies** | Bibliotecas prontas que o projeto usa (como add-ons) |
| **Middleware** | Código que roda antes de cada requisição (como um porteiro) |

---

## Checklist de Pré-Requisitos

Antes de começar a desenvolver, você precisa ter:

### ✅ Conta no GitHub
[Como criar conta no GitHub (instruções detalhadas em 00-PLANEJAMENTO-INICIAL.md)](#como-criar-uma-conta-no-github)

**O que é:** É onde seu código ficará guardado, como um Google Drive especial para programadores.

**Por que precisa:** Para guardar cópias do seu projeto e poder acessar de qualquer lugar.

### ✅ Conta no Supabase
[Como criar conta no Supabase (instruções detalhadas em 00-PLANEJAMENTO-INICIAL.md)](#como-criar-uma-conta-no-supabase)

**O que é:** É seu banco de dados na nuvem, onde as informações do seu projeto ficam salvas.

**Por que precisa:** Para guardar dados como usuários, produtos, pedidos, etc.

### ✅ VS Code Instalado
[Como instalar VS Code (instruções detalhadas em 00-PLANEJAMENTO-INICIAL.md)](#como-instalar-o-vs-code)

**O que é:** O programa onde você vê e edita os arquivos de código.

**Por que precisa:** É como um editor de texto, mas especializado para código.

---

## Estrutura do Projeto (Explicação Visual)

Seu projeto vai ficar organizado assim:

```
meu-projeto/
├── docs/                           # ← Estes arquivos de documentação
│   ├── README.md                   # ← Este arquivo que você está lendo
│   ├── GUIA-DO-INICIANTE.md        # ← Glossário completo de termos
│   ├── BANDEIRAS-VERMELHAS.md       # ← Comandos perigosos
│   ├── TROUBLESHOOTING.md          # ← O que fazer quando der erro
│   ├── PROTOCOLOS/                 # ← Guia passo a passo
│   ├── ARQUITETURA/                # ← Como o código é organizado
│   ├── DESIGN/                     # ← Como deve parecer visualmente
│   ├── SEGURANCA/                  # ← Como manter seguro
│   └── QUALIDADE/                  # ← Como garantir qualidade
│
├── src/                            # ← O código do seu projeto fica aqui
│   ├── app/                        # ← Páginas do seu site
│   ├── components/                 # ← Blocos reutilizáveis (botões, formulários)
│   ├── features/                   # ← Funcionalidades completas (login, produtos)
│   ├── lib/                        # ← Configurações e utilidades
│   └── types/                      # ← Tipos de dados
│
└── public/                         # ← Arquivos públicos (imagens, ícones)
```

### Analogia de uma Casa

Pense no seu projeto como uma casa:

| Projeto | Casa |
|---------|------|
| `src/app/` | Os cômodos da casa (sala, cozinha, quartos) |
| `src/components/` | Móveis que você pode mover (mesa, cadeira, sofá) |
| `src/features/` | Ambientes completos (escritório, garagem) |
| `src/lib/` | Ferramentas e utensílios (martelo, chave de fenda) |
| `public/` | Decorações (quadros, plantas) |

---

## Como Pedir Coisas à IA (Prompt Patterns Seguros)

### ✅ BONS PROMPTS (Funcionam bem)

> "Crie uma tabela de usuários seguindo o protocolo de segurança do projeto"

> "Adicione validação de email no formulário de login"

> "Crie um componente de botão seguindo os design tokens do projeto"

> "Faça a página de produtos ser responsiva (funcionar em celular)"

### ❌ PERIGOSOS (Evite usar)

> "Otimize todo o projeto" ⚠️ **Pode quebrar tudo**

> "Deleta essa tabela" ⚠️ **Vai apagar todos os dados!**

> "Refatore todo o código" ⚠️ **Vai mudar coisas desnecessariamente**

> "Faz tudo funcionar" ⚠️ **Muito vago - vai confundir a IA**

### Regra de Ouro

**Antes de pedir algo que delete, remova ou apague:**
1. Peça para a IA explicar o que vai fazer
2. Peça para confirmar antes de executar
3. Se mencionar "apagar", "deletar" ou "remover" - PERGUNTE "Isso vai apagar dados?"

---

## Como a IA Vai Te Ajudar

Quando você enviar este documento para o Claude, ele vai:

### 1. Explicar Tudo em Português Simples
Em vez de dizer "execute o comando `git status`", a IA vai dizer:
> "Vamos verificar o que mudou no seu projeto desde o último salvamento. O comando `git status` mostra isso. Dê 'ok' quando estiver pronto e eu vou executar."

### 2. Esperar Sua Confirmação
Antes de fazer algo perigoso, a IA vai perguntar:
> "Vou apagar a tabela 'usuarios' e todos os dados dela. **Tem certeza que quer continuar?** Responda 'sim' para confirmar ou 'não' para cancelar."

### 3. Usar Analogias
Quando explicar conceitos complexos, a IA vai usar exemplos do dia a dia:
> "Um **commit** é como salvar um documento no Word. Cada commit é uma versão diferente, e você pode voltar para qualquer versão anterior se algo der errado."

### 4. Checar Se Você Entendeu
Depois de explicar algo, a IA vai perguntar:
> "Você entendeu o que é um commit? Responda 'sim' se está claro, ou me faça perguntas se ficou confuso."

---

## Quando Pedir Ajuda à IA

Não tenha medo de pedir ajuda! A IA está aqui para te ensinar. Você pode perguntar:

### Perguntas Básicas
> "O que é npm?"

> "Para que serve esse comando?"

> "Onde eu salvo esse arquivo?"

> "Como eu sei se funcionou?"

### Quando Aparecer Erro
> "Apareceu esse erro: [cole o erro aqui]. O que eu faço?"

> "O terminal está mostrando vermelho. Isso é ruim?"

### Quando Não Entender
> "Não entendi o que você disse. Pode explicar de outro jeito?"

> "Isso é muito técnico. Pode usar uma analogia?"

---

## Próximos Passos

Agora que você entende o básico:

1. **Leia o GUIA-DO-INICIANTE.md** para entender todos os termos técnicos
2. **Leia BANDEIRAS-VERMELHAS.md** para saber quais comandos evitar
3. **Vá para 00-PLANEJAMENTO-INICIAL.md** quando estiver pronto para criar seu primeiro projeto

---

## Lembre-se Importante

### Você Não Precisa Saber Tudo
- É normal não entender tudo no início
- Você aprende fazendo, não estudando primeiro
- A IA está aqui para te guiar e corrigir quando errar

### Erros Fazem Parte
- Todo programador errou muito no começo
- Com commits frequentes, você nunca perde trabalho
- Quando algo der errado, a IA ajuda a corrigir

### Pergunte Sempre
- Não tenha vergonha de perguntar o mesmo conceito várias vezes
- Não há perguntas bobas
- Quanto mais você pergunta, mais rápido aprende

---

## Resumo Rápido

| O que você precisa | Onde encontrar |
|--------------------|-----------------|
| Por onde começar | Este documento |
| Glossário de termos | `GUIA-DO-INICIANTE.md` |
| Comandos perigosos | `BANDEIRAS-VERMELHAS.md` |
| Quando der erro | `TROUBLESHOOTING.md` |
| Criar novo projeto | `00-PLANEJAMENTO-INICIAL.md` |
| Desenvolvimento diário | `01-DESENVOLVIMENTO.md` |

---

**Versão:** 1.0.0
**Última atualização:** 2026-02-11
**Responsável:** Claude Code

---

## Pronto para Começar?

Se você entendeu o básico, pode enviar este arquivo para a IA e dizer:

> "Sou iniciante completo. Vou seguir o guia de documentação para vibe coding.
> Por favor, leia o README.md e me guie passo a passo através do processo."

A IA vai te ajudar com todo o resto! 🚀
