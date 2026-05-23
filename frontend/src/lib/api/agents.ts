import { apiFetch } from "./base";
import type { Agent } from "../../types/tools";

export async function getAgents(): Promise<Agent[]> {
  try {
    return await apiFetch<Agent[]>("/api/agents");
  } catch {
    return [];
  }
}
export async function upsertAgent(a: Partial<Agent>): Promise<Agent> {
  return apiFetch<Agent>("/api/agents", { method: "POST", body: JSON.stringify(a) });
}
export async function upsertAgents(items: Partial<Agent>[]): Promise<Agent[]> {
  try {
    return await apiFetch<Agent[]>("/api/agents/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as Agent[];
  }
}
export async function deleteAgent(id: string): Promise<void> {
  await apiFetch<void>(`/api/agents/${id}`, { method: "DELETE" });
}
