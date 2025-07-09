import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/player/$id/edit/$deckId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/player/$id/edit/$deckId"!</div>
}
