import { Users, Building2, Briefcase } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { Connector } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CONNECTOR_CONTACT_FILTERS } from "@/constants";
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
  const [activeFilter, setActiveFilter] = useState("all");

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
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<TypeIcon type={type} />}
        title={type}
        count={typeConnectors.length}
        onAdd={onNewConnector}
        addLabel="New Contact"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search contacts…"
      />
      <InnerSidebarFilters filters={CONNECTOR_CONTACT_FILTERS} active={activeFilter} onChange={setActiveFilter} />
      <InnerSidebarDivider />
      <InnerSidebarList>
        {filtered.length > 0 ? (
          paged.map((connector) => (
            <InnerSidebarItem
              key={connector.id}
              active={activeConnectorId === connector.id}
              onClick={() => onSelectConnector(connector.id)}
              onDelete={() => setPendingDeleteId(connector.id)}
              deleteLabel="Delete contact"
            >
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
            </InnerSidebarItem>
          ))
        ) : (
          <InnerSidebarEmpty
            message={
              searchQuery || activeFilter !== "all" ? "No matching contacts" : "No contacts yet"
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
      <InnerSidebarAddButton onClick={onNewConnector} label="New Contact" />
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
    </InnerSidebar>
  );
}
