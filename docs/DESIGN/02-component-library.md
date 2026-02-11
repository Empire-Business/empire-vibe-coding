# 02-component-library.md

## Design: Biblioteca de Componentes

Guia para criar e manter componentes consistentes usando shadcn/ui.

---

## 1. Setup shadcn/ui

### 1.1 Instalação

```bash
# Inicializar shadcn
npx shadcn-ui@latest init

# Adicionar componentes
npx shadcn-ui@latest add button input card dialog dropdown-menu
npx shadcn-ui@latest add form select tabs toast
npx shadcn-ui@latest add table avatar badge skeleton tooltip

# Adicionar Radix primitives
npx shadcn-ui@latest add accordion alert-dialog context-menu hover-card
```

### 1.2 Estrutura

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (não editar!)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── forms/
│   │   ├── FormField.tsx
│   │   ├── Select.tsx
│   │   └── index.ts
│   └── index.ts               # Exportações
├── lib/
│   ├── utils.ts               # cn() helper
│   └── design-tokens.ts
```

---

## 2. Radix UI Primitives

### 2.1 Quando Usar

```markdown
## Use Radix para:
- Comportamentos complexos (Dialog, Dropdown, Tooltip)
- Acessibilidade automática (keyboard nav, ARIA)
- Composability (multiple components)
- Styled customization

## NÃO use Radix para:
- Botões simples (use HTML + styles)
- Inputs simples (use shadcn Input)
- Cards básicos (use HTML + shadcn Card)
```

### 2.2 Exemplo: Dialog

```typescript
// components/ui/Dialog.tsx
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---

## 3. Atomic Design na Prática

### 3.1 Hierarchy

```
src/components/
├── atoms/                    # Primitivos HTML
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Label.tsx
│   └── Icon.tsx
├── molecules/                # Combinação de atoms
│   ├── SearchInput.tsx        # Input + Button
│   ├── FormField.tsx         # Label + Input + Error
│   └── CardHeader.tsx        # Title + Subtitle + Icon
├── organisms/                # Componentes complexos
│   ├── LoginForm.tsx
│   ├── ProductCard.tsx
│   └── Navbar.tsx
└── templates/                # Page layouts
    ├── DashboardLayout.tsx
    └── AuthLayout.tsx
```

### 3.2 Exemplo: FormField (Molecule)

```typescript
// components/forms/FormField.tsx
import * as React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { ErrorMessage } from './ErrorMessage'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  field?: ControllerRenderProps
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, helperText, field, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s/g, '-')

    return (
      <div className={cn('space-y-2', className)}>
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          id={inputId}
          ref={ref}
          {...field}
          {...props}
          className={cn(error && 'border-destructive')}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        />
        {error && (
          <ErrorMessage id={`${inputId}-error`}>{error}</ErrorMessage>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

export { FormField }
```

---

## 4. Compound Components

### 4.1 Exemplo: Card Compound

```typescript
// components/ui/Card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Exports compostos
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

// Uso
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

---

## 5. Props Naming Conventions

### 5.1 Convenções

```typescript
// Events
onClick      // Botão/clique
onChange     // Input mudança
onSubmit     // Form submit
onHover      // Mouse over
onFocus      // Ganhou foco
onBlur       // Perdeu foco

// Boolean
isOpen       // Estado aberto/fechado
isLoading    // Carregando
isDisabled   // Desabilitado
isSelected   // Selecionado
isActive     // Ativo
hasError     // Tem erro
canSubmit    // Pode submeter

// Sizes
size?: 'sm' | 'md' | 'lg' | 'xl'
variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'destructive'

// Refs
ref?: React.Ref<T>

// IDs
id?: string
inputId?: string
labelId?: string
```

### 5.2 Exemplo Completo

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helperText?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}
```

---

## 6. Exportações

### 6.1 Index Organized

```typescript
// components/index.ts
// UI Components
export { Button } from './ui/Button'
export { Input } from './ui/Input'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card'
export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from './ui/Dialog'
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/DropdownMenu'

// Form Components
export { FormField } from './forms/FormField'
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './forms/Select'

// Feedback
export { Toast, useToast, Toaster } from './feedback/Toast'
export { Skeleton } from './feedback/Skeleton'
```

---

## 7. Referências

| Recurso | URL |
|---------|-----|
| shadcn/ui | https://ui.shadcn.com/ |
| Radix UI | https://www.radix-ui.com/ |
| Atomic Design | https://atomicdesign.bradfrost.com/ |
| React Hook Form | https://react-hook-form.com/ |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
