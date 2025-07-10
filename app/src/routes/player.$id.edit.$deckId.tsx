import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/player/$id/edit/$deckId")({
  component: () => (
    <Layout>
      <RouteComponent />
    </Layout>
  ),
})

function RouteComponent() {
  return <div>Hello "/player/$id/edit/$deckId"!</div>
}
