package com.hampuslundblad.edh;


import com.hampuslundblad.edh.deck.Bracket;
import com.hampuslundblad.edh.player.PlayerController;
import com.hampuslundblad.edh.player.PlayerService;
import com.hampuslundblad.edh.player.dto.AddDeckToPlayerRequest;
import com.hampuslundblad.edh.player.dto.PostPlayerRequest;
import com.hampuslundblad.edh.player.exceptions.DuplicateDeckNameException;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PlayerController.class)
class PlayerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PlayerService playerService;

    @Test
    void createPlayer_whenPlayerNotFound_returnsNotFound() throws Exception {
        // Arrange: make the service throw the exception
        when(playerService.savePlayer(any()))
            .thenThrow(new PlayerNotFoundException(1L));

        PostPlayerRequest request = new PostPlayerRequest("Some Name");

        mockMvc.perform(post("/player")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }
    @Test
    void addDeckToPlayer_whenDuplicateDeckName_returnsConflict() throws Exception {
        // Arrange: make the service throw the exception
        when(playerService.addDeckToPlayer(any(Long.class), any()))
            .thenThrow(new DuplicateDeckNameException("Duplicate Deck"));

        AddDeckToPlayerRequest request = new AddDeckToPlayerRequest("Duplicate Deck", Bracket.TWO);

        mockMvc.perform(post("/player/1/deck")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }


}
