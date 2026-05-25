import { Plus, Briefcase } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { SavedJob } from "@/types/jobs";
import { JOB_STATUS_COLORS, JOB_STATUS_LABELS, JOB_SIDEBAR_FILTERS } from "@/constants";
import { JOB_STATUSES } from "@/types/jobs";
import {
  InnerSidebar,
  InnerSidebarHeader,
  InnerSidebarSearch,
  InnerSidebarFilters,
  InnerSidebarDivider,
  InnerSidebarAddButton,
} from "@/components/layout";

interface Props {
  jobs: SavedJob[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function JobsSidebar({ jobs, activeId, onSelect, onAdd }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      (j.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.company ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || j.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 20);

  const grouped = JOB_STATUSES.reduce<Record<string, SavedJob[]>>(
    (acc, s) => {
      acc[s] = paged.filter((j) => j.status === s);
      return acc;
    },
    {} as Record<string, SavedJob[]>,
  );

  return (
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<Briefcase className="size-3.5" />}
        title="Jobs"
        count={jobs.length}
        onAdd={onAdd}
        addLabel="Add Job"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search jobs…"
      />
      <InnerSidebarFilters filters={JOB_SIDEBAR_FILTERS} active={activeFilter} onChange={setActiveFilter} />
      <InnerSidebarDivider />
      <div className="overflow-y-auto p-2 space-y-3 flex-1">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center px-4">
            <Briefcase className="size-8 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">
              {searchQuery || activeFilter !== "all" ? "No matching jobs" : "No jobs tracked yet."}
            </p>
            {!searchQuery && activeFilter === "all" && (
              <p className="text-[10px] text-muted-foreground/60">
                Browse live jobs or add one manually.
              </p>
            )}
          </div>
        )}
        {JOB_STATUSES.map((status) => {
          const items = grouped[status];
          if (!items || items.length === 0) return null;
          return (
            <div key={status}>
              <p className="px-2 mb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                {JOB_STATUS_LABELS[status]} ({items.length})
              </p>
              <ul className="space-y-0.5">
                {items.map((job) => (
                  <li key={job.id}>
                    <button
                      onClick={() => onSelect(job.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                        activeId === job.id
                          ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                          : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <p className="text-xs font-medium truncate leading-snug">{job.title}</p>
                      {job.company && (
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {job.company}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-lg border font-medium ${JOB_STATUS_COLORS[job.status] ?? ""}`}
                        >
                          {JOB_STATUS_LABELS[job.status] ?? job.status}
                        </span>
                        {job.platform && (
                          <span className="text-[9px] text-muted-foreground truncate">
                            {job.platform}
                          </span>
                        )}
                        {job.category && (
                          <span className="text-[9px] text-muted-foreground/70 truncate">
                            · {job.category}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <InnerSidebarAddButton onClick={onAdd} label="Add Job" />
    </InnerSidebar>
  );
}
