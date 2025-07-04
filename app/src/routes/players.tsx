import { Link, createFileRoute } from "@tanstack/react-router"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/players")({
  component: App,
})

function App() {
  const { data, isLoading, isError, isSuccess } = useAllPlayers()

  if (isLoading) {
    return <div className="p-2">Loading...</div>
  }
  if (isError) {
    return <div className="p-2">Error loading players</div>
  }

  if (isSuccess) {
    return (
      <div className="p-2">
        <div className="flex flex-col gap-4">
          {data.players.map((player) => (
            <PlayerLink name={player.name} id={player.id} key={player.id} />
          ))}
        </div>
      </div>
    )
  }
  return <div className="p-2">No players found</div>
}
const PlayerLink = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link to="/player/$id" params={{ id }} preload={false}>
      <Button variant="outline" className="">
        {name}
      </Button>
    </Link>
  )
}
