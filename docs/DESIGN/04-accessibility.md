# 04-accessibility.md

## Design: Acessibilidade (A11y)

Guia completo para garantir que aplicações atendam WCAG 2.1 AA.

---

## 1. WCAG 2.1 AA Checklist

### 1.1 Perceivable

```markdown
## 1.1 Text Alternatives
- [ ] Todas as imagens têm `alt` text
- [ ] Ícones decorativos têm `alt=""`
- [ ] Complexas imagens têm `alt` descritivo

## 1.2 Time-based Media
- [ ] Vídeos têm legendas (CC)
- [ ] Áudio tem transcrição

## 1.3 Adaptable
- [ ] Ordem de leitura logical
- [ ] Headings (h1 → h2 → h3) hierarchy correta
- [ ] Link purpose claro (não "clique aqui")
- [ ] Form labels associados

## 1.4 Distinguishable
- [ ] Contraste 4.5:1 (normal text)
- [ ] Contraste 3:1 (large text, 18px+ bold ou 24px+)
- [ ] Texto pode ser aumentado 200% sem quebrar
- [ ] Cor não é único indicador de informação
```

### 1.2 Operable

```markdown
## 2.1 Keyboard Accessible
- [ ] Todo interactive é focável (button, link, input)
- [ ] Ordem de focus logical
- [ ] Keyboard trap não existe
- [ ] Skip links disponíveis

## 2.2 Enough Time
- [ ] Timeout extensíveis (sessão, carrinho)
- [ ] Indicação de tempo restante

## 2.3 Seizures
- [ ] Conteúdo pisca menos de 3x/segundo

## 2.4 Navigable
- [ ] Page titles descritivos
- [ ] Focus order logical
- [ ] Focus visible
- [ ] Purpose de link claro
```

### 1.3 Understandable

```markdown
## 3.1 Readable
- [ ] html lang attribute setado
- [ ] Mudanças de linguagem marcadas

## 3.2 Predictable
- [ ] Comportamento predictable
- [ ] Navegação consistente

## 3.3 Input Assistance
- [ ] Labels visíveis
- [ ] Erros identificados claramente
- [ ] Sugestões de correção
- [ ] Error prevention (confirmação para ações destrutivas)
```

### 1.4 Robust

```markdown
## 4.1 Compatible
- [ ] Valid HTML
- [ ] Name, Role, Value expostos
- [ ] Status messages announcement
```

---

## 2. ARIA Labels

### 2.1 Quando Usar ARIA

```markdown
## NÃO use ARIA quando...
- HTML nativo é suficiente (button, a, input)
- Pode usar HTML5 semântico

## USE ARIA quando...
- HTML nativo não é suficiente
- Custom components (Radix, etc)
- Status messages
- Dynamic content updates
```

### 2.2 Atributos Essenciais

```typescript
// aria-label
<button aria-label="Close dialog">✕</button>

// aria-labelledby
<div aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirmar Ação</h2>
</div>

// aria-describedby
<input
  aria-describedby="password-requirements"
  type="password"
/>
<p id="password-requirements">
  Mínimo 8 caracteres
</p>

// aria-live
<div aria-live="polite">
  {/* Conteúdo será anunciado quando mudar */}
  {message}
</div>

// aria-atomic
<div aria-live="polite" aria-atomic="true">
  {/* Todo conteúdo será re-announced */}
</div>

// aria-hidden
<span aria-hidden="true">🎨</span>

// role
<div role="alert"> {/* Equivalente a live region */}
<div role="status"> {/* Para status messages não críticos */}

<form aria-label="Search form">
  <input role="searchbox" />
</form>
```

### 2.3 Exemplo Completo

```typescript
// components/Modal.tsx
import * as Dialog from '@radix-ui/react-dialog'

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open Modal</button>
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />

    <Dialog.Content
      aria-describedby="modal-description"
      className="..."
    >
      <Dialog.Title>Delete Account</Dialog.Title>
      <Dialog.Description id="modal-description">
        Esta ação não pode ser desfeita.
      </Dialog.Description>

      <div className="flex gap-4 mt-4">
        <Dialog.Close asChild>
          <button>Cancel</button>
        </Dialog.Close>
        <button className="bg-destructive text-white">
          Delete
        </button>
      </div>

      {/* Escape key handled by Radix automatically */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

---

## 3. Keyboard Navigation

### 3.1 Focus Order

```typescript
// ✅ BOM: Logical focus order
<form>
  <label for="email">Email</label>
  <input id="email" tabIndex={1} />

  <label for="password">Password</label>
  <input id="password" tabIndex={2} />

  <button tabIndex={3}>Login</button>
</form>

// ❌ RUIM: Focus order confuso
<button>Login</button>
<input id="email" />
<input id="password" />
```

### 3.2 Skip Links

```typescript
// components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
    >
      Pular para conteúdo principal
    </a>
  )
}

// app/layout.tsx
<body>
  <SkipLink />
  <header>...</header>
  <main id="main-content">
    {/* Conteúdo principal aqui */}
  </main>
