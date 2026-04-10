import { Home, Dashboard } from "./pages/index.ts"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getUserProfile } from "./features/user/user.slice.ts"

function App() {
  const { userData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserProfile()).finally(() => setInitialLoading(false));
  }, []);

  const isLoggedIn =
    userData &&
    typeof userData === "object" &&
    Object.keys(userData).length > 0 &&
    userData.type !== "logout/fulfilled";

  if (initialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 gap-6">
        {/* Logo */}
        <div className="animate-pulse-glow">
          <img src="/Lio.png" alt="Lio" className="w-16 h-16 rounded-2xl" />
        </div>

        {/* Spinner ring */}
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full border-2 border-glass-border"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-500 border-r-accent-400"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
        </div>

        {/* Loading text */}
        <p className="text-dark-300 text-sm font-medium tracking-wide">
          Loading your workspace...
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return isLoggedIn ? <Dashboard /> : <Home />;
}

export default App
