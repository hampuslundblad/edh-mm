package com.hampuslundblad.edh.game;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Domain model for Game business logic
 */
public class Game {
    private final Long id;
    private final List<GamePlayer> gamePlayers;
    private final GameStatus status;
    private final Integer currentRound;
    private final LocalDateTime createdAt;
    private final LocalDateTime finishedAt;
    private final Long winnerPlayerId;

    public Game(Long id, List<GamePlayer> gamePlayers, GameStatus status, 
                Integer currentRound, LocalDateTime createdAt, LocalDateTime finishedAt, Long winnerPlayerId) {
        this.id = id;
        this.gamePlayers = gamePlayers;
        this.status = status;
        this.currentRound = currentRound;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
        this.winnerPlayerId = winnerPlayerId;
    }

    public static Game createNew(List<GamePlayer> gamePlayers) {
        return new Game(null, gamePlayers, GameStatus.RUNNING, 1, LocalDateTime.now(), null, null);
    }

    public Game finishGame(Long winnerPlayerId) {
        if (this.status == GameStatus.FINISHED) {
            throw new IllegalStateException("Game is already finished");
        }

        // Validate that the winner is actually in this game
        boolean winnerFound = gamePlayers.stream()
            .anyMatch(gp -> gp.getPlayerId().equals(winnerPlayerId));

        if (!winnerFound) {
            throw new IllegalArgumentException("Winner player ID not found in this game: " + winnerPlayerId);
        }

        return new Game(this.id, this.gamePlayers, GameStatus.FINISHED, 
                       this.currentRound, this.createdAt, LocalDateTime.now(), winnerPlayerId);
    }

    public Game nextRound() {
        if (this.status != GameStatus.RUNNING) {
            throw new IllegalStateException("Cannot advance round - game is not running");
        }

        return new Game(this.id, this.gamePlayers, this.status, 
                       this.currentRound + 1, this.createdAt, this.finishedAt, this.winnerPlayerId);
    }

    public Optional<GamePlayer> getWinner() {
        if (winnerPlayerId == null) {
            return Optional.empty();
        }
        
        return gamePlayers.stream()
            .filter(gp -> gp.getPlayerId().equals(winnerPlayerId))
            .findFirst();
    }

    public boolean isFinished() {
        return status == GameStatus.FINISHED;
    }

    public boolean isRunning() {
        return status == GameStatus.RUNNING;
    }

    public int getPlayerCount() {
        return gamePlayers.size();
    }

    public boolean hasPlayer(Long playerId) {
        return gamePlayers.stream()
            .anyMatch(gp -> gp.getPlayerId().equals(playerId));
    }

    public boolean hasWinner() {
        return winnerPlayerId != null;
    }

    // Getters
    public Long getId() { return id; }
    public List<GamePlayer> getGamePlayers() { return gamePlayers; }
    public GameStatus getStatus() { return status; }
    public Integer getCurrentRound() { return currentRound; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getFinishedAt() { return finishedAt; }
    public Long getWinnerPlayerId() { return winnerPlayerId; }

    /**
     * Inner class representing a player in a game with their selected deck
     */
    public static class GamePlayer {
        private final Long playerId;
        private final String playerName;
        private final Long deckId;
        private final String deckName;
        private final String commander;

        public GamePlayer(Long playerId, String playerName, Long deckId, 
                         String deckName, String commander) {
            this.playerId = playerId;
            this.playerName = playerName;
            this.deckId = deckId;
            this.deckName = deckName;
            this.commander = commander;
        }

        // Getters
        public Long getPlayerId() { return playerId; }
        public String getPlayerName() { return playerName; }
        public Long getDeckId() { return deckId; }
        public String getDeckName() { return deckName; }
        public String getCommander() { return commander; }
    }
}