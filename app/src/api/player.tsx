import type { Bracket } from "@/utils/decks"

export type Deck = {
  name: string
  commander: string
  bracket: Bracket
  isActive: boolean
}

export type Player = {
  id: string
  name: string
  decks: Array<Deck>
}

export type GetPlayerResponse = Player

export type GetAllPlayerResponse = {
  players: Array<Player>
}

export const PlayersApi = {
  getAllPlayers: async (): Promise<GetAllPlayerResponse> => {
    const response = await fetch("/api/players")
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`)
    }
    return response.json()
  },

  createPlayer: async (name: string) => {
    const response = await fetchWithPost("/api/player", { name })
    return response.json()
  },

  getPlayerById: async (id: string): Promise<GetPlayerResponse> => {
    const player = await fetch(`/api/player/${id}`)
    if (!player.ok) {
      throw new Error(`Error fetching player: ${player.statusText}`)
    }
    return player.json()
  },
}

async function fetchWithPost<T>(url: string, data: T): Promise<Response> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`)
  }
  return response
}
