import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
import {
  LayoutTemplate,
  Plus,
  Trash2,
  Search,
  Check,
  ListTree,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/types/tools";
import { Field, Input, TextArea } from "./shared";
import { SplitLayout } from "../layout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function Templates({ selectedId }: { selectedId?: string }) {
  const navigate = useNavigate({ from: "/tools" });
  const search = useSearch({ from: "/tools" });
  const { templates, upsertTemplate, deleteTemplate } = useForge();
  const [query, setQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = useMemo(
    () => templates.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())),
    [templates, query],
  );
  const selected = selectedId ? templates.find((t) => t.id === selectedId) : filtered[0];

  const select = (tid: string) => navigate({ search: (prev) => ({ ...prev, id: tid }) });

  const create = () => {
    const t: Template = {
      id: newId("t"),
      name: "New Template",
      description: "A boilerplate for new projects.",
      stack: ["React", "Tailwind"],
      tags: [],
      structure: "src/\n  components/\n  lib/\n  main.tsx",
      notes: "Quick start guide...",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    upsertTemplate(t);
    select(t.id);
    toast.success("Template created");
  };

  const update = (patch: Partial<Template>) => {
    if (!selected) return;
    upsertTemplate({ ...selected, ...patch, updatedAt: Date.now() });
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteTemplate(selected.id);
    navigate({ search: (prev) => ({ ...prev, id: undefined }) });
    toast.success("Template deleted");
  };

  const sidebar = (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <LayoutTemplate className="size-4" />
            </div>
            <h3 className="text-sm font-semibold">Templates</h3>
          </div>
          <button
            onClick={create}
            className="flex items-center gap-1.5 text-[11px] font-medium bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="size-3.5" /> New
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Filter templates…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card/50 border border-border rounded-lg py-1.5 pl-9 pr-3 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {filtered.map((t) => {
          const active = selected?.id === t.id;
          return (
            <li key={t.id}>
              <button
                onClick={() => select(t.id)}
                className={`w-full text-left p-3 rounded-lg transition-all relative group ${
                  active ? "bg-card shadow-sm border border-border" : "hover:bg-card/40 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-md ${active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <LayoutTemplate className="size-3.5" />
                  </div>
                  <span className={`text-xs font-medium truncate ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {t.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pl-8 mb-1">
                  {t.stack.slice(0, 2).map((s) => (
                    <span key={s} className="text-[8px] px-1 rounded bg-muted text-muted-foreground border border-border/50 uppercase font-mono">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1 pl-8">
                  {t.description || "No description"}
                </p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 ? (
          <li className="p-8 text-center text-xs text-muted-foreground italic">
            No templates found.
          </li>
        ) : null}
      </ul>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[300px]" className="border-t border-border">
      {selected ? (
        <section className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1 min-w-0">
                <Input
                  value={selected.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="text-2xl font-semibold tracking-tight bg-transparent border-none p-0 focus:ring-0"
                />
                <Input
                  value={selected.description}
                  onChange={(e) => update({ description: e.target.value })}
                  className="text-sm text-muted-foreground bg-transparent border-none p-0 focus:ring-0 mt-1"
                />
              </div>
              <button
                onClick={() => setConfirmOpen(true)}
                className="p-2 rounded-md border border-border hover:bg-destructive/10 self-end sm:self-auto mt-2 sm:mt-0"
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Field label="Tech Stack">
                <Input
                  value={selected.stack.join(", ")}
                  onChange={(e) =>
                    update({
                      stack: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  className="font-mono"
                  placeholder="React, Next.js, etc."
                />
              </Field>
              <Field label="Tags">
                <Input
                  value={selected.tags.join(", ")}
                  onChange={(e) =>
                    update({
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  className="font-mono"
                  placeholder="saas, internal-tool, etc."
                />
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListTree className="size-4 text-primary" />
                <h3>Project Structure</h3>
              </div>
              <TextArea
                value={selected.structure}
                onChange={(e) => update({ structure: e.target.value })}
                rows={8}
                className="font-mono"
                placeholder="Describe the file/folder layout..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <StickyNote className="size-4 text-primary" />
                <h3>Notes & Instructions</h3>
              </div>
              <TextArea
                value={selected.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={8}
                placeholder="Implementation details, usage tips..."
              />
            </div>

            <div className="pt-6 border-t border-border">
              <button
                onClick={() => {
                  toast.success(`Scaffolding ${selected.name}…`);
                  setTimeout(() => toast.success("Template guidance ready!"), 2000);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Check className="size-4" /> Use Template
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid place-items-center p-8 text-center flex-1">
          <div>
            <LayoutTemplate className="size-10 text-muted-foreground mx-auto mb-3" />
            <button
              onClick={create}
              className="text-xs font-mono uppercase tracking-wider border border-border px-3 py-2 rounded-md"
            >
              Save your first template
            </button>
          </div>
        </section>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete template?"
        description="This template will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </SplitLayout>
  );
}
