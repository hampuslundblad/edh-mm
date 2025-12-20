import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import InputWithButton from "@/components/InputWithButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreatePlayer } from "@/hooks/player/useCreatePlayer"
import { Button } from "@/components/ui/button"

export const CreatePlayerModal = () => {
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
        <DialogTrigger asChild>
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
