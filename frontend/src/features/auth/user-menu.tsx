import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/components/ui/user-avatar";

export function UserMenu({ isCollapsed }: { isCollapsed?: boolean }) {
  const { user, profile, signOut } = useAuth();

  const displayName = profile.displayName || user?.name || "Account";

  return (
    <div
      className={`flex items-center rounded-xl ${isCollapsed ? "justify-center p-1" : "gap-2 px-2 py-1.5 hover:bg-muted/40 transition-colors"}`}
    >
      <Link
        to="/profile"
        title={isCollapsed ? displayName : undefined}
        className={`flex items-center group ${isCollapsed ? "justify-center" : "gap-2 flex-1 min-w-0"}`}
      >
        <UserAvatar name={displayName} avatarUrl={profile.avatarUrl} size="sm" />
        {!isCollapsed && (
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs font-medium truncate group-hover:text-foreground transition-colors">
              {displayName}
            </span>
            {user?.email && (
              <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
            )}
          </div>
        )}
      </Link>
      {!isCollapsed && (
        <button
          onClick={signOut}
          title="Sign out"
          className="size-7 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all active:scale-90 shrink-0"
        >
          <LogOut className="size-3.5" />
        </button>
      )}
    </div>
  );
}
