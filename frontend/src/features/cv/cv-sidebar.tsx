import { FileText } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { CVProfile, CVFocus } from "@/types/cv";
import { FOCUS_LABELS } from "@/types/cv";
import { CV_FOCUS_COLORS } from "@/constants";
import {
  InnerSidebar,
  InnerSidebarHeader,
  InnerSidebarSearch,
  InnerSidebarFilters,
  InnerSidebarDivider,
  InnerSidebarList,
  InnerSidebarItem,
  InnerSidebarEmpty,
  InnerSidebarAddButton,
} from "@/components/layout";

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
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<FileText className="size-3.5" />}
        title="CV Profiles"
        count={cvProfiles.length}
        onAdd={onNewCV}
        addLabel="New CV Profile"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search profiles…"
      />
      <InnerSidebarFilters
        filters={FILTERS}
        active={activeFilter}
        onChange={(v) => setActiveFilter(v as CVFocus | "all")}
      />
      <InnerSidebarDivider />
      <InnerSidebarList>
        {filtered.length > 0 ? (
          filtered.map((cv) => (
            <InnerSidebarItem
              key={cv.id}
              active={activeCVId === cv.id}
              onClick={() => onSelectCV(cv.id)}
              onDelete={() => setPendingDeleteId(cv.id)}
              deleteLabel="Delete CV"
            >
              <div
                className={`truncate leading-snug text-xs font-medium ${activeCVId === cv.id ? "text-foreground" : ""}`}
              >
                {cv.title || "Untitled CV"}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center text-[9px] px-1.5 py-0.5 rounded-lg border font-medium ${CV_FOCUS_COLORS[cv.focus]}`}
                >
                  {FOCUS_LABELS[cv.focus]}
                </span>
                <span className="text-[9px] text-muted-foreground/60">
                  {new Date(cv.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </InnerSidebarItem>
          ))
        ) : (
          <InnerSidebarEmpty
            message={
              searchQuery || activeFilter !== "all"
                ? "No matching profiles"
                : "No CVs yet — create your first one"
            }
          />
        )}
      </InnerSidebarList>
      <InnerSidebarAddButton onClick={onNewCV} label="New CV Profile" />
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
    </InnerSidebar>
  );
}
