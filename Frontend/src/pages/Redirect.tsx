import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackgroundOrbs from "../components/BackgroundOrbs";

const Redirect = () => {
  const { id } = useParams();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // In production, this would redirect to the actual URL
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <BackgroundOrbs />

      <div className="relative text-center animate-slide-up">
        {/* Animated loader */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(124,58,237,0.15)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(1 - countdown / 3) * 264} 264`}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">{countdown}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Redirecting...</h1>
        <p className="text-dark-300 text-sm mb-1">
          Taking you to your destination
        </p>
        <p className="text-dark-400 text-xs">
          Short link: <span className="text-accent-400">lio.to/{id}</span>
        </p>

        <div className="mt-8 glass-card inline-flex items-center gap-3 px-5 py-3">
          <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          <span className="text-sm text-dark-300">
            {countdown > 0 ? "Please wait..." : "Redirecting now..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Redirect;