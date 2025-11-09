import { EditIconLink } from "./EditIcon"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <Card className="lg:md:w-1/4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Bracket: {bracket}</CardDescription>
        <CardAction>
          <EditIconLink playerId={playerId} deckId={deckId} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
