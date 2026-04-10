import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logout as logoutAction } from "../features/user/user.slice.ts";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  // For Display Login or Logout
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

  // Handling Logout
  const logout = async () => {
    const action = await dispatch(logoutAction())
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-dark-900/80 backdrop-blur-xl border-b border-glass-border shadow-lg shadow-dark-900/50"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="navbar-logo">
            <img src="/Lio.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold gradient-text">Lio</span>
          </Link>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLogin ? (
              <button
                onClick={() => logout()}
                className="px-4 py-2.5 text-sm text-center font-medium text-red-500 hover:text-white rounded-lg hover:bg-red-500/5 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsLogin(false)}
                  className="px-4 py-2.5 text-sm text-center font-medium text-dark-200 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsLogin(false)}
                  className="px-4 py-2.5 text-sm text-center font-semibold text-white rounded-lg btn-glow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-200 hover:text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-dark-800/90 backdrop-blur-xl border-t border-glass-border">
          <div className="pt-3 border-t border-glass-border flex flex-col gap-2">
            {isLogin ? (
              <button
                onClick={() => logout()}
                className="px-4 py-2.5 text-sm text-center font-medium text-red-500 hover:text-white rounded-lg hover:bg-red-500/5 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm text-center font-medium text-dark-200 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm text-center font-semibold text-white rounded-lg btn-glow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
