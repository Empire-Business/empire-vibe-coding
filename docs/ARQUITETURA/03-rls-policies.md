# 03-rls-policies.md

## Arquitetura: RLS Policies

Guia completo de Row Level Security para Supabase.

---

## 1. Princípios RLS

### 1.1 Regra de Ouro

```markdown
## Todo acesso deve ter policy explícita

- [ ] Toda tabela tem RLS habilitado
- [ ] Toda tabela tem pelo menos uma policy
- [ ] Não há "public" access exceto dados intencionalmente públicos
- [ ] Policies seguem princípio de menor privilégio
```

### 1.2 Fluxo de Acesso

```
Request → RLS Check → Policy 1 → Policy 2 → ... → Result
          (REJECT se nenhuma policy passar)
```

---

## 2. Tipos de Policies

### 2.1 Tipos Suportados

```sql
-- SELECT: Ler dados
CREATE POLICY "Users can read own data"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- INSERT: Criar dados
CREATE POLICY "Users can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Modificar dados
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: Remover dados
CREATE POLICY "Users can delete own posts"
  ON public.posts
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 3. Templates de Policies

### 3.1 Owner-Based Access

```sql
-- Tabela com owner_id ou user_id
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policy: Owner pode fazer tudo
CREATE POLICY "Owner full access"
  ON public.documents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### 3.2 Organization-Based Access

```sql
-- Multi-tenant com org_id
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policy: Membros da org podem ver
CREATE POLICY "Org members can view"
  ON public.projects
  FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.user_orgs
      WHERE user_id = auth.uid()
    )
  );

-- Policy: Admin da org pode editar
CREATE POLICY "Org admins can edit"
  ON public.projects
  FOR ALL
  USING (
    org_id IN (
      SELECT org_id FROM public.user_orgs
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

### 3.3 Public Read + Auth Write

```sql
-- Blog posts públicos
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Todos podem ver posts publicados
CREATE POLICY "Public can view published posts"
  ON public.posts
  FOR SELECT
  USING (published = true);

-- Apenas autores podem criar
CREATE POLICY "Auth users can create"
  ON public.posts
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Apenas autores podem atualizar seus posts
CREATE POLICY "Authors can update own posts"
  ON public.posts
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);
```

---

## 4. Campos Sensíveis

### 4.1 Exemplo Completo

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  is_public_profile BOOLEAN DEFAULT false,
  settings JSONB DEFAULT '{}'::jsonb,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- O próprio usuário vê tudo
CREATE POLICY "Users can view own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Usuário público vê perfil público
CREATE POLICY "Public can view public profiles"
  ON public.users
  FOR SELECT
  USING (
    id IN (
      SELECT id FROM public.users
      WHERE is_public_profile = true
    )
  );

-- Campos específicos via VIEW
CREATE VIEW public_user_profiles AS
SELECT
  id,
  full_name,
  avatar_url
FROM public.users
WHERE is_public_profile = true;
```

### 4.2 Campo Sensível Separado

```sql
-- Tabela com dados sensíveis separados
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  bio TEXT,
  avatar_url TEXT
);

CREATE TABLE public.user_private_data (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  address JSONB,
  ssn TEXT, -- Exemplo
  admin_notes TEXT
);

-- Profile público com RLS
CREATE POLICY "Public can view profiles"
  ON public.user_profiles
  FOR SELECT
  USING (true); -- Ou conditions mais específicas

-- Dados privados só para admin
CREATE POLICY "Admins can view private data"
  ON public.user_private_data
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 5. Patterns Avançados

### 5.1 API como Service Role

```typescript
// Não use service role no frontend!
// Frontend sempre usa anon key (RLS enforced)

lib/supabase/client.ts
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // ← anon key
  )
}

// Server-side com service role (admin tasks)
lib/supabase/admin.ts
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ← service role
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
```

### 5.2 Custom Claims

```sql
-- Adicionar campo role em metadata
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS user_metadata jsonb;

-- Função para verificar role
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

-- Policy usando role
CREATE POLICY "Admins can manage"
  ON public.some_table
  FOR ALL
  USING (has_role('admin'));
```

### 5.3 Rate Limiting via RLS

```sql
-- Criar tabela de rate limits
CREATE TABLE public.api_rate_limits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  request_count INTEGER DEFAULT 0,
  reset_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

-- Function para verificar rate limit
CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.api_rate_limits
    WHERE user_id = auth.uid()
    AND request_count >= 100
    AND reset_at > NOW()
  ) THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para rate limiting
CREATE TRIGGER rate_limit_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION check_rate_limit();
```

---

## 6. Troubleshooting

### 6.1 Problemas Comuns

```sql
-- ❌ Error: RLS policy denied
-- Causa: Nenhuma policy permite a operação

-- ✅ Solução: Verificar policies
SELECT * FROM pg_policies WHERE tablename = 'table_name';

-- ❌ Error: new row violates row-level security policy
-- Causa: WITH CHECK falhou no INSERT/UPDATE

-- ✅ Solução: Verificar dados sendo inseridos
-- e conditions em WITH CHECK
```

### 6.2 Debug RLS

```sql
-- Ver todas as policies de uma tabela
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablname = 'users';

-- Testar policy
SET ROLE authenticated;
SET LOCAL request.jwt.claim.sub TO 'user-uuid';
SELECT * FROM users WHERE id = 'user-uuid';
```

---

## 7. Checklist de Segurança

```markdown
## RLS Checklist

### Configuração
- [ ] RLS habilitado em todas as tabelas
- [ ] Todas as tabelas têm pelo menos uma policy
- [ ] Nenhuma tabela permite "public" access desnecessariamente

### INSERT
- [ ] auth.uid() está no WITH CHECK
- [ ] Campos computed são readonly

### SELECT
- [ ] auth.uid() ou org_id verificados
- [ ] Dados sensíveis protegidos

### UPDATE
- [ ] USING e WITH CHECK ambos protegem
- [ ] owner_id não pode ser mudado

### DELETE
- [ ] Soft delete preferível a hard delete
- [ ] owner_id verificado
```

---

## 8. Referências

| Recurso | URL |
|---------|-----|
| Supabase RLS | https://supabase.com/docs/guides/auth/row-level-security |
| PostgreSQL Policies | https://www.postgresql.org/docs/current/sql-createpolicy.html |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
