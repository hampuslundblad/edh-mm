package com.hampuslundblad.edh.deck;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

class DeckTest {

    @Test
    void constructor_shouldCreateDeckWithGivenValues() {
        // Given & When
        Deck deck = new Deck(Optional.of(1L), "Test Deck", "Test Commander", Bracket.ONE);

        // Then
        assertEquals(Optional.of(1L), deck.getId());
        assertEquals("Test Deck", deck.getName());
        assertEquals("Test Commander", deck.getCommander());
        assertEquals(Bracket.ONE, deck.getBracket());
        assertTrue(deck.getIsActive());
    }

    @Test
    void setIsActive_shouldUpdateActiveStatus() {
        // Given
        Deck deck = new Deck(Optional.empty(), "Test Deck", "Commander", Bracket.TWO);

        // When
        deck.setIsActive(false);

        // Then
        assertFalse(deck.getIsActive());
    }

    @Test
    void toDomain_shouldConvertEntityToDeck() {
        // Given
        DeckEntity entity = new DeckEntity();
        entity.setId(1L);
        entity.setName("Entity Deck");
        entity.setCommander("Entity Commander");
        entity.setBracket(Bracket.THREE);
        entity.setIsActive(false);

        // When
        Deck deck = Deck.toDomain(entity);

        // Then
        assertEquals(Optional.of(1L), deck.getId());
        assertEquals("Entity Deck", deck.getName());
        assertEquals("Entity Commander", deck.getCommander());
        assertEquals(Bracket.THREE, deck.getBracket());
        assertFalse(deck.getIsActive());
    }

    @Test
    void fromDomain_shouldConvertDeckToEntity() {
        // Given
        Deck deck = new Deck(Optional.of(1L), "Test Deck", "Test Commander", Bracket.FOUR);
        deck.setIsActive(false);

        // When
        DeckEntity entity = Deck.fromDomain(deck);

        // Then
        assertEquals("Test Deck", entity.getName());
        assertEquals("Test Commander", entity.getCommander());
        assertEquals(Bracket.FOUR, entity.getBracket());
        assertFalse(entity.getIsActive());
    }

    @Test
    void getId_shouldReturnEmptyWhenNoId() {
        // Given
        Deck deck = new Deck(Optional.empty(), "Test Deck", "Commander", Bracket.ONE);

        // When
        Optional<Long> id = deck.getId();

        // Then
        assertFalse(id.isPresent());
    }
}
