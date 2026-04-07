import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundOrbs from "../../components/BackgroundOrbs";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <BackgroundOrbs />
      <div className="auth-line" style={{ left: "15%" }} />
      <div className="auth-line" style={{ left: "85%" }} />

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-neon-blue flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent-500/30 transition-all duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span className="text-2xl font-bold gradient-text">Lio</span>
          </Link>

          {sent ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/15 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Check your email</h1>
              <p className="text-dark-300 text-sm max-w-xs mx-auto">
                We've sent a password reset link to <span className="text-white font-medium">{email}</span>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reset your password</h1>
              <p className="text-dark-300 text-sm">
                Enter your email and we'll send you a reset link
              </p>
            </>
          )}
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8" id="forget-pass-card">
          {sent ? (
            <div className="space-y-4">
              <p className="text-sm text-dark-300 text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSent(false)}
                className="w-full py-3 text-sm font-medium text-dark-200 rounded-xl border border-glass-border hover:bg-white/5 transition-all"
              >
                Try again
              </button>
              <Link
                to="/login"
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-dark-200 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                id="reset-submit-btn"
                disabled={isLoading}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-dark-400 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPass;