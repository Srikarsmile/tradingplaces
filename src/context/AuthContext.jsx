import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  loading: true,
});

// We won't globally skip auth anymore.
const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === "true";

// Mock user for development
const MOCK_USER = {
  id: "dev-user-123",
  email: "dummy@example.com",
  user_metadata: {
    username: "Demo User",
    email: "dummy@example.com",
  },
};

export function AuthProvider({ children }) {
  // Check localStorage for a dummy session to persist dev mock login
  const [user, setUser] = useState(() => {
    if (SKIP_AUTH) return MOCK_USER;
    if (typeof window !== "undefined" && window.localStorage.getItem("DUMMY_AUTH") === "true") {
      return MOCK_USER;
    }
    return null;
  });

  const [loading, setLoading] = useState(!SKIP_AUTH && !user);

  useEffect(() => {
    // Skip auth initialization if SKIP_AUTH is enabled
    if (SKIP_AUTH) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;
      if (error) {
        console.error("Auth session error", error);
        setUser(null);
      } else {
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const loginWithDummyCreds = () => {
    window.localStorage.setItem("DUMMY_AUTH", "true");
    setUser(MOCK_USER);
    return Promise.resolve();
  };

  const signOut = () => {
    if (SKIP_AUTH || window.localStorage.getItem("DUMMY_AUTH") === "true") {
      window.localStorage.removeItem("DUMMY_AUTH");
      setUser(null);
      return Promise.resolve();
    }
    return supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      loginWithDummyCreds,
      signOut,
      email: user?.email ?? user?.user_metadata?.email,
      username:
        user?.user_metadata?.username || // prefer explicit username set during signup
        user?.user_metadata?.full_name ||
        user?.user_metadata?.user_name ||
        user?.user_metadata?.name ||
        user?.email ||
        user?.id,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
