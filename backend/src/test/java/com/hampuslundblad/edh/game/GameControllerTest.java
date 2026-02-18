package com.hampuslundblad.edh.game;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hampuslundblad.edh.game.dto.CreateGameRequest;
import com.hampuslundblad.edh.game.dto.GameResponse;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = GameController.class)
class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GameService gameService;

    @Test
    void createGame_shouldReturn200_whenValidRequest() throws Exception {
        // Given
        GameResponse.GamePlayerResponse player = new GameResponse.GamePlayerResponse(
            1L, "Alice", 5L, "Atraxa", "Atraxa", 1
        );
        GameResponse response = new GameResponse(
            7L, List.of(player), GameStatus.RUNNING, 1, LocalDateTime.now(), null, null
        );
        when(gameService.createGame(any(CreateGameRequest.class))).thenReturn(response);

        CreateGameRequest request = new CreateGameRequest(List.of(
            new CreateGameRequest.PlayerDeckSelection(1L, 5L, 1)
        ));

        // When & Then
        mockMvc.perform(MockMvcRequestBuilders.post("/api/game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(7))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("RUNNING"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.players[0].playerName").value("Alice"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.players[0].turnOrder").value(1));
    }

    @Test
    void createGame_shouldReturn400_whenServiceThrows() throws Exception {
        // Given
        when(gameService.createGame(any(CreateGameRequest.class)))
            .thenThrow(new RuntimeException("Player not found"));

        CreateGameRequest request = new CreateGameRequest(List.of(
            new CreateGameRequest.PlayerDeckSelection(99L, 1L, 1)
        ));

        // When & Then
        mockMvc.perform(MockMvcRequestBuilders.post("/api/game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
