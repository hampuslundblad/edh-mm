import { createFileRoute } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import InputWithButton from "@/components/InputWithButton"
import { PlayersApi } from "@/api/player"

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    mutate: createPlayer,
    error,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (name: string) => PlayersApi.createPlayer(name),
  })

  return (
    <div className="p-2 flex flex-col gap-4 w-1/3">
      {isError && <span>Error creating player: {error.message}</span>}
      <InputWithButton
        isLoading={isPending}
        id="playername"
        label="Playername"
        buttonLabel="Add player"
        onClick={(value) => createPlayer(value)}
      />
    </div>
  )
}
