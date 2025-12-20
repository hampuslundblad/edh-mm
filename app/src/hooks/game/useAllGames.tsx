import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const getAllGamesOptions = {
  queryKey: ["games"],
  queryFn: GameApi.getAllGames,
}

export const useAllGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: GameApi.getAllGames,
  })
}
