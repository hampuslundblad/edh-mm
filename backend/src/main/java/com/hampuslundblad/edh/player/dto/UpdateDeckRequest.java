package com.hampuslundblad.edh.player.dto;

import com.hampuslundblad.edh.deck.Bracket;

public record UpdateDeckRequest(
    String name,
    String commander,
    Bracket bracket,
    Boolean isActive
) {
    // This record is used to encapsulate the data needed to update a deck.
    // It includes the deck's name, commander, bracket, and active status.
}