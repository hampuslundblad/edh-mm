import { useMutation } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const useCreatePlayer = () => {
  return useMutation({
    mutationFn: (name: string) => PlayersApi.createPlayer(name),
  })
}
