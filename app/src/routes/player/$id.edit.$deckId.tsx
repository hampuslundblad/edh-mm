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
import { useUpdateDeck } from "@/hooks/deck/useUpdateDeck"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

      <Card className="lg:md:w-1/2">
        <CardHeader>
          <CardTitle>Edit Deck</CardTitle>
          <CardDescription>
            Make changes to your deck and click "Save" to update.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <Label className="mb-4">Deck Name</Label>
            <Input
              className="lg:md:w-1/4 self-start"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-4">Bracket</Label>
            <BracketSelect
              selectedBracket={selectedBracket}
              onSelect={setSelectedBracket}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button className="self-start" onClick={handleSave}>
            Save
          </Button>
          <Button variant={"destructive"}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
