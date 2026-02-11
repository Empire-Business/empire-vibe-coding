# 03-dependencies-audit.md

## Segurança: Auditoria de Dependências

Guia para manter dependências seguras e atualizadas.

---

## 1. npm audit Workflow

### 1.1 Verificação Regular

```bash
# Auditoria básica
npm audit

# Auditoria com output formatado
npm audit --json > audit-report.json

# Auditoria de produção (menos ruído)
npm audit --production

# Apenas vulnerabilidades de alta severidade
npm audit --level=high
```

### 1.2 Script de Auditoria Automática

```bash
#!/bin/bash
# scripts/security-audit.sh

echo "Running npm audit..."
npm audit --production --audit-level=high --json > audit-report.json

# Verificar se há vulnerabilidades críticas
CRITICAL_COUNT=$(jq '.metadata.vulnerable | map(select(.severity == "critical")) | length' audit-report.json)

if [ "$CRITICAL_COUNT" -gt 0 ]; then
  echo "❌ Found $CRITICAL_COUNT critical vulnerabilities!"
  jq '.vulnerabilities | to_entries[] | select(.value.severity == "critical") | .key' audit-report.json
  exit 1
fi

echo "✅ No critical vulnerabilities found"
```

### 1.3 CI Integration

```yaml
# .github/workflows/security-audit.yml
name: Security Audit

on:
  schedule:
    - cron: '0 9 * * 1'  # Toda segunda às 9AM
  push:
    paths:
      - 'package.json'
      - 'package-lock.json'
  workflow_dispatch:

jobs:
  audit:
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

      - name: Run npm audit
        run: npm audit --production --audit-level=high

      - name: Upload audit report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: audit-report
          path: audit-report.json
```

---

## 2. Dependabot Configuration

### 2.1 Configuração Básica

```yaml
# .github/dependabot.yml
version: 2
updates:
  # npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "America/Sao_Paulo"
    open-pull-requests-limit: 10

    labels:
      - "dependencies"
      - "npm"

    commit-message:
      prefix: "chore(deps)"

    groups:
      development-dependencies:
        dependency-type: "development"
        update-types: ["minor", "patch"]
      production-dependencies:
        dependency-type: "production"
        update-types: ["patch"]
      react-ecosystem:
        patterns:
          - "react*"
          - "@types/react*"
          - "next*"
        update-types: ["minor", "patch"]

    # Ignorar versões específicas
    ignore: []
```

### 2.2 Configuração Avançada

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"

    # Pull request security settings
    open-pull-requests-limit: 10

    # Prefix customizado
    commit-message:
      prefix: "chore"
      prefix-development: "chore"
      include: "all"

    # Labels
    labels:
      - "dependencies"
      - "npm"

    # Regras de ignored updates
    ignore: []
      # - dependency-name: "lodash"
      #   versions: [">=4.5.0"]  # Ignorar updates até 4.5.0

    # Groups
    groups:
      # Security updates (sempre abrir PR)
      security-updates:
        applies-to: security-updates
        patterns:
          - "*"

      # Major updates precisam de revisão manual
      major-changes:
        patterns:
          - "*"
        update-types:
          - "major"

      # React minor/patch
      react-minor:
        patterns:
          - "react*"
          - "@types/react*"
        update-types:
          - "minor"
          - "patch"
```

### 2.3 Security Alerts Only

```yaml
# Para projetos que só querem security updates
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    labels:
      - "security"

    # Apenas security updates
    applies-to: security-updates
```

---

## 3. Package.json Security

### 3.1 Engine Restrictions

```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

### 3.2 Dependency Rules

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "zod": "^3.22.0"
  },
  "overrides": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "resolutions": {
    "ajv": "^8.12.0"
  }
}
```

### 3.3 Scripts de Verificação

```json
{
  "scripts": {
    "security:audit": "npm audit --production --audit-level=high",
    "security:check": "npm ls --depth=0",
    "security:outdated": "npm outdated --depth=0",
    "security:licenses": "license-checker --csv --summary"
  }
}
```

---

## 4. Dependency Review

### 4.1 GitHub Action

```yaml
# .github/workflows/dependency-review.yml
name: Dependency Review
on:
  pull_request:
    paths:
      - 'package.json'
      - 'package-lock.json'
      - '**/package*.json'

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Review Dependencies
        uses: actions/dependency-review-action@v4
        with:
          # Fail on critical/high vulnerabilities
          fail-on-severity: high
          # License filter
          allowed-license-types: |
            MIT
            ISC
            Apache-2.0
            BSD-3-Clause
            BSD-2-Clause
```

### 4.2 Sonatype OSS Index

```yaml
# .github/workflows/oss-index.yml
name: OSS Index Scan
on:
  schedule:
    - cron: '0 12 * * 0'  # Domingo ao meio-dia

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run OSS Index
        uses: sonatype-nexus-community/oss-index-scan-action@v1
        with:
          # Ignorar dev dependencies
          dev-dependencies: "false"
          # Formato de output
          output: "sarif"
          # URL do servidor (opcional, usa público por padrão)
          # server-url: "https://ossindex.sonatype.org"

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: oss-index-results.sarif
```

---

## 5. Vulnerability Management

### 5.1 Priorização

```markdown
## Vulnerabilidade Severity vs Response Time

| Severity | Time to Fix | Exemplo |
|----------|-------------|---------|
| Critical | < 24h | RCE, SQL Injection |
| High | < 7 dias | XSS persistente, Auth bypass |
| Medium | < 30 dias | Information disclosure |
| Low | backlog | Deprecation warnings |
```

### 5.2 Patch Workflow

```bash
# 1. Verificar vulnerabilidade
npm audit

# 2. Identificar pacote vulnerable
# Exemplo: lodash < 4.17.21

# 3. Atualizar pacote específico
npm update lodash

# 4. Verificar se atualização quebra algo
npm test

# 5. Se quebrar, verificar alternatives
npm install lodash@^4.17.21 --save-exact

# 6. Commit
git add package.json package-lock.json
git commit -m "fix(deps): update lodash to fix CVE-2021-23337"
```

### 5.3 Dependency Graph

```bash
# Verificar quem depende de um pacote
npm why lodash

# Verificar se há breaking changes
npm view lodash@4.17.21 majorChanges
```

---

## 6. Ferramentas Complementares

### 6.1 Snyk

```bash
# Install
npm install -g snyk

# Auth
snyk auth

# Test
snyk test

# Monitor
snyk monitor

# Protect (auto-fix)
snyk protect
```

### 6.2 Renovate

```json
// .github/renovate.json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base"
  ],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ]
}
```

### 6.3 Socket

```bash
# Install Socket
npm install -g @socketsecurity/cli

# Analyze
socket npm
```

---

## 7. Checklist de Segurança

```markdown
## Daily
- [ ] Review GitHub security alerts
- [ ] Verificar dependabot PRs

## Weekly
- [ ] npm audit (production)
- [ ] Update patch versions
- [ ] Review outdated packages

## Monthly
- [ ] Update minor versions
- [ ] Review dependency graph
- [ ] Check for license compliance
- [ ] Test full upgrade

## Quarterly
- [ ] Major version upgrades planned
- [ ] Remove unused dependencies
- [ ] Security audit externo
```

---

## 8. Referências

| Recurso | URL |
|---------|-----|
| npm audit | https://docs.npmjs.com/cli/v8/commands/npm-audit |
| Dependabot | https://docs.github.com/en/code-security/dependabot |
| OWASP Dependency Check | https://owasp.org/www-project-dependency-check/ |
| Snyk | https://snyk.io/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
