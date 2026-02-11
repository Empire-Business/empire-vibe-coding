# 02-seguranca-back.md

## Segurança: Backend

Guia de práticas de segurança para APIs e backend com Supabase.

---

## 1. OWASP Top 10 Mitigations

### 1.1 Broken Access Control

```sql
-- ✅ SEMPRE verificar RLS
CREATE TABLE public.documents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  content TEXT,
  is_public BOOLEAN DEFAULT false
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Owner access
CREATE POLICY "Owner can access own documents"
  ON public.documents
  FOR ALL
  USING (auth.uid() = user_id OR is_public = true);
```

```typescript
// API middleware
import { createServerClient } from '@supabase/ssr'
import { headers } from 'next/headers'

async function requireAuth() {
  const supabase = createServerClient(/* ... */)

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    throw new Error('Unauthorized')
  }

  return session.user
}

// Em API route
async function GET(request: Request) {
  const user = await requireAuth()

  // Verificar explicitamente permissão
  const { data: resource } = await supabase
    .from('resources')
    .select('*')
    .eq('id', resourceId)
    .eq('user_id', user.id)
    .single()

  if (!resource) {
    return new Response('Not Found', { status: 404 })
  }

  return Response.json(resource)
}
```

### 1.2 Cryptographic Failures

```typescript
// ❌ NÃO usar algoritmos fracos
crypto.createHash('md5') // Fraco!
crypto.createHash('sha1') // Deprecated!

// ✅ Usar algoritmos modernos
import crypto from 'crypto'

// Para senhas - usar bcrypt/argon2 (via Supabase)
const bcrypt = require('bcrypt')
const hash = await bcrypt.hash(password, 12)

// Para HMAC
const hmac = crypto.createHmac('sha256', key)
hmac.update(data)
const signature = hmac.digest('hex')

// Para hashing geral
const hash = crypto.createHash('sha256').update(data).digest('hex')
```

### 1.3 Injection

```typescript
// ❌ PERIGOSO - SQL Injection
const query = `SELECT * FROM users WHERE email = '${email}'`
await supabase.from('users').select('*').ilike('email', email)

// ✅ SEGURO - Parameterized queries (Supabase usa internamente)
const { data, error } = await supabase
  .from('users')
  .select('*')
  .ilike('email', email) // Sanitizado automaticamente

// Para operações complexas
const { data, error } = await supabase.rpc('search_users', {
  search_term: query,
})

// Validar entrada
const emailSchema = z.string().email()
const validEmail = emailSchema.parse(email)
```

---

## 2. RLS Policies Avançadas

### 2.1 Multi-Tenancy

```sql
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL
);

CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL DEFAULT 'member',
  UNIQUE(project_id, user_id)
);

-- Policy: Membros podem ver projetos
CREATE POLICY "Project members can view"
  ON public.projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
    )
  );

-- Policy: Owners podem editar
CREATE POLICY "Project owners can edit"
  ON public.projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
      AND role = 'owner'
    )
  );
```

### 2.2 Role-Based Access

```sql
-- Adicionar role em metadata
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS user_metadata JSONB;

-- Function para verificar role
CREATE OR REPLACE FUNCTION has_role(role_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND user_metadata->>'role' = role_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy com role check
CREATE POLICY "Admins can manage all"
  ON public.audit_logs
  FOR ALL
  USING (has_role('admin'));
```

---

## 3. JWT Best Practices

### 3.1 JWT Structure

```typescript
// ❌ NÃO incluir dados sensíveis no JWT
{
  "sub": "user-id",
  "email": "user@example.com",  // Pode ser OK
  "role": "admin",              // Pode ser OK
  // NÃO inclua:
  // "password_hash": "...",
  // "credit_card": "...",
  "iat": 1705310400,
  "exp": 1705314000
}
```

### 3.2 Token Validation

```typescript
// Verificar token em todas as requisições
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function validateRequest() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
      },
    }
  )

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Verificar se token não expirou (Supabase faz automaticamente)
  const now = Math.floor(Date.now() / 1000)
  if (session.expires_at < now) {
    return new Response('Token expired', { status: 401 })
  }

  return session.user
}
```

### 3.3 Refresh Token

```typescript
// Rotação de refresh tokens
async function refreshSession(refreshToken: string) {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  })

  if (error) {
    throw new Error('Session expired')
  }

  // Novo refresh token deve ser armazenado
  return {
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
  }
}

// Nunca expor refresh token ao client
// Supabase gerencia automaticamente via cookies HttpOnly
```

---

## 4. Rate Limiting

### 4.1 Supabase Rate Limits

```typescript
// Supabase já tem rate limits por padrão
// Para limites customizados, usar Edge Functions

// supabase/functions/limited-api/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  // Verificar limite
  const { data: record } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('ip', ip)
    .single()

  const limit = 100 // requests por hora
  const window = 3600 // segundos

  if (record && record.count >= limit) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(record.reset_at - Date.now()),
      },
    })
  }

  // Incrementar contador
  if (record) {
    await supabase
      .from('rate_limits')
      .update({ count: record.count + 1 })
      .eq('id', record.id)
  } else {
    await supabase
      .from('rate_limits')
      .insert({
        ip,
        count: 1,
        reset_at: Date.now() + window,
      })
  }

  // ... processar request
})
```

### 4.2 Upstash Redis (Opcional)

```typescript
// Para rate limiting distribuído
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

async function rateLimit(ip: string): Promise<boolean> {
  const limit = 100
  const window = 60 * 60 // 1 hora

  const key = `ratelimit:${ip}`
  const current = await redis.get(key)

  if (current && Number(current) >= limit) {
    return false // Rate limited
  }

  await redis.incr(key)
  await redis.expire(key, window)

  return true
}
```

---

## 5. CORS Restritivo

### 5.1 CORS Configuration

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'https://myapp.com',
  'https://www.myapp.com',
  'http://localhost:3000',
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')

  // Preflight request
  if (request.method === 'OPTIONS') {
    const response = new Response(null, { status: 204 })

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Max-Age', '86400')
    }

    return response
  }

  // Actual request
  const response = NextResponse.next()

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}
```

---

## 6. Logging e Monitoramento

### 6.1 Secure Logging

```typescript
// lib/secure-logger.ts
interface LogData {
  userId?: string
  action: string
  resource?: string
  metadata?: Record<string, any>
}

export function logSecurityEvent(data: LogData) {
  // NÃO logar dados sensíveis
  const safeData = {
    userId: data.userId ? data.userId.substring(0, 8) + '...' : undefined,
    action: data.action,
    resource: data.resource,
    timestamp: new Date().toISOString(),
    // Remover campos sensíveis
    metadata: sanitizeMetadata(data.metadata),
  }

  console.log(JSON.stringify(safeData))
}

function sanitizeMetadata(obj: Record<string, any> | undefined): Record<string, any> | undefined {
  const sensitiveFields = ['password', 'token', 'secret', 'creditCard', 'ssn']

  if (!obj) return undefined

  const sanitized = { ...obj }
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]'
    }
  }

  return sanitized
}
```

### 6.2 Audit Trail

```sql
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| OWASP Top 10 | https://owasp.org/ |
| Supabase Security | https://supabase.com/docs/guides/auth/security |
| JWT Best Practices | https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/ |
| CORS Guide | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
