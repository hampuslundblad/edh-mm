import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Bracket } from "@/utils/decks"

type BracketSelectProps = {
  selectedBracket: Bracket
  onSelect: (bracket: Bracket) => void
}

const BracketSelect = ({ selectedBracket, onSelect }: BracketSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedBracket} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a bracket:</SelectLabel>
          <SelectItem value={Bracket.Two}>Bracket 2</SelectItem>
          <SelectItem value={Bracket.Three}>Bracket 3</SelectItem>
          <SelectItem value={Bracket.ThreePlus}>Bracket 3+</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default BracketSelect
