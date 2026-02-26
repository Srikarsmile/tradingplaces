import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { isValidEmail, validatePassword, validateUsername, validateDateOfBirth } from "../utils/validation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AuthPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("dummy@example.com"); // Pre-filled dummy credential
  const [password, setPassword] = useState("dummy123"); // Pre-filled dummy credential
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginWithDummyCreds } = useAuth();
  const redirectTo = (location.state && location.state.from) || "/workspace/dashboard";

  useEffect(() => {
    const skipAuth = import.meta.env.VITE_SKIP_AUTH === "true";
    if (skipAuth) return;
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    const newErrors = {};
    if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0];
    }
    if (mode === "signup") {
      const usernameValidation = validateUsername(username);
      if (!usernameValidation.valid) {
        newErrors.username = usernameValidation.errors[0];
      }
      const dobValidation = validateDateOfBirth(dob);
      if (!dobValidation.valid) {
        newErrors.dob = dobValidation.errors[0];
      }
      if (!acceptedTerms) {
        newErrors.terms = "Please accept the terms and conditions to continue.";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Intercept dummy credentials for both sign in and sign up
      if (email === "dummy@example.com" && password === "dummy123") {
        if (loginWithDummyCreds) {
          await loginWithDummyCreds();
          setMessage(mode === "signin" ? "Logged in successfully! Redirecting..." : "Sign-up successful! Redirecting...");
          setTimeout(() => navigate(redirectTo, { replace: true }), 600);
          return;
        }
      }

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: username || email, dob },
            emailRedirectTo: `${window.location.origin}/auth?confirmed=true`,
          },
        });
        if (error) throw error;
        if (data.user) {
          try {
            const { userProfileService } = await import("../lib/supabaseService");
            await userProfileService.upsertProfile(data.user.id, {
              username: username || email,
              date_of_birth: dob || null,
            });
          } catch (profileError) {
            console.warn("Could not create user profile:", profileError);
          }
        }
        setMessage("Sign-up successful! Please check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Logged in successfully. Redirecting...");
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("Error signing out. Please try again.");
    } else {
      setMessage("Logged out successfully.");
      navigate("/", { replace: true });
    }
  }

  const inputClasses = (hasError) =>
    `mt-1 w-full bg-[var(--surface-700)] border ${hasError ? "border-[var(--accent-rose)]" : "border-[var(--surface-500)]"
    } rounded-xl p-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan-subtle)] focus:outline-none`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-900)] p-6 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-cyan)] rounded-full blur-[150px] opacity-[0.06] pointer-events-none" />

      <div className="glass-card-elevated p-8 w-full max-w-md animate-scale-in relative z-10">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {mode === "signin" ? "Log in" : "Create an account"}
        </h1>

        {/* Dummy credentials hint */}
        <div className="mb-6 p-3 rounded-xl bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 text-sm">
          <p className="text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider mb-1">Demo Credentials</p>
          <p className="text-[var(--text-secondary)] text-xs">
            Email: <span className="text-[var(--text-primary)] font-mono">dummy@example.com</span> &nbsp;·&nbsp;
            Password: <span className="text-[var(--text-primary)] font-mono">dummy123</span>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <div>
                <label htmlFor="username" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={inputClasses(errors.username)}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: "" });
                  }}
                  placeholder="e.g. jordan"
                  required
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? "username-error" : undefined}
                />
                {errors.username && (
                  <p id="username-error" className="mt-1 text-sm text-[var(--accent-rose)]" role="alert">
                    {errors.username}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dob" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Date of birth
                </label>
                <input
                  id="dob"
                  type="date"
                  className={inputClasses(errors.dob)}
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    if (errors.dob) setErrors({ ...errors, dob: "" });
                  }}
                  required
                  aria-invalid={!!errors.dob}
                  aria-describedby={errors.dob ? "dob-error" : undefined}
                />
                {errors.dob && (
                  <p id="dob-error" className="mt-1 text-sm text-[var(--accent-rose)]" role="alert">
                    {errors.dob}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-[var(--text-secondary)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClasses(errors.email)}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-[var(--accent-rose)]" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-[13px] font-medium text-[var(--text-secondary)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={inputClasses(errors.password)}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-[var(--accent-rose)]" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {mode === "signup" && (
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)]">
              <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  className={`mt-1 h-4 w-4 rounded accent-[var(--accent-cyan)] ${errors.terms ? "border-[var(--accent-rose)]" : ""
                    }`}
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: "" });
                  }}
                  required
                  aria-invalid={!!errors.terms}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                />
                <span>
                  I have read and accept the{" "}
                  <Link to="/terms" className="text-[var(--accent-cyan)] hover:underline">
                    terms and conditions
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && (
                <p id="terms-error" className="text-sm text-[var(--accent-rose)] ml-7" role="alert">
                  {errors.terms}
                </p>
              )}
              <div className="flex flex-wrap gap-3 text-xs">
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-[var(--surface-600)] border border-[var(--surface-500)] font-semibold text-[var(--accent-cyan)] hover:bg-[var(--surface-500)] text-center"
                >
                  View terms (opens new tab)
                </Link>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" text="" />
                <span>Please wait...</span>
              </>
            ) : mode === "signin" ? (
              "Log in"
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-[var(--text-secondary)] bg-[var(--surface-700)] p-3 rounded-xl border-l-[3px] border-l-[var(--accent-cyan)]">
            {message}
          </p>
        )}

        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setAcceptedTerms(false);
              setMessage("");
            }}
            className="text-[var(--accent-cyan)] hover:underline"
          >
            {mode === "signin"
              ? "Need an account? Sign up"
              : "Already have an account? Log in"}
          </button>

          <button
            onClick={handleLogout}
            className="text-[var(--accent-rose)] hover:underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
