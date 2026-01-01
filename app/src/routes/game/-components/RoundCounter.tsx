import { MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useGameMutations } from "@/hooks/game/useGameMutations"

type RoundCounterProps = {
  gameId: string
  initialRound: number
}

const RoundCounter = ({ gameId, initialRound }: RoundCounterProps) => {
  const [roundCount, setRoundCount] = useState(initialRound)

  const { updateRoundMutation } = useGameMutations()

  useEffect(() => {
    if (updateRoundMutation.isError) {
      toast.error("Unable to update round")
    }
  }, [updateRoundMutation.isError, updateRoundMutation.isSuccess])

  const handleRoundChange = (newRound: number) => {
    if (newRound < 1) return
    setRoundCount(newRound)
    updateRoundMutation.mutate({ gameId, newRound })
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <p className="text-5xl mx-auto">{roundCount}</p>
      <div className="flex gap-8 mt-8">
        <button
          className="border-2 rounded-lg"
          onClick={() => handleRoundChange(roundCount + 1)}
        >
          <PlusIcon width={96} height={96} />
        </button>
        <button
          className="border-2 rounded-lg"
          onClick={() => handleRoundChange(roundCount - 1)}
        >
          <MinusIcon width={96} height={96} />
        </button>
      </div>
    </div>
  )
}

export default RoundCounter
