export interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens?: number;
}

export async function callLLM(prompt: string, systemPrompt: string, config: LLMConfig) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, systemPrompt, config }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || "AI request failed");
  }

  const data = await response.json();
  return data.reply as string;
}
