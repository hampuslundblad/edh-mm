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

export type AddDeckToPlayerRequest = {
  playerId: string
  deckName: string
  bracket: Bracket
}

export type UpdateDeckRequest = {
  playerId: string
  deckId: string
  name: string
  commander: string
  bracket: Bracket
  isActive: boolean
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
    await fetchWithPost("/api/player", { name })
    //   return response.json()
  },

  addDeckToPlayer: async (request: AddDeckToPlayerRequest) => {
    const deck = {
      deckName: request.deckName,
      bracket: request.bracket,
    }

    const response = await fetchWithPost(
      `/api/player/${request.playerId}/deck`,
      deck,
    )
    if (!response.ok) {
      throw new Error(`Error adding deck to player: ${response.statusText}`)
    }
    return Promise.resolve()
  },

  updateDeck: async (
    playerId: string,
    deckId: string,
    request: { name: string; commander: string },
  ) => {
    const response = await fetch(`/api/player/${playerId}/deck/${deckId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      throw new Error(`Error updating deck: ${response.statusText}`)
    }
    return Promise.resolve()
  },

  deletePlayer: async (id: string) => {
    const response = await fetch(`/api/player/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Error deleting player: ${response.statusText}`)
    }
    return Promise.resolve()
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
