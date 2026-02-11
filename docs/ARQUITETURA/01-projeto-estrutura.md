# 01-projeto-estrutura.md

## Arquitetura: Estrutura de Projeto

Guia de estrutura de pastas e organização de código para projetos Next.js + Supabase.

---

## 1. Princípios de Organização

### 1.1 Feature-First vs Layer-First

```markdown
## ❌ Layer-First (Evitar)
src/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useForm.ts
├── services/
│   ├── auth.ts
│   └── api.ts
└── types/

## ✅ Feature-First (Recomendado)
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── orders/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
└── lib/
```

### 1.2 Justificativa

| Abordagem | Vantagens | Desvantagens |
|-----------|-----------|--------------|
| **Feature-First** | Coesão, fácil encontrar tudo, escala melhor | Pode duplicar utilitários |
| **Layer-First** | Facilita encontrar por tipo | Components podem crescer demais |

---

## 2. Estrutura Detalhada

### 2.1 Estrutura Completa

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route Group: Auth (sem layout do dashboard)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # Route Group: Dashboard (layout com sidebar)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── settings/
│   │   └── profile/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   └── webhooks/
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                       # shadcn/ui base components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── forms/                    # Form components
│   │   ├── FormField.tsx
│   │   ├── SubmitButton.tsx
│   │   └── index.ts
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── feedback/                 # Feedback components
│       ├── Loading.tsx
│       ├── Toast.tsx
│       └── ErrorBoundary.tsx
├── features/
│   ├── auth/                     # Auth feature
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useLogin.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   ├── validators/
│   │   │   └── auth.validators.ts
│   │   └── index.ts
│   ├── orders/                  # Orders feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── products/                # Products feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   └── cart/                    # Cart feature
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types.ts
│       └── index.ts
├── hooks/                       # Shared hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── index.ts
├── lib/                         # Utilities and configs
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── utils.ts
│   ├── validators.ts
│   ├── constants.ts
│   └── formatters.ts
├── stores/                      # State management
│   ├── useAuthStore.ts
│   ├── useCartStore.ts
│   └── index.ts
├── types/                       # Global types
│   ├── database.types.ts
│   └── common.types.ts
├── providers/                    # React Context providers
│   ├── AuthProvider.tsx
│   ├── ToastProvider.tsx
│   └── QueryProvider.tsx
└── public/                       # Static assets
    ├── images/
    └── fonts/
```

### 2.2 Arquivos de Configuração

```
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vitest.config.ts
```

---

## 3. Imports Absolutos vs Relativos

### 3.1 Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/types/*": ["./src/types/*"],
      "@/providers/*": ["./src/providers/*"]
    }
  }
}
```

### 3.2 Quando Usar Cada Um

```typescript
// ✅ Imports absolutos para referências internas
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

// ✅ Imports relativos dentro da mesma feature
import { LoginForm } from './LoginForm'
import { useLogin } from './hooks/useLogin'
import type { LoginData } from './types'

// ✅ Imports absolutos para bibliotecas externas
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
```

### 3.3 ESLint Config

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // Prefere absolute imports
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
  },
}
```

---

## 4. Shared vs Feature Components

### 4.1 Decision Matrix

| Critério | Shared (ui/) | Feature (features/*/) |
|----------|--------------|----------------------|
| Reutilização | Múltiplas features | Apenas uma feature |
| Dependências | Apenas UI libs | Pode ter lógica de negócio |
| Props | Genéricas | Específicas do domínio |

### 4.2 Exemplos

```typescript
// ✅ Shared UI Component
// src/components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function Button({ variant, size, ...props }: ButtonProps) {
  return <button className={cn(btnVariants[variant], btnSizes[size])} {...props} />
}

// ❌ Não colocar na UI Library
// src/components/ui/OrderSummary.tsx
// Este tem lógica de negócio específica - vai em features/orders/
```

---

## 5. Nomenclatura de Arquivos

### 5.1 Regras

```markdown
## Arquivos de Componente
- PascalCase: `LoginForm.tsx`, `UserAvatar.tsx`
- Um componente por arquivo

## Arquivos de Hook
- camelCase + prefixo use: `useAuth.ts`, `useDebounce.ts`

## Arquivos de Utilidade
- camelCase: `utils.ts`, `formatters.ts`, `validators.ts`

## Arquivos de Tipo
- PascalCase + sufixo .types.ts: `auth.types.ts`, `product.types.ts`

## Arquivos de Configuração
- kebab-case: `eslint.config.js`, `tailwind.config.js`
```

### 5.2 Exports

```typescript
// ✅ Named exports são preferidos
export function LoginForm() { /* ... */ }
export const useAuth = () => { /* ... */ }
export type { User, AuthState }

// ❌ Default exports (evitar)
export default function LoginForm() { /* ... */ }
```

---

## 6. Component Patterns

### 6.1 Compound Components

```typescript
// src/components/ui/Dropdown.tsx
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'

export const Dropdown = DropdownPrimitive.Root
export const DropdownTrigger = DropdownPrimitive.Trigger
export const DropdownContent = DropdownPrimitive.Content
export const DropdownItem = DropdownPrimitive.Item
export const DropdownSeparator = DropdownPrimitive.Separator

// Uso
<Dropdown>
  <DropdownTrigger>Menu</DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Item 1</DropdownItem>
    <DropdownItem>Item 2</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### 6.2 Props com Default

```typescript
interface CardProps {
  title?: string
  description?: string
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'small' | 'medium' | 'large'
}

function Card({
  title,
  description,
  variant = 'default',
  padding = 'medium',
}: CardProps) {
  return <div className={cn(baseStyles, variantStyles[variant], paddingStyles[padding])}>{/* ... */}</div>
}
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| Next.js Structure | https://nextjs.org/docs/app/building-your-application/routing |
| Feature-Sliced Design | https://feature-sliced.design/ |
| Bulletproof React | https://github.com/alan2207/bulletproof-react |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
