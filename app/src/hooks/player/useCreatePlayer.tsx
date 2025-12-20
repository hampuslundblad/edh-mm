import { useMutation } from "@tanstack/react-query"
import { PlayersApi } from "@/api/player"

export const createPlayerOptions = {
  mutationFn: (name: string) => PlayersApi.createPlayer(name),
}

export const useCreatePlayer = () => {
  return useMutation(createPlayerOptions)
}
