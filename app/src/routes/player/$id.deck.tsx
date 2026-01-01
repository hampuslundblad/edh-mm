import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import BracketSelect from "@/components/BracketSelect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bracket } from "@/utils/decks"
import { addDeckToPlayerOptions } from "@/hooks/deck/useAddDeck"
import Back from "@/components/Back"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/player/$id/deck")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const queryClient = useQueryClient()

  const addDeckMutation = useMutation(addDeckToPlayerOptions)

  const navigate = useNavigate({ from: "/player/$id/deck" })

  const [selectedBracket, setSelectedBracket] = useState<Bracket>(Bracket.Two)

  const [deckName, setDeckName] = useState("")

  const handleAddDeck = () => {
    addDeckMutation.mutate({ playerId: id, deckName, bracket: selectedBracket })
  }

  const isInputValid = deckName.length > 1

  useEffect(() => {
    if (addDeckMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["all-players"] })
      toast.success("Deck added successfully")
      navigate({ to: "/player/$id", params: { id } })
    }
    if (addDeckMutation.isError) {
      toast.error(`Failed to add deck - ${addDeckMutation.error.message}`)
    }
  }, [addDeckMutation.isSuccess, addDeckMutation.isError])

  return (
    <Layout>
      <div className="lg:md:w-1/2 mt-4 flex flex-col gap-6">
        <Back />
        <Card className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle>Create a new deck</CardTitle>
          </CardHeader>
          <CardContent className="mt-8 flex flex-col gap-6">
            <div>
              <Label className="mb-4">Deck Name</Label>
              <Input
                className="w-1/3 self-start"
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
          <CardFooter>
            <Button
              disabled={!isInputValid}
              onClick={handleAddDeck}
              className="self-start mt-4"
            >
              Create Deck
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
