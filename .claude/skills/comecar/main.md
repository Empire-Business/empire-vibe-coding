---
trigger: "*começar"
aliases: ["*comecar", "*start"]
---

# Skill: começar

## Propósito

Este comando é um **TUTORIAL** que orienta o usuário sobre como usar o sistema.

**IMPORTANTE:** Este comando NUNCA executa código ou cria arquivos automaticamente.
Ele APENAS mostra instruções e orienta o usuário.

---

## Comportamento

Quando o usuário executar `*começar`, você deve:

### 1. Mostrar mensagem de boas-vindas

```
Bem-vindo ao Empire Vibe Coding!

Este sistema ajuda você a desenvolver software usando IA,
mesmo sem conhecimento profundo de programação.
```

### 2. Explicar a ordem obrigatória

```
Para iniciar seu projeto, siga ESTA ORDEM:

1. *prd → Cria o PRD (documento de requisitos)
   └── Define O QUE vamos construir e POR QUE

2. *arquitetura → Define a arquitetura técnica
   └── Define COMO vamos construir tecnicamente

3. *planejar → Cria o plano de implementação
   └── Define QANDO e em que ORDEM vamos construir

4. *desenvolver → Começa a desenvolver
   └── Só execute DEPOIS de completar os passos acima!

```

### 3. Explicar por que essa ordem existe

```
Por que essa ordem?

- PRD primeiro: Sem saber O QUE construir, não podemos codar
- Arquitetura segundo: Sem saber COMO, o código vira bagunça
- Plano terceiro: Sem saber a ORDEM, perdemos tempo retrabalhando
- Desenvolver por último: Só codamos quando tudo está definido

Pular passos = retrabalho garantido!
```

### 4. Perguntar se quer começar

```
Deseja criar o PRD agora?

Digite *prd para começar!
```

### 5. Se o usuário já tiver PRD

Se detectar que `docs/PRD.md` ou `docs/requisitos.md` existe:

```
Ótimo! Você já tem um PRD criado.

Próximo passo: *arquitetura para definir a arquitetura técnica.
```

---

## O que NÃO fazer

- NÃO criar arquivos automaticamente
- NÃO executar código
- NÃO assumir que o usuário quer começar a codar
- NÃO pular etapas do processo

---

## Exemplo de Interação

**Usuário:** *começar

**Resposta:**

> Bem-vindo ao Empire Vibe Coding!
>
> Este sistema ajuda você a desenvolver software usando IA.
>
> Para iniciar seu projeto, siga ESTA ORDEM:
>
> 1. `*prd` → Cria o documento de requisitos
> 2. `*arquitetura` → Define a arquitetura técnica
> 3. `*planejar` → Cria o plano de implementação
> 4. `*desenvolver` → Começa a desenvolver
>
> Por que essa ordem? Porque programar sem planejar gera retrabalho!
>
> Digite `*prd` para criar seu primeiro documento de requisitos!

---

## Verificação de Estado

Antes de responder, verifique:

1. Existe `docs/PRD.md` ou `docs/requisitos.md`?
   - Se sim, informe que pode pular para `*arquitetura`

2. Existe `docs/ARQUITETURA.md` ou `docs/arquitetura.md`?
   - Se sim, informe que pode pular para `*planejar`

3. Qual o estado atual do projeto?
   - Mostre o próximo passo apropriado

---

## Referências

- Protocolo completo: `vibe-coding/PROTOCOLOS/00-INICIAR.md`
- Lista de comandos: `vibe-coding/COMANDOS.md`
