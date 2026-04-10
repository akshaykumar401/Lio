import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BackgroundOrbs from "../../components/BackgroundOrbs";
import { useDispatch } from "react-redux";
import { sendOTP, verifyOTP, resetPassword } from "../../features/user/user.slice.ts";

type Step = "email" | "otp" | "reset" | "success";

const ForgetPass = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first OTP input when entering OTP step
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await dispatch(sendOTP({ email }));
    if (res.type === 'sendOTP/fulfilled') {
      setStep("otp");
    } else {
      setError(res.payload as string);
    }
    setIsLoading(false);
  };

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take only last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmpty = newOtp.findIndex((d) => !d);
    otpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    const res = await dispatch(verifyOTP({ email, otp: otpString }));
    if (res.type === 'verifyOTP/fulfilled') {
      setError("");
      setStep("reset");
    } else {
      setError(res.payload as string);
    }
    setIsLoading(false);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await dispatch(resetPassword({ email, password }));
    if (res.type === 'resetPassword/fulfilled') {
      setError("");
      setStep("success");
    } else {
      setError(res.payload as string);
    }
    setIsLoading(false);
  };

  // Step progress indicator
  const stepNumber = step === "email" ? 1 : step === "otp" ? 2 : step === "reset" ? 3 : 3;

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${s < stepNumber
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : s === stepNumber
                  ? "bg-accent-500/20 text-accent-400 border border-accent-500/40 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  : "bg-white/5 text-dark-400 border border-glass-border"
              }`}
          >
            {s < stepNumber ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              s
            )}
          </div>
          {s < 3 && (
            <div
              className={`w-8 h-0.5 rounded transition-all duration-500 ${s < stepNumber ? "bg-green-500/50" : "bg-glass-border"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <BackgroundOrbs />
      <div className="auth-line" style={{ left: "15%" }} />
      <div className="auth-line" style={{ left: "85%" }} />

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <img src="/Lio.png" alt="Logo" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold gradient-text">Lio</span>
          </Link>

          {step === "success" ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/15 flex items-center justify-center animate-scale-in">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Password Reset!</h1>
              <p className="text-dark-300 text-sm max-w-xs mx-auto">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
            </>
          ) : (
            <>
              {step !== "email" && <StepIndicator />}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {step === "email" && "Reset your password"}
                {step === "otp" && "Verify OTP"}
                {step === "reset" && "New password"}
              </h1>
              <p className="text-dark-300 text-sm">
                {step === "email" && "Enter your email to receive a verification code"}
                {step === "otp" && (
                  <>
                    Enter the 6-digit code sent to{" "}
                    <span className="text-white font-medium">{email}</span>
                  </>
                )}
                {step === "reset" && "Create a strong new password for your account"}
              </p>
            </>
          )}
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8" id="forget-pass-card">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-scale-in">
              {error}
            </div>
          )}

          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-5">
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
                id="send-otp-btn"
                disabled={isLoading}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                    Send verification code
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── Step 2: OTP ── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-4 text-center">
                  Verification Code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl input-glow text-white transition-all duration-200 ${digit
                          ? "border-accent-500/50 bg-accent-500/5 shadow-[0_0_10px_rgba(124,58,237,0.15)]"
                          : ""
                        }`}
                      id={`otp-input-${index}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                id="verify-otp-btn"
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    Verify code
                  </>
                )}
              </button>

              {/* Change email */}
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp(["", "", "", "", "", ""]);
                  setError("");
                }}
                className="w-full py-2.5 text-xs font-medium text-dark-400 hover:text-dark-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Change email address
              </button>
            </form>
          )}

          {/* ── Step 3: New Password ── */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* New Password */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-dark-200 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-12 py-3 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-dark-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm"
                    required
                    minLength={6}
                  />
                </div>
                {/* Match indicator */}
                {confirmPassword && (
                  <p className={`mt-2 text-xs flex items-center gap-1 ${password === confirmPassword ? "text-green-400" : "text-red-400"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {password === confirmPassword ? (
                        <path d="M20 6L9 17l-5-5" />
                      ) : (
                        <>
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                      )}
                    </svg>
                    {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </div>

              <button
                type="submit"
                id="reset-password-btn"
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Resetting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Reset password
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── Step 4: Success ── */}
          {step === "success" && (
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full py-3 text-sm font-semibold text-white rounded-xl btn-glow flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
                </svg>
                Sign in with new password
              </Link>
            </div>
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