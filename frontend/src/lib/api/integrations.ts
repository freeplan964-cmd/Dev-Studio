import { apiFetch } from "./base";
import type { Connector, SocialDraft, MailTemplate } from "../../types/tools";

export async function getConnectors(): Promise<Connector[]> {
  try {
    return await apiFetch<Connector[]>("/api/connectors");
  } catch {
    return [];
  }
}
export async function upsertConnector(c: Partial<Connector>): Promise<Connector> {
  return apiFetch<Connector>("/api/connectors", { method: "POST", body: JSON.stringify(c) });
}
export async function upsertConnectors(items: Partial<Connector>[]): Promise<Connector[]> {
  try {
    return await apiFetch<Connector[]>("/api/connectors/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as Connector[];
  }
}
export async function deleteConnector(id: string): Promise<void> {
  await apiFetch<void>(`/api/connectors/${id}`, { method: "DELETE" });
}

export async function getSocialDrafts(): Promise<SocialDraft[]> {
  try {
    return await apiFetch<SocialDraft[]>("/api/social-drafts");
  } catch {
    return [];
  }
}
export async function upsertSocialDraft(d: Partial<SocialDraft>): Promise<SocialDraft> {
  return apiFetch<SocialDraft>("/api/social-drafts", { method: "POST", body: JSON.stringify(d) });
}
export async function upsertSocialDrafts(items: Partial<SocialDraft>[]): Promise<SocialDraft[]> {
  try {
    return await apiFetch<SocialDraft[]>("/api/social-drafts/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as SocialDraft[];
  }
}
export async function deleteSocialDraft(id: string): Promise<void> {
  await apiFetch<void>(`/api/social-drafts/${id}`, { method: "DELETE" });
}

export async function getMailTemplates(): Promise<MailTemplate[]> {
  try {
    return await apiFetch<MailTemplate[]>("/api/mail-templates");
  } catch {
    return [];
  }
}
export async function upsertMailTemplate(m: Partial<MailTemplate>): Promise<MailTemplate> {
  return apiFetch<MailTemplate>("/api/mail-templates", { method: "POST", body: JSON.stringify(m) });
}
export async function upsertMailTemplates(items: Partial<MailTemplate>[]): Promise<MailTemplate[]> {
  try {
    return await apiFetch<MailTemplate[]>("/api/mail-templates/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as MailTemplate[];
  }
}
export async function deleteMailTemplate(id: string): Promise<void> {
  await apiFetch<void>(`/api/mail-templates/${id}`, { method: "DELETE" });
}
