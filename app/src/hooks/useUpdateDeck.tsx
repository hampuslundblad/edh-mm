import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Bracket } from "@/utils/decks"
import type { Deck } from "@/api/player"
import { PlayersApi } from "@/api/player"

export const useUpdateDeck = (playerId: string, deckId: string) => {
  const queryClient = useQueryClient()

  const updateDeckMutation = useMutation({
    mutationFn: (request: {
      name?: string
      commander?: string
      bracket?: Bracket
      isActive?: boolean
    }) => {
      // Get current deck data to maintain existing values
      const cachedDeck = queryClient.getQueryData<Deck>([
        "deck",
        playerId,
        deckId,
      ])

      // If cached data is available, use it; otherwise, fetch current deck
      if (cachedDeck) {
        return PlayersApi.updateDeck(playerId, deckId, {
          name: request.name ?? cachedDeck.name,
          commander: request.commander ?? cachedDeck.commander,
          bracket: request.bracket ?? cachedDeck.bracket,
          isActive: request.isActive ?? cachedDeck.isActive,
        })
      } else {
        // First fetch the current deck data, then update it.
        return PlayersApi.getDeckById(playerId, deckId).then((currentDeck) => {
          return PlayersApi.updateDeck(playerId, deckId, {
            name: request.name ?? currentDeck.name,
            commander: request.commander ?? currentDeck.commander,
            bracket: request.bracket ?? currentDeck.bracket,
            isActive: request.isActive ?? currentDeck.isActive,
          })
        })
      }
    },
    onSuccess: () => {
      // Invalidate relevant queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["player", playerId] })
      queryClient.invalidateQueries({ queryKey: ["deck", playerId, deckId] })
    },
  })

  const deleteDeckMutation = useMutation({
    mutationFn: () => PlayersApi.deleteDeck(playerId, deckId),
    onSuccess: () => {
      // Invalidate player queries to refresh deck list, and invalidate the deck query so we don't get a deck that doesn't exist.
      queryClient.invalidateQueries({ queryKey: ["player", playerId] })
      queryClient.invalidateQueries({ queryKey: ["deck", playerId, deckId] })
    },
  })

  const toggleIsActive = (isActive: boolean) => {
    return updateDeckMutation.mutate({ isActive })
  }

  const deleteDeck = () => {
    return deleteDeckMutation.mutate()
  }

  const updateName = (name: string) => {
    return updateDeckMutation.mutate({ name })
  }

  const updateBracket = (bracket: Bracket) => {
    return updateDeckMutation.mutate({ bracket })
  }

  const updateCommander = (commander: string) => {
    return updateDeckMutation.mutate({ commander })
  }

  return {
    toggleIsActive,
    deleteDeck,
    updateName,
    updateBracket,
    updateCommander,
    updateDeckMutation,
    // Expose mutation states for UI feedback
    isUpdating: updateDeckMutation.isPending,
    isDeleting: deleteDeckMutation.isPending,
    updateError: updateDeckMutation.error,
    deleteError: deleteDeckMutation.error,
  }
}
