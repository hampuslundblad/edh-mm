import { GameApi } from "@/api/game"

export const deleteGameOptions = () => {
  return {
    mutationFn: (gameId: string) => GameApi.deleteGame(gameId),
  }
}
