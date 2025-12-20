package com.hampuslundblad.edh.game.exceptions;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(Long gameid) {
        super("Game not found with id: " + gameid);
    }
}