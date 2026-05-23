import { useState, useMemo, useEffect } from "react";

export function usePagination<T>(items: T[], pageSize = 15) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [items.length]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const paged = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize],
  );

  return {
    page: safePage,
    setPage,
    totalPages,
    paged,
    total: items.length,
    pageSize,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
