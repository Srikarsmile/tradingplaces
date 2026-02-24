import React, { useState } from "react";
import logo from "../assets/trading-places-simulator-1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, username, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const skipAuth = import.meta.env.VITE_SKIP_AUTH === "true" || true;

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
    <nav className="w-full backdrop-blur-xl text-[var(--text-primary)] h-16 fixed top-0 left-0 z-50"
      style={{
        background: "rgba(13, 11, 26, 0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 1px 0 0 rgba(129,140,248,0.06), 0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        <button
          onClick={() => handleLinkClick("/")}
          className="flex items-center gap-3"
          aria-label="Go home"
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.4))" }}
          />
          <span className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            Trading Places
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-[13px] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative py-1 transition-colors hover:text-[var(--text-primary)] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                isActive(item.to)
                  ? "text-[var(--accent-cyan)] after:w-full after:bg-gradient-to-r after:from-[var(--accent-cyan)] after:to-[var(--accent-pink)]"
                  : "text-[var(--text-secondary)] after:w-0 hover:after:w-full hover:after:bg-[var(--accent-cyan)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth controls desktop */}
        <div className="hidden md:flex items-center gap-3">
          {skipAuth && (
            <span className="text-[11px] font-medium text-[var(--accent-amber)] bg-[var(--accent-amber-subtle)] px-2.5 py-1 rounded-full">
              Dev Mode
            </span>
          )}
          {!skipAuth && !loading && isAuthenticated && (
            <span className="text-xs text-[var(--text-secondary)]">
              Welcome, {username || "user"}
            </span>
          )}
          {!skipAuth && !loading && isAuthenticated && (
            <button
              onClick={signOut}
              className="btn-secondary text-xs px-4 py-2"
            >
              Sign out
            </button>
          )}
          {!skipAuth && !loading && !isAuthenticated && (
            <button
              onClick={() => navigate("/auth")}
              className="btn-primary text-xs px-5 py-2"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--surface-500)] bg-[var(--surface-700)] text-[var(--text-primary)]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--surface-800)]/95 backdrop-blur-xl border-t border-[var(--glass-border)] animate-fade-in-up">
          <div className="px-6 py-3 flex flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleLinkClick(item.to)}
                className={`text-left py-3 border-b border-[var(--surface-500)]/50 last:border-b-0 transition-colors ${
                  isActive(item.to) ? "text-[var(--accent-cyan)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {!loading && isAuthenticated && (
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="mt-3 btn-secondary text-sm w-full"
              >
                Sign out
              </button>
            )}
            {!loading && !isAuthenticated && (
              <button
                onClick={() => handleLinkClick("/auth")}
                className="mt-3 btn-primary text-sm w-full"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
