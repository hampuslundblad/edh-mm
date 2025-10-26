import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { SelectPlayers } from "./-components/SelectPlayers"
import SelectPlayerDeck from "./-components/SelectPlayerDeck"
import type { Player } from "@/api/player"
import Layout from "@/components/Layout"
import { Title } from "@/components/ui/title"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: players,
    isLoading: isPlayersLoading,
    isError: isPlayersError,
    error: playersError,
  } = useAllPlayers()

  const [selectedPlayers, setSelectedPlayers] = useState<Array<Player>>([])

  if (isPlayersLoading) {
    return <Skeleton className="h-10 w-full max-w-[400px]" />
  }
  if (isPlayersError) {
    return <div>Error loading players: {playersError.message}</div>
  }

  return (
    <Layout>
      <Title variant="xxl">Nytt spel 2</Title>
      {/** Select players */}
      <div className="flex flex-col gap-4 mt-8">
        <p> Choose players </p>
        <SelectPlayers
          players={players?.players || []}
          onPlayerSelect={setSelectedPlayers}
        />
      </div>
      {/** Select player deck */}
      <div className="mt-8 mb-8">
        <SelectPlayerDeck players={selectedPlayers} />
      </div>
      <Button> Start game! </Button>
    </Layout>
  )
}
