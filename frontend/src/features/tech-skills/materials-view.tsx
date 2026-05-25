import { useState } from "react";
import { Search, BookOpen, ExternalLink, type LucideIcon } from "lucide-react";
import { SplitLayout } from "@/components/layout";
import { cn } from "@/lib/utils";
import {
  MATERIAL_FILTERS,
  TYPE_LABELS,
  type MaterialType,
  type Material,
} from "@/data/materials";
import { MATERIAL_AREA_GROUPS, MATERIAL_TYPE_COLORS } from "@/constants";

export function MaterialsView() {
  const [activeArea, setActiveArea] = useState("frontend");
  const [filter, setFilter] = useState<MaterialType | "all">("all");
  const [search, setSearch] = useState("");

  // Get all areas from groups
  const allAreas = MATERIAL_AREA_GROUPS.flatMap((g) => g.areas);
  const area = allAreas.find((a) => a.id === activeArea) ?? allAreas[0];
  const AreaIcon = area.icon as LucideIcon;

  // Filter materials based on search and type
  const items = (area.materials || []).filter((m: Material) => {
    const matchesFilter = filter === "all" || m.type === filter;
    const matchesSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.author ?? "").toLowerCase().includes(search.toLowerCase()) ||
      m.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAreaChange = (id: string) => {
    setActiveArea(id);
    setFilter("all");
    setSearch("");
  };

  const sidebar = (
    <div className="h-full flex flex-col min-h-0">
      <div className="px-3 py-3 border-b border-border/60 shrink-0 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
            <BookOpen className="size-3.5" />
          </div>
          <span className="flex-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 truncate">
            Materials
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-muted/40 border border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin space-y-3">
        {MATERIAL_AREA_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 pt-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              {group.label}
            </p>
            <nav className="space-y-0.5">
              {group.areas.map((a) => {
                const Icon = a.icon as LucideIcon;
                const isActive = activeArea === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => handleAreaChange(a.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="size-3 shrink-0" />
                      <span className={isActive ? "text-foreground" : ""}>{a.label}</span>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold tabular-nums",
                        isActive ? "text-primary/70" : "text-muted-foreground/50",
                      )}
                    >
                      {a.materials?.length ?? 0}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[220px]">
      <div className="h-full flex flex-col overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-border/60 shrink-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-primary/10 grid place-items-center text-primary shrink-0">
                <AreaIcon className="size-3.5" />
              </div>
              <span className="text-sm font-semibold text-foreground">{area.label}</span>
              <span className="text-xs text-muted-foreground">
                · {items.length} resource{items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {MATERIAL_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as MaterialType | "all")}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-medium border transition-all",
                    filter === f.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted/70",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((m: Material) => (
                <a
                  key={m.url}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                          MATERIAL_TYPE_COLORS[m.type],
                        )}
                      >
                        {TYPE_LABELS[m.type]}
                      </span>
                      {m.free && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          Free
                        </span>
                      )}
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {m.title}
                    </p>
                    {m.author && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">by {m.author}</p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{m.desc}</p>
                </a>
              ))}
              {items.length === 0 && (
                <div className="col-span-full text-center py-16 text-sm text-muted-foreground italic">
                  No {filter === "all" ? "" : filter + " "}resources found
                  {search ? ` for "${search}"` : ""}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SplitLayout>
  );
}
