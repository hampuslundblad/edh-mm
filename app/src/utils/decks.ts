export enum Bracket {
  One = "1",
  Two = "2",
  Three = "3",
  ThreePlus = "3+",
  Four = "4",
  Five = "5",
}

// type Deck = {
//   id: string
//   name: string
//   bracket: Bracket
//   belongsTo: string // Player ID
// }
// export const allDecks: Array<Deck> = initalPlayers.flatMap((player) =>
//   player.deck.map((deck) => ({
//     id: `${player.id}-${deck.name}`,
//     name: deck.name,
//     bracket: deck.bracket,
//     belongsTo: player.name,
//   })),
// )
