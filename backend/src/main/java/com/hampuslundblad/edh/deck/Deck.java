package com.hampuslundblad.edh.deck;

import java.util.Optional;

public class Deck {
    private Optional<Long> id;
    private String name;
    private String commander;
    private Bracket bracket;
    private Boolean isActive = true;

    public Deck(Optional<Long> id, String name, String commander, Bracket bracket) {
        this.id = id;
        this.name = name;
        this.commander = commander;
        this.bracket = bracket;
    }

    public Optional<Long> getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCommander() {
        return commander;
    }

    public Bracket getBracket() {
        return bracket;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public static Deck toDomain(DeckEntity entity) {
        Deck deck = new Deck(
            Optional.ofNullable(entity.getId()),
            entity.getName(),
            entity.getCommander(),
            entity.getBracket()
        );
        deck.setIsActive(entity.getIsActive());
        return deck;
    }

    public static DeckEntity fromDomain(Deck deck) {
        DeckEntity entity = new DeckEntity();
        entity.setName(deck.getName());
        entity.setCommander(deck.getCommander());
        entity.setBracket(deck.getBracket());
        entity.setIsActive(deck.getIsActive());
        return entity;
    }

    
}
