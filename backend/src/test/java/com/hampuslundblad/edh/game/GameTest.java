package com.hampuslundblad.edh.game;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

class GameTest {

    @Test
    void createNew_shouldCreateRunningGameWithRound1() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1),
            new Game.GamePlayer(2L, "Player2", 2L, "Deck2", "Commander2", 2)
        );

        // When
        Game game = Game.createNew(players);

        // Then
        assertEquals(GameStatus.RUNNING, game.getStatus());
        assertEquals(1, game.getCurrentRound());
        assertNull(game.getId());
        assertNull(game.getWinnerPlayerId());
    }

    @Test
    void finishGame_shouldSetStatusToFinishedAndSetWinner() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1),
            new Game.GamePlayer(2L, "Player2", 2L, "Deck2", "Commander2", 2)
        );
        Game game = Game.createNew(players);

        // When
        Game finishedGame = game.finishGame(1L);

        // Then
        assertEquals(GameStatus.FINISHED, finishedGame.getStatus());
        assertEquals(1L, finishedGame.getWinnerPlayerId());
        assertNotNull(finishedGame.getFinishedAt());
    }

    @Test
    void cancelGame_shouldSetStatusToCancelled() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players);

        // When
        Game cancelledGame = game.cancelGame();

        // Then
        assertEquals(GameStatus.CANCELLED, cancelledGame.getStatus());
        assertNotNull(cancelledGame.getFinishedAt());
        assertNull(cancelledGame.getWinnerPlayerId());
    }

    @Test
    void updateRound_shouldUpdateCurrentRound() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players);

        // When
        Game updatedGame = game.updateRound(5);

        // Then
        assertEquals(5, updatedGame.getCurrentRound());
        assertEquals(GameStatus.RUNNING, updatedGame.getStatus());
    }

    @Test
    void getWinner_shouldReturnWinnerWhenSet() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1),
            new Game.GamePlayer(2L, "Player2", 2L, "Deck2", "Commander2", 2)
        );
        Game game = Game.createNew(players).finishGame(1L);

        // When
        var winner = game.getWinner();

        // Then
        assertTrue(winner.isPresent());
        assertEquals("Player1", winner.get().getPlayerName());
    }

    @Test
    void isRunning_shouldReturnTrueForNewGame() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players);

        // When & Then
        assertTrue(game.isRunning());
        assertFalse(game.isFinished());
        assertFalse(game.isCancelled());
    }

    @Test
    void getPlayerCount_shouldReturnNumberOfPlayers() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1),
            new Game.GamePlayer(2L, "Player2", 2L, "Deck2", "Commander2", 2),
            new Game.GamePlayer(3L, "Player3", 3L, "Deck3", "Commander3", 3)
        );
        Game game = Game.createNew(players);

        // When & Then
        assertEquals(3, game.getPlayerCount());
    }

    @Test
    void hasPlayer_shouldReturnTrueWhenPlayerExists() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players);

        // When & Then
        assertTrue(game.hasPlayer(1L));
        assertFalse(game.hasPlayer(999L));
    }

    @Test
    void finishGame_shouldThrow_whenWinnerNotInGame() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players);

        // When & Then
        assertThrows(IllegalArgumentException.class, () -> game.finishGame(99L));
    }

    @Test
    void finishGame_shouldThrow_whenAlreadyFinished() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players).finishGame(1L);

        // When & Then
        assertThrows(IllegalStateException.class, () -> game.finishGame(1L));
    }

    @Test
    void cancelGame_shouldThrow_whenAlreadyFinished() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players).finishGame(1L);

        // When & Then
        assertThrows(IllegalStateException.class, () -> game.cancelGame());
    }

    @Test
    void updateRound_shouldThrow_whenGameIsNotRunning() {
        // Given
        List<Game.GamePlayer> players = List.of(
            new Game.GamePlayer(1L, "Player1", 1L, "Deck1", "Commander1", 1)
        );
        Game game = Game.createNew(players).finishGame(1L);

        // When & Then
        assertThrows(IllegalStateException.class, () -> game.updateRound(2));
    }
}
