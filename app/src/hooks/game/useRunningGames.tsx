import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const getRunningGamesOptions = {
  queryKey: ["games", "running"],
  queryFn: GameApi.getRunningGames,
}

export const useRunningGames = () => {
  return useQuery(getRunningGamesOptions)
}
