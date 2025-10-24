import { useQuery } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const useGetDeck = (playerId: string, deckId: string) => {
  return useQuery({
    queryKey: ["deck", playerId, deckId],
    queryFn: () => PlayersApi.getDeckById(playerId, deckId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    enabled: !!deckId && !!playerId, // Only run the query if id is truthy
  })
}
