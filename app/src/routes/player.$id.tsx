import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { PlayersApi } from "@/api/player"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

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
  const playerHasDecks = player.decks.length > 0
  return (
    <div className="flex flex-col gap-4 p-2">
      Hello "{player.name}!"
      <h1> Decks </h1>
      <Button className="self-start"> Add deck</Button>
      <div className="flex flex-col gap-2">
        {playerHasDecks &&
          player.decks.map((deck, index) => (
            <DeckCard
              key={index}
              name={deck.name}
              bracket={deck.bracket}
              isActive={deck.isActive}
            />
          ))}
        {!playerHasDecks && (
          <p className="text-gray-500">No decks available for this player.</p>
        )}
      </div>
    </div>
  )
}

type DeckCardProps = {
  name: string
  bracket: string
  isActive: boolean
}

const DeckCard = ({ name, bracket, isActive }: DeckCardProps) => {
  const [isChecked, setIsChecked] = useState(isActive)
  return (
    <div className="p-2 border rounded md:w-1/3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p>Bracket: {bracket}</p>
        </div>
        <Switch
          checked={isChecked}
          onCheckedChange={(checked) => {
            setIsChecked(checked)
          }}
        />
      </div>
    </div>
  )
}
