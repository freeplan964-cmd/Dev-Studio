import { Linkedin, Twitter, Instagram } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { SocialDraft } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ONE_WEEK_MS, SOCIAL_DATE_FILTERS } from "@/constants";
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

interface SocialSidebarProps {
  platform: string;
  drafts: SocialDraft[];
  activeDraftId: string | null;
  onSelectDraft: (id: string) => void;
  onNewDraft: () => void;
  onDeleteDraft: (id: string) => void;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === "linkedin") return <Linkedin className="size-3.5" />;
  if (platform === "twitter") return <Twitter className="size-3.5" />;
  return <Instagram className="size-3.5" />;
};

export function SocialSidebar({
  platform,
  drafts,
  activeDraftId,
  onSelectDraft,
  onNewDraft,
  onDeleteDraft,
}: SocialSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const now = Date.now();
  const platformDrafts = drafts.filter((d) => d.platform === platform);

  const filtered = platformDrafts.filter((d) => {
    const matchesSearch = (d.content?.toLowerCase() ?? "").includes(searchQuery.toLowerCase());
    const age = now - new Date(d.updatedAt).getTime();
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "recent" && age <= ONE_WEEK_MS) ||
      (activeFilter === "older" && age > ONE_WEEK_MS);
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);

  return (
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<PlatformIcon platform={platform} />}
        title={platform}
        count={platformDrafts.length}
        onAdd={onNewDraft}
        addLabel="New Draft"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search drafts…"
      />
      <InnerSidebarFilters filters={SOCIAL_DATE_FILTERS} active={activeFilter} onChange={setActiveFilter} />
      <InnerSidebarDivider />
      <InnerSidebarList>
        {filtered.length > 0 ? (
          paged.map((draft) => (
            <InnerSidebarItem
              key={draft.id}
              active={activeDraftId === draft.id}
              onClick={() => onSelectDraft(draft.id)}
              onDelete={() => setPendingDeleteId(draft.id)}
              deleteLabel="Delete draft"
            >
              <div
                className={`truncate leading-snug text-xs font-medium ${activeDraftId === draft.id ? "text-foreground" : ""}`}
              >
                {draft.content || "Untitled Draft"}
              </div>
              <div className="text-[9px] text-muted-foreground/60 mt-1">
                {new Date(draft.updatedAt).toLocaleDateString()}
              </div>
            </InnerSidebarItem>
          ))
        ) : (
          <InnerSidebarEmpty
            message={
              searchQuery || activeFilter !== "all" ? "No matching drafts" : "No drafts yet"
            }
          />
        )}
      </InnerSidebarList>
      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <InnerSidebarAddButton onClick={onNewDraft} label="New Draft" />
      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="Delete draft?"
        description="This draft will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteDraft(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </InnerSidebar>
  );
}
