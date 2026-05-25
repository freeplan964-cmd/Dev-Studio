import { type ReactNode } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function InnerSidebar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col h-full min-h-0", className)}>{children}</div>;
}

export function InnerSidebarHeader({
  icon,
  title,
  count,
  onAdd,
  addLabel = "New",
}: {
  icon: ReactNode;
  title: string;
  count?: number;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="px-3 py-2.5 border-b border-border/60 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
          {icon}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
          {title}
          {count !== undefined ? ` (${count})` : ""}
        </span>
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="size-6 rounded-lg bg-primary/10 grid place-items-center text-primary hover:bg-primary/20 transition-colors shrink-0"
          title={addLabel}
        >
          <Plus className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export function InnerSidebarSearch({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="px-2 pt-2 shrink-0">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-muted/40 border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs h-auto outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
        />
      </div>
    </div>
  );
}

export function InnerSidebarFilters({
  filters,
  active,
  onChange,
  wrap = false,
}: {
  filters: { label: string; value: string; count?: number }[];
  active: string;
  onChange: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2 pt-1.5 pb-1.5 flex items-center gap-1 shrink-0",
        wrap && "flex-wrap",
      )}
    >
      {filters.map((f) => {
        if (f.value !== "all" && f.count === 0) return null;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={cn(
              "text-[10px] px-2 py-1 rounded-lg font-medium transition-colors",
              active === f.value
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {f.label}
            {f.count != null && f.value !== "all" && f.count > 0 && (
              <span className="ml-1 opacity-60">({f.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function InnerSidebarDivider() {
  return <div className="mx-2 border-t border-border/60 shrink-0" />;
}

export function InnerSidebarList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <nav className={cn("overflow-y-auto p-2 space-y-0.5 scrollbar-thin flex-1", className)}>
      {children}
    </nav>
  );
}

export function InnerSidebarItem({
  active,
  onClick,
  onDelete,
  deleteLabel = "Delete",
  children,
}: {
  active: boolean;
  onClick: () => void;
  onDelete?: () => void;
  deleteLabel?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer",
        active
          ? "bg-primary/10 text-primary ring-1 ring-primary/20"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
      )}
      onClick={onClick}
    >
      <div className={cn(onDelete && "pr-6")}>{children}</div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          title={deleteLabel}
        >
          <Trash2 className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export function InnerSidebarEmpty({
  message,
  icon,
}: {
  message: string;
  icon?: ReactNode;
}) {
  return (
    <div className="px-3 py-10 text-xs text-muted-foreground border border-dashed border-border/60 rounded-xl text-center flex flex-col items-center gap-2 m-2">
      <div className="size-8 rounded-xl bg-muted/30 grid place-items-center">
        {icon ?? <Plus className="size-4 opacity-50" />}
      </div>
      {message}
    </div>
  );
}

export function InnerSidebarAddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <div className="px-2 pb-2 shrink-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition-colors border border-primary/20"
      >
        <Plus className="size-3.5" />
        {label}
      </button>
    </div>
  );
}
