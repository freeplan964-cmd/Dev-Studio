import { StateCreator } from "zustand";
import { ForgeState } from "../types";
import * as db from "@/lib/api";
import { toast } from "sonner";
import { Prompt } from "@/types/tools";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export const createPromptSlice: StateCreator<
  ForgeState,
  [["zustand/persist", unknown]],
  [],
  Partial<ForgeState>
> = (set, get) => ({
  upsertPrompt: async (p) => {
    const previous = get().prompts;
    set((s) => ({
      prompts: s.prompts.some((x) => x.id === p.id)
        ? s.prompts.map((x: any) => (x.id === p.id ? p : x))
        : [p, ...s.prompts],
    }));
    try {
      const saved = await db.upsertPrompt({
        ...p,
        usage_count: p.usageCount,
        versions: p.versions,
        user_id: "",
      } as any);
      if (saved?.id && saved.id !== p.id) {
        set((s) => ({
          prompts: s.prompts.map((x) => (x.id === p.id ? { ...x, id: saved.id as string } : x)),
        }));
      }
      toast.success("Prompt saved!");
    } catch (err: any) {
      set({ prompts: previous });
      toast.error(`Failed to save: ${err.message}`);
    }
  },
  deletePrompt: async (id) => {
    const previous = get().prompts;
    set((s) => ({ prompts: s.prompts.filter((p) => p.id !== id) }));

    toast.promise(db.deletePrompt(id), {
      loading: "Deleting prompt...",
      success: "Prompt deleted!",
      error: (err) => {
        set({ prompts: previous });
        return `Failed to delete: ${err.message}`;
      },
    });
  },
  toggleFavoritePrompt: async (id) => {
    const p = get().prompts.find((x) => x.id === id);
    if (p) await get().upsertPrompt({ ...p, favorite: !p.favorite });
  },
  incrementPromptUsage: async (id) => {
    const p = get().prompts.find((x) => x.id === id);
    if (p) await get().upsertPrompt({ ...p, usageCount: (p.usageCount || 0) + 1 });
  },
});
