import { apiFetch } from "./base";
import type { PlannerTask } from "../../types/planner";

export async function getPlannerTasks(from: string, to: string): Promise<PlannerTask[]> {
  try {
    return await apiFetch<PlannerTask[]>(`/api/planner?from=${from}&to=${to}`);
  } catch {
    return [];
  }
}

export async function upsertPlannerTask(task: Partial<PlannerTask>): Promise<PlannerTask> {
  return apiFetch<PlannerTask>("/api/planner", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function deletePlannerTask(id: string): Promise<void> {
  await apiFetch<void>(`/api/planner/${id}`, { method: "DELETE" });
}

export async function getAISuggestions(
  date: string,
  tasks: PlannerTask[],
): Promise<{ suggestions: string[]; schedule: string }> {
  return apiFetch("/api/planner/suggest", {
    method: "POST",
    body: JSON.stringify({ date, tasks }),
  });
}

export interface PlannerPresetItem {
  title: string;
  time: string;
}

export interface ActivitySuggestion {
  iconName: string;
  label: string;
  bestTime: string;
  reason: string;
}

export interface PrayerSuggestionTemplate {
  iconName: string;
  label: string;
  offsetStart?: number;
  offsetEnd?: number;
  anchorStart?: string;
  anchorEnd?: string;
  anchor?: string;
  fallbackTime: string;
  fallbackReason: string;
  reasonTemplate: string;
}

export interface PlannerPresetsResponse {
  presets: {
    food: PlannerPresetItem[];
    sports: PlannerPresetItem[];
    care: PlannerPresetItem[];
    working: PlannerPresetItem[];
    learning: PlannerPresetItem[];
  };
  suggestions: {
    working: ActivitySuggestion[];
    learning: ActivitySuggestion[];
    prayerTemplates: {
      food: PrayerSuggestionTemplate[];
      sports: PrayerSuggestionTemplate[];
      care: PrayerSuggestionTemplate[];
    };
  };
}

export async function getPlannerPresets(): Promise<PlannerPresetsResponse> {
  return apiFetch<PlannerPresetsResponse>("/api/planner/presets");
}

