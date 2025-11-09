import { Link } from "@tanstack/react-router"
import { SquarePenIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const EditIconLink = ({
  playerId,
  deckId,
}: {
  playerId: string
  deckId: string
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          from="/player/$id"
          to={"/player/$id/edit/$deckId"}
          params={{ id: playerId, deckId: deckId }}
        >
          <SquarePenIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>Edit Deck</TooltipContent>
    </Tooltip>
  )
}
