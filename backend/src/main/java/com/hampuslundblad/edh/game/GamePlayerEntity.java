package com.hampuslundblad.edh.game;

import jakarta.persistence.*;
import com.hampuslundblad.edh.player.PlayerEntity;
import com.hampuslundblad.edh.deck.DeckEntity;

@Entity
@Table(name = "game_player")
public class GamePlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private GameEntity game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private PlayerEntity player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id", nullable = false)
    private DeckEntity deck;

    public GamePlayerEntity() {}

    public GamePlayerEntity(GameEntity game, PlayerEntity player, DeckEntity deck) {
        this.game = game;
        this.player = player;
        this.deck = deck;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public GameEntity getGame() { return game; }
    public void setGame(GameEntity game) { this.game = game; }

    public PlayerEntity getPlayer() { return player; }
    public void setPlayer(PlayerEntity player) { this.player = player; }

    public DeckEntity getDeck() { return deck; }
    public void setDeck(DeckEntity deck) { this.deck = deck; }
}