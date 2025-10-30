import { EditIcon } from "./EditIcon"

type DeckCardProps = {
  playerId: string
  deckId: string
  name: string
  bracket: string
  isActive: boolean
}

export const DeckCard = ({
  playerId,
  deckId,
  name,
  bracket,
}: DeckCardProps) => {
  // const [isChecked, setIsChecked] = useState(isActive)
  return (
    <div className="p-2 border rounded md:w-1/3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p>Bracket: {bracket}</p>
        </div>
        <div className="flex items-center gap-8 px-4">
          <EditIcon playerId={playerId} deckId={deckId} />
          {/* <Switch
            checked={isChecked}
            onCheckedChange={(checked) => {
              setIsChecked(checked)
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}
