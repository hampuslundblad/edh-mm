import { useMutation } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const useDeletePlayer = () => {
  return useMutation({
    mutationFn: (id: string) => PlayersApi.deletePlayer(id),
  })
}
