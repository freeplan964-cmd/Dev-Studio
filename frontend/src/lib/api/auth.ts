export async function getCurrentUser() {
  try {
    const r = await fetch("/api/auth/user");
    if (!r.ok) return null;
    return r.json();
  } catch {
    return null;
  }
}
