# EDH Match Manager - AI Coding Guide

## Project Overview

EDH (Elder Dragon Highlander / Commander) match manager - a full-stack application for tracking Magic: The Gathering Commander games.

**Architecture:**

- **Frontend:** React 19 + Vite + TanStack Router (hash mode) + TanStack Query + Tailwind CSS + shadcn/ui
- **Backend:** Spring Boot 3.5.3 + Java 21 + JPA + H2 database + Maven
- **Infrastructure:** Docker Compose with nginx reverse proxy

## Development Workflows

### Frontend (`app/`)

```bash
npm run dev          # Dev server on localhost:3000 (proxies /api to :5000)
npm run build        # Production build (runs vite build && tsc)
npm test             # Run Vitest tests
npm run check        # Format with Prettier + lint with ESLint
```

### Backend (`backend/`)

```bash
mvn spring-boot:run  # Start Spring Boot on port 5000
mvn test             # Run JUnit tests
```

### Full Stack

Docker Compose orchestrates nginx (ports 80/443) → frontend (:3000) + backend (:5000). See [infrastructure/docker-compose.yaml](../infrastructure/docker-compose.yaml).

## Key Architectural Decisions

### Frontend Routing

**Hash routing is mandatory** for deployment. Router configured in [app/src/router.tsx](../app/src/router.tsx):

```tsx
const hashHistory = createHashHistory()
const router = createRouter({ history: hashHistory, ... })
```

Routes auto-generated in `routeTree.gen.ts` by TanStack Router plugin.

### API Communication

- Frontend uses Vite proxy in dev: `/api` → `http://localhost:5000/api` (see [app/vite.config.js](../app/vite.config.js))
- Production: nginx routes `/api` to backend container
- API modules in [app/src/api/](../app/src/api/) define TypeScript types matching backend DTOs

### State Management

- **Server state:** TanStack Query hooks in [app/src/hooks/](../app/src/hooks/) organized by domain (`player/`, `game/`, `deck/`)
- **Local state:** React Context for shared player data (see [app/src/contexts/playersContext.tsx](../app/src/contexts/playersContext.tsx))
- **Pattern:** Export both hooks (`useAllPlayers`) and options objects (`getAllPlayersOptions`) for flexible query composition

### Backend Structure

Domain-driven organization under `com.hampuslundblad.edh`:

```
player/
  ├── Player.java (entity)
  ├── PlayerService.java
  ├── PlayerController.java (@RestController @RequestMapping("/api"))
  ├── PlayerRepository.java
  └── dto/, exceptions/
```

All controllers use `/api` base path. H2 console available at `/h2-console`.

## Project-Specific Conventions

### Frontend

- **Path alias:** `@/` → `src/` (configured in Vite + TypeScript)
- **Component structure:** Flat in `components/` until growth demands grouping (README suggests `Header/__tests__/Header.test.tsx` pattern)
- **UI components:** shadcn/ui in `components/ui/` - use `cn()` utility from [lib/cn.ts](../app/src/lib/cn.ts) for conditional Tailwind classes
- **Styling:** Tailwind utility-first (v4 with Vite plugin), avoid custom CSS

### Backend

- **Entities:** Use `Optional<Long> id` pattern (e.g., `new Player(Optional.empty(), name, decks)` for creation)
- **DTOs:** Request/response records in `dto/` subpackages
- **Exception handling:** `@ControllerAdvice` classes in `exceptions/` subpackages (e.g., `PlayerExceptionHandler`)
- **Validation:** Use Jakarta validation annotations (`@Valid`, `@NotBlank`, etc.)
- **Responses:** Standard REST patterns - `ResponseEntity.ok()`, `.noContent().build()`, `.notFound().build()`

### Testing

- **Frontend:** Vitest + React Testing Library (config in [vite.config.js](../app/vite.config.js) - globals enabled, jsdom environment)
- **Backend:** JUnit 5 + Mockito (see test reports in `backend/target/surefire-reports/`)
- Test files colocate with source in `__tests__/` subdirectories (frontend) or mirror package structure (backend)

## Domain Model

**Core entities:** Player → Deck → Game

- **Player:** Has multiple decks, each with commander name and bracket (1-4 power level)
- **Deck:** Belongs to one player, has `isActive` flag
- **Game:** Tracks matches with participants, rounds, status (RUNNING/FINISHED/CANCELLED), winner

**Bracket system:** Deck power levels (1-4) used for matchmaking - see [app/src/utils/decks.ts](../app/src/utils/decks.ts)

## CI/CD

GitHub Actions workflows:

- `publish-frontend.yaml` / `publish-backend.yaml` - Build Docker images → GHCR
- Reusable workflow pattern in `reusable-publish-image.yaml`

## Critical Integration Points

- **Database:** H2 file-based at `/data/edhmm` (mounted volume in production)
- **CORS:** Not explicitly configured - relies on proxy/nginx in dev/prod
- **Port allocation:** Frontend :3000, Backend :5000, nginx :80/:443

## When Working On...

- **New backend endpoint:** Add controller method → create DTO → update frontend API module types → create TanStack Query hook
- **New UI component:** Use shadcn/ui CLI or manually add to `components/ui/`, follow Radix UI patterns
- **Database changes:** Update JPA entities + set `spring.jpa.hibernate.ddl-auto=update` (already default)
- **Route changes:** Edit files in `app/src/routes/` - TanStack Router regenerates `routeTree.gen.ts` automatically
