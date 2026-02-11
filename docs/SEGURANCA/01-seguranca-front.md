---
## PARA CLAUDE (AI INSTRUCTIONS)

Ao guiar o usuário através deste documento:
1. Leia as instruções completamente
2. Explique cada passo em português simples
3. Antes de executar comandos, explique O QUE o comando faz
4. Antes de deletar/modificar dados, CONFIRME com o usuário
5. Use analogias do dia a dia quando possível
6. Se o usuário perguntar sobre um termo técnico, verifique o glossário em GLOSSARIO.md
7. Nunca execute comandos da lista de BANDEIRAS-VERMELHAS.md sem explicar primeiro
8. Pergunte ao usuário se ele entendeu antes de prosseguir
9. Se algo der errado, consulte TROUBLESHOOTING.md
10. Seja paciente - o usuário está aprendendo enquanto constrói
---

# 01-seguranca-front.md

## Segurança: Frontend

Guia de práticas de segurança para aplicações React/Next.js.

---

## Por Que Segurança Importa?

### Exemplo Realista

Imagine você criando um sistema de login e perfil de usuário. Sem segurança:

#### ❌ SEM SEGURANÇA (Perigoso!)
- Alguém pode logar como QUALQUER usuário, só digitando o ID dele
- Alguém pode ver TODOS os dados, inclusive dos outros usuários
- Alguém pode apagar dados de outra pessoa
- Alguém pode injetar código malicioso no seu site

#### ✅ COM SEGURANÇA (Seguro!)
- Cada usuário só vê o SEU próprio perfil
- Cada usuário só pode alterar SEUS dados
- Ninguém pode fazer nada que não tenha permissão
- Código malicioso é bloqueado automaticamente

### Conceito: Row Level Security (RLS)

**O que é:** RLS é como um porteiro que verifica seu crachá antes de deixar você entrar em um cômodo.

**Como funciona:**
- Você tem crachá "Usuário A" → Pode ver apenas coisas do "Usuário A"
- Você tem crachá "Admin" → Pode ver tudo
- Você não tem crachá → Não entra em lugar nenhum

**Exemplo prático:**
```
Tabela: mensagens

Usuário A (crachá: usuario-a)
├── Pode ver: Mensagens enviadas por ele ou para ele
└── NÃO pode ver: Mensagens de outros usuários

Usuário B (crachá: admin)
├── Pode ver: TODAS as mensagens
└── Pode fazer: Qualquer coisa
```

**No código:** Você configura RLS no banco de dados (Supabase), e ele aplica as regras automaticamente. Você não precisa lembrar de verificar a cada vez!

### Conceito: XSS (Cross-Site Scripting)

**O que é:** É quando alguém consegue injetar código malicioso no seu site.

**Exemplo perigoso:**
Imagine um site de comentários. Alguém escreve:
```html
<script>alert("Hackeado!")</script>
```

Se o site mostrar isso sem segurança, o código JavaScript vai ser executado em todos os computadores das pessoas que verem o comentário!

**Como previnir:**
- React automaticamente escapa (torna inofensivo) qualquer código HTML
- Nunca use `dangerouslySetInnerHTML` a menos que saiba o que está fazendo
- Se precisar, use uma biblioteca como DOMPurify para limpar o HTML

### Conceito: Autenticação vs Autorização

- **Autenticação:** Você é quem diz que é? (login com email e senha)
- **Autorização:** Você tem permissão para fazer isso? (pode ver esse perfil?)

**Analogia de um prédio:**
- Autenticação = Mostrar seu crachá na portaria
- Autorização = O crachá permitir entrar na sala específica

---

## 1. XSS Prevention

### 1.1 React Auto-Escape

```typescript
// React escapa automaticamente por padrão
// ✅ SEGURO
function Component() {
  const userInput = '<script>alert("xss")</script>'
  return <div>{userInput}</div> // Escapeado automaticamente
}

// ❌ PERIGOSO: dangerouslySetInnerHTML
function DangerousComponent() {
  const html = '<img src=x onerror=alert(1)>'
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// ✅ SEGURO: Usar DOMPurify
import DOMPurify from 'dompurify'

function SafeComponent() {
  const rawHtml = '<img src=x onerror=alert(1)>'
  const sanitized = DOMPurify.sanitize(rawHtml)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

### 1.2 URL Sanitization

```typescript
// ❌ PERIGOSO
function DownloadLink({ url }: { url: string }) {
  return <a href={url}>Download</a>
}

// ✅ SEGURO
function SafeDownloadLink({ url }: { url: string }) {
  const safeUrl = validateUrl(url)
  return <a href={safeUrl}>Download</a>
}

function validateUrl(url: string): string {
  const allowedProtocols = ['https:', 'http:']
  try {
    const parsed = new URL(url, window.location.origin)
    if (!allowedProtocols.includes(parsed.protocol)) {
      throw new Error('Invalid protocol')
    }
    return url
  } catch {
    return 'about:blank'
  }
}
```

### 1.3 Input Validation com Zod

```typescript
import { z } from 'zod'

// Validar todas as entradas
const userInputSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]*$/),
  age: z.number().min(0).max(150),
})

