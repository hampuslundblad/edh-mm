import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import type { Player } from "@/api/player"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const PlayerLink = ({
  player,
}: {
  player: Pick<Player, "id" | "name" | "decks">
}) => {
  return (
    <Link
      className="self-start"
      to="/player/$id"
      params={{ id: player.id }}
      preload={false}
    >
      <Card className="w-80 lg:md:w-sm border-solid border-t-2 border-highlight ">
        <CardHeader>
          <CardTitle>{player.name}</CardTitle>
          <CardDescription>
            Has {player.decks.length}{" "}
            {player.decks.length === 1 ? "deck" : "decks"}
          </CardDescription>
          <CardAction>
            <ArrowRight />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  )
}
