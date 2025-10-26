import { createFileRoute, useParams } from "@tanstack/react-router"
import RoundCounter from "./-components/RoundCounter"

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameId } = useParams({ from: "/game/$gameId" })

  return (
    <div>
      <RoundCounter gameId={gameId} />
    </div>
  )
}
