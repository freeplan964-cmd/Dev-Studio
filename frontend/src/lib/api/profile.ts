import { apiFetch } from "./base";

export async function getProfile() {
  try {
    return await apiFetch<Record<string, unknown>>("/api/profile");
  } catch {
    return null;
  }
}

export async function updateProfile(profile: {
  displayName?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
}) {
  return apiFetch<any>("/api/profile", { method: "POST", body: JSON.stringify(profile) });
}
