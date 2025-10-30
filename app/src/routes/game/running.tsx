import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"
import { useRunningGames } from "@/hooks/game/useRunningGames"
import { useCancelGame } from "@/hooks/game/useCancelGame"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Layout from "@/components/Layout"
import { getHeaderTitle } from "@/utils/meta"

export const Route = createFileRoute("/game/running")({
  head: () => getHeaderTitle("Running Games"),
  component: () => (
    <Layout title="Running Games">
      <RouteComponent />
    </Layout>
  ),
})

function RouteComponent() {
  const { data: runningGames, isLoading, error } = useRunningGames()
  const cancelGameMutation = useCancelGame()

  const handleCancelGame = async (gameId: string) => {
    try {
      await cancelGameMutation.mutateAsync(gameId)
      toast.success("Game cancelled successfully")
    } catch (cancelError) {
      toast.error("Failed to cancel game")
      console.error("Error cancelling game:", cancelError)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading running games: {error.message}
      </div>
    )
  }

  if (!runningGames || runningGames.length === 0) {
    return <div className="text-muted-foreground">No running games found.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Game ID</TableHead>
          <TableHead>Players</TableHead>
          <TableHead>Decks</TableHead>
          <TableHead>Current Round</TableHead>
          <TableHead>Started</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runningGames.map((game) => (
          <TableRow key={game.id}>
            <TableCell className="font-mono text-sm">{game.id}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {game.players
                  .slice()
                  .sort((a, b) => a.playerName.localeCompare(b.playerName))
                  .map((player) => (
                    <Badge key={player.playerId} variant="outline">
                      {player.playerName}
                    </Badge>
                  ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {game.players.map((player) => (
                  <Badge key={player.playerId} variant="secondary">
                    {player.deckName}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="default">{game.currentRound}</Badge>
            </TableCell>
            <TableCell>
              {new Date(game.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancelGame(game.id)}
                disabled={cancelGameMutation.isPending}
              >
                {cancelGameMutation.isPending ? "Cancelling..." : "Cancel Game"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
