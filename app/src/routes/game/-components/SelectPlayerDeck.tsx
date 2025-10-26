import type { Player } from "@/api/player"
import DeckSelect from "@/components/DeckSelect"
import { Title } from "@/components/ui/title"

type SelectPlayerDeckProps = {
  players: Array<Player>
  onDeckSelect: ({
    playerId,
    deckId,
  }: {
    playerId: string
    deckId: string
  }) => void
}

const SelectPlayerDeck = ({ players, onDeckSelect }: SelectPlayerDeckProps) => {
  return (
    <div className="flex flex-col gap-4">
      {players.map((player) => (
        <div>
          <Title variant="s"> Välj lek för {player.name} </Title>
          <DeckSelect
            key={player.id}
            decks={player.decks}
            onSelect={(deckId: string) => {
              onDeckSelect({ playerId: player.id, deckId })
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default SelectPlayerDeck
