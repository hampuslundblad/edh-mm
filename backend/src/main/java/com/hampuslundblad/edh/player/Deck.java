package com.hampuslundblad.edh.player;

public class Deck {
    private String name;
    private String commander;
    private Bracket bracket;
    private Boolean isActive = true;

    // Constructors
    public Deck(String name, String commander, Bracket bracket) {
        this.name = name;
        this.commander = commander;
        this.bracket = bracket;
    }

    public String getName() {
        return name;
    }

    public String getCommander() {
        return commander;
    }

    public Bracket getBracket() {
        return bracket;
    }

    public Boolean getIsActive() {
        return isActive;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
