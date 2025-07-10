package com.hampuslundblad.edh.player;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hampuslundblad.edh.deck.Bracket;
import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.player.dto.AddDeckToPlayerRequest;
import com.hampuslundblad.edh.player.dto.CreatePlayerRequest;
import com.hampuslundblad.edh.player.dto.UpdateDeckRequest;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

@RestController
@RequestMapping("/api")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public Map<String, List<Player>> getPlayers() {

        return Map.of("players", playerService.getAllPlayers());
    }

    @GetMapping("/player/{playerId}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long playerId) {
        Optional<Player> player = playerService.getPlayerById(playerId);
        if (player.isPresent()) {
            return ResponseEntity.ok(player.get());
        } else {
            throw new PlayerNotFoundException(playerId);
        }
    }

    @PostMapping("/player")
    public ResponseEntity<Object> createPlayer(@Valid @RequestBody CreatePlayerRequest request) {

        Player player = new Player(Optional.empty(), request.name(), List.of());
        playerService.savePlayer(player);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/player/{playerId}/deck")
    public ResponseEntity<Void> addDeckToPlayer(@PathVariable Long playerId,
            @Valid @RequestBody AddDeckToPlayerRequest request) {
        Deck deck = new Deck(Optional.empty(), request.deckName(), "Unknown commander", request.bracket());
        playerService.addDeckToPlayer(playerId, deck);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("player/{playerId}/deck/{deckId}")
    public ResponseEntity<Void> updateDeck(@PathVariable Long playerId,
            @PathVariable Long deckId,
            @Valid @RequestBody UpdateDeckRequest request) {
        playerService.updateDeck(playerId, deckId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/player/{playerId}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.noContent().build();
    }
}
