import type { Player } from "@/api/player"
import DeckSelect from "@/components/DeckSelect"
import { Title } from "@/components/ui/title"

type SelectPlayerDeckProps = {
  players: Array<Player>
}

const SelectPlayerDeck = ({ players }: SelectPlayerDeckProps) => {
  return (
    <div className="flex flex-col gap-4">
      {players.map((player) => (
        <div>
          <Title variant="s"> Välj lek för {player.name} </Title>
          <DeckSelect
            decks={player.decks}
            onSelect={(deckId: string) => {
              console.log(`Selected deck for ${player.name}: ${deckId}`)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default SelectPlayerDeck
