---
## PARA CLAUDE (AI INSTRUCTIONS)

Ao guiar o usuário através deste documento:
1. Leia as instruções completamente
2. Explique cada passo em português simples
3. Antes de executar comandos, explique O QUE o comando faz
4. Antes de deletar/modificar dados, CONFIRME com o usuário
5. Use analogias do dia a dia quando possível
6. Se o usuário perguntar sobre um termo técnico, verifique o glossário em GUIA-DO-INICIANTE.md
7. Nunca execute comandos da lista de BANDEIRAS-VERMELHAS.md sem explicar primeiro
8. Pergunte ao usuário se ele entendeu antes de prosseguir
9. Se algo der errado, consulte TROUBLESHOOTING.md
10. Seja paciente - o usuário está aprendendo enquanto constrói
---

# 01-DESENVOLVIMENTO.md

## Protocolo: Desenvolvimento Diário

Este documento estabelece o protocolo padrão para o fluxo de trabalho diário de desenvolvimento, garantindo qualidade e consistência em cada commit.

---

## Como Funciona o Trabalho Diário (Explicado Simples)

### Análogo: Trabalhar com IA é como trabalhar com um assistente

Quando você faz vibe coding, você é o "gerente" e a IA é o "programador":

1. **Você pede uma tarefa** → "Crie uma tela de login com email e senha"
2. **A IA escreve o código** → O código aparece no seu arquivo
3. **Você testa** → Abre o navegador e vê se funciona
4. **Se funcionou** → Você "salva" a versão (faz commit)
5. **Se não funcionou** → Você fala o erro para a IA, ela corrige

### Commit é como "Salvar" no Word

Imagine que você está escrevendo um documento no Word:

- Cada vez que você clica "Salvar", tem uma versão
- Se você fechar o documento e abrir depois, continua lá
- Se você apagar algo por acidente, pode abrir a versão anterior

No mundo do código:
- Cada commit é uma versão do seu código
- Se algo der errado, você pode voltar para uma versão anterior
- Você pode ver o histórico completo do que foi feito

**IMPORTANTE:** Commit frequente = menos chance de perder trabalho

### Comandos do Terminal (Explicação)

Aqui estão os comandos principais do Git, explicados em português simples:

```bash
# Ver como está seu projeto (tem mudanças?)
git status
# Pergunta: "O que mudou desde o último salvamento?"
# Resposta: Lista todos os arquivos que foram alterados

# Adicionar mudanças ao próximo salvamento
git add .
# Diz: "Essas mudanças fazem parte do próximo salvamento"
# O ponto (.) significa "todos os arquivos alterados"

# Salvar as mudanças (commit)
git commit -m "descrição do que fez"
# Registra: "Na versão X, fizemos Y"
# A mensagem entre aspas deve descrever o que você fez

# Enviar para o GitHub (seu repositório online)
git push
# Upload: "Envia suas mudanças para o servidor"
# Isso salva tudo no GitHub, onde fica seguro

# Baixar mudanças do GitHub
git pull
# Download: "Baixa mudanças que outras pessoas fizeram"
# Se você trabalha em equipe, use isso antes de começar

# Criar uma cópia para testar (branch)
git checkout -b nome-da-funcionalidade
# Cria: "Uma cópia do projeto para testar sem quebrar o original"
# Depois pode juntar (merge) com o projeto principal

# Juntar mudanças do branch com o principal
git merge nome-da-branch
# Junta: "Traz as mudanças do branch para o projeto principal"
```

### Exemplo Prático de Fluxo Diário

Vamos dizer que você quer adicionar um botão de "Adicionar ao Carrinho":

**1. Você pede à IA:**
> "Crie um botão 'Adicionar ao Carrinho' que leva o produto para o carrinho de compras"

**2. A IA cria o código** nos arquivos necessários

**3. Você testa** no navegador:
- Abre a página do produto
- Clica no botão
- Vai para o carrinho e vê o produto lá

**4. Se funcionou, você faz commit:**
```bash
git status          # Verifica o que mudou
git add .           # Adiciona tudo
git commit -m "feat(products): add 'add to cart' button"
# feat = nova funcionalidade
# (products) = é do módulo de produtos
# add 'add to cart' button = descrição do que fez
```

**5. Você envia para o GitHub:**
```bash
git push
```

**6. Pronto!** Sua funcionalidade está salva e segura.

### Se não funcionou (deu erro):

**1. Você vê o erro** (no terminal ou navegador)

**2. Você copia o erro** e pergunta à IA:
> "Tentei adicionar o botão de carrinho, mas apareceu este erro: [cole o erro]. O que está acontecendo?"

**3. A IA corrige** o código

**4. Você testa novamente** e se funcionou, faz commit

---

## O que Significa Essa Linguagem de Commits?

Quando você faz `git commit -m "alguma coisa"`, a mensagem segue um padrão:

