import { Link } from "@tanstack/react-router"
import type { Player } from "@/api/player"

export const PlayerLink = ({ player }: { player: Player }) => {
  return (
    <Link
      className="self-start"
      to="/player/$id"
      params={{ id: player.id }}
      preload={false}
    >
      <div className="border-bg-gradient rounded-lg shadow p-4 border border-bg-border-primary hover:bg-gradient-to-r hover:from-dark hover:to-light min-w-[250px] min-h-[100px] transition-all duration-300">
        <span className="text-lg font-semibold text-white">{player.name}</span>
        <p className="text-sm text-text-muted">
          Has {player.decks.length}{" "}
          {player.decks.length === 1 ? "deck" : "decks"}
        </p>
      </div>
    </Link>
  )
}
