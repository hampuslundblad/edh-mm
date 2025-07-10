import { Link, createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { SquarePenIcon } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import type { GetPlayerResponse } from "@/api/player"
import { PlayersApi } from "@/api/player"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDeletePlayer } from "@/hooks/useDeletePlayer"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/player/$id/")({
  component: () => (
    <Layout>
      <RouteComponent />
    </Layout>
  ),
  parseParams: ({ id }) => ({ id: String(id) }),
  loader: async ({ params }): Promise<GetPlayerResponse> => {
    // Simulate fetching player data based on the ID
    const playerId = params.id
    if (!playerId) {
      throw new Error("Player ID is required")
    }
    return await PlayersApi.getPlayerById(playerId)
  },
})

function RouteComponent() {
  const player: GetPlayerResponse = Route.useLoaderData()
  const playerHasDecks = player.decks.length > 0
  return (
    <div className="flex flex-col gap-4 p-2">
      Hello "{player.name}!"
      <DeletePlayerModal playerId={player.id} />
      <h1> Decks </h1>
      <Link to={"/player/$id/deck"} params={{ id: player.id }}>
        <Button className="self-start"> Add deck (WIP)</Button>
      </Link>
      <div className="flex flex-col gap-2">
        {playerHasDecks &&
          player.decks.map((deck, index) => (
            <DeckCard
              key={index}
              name={deck.name}
              bracket={deck.bracket}
              isActive={deck.isActive}
              playerId={player.id}
            />
          ))}
        {!playerHasDecks && (
          <p className="text-gray-500">No decks available for this player.</p>
        )}
      </div>
    </div>
  )
}

type DeckCardProps = {
  playerId: string
  name: string
  bracket: string
  isActive: boolean
}

const DeckCard = ({ playerId, name, bracket, isActive }: DeckCardProps) => {
  const [isChecked, setIsChecked] = useState(isActive)
  return (
    <div className="p-2 border rounded md:w-1/3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p>Bracket: {bracket}</p>
        </div>
        <div className="flex items-center gap-8">
          <EditIcon playerId={playerId} deckId={"1337"} />
          <Switch
            checked={isChecked}
            onCheckedChange={(checked) => {
              setIsChecked(checked)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const EditIcon = ({
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

const DeletePlayerModal = ({ playerId }: { playerId: string }) => {
  const deletePlayerMutation = useDeletePlayer()
  const [modalOpen, setModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate({ from: "/player/$id" })

  useEffect(() => {
    if (deletePlayerMutation.isSuccess) {
      toast.success("Player deleted successfully!")
      setModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ["all-players"] })
      navigate({
        to: "/players",
        replace: true,
      })
    }
  }, [deletePlayerMutation.isSuccess])

  useEffect(() => {
    if (deletePlayerMutation.isError) {
      toast.error(
        "Failed to delete player - " + deletePlayerMutation.error.message,
      )
    }
  }, [deletePlayerMutation.isError])

  return (
    <div className="p-2">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger>
          <Button variant={"destructive"}>Delete player</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Player</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this player?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              disabled={deletePlayerMutation.isPending}
              variant={"destructive"}
              onClick={() => {
                deletePlayerMutation.mutate(playerId)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
