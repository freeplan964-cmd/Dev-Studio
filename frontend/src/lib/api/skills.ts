import { apiFetch } from "./base";
import { resolveIcon } from "@/lib/icons";
import type {
  SkillAreaData,
  SkillConcept,
  SkillResource,
  SkillChecklistItem,
  ServiceIntegration,
  TechAreaId,
  AreaId,
  SkillTask,
  SkillProject,
} from "@/types/skills";

// ── Raw API shapes ─────────────────────────────────────────────────────────────

interface RawSubArea {
  id: string;
  label: string;
  iconName?: string;
  color: string;
  accent: string;
  tags: string[];
  concepts?: SkillConcept[];
  resources?: SkillResource[];
  checklist?: SkillChecklistItem[];
  services?: ServiceIntegration[];
}

interface RawSkillArea {
  id: string;
  label: string;
  iconName?: string;
  description: string;
  concepts: SkillConcept[];
  resources: SkillResource[];
  checklist: SkillChecklistItem[];
  subAreasLabel?: string;
  subAreas?: RawSubArea[];
}

interface SkillAreasResponse {
  tech: Record<string, RawSkillArea>;
  soft: RawSkillArea;
}

// ── Conversion helpers ─────────────────────────────────────────────────────────

function convertArea(raw: RawSkillArea): SkillAreaData {
  return {
    ...raw,
    id: raw.id as AreaId,
    icon: resolveIcon(raw.iconName),
    subAreas: raw.subAreas?.map((sa) => ({
      ...sa,
      icon: sa.iconName ? resolveIcon(sa.iconName) : undefined,
    })),
  };
}

// ── Skill Areas ────────────────────────────────────────────────────────────────

let _skillAreasCache: SkillAreasResponse | null = null;

async function fetchSkillAreas(): Promise<SkillAreasResponse> {
  if (_skillAreasCache) return _skillAreasCache;
  const data = await apiFetch<SkillAreasResponse>("/api/skills/areas");
  _skillAreasCache = data;
  return data;
}

export async function getTechSkillAreas(): Promise<Record<TechAreaId, SkillAreaData>> {
  const data = await fetchSkillAreas();
  const result: Record<string, SkillAreaData> = {};
  for (const [key, raw] of Object.entries(data.tech)) {
    result[key] = convertArea(raw);
  }
  return result as Record<TechAreaId, SkillAreaData>;
}

export async function getSoftSkillArea(): Promise<SkillAreaData> {
  const data = await fetchSkillAreas();
  return convertArea(data.soft);
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

export async function getSkillTasks(areaId: string): Promise<SkillTask[]> {
  try {
    return await apiFetch<SkillTask[]>(`/api/skills/tasks?areaId=${encodeURIComponent(areaId)}`);
  } catch {
    return [];
  }
}

export async function createSkillTask(data: {
  areaId: string;
  title: string;
  notes?: string;
}): Promise<SkillTask> {
  return apiFetch<SkillTask>("/api/skills/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function toggleSkillTask(id: string, done: boolean): Promise<SkillTask> {
  return apiFetch<SkillTask>(`/api/skills/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ done }),
  });
}

export async function deleteSkillTask(id: string): Promise<void> {
  await apiFetch<void>(`/api/skills/tasks/${id}`, { method: "DELETE" });
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getSkillProjects(areaId: string): Promise<SkillProject[]> {
  try {
    return await apiFetch<SkillProject[]>(`/api/skills/projects?areaId=${encodeURIComponent(areaId)}`);
  } catch {
    return [];
  }
}

export async function upsertSkillProject(data: {
  id?: string;
  areaId: string;
  title: string;
  desc?: string;
  url?: string;
  tags?: string[];
}): Promise<SkillProject> {
  return apiFetch<SkillProject>("/api/skills/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteSkillProject(id: string): Promise<void> {
  await apiFetch<void>(`/api/skills/projects/${id}`, { method: "DELETE" });
}

// ── Re-exports for backward compatibility ──────────────────────────────────────

export type { SkillTask, SkillProject };
