import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn("flex flex-col flex-1 overflow-hidden p-2 sm:p-3 gap-2 sm:gap-3", className)}
    >
      {children}
    </div>
  );
}
