package com.hampuslundblad.edh.deck.exceptions;

public class DeckNotFoundException extends RuntimeException {
    public DeckNotFoundException(Long deckId) {
        super("Deck not found with id: " + deckId);
    }

    public DeckNotFoundException(String message) {
        super(message);
    }
    
}
