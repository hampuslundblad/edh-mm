import { createFileRoute } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"
import { useFinishedGames } from "@/hooks/game/useFinishedGames"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Layout from "@/components/Layout"
import { getHeaderTitle } from "@/utils/meta"
import { deleteGameOptions } from "@/hooks/game/options"
import { queryClient } from "@/queryClient"
import { ConfirmationModal } from "@/components/ConfirmationModal"

export const Route = createFileRoute("/game/past")({
  head: () => getHeaderTitle("Past Games"),

  component: () => (
    <Layout title="Past Games">
      <RouteComponent />
    </Layout>
  ),
})

function RouteComponent() {
  const {
    data: finishedGames,
    isLoading: isFinishedGameLoading,
    error: finishedGameError,
  } = useFinishedGames()

  const deleteGameMutation = useMutation(deleteGameOptions())

  useEffect(() => {
    if (deleteGameMutation.isError) {
      toast.error("Unable to delete game")
    } else if (deleteGameMutation.isSuccess) {
      toast.success("Game was deleted")
      queryClient.invalidateQueries({ queryKey: ["games", "finished"] })
    }
  }, [deleteGameMutation.isError, deleteGameMutation.isSuccess])

  const handleDeleteGame = (gameId: string) => {
    deleteGameMutation.mutate(gameId)
  }

  if (isFinishedGameLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (finishedGameError) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">
          Error loading finished games: {finishedGameError.message}
        </div>
      </div>
    )
  }

  if (!finishedGames || finishedGames.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-muted-foreground">No finished games found.</div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Game ID</TableHead>
          <TableHead>Players</TableHead>
          <TableHead>Winning deck</TableHead>
          <TableHead>Other decks</TableHead>
          <TableHead>Rounds</TableHead>
          <TableHead>Played</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {finishedGames.map((game) => (
          <TableRow key={game.id}>
            <TableCell className="font-mono text-sm">{game.id}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {/** Show the players in the game in alphabetical order */}
                {game.players
                  .sort((a, b) => a.playerName.localeCompare(b.playerName))
                  .map((player) => (
                    <Badge key={player.playerId} variant="outline">
                      {player.playerName}
                    </Badge>
                  ))}
              </div>
            </TableCell>

            <TableCell>
              {game.winner ? (
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  {game.winner.deckName}
                </Badge>
              ) : (
                <span className="text-muted-foreground">No winner</span>
              )}
            </TableCell>
            <TableCell>
              {/** Filter out the winning player and show the other decks */}
              {game.players
                .filter((player) => player.deckName !== game.winner?.deckName)
                .map((player) => (
                  <Badge key={player.playerId} variant="outline">
                    {player.deckName}
                  </Badge>
                ))}
            </TableCell>
            {/** Rounds */}
            <TableCell>{game.currentRound}</TableCell>

            <TableCell>
              {game.finishedAt
                ? new Date(game.finishedAt).toLocaleDateString()
                : "N/A"}
            </TableCell>
            <TableCell>
              <ConfirmationModal
                triggerVariant={"destructive"}
                onConfirm={() => handleDeleteGame(game.id)}
                description={`Do you want to remove game ${game.id}`}
                modalTriggerText={"Remove game"}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
