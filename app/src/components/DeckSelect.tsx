import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import type { Deck } from "@/api/player"

type BracketSelectProps = {
  decks: Array<Deck>

  onSelect: (deckId: string) => void
}

const BracketSelect = ({ decks, onSelect }: BracketSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={decks[0]?.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a deck:</SelectLabel>
          {decks.map((deck: Deck) => (
            <SelectItem key={deck.id} value={deck.name}>
              {deck.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default BracketSelect
