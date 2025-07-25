package com.hampuslundblad.edh;


import com.hampuslundblad.edh.deck.Bracket;
import com.hampuslundblad.edh.deck.exceptions.DeckExceptionHandler;
import com.hampuslundblad.edh.deck.exceptions.DeckNotFoundException;
import com.hampuslundblad.edh.player.PlayerController;
import com.hampuslundblad.edh.player.PlayerService;
import com.hampuslundblad.edh.player.dto.AddDeckToPlayerRequest;

import com.hampuslundblad.edh.player.dto.UpdateDeckRequest;
import com.hampuslundblad.edh.player.exceptions.DuplicateDeckNameException;
import com.hampuslundblad.edh.player.exceptions.PlayerExceptionHandler;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PlayerController.class)
@Import({PlayerExceptionHandler.class, DeckExceptionHandler.class})
class PlayerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PlayerService playerService;

    // @Test
    // void addDeckToPlayer_whenDuplicateDeckName_returnsConflict() throws Exception {
    //     // Arrange: make the service throw the exception
    //     when(playerService.addDeckToPlayer(anyLong(), any()))
    //         .thenThrow(new DuplicateDeckNameException("Duplicate Deck"));

    //     AddDeckToPlayerRequest request = new AddDeckToPlayerRequest("Duplicate Deck", Bracket.TWO);

    //     mockMvc.perform(post("/player/1/deck")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(request)))
    //             .andExpect(status().isConflict());
    // }



    @Test
    void updateDeck_whenPlayerNotFound_returnsNotFound() throws Exception {
        // Arrange: make the service throw PlayerNotFoundException
        when(playerService.updateDeck(any(Long.class), any(Long.class), any(UpdateDeckRequest.class)))
            .thenThrow(new PlayerNotFoundException(1L));

        UpdateDeckRequest request = new UpdateDeckRequest("DeckName", "Commander", Bracket.TWO, true);

        mockMvc.perform(MockMvcRequestBuilders.patch("/player/1/deck/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void updateDeck_whenDeckNotFound_returnsNotFound() throws Exception {
        // Arrange: make the service throw DeckNotFoundException
        when(playerService.updateDeck(any(Long.class), any(Long.class), any(UpdateDeckRequest.class)))
            .thenThrow(new DeckNotFoundException(1L));

       UpdateDeckRequest request = new UpdateDeckRequest("DeckName", "Commander", Bracket.TWO, true);

        mockMvc.perform(MockMvcRequestBuilders.patch("/player/1/deck/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
