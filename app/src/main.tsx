import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"

import "./styles.css"
import { QueryClientProvider } from "@tanstack/react-query"
import reportWebVitals from "./reportWebVitals.ts"
import { PlayersProvider } from "./contexts/playersContext.tsx"
import { router } from "@/router.tsx"
import { queryClient } from "@/queryClient.tsx"

// Render the app
const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  rootElement.classList.add("dark")
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PlayersProvider initialPlayers={[]}>
          <RouterProvider router={router} />
        </PlayersProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
