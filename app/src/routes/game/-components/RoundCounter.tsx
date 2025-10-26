import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGameMutations } from "@/hooks/useGame"

const RoundCounter = ({ gameId }: { gameId: string }) => {
  const [roundCount, setRoundCount] = useState(1)

  const { nextRoundMutation } = useGameMutations()

  const handleRoundChange = (newRound: number) => {
    if (newRound < 1) return
    nextRoundMutation.mutate(gameId)
    setRoundCount(newRound)
  }

  return (
    <div className="flex flex-col items-center gap-4">
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
        <Button className="mt-16"> End game</Button>
      </div>
    </div>
  )
}

export default RoundCounter
