package com.hampuslundblad.edh.game;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.*;

@Entity
@Table(name = "game")
public class GameEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<GamePlayerEntity> gamePlayers = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private GameStatus status = GameStatus.RUNNING;

    private Integer currentRound = 1;

    private LocalDateTime createdAt = LocalDateTime.now(ZoneId.of("UTC+1")); 
    private LocalDateTime finishedAt;
    
    private Long winnerPlayerId;

    public GameEntity() {}

    public GameEntity(List<GamePlayerEntity> gamePlayers) {
        this.gamePlayers = gamePlayers;
        this.status = GameStatus.RUNNING;
        this.currentRound = 1;
        this.createdAt = LocalDateTime.now();
    }

    // Conversion methods between domain model and entity
    public Game toDomainModel() {
        List<Game.GamePlayer> domainGamePlayers = gamePlayers.stream()
            .map(gpe -> new Game.GamePlayer(
                gpe.getPlayer().getId(),
                gpe.getPlayer().getName(),
                gpe.getDeck().getId(),
                gpe.getDeck().getName(),
                gpe.getDeck().getCommander(),
                gpe.getTurnOrder()
            ))
            .collect(Collectors.toList());

        return new Game(id, domainGamePlayers, status, currentRound, createdAt, finishedAt, winnerPlayerId);
    }

    public void updateFromDomainModel(Game game) {
        this.status = game.getStatus();
        this.currentRound = game.getCurrentRound();
        this.finishedAt = game.getFinishedAt();
        this.winnerPlayerId = game.getWinnerPlayerId();
    }

    // Getters and Setters (JPA requirements)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<GamePlayerEntity> getGamePlayers() { return gamePlayers; }
    public void setGamePlayers(List<GamePlayerEntity> gamePlayers) { this.gamePlayers = gamePlayers; }

    public GameStatus getStatus() { return status; }
    public void setStatus(GameStatus status) { this.status = status; }

    public Integer getCurrentRound() { return currentRound; }
    public void setCurrentRound(Integer currentRound) { this.currentRound = currentRound; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getFinishedAt() { return finishedAt; }
    public void setFinishedAt(LocalDateTime finishedAt) { this.finishedAt = finishedAt; }

    public Long getWinnerPlayerId() { return winnerPlayerId; }
    public void setWinnerPlayerId(Long winnerPlayerId) { this.winnerPlayerId = winnerPlayerId; }
}
