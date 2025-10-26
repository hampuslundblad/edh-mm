import { useQuery } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const useRunningGames = () => {
  return useQuery({
    queryKey: ["games", "running"],
    queryFn: GameApi.getRunningGames,
  })
}
