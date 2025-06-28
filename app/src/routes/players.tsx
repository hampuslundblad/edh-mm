import { createFileRoute } from "@tanstack/react-router"
import { useAllPlayers } from "@/hooks/useAllPlayers"

export const Route = createFileRoute("/players")({
  component: App,
})

function App() {
  const { data } = useAllPlayers()
  console.log("data", data)
  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
        {/* {players.map((player) => (
          <PlayerLink key={player.id} id={player.id} name={player.name} />
        ))} */}
      </div>
    </div>
  )
}
// const PlayerLink = ({ id, name }: { id: string; name: string }) => {
//   return (
//     <Link to="/player/$id" params={{ id }}>
//       <Button variant="outline" className="">
//         {name}
//       </Button>
//     </Link>
//   )
// }
