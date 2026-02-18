import type { Player } from "@/api/player"
import DeckSelect from "@/components/DeckSelect"
import { Title } from "@/components/ui/title"
import { Button } from "@/components/ui/button"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"

const TURN_ORDER_LABELS = ["1st", "2nd", "3rd", "4th", "5th", "6th"]

type SelectPlayerDeckProps = {
  players: Array<Player>
  onDeckSelect: ({
    playerId,
    deckId,
  }: {
    playerId: string
    deckId: string
  }) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
}

const SelectPlayerDeck = ({
  players,
  onDeckSelect,
  onMoveUp,
  onMoveDown,
}: SelectPlayerDeckProps) => {
  return (
    <div className="flex flex-col gap-4">
      {players.map((player, index) => (
        <div key={player.id} className="flex items-center gap-3">
          {/* Turn order controls */}
          <div className="flex flex-col gap-1 shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={index === 0}
              onClick={() => onMoveUp(index)}
              aria-label={`Move ${player.name} up`}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={index === players.length - 1}
              onClick={() => onMoveDown(index)}
              aria-label={`Move ${player.name} down`}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Player info + deck select */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <Title variant="s">
              <span className="text-muted-foreground text-xs mr-2">
                {TURN_ORDER_LABELS[index] ?? `${index + 1}th`}
              </span>
              {player.name}
            </Title>
            <DeckSelect
              decks={player.decks}
              onSelect={(deckId: string) =>
                onDeckSelect({ playerId: player.id, deckId })
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelectPlayerDeck

