import { createFileRoute } from "@tanstack/react-router"
import { PlayerLink } from "./-components/PlayerLink"
import { CreatePlayerModal } from "./-components/CreatePlayerModal"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import Layout from "@/components/Layout"
import { Title } from "@/components/ui/title"
import { getHeaderTitle } from "@/utils/meta"

export const Route = createFileRoute("/players/")({
  head: () => getHeaderTitle("Players"),
  component: () => (
    <Layout title="Players">
      <App />
    </Layout>
  ),
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 mt-8">
          {data.players.map((player) => (
            <PlayerLink player={player} key={player.id} />
          ))}
        </div>
        <CreatePlayerModal />
      </div>
    )
  }
  return <div className="p-2">No players found</div>
}
