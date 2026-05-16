import { Users, Building2, Briefcase, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
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

export function ConnectorsSidebar({
  type,
  connectors,
  activeConnectorId,
  onSelectConnector,
  onNewConnector,
  onDeleteConnector,
}: ConnectorsSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const typeConnectors = connectors.filter((c) => c.type === type);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              {type === "companies" && <Building2 className="size-5" />}
              {type === "hr" && <Briefcase className="size-5" />}
              {type === "clients" && <Users className="size-5" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold capitalize">{type.replace("-", " ")}</h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                CRM Network
              </p>
            </div>
          </div>
          <button
            onClick={onNewConnector}
            className="flex items-center gap-1.5 text-[11px] font-medium bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="size-3.5" /> New
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {typeConnectors.length > 0 ? (
          typeConnectors.map((connector) => (
            <div
              key={connector.id}
              className={`group relative w-full text-left px-3 py-2.5 rounded-md text-sm transition-all cursor-pointer border ${
                activeConnectorId === connector.id
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-card hover:text-foreground border-transparent"
              }`}
              onClick={() => onSelectConnector(connector.id)}
            >
              <div className="pr-6">
                <div className={`truncate leading-snug ${activeConnectorId === connector.id ? "font-medium text-foreground" : ""}`}>
                  {connector.name || "Unnamed Contact"}
                </div>
                <div className="truncate text-[11px] text-muted-foreground mt-0.5 opacity-80">
                  {connector.email || connector.phone || "No contact info"}
                </div>
                <div className="text-[10px] opacity-70 mt-1 flex items-center gap-2">
                  <span className={`shrink-0 w-1 h-1 rounded-full ${activeConnectorId === connector.id ? "bg-primary" : "bg-muted-foreground"}`} />
                  {new Date(connector.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(connector.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                title="Delete contact"
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
            No contacts yet
          </div>
        )}
      </nav>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => { if (!open) setPendingDeleteId(null); }}
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
