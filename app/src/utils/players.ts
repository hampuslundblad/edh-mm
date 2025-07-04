import type { Player } from "@/api/player"
import type { Bracket } from "./decks"

const getPlayerByName = (
  playerName: string,
  players: Array<Player>,
): Player | undefined => {
  return players.find((player) => player.name === playerName)
}

export const doesPlayerHaveDeckWithinBracket = (
  playerName: string,
  bracket: Bracket,
  players: Array<Player>,
) => {
  const player = players.find((p) => p.name === playerName)
  if (!player) return false
  return player.decks.some((deck) => deck.bracket === bracket)
}

export const numbersOfDecksWithinBracket = (
  playerName: string,
  bracket: Bracket,
  players: Array<Player>,
): number => {
  const player = getPlayerByName(playerName, players)
  if (!player) return -1
  return player.decks.filter((deck) => deck.bracket === bracket).length
}
