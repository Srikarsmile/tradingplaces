import React, { useState } from "react";
import logo from "../assets/trading-places-simulator-1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, username, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const skipAuth = import.meta.env.VITE_SKIP_AUTH === "true";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/workspace/dashboard", label: "Dashboard" },
    { to: "/workspace/scenario", label: "Scenario" },
    { to: "/workspace/report", label: "Report" },
    { to: "/workspace/pulse", label: "Culture Pulse" },
    { to: "/terms", label: "Terms" },
  ];

  const handleLinkClick = (to) => {
    setOpen(false);
    navigate(to);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-[var(--surface-900)]/40 backdrop-blur-2xl text-[var(--text-primary)] h-14 border border-[var(--glass-border)] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-6xl transition-all duration-300">
        <div className="flex justify-between items-center px-6 h-full">
          {/* Logo Section */}
          <button
            onClick={() => handleLinkClick("/")}
            className="flex items-center gap-3 group"
            aria-label="Go home"
          >
            <div className="relative w-8 h-8 rounded-full bg-[var(--surface-800)] flex items-center justify-center border border-[var(--glass-border)] overflow-hidden group-hover:border-[var(--accent-primary)] transition-colors duration-500">
              <img
                src={logo}
                alt="logo"
                className="w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-110"
              />
            </div>
            <span className="text-[14px] font-bold tracking-tight text-[var(--text-primary)] uppercase">
              Trading Places
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--surface-800)]/30 rounded-full p-1 border border-[var(--glass-border)]">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase rounded-full transition-all duration-300 ${active
                    ? "text-[var(--surface-900)] bg-[var(--accent-primary)] shadow-[0_0_15px_rgba(193,255,18,0.3)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-700)]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth controls desktop */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && isAuthenticated && (
              <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--accent-secondary)] uppercase">
                {username || "user"}
              </span>
            )}
            {!loading && isAuthenticated && (
              <button
                onClick={async () => { await signOut(); navigate("/"); }}
                className="text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full border border-[var(--glass-border)] hover:bg-[var(--surface-700)] hover:text-white transition-colors"
              >
                Sign out
              </button>
            )}
            {!loading && !isAuthenticated && (
              <button
                onClick={() => navigate("/auth")}
                className="text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-1.5 rounded-full bg-[var(--accent-primary)] text-black hover:scale-105 transition-transform"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[var(--glass-border)] bg-[var(--surface-800)]/50 text-[var(--text-primary)]"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu (Detached styling) */}
        {open && (
          <div className="absolute top-[calc(100%+16px)] left-0 w-full md:hidden bg-[var(--surface-900)]/90 backdrop-blur-3xl border border-[var(--glass-border)] rounded-3xl p-4 shadow-2xl animate-fade-in-up origin-top">
            <div className="flex flex-col gap-2 text-sm font-bold tracking-[0.1em] uppercase">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleLinkClick(item.to)}
                  className={`text-left px-6 py-4 rounded-2xl transition-all ${isActive(item.to)
                    ? "text-black bg-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-800)]"
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-[1px] w-full bg-[var(--surface-700)] my-2" />

              {!loading && isAuthenticated && (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="mt-2 text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-4 rounded-xl border border-[var(--glass-border)] text-center hover:bg-[var(--surface-700)]"
                >
                  Sign out
                </button>
              )}
              {!loading && !isAuthenticated && (
                <button
                  onClick={() => handleLinkClick("/auth")}
                  className="mt-2 text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-4 rounded-xl bg-[var(--text-primary)] text-black text-center"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
