import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
      queryClient.invalidateQueries({
        queryKey: ["game", variables.gameId],
      })
    },
  })

  const nextRoundMutation = useMutation({
    mutationFn: (gameId: string) => GameApi.nextRound(gameId),
    onSuccess: (_, gameId) => {
      // Invalidate specific game query
      queryClient.invalidateQueries({ queryKey: ["game", gameId] })
      // Also invalidate all games to update any list views
      queryClient.invalidateQueries({ queryKey: ["games"] })
    },
  })

  //   // Helper functions
  //   const createGame = (request: CreateGameRequest) => {
  //     return createGameMutation.mutate(request)
  //   }

  //   const finishGame = (gameId: string, winnerPlayerId: string) => {
  //     return finishGameMutation.mutate({
  //       gameId,
  //       request: { winnerPlayerId },
  //     })
  //   }

  //   const nextRound = (gameId: string) => {
  //     return nextRoundMutation.mutate(gameId)
  //   }

  return {
    // Mutations
    createGameMutation,
    finishGameMutation,
    nextRoundMutation,
  }
}

// Hook for game queries only
export const useGameQueries = (gameId?: string) => {
  const gameQuery = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => GameApi.getGameById(gameId!),
    enabled: !!gameId,
  })

  const allGamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: GameApi.getAllGames,
  })

  const runningGamesQuery = useQuery({
    queryKey: ["games", "running"],
    queryFn: GameApi.getRunningGames,
  })

  return {
    // Data
    game: gameQuery.data,
    games: allGamesQuery.data,
    runningGames: runningGamesQuery.data,

    // Loading states
    isLoadingGame: gameQuery.isLoading,
    isLoadingGames: allGamesQuery.isLoading,
    isLoadingRunningGames: runningGamesQuery.isLoading,

    // Error states
    gameError: gameQuery.error,
    gamesError: allGamesQuery.error,
    runningGamesError: runningGamesQuery.error,

    // Utility flag
    isAnyQueryLoading:
      gameQuery.isLoading ||
      allGamesQuery.isLoading ||
      runningGamesQuery.isLoading,

    // Refetch functions
    refetchGame: gameQuery.refetch,
    refetchGames: allGamesQuery.refetch,
    refetchRunningGames: runningGamesQuery.refetch,
  }
}
