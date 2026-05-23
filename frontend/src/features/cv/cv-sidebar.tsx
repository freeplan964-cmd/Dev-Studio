import { FileText, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { CVProfile, CVFocus } from "@/types/cv";
import { FOCUS_COLORS, FOCUS_LABELS } from "@/types/cv";

interface CVSidebarProps {
  cvProfiles: CVProfile[];
  activeCVId: string | null;
  onSelectCV: (id: string) => void;
  onNewCV: () => void;
  onDeleteCV: (id: string) => void;
}

const FILTERS: { label: string; value: CVFocus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Fullstack", value: "fullstack" },
];

export function CVSidebar({
  cvProfiles,
  activeCVId,
  onSelectCV,
  onNewCV,
  onDeleteCV,
}: CVSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<CVFocus | "all">("all");

  const filtered = cvProfiles.filter((cv) => {
    const matchesSearch = (cv.title ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || cv.focus === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
            <FileText className="size-3.5" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
            CV Profiles ({cvProfiles.length})
          </span>
        </div>
        <button
          onClick={onNewCV}
          className="size-6 rounded-lg bg-primary/10 grid place-items-center text-primary hover:bg-primary/20 transition-colors shrink-0"
          title="New CV Profile"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-2 pt-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search profiles…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/40 border border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-2 pt-1.5 pb-1.5 flex items-center gap-1 shrink-0">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`text-[10px] px-2 py-1 rounded-lg font-medium transition-colors ${
              activeFilter === f.value
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-2 border-t border-border/60 shrink-0" />

      {/* List */}
      <nav className="overflow-y-auto p-2 space-y-0.5 scrollbar-thin flex-1">
        {filtered.length > 0 ? (
          filtered.map((cv) => (
            <div
              key={cv.id}
              className={`group relative w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeCVId === cv.id
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => onSelectCV(cv.id)}
            >
              <div className="pr-6">
                <div
                  className={`truncate leading-snug text-xs font-medium ${activeCVId === cv.id ? "text-foreground" : ""}`}
                >
                  {cv.title || "Untitled CV"}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center text-[9px] px-1.5 py-0.5 rounded-lg border font-medium ${FOCUS_COLORS[cv.focus]}`}
                  >
                    {FOCUS_LABELS[cv.focus]}
                  </span>
                  <span className="text-[9px] text-muted-foreground/60">
                    {new Date(cv.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(cv.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="px-3 py-10 text-xs text-muted-foreground border border-dashed border-border/60 rounded-xl text-center flex flex-col items-center gap-2 m-2">
            <div className="size-8 rounded-xl bg-muted/30 grid place-items-center">
              <Plus className="size-4 opacity-50" />
            </div>
            {searchQuery || activeFilter !== "all"
              ? "No matching profiles"
              : "No CVs yet — create your first one"}
          </div>
        )}
      </nav>

      {/* Bottom Action */}
      <div className="px-2 pb-2 shrink-0">
        <button
          onClick={onNewCV}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition-colors border border-primary/20"
        >
          <Plus className="size-3.5" /> New CV Profile
        </button>
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="Delete CV?"
        description="This CV profile will be permanently removed."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteCV(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
