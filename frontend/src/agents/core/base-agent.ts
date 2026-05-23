import type { MemoryEntry } from "@/lib/ai/memory";

export interface AgentContext {
  userId: string;
  history: MemoryEntry[];
  metadata: Record<string, string | number | boolean | null>;
}

export abstract class BaseAgent {
  constructor(
    public id: string,
    public name: string,
    public systemPrompt: string,
  ) {}

  abstract run(input: string, context: AgentContext): Promise<string>;
}
