import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/Layout"
import { Title } from "@/components/ui/title"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <Title variant="m">Nytt spel 2</Title>

      <p> Välj spelare </p>

      <p> Välj lekare </p>

      <p> Runda </p>
      <div>
        <PlusIcon />
      </div>
      <div>
        <MinusIcon />
      </div>

      <Button> Avsluta spel </Button>
    </Layout>
  )
}
