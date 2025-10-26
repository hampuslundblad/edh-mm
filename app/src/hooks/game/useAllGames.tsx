import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const useAllGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: GameApi.getAllGames,
  })
}
