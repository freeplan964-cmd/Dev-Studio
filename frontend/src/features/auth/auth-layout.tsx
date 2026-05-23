import { Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface AuthLayoutProps {
  children: React.ReactNode;
  showBackHome?: boolean;
}

export function AuthLayout({ children, showBackHome = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="size-9 rounded-xl bg-primary grid place-items-center shadow-sm">
            <Flame className="size-4.5 text-primary-foreground" />
          </div>
          <div className="leading-tight text-left">
            <div className="font-semibold tracking-tight">Dev Studio</div>
            <div className="text-[10px] text-muted-foreground font-mono">your dev hub</div>
          </div>
        </div>

        {children}

        {showBackHome && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              ← Back home
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
