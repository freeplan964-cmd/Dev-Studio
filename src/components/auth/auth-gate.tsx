import { useEffect, useState } from "react";
import { Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const PUBLIC_ROUTES = ["/auth", "/reset-password"];

export function AuthGate() {
  const { isReady, user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    if (isReady && !user && !isPublic) {
      router.navigate({ to: "/auth" });
    }
  }, [isReady, user, isPublic, router]);

  useEffect(() => {
    if (!isReady) {
      const interval = setInterval(() => {
        setLoadingTime(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
        {loadingTime > 2 && (
          <div className="text-center text-sm text-red-500 max-w-md p-4 bg-red-500/10 rounded-md">
            <p className="font-bold mb-2">Authentication is taking longer than expected.</p>
            <p>Please check your browser console for errors.</p>
            <p className="mt-2 text-xs opacity-70">
              Supabase URL configured: {import.meta.env.VITE_SUPABASE_URL ? "Yes" : "No"} <br/>
              Supabase Key configured: {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? "Yes" : "No"}
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              onClick={() => window.location.reload()}
            >
              Force Reload
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isPublic) {
    return <Outlet />;
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
