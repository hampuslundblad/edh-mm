package com.hampuslundblad.edh.game.dto;

import com.hampuslundblad.edh.game.GameStatus;
import java.time.LocalDateTime;
import java.util.List;

public record GameResponse(
    Long id,
    List<GamePlayerResponse> players,
    GameStatus status,
    Integer currentRound,
    LocalDateTime createdAt,
    LocalDateTime finishedAt,
    GamePlayerResponse winner
) {
    public record GamePlayerResponse(
        Long playerId,
        String playerName,
        Long deckId,
        String deckName,
        String commander
    ) {}
}