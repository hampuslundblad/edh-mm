import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <header className="p-2 h-16  bg-[#1e1e1e] flex items-center">
      <nav className="flex flex-row">
        <div className="px-2 font-bold text-lg">
          <Link to="/">Spelare</Link>
          <Link to="/game" className="ml-4">
            Skapa spel
          </Link>
        </div>
      </nav>
    </header>
  )
}
