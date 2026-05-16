import { Linkedin, Twitter, Instagram, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import type { SocialDraft } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface SocialSidebarProps {
  platform: string;
  drafts: SocialDraft[];
  activeDraftId: string | null;
  onSelectDraft: (id: string) => void;
  onNewDraft: () => void;
  onDeleteDraft: (id: string) => void;
}

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

  const platformDrafts = drafts.filter((d) =>
    d.platform === platform &&
    (d.content?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              {platform === "linkedin" && <Linkedin className="size-5" />}
              {platform === "twitter" && <Twitter className="size-5" />}
              {platform === "instagram" && <Instagram className="size-5" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold capitalize">{platform}</h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Network
              </p>
            </div>
          </div>
          <button
            onClick={onNewDraft}
            className="flex items-center gap-1.5 text-[11px] font-medium bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="size-3.5" /> New
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/50 border border-border rounded-lg py-1.5 pl-9 pr-3 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {platformDrafts.length > 0 ? (
          platformDrafts.map((draft) => (
            <div
              key={draft.id}
              className={`group relative w-full text-left px-3 py-2.5 rounded-md text-sm transition-all cursor-pointer border ${
                activeDraftId === draft.id
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-card hover:text-foreground border-transparent"
              }`}
              onClick={() => onSelectDraft(draft.id)}
            >
              <div className="pr-6">
                <div className={`truncate leading-snug ${activeDraftId === draft.id ? "font-medium text-foreground" : ""}`}>
                  {draft.content || "Untitled Draft"}
                </div>
                <div className="text-[10px] opacity-70 mt-1 flex items-center gap-2">
                  <span className={`shrink-0 w-1 h-1 rounded-full ${activeDraftId === draft.id ? "bg-primary" : "bg-muted-foreground"}`} />
                  {new Date(draft.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(draft.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                title="Delete draft"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="px-3 py-8 text-xs text-muted-foreground border border-dashed border-border rounded-lg text-center flex flex-col items-center gap-2 m-2">
            <div className="size-8 rounded-full bg-muted/20 flex items-center justify-center">
              <Plus className="size-4 opacity-50" />
            </div>
            {searchQuery ? "No matching drafts found" : "No drafts yet"}
          </div>
        )}
      </nav>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => { if (!open) setPendingDeleteId(null); }}
        title="Delete draft?"
        description="This draft will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteDraft(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
