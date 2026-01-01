import { useEffect, useRef, useState } from "react"

const ONE_SECOND_IN_MS = 1000

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

type TimerProps = {
  startedAt: string
}

export const Timer = ({ startedAt }: TimerProps) => {
  const startedAtRef = useRef<number>(new Date(startedAt).getTime())

  const [displayTime, setDisplayTime] = useState<number>(
    Date.now() - startedAtRef.current,
  )
  useEffect(() => {
    const id = setInterval(() => {
      setDisplayTime(Date.now() - startedAtRef.current)
    }, ONE_SECOND_IN_MS)

    // Important to clear the interval when unmounting.
    return () => clearInterval(id)
  }, [])

  const hours = Math.floor(displayTime / HOUR)
  const minutes = Math.floor((displayTime / MINUTE) % 60)
  const seconds = Math.floor((displayTime / SECOND) % 60)

  return (
    <div>
      {formatTime(hours) +
        ":" +
        formatTime(minutes) +
        ":" +
        formatTime(seconds)}
    </div>
  )
}

const formatTime = (time: number): string => {
  if (time == 0) {
    return "00"
  }
  if (time < 9) {
    return "0" + time
  }
  return time.toString()
}
