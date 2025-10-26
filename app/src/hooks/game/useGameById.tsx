import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const useGameById = (gameId: string) =>
  useQuery({
    queryKey: ["game", gameId],
    queryFn: () => GameApi.getGameById(gameId),
    enabled: !!gameId,
  })
