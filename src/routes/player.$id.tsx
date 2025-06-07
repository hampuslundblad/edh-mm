import { PlayersApi } from "@/api/player"
import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/player/$id")({
  component: RouteComponent,
  parseParams: ({ id }) => ({ id: String(id) }),
  loader: async ({ params }) => {
    // Simulate fetching player data based on the ID
    const playerId = params.id
    if (!playerId) {
      throw new Error("Player ID is required")
    }
    return await PlayersApi.getPlayerById(playerId)
  },
})

function RouteComponent() {
  const player = Route.useLoaderData()
  const playerHasDecks = player?.deck && player.deck.length > 0
  return (
    <div className="flex flex-col gap-4 p-2">
      Hello "{player?.name}!"
      <h1> Decks </h1>
      <Button className="self-start"> Add deck</Button>
      <div className="flex flex-col gap-2">
        {playerHasDecks &&
          player?.deck.map((deck, index) => (
            <div
              key={deck.name + index}
              className="p-2 border rounded md:w-1/3"
            >
              <h2 className="text-lg font-semibold">{deck.name}</h2>
              <p>Bracket: {deck.bracket}</p>
            </div>
          ))}
        {!playerHasDecks && (
          <p className="text-gray-500">No decks available for this player.</p>
        )}
      </div>
    </div>
  )
}
