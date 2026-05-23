import { apiFetch } from "./base";
import type { Prompt } from "../../types/tools";

export async function getPrompts(): Promise<Prompt[]> {
  try {
    return await apiFetch<Prompt[]>("/api/prompts");
  } catch {
    return [];
  }
}
export async function upsertPrompt(p: Partial<Prompt>): Promise<Prompt> {
  return apiFetch<Prompt>("/api/prompts", { method: "POST", body: JSON.stringify(p) });
}
export async function upsertPrompts(items: Partial<Prompt>[]): Promise<Prompt[]> {
  try {
    return await apiFetch<Prompt[]>("/api/prompts/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as Prompt[];
  }
}
export async function deletePrompt(id: string): Promise<void> {
  await apiFetch<void>(`/api/prompts/${id}`, { method: "DELETE" });
}
