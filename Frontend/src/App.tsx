import { useState } from "react"
import { Home, Dashboard } from "./pages/index.ts"

function App() {
  const [isLogin, setIsLogin] = useState(true)
  return isLogin ? <Dashboard /> : <Home />
}

export default App
