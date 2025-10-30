import { Link, createFileRoute } from "@tanstack/react-router"
import { DeletePlayerModal } from "./-compopnents/DeletePlayerModal"
import { DeckCard } from "./-compopnents/DeckCard"
import type { GetPlayerResponse } from "@/api/player"
import { PlayersApi } from "@/api/player"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout"
import { Title } from "@/components/ui/title"

export const Route = createFileRoute("/player/$id/")({
  component: () => (
    <Layout title={`Player Details`}>
      <RouteComponent />
    </Layout>
  ),
  parseParams: ({ id }) => ({ id: String(id) }),
  loader: async ({ params }): Promise<GetPlayerResponse> => {
    const playerId = params.id
    if (!playerId) {
      throw new Error("Player ID is required")
    }
    return await PlayersApi.getPlayerById(playerId)
  },
})

function RouteComponent() {
  const player: GetPlayerResponse = Route.useLoaderData()

  const playerHasDecks = player.decks.length > 0
  return (
    <div className="flex flex-col gap-4">
      <Title tag="h2"> Decks </Title>
      <Link to={"/player/$id/deck"} params={{ id: player.id }}>
        <Button className="self-start"> Add deck (WIP)</Button>
      </Link>
      <div className="flex flex-col gap-2">
        {playerHasDecks &&
          player.decks.map((deck, index) => (
            <DeckCard
              key={index}
              deckId={deck.id}
              name={deck.name}
              bracket={deck.bracket}
              isActive={deck.isActive}
              playerId={player.id}
            />
          ))}
        {!playerHasDecks && (
          <p className="text-gray-500">No decks available for this player.</p>
        )}
      </div>
      <Title tag="h2"> Options </Title>
      <DeletePlayerModal playerId={player.id} />
    </div>
  )
}
