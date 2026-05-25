import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import { LayoutTemplate, Plus, Trash2, Search, Check, ListTree, StickyNote } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/types/tools";
import { Field, Input, TextArea } from "./shared";
import { SplitLayout } from "../../components/layout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input as UIInput } from "@/components/ui/input";

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
  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);
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
      <div className="px-3 py-2.5 border-b border-border/60 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
              <LayoutTemplate className="size-3.5" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              Templates ({templates.length})
            </span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <UIInput
            type="text"
            placeholder="Filter templates…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-muted/40 border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs h-auto focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
          />
        </div>
      </div>

      <ul className="overflow-y-auto scrollbar-thin p-2 space-y-0.5 flex-1">
        {paged.map((t) => {
          const active = selected?.id === t.id;
          return (
            <li key={t.id}>
              <button
                onClick={() => select(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <p
                  className={`text-xs font-medium truncate leading-snug mb-1 ${active ? "text-foreground" : ""}`}
                >
                  {t.name}
                </p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {t.stack.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-[8px] px-1.5 rounded-lg bg-muted text-muted-foreground border border-border/60 uppercase font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1">
                  {t.description || "No description"}
                </p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-3 py-10 text-xs text-muted-foreground text-center border border-dashed border-border/60 rounded-xl m-1">
            No templates found.
          </li>
        )}
      </ul>
      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <div className="p-2 pt-0 shrink-0">
        <button
          onClick={create}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition-colors border border-primary/20"
        >
          <Plus className="size-3.5" /> New Template
        </button>
      </div>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[260px]">
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
                className="p-2 rounded-xl border border-border hover:bg-destructive/10 self-end sm:self-auto mt-2 sm:mt-0"
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
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Check className="size-4" /> Use Template
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid place-items-center p-8 text-center flex-1">
          <div>
            <LayoutTemplate className="size-10 text-muted-foreground/30 mx-auto mb-3" />
            <button
              onClick={create}
              className="text-xs font-semibold uppercase tracking-wider border border-border px-3 py-2 rounded-xl hover:bg-muted/60 transition-colors"
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
