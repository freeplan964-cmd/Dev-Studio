import { StateCreator } from "zustand";
import { ForgeState } from "../types";
import * as db from "@/lib/api";
import { toast } from "sonner";

export const createAgentSlice: StateCreator<
  ForgeState,
  [["zustand/persist", unknown]],
  [],
  Partial<ForgeState>
> = (set, get) => ({
  upsertAgent: async (a) => {
    const previous = get().agents;
    set((s) => ({
      agents: s.agents.some((x) => x.id === a.id)
        ? s.agents.map((x: any) => (x.id === a.id ? a : x))
        : [a, ...s.agents],
    }));
    try {
      const saved = await db.upsertAgent({
        ...a,
        system_prompt: a.systemPrompt,
        user_id: "",
      } as any);
      if (saved?.id && saved.id !== a.id) {
        set((s) => ({
          agents: s.agents.map((x) => (x.id === a.id ? { ...x, id: saved.id as string } : x)),
        }));
      }
      toast.success("Agent saved!");
    } catch (err: any) {
      set({ agents: previous });
      toast.error(`Failed to save: ${err.message}`);
    }
  },
  deleteAgent: async (id) => {
    const previous = get().agents;
    set((s) => ({ agents: s.agents.filter((a) => a.id !== id) }));

    toast.promise(db.deleteAgent(id), {
      loading: "Deleting agent...",
      success: "Agent deleted!",
      error: (err) => {
        set({ agents: previous });
        return `Failed to delete: ${err.message}`;
      },
    });
  },
});
