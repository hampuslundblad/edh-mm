import { createFileRoute } from "@tanstack/react-router"
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
import { Title } from "@/components/ui/title"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/game/past")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: finishedGames, isLoading, error } = useFinishedGames()

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Title className="text-2xl font-bold mb-6">Past Games</Title>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Title className="text-2xl font-bold mb-6">Past Games</Title>
        <div className="text-red-500">
          Error loading finished games: {error.message}
        </div>
      </div>
    )
  }

  if (!finishedGames || finishedGames.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Title className="text-2xl font-bold mb-6">Past Games</Title>
        <div className="text-muted-foreground">No finished games found.</div>
      </div>
    )
  }

  return (
    <Layout>
      <Title className="text-2xl font-bold mb-6">Past Games</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game ID</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Winning deck</TableHead>
            <TableHead>Other decks</TableHead>
            <TableHead>Rounds</TableHead>
            <TableHead>Played</TableHead>
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
              <TableCell>{game.currentRound}</TableCell>

              <TableCell>
                {game.finishedAt
                  ? new Date(game.finishedAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}
