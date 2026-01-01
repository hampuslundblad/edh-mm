package com.hampuslundblad.edh.player;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.hampuslundblad.edh.deck.Bracket;
import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.deck.DeckEntity;
import com.hampuslundblad.edh.deck.exceptions.DeckNotFoundException;
import com.hampuslundblad.edh.player.dto.UpdateDeckRequest;
import com.hampuslundblad.edh.player.exceptions.DuplicateDeckNameException;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PlayerServiceTest {

    private PlayerRepository playerRepository;
    private PlayerService playerService;

    @BeforeEach
    void setUp() {
        playerRepository = mock(PlayerRepository.class);
        playerService = new PlayerService(playerRepository);
    }

    @Test
    void getAllPlayers_shouldReturnAllPlayers() {
        // Given
        when(playerRepository.findAll()).thenReturn(List.of());

        // When
        List<Player> players = playerService.getAllPlayers();

        // Then
        assertNotNull(players);
        verify(playerRepository).findAll();
    }

    @Test
    void getPlayerById_shouldReturnPlayerWhenExists() {
        // Given
        PlayerEntity entity = new PlayerEntity();
        entity.setId(1L);
        entity.setName("Test Player");
        entity.setDecks(new ArrayList<>());
        when(playerRepository.findById(1L)).thenReturn(Optional.of(entity));

        // When
        Optional<Player> player = playerService.getPlayerById(1L);

        // Then
        assertTrue(player.isPresent());
        assertEquals("Test Player", player.get().getName());
    }

    @Test
    void createPlayer_shouldSaveAndReturnPlayer() {
        // Given
        PlayerEntity savedEntity = new PlayerEntity();
        savedEntity.setId(1L);
        savedEntity.setName("New Player");
        savedEntity.setDecks(new ArrayList<>());
        when(playerRepository.save(any(PlayerEntity.class))).thenReturn(savedEntity);

        // When
        Player player = playerService.createPlayer("New Player");

        // Then
        assertNotNull(player);
        assertEquals("New Player", player.getName());
        verify(playerRepository).save(any(PlayerEntity.class));
    }

    @Test
    void deletePlayer_shouldThrowWhenPlayerNotFound() {
        // Given
        when(playerRepository.existsById(1L)).thenReturn(false);

        // When & Then
        assertThrows(PlayerNotFoundException.class, () -> playerService.deletePlayer(1L));
        verify(playerRepository, never()).deleteById(any());
    }

    @Test
    void getPlayerDeck_shouldThrowWhenPlayerNotFound() {
        // Given
        when(playerRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(PlayerNotFoundException.class, () -> playerService.getPlayerDeck(1L, 1L));
    }

    @Test
    void getPlayerDeck_shouldThrowWhenDeckNotFound() {
        // Given
        PlayerEntity entity = new PlayerEntity();
        entity.setId(1L);
        entity.setName("Test Player");
        entity.setDecks(new ArrayList<>());
        when(playerRepository.findById(1L)).thenReturn(Optional.of(entity));

        // When & Then
        assertThrows(DeckNotFoundException.class, () -> playerService.getPlayerDeck(1L, 999L));
    }

    @Test
    void addDeckToPlayer_shouldThrowWhenDuplicateName() {
        // Given
        DeckEntity existingDeck = new DeckEntity();
        existingDeck.setId(1L);
        existingDeck.setName("Existing Deck");
        existingDeck.setCommander("Commander");
        existingDeck.setBracket(Bracket.ONE);

        PlayerEntity entity = new PlayerEntity();
        entity.setId(1L);
        entity.setName("Test Player");
        entity.setDecks(new ArrayList<>(List.of(existingDeck)));
        when(playerRepository.findById(1L)).thenReturn(Optional.of(entity));

        Deck newDeck = new Deck(Optional.empty(), "Existing Deck", "Commander2", Bracket.TWO);

        // When & Then
        assertThrows(DuplicateDeckNameException.class, 
            () -> playerService.addDeckToPlayer(1L, newDeck));
    }

    @Test
    void updateDeck_shouldThrowWhenPlayerNotFound() {
        // Given
        when(playerRepository.findById(1L)).thenReturn(Optional.empty());
        UpdateDeckRequest request = new UpdateDeckRequest("New Name", "New Commander", Bracket.TWO, true);

        // When & Then
        assertThrows(PlayerNotFoundException.class, 
            () -> playerService.updateDeck(1L, 1L, request));
    }
}
