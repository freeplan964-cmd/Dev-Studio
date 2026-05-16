import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
import { Scissors, Plus, Trash2, Search, Copy } from "lucide-react";
import { toast } from "sonner";
import type { Snippet } from "@/types/tools";
import { Field, Input, TextArea } from "./shared";
import { SplitLayout } from "../layout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function Snippets({ selectedId }: { selectedId?: string }) {
  const navigate = useNavigate({ from: "/tools" });
  const search = useSearch({ from: "/tools" });
  const { snippets, upsertSnippet, deleteSnippet } = useForge();
  const [query, setQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = useMemo(
    () => snippets.filter((s) => s.title.toLowerCase().includes(query.toLowerCase())),
    [snippets, query],
  );
  const selected = selectedId ? snippets.find((s) => s.id === selectedId) : filtered[0];

  const select = (sid: string) => navigate({ search: (prev) => ({ ...prev, id: sid }) });

  const create = () => {
    const s: Snippet = {
      id: newId("sn"),
      title: "Untitled snippet",
      description: "Quick reusable logic.",
      code: "// Paste your snippet here",
      language: "typescript",
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    upsertSnippet(s);
    select(s.id);
    toast.success("Snippet created");
  };

  const update = (patch: Partial<Snippet>) => {
    if (!selected) return;
    upsertSnippet({ ...selected, ...patch, updatedAt: Date.now() });
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteSnippet(selected.id);
    navigate({ search: (prev) => ({ ...prev, id: undefined }) });
    toast.success("Snippet deleted");
  };

  const sidebar = (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Scissors className="size-4" />
            </div>
            <h3 className="text-sm font-semibold">Snippets</h3>
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
            placeholder="Filter snippets…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card/50 border border-border rounded-lg py-1.5 pl-9 pr-3 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {filtered.map((s) => {
          const active = selected?.id === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => select(s.id)}
                className={`w-full text-left p-3 rounded-lg transition-all relative group ${
                  active ? "bg-card shadow-sm border border-border" : "hover:bg-card/40 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-md ${active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Scissors className="size-3.5" />
                  </div>
                  <span className={`text-xs font-medium truncate ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {s.title}
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono ml-auto px-1.5 py-0.5 rounded-full bg-muted/50 border border-border/50">
                    {s.language}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1 pl-8">
                  {s.description || "No description"}
                </p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 ? (
          <li className="p-8 text-center text-xs text-muted-foreground italic">
            No snippets found.
          </li>
        ) : null}
      </ul>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[300px]" className="border-t border-border">
      {selected ? (
        <section className="flex flex-col flex-1 overflow-hidden">
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-border bg-background">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <Input
                  value={selected.title}
                  onChange={(e) => update({ title: e.target.value })}
                  className="text-2xl font-semibold tracking-tight bg-transparent border-none p-0 focus:ring-0"
                />
                <Input
                  value={selected.description}
                  onChange={(e) => update({ description: e.target.value })}
                  className="text-sm text-muted-foreground bg-transparent border-none p-0 focus:ring-0 mt-1"
                />
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto mt-2 sm:mt-0">
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="p-2 rounded-md border border-border hover:bg-destructive/10"
                >
                  <Trash2 className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Field label="Language">
                <Input
                  value={selected.language}
                  onChange={(e) => update({ language: e.target.value })}
                  className="font-mono"
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
                />
              </Field>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-8 min-h-0 bg-sidebar/20">
            <div className="w-full max-w-[1400px] mx-auto h-full">
              <div className="relative group h-full">
                <TextArea
                  value={selected.code}
                  onChange={(e) => update({ code: e.target.value })}
                  className="h-full font-mono resize-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selected.code);
                    toast.success("Snippet copied");
                  }}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="size-3.5" /> Copy Snippet
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid place-items-center p-8 text-center flex-1">
          <div>
            <Scissors className="size-10 text-muted-foreground mx-auto mb-3" />
            <button
              onClick={create}
              className="text-xs font-mono uppercase tracking-wider border border-border px-3 py-2 rounded-md"
            >
              Save your first snippet
            </button>
          </div>
        </section>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete snippet?"
        description="This snippet will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </SplitLayout>
  );
}
