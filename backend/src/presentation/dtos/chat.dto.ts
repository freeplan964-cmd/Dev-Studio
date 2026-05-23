import { z } from "zod";

// ── Chat Completion ───────────────────────────────────────────────────────────
export const ChatDto = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  systemPrompt: z.string().optional(),
  config: z.record(z.unknown()).optional(),
});

export type ChatDtoType = z.infer<typeof ChatDto>;
