# 02-database-schema.md

## Arquitetura: Schema do Banco de Dados

Padrões e convenções para schema do Supabase/PostgreSQL.

---

## 1. Nomenclatura

### 1.1 Tabelas

```sql
-- ✅ snake_case plural
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE TABLE public.user_profiles (
  user_id UUID REFERENCES auth.users(id)
);

CREATE TABLE public.order_items (
  order_id UUID REFERENCES public.orders(id)
);

-- ❌ Evitar
CREATE TABLE public/User;          -- PascalCase
CREATE TABLE public/user;         -- Singular
CREATE TABLE public/userProfile;  -- camelCase
```

### 1.2 Colunas

```sql
-- ✅ snake_case
user_id, created_at, updated_at, is_active

-- ❌ Evitar
userId, createdAt, isActive, TheField

-- ✅ Foreign Keys: nome_tabela_id
order_id REFERENCES public.orders(id)
product_id REFERENCES public.products(id)

-- ✅ Boolean prefixes
is_active, has_access, can_edit, was_confirmed
```

### 1.3 Constraints e Índices

```sql
-- ✅ Nomes descritivos
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
CONSTRAINT uq_user_email UNIQUE (email)
INDEX idx_orders_user_id ON orders(user_id)

-- ❌ Nomes genéricos
CONSTRAINT a FOREIGN KEY ...
CONSTRAINT unique1 ...
```

---

## 2. Tipos de Dados

### 2.1 UUID vs Serial

```sql
-- ✅ UUID para tabelas de usuário/dados sensíveis
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

-- ✅ Serial para tabelas de relacionamento/lookup
CREATE TABLE public.order_statuses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Hybrid: UUID mas com unique constraint adicional
CREATE TABLE public.orders (
  order_number TEXT UNIQUE NOT NULL,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);
```

### 2.2 Timestamps

```sql
-- ✅ Padrão de timestamps
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW(),
deleted_at TIMESTAMPTZ,  -- Para soft delete

-- ✅ Função para updated_at automático
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_modtime
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
```

### 2.3 JSON/JSONB

```sql
-- ✅ JSONB para dados estruturados variáveis
CREATE TABLE public.events (
  id UUID PRIMARY KEY,
  payload JSONB NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- ✅ Índices em JSONB
CREATE INDEX idx_events_payload
  ON public.events USING gin (payload jsonb_path_ops);
```

---

## 3. Padrões de Schema

### 3.1 Soft Delete

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  deleted_at TIMESTAMPTZ,
  CONSTRAINT uq_user_email UNIQUE (email)
);

-- ✅ Verificar soft delete em views/policies
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;

-- ✅ Query com soft delete
SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL;
```

### 3.2 Auditing Automático

```sql
-- ✅ Tabela de audit
CREATE TABLE public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ✅ Trigger de audit
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, to_jsonb(OLD), auth.uid());
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(OLD), to_jsonb(NEW), auth.uid());
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, record_id, action, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(NEW), auth.uid());
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_users
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

### 3.3 Multi-Tenancy

```sql
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member'
);

-- ✅ Sempre filtrar por org_id
CREATE POLICY "Users can view org data"
  ON public.users
  FOR SELECT
  USING (org_id IN (
    SELECT id FROM organizations WHERE id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  ));
```

---

## 4. Exemplo de Schema Completo

### 4.1 E-commerce Simple

```sql
-- Organizations (multi-tenancy)
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member',
  settings JSONB DEFAULT '{}'::jsonb,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sku TEXT,
  inventory_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id),
  user_id UUID REFERENCES public.users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_products_org_id ON products(org_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

---

## 5. Convenções

### 5.1 Checklist de Schema

```markdown
## Criação de Nova Tabela

- [ ] snake_case plural no nome
- [ ] UUID como PK (gen_random_uuid())
- [ ] created_at TIMESTAMPTZ DEFAULT NOW()
- [ ] updated_at TIMESTAMPTZ com trigger
- [ ] deleted_at para soft delete (se aplicável)
- [ ] RLS habilitado
- [ ] Policies definidas
- [ ] Índices para FKs e queries comuns
- [ ] Comments documentando propósito
```

### 5.2 Migration Checklist

```sql
-- ✅ Migration template
-- migration: YYYYMMDD_HHMM_add_table_name.sql

-- 1. criar tabela
CREATE TABLE IF NOT EXISTS public.table_name (...);

-- 2. enable RLS
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;

-- 3. criar policies
CREATE POLICY "policy_name" ON public.table_name FOR SELECT ...;

-- 4. criar índices
CREATE INDEX idx_table_name_column ON public.table_name(column);

-- 5. comment
COMMENT ON TABLE public.table_name IS 'Description of table';
```

---

## 6. Referências

| Recurso | URL |
|---------|-----|
| Supabase Schema | https://supabase.com/docs/guides/database/schema |
| PostgreSQL Best Practices | https://wiki.postgresql.org/wiki/Performance_Optimization |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