function processInput(input: unknown) {
  const result = userInputSchema.safeParse(input)
  if (!result.success) {
    throw new Error('Invalid input')
  }
  // Usar result.data com types garantidos
}
```

---

## 2. Content Security Policy

### 2.1 CSP Headers

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // CSP Header
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    ].join('; ')
  )

  // Headers adicionais
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}
```

### 2.2 CSP em Meta Tag (Fallback)

```typescript
// app/layout.tsx
export const metadata = {
  other: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'",
  },
}
```

---

## 3. Authentication Frontend

### 3.1 Token Storage

```typescript
// ❌ NUNCA armazenar tokens em localStorage
// Vulnerável a XSS
localStorage.setItem('token', jwt)

// ✅ USAR HttpOnly cookies (configurado no backend)
async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  // Token gerenciado automaticamente pelo Supabase
  // Armazenado em cookie HttpOnly
}

// ✅ Ou sessionStorage para dados menos sensíveis
sessionStorage.setItem('preference', 'dark')
```

### 3.2 Supabase Auth Pattern

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    // Token gerenciado automaticamente via cookies
  )
}

// Verificar autenticação
async function getUser() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### 3.3 Auth Guard

```typescript
// components/AuthGuard.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()

      if (requireAuth && !session) {
        router.push('/login')
        return
      }

      if (!requireAuth && session) {
        router.push('/dashboard')
        return
      }

      setUser(session?.user ?? null)
      setLoading(false)
    }

    checkAuth()
  }, [requireAuth, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return user || !requireAuth ? <>{children}</> : null
}
```

---

## 4. Sensitive Data

### 4.1 Environment Variables

```bash
# .env.local
# ✅ Público (prefix NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_APP_NAME=My App

# ❌ Privado (NÃO usar NEXT_PUBLIC_)
# Estas nunca devem ser expostas ao client
# SUPABASE_SERVICE_ROLE_KEY=...
# API_SECRET_KEY=...
```

### 4.2 Sensitive Data no Client

```typescript
// ❌ NUNCA expor dados sensíveis
function UserProfile() {
  const user = useUser() // Pode conter dados sensíveis

  return (
    <div>
      {/* Isso loga dados sensíveis no console! */}
      {console.log(user)}
      {/* Isso expõe dados sensíveis no HTML! */}
      <pre>{JSON.stringify(user)}</pre>
    </div>
  )
}

// ✅ Filtrar dados antes de usar no client
function SafeProfile() {
  const { data: user } = useQuery({
    queryKey: ['user-public'],
    queryFn: async () => {
      const { data } = await supabase
        .from('users')
        .select('id, name, avatar_url') // Apenas dados públicos
        .eq('id', userId)
        .single()
      return data
    },
  })

  return <div>{user?.name}</div>
}
```

---

## 5. Form Security

### 5.1 CSRF Protection

```typescript
// ✅ Next.js + Supabase lidam com CSRF automaticamente
// via SameSite cookies

// Para APIs customizadas
import { headers } from 'next/headers'

async function POST(request: Request) {
  const headersList = await headers()
  const origin = headersList.get('origin')

  // Verificar origin
  const allowedOrigins = ['https://myapp.com', 'http://localhost:3000']
  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 })
  }

  // Verificar CSRF token
  const csrfToken = headersList.get('x-csrf-token')
  const sessionToken = await getSessionToken() // Server-side only

  if (!csrfToken || csrfToken !== sessionToken) {
    return new Response('CSRF validation failed', { status: 403 })
  }

  // Processar request
}
```

### 5.2 Form Validation

```typescript
import { z } from 'zod'

// Schema com validação robusta
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100)
    .regex(/^[a-zA-Z\s]*$/, 'Nome deve conter apenas letras'),

  email: z
    .string()
    .email('Email inválido')
    .max(255)
    .toLowerCase(),

  message: z
    .string()
    .min(10, 'Mensagem muito curta')
    .max(5000)
    .refine(
      (val) => !val.includes('<script'),
      'Conteúdo inválido detectado'
    ),
})

// Limpar entrada
function processFormData(data: z.infer<typeof contactFormSchema>) {
  // Zod já sanitiza strings por padrão
  // Adicionalmente:
  const sanitized = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.replace(/<[^>]*>/g, ''), // Remove HTML tags
  }
  return sanitized
}
```

---

## 6. Rate Limiting Frontend

### 6.1 Debouncing

```typescript
import { useDebounce } from '@/hooks/useDebounce'

function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  // Evita múltiplas requisições
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

### 6.2 Request Queue

```typescript
class RequestQueue {
  private queue: Array<() => Promise<void>> = []
  private processing = false
  private rateLimit = 100 // ms entre requests

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          await new Promise((r) => setTimeout(r, this.rateLimit))
          const result = await fn()
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
      this.process()
    })
  }

  private async process() {
    if (this.processing) return
    this.processing = true

    while (this.queue.length > 0) {
      const fn = this.queue.shift()!
      await fn()
    }

    this.processing = false
  }
}
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| OWASP XSS | https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html |
| CSP | https://content-security-policy.com/ |
| DOMPurify | https://github.com/cure53/DOMPurify |
| Zod | https://zod.dev/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
