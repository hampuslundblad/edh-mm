
package com.hampuslundblad.edh.player;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlayerController {
List<Player> players =  List.of(new Player("Adam", List.of(
        new Deck("Mono svart precon", "Unknown Commander", Bracket.TWO),
        new Deck("Jeskai dragon precon", "Unknown Commander", Bracket.TWO),
        new Deck("Mardu dragon precon", "Unknown Commander", Bracket.TWO),
        new Deck("Multicolor angels", "Unknown Commander", Bracket.THREE),
        new Deck("Tasha", "Unknown Commander", Bracket.THREE),
        new Deck("Simic eldrazis", "Unknown Commander", Bracket.THREE),
        new Deck("Toolbox", "Unknown Commander", Bracket.THREE_PLUS),
        new Deck("Ojutai (kanske bracket 3)", "Unknown Commander", Bracket.THREE_PLUS)
        )),
        new Player("Albin", List.of(
        new Deck("Kardor", "Unknown Commander", Bracket.TWO),
        new Deck("Token precon", "Unknown Commander", Bracket.THREE),
        new Deck("Xyris, the writhing storm", "Unknown Commander", Bracket.THREE),
        new Deck("5C Omnath", "Unknown Commander", Bracket.THREE),
        new Deck("Ur dragon", "Unknown Commander", Bracket.THREE),
        new Deck("Ninjor", "Unknown Commander", Bracket.THREE),
        new Deck("Enchantress", "Unknown Commander", Bracket.THREE),
        new Deck("Hazezon, Shaper of Sand", "Unknown Commander", Bracket.THREE_PLUS)
        )),
        new Player("Martin", List.of(
        new Deck("Mardu Precon", "Unknown Commander", Bracket.TWO),
        new Deck("Edgar Markov", "Unknown Commander", Bracket.TWO),
        new Deck("Martin the planeswalker", "Unknown Commander", Bracket.THREE),
        new Deck("Hampus och Martin (Partners)", "Unknown Commander", Bracket.THREE),
        new Deck("Eldrazi", "Unknown Commander", Bracket.THREE),
        new Deck("Prosper tome-bound (3+?)", "Unknown Commander", Bracket.THREE_PLUS),
        new Deck("Abzan landfall", "Unknown Commander", Bracket.THREE_PLUS)
        )),
        new Player("Hampus", List.of(
        new Deck("Sultai Dragon Precon", "Unknown Commander", Bracket.TWO),
        new Deck("Kadena", "Unknown Commander", Bracket.TWO),
        new Deck("ZURGO HELMSMASHER", "Unknown Commander", Bracket.THREE),
        new Deck("Tyvarr, the Bellicose", "Unknown Commander", Bracket.THREE),
        new Deck("Derevi, Empyrial Tactician", "Unknown Commander", Bracket.THREE),
        new Deck("Ovika, Enigma Goliath", "Unknown Commander", Bracket.THREE),
        new Deck("Atraxa, Praetors' Voice", "Unknown Commander", Bracket.THREE),
        new Deck("Landfall Omnath", "Unknown Commander", Bracket.THREE_PLUS),
        new Deck("Muldrotha the gravetide", "Unknown Commander", Bracket.THREE_PLUS)
        ))
    );

    @GetMapping("/player")
    public List<Player> getPlayers() {
        return players;
    }
}
