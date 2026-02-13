---
trigger: "*manutencao"
aliases: ["*manutenção", "*maintenance"]
---

# Skill: manutencao

## Propósito

Executar tarefas de manutenção do projeto: atualizações, limpeza, monitoramento.

---

## Comportamento

Quando o usuário executar `*manutencao`, você deve:

### 1. Mostrar opções

```
Manutenção do Projeto

O que você precisa fazer?

1. atualizar    - Atualizar dependências
2. limpar       - Remover código morto/arquivos desnecessários
3. auditar      - Verificar segurança e vulnerabilidades
4. health       - Verificar saúde do projeto
5. logs         - Analisar logs recentes

Exemplo: *manutencao atualizar
```

---

## Comando: atualizar

### Dependências npm

```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências (cuidado!)
npm update

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades automáticas
npm audit fix
```

### Checklist de atualização

```
Atualização de Dependências

Antes de atualizar:
- [ ] Branch limpa (git status)
- [ ] Backup/commit recente
- [ ] Testes passando

Após atualizar:
- [ ] Rodar testes
- [ ] Verificar build
- [ ] Testar manualmente

Registrar:
- [ ] Atualizar CHANGELOG.md
```

---

## Comando: limpar

### Código morto

```bash
# Encontrar código não utilizado
npx knip

# Arquivos grandes
find . -type f -size +1M -not -path "./node_modules/*"

# Arquivos antigos
find . -type f -mtime +365 -not -path "./node_modules/*"
```

### Checklist de limpeza

```
Limpeza de Código

Verificar:
- [ ] Imports não utilizados
- [ ] Variáveis não utilizadas
- [ ] Funções não chamadas
- [ ] Arquivos órfãos
- [ ] Comentários desatualizados
- [ ] Console.logs esquecidos
- [ ] Código comentado

Ferramentas:
- ESLint (no-unused-vars)
- knip (código morto)
- TypeScript (verificação de tipos)
```

---

## Comando: auditar

### Segurança

```bash
# Verificar vulnerabilidades npm
npm audit

# Verificar com detalhes
npm audit --json

# Verificar segredos expostos
git secrets --scan
```

### Checklist de segurança

```
Auditoria de Segurança

Dependências:
- [ ] npm audit limpo
- [ ] Dependências atualizadas
- [ ] Sem dependências deprecated

Código:
- [ ] Sem secrets hardcoded
- [ ] Inputs validados
- [ ] Queries parametrizadas
- [ ] Headers de segurança

Ambiente:
- [ ] .env não commitado
- [ ] Secrets em variáveis de ambiente
- [ ] HTTPS habilitado
```

---

## Comando: health

### Verificar saúde

```bash
# Espaço em disco
df -h

# Uso de memória
free -h

# Tamanho de node_modules
du -sh node_modules

# Contagem de arquivos
find . -type f | wc -l
```

### Checklist de saúde

```
Saúde do Projeto

Estrutura:
- [ ] node_modules íntegro
- [ ] .gitignore configurado
- [ ] README atualizado
- [ ] package.json válido

Ambiente:
- [ ] Node.js versão correta
- [ ] Variáveis de ambiente configuradas
- [ ] Banco conectando

Build:
- [ ] Build passa
- [ ] Lint passa
- [ ] Testes passam
```

---

## Comando: logs

### Analisar logs

```bash
# Logs de erro
grep -r "ERROR" logs/

# Logs recentes
tail -100 logs/app.log

# Logs em tempo real
tail -f logs/app.log
```

---

## Manutenção Preventiva

### Semanal

```
Manutenção Semanal

- [ ] npm audit
- [ ] Verificar alerts de segurança
- [ ] Backup do banco
- [ ] Verificar logs de erro
```

### Mensal

```
Manutenção Mensal

- [ ] npm update
- [ ] Revisar dependências
- [ ] Limpar logs antigos
- [ ] Verificar espaço em disco
```

### Trimestral

```
Manutenção Trimestral

- [ ] Atualizar major versions
- [ ] Revisar arquitetura
- [ ] Limpar código morto
- [ ] Auditoria completa de segurança
```

---

## Referências

- Protocolo: `vibe-coding/PROTOCOLOS/04-MANUTENCAO.md`
- Segurança: `vibe-coding/PROTOCOLOS/06-SEGURANCA.md`
