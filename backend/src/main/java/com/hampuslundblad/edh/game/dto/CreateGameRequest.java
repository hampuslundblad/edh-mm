package com.hampuslundblad.edh.game.dto;

import java.util.List;

public record CreateGameRequest(
    List<PlayerDeckSelection> playerDeckSelections
) {
    public record PlayerDeckSelection(
        Long playerId,
        Long deckId,
        Integer turnOrder
    ) {}
}