### Formato:
```
tipo(escopo): descrição curta
```

### Tipos mais comuns:

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade | "feat(products): add cart button" |
| `fix` | Correção de bug | "fix(login): resolve validation error" |
| `docs` | Mudança em documentação | "docs(readme): add setup instructions" |
| `style` | Formatação (muda só a aparência) | "style(button): adjust spacing" |
| `refactor` | Refatoração (melhora o código mas faz mesma coisa) | "refactor(user): simplify logic" |
| `test` | Adição de testes | "test(cart): add unit tests" |
| `chore` | Tarefas de manutenção | "chore: update dependencies" |

### Escopo (o que está entre parênteses):
- `(auth)` = autenticação
- `(products)` = produtos
- `(cart)` = carrinho
- `(ui)` = componentes de interface

### Exemplos reais de commit que iniciante entende:

```bash
# Bom - claro e descritivo
git commit -m "feat(login): add login form with email and password"
git commit -m "fix(products): fix product price not showing"
git commit -m "feat(cart): add remove item from cart button"

# Ruim - não diz nada útil
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
```

---

## 1. Padrão de Commits

### 1.1 Conventional Commits

Utilize o formato:
```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### 1.2 Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): add password reset` |
| `fix` | Correção de bug | `fix(api): handle null user` |
| `docs` | Mudanças em documentação | `docs: update API endpoints` |
| `style` | Formatação, não mudança de código | `style: format with Prettier` |
| `refactor` | Refatoração sem mudança de comportamento | `refactor(products): extract validation` |
| `test` | Adição ou modificação de testes | `test: add unit tests for cart` |
| `chore` | Tarefas de manutenção | `chore: update dependencies` |
| `perf` | Melhorias de performance | `perf(db): optimize query` |
| `ci` | Mudanças em CI/CD | `ci: add build step` |

### 1.3 Exemplos Práticos

```bash
# Boa prática
feat(orders): add order status tracking
fix(auth): resolve session expiration issue
docs(readme): add setup instructions
refactor(cart): simplify quantity logic
test(products): add integration tests

# Evitar
fix: fixed stuff
feat: update
chore: changes
```

---

## 2. Fluxo de Trabalho com Git

### 2.1 Branches

```
main          → Produção (protegido)
develop       → Desenvolvimento
feature/*     → Novas funcionalidades
bugfix/*      → Correções
hotfix/*      → Correções críticas em produção
```

### 2.2 Nomenclatura de Branches

```bash
# Novos recursos
feature/auth-google-login
feature/shopping-cart

# Correções
bugfix/login-validation
bugfix/mobile-layout

# Hotfixes
hotfix/security-patch
```

### 2.3 Fluxo Diário

```bash
# 1. Sincronizar com develop
git checkout develop
git pull origin develop

# 2. Criar branch de trabalho
git checkout -b feature/minha-nova-funcionalidade

# 3. Trabalhar (commits frequentes)
git add .
git commit -m "feat: add initial structure"

# 4. Manter atualizado (rebase)
git fetch origin
git rebase origin/develop

# 5. Publicar
git push -u origin feature/minha-nova-funcionalidade
```

### 2.4 Pull Request

```markdown
## Descrição
Breve descrição do que foi implementado.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change

## Checklist
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Lint passou
- [ ] Build passou

## Screenshots (se aplicável)
```

---

## 3. Code Review de Si Mesmo

### 3.1 Checklist Antes de Commitar

```markdown
## Código
- [ ] Nenhuma variável não utilizada
- [ ] Nenhum console.log residual
- [ ] Tipos explícitos (sem any desnecessário)
- [ ] Nenhum console.error em produção
- [ ] Tratamento de erros implementado
- [ ] Loading states definidos

## Testes
- [ ] Testes unitários passando
- [ ] Novos casos de teste adicionados

## Git
- [ ] Commits atômicos
- [ ] Mensagens claras
- [ ] .gitignore atualizado (se necessário)

## UI/UX
- [ ] Responsividade testada
- [ ] Estados de loading verificados
- [ ] Estados de erro verificados
```

### 3.2 Auto-Review Checklist

```typescript
// REVISE SEU PRÓPRIO CÓDIGO:

// ❌ Evitar:
const data = await fetch('/api/data')
const json = data.json()

// ✅ Preferir:
const { data: response, error } = await supabase
  .from('table')
  .select('*')
  .single()

if (error) {
  console.error('Error:', error)
  return
}

// ❌ Evitar:
if (user.role === 'admin' || user.role === 'superadmin')

// ✅ Preferir:
const ADMIN_ROLES = ['admin', 'superadmin']
if (ADMIN_ROLES.includes(user.role))

// ❌ Evitar:
function Component({ data }) {
  return <div>{data?.items?.map(i => <Item key={i.id} {...i} />)}</div>
}

// ✅ Preferir:
function Component({ data }) {
  if (!data?.items?.length) {
    return <EmptyState />
  }

  return (
    <div>
      {data.items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
}
```

