package com.hampuslundblad.edh.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hampuslundblad.edh.game.dto.CreateGameRequest;
import com.hampuslundblad.edh.game.dto.FinishGameRequest;
import com.hampuslundblad.edh.game.dto.GameResponse;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/game")
    public ResponseEntity<GameResponse> createGame(@Valid @RequestBody CreateGameRequest request) {
        try {
            GameResponse game = gameService.createGame(request);
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/games")
    public ResponseEntity<List<GameResponse>> getAllGames() {
        List<GameResponse> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/games/running")
    public ResponseEntity<List<GameResponse>> getRunningGames() {
        List<GameResponse> games = gameService.getRunningGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<GameResponse> getGameById(@PathVariable Long gameId) {
        return gameService.getGameById(gameId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/game/{gameId}/finish")
    public ResponseEntity<GameResponse> finishGame(
            @PathVariable Long gameId,
            @Valid @RequestBody FinishGameRequest request) {
        GameResponse game = gameService.finishGame(gameId, request.winnerPlayerId());
        return ResponseEntity.ok(game);
    }

    @PatchMapping("/game/{gameId}/next-round")
    public ResponseEntity<GameResponse> nextRound(@PathVariable Long gameId) {
        GameResponse game = gameService.nextRound(gameId);
        return ResponseEntity.ok(game);
    }
}

