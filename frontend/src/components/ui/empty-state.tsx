import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_STYLES = {
  sm: { wrapper: "py-8", icon: "size-8", iconWrap: "size-12", title: "text-sm", desc: "text-xs" },
  md: { wrapper: "py-12", icon: "size-10", iconWrap: "size-16", title: "text-base", desc: "text-sm" },
  lg: { wrapper: "py-20", icon: "size-12", iconWrap: "size-20", title: "text-lg", desc: "text-sm" },
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  const s = SIZE_STYLES[size];
  const ActionIcon = action?.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-3",
        s.wrapper,
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            "rounded-2xl bg-muted/60 grid place-items-center text-muted-foreground shrink-0",
            s.iconWrap,
          )}
        >
          <Icon className={cn(s.icon)} strokeWidth={1.5} />
        </div>
      )}

      <div className="space-y-1 max-w-xs">
        <p className={cn("font-semibold text-foreground", s.title)}>{title}</p>
        {description && (
          <p className={cn("text-muted-foreground leading-relaxed", s.desc)}>{description}</p>
        )}
      </div>

      {action && (
        <Button size="sm" onClick={action.onClick} className="mt-1 gap-1.5">
          {ActionIcon && <ActionIcon className="size-3.5" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}
