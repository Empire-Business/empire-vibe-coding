---
trigger: "*desenvolver"
aliases: ["*dev", "*develop"]
---

# Skill: desenvolver

## Propósito

Ativar o modo de desenvolvimento do projeto.

**IMPORTANTE:** Este comando SÓ pode ser executado após:
1. PRD criado (`docs/PRD.md` ou `docs/requisitos.md`)
2. Arquitetura definida (`docs/ARQUITETURA.md` ou `docs/arquitetura.md`)

---

## Verificação Obrigatória

### ANTES de qualquer desenvolvimento, verifique:

```
PASSO 1: Verificar se PRD existe
─────────────────────────────────
Arquivos aceitos:
- docs/PRD.md
- docs/requisitos.md
- docs/prd.md (minúsculas também aceito)

Se NÃO existir:
→ BLOQUEAR execução
→ Mostrar mensagem de erro
→ Orientar para executar *prd primeiro
```

```
PASSO 2: Verificar se Arquitetura existe
─────────────────────────────────────────
Arquivos aceitos:
- docs/ARQUITETURA.md
- docs/arquitetura.md

Se NÃO existir:
→ BLOQUEAR execução
→ Mostrar mensagem de erro
→ Orientar para executar *arquitetura primeiro
```

---

## Fluxo de Bloqueio

### Cenário 1: Sem PRD e sem Arquitetura

```
❌ BLOQUEADO: Não é possível desenvolver ainda!

Faltam documentos obrigatórios:
- [ ] PRD (documento de requisitos)
- [ ] Arquitetura técnica

Execute os comandos na ordem:
1. *prd → Para criar o documento de requisitos
2. *arquitetura → Para definir a arquitetura técnica
3. *desenvolver → Para começar a desenvolver (este comando)

Por que essa ordem?
Codar sem planejar gera retrabalho, dívida técnica e frustração.
```

### Cenário 2: Com PRD, sem Arquitetura

```
⚠️ QUASE LÁ: Falta apenas a arquitetura!

✅ PRD encontrado: docs/PRD.md
❌ Arquitetura não encontrada

Próximo passo:
Execute *arquitetura para definir a arquitetura técnica.

Depois volte aqui com *desenvolver!
```

### Cenário 3: Com PRD e Arquitetura

```
✅ TUDO PRONTO PARA DESENVOLVER!

Documentos encontrados:
✅ PRD: docs/PRD.md
✅ Arquitetura: docs/ARQUITETURA.md

Iniciando modo de desenvolvimento...
[SEGUIR COM O PROTOCOLO DE DESENVOLVIMENTO]
```

---

## Protocolo de Desenvolvimento

Quando todos os documentos existirem, siga o protocolo:

### 1. Ler documentos existentes

```
Antes de começar:
1. Leia docs/PRD.md completamente
2. Leia docs/ARQUITETURA.md completamente
3. Verifique se existe docs/ROADMAP.md
```

### 2. Verificar estado do Git

```bash
git status
git log --oneline -5
```

### 3. Criar branch se necessário

```bash
# Se estiver em main, criar branch de desenvolvimento
git checkout -b feature/nome-da-funcionalidade
```

### 4. Seguir padrão de commits

```
Formato: tipo(escopo): descrição

Tipos:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
- test: testes
- chore: manutenção

Exemplos:
- feat(auth): add login com Google
- fix(cart): resolve cálculo de frete
- docs(readme): update installation steps
```

### 5. Commits frequentes

```
Regra: Cada commit deve fazer UMA coisa só

❌ Ruim: "feat: add login and fix bugs and update UI"
✅ Bom: "feat(auth): add Google OAuth login"
```

### 6. Checklist antes de cada commit

```
- [ ] Código funciona localmente
- [ ] Nenhum console.log esquecido
- [ ] Tipos TypeScript corretos (sem any)
- [ ] Testes passando (se existirem)
- [ ] Lint sem erros
```

---

## Durante o Desenvolvimento

### Se encontrar erro

```
1. Pare e leia a mensagem de erro completamente
2. Se não entender, execute *erro com a mensagem
3. NÃO tente adivinhar a solução
4. NÃO faça mudanças aleatórias esperando funcionar
```

### Se precisar mudar arquitetura

```
1. Pare e documente a mudança
2. Execute *decisão para registrar a mudança
3. Atualize docs/ARQUITETURA.md
4. Só então continue desenvolvendo
```

### Se descobrir novo requisito

```
1. Pare e documente
2. Atualize docs/PRD.md
3. Execute *mudança para registrar
4. Continue desenvolvendo
```

---

## Ferramentas Disponíveis

Durante o desenvolvimento, você pode usar:

- `*bug` - Para corrigir problemas
- `*erro` - Para resolver mensagens de erro
- `*termo` - Para explicar termos técnicos
- `*mudança` - Para registrar mudanças
- `*decisão` - Para registrar decisões arquiteturais
- `*qualidade` - Para verificar qualidade do código
- `*seguranca` - Para verificar segurança

---

## Ao Terminar

### Checklist de finalização

```
- [ ] Funcionalidade completa e testada
- [ ] Código limpo (sem console.log, sem código morto)
- [ ] Commits organizados e descritivos
- [ ] Documentação atualizada
- [ ] PR criado (se usar pull requests)
```

### Próximos passos

```
1. Execute *revisar para code review
2. Execute *seguranca para auditoria
3. Execute *garantir para aprovação
4. Execute *lançar para checklist de deploy
```

---

## Referências

- Protocolo completo: `vibe-coding/PROTOCOLOS/01-DESENVOLVER.md`
- Comandos disponíveis: `vibe-coding/COMANDOS.md`
- Troubleshooting: `vibe-coding/TROUBLESHOOTING.md`
