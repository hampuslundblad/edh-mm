import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateGameRequest, FinishGameRequest } from "@/api/game"
import { GameApi } from "@/api/game"

// Hook for game mutations only
export const useGameMutations = () => {
  const queryClient = useQueryClient()

  const createGameMutation = useMutation({
    mutationFn: (request: CreateGameRequest) => GameApi.createGame(request),
    onSuccess: () => {
      // Invalidate all game-related queries
      queryClient.invalidateQueries({ queryKey: ["games"] })
      queryClient.invalidateQueries({ queryKey: ["games", "running"] })
      queryClient.invalidateQueries({ queryKey: ["games", "finished"] })
    },
  })

  const finishGameMutation = useMutation({
    mutationFn: ({
      gameId,
      request,
    }: {
      gameId: string
      request: FinishGameRequest
    }) => GameApi.finishGame(gameId, request),
    onSuccess: (_, variables) => {
      // Invalidate all game-related queries
      queryClient.invalidateQueries({ queryKey: ["games"] })
      queryClient.invalidateQueries({ queryKey: ["games", "running"] })
      queryClient.invalidateQueries({ queryKey: ["games", "finished"] })
      queryClient.invalidateQueries({
        queryKey: ["game", variables.gameId],
      })
    },
  })

  const updateRoundMutation = useMutation({
    mutationFn: ({ gameId, newRound }: { gameId: string; newRound: number }) =>
      GameApi.updateRound(gameId, newRound),
    onSuccess: (_, gameId) => {
      // Invalidate specific game query
      queryClient.invalidateQueries({ queryKey: ["game", gameId] })
      // Also invalidate all games to update any list views
      queryClient.invalidateQueries({ queryKey: ["games"] })
    },
  })

  return {
    // Mutations
    createGameMutation,
    finishGameMutation,
    updateRoundMutation,
  }
}
