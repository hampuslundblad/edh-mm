package com.hampuslundblad.edh.game;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hampuslundblad.edh.game.dto.CreateGameRequest;
import com.hampuslundblad.edh.game.dto.GameResponse;
import com.hampuslundblad.edh.game.exceptions.GameNotFoundException;
import com.hampuslundblad.edh.player.PlayerRepository;
import java.time.ZoneId;

import com.hampuslundblad.edh.player.PlayerEntity;
import com.hampuslundblad.edh.deck.DeckEntity;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GameService {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    public GameService(GameRepository gameRepository, PlayerRepository playerRepository) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
    }

    public GameResponse createGame(CreateGameRequest request) {
        // Convert to entity and save
        GameEntity gameEntity = new GameEntity();
        List<GamePlayerEntity> gamePlayerEntities = request.playerDeckSelections().stream()
                .map(selection -> {
                    PlayerEntity player = playerRepository.findById(selection.playerId())
                            .orElseThrow(() -> new RuntimeException("Player not found: " + selection.playerId()));

                    DeckEntity deck = player.getDecks().stream()
                            .filter(d -> d.getId().equals(selection.deckId()))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Deck not found: " + selection.deckId()));

                    return new GamePlayerEntity(gameEntity, player, deck, selection.turnOrder());
                })
                .toList();

        gameEntity.setGamePlayers(gamePlayerEntities);
        GameEntity savedGameEntity = gameRepository.save(gameEntity);

        Game savedGame = savedGameEntity.toDomainModel();
        return mapToGameResponse(savedGame);
    }

    public List<GameResponse> getAllGames() {
        return gameRepository.findAllOrderByCreatedAtDesc().stream()
                .map(GameEntity::toDomainModel)
                .map(this::mapToGameResponse)
                .toList();
    }

    public List<GameResponse> getRunningGames() {
        return gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.RUNNING).stream()
                .map(GameEntity::toDomainModel)
                .map(this::mapToGameResponse)
                .toList();
    }

    public List<GameResponse> getFinishedGames() {
        return gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.FINISHED).stream()
                .map(GameEntity::toDomainModel)
                .map(this::mapToGameResponse)
                .toList();
    }

    public List<GameResponse> getCancelledGames() {
        return gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.CANCELLED).stream()
                .map(GameEntity::toDomainModel)
                .map(this::mapToGameResponse)
                .toList();
    }

    public Optional<GameResponse> getGameById(Long gameId) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }

        return gameRepository.findById(gameId)
                .map(GameEntity::toDomainModel)
                .map(this::mapToGameResponse);
    }

    public GameResponse finishGame(Long gameId, Long winnerPlayerId) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }

        GameEntity gameEntity = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found: " + gameId));

        // Convert to domain model and apply business logic
        Game domainGame = gameEntity.toDomainModel();
        Game finishedGame = domainGame.finishGame(winnerPlayerId);

        // Update entity from domain model
        gameEntity.updateFromDomainModel(finishedGame);
        GameEntity savedGameEntity = gameRepository.save(gameEntity);

        Game savedGame = savedGameEntity.toDomainModel();
        return mapToGameResponse(savedGame);
    }

    public GameResponse cancelGame(Long gameId) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }

        GameEntity gameEntity = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found: " + gameId));

        // Convert to domain model and apply business logic
        Game domainGame = gameEntity.toDomainModel();
        Game cancelledGame = domainGame.cancelGame();

        // Update entity from domain model
        gameEntity.updateFromDomainModel(cancelledGame);
        GameEntity savedGameEntity = gameRepository.save(gameEntity);

        Game savedGame = savedGameEntity.toDomainModel();
        return mapToGameResponse(savedGame);
    }

    public GameResponse updateRound(Long gameId, int newRound) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }

        GameEntity gameEntity = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        // Convert to domain model and apply business logic
        Game domainGame = gameEntity.toDomainModel();
        Game updatedGame = domainGame.updateRound(newRound);

        // Update entity from domain model
        gameEntity.updateFromDomainModel(updatedGame);
        GameEntity savedGameEntity = gameRepository.save(gameEntity);

        Game savedGame = savedGameEntity.toDomainModel();
        return mapToGameResponse(savedGame);
    }

    public void deleteGame(Long gameId) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }
        try {
            gameRepository.deleteById(gameId);
        } catch (RuntimeException e) {
            throw new GameNotFoundException(gameId);
        }
    }

    private GameResponse mapToGameResponse(Game game) {
        List<GameResponse.GamePlayerResponse> players = game.getGamePlayers().stream()
                .map(gp -> new GameResponse.GamePlayerResponse(
                        gp.getPlayerId(),
                        gp.getPlayerName(),
                        gp.getDeckId(),
                        gp.getDeckName(),
                        gp.getCommander(),
                        gp.getTurnOrder()))
                .toList();

        Optional<Game.GamePlayer> winner = game.getWinner();
        GameResponse.GamePlayerResponse winnerResponse = null;
        if (winner.isPresent()) {
            Game.GamePlayer w = winner.get();
            winnerResponse = new GameResponse.GamePlayerResponse(
                    w.getPlayerId(),
                    w.getPlayerName(),
                    w.getDeckId(),
                    w.getDeckName(),
                    w.getCommander(),
                    w.getTurnOrder());
        }

        return new GameResponse(
                game.getId(),
                players,
                game.getStatus(),
                game.getCurrentRound(),
                game.getCreatedAt(),
                game.getFinishedAt(),
                winnerResponse);
    }
}
