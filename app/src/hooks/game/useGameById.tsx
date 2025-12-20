import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const getGameByIdOptions = (gameId: string) => ({
  queryKey: ["game", gameId],
  queryFn: () => GameApi.getGameById(gameId),
  enabled: !!gameId,
})

export const useGameById = (gameId: string) =>
  useQuery(getGameByIdOptions(gameId))
