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
```

## Code Style

### Naming
- Classes: PascalCase (`PlayerService.java`)
- Methods/Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE

### Structure
Domain-driven under `com.hampuslundblad.edh`:
```
player/
├── Player.java (entity)
├── PlayerService.java
├── PlayerController.java
├── PlayerRepository.java
├── dto/
└── exceptions/
```

### Patterns
- Entities: Use `Optional<Long> id` pattern for creation
- DTOs: Request/response records in `dto/` subpackages
- Exception handling: `@ControllerAdvice` in `exceptions/`
- Validation: Jakarta annotations (`@Valid`, `@NotBlank`)
- Responses: `ResponseEntity.ok()`, `.noContent().build()`, etc.
- Controllers: `@RestController @RequestMapping("/api")`

## Testing
- JUnit 5 + Mockito
- Test location mirrors source package structure
- Pattern: Given/When/Then in test names

## Key Files
- `src/main/resources/application.properties` - Config
- H2 Console: `/h2-console`
- Database: H2 file-based at `/data/edhmm`
