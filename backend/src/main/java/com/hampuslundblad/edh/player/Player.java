package com.hampuslundblad.edh.player;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.deck.DeckEntity;

public class Player {
    private static final Logger logger = LoggerFactory.getLogger(Player.class);

    private Optional<Long> id;
    private String name;
    private List<Deck> decks = new ArrayList<>();

    public Player(Optional<Long> id, String name, List<Deck> decks) {
        this.id = id;
        this.name = name;
        this.decks = decks;
    }

    public Long getId() {
        return id.orElse(null);
    }


    public String getName() {
        return name;
    }

    public List<Deck> getDecks() {
        return decks;
    }

    public void addDeck(Deck deck) {
        this.decks.add(deck);
    }

    public void setDecks(List<Deck> decks) {
        this.decks = decks;
    }

    // Maps from PlayerEntity to Player
    public static Player toDomain(PlayerEntity entity) {
        List<Deck> domainDecks = new ArrayList<>();
        if (entity.getDecks() != null) {
            for (var deckEntity : entity.getDecks()) {
                domainDecks.add(Deck.toDomain(deckEntity));
            }
        }
                logger.info("Mapping PlayerEntity '{}' with {} decks", entity.getName(), domainDecks.size());

        return new Player(Optional.ofNullable(entity.getId()), entity.getName(), domainDecks);
    }

    // Maps from Player to PlayerEntity
    public static PlayerEntity fromDomain(Player player) {
        if (player == null) {
            return null;
        }
        PlayerEntity entity = new PlayerEntity();
        entity.setName(player.getName());
        List<DeckEntity> deckEntities = new ArrayList<>();
        if (player.getDecks() != null) {
            for (Deck deck : player.getDecks()) {
                deckEntities.add(Deck.fromDomain(deck));
            }
        }
        entity.setDecks(deckEntities);
        return entity;
    }

}
