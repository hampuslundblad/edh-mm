import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { SelectPlayers } from "./-components/SelectPlayers"
import SelectPlayerDeck from "./-components/SelectPlayerDeck"
import type { Player } from "@/api/player"
import Layout from "@/components/Layout"
import { useAllPlayers } from "@/hooks/player/useAllPlayers"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGameMutations } from "@/hooks/game/useGameMutations"

export const Route = createFileRoute("/game/")({
  component: () => (
    <Layout title="Create game">
      <RouteComponent />
    </Layout>
  ),
})

type SelectedPlayerWithDeck = {
  playerId: string
  deckId: string
}

function RouteComponent() {
  const {
    data: players,
    isLoading: isPlayersLoading,
    isError: isPlayersError,
    error: playersError,
  } = useAllPlayers()

  const navigate = useNavigate()

  // selectedPlayers array order = turn order (index 0 = 1st, index 1 = 2nd, etc.)
  const [selectedPlayers, setSelectedPlayers] = useState<Array<Player>>([])

  const [playerDeckSelection, setPlayerDeckSelection] = useState<
    Array<SelectedPlayerWithDeck>
  >([])

  const { createGameMutation } = useGameMutations()

  useEffect(() => {
    if (createGameMutation.isSuccess) {
      navigate({
        to: "/game/$gameId",
        params: { gameId: createGameMutation.data.id },
      })
    }
  }, [createGameMutation.isSuccess])

  useEffect(() => {
    if (createGameMutation.isError) {
      toast.error(`Error creating game: ${createGameMutation.error.message}`)
    }
  }, [createGameMutation.isError])

  const handlePlayerSelect = (players: Array<Player>) => {
    setSelectedPlayers(players)
    // If a player is removed, remove them from playerDeckSelection as well
    setPlayerDeckSelection((prev) =>
      prev.filter((item) =>
        players.some((player) => player.id === item.playerId),
      ),
    )
  }

  const handlePlayerDeckSelect = ({
    playerId,
    deckId,
  }: SelectedPlayerWithDeck) => {
    setPlayerDeckSelection((prev) => {
      const existingIndex = prev.findIndex((item) => item.playerId === playerId)
      if (existingIndex !== -1) {
        // Update existing entry
        const updated = [...prev]
        updated[existingIndex].deckId = deckId
        return updated
      } else {
        // Add new entry
        return [...prev, { playerId, deckId }]
      }
    })
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    setSelectedPlayers((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  const handleMoveDown = (index: number) => {
    setSelectedPlayers((prev) => {
      if (index === prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const handleStartGame = () => {
    const allPlayersHaveDecks = selectedPlayers.every((player) =>
      playerDeckSelection.some((selection) => selection.playerId === player.id),
    )

    if (!allPlayersHaveDecks) {
      toast.error(
        "Please select decks for all players before starting the game.",
      )
      return
    }

    // Derive turn order from position in selectedPlayers array (1-based)
    const playerDeckSelections = selectedPlayers.map((player, index) => {
      const selection = playerDeckSelection.find(
        (s) => s.playerId === player.id,
      )!
      return { playerId: selection.playerId, deckId: selection.deckId, turnOrder: index + 1 }
    })

    createGameMutation.mutate({ playerDeckSelections })
  }

  if (isPlayersLoading) {
    return <Skeleton className="h-10 w-full max-w-[400px]" />
  }
  if (isPlayersError) {
    return <div>Error loading players: {playersError.message}</div>
  }

  return (
    <>
      {/** Select players */}
      <div className="flex flex-col gap-4 mt-8">
        <p> Choose players </p>
        <SelectPlayers
          players={players?.players || []}
          onPlayerSelect={handlePlayerSelect}
        />
      </div>
      {/** Select player deck + turn order */}
      <div className="mt-8 mb-8">
        <SelectPlayerDeck
          players={selectedPlayers}
          onDeckSelect={handlePlayerDeckSelect}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />
      </div>
      {selectedPlayers.length > 0 && playerDeckSelection.length > 0 && (
        <Button onClick={handleStartGame}> Start game! </Button>
      )}
    </>
  )
}

