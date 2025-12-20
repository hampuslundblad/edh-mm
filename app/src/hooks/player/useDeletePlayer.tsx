import { useMutation } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const deletePlayerOptions = {
  mutationFn: (id: string) => PlayersApi.deletePlayer(id),
}

export const useDeletePlayer = () => {
  return useMutation(deletePlayerOptions)
}
