import { EditIconLink } from "./EditIcon"
import type { Deck } from "@/api/player"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DeckCardProps = Pick<Deck, "id" | "name" | "bracket" | "isActive"> & {
  playerId: string
}

export const DeckCard = ({ playerId, id, name, bracket }: DeckCardProps) => {
  return (
    <Card className="lg:md:w-1/4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Bracket: {bracket}</CardDescription>
        <CardAction>
          <EditIconLink playerId={playerId} deckId={id} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
