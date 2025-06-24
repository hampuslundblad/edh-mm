package com.hampuslundblad.edh.deck;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


    @RestController
    public class DeckController {

        @PostMapping("/decks")
        public Deck addDeck(@RequestBody Deck deck) {
            // Add logic to save the deck (e.g., to a database)
            // For now, just return the received deck
            return deck;
        }
    }

