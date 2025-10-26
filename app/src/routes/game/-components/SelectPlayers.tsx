import type { Player } from "@/api/player"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"

export type SelectPlayerProps = {
  players: Array<Player>
  onPlayerSelect: (selectedPlayerIds: Array<Player>) => void
}

export function SelectPlayers({ players, onPlayerSelect }: SelectPlayerProps) {
  const onChange = (values: Array<string>) => {
    const selectedPlayers = players.filter((player) =>
      values.includes(player.id),
    )
    onPlayerSelect(selectedPlayers)
  }

  return (
    <MultiSelect onValuesChange={onChange}>
      <MultiSelectTrigger className="w-full max-w-[400px]">
        <MultiSelectValue placeholder="Select players..." />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          {players.map((player) => (
            <MultiSelectItem key={player.id} value={player.id}>
              {player.name}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  )
}
