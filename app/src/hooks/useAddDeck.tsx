import { useMutation } from "@tanstack/react-query"
import type { AddDeckToPlayerRequest } from "@/api/player"
import { PlayersApi } from "@/api/player"

export const useAddDeck = () => {
  return useMutation({
    mutationFn: (request: AddDeckToPlayerRequest) => {
      return PlayersApi.addDeckToPlayer(request)
    },
  })
}
