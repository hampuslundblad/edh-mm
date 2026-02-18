package com.hampuslundblad.edh.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.hampuslundblad.edh.deck.DeckEntity;
import com.hampuslundblad.edh.game.dto.CreateGameRequest;
import com.hampuslundblad.edh.game.dto.GameResponse;
import com.hampuslundblad.edh.player.PlayerEntity;
import com.hampuslundblad.edh.player.PlayerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class GameServiceTest {

    private GameRepository gameRepository;
    private PlayerRepository playerRepository;
    private GameService gameService;

    @BeforeEach
    void setUp() {
        gameRepository = mock(GameRepository.class);
        playerRepository = mock(PlayerRepository.class);
        gameService = new GameService(gameRepository, playerRepository);
    }

    // --- getAllGames ---

    @Test
    void getAllGames_shouldReturnAllGames() {
        // Given
        when(gameRepository.findAllOrderByCreatedAtDesc()).thenReturn(List.of());

        // When
        List<GameResponse> games = gameService.getAllGames();

        // Then
        assertNotNull(games);
        verify(gameRepository).findAllOrderByCreatedAtDesc();
    }

    // --- getRunningGames ---

    @Test
    void getRunningGames_shouldReturnOnlyRunningGames() {
        // Given
        when(gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.RUNNING))
            .thenReturn(List.of());

        // When
        List<GameResponse> games = gameService.getRunningGames();

        // Then
        assertNotNull(games);
        verify(gameRepository).findByStatusOrderByCreatedAtDesc(GameStatus.RUNNING);
    }

    // --- getFinishedGames ---

    @Test
    void getFinishedGames_shouldReturnOnlyFinishedGames() {
        // Given
        when(gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.FINISHED))
            .thenReturn(List.of());

        // When
        List<GameResponse> games = gameService.getFinishedGames();

        // Then
        assertNotNull(games);
        verify(gameRepository).findByStatusOrderByCreatedAtDesc(GameStatus.FINISHED);
    }

    // --- getCancelledGames ---

    @Test
    void getCancelledGames_shouldReturnOnlyCancelledGames() {
        // Given
        when(gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.CANCELLED))
            .thenReturn(List.of());

        // When
        List<GameResponse> games = gameService.getCancelledGames();

        // Then
        assertNotNull(games);
        verify(gameRepository).findByStatusOrderByCreatedAtDesc(GameStatus.CANCELLED);
    }

    // --- getGameById ---

    @Test
    void getGameById_shouldReturnEmptyWhenNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        Optional<GameResponse> game = gameService.getGameById(1L);

        // Then
        assertFalse(game.isPresent());
        verify(gameRepository).findById(1L);
    }

    // --- finishGame ---

    @Test
    void finishGame_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.finishGame(1L, 1L));
    }

    // --- cancelGame ---

    @Test
    void cancelGame_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.cancelGame(1L));
    }

    // --- updateRound ---

    @Test
    void updateRound_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.updateRound(1L, 5));
    }

    // --- createGame ---

    @Test
    void createGame_shouldReturnGameResponse_whenValid() {
        // Given
        DeckEntity deck = new DeckEntity("Atraxa", "Atraxa", null);
        deck.setId(5L);

        PlayerEntity player = new PlayerEntity("Alice", new ArrayList<>(List.of(deck)));
        player.setId(1L);

        when(playerRepository.findById(1L)).thenReturn(Optional.of(player));
        when(gameRepository.save(any(GameEntity.class))).thenAnswer(invocation -> {
            GameEntity saved = invocation.getArgument(0);
            saved.setId(7L);
            return saved;
        });

        CreateGameRequest request = new CreateGameRequest(List.of(
            new CreateGameRequest.PlayerDeckSelection(1L, 5L, 1)
        ));

        // When
        GameResponse response = gameService.createGame(request);

        // Then
        assertNotNull(response);
        assertEquals(7L, response.id());
        assertEquals(GameStatus.RUNNING, response.status());
        assertEquals(1, response.currentRound());
        assertEquals(1, response.players().size());
        assertEquals("Alice", response.players().get(0).playerName());
        assertEquals("Atraxa", response.players().get(0).deckName());
        assertEquals(1, response.players().get(0).turnOrder());
        verify(gameRepository).save(any(GameEntity.class));
    }

    @Test
    void createGame_shouldThrow_whenPlayerNotFound() {
        // Given
        when(playerRepository.findById(99L)).thenReturn(Optional.empty());

        CreateGameRequest request = new CreateGameRequest(List.of(
            new CreateGameRequest.PlayerDeckSelection(99L, 1L, 1)
        ));

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.createGame(request));
        verify(gameRepository, never()).save(any());
    }

    @Test
    void createGame_shouldThrow_whenDeckNotOwnedByPlayer() {
        // Given
        DeckEntity deck = new DeckEntity("Atraxa", "Atraxa", null);
        deck.setId(5L);

        PlayerEntity player = new PlayerEntity("Alice", new ArrayList<>(List.of(deck)));
        player.setId(1L);

        when(playerRepository.findById(1L)).thenReturn(Optional.of(player));

        // Request uses a deck ID that the player does not own
        CreateGameRequest request = new CreateGameRequest(List.of(
            new CreateGameRequest.PlayerDeckSelection(1L, 999L, 1)
        ));

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.createGame(request));
        verify(gameRepository, never()).save(any());
    }
}
