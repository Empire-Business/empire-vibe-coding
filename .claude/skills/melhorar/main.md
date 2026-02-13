---
trigger: "*melhorar"
aliases: ["*improve", "*refactor"]
---

# Skill: melhorar

## Propósito

Identificar melhorias no código, refatorar e otimizar performance.

---

## Comportamento

Quando o usuário executar `*melhorar`, você deve:

### 1. Perguntar o que melhorar

```
Modo de Melhoria

O que você quer melhorar?

1. codigo     - Analisar código e sugerir refatorações
2. performance - Otimizar performance
3. estrutura  - Melhorar estrutura/arquitetura
4. divida     - Mapear dívida técnica

Exemplo: *melhorar codigo src/components/Button.tsx
```

---

## Comando: codigo

### Análise de código

Quando receber um arquivo ou trecho de código:

1. **Identificar code smells**
   - Duplicação
   - Funções longas
   - Nomenclatura ruim
   - Acoplamento alto

2. **Sugerir refatorações**
   - Extrair função
   - Renomear variáveis
   - Simplificar condicionais
   - Remover código morto

3. **Aplicar padrões**
   - Composition over inheritance
   - DRY (Don't Repeat Yourself)
   - Single Responsibility

### Exemplo de análise

```
Análise de: src/components/UserProfile.tsx

Code Smells encontrados:
1. Função loadData muito longa (45 linhas)
2. useEffect sem dependências corretas
3. Estado duplicado entre components

Sugestões:
1. Extrair loadData em funções menores
2. Adicionar userId às dependências do useEffect
3. Usar contexto compartilhado para estado

Quer que eu aplique essas melhorias?
```

---

## Comando: performance

### Checklist de performance

```
Performance Checklist

Frontend:
- [ ] Code splitting implementado
- [ ] Lazy loading de componentes
- [ ] Imagens otimizadas
- [ ] Bundle size < 200KB
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

Backend:
- [ ] Queries otimizadas
- [ ] Índices criados
- [ ] Caching implementado
- [ ] N+1 queries eliminadas
- [ ] API response < 300ms
```

### Otimizações comuns

```typescript
// Memoização
const MemoizedComponent = memo(HeavyComponent)

// Code splitting
const HeavyPage = lazy(() => import('./HeavyPage'))

// Virtualização de listas
import { useVirtualizer } from '@tanstack/react-virtual'

// Debounce
const debouncedSearch = useDebounce(search, 300)

// Image optimization
import Image from 'next/image'
```

---

## Comando: estrutura

### Melhorar estrutura

```
Análise de Estrutura

Verificar:
1. Organização de pastas
2. Separação de responsabilidades
3. Padrões de nomenclatura
4. Módulos bem definidos

Sugestões de reestruturação:
[Lista de mudanças recomendadas]
```

---

## Comando: divida

### Mapear dívida técnica

```markdown
## Inventário de Dívida Técnica

### Alta Prioridade
| Item | Local | Impacto | Estimativa |
|------|-------|---------|------------|
| TODO: validar inputs | api/orders | Alto | 2h |
| FIXME: memory leak | notifications | Alto | 4h |

### Média Prioridade
| Item | Local | Impacto | Estimativa |
|------|-------|---------|------------|
| TODO: componentizar Table | components | Médio | 4h |
| XXX: duplicação auth | services | Médio | 2h |

### Baixa Prioridade
| Item | Local | Impacto | Estimativa |
|------|-------|---------|------------|
| Modernizar RSC | app | Baixo | 2d |

Total estimado: XX horas
```

---

## Checklist de Refatoração

```
Antes de refatorar:
- [ ] Testes passando
- [ ] Coverage documentado
- [ ] Backup/commit feito
- [ ] Entendimento completo do código

Durante:
- [ ] Mudanças pequenas
- [ ] Testar após cada mudança
- [ ] Commits atômicos

Depois:
- [ ] Todos testes passando
- [ ] Performance igual ou melhor
- [ ] Sem bugs novos
- [ ] Documentação atualizada
```

---

## Referências

- Protocolo completo: `vibe-coding/PROTOCOLOS/03-MELHORAR.md`
