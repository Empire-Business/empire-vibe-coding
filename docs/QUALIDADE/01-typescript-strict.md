# 01-typescript-strict.md

## Qualidade: TypeScript Strict Mode

Guia para configuração e uso efetivo do TypeScript strict mode.

---

## 1. Configuração Strict

### 1.1 tsconfig.json

```json
{
  "compilerOptions": {
    /* === STRICT MODE === */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,

    /* === ADDITIONAL STRICT CHECKS === */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    /* === MODULES === */
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    /* === COMPILATION === */
    "skipLibCheck": true,
    "noEmit": true,

    /* === JSX === */
    "jsx": "preserve",

    /* === PATHS === */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", ".next/types/**/*"],
  "exclude": ["node_modules", ".next"]
}
```

---

## 2. Tipos Explícitos

### 2.1 Versus Any

```typescript
// ❌ EVITAR: any
function processData(data: any) {
  return data.items.map((item: any) => item.name)
}

// ✅ PREFERIR: tipos explícitos
interface User {
  id: string
  name: string
  email: string
}

interface ProcessedData {
  items: User[]
  total: number
}

function processData(data: ProcessedData): ProcessedData {
  return {
    items: data.items.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
    })),
    total: data.items.length,
  }
}
```

### 2.2 Quando Any é Aceitável

```typescript
// ACEITÁVEL: Eventos de terceiros
function handleEvent(event: any) {
  console.log(event.type, event.target)
}

// ACEITÁVEL: Migration gradual
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyData: any = fetchLegacyData()

// ACEITÁVEL: Types externos mal definidos
declare module 'some-library' {
  export function doSomething(config: any): void
}
```

---

## 3. Utility Types

### 3.1 Comuns

```typescript
interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

// Partial - todos os campos opcionais
type UserPatch = Partial<User>

// Required - todos os campos obrigatórios
type UserRequired = Required<User>

// Pick - selecionar campos específicos
type UserSummary = Pick<User, 'id' | 'name' | 'email'>

// Omit - remover campos específicos
type UserPublic = Omit<User, 'password'>

// Record - tipo de objeto com chaves específicas
type RolePermissions = Record<'admin' | 'user' | 'guest', string[]>

// ReturnType - tipo de retorno de função
function createUser(name: string): User { /* ... */ }
type CreateUserReturn = ReturnType<typeof createUser>

// Parameters - tipos de parâmetros
type CreateUserParams = Parameters<typeof createUser>

// Awaited - unwrap Promise
type UserPromise = Promise<User>
type UserResult = Awaited<UserPromise>
```

### 3.2 Template Literal Types

```typescript
// Eventos
type EventPrefix = 'on'

type ButtonEvent = `${EventPrefix}Click` | `${EventPrefix}Hover`
// Result: 'onClick' | 'onHover'

// Actions
type Action = 'create' | 'update' | 'delete'
type Entity = 'user' | 'post' | 'comment'

type CrudAction = `${Action}_${Entity}`
// Result: 'create_user' | 'create_post' | 'update_user' | ...

// CSS
type CssProperty = `${'margin' | 'padding'}-${'top' | 'right' | 'bottom' | 'left'}`
// Result: 'margin-top' | 'margin-right' | ...
```

---

## 4. Generics Patterns

### 4.1 Generic Functions

```typescript
// Generic básico
function first<T>(array: T[]): T | undefined {
  return array[0]
}

// Multiple generics
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn)
}

// Constraints
function getById<T extends { id: string }>(array: T[], id: string): T | undefined {
  return array.find((item) => item.id === id)
}

// Generic com valor padrão
function createPair<T = string, U = number>(first: T, second: U): [T, U] {
  return [first, second]
}
```

### 4.2 Generic Hooks

```typescript
// Generic para store
interface Store<T> {
  state: T
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void
}

function createStore<T>(initialState: T): Store<T> {
  let state = initialState

  return {
    state: readonly(state),
    setState: (partial) => {
      if (typeof partial === 'function') {
        state = { ...state, ...partial(state) }
      } else {
        state = { ...state, ...partial }
      }
    },
  }
}

// Uso
interface UserState {
  name: string
  email: string
}

const userStore = createStore<UserState>({
  name: '',
  email: '',
})
```

---

## 5. Runtime Validation com Zod

### 5.1 Schema Validation

```typescript
import { z } from 'zod'

// Schema base
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional(),
  role: z.enum(['user', 'admin', 'superadmin']).default('user'),
})

// Type inferido automaticamente
type User = z.infer<typeof UserSchema>

// Validação runtime
function createUser(data: unknown): User {
  const result = UserSchema.safeParse(data)

  if (!result.success) {
    throw new Error(`Validation failed: ${result.error}`)
  }

  return result.data
}

// Validação com retorno de erro
function parseUser(data: unknown): { success: true; data: User } | { success: false; error: string } {
  const result = UserSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map((e) => e.message).join(', '),
    }
  }

  return { success: true, data: result.data }
}
```

### 5.2 API Validation

```typescript
// API Route com validação
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/),
  }),
  promoCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const result = CreateOrderSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error.flatten() },
      { status: 400 }
    )
  }

  // result.data tem tipagem garantida
  const order = await createOrder(result.data)

  return NextResponse.json(order)
}
```

---

## 6. Strict nullChecks

### 6.1 Patterns

```typescript
// ❌ PROBLEMA: undefined possível
function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

const user = getUser('123')
console.log(user.name) // Error! user pode ser undefined

// ✅ SOLUÇÃO: Optional chaining
const userName = getUser('123')?.name

// ✅ SOLUÇÃO: Guard
const user = getUser('123')
if (user) {
  console.log(user.name)
}

// ✅ SOLUÇÃO: Non-null assertion (quando você tem certeza)
const user = getUser('123')!
console.log(user.name) // OK, mas use com cuidado
```

### 6.2 Array Types

```typescript
// ❌ PROBLEMA
const items: string[] = []
const first = items[0] // string | undefined

// ✅ SOLUÇÃO: Tipagem explícita
const items: string[] = []
const first: string | undefined = items[0]

// ✅ SOLUÇÃO: Non-null assertion
const first = items[0]!

// ✅ SOLUÇÃO: Default value
const first = items[0] ?? 'default'

// Para maps e objetos
const config: Record<string, Config> = {}
const value = config[key as keyof typeof config] // TypeScript 5.0+
```

---

## 7. ESLint Config

### 7.1 Configuração

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',

    // React rules
    'react/prop-types': 'off',
  },
}
```

### 7.2 VSCode Settings

```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  },
  "typescript.suggest.autoImports": true
}
```

---

## 8. Referências

| Recurso | URL |
|---------|-----|
| TS Config Strict | https://www.typescriptlang.org/tsconfig#strict |
| Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |
| Zod | https://zod.dev/ |
| TypeScript ESLint | https://typescript-eslint.io/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
