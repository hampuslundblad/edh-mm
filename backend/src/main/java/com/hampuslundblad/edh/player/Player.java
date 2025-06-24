package com.hampuslundblad.edh.player;

import java.util.ArrayList;
import java.util.List;

public class Player {

    private String name;
    private List<Deck> decks = new ArrayList<>();
    // Constructors, getters, and setters
    public Player(String name, List<Deck> decks) {
        this.name = name;
        this.decks = decks;
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

}
