import * as React from "react";
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplitLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: string;
  className?: string;
  defaultOpen?: boolean;
}

export function SplitLayout({
  sidebar,
  children,
  sidebarWidth = "w-64",
  className = "",
  defaultOpen = false,
}: SplitLayoutProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  // Close sidebar on mobile by default
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  // Ensure there's a base width if only responsive widths are provided
  const sidebarWidthClass = React.useMemo(() => {
    const hasBaseWidth =
      /(^|\s)w-([^\d]|\[)/.test(sidebarWidth) || /(^|\s)w-\d+/.test(sidebarWidth);
    if (!hasBaseWidth) {
      return `w-72 ${sidebarWidth}`;
    }
    return sidebarWidth;
  }, [sidebarWidth]);

  // Extract numeric value for the toggle button position and inner content width
  const widthValue = React.useMemo(() => {
    const bracketMatch = sidebarWidthClass.match(/\[(.*?)\]/);
    let baseWidth = "288px";

    if (bracketMatch) {
      baseWidth = bracketMatch[1];
    } else if (sidebarWidthClass.includes("w-80")) {
      baseWidth = "320px";
    } else if (sidebarWidthClass.includes("w-72")) {
      baseWidth = "288px";
    } else if (sidebarWidthClass.includes("w-64")) {
      baseWidth = "256px";
    } else if (sidebarWidthClass.includes("w-60")) {
      baseWidth = "240px";
    }

    // On mobile, ensure sidebar doesn't take more than 70% of width
    // This provides a more balanced view on very narrow screens
    return `min(${baseWidth}, 70vw)`;
  }, [sidebarWidthClass]);

  return (
    <div
      className={cn("flex h-full min-h-0 bg-background relative overflow-hidden", className)}
      style={{ "--sidebar-width": widthValue } as React.CSSProperties}
    >
      {/* Sidebar - Pushes content, no overlay */}
      <aside
        className={cn(
          "flex flex-col shrink-0 border-r border-border bg-muted/10 transition-[width] duration-300 ease-in-out overflow-hidden relative",
          !isOpen && "w-0 border-r-0",
        )}
        style={{ width: isOpen ? "var(--sidebar-width)" : "0" }}
      >
        <div
          className={cn(
            "flex-1 flex flex-col transition-opacity duration-200 overflow-y-auto overflow-x-hidden scrollbar-thin relative group/sidebar",
            isOpen ? "opacity-100 delay-150" : "opacity-0 pointer-events-none",
          )}
          style={{ width: "var(--sidebar-width)" }}
        >
          {sidebar}
          
          {/* Bottom mask indicator - purely visual polish */}
          <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-muted/5 to-transparent pointer-events-none z-10 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500" />
        </div>
      </aside>

      {/* Unified Toggle Button - Works on all screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "grid place-items-center absolute top-20 z-30 size-6 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-300 group",
          isOpen ? "left-[calc(var(--sidebar-width)-12px)]" : "left-3",
        )}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="size-3.5 text-muted-foreground group-hover:text-foreground" />
        ) : (
          <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-foreground" />
        )}
      </button>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">{children}</main>
    </div>
  );
}
