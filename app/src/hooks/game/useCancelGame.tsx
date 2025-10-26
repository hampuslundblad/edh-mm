import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GameApi } from "@/api/game"

export const useCancelGame = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gameId: string) => GameApi.cancelGame(gameId),
    onSuccess: () => {
      // Invalidate and refetch game-related queries
      queryClient.invalidateQueries({ queryKey: ["games"] })
    },
  })
}
