import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
}

export function PageSection({ children, className }: PageSectionProps) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-2xl border border-border/60 bg-card px-4 sm:px-5 py-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
