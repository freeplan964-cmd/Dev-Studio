import { Users, Building2, Briefcase, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { Connector } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ConnectorsSidebarProps {
  type: string;
  connectors: Connector[];
  activeConnectorId: string | null;
  onSelectConnector: (id: string) => void;
  onNewConnector: () => void;
  onDeleteConnector: (id: string) => void;
}

const TypeIcon = ({ type }: { type: string }) => {
  if (type === "companies") return <Building2 className="size-3.5" />;
  if (type === "hr") return <Briefcase className="size-3.5" />;
  return <Users className="size-3.5" />;
};

type ContactFilter = "all" | "email" | "phone";

const FILTERS: { label: string; value: ContactFilter }[] = [
  { label: "All", value: "all" },
  { label: "Has Email", value: "email" },
  { label: "Has Phone", value: "phone" },
];

export function ConnectorsSidebar({
  type,
  connectors,
  activeConnectorId,
  onSelectConnector,
  onNewConnector,
  onDeleteConnector,
}: ConnectorsSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ContactFilter>("all");

  const typeConnectors = connectors.filter((c) => c.type === type);

  const filtered = typeConnectors.filter((c) => {
    const matchesSearch =
      (c.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "email" && !!c.email) ||
      (activeFilter === "phone" && !!c.phone);
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
            <TypeIcon type={type} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 capitalize">
            {type} ({typeConnectors.length})
          </span>
        </div>
        <button
          onClick={onNewConnector}
          className="size-6 rounded-lg bg-primary/10 grid place-items-center text-primary hover:bg-primary/20 transition-colors shrink-0"
          title="New Contact"
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
            placeholder="Search contacts…"
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
          paged.map((connector) => (
            <div
              key={connector.id}
              className={`group relative w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeConnectorId === connector.id
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => onSelectConnector(connector.id)}
            >
              <div className="pr-6">
                <div
                  className={`truncate leading-snug text-xs font-medium ${activeConnectorId === connector.id ? "text-foreground" : ""}`}
                >
                  {connector.name || "Unnamed Contact"}
                </div>
                <div className="truncate text-[10px] text-muted-foreground mt-0.5">
                  {connector.email || connector.phone || "No contact info"}
                </div>
                <div className="text-[9px] text-muted-foreground/60 mt-1">
                  {new Date(connector.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(connector.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                title="Delete contact"
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
            {searchQuery || activeFilter !== "all" ? "No matching contacts" : "No contacts yet"}
          </div>
        )}
      </nav>

      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {/* Bottom Action */}
      <div className="px-2 pb-2 shrink-0">
        <button
          onClick={onNewConnector}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition-colors border border-primary/20"
        >
          <Plus className="size-3.5" /> New Contact
        </button>
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="Delete contact?"
        description="This contact will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteConnector(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
