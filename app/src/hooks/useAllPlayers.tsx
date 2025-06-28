import { useQuery } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const useAllPlayers = () => {
  return useQuery({
    queryKey: ["all-players"],
    queryFn: () => PlayersApi.getAllPlayers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}
