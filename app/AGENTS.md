# AGENTS.md - Frontend

## Tech Stack
React 19 + Vite + TanStack Router (hash mode, file-based) + TanStack Query + Tailwind CSS v4 + shadcn/ui + TypeScript

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
- shadcn/ui in `components/ui/` (style: `new-york`, base color: `neutral`)
- Path alias: `@/` → `src/`

## Testing
- Vitest + React Testing Library
- jsdom environment, globals enabled
- Currently only `src/lib/cn.test.ts` exists; no component/hook tests yet

## Key Files & Directories
- `src/router.tsx` - TanStack Router config (`createHashHistory`, `defaultPreload: "intent"`, `scrollRestoration: true`)
- `src/routeTree.gen.ts` - **Auto-generated** by TanStack Router Vite plugin; do not edit manually
- `src/queryClient.tsx` - Shared `QueryClient` instance
- `src/main.tsx` - App entry; dark mode hardcoded via `document.documentElement.classList.add("dark")`
- `src/hooks/` - Query hooks organized by domain (`player/`, `deck/`, `game/`)
- `src/api/` - API types matching backend DTOs (`player.tsx`, `game.tsx`)
- `src/contexts/` - React Context for shared state (`playersContext.tsx`)
- `src/utils/` - Utility helpers (`decks.ts` for Bracket enum, `players.ts`, `env.ts`, `meta.ts`)
- `src/components/ui/` - shadcn/ui components
- `components.json` - shadcn/ui config; governs `npx shadcn` add behavior

## Routing (File-based)
TanStack Router uses file-based routing under `src/routes/`:
```
routes/
├── __root.tsx          # Root layout: Header + Footer + Toaster + Outlet
├── index.tsx           # Redirects to /game
├── bracket-info.tsx    # Static bracket reference page
├── game/
│   ├── -components/    # Route-colocated components (prefix "-" = not a route)
│   ├── index.tsx       # Game creation
│   ├── $gameId.tsx     # Game detail
│   ├── running.tsx     # Running games list
│   └── past.tsx        # Finished games list
├── player/
│   ├── -components/
│   ├── $id.index.tsx       # Player profile
│   ├── $id.deck.tsx        # Add deck to player
│   └── $id.edit.$deckId.tsx # Edit deck
└── players/
    ├── -components/
    └── index.tsx           # Players list
```
Directories prefixed with `-` contain colocated route components and are not treated as routes by the router plugin.
