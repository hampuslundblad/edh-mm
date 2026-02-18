# AGENTS.md - EDH Match Manager

## Project Overview
EDH (Elder Dragon Highlander / Commander) match manager - a full-stack application for tracking Magic: The Gathering Commander games.

- **Frontend:** React 19 + Vite + TanStack Router (hash mode) + TanStack Query + Tailwind CSS v4 + shadcn/ui
- **Backend:** Spring Boot 3.5.3 + Java 21 + JPA + H2 database + Maven
- **Infrastructure:** Docker Compose with nginx reverse proxy

## Component-Specific Guides
- [Frontend](app/AGENTS.md) - Commands, code style, testing, component patterns
- [Backend](backend/AGENTS.md) - Commands, code style, testing, structure

## Key Cross-Cutting Conventions

### Hash Routing Required
TanStack Router uses hash history for deployment compatibility:
```typescript
const hashHistory = createHashHistory()
```

### API Communication
- Dev: Vite proxy `/api` → `http://localhost:5000/api`
- Prod: nginx routes `/api` to backend
- API types in `src/api/` must match backend DTOs

### State Management
- Server state: TanStack Query hooks in `src/hooks/`
- Local state: React Context for shared data

### Component Structure
- Flat in `components/` until app grows
- shadcn/ui in `components/ui/`
- Path alias: `@/` → `src/`

## Domain Model
- **Player** → has many Decks (commander + bracket 1-4)
- **Deck** → belongs to Player, has isActive flag
- **Game** → matches with participants, rounds, status (RUNNING/FINISHED/CANCELLED)

## Critical Ports
- Frontend: 3000
- Backend: 5000
- nginx: 80/443
- H2 Console: /h2-console
