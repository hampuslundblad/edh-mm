import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { ChevronsUpDown } from "lucide-react"
import { numbersOfDecksWithinBracket } from "@/utils/players"
import { Button } from "@/components/ui/button"
import { Bracket } from "@/utils/decks"
import { Switch } from "@/components/ui/switch"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import BracketSelect from "@/components/BracketSelect"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/")({
  component: () => (
    <Layout>
      <RouteComponent />
    </Layout>
  ),
})

function RouteComponent() {
  const allPlayersQuery = useAllPlayers()
  const players = allPlayersQuery.data?.players ?? []

  const [selectedBracket, setSelectedBracket] = useState<Bracket>(Bracket.Two)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [chosenDecks, setChosenDecks] = useState<
    Array<{ player: string; deck: string }>
  >([])

  // Use useState instead of useRef for rules
  const [rules, setRules] = useState({
    combineBracket2And3: false,
    combineBracket3And3Plus: false,
    disableBracketRestrictions: false,
  })

  function handleCreateGame() {
    if (players.length === 0) {
      // Handle no players case
      return {
        player: "No players available",
        deck: "No decks available",
      }
    }

    const decks = players.map((player) => {
      // Filter decks for the selected bracket

      const bracketDecks = player.decks.filter((deck) => {
        return deck.bracket === selectedBracket
      })

      // Pick a random deck from the filtered list
      const chosen =
        bracketDecks[Math.floor(Math.random() * bracketDecks.length)]

      return {
        player: player.name,
        deck: chosen.name,
      }
    })
    setChosenDecks(decks)
  }

  if (allPlayersQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  if (allPlayersQuery.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading players {allPlayersQuery.error.message}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col m-auto gap-4 p-2">
        <h1 className="text-2xl font-semibold mb-4">Create Game</h1>

        <Collapsible
          onOpenChange={setIsSettingsOpen}
          open={isSettingsOpen}
          className="flex w-[350px] flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-4 px-4">
            <h4 className="text-sm font-semibold">Settings</h4>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
                <span className="sr-only">Settings</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              <p> Kombinera bracket 2 och 3?</p>{" "}
              <Switch
                checked={rules.combineBracket2And3}
                onCheckedChange={(checked) =>
                  setRules((prev) => ({
                    ...prev,
                    combineBracket2And3: checked,
                  }))
                }
              />
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              <p> Kombinera bracket 3 och 3+?</p>{" "}
              <Switch
                checked={rules.combineBracket3And3Plus}
                onCheckedChange={(checked) =>
                  setRules((prev) => ({
                    ...prev,
                    combineBracket3And3Plus: checked,
                  }))
                }
              />
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              <p> Stäng av bracket restriktioner</p>{" "}
              <Switch
                checked={rules.disableBracketRestrictions}
                onCheckedChange={(checked) =>
                  setRules((prev) => ({
                    ...prev,
                    disableBracketRestrictions: checked,
                  }))
                }
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <BracketSelect
          selectedBracket={selectedBracket}
          onSelect={setSelectedBracket}
        />
        <Button className="self-start" size="lg" onClick={handleCreateGame}>
          Create Game
        </Button>
      </div>

      {chosenDecks.length > 0 && (
        <ul className="mt-6 w-full max-w-md bg-neutral-800 rounded-lg shadow p-4 space-y-3">
          {chosenDecks.map((entry) => (
            <li
              key={entry.player}
              className="flex justify-between items-center px-3 py-2 bg-neutral-500 rounded"
            >
              <span className="font-medium">
                {entry.player} (
                {numbersOfDecksWithinBracket(
                  entry.player,
                  selectedBracket,
                  players,
                )}
                )
              </span>
              <span className="">{entry.deck}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
