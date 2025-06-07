import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import Header from "@/components/Header"

export const Route = createRootRoute({
  component: () => (
    <main className="bg-[#232323] text-white min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
})
