import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface InputWithButtonProps {
  id: string
  label: string
  buttonLabel?: string
  onClick: (value: string) => void
  isLoading?: boolean
}

const InputWithButton = ({
  id,
  label,
  onClick,
  buttonLabel = "Search",
  isLoading = false,
}: InputWithButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)

  const handleSearch = () => {
    if (!inputRef.current?.value) {
      setShowError(true)
    } else {
      onClick(inputRef.current.value)
    }
  }

  const handleClick = () => {
    handleSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-96">
        <Label htmlFor={id}> {label} </Label>
        <div className="flex gap-2">
          <Input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            id={id}
            disabled={isLoading}
          />
          <Button onClick={handleClick}>{buttonLabel}</Button>
        </div>
        {showError && <Label> This field cannot be empty</Label>}
      </div>
    </>
  )
}

export default InputWithButton
