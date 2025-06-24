package com.hampuslundblad.edh.player.dto;

import com.hampuslundblad.edh.deck.Bracket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddDeckToPlayerRequest(@NotBlank String deckName, @NotNull Bracket bracket) {


}
