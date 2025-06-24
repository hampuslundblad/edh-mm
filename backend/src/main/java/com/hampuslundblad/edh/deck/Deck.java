package com.hampuslundblad.edh.deck;

public class Deck {
    private String name;
    private String commander;
    private Bracket bracket;
    private Boolean isActive = true;

    // Constructors
    public Deck(String name, String commander, Bracket bracket) {
        this.name = name;
        this.commander = commander;
        this.bracket = bracket;
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
        if (entity == null) {
            return null;
        }
        Deck deck = new Deck(
            entity.getName(),
            entity.getCommander(),
            entity.getBracket()
        );
        deck.setIsActive(entity.getIsActive());
        return deck;
    }

    public static DeckEntity fromDomain(Deck deck) {
        if (deck == null) {
            return null;
        }
        DeckEntity entity = new DeckEntity();
        entity.setName(deck.getName());
        entity.setCommander(deck.getCommander());
        entity.setBracket(deck.getBracket());
        entity.setIsActive(deck.getIsActive());
        return entity;
    }

    
}
