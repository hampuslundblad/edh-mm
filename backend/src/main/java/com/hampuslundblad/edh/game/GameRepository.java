package com.hampuslundblad.edh.game;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long> {

    // Spring Data JPA automatically generates the query from the method name
    List<GameEntity> findByStatusOrderByCreatedAtDesc(GameStatus status);

    // Use the built-in findAll with Sort parameter
    default List<GameEntity> findAllOrderByCreatedAtDesc() {
        return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}