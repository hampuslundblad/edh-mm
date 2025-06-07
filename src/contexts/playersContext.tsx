import type { Player } from "@/utils/players"
import { initalPlayers } from "@/utils/players"
import React, { createContext, useContext, useReducer } from "react"

interface PlayersContextType {
  players: Player[]
}

interface PlayersDispatchContextType {
  dispatch: React.Dispatch<{ type: string; payload: Player[] }>
}
const PlayersContext = createContext<PlayersContextType | undefined>(undefined)

const PlayersDispatchContext = createContext<
  PlayersDispatchContextType | undefined
>(undefined)

export const PlayersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [players, dispatch] = useReducer(playersReducer, initalPlayers)

  function playersReducer(
    state: Player[],
    action: { type: string; payload: Player[] },
  ) {
    switch (action.type) {
      case "ADD_DECK": {
        const { payload } = action
        return state.map((player) => {
          const updatedPlayer = payload.find((p) => p.id === player.id)
          return updatedPlayer
            ? { ...player, deck: updatedPlayer.deck }
            : player
        })
      }
      default:
        return state
    }
  }

  return (
    <PlayersContext.Provider value={{ players }}>
      <PlayersDispatchContext.Provider value={{ dispatch }}>
        {children}
      </PlayersDispatchContext.Provider>
    </PlayersContext.Provider>
  )
}

export const usePlayers = () => {
  const context = useContext(PlayersContext)
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider")
  }
  return context
}
