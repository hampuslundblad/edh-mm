import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { usePlayers } from "@/contexts/playersContext"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const { players } = usePlayers()
  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
        {players.map((player) => (
          <PlayerLink key={player.id} id={player.id} name={player.name} />
        ))}
      </div>
    </div>
  )
}
const PlayerLink = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link to="/player/$id" params={{ id }}>
      <Button variant="outline" className="">
        {name}
      </Button>
    </Link>
  )
}
