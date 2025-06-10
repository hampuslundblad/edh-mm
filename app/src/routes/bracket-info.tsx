import { createFileRoute } from "@tanstack/react-router"
import { CheckIcon, InfoIcon, XIcon } from "lucide-react"

export const Route = createFileRoute("/bracket-info")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="md:m-8 display flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bracket Information
      </h1>
      <div className="flex flex-col p-4 md:w-[40rem]">
        <section className="mb-8 text-wrap">
          <h2 className="text-xl font-semibold mb-2">1. Exhibition</h2>
          <p className="mb-4 ">
            Decks prioritize theme over function and showcase a unique idea or
            experience rather than winning.
          </p>
          <ul className="space-y-2">
            <ListItem icon="Cross">No game changers</ListItem>
            <ListItem icon="Cross">No mass land denial</ListItem>
            <ListItem icon="Cross">No extra turns</ListItem>
            <ListItem icon="Cross">
              No two-card infinite combos (Game-enders, Lockouts or infinites)
            </ListItem>
            <ListItem icon="Check">Few tutors</ListItem>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Core</h2>
          <p className="mb-4 font-bold">
            Decks are focused, even if every card choice isn't the highest power
            and comparable to an average precon. Wins are often telegraphed or
            incremental
          </p>
          <ul className="space-y-2">
            <ListItem icon="Cross">No game changers</ListItem>
            <ListItem icon="Cross">No mass land denial</ListItem>
            <ListItem icon="Cross">No chaining extra turns</ListItem>
            <ListItem icon="Cross">
              No two-card infinite combos (Game-enders, Lockouts or infinites)
            </ListItem>
            <ListItem icon="Check">Few tutors</ListItem>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Upgraded</h2>
          <p className="mb-4 font-bold">
            Decks are thoughtfully designed, full of synergistic or strong
            cards. Games could end out of nowhere with powerfull spells and
            late-game combos.
          </p>
          <ul className="space-y-2">
            <ListItem icon="Cross">No game changers</ListItem>
            <ListItem icon="Cross">No mass land denial</ListItem>
            <ListItem icon="Cross">No chaining extra turns</ListItem>
            <ListItem icon="Cross">
              No two-card infinite combos (Game-enders, Lockouts or infinites)
            </ListItem>
            <ListItem icon="Info">Up to 3 game changers.</ListItem>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Optimized</h2>
          <p className="mb-4 font-bold">
            Decks are turbocharged with the most powerful cards in the format.
            Everybody intends to win and is ready to play against anything.
          </p>
          <ul className="space-y-2">
            <ListItem icon="Check">
              No restrictions other than the banlist.
            </ListItem>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. CEDH</h2>
          <p className="mb-4 font-bold">
            Decks are built to win in the competitive metagame Players intend
            only to use the most powerful strategies and cards available.
          </p>
          <ul className="space-y-2">
            <ListItem icon="Check">
              No restrictions other than the banlist.
            </ListItem>
          </ul>
        </section>
      </div>
    </div>
  )
}

const ListItem = ({
  children,
  icon,
}: {
  children: React.ReactNode
  icon: "Cross" | "Check" | "Info"
}) => {
  const renderIcon = () => {
    switch (icon) {
      case "Check":
        return <CheckIcon className="text-green-500 w-5 h-5" />
      case "Cross":
        return <XIcon className="text-red-500 w-5 h-5" />
      case "Info":
        return <InfoIcon className="text-blue-500 w-5 h-5" />
    }
  }
  return (
    <li className="flex items-center gap-2">
      {renderIcon()}
      {children}
    </li>
  )
}
