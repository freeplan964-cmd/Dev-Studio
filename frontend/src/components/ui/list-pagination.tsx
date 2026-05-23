import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function ListPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  className = "",
}: ListPaginationProps) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = buildPageNumbers(page, totalPages);

  return (
    <div
      className={`flex items-center justify-between gap-1 px-2 py-2 border-t border-border shrink-0 ${className}`}
    >
      <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap">
        {from}–{to} / {total}
      </span>

      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="size-5 grid place-items-center rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-3" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e-${i}`} className="text-[10px] text-muted-foreground px-0.5 leading-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`min-w-[20px] h-5 px-1 text-[10px] rounded font-medium transition-colors ${
                page === p
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="size-5 grid place-items-center rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="size-3" />
        </button>
      </div>
    </div>
  );
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
