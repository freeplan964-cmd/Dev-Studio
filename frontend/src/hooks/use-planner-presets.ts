import { useQuery } from "@tanstack/react-query";
import { getPlannerPresets, type PlannerPresetsResponse } from "../lib/api/planner";

export function usePlannerPresets() {
  const { data, isLoading, error } = useQuery<PlannerPresetsResponse>({
    queryKey: ["planner-presets"],
    queryFn: getPlannerPresets,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    data: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}
