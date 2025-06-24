package com.hampuslundblad.edh.player;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.hampuslundblad.edh.deck.Bracket;
import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.player.dto.AddDeckToPlayerRequest;
import com.hampuslundblad.edh.player.dto.PostPlayerRequest;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

@RestController
public class PlayerController {
    List<Player> players = List.of(
            new Player("Adam", List.of(
                    new Deck("Mono svart precon", "Unknown Commander", Bracket.TWO),
                    new Deck("Jeskai dragon precon", "Unknown Commander", Bracket.TWO),
                    new Deck("Mardu dragon precon", "Unknown Commander", Bracket.TWO),
                    new Deck("Multicolor angels", "Unknown Commander", Bracket.THREE),
                    new Deck("Tasha", "Unknown Commander", Bracket.THREE),
                    new Deck("Simic eldrazis", "Unknown Commander", Bracket.THREE),
                    new Deck("Toolbox", "Unknown Commander", Bracket.THREE_PLUS),
                    new Deck("Ojutai (kanske bracket 3)", "Unknown Commander", Bracket.THREE_PLUS))),
            new Player("Albin", List.of(
                    new Deck("Kardor", "Unknown Commander", Bracket.TWO),
                    new Deck("Token precon", "Unknown Commander", Bracket.THREE),
                    new Deck("Xyris, the writhing storm", "Unknown Commander", Bracket.THREE),
                    new Deck("5C Omnath", "Unknown Commander", Bracket.THREE),
                    new Deck("Ur dragon", "Unknown Commander", Bracket.THREE),
                    new Deck("Ninjor", "Unknown Commander", Bracket.THREE),
                    new Deck("Enchantress", "Unknown Commander", Bracket.THREE),
                    new Deck("Hazezon, Shaper of Sand", "Unknown Commander", Bracket.THREE_PLUS))),
            new Player("Martin", List.of(
                    new Deck("Mardu Precon", "Unknown Commander", Bracket.TWO),
                    new Deck("Edgar Markov", "Unknown Commander", Bracket.TWO),
                    new Deck("Martin the planeswalker", "Unknown Commander", Bracket.THREE),
                    new Deck("Hampus och Martin (Partners)", "Unknown Commander", Bracket.THREE),
                    new Deck("Eldrazi", "Unknown Commander", Bracket.THREE),
                    new Deck("Prosper tome-bound (3+?)", "Unknown Commander", Bracket.THREE_PLUS),
                    new Deck("Abzan landfall", "Unknown Commander", Bracket.THREE_PLUS))),
            new Player("Hampus", List.of(
                    new Deck("Sultai Dragon Precon", "Unknown Commander", Bracket.TWO),
                    new Deck("Kadena", "Unknown Commander", Bracket.TWO),
                    new Deck("ZURGO HELMSMASHER", "Unknown Commander", Bracket.THREE),
                    new Deck("Tyvarr, the Bellicose", "Unknown Commander", Bracket.THREE),
                    new Deck("Derevi, Empyrial Tactician", "Unknown Commander", Bracket.THREE),
                    new Deck("Ovika, Enigma Goliath", "Unknown Commander", Bracket.THREE),
                    new Deck("Atraxa, Praetors' Voice", "Unknown Commander", Bracket.THREE),
                    new Deck("Landfall Omnath", "Unknown Commander", Bracket.THREE_PLUS),
                    new Deck("Muldrotha the gravetide", "Unknown Commander", Bracket.THREE_PLUS))));

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/player")
    public List<Player> getPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping("/player")
    public Player createPlayer(@Valid @RequestBody PostPlayerRequest request) {

        Player player = new Player(request.name(), List.of());
        return playerService.savePlayer(player);
    }

    @PostMapping("/player/{playerId}/deck")
    public ResponseEntity<Void> addDeckToPlayer(@PathVariable Long playerId,
            @Valid @RequestBody AddDeckToPlayerRequest request) {
        Deck deck = new Deck(request.deckName(), "Unknown commander", request.bracket());
        playerService.addDeckToPlayer(playerId, deck);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/player/{playerId}/deck/{deckName}")
    public ResponseEntity<Void> toggleDeckActivity(@PathVariable Long playerId,
            @PathVariable String deckName) {
                return ResponseEntity.ok().build();
            }
        }
