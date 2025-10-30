import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useDeletePlayer } from "@/hooks/useDeletePlayer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const DeletePlayerModal = ({ playerId }: { playerId: string }) => {
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
    <div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
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
