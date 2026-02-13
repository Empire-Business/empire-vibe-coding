# Testes do Sistema Empire Vibe Coding

Este documento descreve como verificar se o sistema está funcionando corretamente.

---

## Pré-requisitos

Antes de testar, verifique:

```bash
# Verificar se as skills existem
ls -la .claude/skills/*/main.md

# Deve mostrar 13 arquivos:
# comecar, desenvolver, prd, arquitetura, planejar, agentes,
# manutencao, melhorar, nerd, especificar, tarefas, api, ajuda

# Verificar se settings.json está correto (sem hooks problemáticos)
cat .claude/settings.json | grep -A 5 "hooks"
# Se retornar algo, o hook ainda está presente (remova!)
```

---

## Testes de Skills

### Teste 1: Skill *ajuda

**Execute:**
```
*ajuda
```

**Esperado:**
- Lista todos os comandos disponíveis
- Mostra fluxo recomendado (começar → prd → arquitetura → planejar → desenvolver)
- Não cria nenhum arquivo

---

### Teste 2: Skill *começar

**Execute:**
```
*começar
```

**Esperado:**
- Mostra mensagem de boas-vindas
- Explica a ordem obrigatória dos comandos
- Verifica estado atual (se PRD existe, etc.)
- NÃO cria arquivos automaticamente
- Orienta para executar `*prd`

---

### Teste 3: Skill *prd

**Execute:**
```
*prd
```

**Esperado:**
- Se PRD não existe: Faz perguntas sobre o projeto
- Se PRD existe: Oferece opções (ver, atualizar, sobrescrever)
- Cria/atualiza `docs/PRD.md`

**Teste de alias:**
```
*requisitos
```
**Esperado:** Mesmo comportamento que `*prd`

---

### Teste 4: Skill *arquitetura (sem PRD)

**Execute:**
```
*arquitetura
```

**Se PRD NÃO existe:**
- Mostra erro: "PRD não encontrado"
- Orienta a executar `*prd` primeiro
- NÃO continua

**Se PRD existe:**
- Faz perguntas técnicas
- Cria `docs/ARQUITETURA.md`

---

### Teste 5: Skill *desenvolver (bloqueio sem PRD)

**Execute:**
```
*desenvolver
```

**Se PRD NÃO existe:**
- Mostra erro: "BLOQUEADO: Não é possível desenvolver ainda!"
- Lista documentos faltando
- Orienta a executar na ordem correta
- NÃO permite desenvolvimento

**Se PRD existe mas ARQUITETURA não:**
- Mostra erro: "QUASE LÁ: Falta apenas a arquitetura!"
- Orienta a executar `*arquitetura`

**Se ambos existem:**
- Inicia modo de desenvolvimento
- Mostra checklist de commits
- Segue protocolo de desenvolvimento

---

### Teste 6: Skill *planejar

**Execute:**
```
*planejar
```

**Se PRD/ARQUITETURA não existem:**
- Mostra erro e orienta

**Se existem:**
- Cria WBS (Work Breakdown Structure)
- Estima tarefas
- Cria `docs/PLANO.md` ou `docs/ROADMAP.md`

---

### Teste 7: Skill *agentes

**Execute:**
```
*agentes
```

**Esperado:**
- Mostra opções: listar, usar, criar, info

**Teste de listar:**
```
*agentes listar
```
- Lista squads disponíveis (frontend, backend, fullstack)

---

### Teste 8: Skill *api

**Execute:**
```
*api
```

**Esperado:**
- Pergunta qual API quer documentar
- Exemplos: stripe, openai, sendgrid

**Teste com API específica:**
```
*api stripe
```
- Pesquisa documentação da Stripe
- Cria `docs/APIS-DOCS/stripe.md`

---

### Teste 9: Skill *melhorar

**Execute:**
```
*melhorar
```

**Esperado:**
- Mostra opções: codigo, performance, estrutura, divida

---

### Teste 10: Skill *nerd

**Execute:**
```
*nerd
```

**Esperado:**
- Pergunta sobre o problema
- Oferece metodologia de debug
- Lista ferramentas de diagnóstico

---

### Teste 11: Skill *manutencao

**Execute:**
```
*manutencao
```

**Esperado:**
- Mostra opções: atualizar, limpar, auditar, health, logs

---

### Teste 12: Skill *especificar

**Execute:**
```
*especificar
```

**Esperado:**
- Pergunta qual feature especificar
- Cria spec em `docs/specs/[nome].md`

---

### Teste 13: Skill *tarefas

**Execute:**
```
*tarefas
```

**Esperado:**
- Mostra opções: criar, listar, ver, atualizar, completar

---

## Testes de Fluxo Completo

### Fluxo 1: Novo Projeto

```
1. *começar      → Ver tutorial
2. *prd          → Criar PRD
3. *arquitetura  → Definir arquitetura
4. *planejar     → Criar plano
5. *desenvolver  → Começar a codar
```

**Verificar:**
- [ ] `docs/PRD.md` foi criado
- [ ] `docs/ARQUITETURA.md` foi criado
- [ ] `docs/PLANO.md` foi criado

---

### Fluxo 2: Bloqueio ao Pular Etapas

```
1. *desenvolver (sem PRD)
```

**Esperado:**
- Bloqueia execução
- Mostra mensagem de erro
- Orienta a começar com `*prd`

---

## Verificação Pós-Implementação

### Checklist

- [ ] Hook removido de `.claude/settings.json`
- [ ] Todas as 13 skills têm header com trigger
- [ ] `docs/TESTES-SISTEMA.md` criado
- [ ] Teste manual de `*começar` funciona
- [ ] Teste manual de `*prd` funciona
- [ ] Teste manual de `*desenvolver` bloqueia sem PRD
- [ ] Teste manual de `*ajuda` funciona

---

## Comandos de Diagnóstico

```bash
# Verificar se skills têm trigger header
for f in .claude/skills/*/main.md; do
  echo "=== $f ==="
  head -5 "$f"
done

# Verificar se hook foi removido
cat .claude/settings.json | python3 -m json.tool | grep -A 5 hooks
# Se mostrar "hooks", ainda tem hook (remover!)

# Listar triggers de todas as skills
grep -h "^trigger:" .claude/skills/*/main.md
```

---

## Troubleshooting

### Skill não é encontrada

**Sintoma:** Comando não é reconhecido

**Verificar:**
1. Arquivo `main.md` existe na pasta da skill?
2. Header com `trigger` está presente?
3. Trigger está no formato `*comando`?

### Hook bloqueia operações legítimas

**Sintoma:** Comandos Bash/Edit/Write são bloqueados

**Solução:**
1. Verificar `.claude/settings.json`
2. Remover seção `hooks` se existir
3. Reiniciar sessão do Claude

### Skill não funciona como esperado

**Sintoma:** Skill executa mas não faz o que deveria

**Verificar:**
1. Ler o conteúdo de `.claude/skills/[nome]/main.md`
2. Verificar se o comportamento descrito está correto
3. Ajustar instruções se necessário

---

## Notas

1. **Hooks NÃO são recomendados** para validação de fluxo
2. **Validação deve ser feita dentro das skills**
3. **Nomes ASCII funcionam melhor** para pastas
4. **Aliases permitem variações** de comandos

---

## Versão

- **Versão:** 1.0.0
- **Atualizado:** 2025-02-13
