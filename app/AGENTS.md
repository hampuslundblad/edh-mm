# AGENTS.md - Frontend

## Tech Stack
React 19 + Vite + TanStack Router (hash mode) + TanStack Query + Tailwind CSS v4 + shadcn/ui + TypeScript

## Commands

```bash
npm run dev          # Dev server localhost:3000, proxies /api to :5000
npm run build        # Production build (vite build && tsc)
npm run serve        # Preview production build
npm test             # Run Vitest tests
npm test -- path/to/test.test.ts  # Run single test file
npm run lint         # ESLint
npm run format       # Prettier check
npm run check        # Format with Prettier + lint with ESLint
```

## Code Style

### Formatting (Prettier)
- `semi: false`, `singleQuote: false`, `trailingComma: "all"`, `bracketSpacing: true`

### Naming
- Files: kebab-case (`player-service.ts`)
- Components: PascalCase (`PlayerCard.tsx`)
- Variables/Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

### Imports
Group in order: external libs → `@/` aliases → relative
```typescript
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/cn"
import { PlayerCard } from "./PlayerCard"
```

### React Patterns
- Colocate tests: `Component.tsx` → `__tests__/Component.test.tsx`
- Export hooks + options objects from query hooks
- Use `cn()` utility for conditional Tailwind classes
- Hash routing required (`createHashHistory()`)

### Component Structure
- Flat in `components/` until growth demands grouping
- shadcn/ui in `components/ui/`
- Path alias: `@/` → `src/`

## Testing
- Vitest + React Testing Library
- jsdom environment, globals enabled

## Key Files
- `src/router.tsx` - TanStack Router config
- `src/hooks/` - Query hooks organized by domain
- `src/api/` - API types matching backend DTOs
- `src/contexts/` - React Context for shared state
