import { initalPlayers } from "@/utils/players"

export const PlayersApi = {
  getAllPlayers: async () => {
    const response = await fetch("/api/player")
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.statusText}`)
    }
    return response.json()
  },

  getPlayerById: async (id: string) => {
    const player = initalPlayers.find((player) => player.id === id)
    if (!player) {
      throw new Error(`Player with id ${id} not found`)
    }
    return with100msDelay(player)
  },
}

function with100msDelay<T>(obj: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(obj)
    }, 100)
  })
}
