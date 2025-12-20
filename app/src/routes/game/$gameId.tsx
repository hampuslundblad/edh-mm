import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useState } from "react"
import RoundCounter from "./-components/RoundCounter"
import SinglePlayerSelect from "./-components/SinglePlayerSelect"
import { Button } from "@/components/ui/button"
import { useGameMutations } from "@/hooks/game/useGameMutations"
import { useGameById } from "@/hooks/game/useGameById"

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameId } = useParams({ from: "/game/$gameId" })

  const navigate = useNavigate()
  const [showGameEndScreen, setShowGameEndScreen] = useState(false)

  const { finishGameMutation } = useGameMutations()

  const [selectedWinningPlayerId, setSelectedPlayerId] = useState<string>("")

  const {
    data: gameData,
    isLoading: isGameDataLoading,
    isError: isGameDataError,
  } = useGameById(gameId)

  const handleEndGame = () => {
    finishGameMutation.mutate({
      gameId,
      request: { winnerPlayerId: selectedWinningPlayerId },
    })
    navigate({ to: "/game/past" })
  }

  const handlePickWinner = () => {
    setShowGameEndScreen(true)
  }
  console.log(gameData)
  const onSelectWinner = (playerId: string) => {
    console.log(`Winning player ID: ${playerId}`)
    setSelectedPlayerId(playerId)
  }

  if (showGameEndScreen) {
    return (
      <div className="flex flex-col items-center gap-4 ">
        <p> Who won? </p>
        <SinglePlayerSelect
          players={gameData?.players ?? []}
          onSelect={onSelectWinner}
        />
        <div className="flex gap-8">
          <Button onClick={handleEndGame}> End game</Button>
          <Button variant="ghost" onClick={() => setShowGameEndScreen(false)}>
            Back
          </Button>
        </div>
      </div>
    )
  }

  if (isGameDataLoading || !gameData) {
    return <div>Loading game data...</div>
  }
  if (isGameDataError) {
    return <div>Error loading game data.</div>
  }

  return (
    <div className="flex flex-col items-center gap-4 ">
      <RoundCounter gameId={gameId} initialRound={gameData.currentRound} />
      <Button size={"lg"} className="mt-16" onClick={handlePickWinner}>
        Go to pick winner
      </Button>
    </div>
  )
}
