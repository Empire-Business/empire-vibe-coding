---
trigger: "*nerd"
aliases: ["*debug", "*profiler"]
---

# Skill: nerd

## Propósito

Resolver problemas complexos que exigem debug profundo, profiling ou análise avançada.

---

## Quando Usar

Acione o modo nerd quando:

- Bug que não é resolvido com tentativas normais
- Performance lenta sem causa óbvia
- Erros confusos ou sem mensagem clara
- Precisa de análise profunda de código
- Investigar memory leaks
- Debug de race conditions

---

## Comportamento

Quando o usuário executar `*nerd`, você deve:

### 1. Entender o problema

```
Modo Nerd Ativado

Descreva o problema em detalhes:
- O que está acontecendo?
- Quando acontece?
- Qual comportamento esperado?
- Já tentou algo? O que?
```

### 2. Metodologia de Debug

```
PASSO 1: Reproduzir
────────────────────
- Criar caso de teste mínimo
- Documentar passos exatos
- Verificar se é consistente

PASSO 2: Isolar
────────────────────
- Reduzir escopo
- Comentar código
- Criar versão mínima

PASSO 3: Hipóteses
────────────────────
1. [Hipótese 1] → Como testar
2. [Hipótese 2] → Como testar
3. [Hipótese 3] → Como testar

PASSO 4: Testar
────────────────────
- Uma mudança por vez
- Documentar resultados
- Eliminar possibilidades

PASSO 5: Resolver
────────────────────
- Implementar correção mínima
- Testar que resolve
- Verificar efeitos colaterais
```

---

## Ferramentas de Diagnóstico

### Logs e Debug

```bash
# Logs em tempo real
tail -f logs/app.log

# Filtrar erros
grep -i "error" logs/app.log | tail -50

# Procurar padrões
grep -E "(failed|timeout|error)" logs/app.log
```

### Performance

```bash
# Uso de recursos
top -o %CPU
htop

# Memória
free -h
ps aux --sort=-%mem | head

# Disco
df -h
du -sh * | sort -h
```

### Network

```bash
# Testar conectividade
curl -v https://api.example.com

# Ver portas
lsof -i :3000
netstat -an | grep LISTEN

# DNS
nslookup example.com
dig example.com
```

### Database

```sql
-- Queries lentas
SELECT * FROM pg_stat_statements
ORDER BY total_time DESC LIMIT 10;

-- Conexões ativas
SELECT * FROM pg_stat_activity;

-- Verificar locks
SELECT * FROM pg_locks;
```

---

## Padrões de Problemas

### Memory Leak

```
Sintomas:
- Memória cresce indefinidamente
- App fica lento com o tempo
- Crashes aleatórios

Diagnóstico:
1. Heap snapshot
2. Procurar objetos não liberados
3. Verificar event listeners não removidos
4. Checar closures que capturam contexto
```

### Race Condition

```
Sintomas:
- Resultados inconsistentes
- Bugs intermitentes
- Problemas só sob carga

Diagnóstico:
1. Adicionar logs de timing
2. Verificar operações assíncronas
3. Checar locks e semáforos
4. Analisar ordem de execução
```

### N+1 Query

```
Sintomas:
- Muitas queries ao banco
- Performance degrada com volume
- Logs mostram padrão repetitivo

Diagnóstico:
1. Ativar log de queries
2. Contar queries por requisição
3. Procurar loops com queries
4. Implementar batch loading
```

### Infinite Re-render

```
Sintomas:
- Component renderiza infinitamente
- CPU sobe a 100%
- Browser trava

Diagnóstico:
1. Verificar dependências do useEffect
2. Checar se state é atualizado no render
3. Verificar props que mudam a cada render
4. Usar React DevTools Profiler
```

---

## Relatório de Análise

Após resolver, criar:

```markdown
# Análise: [Título do Problema]

## Problema
[Descrição do que estava acontecendo]

## Sintomas
- Sintoma 1
- Sintoma 2

## Causa Raiz
[O que realmente estava causando]

## Solução
[O que foi feito para resolver]

## Prevenção
[Como evitar que aconteça novamente]

## Tempo de Análise
[Quanto tempo levou]

## Lições Aprendidas
[O que aprendemos]
```

---

## Referências

- Protocolo: `vibe-coding/PROTOCOLOS/17-NERD.md`
- Bugs: `vibe-coding/PROTOCOLOS/02-BUGS.md`
