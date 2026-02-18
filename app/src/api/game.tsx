// Game API types and functions

export type GameStatus = "RUNNING" | "FINISHED" | "CANCELLED"

export type PlayerDeckSelection = {
  playerId: string
  deckId: string
  turnOrder: number
}

export type CreateGameRequest = {
  playerDeckSelections: Array<PlayerDeckSelection>
}

export type FinishGameRequest = {
  winnerPlayerId: string
}

export type GamePlayerResponse = {
  playerId: string
  playerName: string
  deckId: string
  deckName: string
  commander: string
  turnOrder: number
}

export type GameResponse = {
  id: string
  players: Array<GamePlayerResponse>
  status: GameStatus
  currentRound: number
  createdAt: string
  finishedAt: string | null
  winner: GamePlayerResponse | null
}

export const GameApi = {
  createGame: async (request: CreateGameRequest): Promise<GameResponse> => {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      throw new Error(`Error creating game: ${response.statusText}`)
    }
    return response.json()
  },

  getAllGames: async (): Promise<Array<GameResponse>> => {
    const response = await fetch("/api/games")
    if (!response.ok) {
      throw new Error(`Error fetching games: ${response.statusText}`)
    }
    return response.json()
  },

  getRunningGames: async (): Promise<Array<GameResponse>> => {
    const response = await fetch("/api/games/running")
    if (!response.ok) {
      throw new Error(`Error fetching running games: ${response.statusText}`)
    }
    return response.json()
  },

  getFinishedGames: async (): Promise<Array<GameResponse>> => {
    const response = await fetch("/api/games/finished")
    if (!response.ok) {
      throw new Error(`Error fetching finished games: ${response.statusText}`)
    }
    return response.json()
  },

  getCancelledGames: async (): Promise<Array<GameResponse>> => {
    const response = await fetch("/api/games/cancelled")
    if (!response.ok) {
      throw new Error(`Error fetching cancelled games: ${response.statusText}`)
    }
    return response.json()
  },

  getGameById: async (gameId: string): Promise<GameResponse> => {
    const response = await fetch(`/api/game/${gameId}`)
    if (!response.ok) {
      throw new Error(`Error fetching game: ${response.statusText}`)
    }
    return response.json()
  },

  finishGame: async (
    gameId: string,
    request: FinishGameRequest,
  ): Promise<GameResponse> => {
    const response = await fetch(`/api/game/${gameId}/finish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      throw new Error(`Error finishing game: ${response.statusText}`)
    }
    return response.json()
  },

  cancelGame: async (gameId: string): Promise<GameResponse> => {
    const response = await fetch(`/api/game/${gameId}/cancel`, {
      method: "PATCH",
    })
    if (!response.ok) {
      throw new Error(`Error cancelling game: ${response.statusText}`)
    }
    return response.json()
  },

  updateRound: async (
    gameId: string,
    newRound: number,
  ): Promise<GameResponse> => {
    const response = await fetch(
      `/api/game/${gameId}/update-round?newRound=${newRound}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    if (!response.ok) {
      throw new Error(`Error advancing to next round: ${response.statusText}`)
    }
    return response.json()
  },
  deleteGame: async (gameId: string): Promise<void> => {
    const response = await fetch(`/api/game/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Unable to delete game")
    }
  },
}
