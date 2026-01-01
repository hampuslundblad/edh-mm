package com.hampuslundblad.edh.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.hampuslundblad.edh.game.dto.GameResponse;
import com.hampuslundblad.edh.player.PlayerRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GameServiceTest {

    private GameRepository gameRepository;
    private PlayerRepository playerRepository;
    private GameService gameService;

    @BeforeEach
    void setUp() {
        gameRepository = mock(GameRepository.class);
        playerRepository = mock(PlayerRepository.class);
        gameService = new GameService();
        // Manually inject dependencies using reflection or setter methods
        // Since GameService uses @Autowired, we'll set the fields directly
        try {
            var gameRepoField = GameService.class.getDeclaredField("gameRepository");
            gameRepoField.setAccessible(true);
            gameRepoField.set(gameService, gameRepository);
            
            var playerRepoField = GameService.class.getDeclaredField("playerRepository");
            playerRepoField.setAccessible(true);
            playerRepoField.set(gameService, playerRepository);
        } catch (Exception e) {
            throw new RuntimeException("Failed to inject mocks", e);
        }
    }

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

    @Test
    void finishGame_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.finishGame(1L, 1L));
    }

    @Test
    void cancelGame_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.cancelGame(1L));
    }

    @Test
    void updateRound_shouldThrowWhenGameNotFound() {
        // Given
        when(gameRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> gameService.updateRound(1L, 5));
    }
}
