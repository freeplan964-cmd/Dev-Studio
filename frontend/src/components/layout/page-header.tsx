import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
  className = "",
}: {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {Icon && (
        <div className="size-9 sm:size-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
          <Icon className="size-[18px] sm:size-5 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-0.5">
              {eyebrow}
            </p>
          )}
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight leading-tight">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
