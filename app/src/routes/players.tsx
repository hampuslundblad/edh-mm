import { Link, createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAllPlayers } from "@/hooks/useAllPlayers"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import InputWithButton from "@/components/InputWithButton"
import { useCreatePlayer } from "@/hooks/useCreatePlayer"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/players")({
  component: () => (
    <Layout>
      <App />
    </Layout>
  ),
})

function App() {
  const { data, isLoading, isError, isSuccess } = useAllPlayers()

  if (isLoading) {
    return <div className="p-2">Loading...</div>
  }
  if (isError) {
    return <div className="p-2">Error loading players</div>
  }

  if (isSuccess) {
    return (
      <div className="">
        <CreatePlayerModal />
        <div className="flex flex-col gap-4">
          {data.players.map((player) => (
            <PlayerLink name={player.name} id={player.id} key={player.id} />
          ))}
        </div>
      </div>
    )
  }
  return <div className="p-2">No players found</div>
}
const PlayerLink = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link
      className="self-start"
      to="/player/$id"
      params={{ id }}
      preload={false}
    >
      <div className="rounded-lg shadow p-4 border hover:bg-orange-500 border-gray-200 min-w-[250px] min-h-[100px]">
        <span className="text-lg font-semibold text-white">{name}</span>
      </div>
    </Link>
  )
}
const CreatePlayerModal = () => {
  const createPlayerMutation = useCreatePlayer()
  const [modalOpen, setModalOpen] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (createPlayerMutation.isSuccess) {
      toast.success("Player created successfully!")
      queryClient.invalidateQueries({ queryKey: ["all-players"] })
      setModalOpen(false)
    }
  }, [createPlayerMutation.isSuccess])

  useEffect(() => {
    if (createPlayerMutation.isError) {
      toast.error(
        "Failed to create player - " + createPlayerMutation.error.message,
      )
    }
  }, [createPlayerMutation.isError])

  return (
    <div className="p-2">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger>
          <Button>Create Player</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Player</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Enter the name of the player you want to create.
          </DialogDescription>
          <InputWithButton
            isLoading={createPlayerMutation.isPending}
            id={"create-player-name"}
            label={"Create"}
            buttonLabel={"Create"}
            onClick={(value) => createPlayerMutation.mutate(value)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
