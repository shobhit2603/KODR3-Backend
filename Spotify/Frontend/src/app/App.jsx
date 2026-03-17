import { RouterProvider } from "react-router"
import { router } from "./routes/app.routes"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

function App() {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App
