# 01-design-tokens.md

## Design: Tokens de Design

Sistema de tokens para consistência visual em todo o projeto.

---

## 1. Cores Semânticas

### 1.1 Cores do Sistema

```typescript
// lib/design-tokens.ts
export const colors = {
  // Primary
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Secondary
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Success (Green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  // Warning (Yellow/Orange)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },

  // Destructive (Red)
  destructive: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  // Muted
  muted: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Accent
  accent: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
  },

  // Background
  background: {
    DEFAULT: '#ffffff',
    muted: '#f8fafc',
    subtle: '#f1f5f9',
  },

  // Foreground
  foreground: {
    DEFAULT: '#0f172a',
    muted: '#64748b',
    subtle: '#94a3b8',
  },

  // Border
  border: {
    DEFAULT: '#e2e8f0',
    muted: '#f1f5f9',
  },

  // Input
  input: {
    DEFAULT: '#e2e8f0',
    ring: '#0ea5e9',
  },

  // Chart colors
  chart: {
    1: '#0ea5e9',
    2: '#8b5cf6',
    3: '#f59e0b',
    4: '#22c55e',
    5: '#ef4444',
  },
}
```

### 1.2 Tokens CSS

```css
/* globals.css */
@layer base {
  :root {
    /* Cores Primárias */
    --color-primary: 221.83 83.19% 53.33%;
    --color-primary-foreground: 210 40% 98%;

    /* Cores Destrutivas */
    --color-destructive: 0 84.2% 60.2%;
    --color-destructive-foreground: 210 40% 98%;

    /* Cores de Sucesso */
    --color-success: 142.1 76.2% 36.3%;
    --color-success-foreground: 355.7 100% 97.3%;

    /* Cores de Aviso */
    --color-warning: 45.4 93.4% 47.5%;
    --color-warning-foreground: 26 83.3% 14.1%;

    /* Cores Neutras */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    /* Border */
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    /* Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

---

## 2. Tipografia

### 2.1 Type Scale

```typescript
// lib/typography.ts
export const typography = {
  // Font families
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
    serif: ['Merriweather', 'Georgia', 'serif'],
  },

  // Font sizes (rem)
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },

  // Line heights
  lineHeights: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Letter spacing
  letterSpacings: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
}
```

### 2.2 Utility Classes

```css
/* globals.css */
@layer utilities {
  /* Typography */
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-base { font-size: 1rem; line-height: 1.5rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }

  /* Font weights */
  .font-normal { font-weight: 400; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }

  /* Tracking */
  .tracking-tight { letter-spacing: -0.025em; }
  .tracking-normal { letter-spacing: 0; }
  .tracking-wide { letter-spacing: 0.025em; }

  /* Leading */
  .leading-tight { line-height: 1.1; }
  .leading-normal { line-height: 1.5; }
  .leading-relaxed { line-height: 1.75; }
}
```

---

## 3. Espaçamento (8pt Grid)

### 3.1 Spacing Scale

```css
/* globals.css */
@layer utilities {
  /* 0px */
  .p-0 { padding: 0; }
  .m-0 { margin: 0; }

  /* 4px */
  .p-1 { padding: 0.25rem; }
  .m-1 { margin: 0.25rem; }
  .gap-1 { gap: 0.25rem; }
  .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }

  /* 8px */
  .p-2 { padding: 0.5rem; }
  .m-2 { margin: 0.5rem; }
  .gap-2 { gap: 0.5rem; }
  .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }

  /* 12px */
  .p-3 { padding: 0.75rem; }
  .m-3 { margin: 0.75rem; }
  .gap-3 { gap: 0.75rem; }

  /* 16px */
  .p-4 { padding: 1rem; }
  .m-4 { margin: 1rem; }
  .gap-4 { gap: 1rem; }
  .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }

  /* 24px */
  .p-6 { padding: 1.5rem; }
  .m-6 { margin: 1.5rem; }
  .gap-6 { gap: 1.5rem; }

  /* 32px */
  .p-8 { padding: 2rem; }
  .m-8 { margin: 2rem; }
  .gap-8 { gap: 2rem; }

  /* 48px */
  .p-12 { padding: 3rem; }
  .m-12 { margin: 3rem; }
  .gap-12 { gap: 3rem; }

  /* 64px */
  .p-16 { padding: 4rem; }
  .m-16 { margin: 4rem; }
  .gap-16 { gap: 4rem; }
}
```

---

## 4. Sombras e Bordas

### 4.1 Shadows

```css
/* globals.css */
@layer utilities {
  /* Sombras pequenas */
  .shadow-sm {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  /* Sombra padrão */
  .shadow {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  /* Sombra média */
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  /* Sombra grande */
  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  /* Sombra xl */
  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  /* Sombra para modal */
  .shadow-2xl {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  /* Inner shadow */
  .shadow-inner {
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  }
}
```

### 4.2 Borders

```css
/* globals.css */
@layer utilities {
  /* Border widths */
  .border { border-width: 1px; }
  .border-2 { border-width: 2px; }
  .border-4 { border-width: 4px; }
  .border-8 { border-width: 8px; }
  .border-0 { border-width: 0; }

  /* Border radius */
  .rounded-sm { border-radius: 0.125rem; }
  .rounded { border-radius: 0.25rem; }
  .rounded-md { border-radius: 0.375rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-2xl { border-radius: 1rem; }
  .rounded-3xl { border-radius: 1.5rem; }
  .rounded-full { border-radius: 9999px; }

  /* Border colors */
  .border-border { border-color: var(--border); }
  .border-input { border-color: var(--input); }
  .border-primary { border-color: hsl(var(--color-primary)); }
  .border-destructive { border-color: hsl(var(--color-destructive)); }

  /* Border styles */
  .border-solid { border-style: solid; }
  .border-dashed { border-style: dashed; }
  .border-dotted { border-style: dotted; }
}
```

---

## 5. CSS Custom Properties

### 5.1 Uso Completo

```css
/* globals.css */
@layer base {
  :root {
    /* ===== Cores ===== */
    --color-primary: 221.83 83.19% 53.33%;
    --color-primary-foreground: 210 40% 98%;

    --color-secondary: 215 27.9% 16.9%;
    --color-secondary-foreground: 210 40% 98%;

    --color-muted: 215 27.9% 16.9%;
    --color-muted-foreground: 217.9 10.6% 64.9%;

    --color-accent: 217.2 32.6% 17.5%;
    --color-accent-foreground: 210 40% 98%;

    --color-destructive: 0 84.2% 60.2%;
    --color-destructive-foreground: 210 40% 98%;

    --color-success: 142.1 76.2% 36.3%;
    --color-success-foreground: 355.7 100% 97.3%;

    --color-warning: 45.4 93.4% 47.5%;
    --color-warning-foreground: 26 83.3% 14.1%;

    --color-background: 0 0% 100%;
    --color-foreground: 222.2 84% 4.9%;

    --color-card: 0 0% 100%;
    --color-card-foreground: 222.2 84% 4.9%;

    --color-popover: 0 0% 100%;
    --color-popover-foreground: 222.2 84% 4.9%;

    --color-border: 214.3 31.8% 91.4%;
    --color-input: 214.3 31.8% 91.4%;
    --color-ring: 221.2 83.2% 53.3%;

    /* ===== Tipografia ===== */
    --font-sans: Inter, system-ui, sans-serif;
    --font-mono: JetBrains Mono, monospace;

    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-full: 9999px;

    /* ===== Sombras ===== */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  .dark {
    --color-background: 222.2 84% 4.9%;
    --color-foreground: 210 40% 98%;
    --color-card: 222.2 84% 4.9%;
    --color-card-foreground: 210 40% 98%;
    --color-popover: 222.2 84% 4.9%;
    --color-popover-foreground: 210 40% 98%;
    --color-primary: 212.7 26.8% 83.9%;
    --color-primary-foreground: 222.2 47.4% 11.2%;
    --color-secondary: 217.2 32.6% 17.5%;
    --color-secondary-foreground: 210 40% 98%;
    --color-muted: 217.2 32.6% 17.5%;
    --color-muted-foreground: 215 20.2% 65.1%;
    --color-accent: 217.2 32.6% 17.5%;
    --color-accent-foreground: 210 40% 98%;
    --color-destructive: 0 62.8% 30.6%;
    --color-destructive-foreground: 210 40% 98%;
    --color-border: 217.2 32.6% 17.5%;
    --color-input: 217.2 32.6% 17.5%;
    --color-ring: 212.7 26.8% 83.9%;
  }
}
```

---

## 6. Utility Functions

### 6.1 cn() Helper

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Uso
import { cn } from '@/lib/utils'

<div className={cn(
  'base-styles',
  variant === 'primary' && 'primary-styles',
  isDisabled && 'disabled-styles'
)} />
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| shadcn/ui Colors | https://ui.shadcn.com/docs/theming |
| Tailwind Colors | https://tailwindcss.com/docs/customizing-colors |
| 8pt Grid | https://spec.fm/specifics/8-point-grid |
| Type Scale | https://type-scale.com/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
