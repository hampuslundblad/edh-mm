import { createFileRoute } from "@tanstack/react-router"
import { PlayerLink } from "./-components/PlayerLink"
import { CreatePlayerModal } from "./-components/CreatePlayerModal"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import Layout from "@/components/Layout"
import { Title } from "@/components/ui/title"

export const Route = createFileRoute("/players/")({
  component: () => (
    <Layout>
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
      <Layout>
        <Title variant="xxl"> Players </Title>
        <div className="flex flex-wrap gap-4 mt-8">
          {data.players.map((player) => (
            <PlayerLink player={player} key={player.id} />
          ))}
        </div>
        <CreatePlayerModal />
      </Layout>
    )
  }
  return <div className="p-2">No players found</div>
}
