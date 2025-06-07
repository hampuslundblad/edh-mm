import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { ChevronsUpDown } from "lucide-react"
import { initalPlayers, numbersOfDecksWithinBracket } from "@/utils/players"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bracket } from "@/utils/decks"
import { Switch } from "@/components/ui/switch"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const Route = createFileRoute("/game")({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedBracket, setSelectedBracket] = useState<Bracket>(Bracket.Two)

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [chosenDecks, setChosenDecks] = useState<
    Array<{ player: string; deck: string }>
  >([])

  function handleCreateGame() {
    const decks = initalPlayers.map((player) => {
      // Filter decks for the selected bracket
      const bracketDecks = player.deck.filter(
        (deck) => deck.bracket === selectedBracket,
      )
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
              <p> Kombinera bracket 2 och 3?</p> <Switch />
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              <p> Kombinera bracket 3 och 3+?</p> <Switch />
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              <p> Stäng av bracket restriktioner</p> <Switch />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Select onValueChange={(value) => setSelectedBracket(value as Bracket)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={"2"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose a bracket:</SelectLabel>
              <SelectItem value="2">Bracket 2</SelectItem>
              <SelectItem value="3">Bracket 3</SelectItem>
              <SelectItem value="3+">Bracket 3+</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
                {numbersOfDecksWithinBracket(entry.player, selectedBracket)})
              </span>
              <span className="">{entry.deck}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
