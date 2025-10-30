import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import Header from "@/components/Header"
import { isDevelopment } from "@/utils/env"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer"
import { getHeaderTitle } from "@/utils/meta"

export const Route = createRootRoute({
  head: () => getHeaderTitle("New Game"),
  component: () => (
    <>
      <HeadContent />
      <Main>
        <Header />
        {/** Ugly solution but remove 3rem for the footer's height**/}
        <div className="h-[calc(100vh-3rem)] flex-1 overflow-y-auto">
          <Toaster />
          <Outlet />
        </div>
      </Main>
    </>
  ),

  errorComponent: (error) => (
    <Main>
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl">
          An error occurred:{" "}
          <span className="text-red-400">{error.error.message}</span>
        </h1>
      </div>

      {isDevelopment() && <TanStackRouterDevtools />}
    </Main>
  ),
  notFoundComponent: () => (
    <Main>
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl">Page not found</h1>
      </div>
      {isDevelopment() && <TanStackRouterDevtools />}
    </Main>
  ),
})

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background text-text-primary min-h-screen flex flex-col">
      {children}
      <Footer />
    </main>
  )
}
