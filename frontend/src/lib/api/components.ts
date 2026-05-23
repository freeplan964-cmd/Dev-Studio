import { apiFetch } from "./base";
import type { ComponentAsset, Snippet, Template } from "../../types/tools";

export async function getComponents(): Promise<ComponentAsset[]> {
  try {
    return await apiFetch<ComponentAsset[]>("/api/components");
  } catch {
    return [];
  }
}
export async function upsertComponent(c: Partial<ComponentAsset>): Promise<ComponentAsset> {
  return apiFetch<ComponentAsset>("/api/components", { method: "POST", body: JSON.stringify(c) });
}
export async function upsertComponents(
  items: Partial<ComponentAsset>[],
): Promise<ComponentAsset[]> {
  try {
    return await apiFetch<ComponentAsset[]>("/api/components/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as ComponentAsset[];
  }
}
export async function deleteComponent(id: string): Promise<void> {
  await apiFetch<void>(`/api/components/${id}`, { method: "DELETE" });
}

export async function getSnippets(): Promise<Snippet[]> {
  try {
    return await apiFetch<Snippet[]>("/api/snippets");
  } catch {
    return [];
  }
}
export async function upsertSnippet(s: Partial<Snippet>): Promise<Snippet> {
  return apiFetch<Snippet>("/api/snippets", { method: "POST", body: JSON.stringify(s) });
}
export async function upsertSnippets(items: Partial<Snippet>[]): Promise<Snippet[]> {
  try {
    return await apiFetch<Snippet[]>("/api/snippets/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as Snippet[];
  }
}
export async function deleteSnippet(id: string): Promise<void> {
  await apiFetch<void>(`/api/snippets/${id}`, { method: "DELETE" });
}

export async function getTemplates(): Promise<Template[]> {
  try {
    return await apiFetch<Template[]>("/api/templates");
  } catch {
    return [];
  }
}
export async function upsertTemplate(t: Partial<Template>): Promise<Template> {
  return apiFetch<Template>("/api/templates", { method: "POST", body: JSON.stringify(t) });
}
export async function upsertTemplates(items: Partial<Template>[]): Promise<Template[]> {
  try {
    return await apiFetch<Template[]>("/api/templates/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as Template[];
  }
}
export async function deleteTemplate(id: string): Promise<void> {
  await apiFetch<void>(`/api/templates/${id}`, { method: "DELETE" });
}
