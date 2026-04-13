import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-glass-border bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/Lio.png" alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold gradient-text">Lio</span>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed max-w-md">
              Shorten, share, and track your links with powerful analytics.
              Built for creators and businesses who want more from their URLs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link to='/' className="text-sm text-dark-300 hover:text-accent-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-glass-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-dark-400">
            © {new Date().getFullYear()} Lio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <Link to="https://github.com/akshaykumar401" className="text-dark-400 hover:text-accent-400 transition-colors" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