</body>
```

### 3.3 Keyboard Patterns

```markdown
## Tab Trapping em Modals
- Focus entra no modal quando abre
- Tab ciclo dentro do modal
- Escape fecha o modal
- Focus retorna ao trigger quando fecha

## Menus/Dropdowns
- Enter/Space abre
- Arrow keys navegam
- Escape fecha
- Tab sai do menu

## Expand/Collapse (Accordion)
- Enter/Space expande/colapsa
- Arrow keys navegam entre itens

## Drag and Drop
- Teclado alternatives disponíveis
- Reorder com arrows
```

---

## 4. Focus Management

### 4.1 Focus Trap

```typescript
// components/Modal.tsx
import { useEffect } from 'react'

function Modal({ isOpen, onClose, children }: ModalProps) {
  // Focar no modal quando abre
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (isOpen) {
      titleRef.current?.focus()
    }
  }, [isOpen])

  // Trap focus enquanto modal aberto
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        // Implementar trap logic
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title" ref={titleRef} tabIndex={-1}>
        Modal Title
      </h2>
      {children}
    </div>
  )
}
```

### 4.2 Focus Restore

```typescript
// components/Dialog.tsx
import { useRef } from 'react'

function Dialog({ trigger, children }: DialogProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    triggerRef.current = document.activeElement as HTMLButtonElement
    // Focus move para dialog
  }

  const handleClose = () => {
    // Restore focus para trigger
    triggerRef.current?.focus()
  }

  return (
    <DialogPrimitive.Root onOpenChange={(open) => {
      open ? handleOpen() : handleClose()
    }}>
      <DialogPrimitive.Trigger ref={triggerRef}>
        {trigger}
      </DialogPrimitive.Trigger>
      {/* ... */}
    </DialogPrimitive.Root>
  )
}
```

---

## 5. Screen Reader Testing

### 5.1 Ferramentas

```markdown
## Desktop
- NVDA (Windows) - Grátis
- JAWS (Windows) - Pago
- VoiceOver (macOS) - Built-in

## Mobile
- VoiceOver (iOS) - Built-in
- TalkBack (Android) - Built-in

## DevTools
- Accessibility Inspector (Chrome DevTools)
- ARC Toolkit
```

### 5.2 Testing Checklist

```markdown
## Teste Manual com VoiceOver (macOS)

1. Cmd + F5 → Ativa VoiceOver
2. Tab através da página
3. Verificar:
   - [ ] Cada interactive element é anunciado
   - [ ] Ordem faz sentido
   - [ ] Labels são claras
   - [ ] States (disabled, selected, expanded) são anunciados

4. Teclas:
   - Ctrl + Option + Arrow → Navegar
   - Ctrl + Option + Space → Ativar
   - VO + Command + H → Headings
   - VO + Command + L → Links
   - VO + Command + J → Forms
```

### 5.3 axe-core Testing

```typescript
// tests/accessibility.ts
import { test, expect } from '@playwright/test'

test('homepage is accessible', async ({ page }) => {
  // Verificar Accessibility Tree
  await expect(page.locator('main')).toHaveAttribute('role', 'main')

  // Verificar headings hierarchy
  const headings = page.getByRole('heading')
  await expect(headings.first()).toHaveText(/h1/i)

  // Teste com axe
  await page.addScriptTag({
    content: `
      const axe = window.axe;
      axe.run(document).then(result => {
        window.axeResult = result;
      });
    `,
  })

  const violations = await page.evaluate(() => window.axeResult.violations)
  expect(violations).toHaveLength(0)
})
```

---

## 6. Cores e Contraste

### 6.1 Verificação de Contraste

```typescript
// lib/accessibility.ts
export function getContrastRatio(foreground: string, background: string): number {
  // Implementação de fórmula WCAG
  const lum1 = getLuminance(foreground)
  const lum2 = getLuminance(background)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function passesWCAGAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

export function passesWCAGAAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 4.5 : ratio >= 7
}
```

### 6.2 Tokens de Cores Acessíveis

```typescript
// Design tokens com contraste garantido
export const accessibleColors = {
  // Background claro com texto escuro
  background: {
    light: '#ffffff',
    dark: '#18181b',
  },
  text: {
    light: '#0f172a',  // Contraste 15:1 com white
    dark: '#f8fafc',  // Contraste 14:1 com dark
  },
  // Para texto grande (18px+ ou 14px+ bold)
  textLarge: {
    light: '#334155',  // Contraste 7:1 com white
    dark: '#cbd5e1',  // Contraste 7:1 com dark
  },
  // Cores de estado com contraste
  destructive: {
    bg: '#fef2f2',
    text: '#dc2626',   // Contraste 4.5:1+
    border: '#fecaca',
  },
  success: {
    bg: '#f0fdf4',
    text: '#16a34a',  // Contraste 4.5:1+
    border: '#bbf7d0',
  },
}
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| WCAG 2.1 | https://www.w3.org/WAI/WCAG21/quickref/ |
| WAI-ARIA | https://www.w3.org/WAI/ARIA/apg/ |
| axe DevTools | https://www.deque.com/axe/devtools/ |
| Checklist A11y | https://www.a11yproject.com/checklist/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
