import { Link } from "@tanstack/react-router"

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-12 w-full border-t bottom-0 left-0 border-neutral-700 text-center">
      <ul>
        <Link className=" hover:underline" to="/bracket-info">
          <li>Bracket Information</li>
        </Link>
      </ul>
    </footer>
  )
}

export default Footer
