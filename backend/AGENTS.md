# AGENTS.md - Backend

## Tech Stack
Spring Boot 3.5.3 + Java 21 + JPA + H2 database + Maven + JUnit 5

## Commands

```bash
mvn spring-boot:run  # Start Spring Boot on port 5000
mvn test             # Run all JUnit tests
mvn test -Dtest=PlayerServiceTest  # Run single test class
mvn test -Dtest=PlayerServiceTest#getAllPlayers_shouldReturnAllPlayers  # Single test method
mvn clean package    # Build JAR
mvn clean package -DskipTests  # Build JAR (used by Docker build)
```

## Code Style

### Naming
- Classes: PascalCase (`PlayerService.java`)
- Methods/Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE

### Structure
Domain-driven under `com.hampuslundblad.edh`. Each domain has its own top-level package:
```
player/
├── Player.java (domain model)
├── PlayerEntity.java (JPA entity)
├── PlayerService.java
├── PlayerController.java
├── PlayerRepository.java
├── dto/
└── exceptions/

deck/
├── Deck.java (domain model)
├── DeckEntity.java (JPA entity)
├── Bracket.java (enum: ONE, TWO, THREE, THREE_PLUS, FOUR, FIVE)
└── exceptions/
    └── DeckExceptionHandler.java (@ControllerAdvice)

game/
├── Game.java (rich domain model with business logic)
├── GameEntity.java (JPA entity)
├── GamePlayerEntity.java (join-table entity: game + player + deck)
├── GameService.java (@Transactional class-level)
├── GameController.java
├── GameRepository.java
├── GameStatus.java (enum: RUNNING, FINISHED, CANCELLED)
├── dto/
└── exceptions/
    └── GameNotFoundException.java  (NOTE: no @ControllerAdvice handler — propagates as 500)
```

### Patterns
- Entities: Use `Optional<Long> id` pattern for creation
- Domain models: Separate from JPA entities (e.g. `Deck.java` vs `DeckEntity.java`)
- DTOs: Request/response records in `dto/` subpackages
- Exception handling: `@ControllerAdvice` in `exceptions/` (player + deck have handlers; game does not)
- Validation: Jakarta annotations (`@Valid`, `@NotBlank`)
- Responses: `ResponseEntity.ok()`, `.noContent().build()`, etc.
- Controllers: `@RestController @RequestMapping("/api")`
- Injection: Prefer constructor injection (note: `GameService` uses field injection — inconsistency)

## Testing
- JUnit 5 + Mockito for unit tests; `@WebMvcTest` + `@MockBean` for controller slice tests
- Test location should mirror source package structure (note: `PlayerControllerTest` lives at root package — exception to this rule)
- Pattern: Given/When/Then in test names

## Key Files
- `src/main/resources/application.properties` - Config (port 5000, H2 file DB at `/data/edhmm`)
- `src/main/resources/data.sql` - Seed data (4 players, 32 decks); runs on startup
- H2 Console: `/h2-console`
- Database: H2 file-based at `/data/edhmm`
