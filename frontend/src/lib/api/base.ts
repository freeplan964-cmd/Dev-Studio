export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    let errorMessage = `API error ${res.status}`;
    try {
      const parsed = JSON.parse(text);
      if (parsed.error) errorMessage = parsed.error;
    } catch {
      errorMessage = `${errorMessage}: ${text}`;
    }
    throw new Error(errorMessage);
  }
  return res.json() as T;
}
