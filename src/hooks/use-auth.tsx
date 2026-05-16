import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export interface ReplitUser {
  id: string;
  name: string;
  profileImage?: string;
  email?: string;
}

export interface UserProfile {
  displayName: string | null;
  avatarUrl: string | null;
  location: string | null;
}

interface AuthContextValue {
  user: ReplitUser | null;
  profile: UserProfile;
  isReady: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const defaultProfile: UserProfile = { displayName: null, avatarUrl: null, location: null };

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ReplitUser | null>(null);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isReady, setIsReady] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const r = await fetch("/api/profile");
      if (r.ok) {
        const data = await r.json();
        setProfile({
          displayName: data.displayName ?? null,
          avatarUrl: data.avatarUrl ?? null,
          location: data.location ?? null,
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/auth/user")
      .then((r) => (r.ok ? r.json() : null))
      .then(async (u) => {
        setUser(u);
        if (u) await fetchProfile();
        setIsReady(true);
      })
      .catch(() => {
        setUser(null);
        setIsReady(true);
      });
  }, [fetchProfile]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setProfile(defaultProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, isReady, signOut, refreshProfile: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
