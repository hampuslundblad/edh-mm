package com.hampuslundblad.edh.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long> {
    
    @Query("SELECT g FROM GameEntity g WHERE g.status = :status ORDER BY g.createdAt DESC")
    List<GameEntity> findByStatusOrderByCreatedAtDesc(GameStatus status);
    
    @Query("SELECT g FROM GameEntity g ORDER BY g.createdAt DESC")
    List<GameEntity> findAllOrderByCreatedAtDesc();
}