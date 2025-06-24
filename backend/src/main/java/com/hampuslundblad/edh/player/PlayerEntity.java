package com.hampuslundblad.edh.player;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.hampuslundblad.edh.deck.DeckEntity;

@Entity
public class PlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "player_id")
    private List<DeckEntity> decks = new ArrayList<>();

    public PlayerEntity() {}

    public PlayerEntity(String name, List<DeckEntity> decks) {
        this.name = name;
        this.decks = decks;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<DeckEntity> getDecks() { return decks; }
    public void setDecks(List<DeckEntity> decks) { this.decks = decks; }
}
