import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { MyService } from "@/types/jobs";
import { SERVICE_STATUS_COLORS, PLATFORM_COLORS, SERVICE_STATUS_LABELS } from "@/constants";
import {
  InnerSidebar,
  InnerSidebarHeader,
  InnerSidebarSearch,
  InnerSidebarFilters,
  InnerSidebarDivider,
  InnerSidebarAddButton,
} from "@/components/layout";

interface Props {
  services: MyService[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function ServicesSidebar({ services, activeId, onSelect, onAdd }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTERS = [
    { label: "All", value: "all" },
    {
      label: "Active",
      value: "active",
      count: services.filter((s) => s.status === "active").length,
    },
    {
      label: "Paused",
      value: "paused",
      count: services.filter((s) => s.status === "paused").length,
    },
    {
      label: "Draft",
      value: "draft",
      count: services.filter((s) => s.status === "draft").length,
    },
  ];

  const filtered = services.filter((s) => {
    const matchesSearch =
      (s.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.category ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.platform ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || s.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 20);

  return (
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<Star className="size-3.5" />}
        title="Services"
        count={services.length}
        onAdd={onAdd}
        addLabel="Add Service"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search services…"
      />
      <InnerSidebarFilters
        filters={FILTERS}
        active={activeFilter}
        onChange={setActiveFilter}
        wrap
      />
      <InnerSidebarDivider />
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center px-4">
            <Star className="size-8 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">
              {searchQuery || activeFilter !== "all"
                ? "No matching services"
                : "No services listed yet."}
            </p>
            {!searchQuery && activeFilter === "all" && (
              <p className="text-[10px] text-muted-foreground/60">
                Add your Fiverr, Mostaql, or Khamsat gigs.
              </p>
            )}
          </div>
        )}
        <ul className="space-y-0.5">
          {paged.map((svc) => (
            <li key={svc.id}>
              <button
                onClick={() => onSelect(svc.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                  activeId === svc.id
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <p className="text-xs font-medium truncate leading-snug">{svc.title}</p>
                {svc.category && (
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                    {svc.category}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {svc.platform && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-lg font-medium ${PLATFORM_COLORS[svc.platform] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {svc.platform}
                    </span>
                  )}
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-lg border font-medium ${SERVICE_STATUS_COLORS[svc.status] ?? ""}`}
                  >
                    {SERVICE_STATUS_LABELS[svc.status] ?? svc.status}
                  </span>
                  {svc.price && (
                    <span className="text-[9px] text-green-400 font-medium">
                      {svc.price} {svc.currency}
                    </span>
                  )}
                  {svc.deliveryDays && (
                    <span className="text-[9px] text-muted-foreground/60">
                      {svc.deliveryDays}d delivery
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <InnerSidebarAddButton onClick={onAdd} label="Add Service" />
    </InnerSidebar>
  );
}
