package com.hampuslundblad.edh.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hampuslundblad.edh.deck.Deck;
import com.hampuslundblad.edh.deck.DeckEntity;
import com.hampuslundblad.edh.deck.exceptions.DeckNotFoundException;
import com.hampuslundblad.edh.player.dto.UpdateDeckRequest;
import com.hampuslundblad.edh.player.exceptions.DuplicateDeckNameException;
import com.hampuslundblad.edh.player.exceptions.PlayerNotFoundException;

import java.util.List;
import java.util.Optional;

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

    public Optional<Player> getPlayerById(Long id) {
        Optional<PlayerEntity> playerEntity = playerRepository.findById(id);
        return playerEntity.map(Player::toDomain);
    }

    public Player createPlayer(String name) {
        Player player = new Player(Optional.empty(), name, List.of());
        var entity = Player.fromDomain(player);
        var savedEntity = playerRepository.save(entity);
        return Player.toDomain(savedEntity);
    }

    public Player savePlayer(Player player) {
        var entity = Player.fromDomain(player);
        var playerEntity = playerRepository.save(entity);
        return Player.toDomain(playerEntity);
    }

    public void deletePlayer(Long id) {
        boolean exists = playerRepository.existsById(id);
        if (!exists) {
            throw new PlayerNotFoundException(id);
        }
        playerRepository.deleteById(id);
    }

    public Player updateDeck(Long playerId, Long deckId, UpdateDeckRequest request) {
        PlayerEntity playerEntity = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));

        DeckEntity deckEntity = playerEntity.getDecks().stream()
                .filter(d -> d.getId().equals(deckId))
                .findFirst()
                .orElseThrow(() -> new DeckNotFoundException(deckId));

        deckEntity.setName(request.name());
        deckEntity.setCommander(request.commander());
        deckEntity.setBracket(request.bracket());
        deckEntity.setIsActive(request.isActive());

        playerRepository.save(playerEntity);

        return Player.toDomain(playerEntity);
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
