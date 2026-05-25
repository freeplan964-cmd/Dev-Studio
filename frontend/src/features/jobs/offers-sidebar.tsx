import { Plus, Handshake } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { FreelanceOffer } from "@/types/jobs";
import { OFFER_STATUS_COLORS, PLATFORM_COLORS, OFFER_STATUS_LABELS } from "@/constants";
import {
  InnerSidebar,
  InnerSidebarHeader,
  InnerSidebarSearch,
  InnerSidebarFilters,
  InnerSidebarDivider,
  InnerSidebarAddButton,
} from "@/components/layout";

interface Props {
  offers: FreelanceOffer[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function OffersSidebar({ offers, activeId, onSelect, onAdd }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTERS = [
    { label: "All", value: "all" },
    { label: "New", value: "new", count: offers.filter((o) => o.status === "new").length },
    {
      label: "In Review",
      value: "in_review",
      count: offers.filter((o) => o.status === "in_review").length,
    },
    {
      label: "Accepted",
      value: "accepted",
      count: offers.filter((o) => o.status === "accepted").length,
    },
    {
      label: "Done",
      value: "completed",
      count: offers.filter((o) => o.status === "completed").length,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: offers.filter((o) => o.status === "rejected").length,
    },
  ];

  const filtered = offers.filter((o) => {
    const matchesSearch =
      (o.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.client ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.platform ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 20);

  return (
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<Handshake className="size-3.5" />}
        title="Offers"
        count={offers.length}
        onAdd={onAdd}
        addLabel="Add Offer"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search offers…"
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
            <Handshake className="size-8 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">
              {searchQuery || activeFilter !== "all"
                ? "No matching offers"
                : "No offers tracked yet."}
            </p>
            {!searchQuery && activeFilter === "all" && (
              <p className="text-[10px] text-muted-foreground/60">
                Add offers from Mostaql, Upwork, Fiverr, etc.
              </p>
            )}
          </div>
        )}
        <ul className="space-y-0.5">
          {paged.map((offer) => (
            <li key={offer.id}>
              <button
                onClick={() => onSelect(offer.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                  activeId === offer.id
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <p className="text-xs font-medium truncate leading-snug">{offer.title}</p>
                {offer.client && (
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                    {offer.client}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {offer.platform && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-lg font-medium ${PLATFORM_COLORS[offer.platform] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {offer.platform}
                    </span>
                  )}
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-lg border font-medium ${OFFER_STATUS_COLORS[offer.status] ?? ""}`}
                  >
                    {OFFER_STATUS_LABELS[offer.status] ?? offer.status}
                  </span>
                  {offer.budget && (
                    <span className="text-[9px] text-green-400 font-medium">
                      {offer.budget} {offer.currency}
                    </span>
                  )}
                  {offer.category && (
                    <span className="text-[9px] text-muted-foreground/70 truncate">
                      {offer.category}
                    </span>
                  )}
                  {offer.deadline && (
                    <span className="text-[9px] text-muted-foreground/60">Due {offer.deadline}</span>
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
      <InnerSidebarAddButton onClick={onAdd} label="Add Offer" />
    </InnerSidebar>
  );
}
