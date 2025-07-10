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
  errorComponent: (error) => (
    <>
      <main className="bg-[#232323] text-white min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl">
            An error occurred:{" "}
            <span className="text-red-400">{error.error.message}</span>
          </h1>
        </div>

        {isDevelopment() && <TanStackRouterDevtools />}
      </main>
    </>
  ),
  notFoundComponent: () => (
    <main className="bg-[#232323] text-white min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl">Page not found</h1>
      </div>
      {isDevelopment() && <TanStackRouterDevtools />}
    </main>
  ),
})
