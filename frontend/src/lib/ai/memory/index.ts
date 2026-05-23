export interface MemoryEntry {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export class AgentMemory {
  private entries: MemoryEntry[] = [];

  add(role: "user" | "assistant", content: string) {
    this.entries.push({ role, content, timestamp: Date.now() });
  }

  getHistory() {
    return this.entries;
  }

  clear() {
    this.entries = [];
  }
}
