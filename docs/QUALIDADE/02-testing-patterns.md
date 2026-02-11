# 02-testing-patterns.md

## Qualidade: Padrões de Testes

Guia completo para testes unitários, integração e E2E.

---

## 1. Vitest Setup

### 1.1 Configuração

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // describe, it, expect globais
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/', '.next/', '**/*.e2e.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.types.ts',
        'src/**/*.d.ts',
        'src/**/index.ts',
        '.next/',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 1.2 Setup File

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

---

## 2. React Testing Library

### 2.1 Patterns

```typescript
// ❌ TESTANDO IMPLEMENTAÇÃO
test('should call onClick', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick} />)

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

// ✅ TESTANDO COMPORTAMENTO
test('should show loading state when submitting', async () => {
  const user = userEvent.setup()

  render(<Form onSubmit={vi.fn()} />)

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(screen.getByRole('status')).toHaveTextContent(/loading/i)
})
```

### 2.2 Queries Priority

```typescript
// ORDEM DE PRIORIDADE (da maior para menor)

1. role (sem alternatives)
   screen.getByRole('button', { name: /submit/i })
   screen.getByRole('textbox', { name: /email/i })

2. aria-label
   screen.getByLabelText(/email address/i)

3. display value
   screen.getByDisplayValue(/john@example.com/i)

4. alt text
   screen.getByAltText(/user avatar/i)

5. title
   screen.getByTitle(/delete item/i)

6. testid
   screen.getByTestId('error-message')

// Para múltiplos elementos
screen.getAllByRole('listitem')
screen.queryAllByRole('button')
```

### 2.3 Async Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

// ✅ Espera por elemento que aparece
test('loads and displays greeting', async () => {
  render(<Greeting username="John" />)

  expect(screen.queryByText(/hello/i)).not.toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText(/hello john/i)).toBeInTheDocument()
  })
})

// ✅ Espera por desaparecimento
test('hides loading indicator after data loads', async () => {
  render(<DataComponent />)

  expect(screen.getByRole('status')).toHaveTextContent(/loading/i)

  await waitForElementToBeRemoved(() => screen.getByRole('status'))

  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

// ✅ Espera com timeout customizado
await waitFor(
  () => {
    expect(mockFn).toHaveBeenCalled()
  },
  { timeout: 1000 }
)
```

---

## 3. Mocking com MSW

### 3.1 Setup

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json({
      users: [
        { id: '1', name: 'John', email: 'john@example.com' },
        { id: '2', name: 'Jane', email: 'jane@example.com' },
      ],
    })
  }),

  http.post('/api/login', async ({ request }) => {
    const body = await request.json()

    if (body.email === 'test@example.com') {
      return HttpResponse.json({
        user: { id: '1', email: body.email },
        token: 'mock-jwt-token',
      })
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### 3.2 Handlers Avançados

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept com callback
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params

    if (id === '999') {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      id,
      name: 'John Doe',
      email: 'john@example.com',
    })
  }),

  // Simular delay
  http.get('/api/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return HttpResponse.json({ data: 'slow response' })
  }),

  // Dynamic responses
  http.get('/api/dynamic', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'

    return HttpResponse.json({
      page: Number(page),
      data: Array.from({ length: 10 }, (_, i) => ({
        id: Number(page) * 10 + i,
        name: `User ${page}-${i}`,
      })),
    })
  }),

  // GraphQL
  http.post('https://api.example.com/graphql', async ({ request }) => {
    const body = await request.json()

    if (body.query?.includes('getUser')) {
      return HttpResponse.json({
        data: { user: { id: '1', name: 'John' } },
      })
    }

    return HttpResponse.json({ errors: [{ message: 'Query not found' }] })
  }),
]
```

---

## 4. Playwright E2E

### 4.1 Configuração

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

### 4.2 E2E Tests

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'validpassword')

    await page.click('button[type="submit"]')

    // Espera por redirect
    await expect(page).toHaveURL(/.*dashboard.*/)

    // Verifica elementos na dashboard
    await expect(page.locator('h1')).toContainText(/dashboard/i)
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'invalid@example.com')
    await page.fill('[name="password"]', 'wrongpassword')

    await page.click('button[type="submit"]')

    // Verifica mensagem de erro
    await expect(page.locator('[role="alert"]')).toContainText(
      /invalid credentials/i
    )
  })

  test('should validate required fields', async ({ page }) => {
    // Tenta submeter sem preencher
    await page.click('button[type="submit"]')

    // Verifica validações
    await expect(page.locator('#email-error')).toContainText(/email is required/i)
    await expect(page.locator('#password-error')).toContainText(/password is required/i)
  })

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.fill('[name="email"]', 'mobile@test.com')
    await page.fill('[name="password"]', 'password123')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/.*dashboard.*/)
  })
})
```

### 4.3 Test Pattern: Page Object

```typescript
// tests/e2e/pages/LoginPage.ts
import type { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorAlert: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('[name="email"]')
    this.passwordInput = page.locator('[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')
    this.errorAlert = page.locator('[role="alert"]')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email)
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async login(email: string, password: string) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }

  async expectError(message: string) {
    await expect(this.errorAlert).toContainText(new RegExp(message, 'i'))
  }
}

// Uso
test('login flow', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('test@example.com', 'password123')
  await expect(page).toHaveURL(/.*dashboard.*/)
})
```

---

## 5. Coverage Thresholds

### 5.1 Vitest Config

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,

        // Por arquivo
        perFile: true,

        // Ignorar arquivos
        exclude: [
          '**/*.test.ts',
          '**/*.types.ts',
          'src/lib/supabase/**',
        ],
      },
    },
  },
})
```

### 5.2 GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

---

## 6. Referências

| Recurso | URL |
|---------|-----|
| Vitest | https://vitest.dev/ |
| React Testing Library | https://testing-library.com/docs/react-testing-library/ |
| MSW | https://mswjs.io/ |
| Playwright | https://playwright.dev/ |
| Testing Trophy | https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
