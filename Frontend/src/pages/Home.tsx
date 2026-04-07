import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BackgroundOrbs, Navbar, Footer } from "../components/index.ts";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats] = useState({ links: "2.4M+", clicks: "148M+", users: "56K+" });

  // Simulated shortening
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsLoading(true);
    setShortenedUrl("");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const hash = Math.random().toString(36).substring(2, 8);
    setShortenedUrl(`lio.to/${hash}`);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortenedUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animated counter
  const AnimatedCounter = ({ target, label }: { target: string; label: string }) => {
    const [count, setCount] = useState(0);
    const numericPart = parseInt(target.replace(/[^0-9]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");

    useEffect(() => {
      let start = 0;
      const end = numericPart;
      const duration = 2000;
      const stepTime = duration / end;
      const timer = setInterval(() => {
        start += Math.ceil(end / 60);
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, stepTime);
      return () => clearInterval(timer);
    }, [numericPart]);

    return (
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold gradient-text">
          {count >= 1000 ? `${(count / 1000).toFixed(1)}` : count}
          {suffix}
        </div>
        <div className="text-sm text-dark-300 mt-1">{label}</div>
      </div>
    );
  };

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Lightning Fast",
      desc: "Generate short links in milliseconds with our optimized global infrastructure.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Advanced Analytics",
      desc: "Track clicks, geographic data, referrers, and device info in real time.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: "Secure & Private",
      desc: "Enterprise-grade security with end-to-end encryption and custom domains.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: "Team Collaboration",
      desc: "Share branded short links with your team and manage permissions easily.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4" id="hero-section">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Now with Advanced Analytics
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Make every link
            <br />
            <span className="gradient-text">count.</span>
          </h1>

          <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Shorten URLs, track performance, and grow your audience with
            Lio's powerful link management platform.
          </p>

          {/* URL Shortener Input */}
          <form
            onSubmit={handleShorten}
            className="max-w-2xl mx-auto"
            id="url-shortener-form"
          >
            <div className="glass-card p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <input
                  type="url"
                  id="url-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm sm:text-base border-0 focus:ring-0"
                  required
                />
              </div>
              <button
                type="submit"
                id="shorten-btn"
                disabled={isLoading}
                className="px-8 py-3.5 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Shortening...
                  </>
                ) : (
                  <>
                    Shorten URL
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result */}
          {shortenedUrl && (
            <div className="mt-6 animate-scale-in" id="shortened-result">
              <div className="glass-card max-w-md mx-auto p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <a
                    href={`https://${shortenedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-300 font-medium text-sm truncate hover:underline"
                  >
                    {shortenedUrl}
                  </a>
                </div>
                <button
                  onClick={handleCopy}
                  id="copy-btn"
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-glass-border bg-white/5 hover:bg-white/10 text-white transition-all duration-200 shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative py-16 px-4" id="stats-section">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 sm:p-10">
            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <AnimatedCounter target={stats.links} label="Links Shortened" />
              <AnimatedCounter target={stats.clicks} label="Total Clicks" />
              <AnimatedCounter target={stats.users} label="Happy Users" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="relative py-20 px-4" id="features-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">manage links</span>
            </h2>
            <p className="text-dark-300 text-lg max-w-xl mx-auto">
              Powerful tools to shorten, brand, and track every link you share.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card glass-card-hover p-6 sm:p-8 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center text-accent-400 mb-5 group-hover:bg-accent-500/25 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-20 px-4" id="cta-section">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 sm:p-14 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-neon-blue/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-dark-300 text-lg mb-8 max-w-lg mx-auto">
                Join thousands of creators and businesses already using Lio
                to power their links.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  id="cta-signup-btn"
                  className="px-8 py-3.5 text-sm font-semibold text-white rounded-xl btn-glow inline-flex items-center gap-2"
                >
                  Start for Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/login"
                  id="cta-login-btn"
                  className="px-8 py-3.5 text-sm font-medium text-dark-200 hover:text-white rounded-xl border border-glass-border hover:border-accent-500/30 transition-all duration-200"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;