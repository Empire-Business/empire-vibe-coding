# 03-skeleton-loaders.md

## Design: Skeleton Loaders

Guia para criar e usar skeleton loaders para melhor UX durante carregamento.

---

## 1. Princípios

### 1.1 Por Que Skeletons?

```markdown
## Benefícios dos Skeletons

- ✅ Reduz percepção de wait time
- ✅ Indica que conteúdo está carregando
- ✅ Mostra estrutura do conteúdo
- ✅ Melhor que spinners para conteúdo extenso
- ✅ Ajuda a reduzir Cognitive Load
```

### 1.2 Quando Usar

| Situação | Recomendação |
|----------|--------------|
| Loading de lista/cards | Skeleton com shimmer |
| Loading de tabela | Table skeleton |
| Loading de imagem | Image placeholder + shimmer |
| Loading de texto | Text skeleton lines |
| Loading muito rápido (<200ms) | Flash de conteúdo ou nada |

---

## 2. Skeleton Base Component

### 2.1 Componente Base

```typescript
// components/ui/Skeleton.tsx
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: number | string
  height?: number | string
}

function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variant === 'text' && 'rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        className
      )}
      style={{
        width: width,
        height: height || (variant === 'text' ? '1em' : undefined),
      }}
      {...props}
    />
  )
}
```

### 2.2 Shimmer Animation

```css
/* globals.css */
@layer utilities {
  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(
      90deg,
      hsl(var(--color-muted)) 0%,
      hsl(var(--color-muted-foreground) / 0.1) 50%,
      hsl(var(--color-muted)) 100%
    );
    background-size: 200% 100%;
    background-position: -200% 0;
  }

  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### 2.3 Componente Shimmer

```typescript
// components/ui/Shimmer.tsx
import { cn } from '@/lib/utils'

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
}

function Shimmer({ className, width = '100%', height = '100%', ...props }: ShimmerProps) {
  return (
    <div
      className={cn('animate-shimmer rounded-md', className)}
      style={{ width, height }}
      {...props}
    />
  )
}
```

---

## 3. Skeletons para Cards

### 3.1 Card Skeleton

```typescript
// components/skeletons/CardSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton'

interface CardSkeletonProps {
  showImage?: boolean
  imageHeight?: number
  lines?: number
}

export function CardSkeleton({ showImage = true, imageHeight = 200, lines = 3 }: CardSkeletonProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      {showImage && <Skeleton className="mb-4 w-full" style={{ height: imageHeight }} />}

      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        <div className="pt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6 mt-1" />
          {lines > 2 && <Skeleton className="h-3 w-4/6 mt-1" />}
        </div>

        <div className="pt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

// Uso
{isLoading ? (
  <CardSkeleton />
) : (
  <ProductCard product={product} />
)}
```

### 3.2 Profile Card Skeleton

```typescript
// components/skeletons/ProfileSkeleton.tsx
export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}
```

---

## 4. Skeletons para Listas

### 4.1 List Skeleton

```typescript
// components/skeletons/ListSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton'

interface ListSkeletonProps {
  items?: number
  showAvatar?: boolean
}

export function ListSkeleton({ items = 5, showAvatar = true }: ListSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 4.2 Article List Skeleton

```typescript
// components/skeletons/ArticleListSkeleton.tsx
export function ArticleListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <article key={i} className="flex gap-4">
          <Skeleton className="h-32 w-32 flex-shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-2 flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
```

---

## 5. Skeletons para Tabelas

### 5.1 Table Skeleton

```typescript
// components/skeletons/TableSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton'

interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
}

export function TableSkeleton({ rows = 5, columns = 4, showHeader = true }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex gap-4 border-b pb-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
      )}

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 py-3 border-b last:border-0">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Complex Table Skeleton
export function DataTableSkeleton({ columns }: { columns: Column[] }) {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        {/* Filters */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex gap-4 border-b pb-2">
          {columns.map((col) => (
            <Skeleton key={col.id} className="h-4 w-full" style={{ width: col.width }} />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-2">
            {columns.map((col) => (
              <Skeleton key={col.id} className="h-8 w-full" style={{ width: col.width }} />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-t p-4 flex items-center justify-between">
        <Skeleton className="h-8 w-[150px]" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}
```

---

## 6. Skeletons para Formulários

### 6.1 Form Skeleton

```typescript
// components/skeletons/FormSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton'

export function FormSkeleton() {
  return (
    <div className="space-y-6 max-w-md">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

// Compact Form Field
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
```

---

## 7. Uso com TanStack Query

### 7.1 Pattern Componente + Skeleton

```typescript
// components/UsersList.tsx
import { useUsers } from '@/hooks/useUsers'
import { ListSkeleton } from '@/components/skeletons/ListSkeleton'
import { UserCard } from '@/components/UserCard'

export function UsersList() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) {
    return <ListSkeleton items={5} showAvatar />
  }

  if (error) {
    return <div>Error loading users</div>
  }

  return (
    <div>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

// Custom hook com skeleton trigger
export function useUsersWithSkeleton() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    placeholderData: (previousData) => previousData, // Keep old data while loading
  })
}
```

---

## 8. Referências

| Recurso | URL |
|---------|-----|
| shadcn/ui Skeleton | https://ui.shadcn.com/docs/components/skeleton |
| Loading States | https://www.smashingmagazine.com/2019/02/loading-states-ux/ |
| Best Practices | https://uxplanet.org/loading-skeleton-components-best-practices |

---

**Versão:** 1.0.0
**Última atualização:** 2024-01-15
**Responsável:** Claude Code
