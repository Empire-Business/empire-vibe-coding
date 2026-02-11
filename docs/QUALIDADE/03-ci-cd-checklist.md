# 03-ci-cd-checklist.md

## Qualidade: CI/CD Checklist

Guia completo para pipelines de CI/CD com GitHub Actions.

---

## 1. GitHub Actions Workflow

### 1.1 Estrutura do Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript
        run: npm run typecheck

  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: nextjs-build
          path: .next/
          retention-days: 1

  security:
    name: Security
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --production --audit-level=high

      - name: Run dependency review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high

  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: [build]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: nextjs-build
          path: .next/

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prebuilt'
```

---

## 2. Lint + Typecheck

### 2.1 ESLint Configuration

```yaml
# .github/workflows/lint.yml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint
        env:
          CI: true
```

### 2.2 TypeScript Check

```yaml
# .github/workflows/typecheck.yml
name: Type Check

on: [push, pull_request]

jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript
        run: npm run typecheck
        env:
          CI: true
```

---

## 3. Test Suite

### 3.1 Unit Tests

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

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false
```

### 3.2 E2E Tests

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Domingo à meia-noite

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Start server
        run: npm run dev &
        shell: bash

      - name: Wait for server
        run: sleep 10

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true

      - name: Upload artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## 4. Security Audit

### 4.1 Full Security Workflow

```yaml
# .github/workflows/security.yml
name: Security

on:
  schedule:
    - cron: '0 9 * * 1'  # Segunda às 9AM
  push:
    paths:
      - 'package.json'
      - 'package-lock.json'
  pull_request:
    paths:
      - 'package.json'
      - 'package-lock.json'

jobs:
  audit:
    name: npm Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --production --audit-level=high

  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Dependency Review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high
          license-check: true

  secrets-scan:
    name: Secrets Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: TruffleHog
        uses: trufflesecurity/trufflehog@latest
        with:
          extra_args: --only-verified
```

---

## 5. Deployment Checklist

### 5.1 Pre-Deploy Validation

```markdown
## ✅ Deploy Checklist

### Código
- [ ] Tests passando
- [ ] Lint passando
- [ ] TypeScript compilando
- [ ] Build sucesso

### Segurança
- [ ] npm audit passou
- [ ] Nenhuma vulnerability crítica
- [ ] Dependencies atualizadas

### Qualidade
- [ ] Coverage >= 80%
- [ ] E2E tests passando
- [ ] Performance aceitável

### Configuração
- [ ] Environment variables setadas
- [ ] Database migrations testadas
- [ ] Feature flags configurados
```

### 5.2 Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: Environment to deploy
        required: true
        type: choice
        options:
          - staging
          - production

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: TypeCheck
        run: npm run typecheck

      - name: Unit Tests
        run: npm run test:unit -- --run

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

      - name: Upload build
        uses: actions/upload-artifact@v4
        with:
          name: build-${{ github.sha }}
          path: .next/
          retention-days: 1

  deploy:
    name: Deploy to ${{ github.event.inputs.environment || 'staging' }}
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: ${{ github.event.inputs.environment || 'staging' }}
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: build-${{ github.sha }}
          path: .next/

      - name: Deploy to Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./

      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Deployed to preview: ${{ steps.deploy.outputs.preview-url }}'
            })

  smoke-test:
    name: Smoke Test
    runs-on: ubuntu-latest
    needs: deploy
    steps:
      - name: Wait for deployment
        run: sleep 30

      - name: Health Check
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" ${{ needs.deploy.outputs.url }})
          if [ "$response" -eq 200 ]; then
            echo "✅ Health check passed"
          else
            echo "❌ Health check failed (HTTP $response)"
            exit 1
          fi
```

---

## 6. Quality Gates

### 6.1 PR Requirements

```yaml
# .github/workflows/pr-require.yml
name: PR Requirements

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  check-requirements:
    name: Check PR Requirements
    runs-on: ubuntu-latest
    steps:
      - name: Check for linked issues
        uses: actions/github-script@v7
        with:
          script: |
            const { data: commits } = await github.rest.pulls.listCommits({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
            })

            const hasLinkedIssue = commits.some(commit =>
              commit.commit.message.includes('#') ||
              commit.commit.message.includes('Closes')
            )

            if (!hasLinkedIssue) {
              github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: '⚠️ This PR should be linked to an issue.'
              })
            }
```

### 6.2 Auto Label

```yaml
# .github/workflows/auto-label.yml
name: Auto Label

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  label:
    name: Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
        with:
          sync-labels: true
```

```yaml
# .github/labeler.yml
features:
  - src/features/**/*

bugfix:
  - src/**/*fix*/*
  - '**/*.bug*'

docs:
  - '**/*.md'
  - docs/**/*

tests:
  - '**/*.test.*'
  - '**/*.spec.*'
  - tests/**/*
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| GitHub Actions | https://docs.github.com/en/actions |
| Vercel Deploy | https://vercel.com/docs/deployments/overview |
| Playwright CI | https://playwright.dev/docs/ci/ |
| Codecov | https://docs.codecov.com/docs/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
