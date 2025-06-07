import { Bracket } from "./decks"

type Deck = {
  name: string
  bracket: Bracket
}

export type Player = {
  name: string
  id: string
  deck: Array<Deck>
}

const getPlayerByName = (playerName: string): Player | undefined => {
  return initalPlayers.find((player) => player.name === playerName)
}

export const doesPlayerHaveDeckWithinBracket = (
  playerName: string,
  bracket: Bracket,
) => {
  const player = initalPlayers.find((p) => p.name === playerName)
  if (!player) return false
  return player.deck.some((deck) => deck.bracket === bracket)
}

export const numbersOfDecksWithinBracket = (
  playerName: string,
  bracket: Bracket,
): number => {
  const player = getPlayerByName(playerName)
  if (!player) return -1
  return player.deck.filter((deck) => deck.bracket === bracket).length
}

export const initalPlayers: Array<Player> = [
  {
    name: "Adam",
    id: "1",
    deck: [
      // Bracket 2 (2-3 decks)
      { name: "Mono svart precon", bracket: Bracket.Two },
      { name: "Jeskai dragon precon", bracket: Bracket.Two },
      { name: "Mardu dragon precon", bracket: Bracket.Two },
      // Bracket 3 (3-4 decks)
      { name: "Multicolor angels", bracket: Bracket.Three },
      { name: "Tasha", bracket: Bracket.Three },
      { name: "Simic eldrazis", bracket: Bracket.Three },
      // Bracket 3+ (2-3 decks)
      { name: "Toolbox", bracket: Bracket.ThreePlus },
      { name: "Ojutai (kanske bracket 3)", bracket: Bracket.ThreePlus },
    ],
  },
  {
    name: "Albin",
    id: "2",
    deck: [
      // Bracket 2

      { name: "Kardor", bracket: Bracket.Two },
      // Bracket 3
      { name: "Token precon", bracket: Bracket.Three },
      { name: "Xyris, the writhing storm", bracket: Bracket.Three} ,
      { name: "5C Omnath", bracket: Bracket.Three },
  { name: "Ur dragon", bracket: Bracket.Three },
 { name: "Ninjor ", bracket: Bracket.Three },
 { name: "Enchantress", bracket: Bracket.Three },
// 3+ 
      { name: "Hazezon, Shaper of Sand", bracket: Bracket.ThreePlus },
   
 ],
  },
  {
    name: "Martin",
    id: "3",
    deck: [
      // Bracket 2
      { name: "Mardu Precon", bracket: Bracket.Two },
  { name: "Edgar Markov", bracket: Bracket.Two },
      // Bracket 3
      { name: "Martin the planeswalker", bracket: Bracket.Three },
      { name: "Hampus och Martin (Partners)", bracket: Bracket.Three },

      { name: "Prosper tome-bound (3+?)", bracket: Bracket.ThreePlus },
      // Bracket 3+
 { name: "Abzan landfall", bracket: Bracket.ThreePlus },
    ],
  },
  {
    name: "Hampus",
    id: "4",
    deck: [
      // Bracket 2
      { name: "Sultai Dragon Precon", bracket: Bracket.Two },
        {name:"Kadena", bracket: Bracket.Two },
      // Bracket 3
      { name: "ZURGO HELMSMASHER", bracket: Bracket.Three },
      { name: "Tyvarr, the Bellicose", bracket: Bracket.Three },
      { name: "Derevi, Empyrial Tactician", bracket: Bracket.Three },
      { name: "Ovika, Enigma Goliath", bracket: Bracket.Three },
      { name: "Atraxa, Praetors' Voice", bracket: Bracket.Three },
      // Bracket 3+
      { name: "Landfall Omnath", bracket: Bracket.ThreePlus },
      { name: "Muldrotha the gravetide", bracket: Bracket.ThreePlus },
    ],
  },
]
