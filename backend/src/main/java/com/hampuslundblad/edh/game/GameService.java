package com.hampuslundblad.edh.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hampuslundblad.edh.game.dto.CreateGameRequest;
import com.hampuslundblad.edh.game.dto.GameResponse;
import com.hampuslundblad.edh.player.PlayerRepository;
import com.hampuslundblad.edh.player.PlayerEntity;
import com.hampuslundblad.edh.deck.DeckEntity;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GameService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private PlayerRepository playerRepository;

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
                
                return new GamePlayerEntity(gameEntity, player, deck);
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

    public Optional<GameResponse> getGameById(Long id) {
        return gameRepository.findById(id)
            .map(GameEntity::toDomainModel)
            .map(this::mapToGameResponse);
    }

    public GameResponse finishGame(Long gameId, Long winnerPlayerId) {
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
        GameEntity gameEntity = gameRepository.findById(gameId)
            .orElseThrow(() -> new RuntimeException("Game not found: " + gameId));
        
        // Convert to domain model and apply business logic
        Game domainGame = gameEntity.toDomainModel();
        Game updatedGame = domainGame.updateRound(newRound);

        // Update entity from domain model
        gameEntity.updateFromDomainModel(updatedGame);
        GameEntity savedGameEntity = gameRepository.save(gameEntity);
        
        Game savedGame = savedGameEntity.toDomainModel();
        return mapToGameResponse(savedGame);
    }

    private GameResponse mapToGameResponse(Game game) {
        List<GameResponse.GamePlayerResponse> players = game.getGamePlayers().stream()
            .map(gp -> new GameResponse.GamePlayerResponse(
                gp.getPlayerId(),
                gp.getPlayerName(),
                gp.getDeckId(),
                gp.getDeckName(),
                gp.getCommander()
            ))
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
                w.getCommander()                
            );
        }

        return new GameResponse(
            game.getId(),
            players,
            game.getStatus(),
            game.getCurrentRound(),
            game.getCreatedAt(),
            game.getFinishedAt(),
            winnerResponse
        );
    }
}
