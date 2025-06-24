package com.hampuslundblad.edh.deck;

import jakarta.persistence.*;

@Entity
@Table(
    name = "deck_entity",
    uniqueConstraints = @UniqueConstraint(columnNames = {"player_id", "name"})
)
public class DeckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String commander;
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    private Bracket bracket;

    public DeckEntity() {}

    public DeckEntity(String name, String commander, Bracket bracket) {
        this.name = name;
        this.commander = commander;
        this.bracket = bracket;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCommander() { return commander; }
    public void setCommander(String commander) { this.commander = commander; }

    public Bracket getBracket() { return bracket; }
    public void setBracket(Bracket bracket) { this.bracket = bracket; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
