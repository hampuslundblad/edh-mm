import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const RoundCounter = () => {
  const [roundCount, setRoundCount] = useState(1)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4 mt-16">
        <p className="text-5xl mx-auto">{roundCount}</p>
        <div className="flex gap-8">
          <button onClick={() => setRoundCount(roundCount + 1)}>
            <PlusIcon width={96} height={96} />
          </button>
          <button onClick={() => setRoundCount(roundCount - 1)}>
            <MinusIcon width={96} height={96} />
          </button>
        </div>
        <Button className="mt-16"> End game</Button>
      </div>
    </div>
  )
}

export default RoundCounter
