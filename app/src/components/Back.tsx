import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

const Back = ({
  to,
  params,
}: {
  to?: string
  params?: Record<string, string>
}) => {
  return (
    <Link to={to ?? ".."} params={params ?? {}}>
      <span className="flex items-center gap-2 text-md text-muted-foreground">
        <ArrowLeft /> Back
      </span>
    </Link>
  )
}

export default Back
