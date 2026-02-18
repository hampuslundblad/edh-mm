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
- **Player** → has many Decks; own domain package (`player/`) with controller, service, repo, entity, DTOs, exceptions
- **Deck** → belongs to Player; own domain package (`deck/`) with entity, domain model, `Bracket` enum, exceptions
- **Game** → own domain package (`game/`) with controller, service, repo, entity, join-table entity (`GamePlayerEntity`), DTOs, exceptions
  - Bracket values: `ONE, TWO, THREE, THREE_PLUS, FOUR, FIVE`
  - Game status values: `RUNNING, FINISHED, CANCELLED`
  - Deck has `isActive` flag and `commander` field

## Game Creation Flow

### Frontend (`src/routes/game/index.tsx`)

1. **Page load** — `useAllPlayers()` fetches all players (each with their full deck list) via TanStack Query. A skeleton is shown while loading.
2. **Player selection** — `SelectPlayers` renders a multi-select dropdown. Removing a player also prunes their deck selection from state to keep things consistent.
3. **Deck selection** — `SelectPlayerDeck` renders one `DeckSelect` per selected player. Each selection upserts into `playerDeckSelection[]` (update if that player already has a selection, append if not).
4. **Validation** — "Start game!" button only renders once ≥1 player and ≥1 deck selection exist. On click, it verifies every selected player has a deck chosen; if not, a `sonner` toast error fires instead of submitting.
5. **Mutation** — `createGameMutation.mutate({ playerDeckSelections: [...] })` from `useGameMutations`.

### API Contract

`POST /api/game`

Request body:
```json
{
  "playerDeckSelections": [
    { "playerId": "1", "deckId": "5" },
    { "playerId": "2", "deckId": "12" }
  ]
}
```

Response (`GameResponse`):
```json
{
  "id": "7",
  "players": [
    { "playerId": "1", "playerName": "Alice", "deckId": "5", "deckName": "Atraxa", "commander": "Atraxa" }
  ],
  "status": "RUNNING",
  "currentRound": 1,
  "createdAt": "2026-02-18T20:00:00",
  "finishedAt": null,
  "winner": null
}
```

> **ID type note:** The frontend represents all IDs as `string`; the backend `CreateGameRequest` uses `Long`. Jackson (Spring's JSON library) converts the numeric string to a `Long` automatically. If a non-numeric string were sent it would fail with `400`.

### Backend (`GameController` → `GameService`)

1. `POST /api/game` hits `GameController.createGame` — validates with `@Valid`, delegates to `GameService`, wraps any exception in a `400 Bad Request` (no `@ControllerAdvice` exists for the game domain).
2. `GameService.createGame` (class-level `@Transactional`):
   - Creates a blank `GameEntity` with defaults: `status=RUNNING`, `currentRound=1`, `createdAt=now`.
   - For each `PlayerDeckSelection`: loads the `PlayerEntity` from the DB, then finds the matching `DeckEntity` from that player's own deck list — **enforcing deck ownership** (a player cannot be assigned a deck they don't own).
   - Assembles `GamePlayerEntity` rows and sets them on the game, then saves (cascade persists all rows).
3. **Two tables written per game created:**
   - `game` — one row: `status`, `current_round`, `created_at`, `finished_at=null`, `winner_player_id=null`
   - `game_player` — one row per participant: `game_id`, `player_id`, `deck_id`

### Post-Success

- TanStack Query invalidates `["games"]`, `["games","running"]`, and `["games","finished"]` caches.
- `useEffect` watching `createGameMutation.isSuccess` navigates to `/game/$gameId` (the running game detail page).
- On error, a `sonner` toast displays the error message.

## Critical Ports
- Frontend: 3000
- Backend: 5000
- nginx: 80/443
- H2 Console: /h2-console
