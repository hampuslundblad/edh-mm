import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <header className="p-2 h-16  bg-[#1e1e1e] flex items-center">
      <nav className="flex flex-row">
        <div className="px-2 font-bold text-lg">
          <HeaderLink to="/">Skapa spel</HeaderLink>|
          <HeaderLink to="/players">Spelare</HeaderLink>|
        </div>
      </nav>
    </header>
  )
}

const HeaderLink = ({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) => {
  return (
    <Link
      to={to}
      className="p-2 hover:underline"
      activeProps={{ className: "underline" }}
    >
      {children}
    </Link>
  )
}
