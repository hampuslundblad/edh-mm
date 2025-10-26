// Game API types and functions

export type GameStatus = "RUNNING" | "FINISHED"

export type PlayerDeckSelection = {
  playerId: string
  deckId: string
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
  isWinner: boolean
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

  nextRound: async (gameId: string): Promise<GameResponse> => {
    const response = await fetch(`/api/game/${gameId}/next-round`, {
      method: "PATCH",
    })
    if (!response.ok) {
      throw new Error(`Error advancing to next round: ${response.statusText}`)
    }
    return response.json()
  },
}
