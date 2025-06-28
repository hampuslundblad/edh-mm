import { useQuery } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const usePlayer = (id: string) => {
  return useQuery({
    queryKey: ["players", id],
    queryFn: () => PlayersApi.getPlayerById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    enabled: !!id, // Only run the query if id is truthy
  })
}
