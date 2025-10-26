import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const useFinishedGames = () => {
  return useQuery({
    queryKey: ["games", "finished"],
    queryFn: GameApi.getFinishedGames,
  })
}
