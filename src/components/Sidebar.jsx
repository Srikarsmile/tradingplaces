import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Theater, ClipboardCheck, FileText, HeartPulse, X, Menu, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/trading-places-simulator-1.png";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { signOut, username, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const links = [
    { path: "/workspace/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/workspace/scenario", label: "Scenario Practice", icon: Theater },
    { path: "/workspace/assessment", label: "Assessment", icon: ClipboardCheck },
    { path: "/workspace/report", label: "Report as PDF", icon: FileText },
    { path: "/workspace/pulse", label: "Culture Pulse", icon: HeartPulse },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-20 left-4 z-40 bg-[var(--surface-700)] text-[var(--text-primary)] p-2.5 rounded-xl border border-[var(--surface-500)] shadow-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 h-screen p-6 flex flex-col fixed z-30 transition-transform duration-300 border-r border-[var(--glass-border)] ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
          }`}
        style={{
          background: "linear-gradient(180deg, rgba(22,26,28,0.99), rgba(14,16,17,0.99))",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(212, 165, 116, 0.35))" }}
            />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
              Trading Places
            </span>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="flex flex-col space-y-1.5">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3 border-l-[3px] ${isActive
                    ? "bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] border-l-[var(--accent-cyan)]"
                    : "text-[var(--text-secondary)] border-l-transparent hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "drop-shadow-[0_0_6px_rgba(129,140,248,0.5)]" : ""}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-[var(--surface-500)] flex flex-col gap-4">
          {!loading && isAuthenticated && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-600)] flex items-center justify-center text-[var(--accent-cyan)] font-bold text-xs ring-1 ring-[var(--surface-500)]">
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">{username || "Practitioner"}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">Interactive practice</span>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-rose)] hover:bg-[var(--accent-rose-subtle)] rounded-lg transition-colors"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
          <div className="text-[10px] text-center text-[var(--text-tertiary)]">
            © 2025 LSBU Prototype
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[var(--surface-900)]/70 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
