import type { AddDeckToPlayerRequest } from "@/api/player"
import { PlayersApi } from "@/api/player"

export const addDeckToPlayerOptions = {
  mutationFn: (request: AddDeckToPlayerRequest) => {
    return PlayersApi.addDeckToPlayer(request)
  },
}
