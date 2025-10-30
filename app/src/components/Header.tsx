import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="p-2 h-16 bg-[#1e1e1e] flex items-center relative">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-row">
        <div className="px-2 font-bold text-md">
          <HeaderLink to="/game">Start game</HeaderLink>
          <HeaderLink to="/players">Players</HeaderLink>
          <HeaderLink to="/game/past">Past games</HeaderLink>
          <HeaderLink to="/game/running">Current games</HeaderLink>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* X icon or hamburger icon */}
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <p className="font-bold text-m"> Menu </p>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-[#1e1e1e] border-t border-gray-600 md:hidden z-50">
          <div className="flex flex-col p-2 space-y-1">
            <HeaderLink to="/game" onClick={closeMenu}>
              Start game
            </HeaderLink>
            <HeaderLink to="/players" onClick={closeMenu}>
              Players
            </HeaderLink>
            <HeaderLink to="/game/past" onClick={closeMenu}>
              Past games
            </HeaderLink>
            <HeaderLink to="/game/running" onClick={closeMenu}>
              Current games
            </HeaderLink>
          </div>
        </nav>
      )}
    </header>
  )
}

const HeaderLink = ({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Link
      to={to}
      className="block p-2 rounded-md hover:underline   md:inline-block"
      activeProps={{ className: "underline" }}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
