package com.hampuslundblad.edh.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.deck.DeckEntity;
import com.hampuslundblad.edh.player.exceptions.DuplicateDeckNameException;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(Player::toDomain)
                .toList();
    }

    public Player getPlayerById(Long id) {
        PlayerEntity playerEntity = playerRepository.findById(id)
        .orElseThrow(() -> new PlayerNotFoundException(id));
        
        return Player.toDomain(playerEntity);
    }

    public Player savePlayer(Player player) {
        var entity = Player.fromDomain(player);
        var playerEntity = playerRepository.save(entity);
        return Player.toDomain(playerEntity);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }


    public Player addDeckToPlayer(Long playerId, Deck deck) {
        PlayerEntity playerEntity = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
        
        DeckEntity deckEntity = Deck.fromDomain(deck);
        if (hasDeckWithName(playerEntity, deck.getName())) {
            throw new DuplicateDeckNameException(deck.getName());
        }
        playerEntity.getDecks().add(deckEntity);
        playerRepository.save(playerEntity);
    
        return Player.toDomain(playerEntity);
    }


    private boolean hasDeckWithName(PlayerEntity playerEntity, String deckName) {
        return playerEntity.getDecks().stream()
                .anyMatch(deck -> deck.getName().equalsIgnoreCase(deckName));
}
}
