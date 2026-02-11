# 04-state-management.md

## Arquitetura: State Management

Guia de quando usar cada solução de state management em React/Next.js.

---

## 1. Decision Matrix

### 1.1 Quando Usar Cada Solução

| Estado | Solução | Quando Usar |
|--------|---------|-------------|
| **Server State** | TanStack Query | Dados do servidor (API, DB) |
| **Auth State** | Context + Hook | Login, permissões |
| **UI State** | useState/useReducer | Forms, modals, toggles |
| **Global UI State** | Zustand | Carrinho, sidebar, temas |
| **Atomic State** | Jotai/Zustand | Estado pequeno compartilhado |
| **Complex Global** | Zustand | Múltiplos slices |

### 1.2 Fluxo de Decisão

```
Precisa compartilhar estado?
├─ NÃO → useState/useReducer local
└─ SIM → É dado do servidor?
         ├─ NÃO → É estado global de UI?
         │       ├─ SIM → Zustand
         │       └─ NÃO → Context API (simples) / Jotai (atomic)
         └─ SIM → TanStack Query
```

---

## 2. TanStack Query (Server State)

### 2.1 Configuração

```typescript
// providers/QueryProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            gcTime: 5 * 60 * 1000, // 5 minutos
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 2.2 Hooks de Dados

```typescript
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

export function useUsers() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*')
      if (error) throw error
      return data
    },
  })
}

export function useCreateUser() {
  const supabase = createClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (user: { email: string; name: string }) => {
      const { data, error } = await supabase.from('users').insert(user).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUpdateUser() {
  // Similar, com onSuccess: invalidateQueries
}

export function useDeleteUser() {
  // Similar, com onSuccess: invalidateQueries
}
```

### 2.3 Patterns Avançados

```typescript
// Optimistic Updates
export function useToggleTodo() {
  const supabase = createClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase.from('todos').update({ completed }).eq('id', id)
      if (error) throw error
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], (old: Todo[]) =>
        old.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      )
      return { previousTodos }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// Prefetch
async function prefetchTodo() {
  const queryClient = useQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['todo', '1'],
    queryFn: () => fetchTodo('1'),
  })
}
```

---

## 3. Zustand (Global UI State)

### 3.1 Store Simples

```typescript
// stores/useCartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
```

### 3.2 Store com Slices

```typescript
// stores/useStore.ts
import { create } from 'zustand'
import { createAuthSlice, AuthSlice } from './slices/authSlice'
import { createCartSlice, CartSlice } from './slices/cartSlice'
import { createUISlice, UISlice } from './slices/uiSlice'

export type StoreState = AuthSlice & CartSlice & UISlice

export const useStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
  ...createCartSlice(...args),
  ...createUISlice(...args),
}))

// stores/slices/authSlice.ts
export interface AuthSlice {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

export function createAuthSlice(set: any): AuthSlice {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
  }
}
```

---

## 4. Context API

### 4.1 Quando Usar

```markdown
## Context é apropriado quando:
- State é usado em muitos lugares
- State muda infrequently
- Não precisa de selectors granulares
- Exemplo: Theme, Locale, Auth

## Context NÃO é apropriado quando:
- State muda frequentemente
- Performance é crítica
- Precisa de selectors
```

### 4.2 Exemplo: Theme Context

```typescript
// providers/ThemeProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    let resolved: 'light' | 'dark' = 'light'

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      resolved = theme
    }

    root.classList.add(resolved)
    setResolvedTheme(resolved)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

---

## 5. Jotai (Atomic State)

### 5.1 Exemplo

```typescript
// atoms/counter.ts
import { atom } from 'jotai'

// Átomo simples
export const countAtom = atom(0)

// Átomo derivado (read-only)
export const doubleCountAtom = atom((get) => get(countAtom) * 2)

// Átomo derivado (read-write)
export const multipliedCountAtom = atom(
  (get) => get(countAtom) * 3,
  (get, set, multiplier: number) => {
    set(countAtom, get(countAtom) * multiplier)
  }
)

// Átomo com promises
export const dataAtom = atom(async () => {
  const res = await fetch('/api/data')
  return res.json()
})

// Uso
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## 6. Padrões de Arquitetura

### 6.1 Arquitetura Recommended

```
src/
├── providers/            # Context Providers
│   ├── QueryProvider.tsx
│   ├── ThemeProvider.tsx
│   └── AuthProvider.tsx
├── hooks/
│   ├── useUsers.ts       # TanStack Query hooks
│   ├── useAuth.ts        # Auth logic
│   └── useLocalStorage.ts
├── stores/               # Zustand stores
│   ├── useCartStore.ts
│   └── useUIStore.ts
├── atoms/                # Jotai atoms (se necessário)
│   ├── counter.ts
│   └── filters.ts
└── lib/
    └── state.ts          # State utilities
```

### 6.2 Exemplo Completo

```typescript
// ✅ Componente bem estruturado
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const { data: productDetails } = useQuery({
    queryKey: ['product', product.id],
    queryFn: () => fetchProduct(product.id),
  })

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    })
  }

  return (
    <Card>
      <Card.Header>{product.name}</Card.Header>
      <Card.Content>
        <p>${product.price}</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </Card.Content>
      <Card.Footer>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Footer>
    </Card>
  )
}
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| TanStack Query | https://tanstack.com/query/latest |
| Zustand | https://zustand-demo.pmnd.rs/ |
| Jotai | https://jotai.org/ |
| React Context | https://react.dev/learn/passing-data-deeply-with-context |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
