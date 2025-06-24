package com.hampuslundblad.edh.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return playerRepository.findById(id)
                .map(Player::toDomain);
    }

    public Player savePlayer(Player player) {
        var entity = Player.fromDomain(player);
        var playerEntity = playerRepository.save(entity);
        return Player.toDomain(playerEntity);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
