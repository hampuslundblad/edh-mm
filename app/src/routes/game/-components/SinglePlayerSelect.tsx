import type { GamePlayerResponse } from "@/api/game"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SinglePlayerSelectProps = {
  players: Array<GamePlayerResponse>

  onSelect: (playerId: string) => void
}

const SinglePlayerSelect = ({ players, onSelect }: SinglePlayerSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a player:</SelectLabel>
          {players.map((player: GamePlayerResponse) => (
            <SelectItem key={player.playerId} value={player.playerId}>
              {player.playerName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SinglePlayerSelect
