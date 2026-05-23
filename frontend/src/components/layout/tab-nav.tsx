import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  to?: string;
  search?: Record<string, unknown>;
  onClick?: () => void;
  badge?: number | string;
}

interface TabNavProps {
  tabs: TabItem[];
  activeTab: string;
  className?: string;
}

export function TabNav({ tabs, activeTab, className = "" }: TabNavProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex w-max min-w-full sm:justify-start">
        <div className="w-1 shrink-0 sm:hidden" />

        <nav
          className="flex shrink-0 items-center gap-1 p-1 bg-muted/40 border border-border/60 rounded-2xl"
          aria-label="Tabs"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;

            const content = (
              <>
                {Icon && (
                  <Icon
                    className={`size-3.5 shrink-0 transition-colors ${
                      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                {tab.badge != null && tab.badge !== 0 && (
                  <span
                    className={`min-w-[16px] text-center text-[10px] leading-none px-1 py-0.5 rounded-full ${
                      active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </>
            );

            const baseClass = `group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all rounded-xl whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              active
                ? "bg-background text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            }`;

            if (tab.to) {
              return (
                <Link key={tab.id} to={tab.to} search={tab.search} className={baseClass}>
                  {content}
                </Link>
              );
            }

            return (
              <button key={tab.id} onClick={tab.onClick} className={baseClass}>
                {content}
              </button>
            );
          })}
        </nav>

        <div className="w-4 shrink-0 sm:hidden" />
      </div>
    </div>
  );
}
