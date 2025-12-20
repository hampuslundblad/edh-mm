import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const getFinishedGamesOptions = {
  queryKey: ["games", "finished"],
  queryFn: GameApi.getFinishedGames,
}

export const useFinishedGames = () => {
  return useQuery(getFinishedGamesOptions)
}
