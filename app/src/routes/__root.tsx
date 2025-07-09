import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import Header from "@/components/Header"
import { isDevelopment } from "@/utils/env"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRoute({
  component: () => (
    <main className="bg-[#232323] text-white min-h-screen flex flex-col">
      <Header />
      {/** Ugly solution but remove 3rem for the footer's height**/}
      <div className="h-[calc(100vh-3rem)] flex-1 overflow-y-auto">
        <Toaster />
        <Outlet />
      </div>
      <Footer />
      {isDevelopment() && <TanStackRouterDevtools />}
    </main>
  ),
})
