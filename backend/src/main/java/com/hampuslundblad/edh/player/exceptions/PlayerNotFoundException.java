package com.hampuslundblad.edh.player.exceptions;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException(Long playerId) {
        super("Player not found with id: " + playerId);
    }
}
