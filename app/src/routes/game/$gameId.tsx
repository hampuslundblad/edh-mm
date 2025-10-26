import { createFileRoute } from "@tanstack/react-router"
import RoundCounter from "./-components/RoundCounter"

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <RoundCounter />
    </div>
  )
}
