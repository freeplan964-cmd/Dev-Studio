import { StateCreator } from "zustand";
import { ForgeState } from "../types";
import * as db from "@/lib/api";
import { toast } from "sonner";

export const createComponentSlice: StateCreator<
  ForgeState,
  [["zustand/persist", unknown]],
  [],
  Partial<ForgeState>
> = (set, get) => ({
  upsertComponent: async (c) => {
    const previous = get().components;
    set((s) => ({
      components: s.components.some((x) => x.id === c.id)
        ? s.components.map((x: any) => (x.id === c.id ? c : x))
        : [c, ...s.components],
    }));
    try {
      const saved = await db.upsertComponent({
        ...c,
        usage_count: c.usageCount,
        user_id: "",
      } as any);
      if (saved?.id && saved.id !== c.id) {
        set((s) => ({
          components: s.components.map((x) =>
            x.id === c.id ? { ...x, id: saved.id as string } : x,
          ),
        }));
      }
      toast.success("Component saved!");
    } catch (err: any) {
      set({ components: previous });
      toast.error(`Failed to save: ${err.message}`);
    }
  },
  deleteComponent: async (id) => {
    const previous = get().components;
    set((s) => ({ components: s.components.filter((c) => c.id !== id) }));

    toast.promise(db.deleteComponent(id), {
      loading: "Deleting component...",
      success: "Component deleted!",
      error: (err) => {
        set({ components: previous });
        return `Failed to delete: ${err.message}`;
      },
    });
  },
  toggleFavoriteComponent: async (id) => {
    const c = get().components.find((x) => x.id === id);
    if (c) await get().upsertComponent({ ...c, favorite: !c.favorite });
  },

  upsertSnippet: async (snip) => {
    const previous = get().snippets;
    set((s) => ({
      snippets: s.snippets.some((x) => x.id === snip.id)
        ? s.snippets.map((x: any) => (x.id === snip.id ? snip : x))
        : [snip, ...s.snippets],
    }));
    try {
      const saved = await db.upsertSnippet({ ...snip, user_id: "" } as any);
      if (saved?.id && saved.id !== snip.id) {
        set((s) => ({
          snippets: s.snippets.map((x) =>
            x.id === snip.id ? { ...x, id: saved.id as string } : x,
          ),
        }));
      }
      toast.success("Snippet saved!");
    } catch (err: any) {
      set({ snippets: previous });
      toast.error(`Failed to save: ${err.message}`);
    }
  },
  deleteSnippet: async (id) => {
    const previous = get().snippets;
    set((s) => ({ snippets: s.snippets.filter((x) => x.id !== id) }));

    toast.promise(db.deleteSnippet(id), {
      loading: "Deleting snippet...",
      success: "Snippet deleted!",
      error: (err) => {
        set({ snippets: previous });
        return `Failed to delete: ${err.message}`;
      },
    });
  },

  upsertTemplate: async (t) => {
    const previous = get().templates;
    set((s) => ({
      templates: s.templates.some((x) => x.id === t.id)
        ? s.templates.map((x: any) => (x.id === t.id ? t : x))
        : [t, ...s.templates],
    }));
    try {
      const saved = await db.upsertTemplate({ ...t, user_id: "" } as any);
      if (saved?.id && saved.id !== t.id) {
        set((s) => ({
          templates: s.templates.map((x) => (x.id === t.id ? { ...x, id: saved.id as string } : x)),
        }));
      }
      toast.success("Template saved!");
    } catch (err: any) {
      set({ templates: previous });
      toast.error(`Failed to save: ${err.message}`);
    }
  },
  deleteTemplate: async (id) => {
    const previous = get().templates;
    set((s) => ({ templates: s.templates.filter((x) => x.id !== id) }));

    toast.promise(db.deleteTemplate(id), {
      loading: "Deleting template...",
      success: "Template deleted!",
      error: (err) => {
        set({ templates: previous });
        return `Failed to delete: ${err.message}`;
      },
    });
  },
});
