package com.hampuslundblad.edh.player.exceptions;

public class DuplicateDeckNameException extends RuntimeException {
    public DuplicateDeckNameException(String deckName) {
        super("A deck with the name '" + deckName + "' already exists for this player.");
    }
    
}
