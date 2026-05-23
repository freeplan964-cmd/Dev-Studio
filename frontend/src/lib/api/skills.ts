import { apiFetch } from "./base";

export interface SkillTask {
  id: string;
  areaId: string;
  title: string;
  notes: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface SkillProject {
  id: string;
  areaId: string;
  title: string;
  desc: string;
  url: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
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
