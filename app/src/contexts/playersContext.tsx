import React, { createContext, useContext, useReducer } from "react"
import type { Player } from "@/api/player"

interface PlayersContextType {
  players: Array<Player>
}

interface PlayersDispatchContextType {
  dispatch: React.Dispatch<{ type: string; payload: Array<Player> }>
}
const PlayersContext = createContext<PlayersContextType | undefined>(undefined)

const PlayersDispatchContext = createContext<
  PlayersDispatchContextType | undefined
>(undefined)

export const PlayersProvider = ({
  children,
  initialPlayers,
}: {
  children: React.ReactNode
  initialPlayers: Array<Player>
}) => {
  const [players, dispatch] = useReducer(playersReducer, initialPlayers)

  function playersReducer(
    state: Array<Player>,
    action: { type: string; payload: Array<Player> },
  ) {
    switch (action.type) {
      case "ADD_DECK": {
        const { payload } = action
        return state.map((player) => {
          const updatedPlayer = payload.find((p) => p.id === player.id)
          return updatedPlayer
            ? { ...player, decks: updatedPlayer.decks }
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
