import { useState } from "react"
import { Home, Dashboard } from "./pages/index.ts"
import { useSelector } from "react-redux"

function App() {
  // For Display Home or Dashboard
  const { userData } = useSelector((state: any) => state.user);
  const isEmpty = (obj: any) => {
    for (let prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }
  const [isLogin, setIsLogin] = useState(isEmpty(userData) || userData.type === 'logout/fulfilled' ? false : true)


  return isLogin ? <Dashboard /> : <Home />
}

export default App
