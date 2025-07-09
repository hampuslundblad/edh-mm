import { Link, createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import type { AddDeckToPlayerRequest } from "@/api/player"
import BracketSelect from "@/components/BracketSelect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bracket } from "@/utils/decks"
import { useAddDeck } from "@/hooks/useAddDeck"

export const Route = createFileRoute("/player/$id/deck")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const addDeckMutation = useAddDeck()

  const navigate = useNavigate({ from: "/player/$id/deck" })

  const [selectedBracket, setSelectedBracket] = useState<Bracket>(Bracket.Two)

  const [addDeckRequest, setAddDeckRequest] = useState<AddDeckToPlayerRequest>({
    playerId: id,
    deckName: "",
    bracket: selectedBracket,
  })

  const handleAddDeck = () => {
    addDeckMutation.mutate(addDeckRequest)
  }

  const isInputValid = addDeckRequest.deckName.length > 1

  useEffect(() => {
    if (addDeckMutation.isSuccess) {
      toast.success("Deck added successfully")
      navigate({ to: "/player/$id", params: { id } })
    }
    if (addDeckMutation.isError) {
      toast.error(`Failed to add deck - ${addDeckMutation.error.message}`)
    }
  }, [addDeckMutation.isSuccess, addDeckMutation.isError])

  return (
    <div className="flex flex-col gap-4 p-2 items-center">
      <Link to={".."}>
        <span className="flex items-center gap-2 text-md text-muted-foreground">
          <ArrowLeft /> Back
        </span>
      </Link>
      <h2> Create deck </h2>
      <div className="flex flex-col gap-2">
        <Label>Deck Name</Label>
        <Input
          className="self-start"
          value={addDeckRequest.deckName}
          onChange={(e) =>
            setAddDeckRequest((prev) => ({
              ...prev,
              deckName: e.target.value,
            }))
          }
        />
        <Label>Bracket</Label>
        <BracketSelect
          selectedBracket={selectedBracket}
          onSelect={setSelectedBracket}
        />
        <Button
          disabled={!isInputValid}
          onClick={handleAddDeck}
          className="self-start mt-4"
        >
          Create Deck
        </Button>
      </div>
    </div>
  )
}
