import { createHashHistory, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { BASE_PATH } from "./config"


// use hash routing 
const hashHistory = createHashHistory() 

// Create a new router instance
export const router = createRouter({
  basepath: "/"
  routeTree,
  history: hashHistory,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