---

## 4. Quando Criar Migrations

### 4.1 Regra Geral

Crie uma migration quando houver **qualquer mudança** no schema do banco:

- Nova tabela
- Nova coluna
- Remoção/modificação de coluna
- Nova constraint
- Nova RLS policy
- Novo trigger
- Seed data

### 4.2 Formato de Migration

```sql
-- migrations/20240115_001_add_users_table.sql

-- Descrição: Cria tabela de usuários com campos essenciais
-- Autor: Claude Code
-- Data: 2024-01-15

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários veem seus próprios perfis
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Usuários atualizam seus próprios perfis
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Índice para performance
CREATE INDEX idx_profiles_email
  ON public.profiles(email);

-- Trigger para updated_at automático
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
```

### 4.3 Migrações Seguras

```sql
-- ❌ NUNCA faça isso em produção:
DROP TABLE users;

-- ✅ Sempre use IF EXISTS e transações:
BEGIN;
ALTER TABLE users RENAME TO users_old;
CREATE TABLE users (...);
INSERT INTO users SELECT * FROM users_old WHERE ...;
COMMIT;

-- ✅ Para colunas opcionais, adicione com DEFAULT:
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT NULL;
```

---

## 5. Como Adicionar Testes

### 5.1 Estrutura de Testes

```
src/
├── features/
│   └── auth/
│       ├── components/
│       │   └── LoginForm.test.tsx
│       ├── hooks/
│       │   └── useAuth.test.ts
│       └── services/
│           └── auth.service.test.ts
```

### 5.2 Exemplo: Teste Unitário

```typescript
// features/auth/services/auth.service.test.ts
import { describe, it, expect, vi } from 'vitest'
import { login } from './auth.service'

describe('authService', () => {
  describe('login', () => {
    it('should return user data on successful login', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'password123',
      }

      // Mock do Supabase
      const mockResponse = {
        data: { user: { id: '123', email: mockUser.email } },
        error: null,
      }

      // Teste
      const result = await login(mockUser.email, mockUser.password)

      expect(result).toEqual({
        success: true,
        user: mockResponse.data.user,
      })
    })

    it('should return error on invalid credentials', async () => {
      const mockError = { message: 'Invalid credentials' }

      const result = await login('wrong@example.com', 'wrongpassword')

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })
})
```

### 5.3 Exemplo: Teste de Componente

```typescript
// components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/senha/i), 'password123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
```

### 5.4 Exemplo: Teste de API com MSW

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  }),
]

// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

---

## 6. Checklist de Qualidade Antes de Commitar

### 6.1 Verificação Rápida

```bash
# 1. Rodar lint
npm run lint

# 2. Rodar typecheck
npm run typecheck

# 3. Rodar testes
npm run test

# 4. Verificar coverage
npm run test:coverage
```

### 6.2 Checklist Final

```markdown
## Pré-Commit Checklist
- [ ] Lint passou sem erros
- [ ] TypeScript compilou
- [ ] Todos os testes passaram
- [ ] Commits são atômicos e descritivos
- [ ] Branch está atualizada com develop
- [ ] Não há arquivos desnecessários (console.log, debugger)
- [ ] Variáveis sensíveis não foram commitadas
- [ ] Documentação foi atualizada (se necessário)
```

---

## 7. Commits Frequentes vs. Commits Grandes

### 7.1 Por que Commits Frequentes?

✅ Facilita revisão de código
✅ Reduz risco de conflitos
✅ Permite reverter facilmente
✅ Documenta progresso incrementalmente

### 7.2 Quando Commits Grandes São Aceitáveis?

- Refatoração grande
- Migração de dependência
- Reestruturação arquitetural

### 7.3 Tamanho Ideal

**Regra:** Cada commit deve fazer **uma coisa** e fazê-la bem.

```bash
# ❌ Ruim: Múltiplas mudanças
git commit -m "feat: add auth and fix bugs and update UI"

# ✅ Bom: Commits separados
git commit -m "feat: add authentication system"
git commit -m "fix: resolve login validation issue"
git commit -m "style: update button component"
```

---

## 8. Ferramentas de Automação

### 8.1 Husky + Lint-Staged

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 8.2 Commitizen (Opcional)

```bash
# Instalar
npm install -D commitizen cz-conventional-changelog

# Configurar
npx commitizen init cz-conventional-changelog

# Usar
npx cz
```

---

## 9. Referências

| Recurso | URL |
|---------|-----|
| Conventional Commits | https://www.conventionalcommits.org/ |
| Git Flow | https://nvie.com/posts/a-successful-git-branching-model/ |
| Vitest | https://vitest.dev/ |
| Testing Library | https://testing-library.com/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
