import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Bracket } from "@/utils/decks"
import Layout from "@/components/Layout"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import BracketSelect from "@/components/BracketSelect"
import { Button } from "@/components/ui/button"

import { queryClient } from "@/queryClient"
import { PlayersApi } from "@/api/player"
import Back from "@/components/Back"
import { useUpdateDeck } from "@/hooks/useUpdateDeck"

const deckQueryOptions = (id: string, playerId: string) =>
  queryOptions({
    queryKey: ["deck", id, playerId],
    queryFn: () => PlayersApi.getDeckById(playerId, id),
  })

export const Route = createFileRoute("/player/$id/edit/$deckId")({
  component: () => (
    <Layout>
      <RouteComponent />
    </Layout>
  ),
  loader: ({ params }) => {
    queryClient.ensureQueryData(deckQueryOptions(params.deckId, params.id))
  },
})

function RouteComponent() {
  const { id, deckId } = Route.useParams()
  const { data: deck } = useSuspenseQuery(deckQueryOptions(deckId, id))

  const { updateDeckMutation } = useUpdateDeck(id, deckId)

  const [deckName, setDeckName] = useState(deck.name)
  const [selectedBracket, setSelectedBracket] = useState<Bracket>(deck.bracket)

  const navigate = useNavigate({ from: `/player/$id/edit/$deckId` })

  useEffect(() => {
    if (updateDeckMutation.isSuccess) {
      toast.success("Deck updated successfully")
      navigate({ to: `/player/${id}` })
    }
    if (updateDeckMutation.isError) {
      toast.error(`Failed to update deck - ${updateDeckMutation.error.message}`)
    }
  }, [updateDeckMutation.isSuccess, updateDeckMutation.isError])

  const handleSave = () => {
    updateDeckMutation.mutate({
      name: deckName,
      bracket: selectedBracket,
    })
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      <Back to={`/player/${id}`} />
      <Label>Deck Name</Label>
      <Input
        className="w-1/5 self-start"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <Label>Bracket</Label>
      <BracketSelect
        selectedBracket={selectedBracket}
        onSelect={setSelectedBracket}
      />
      <Button className="self-start" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}
