import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
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
  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);
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
      <div className="px-3 py-2.5 border-b border-border/60 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
              <Scissors className="size-3.5" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              Snippets ({snippets.length})
            </span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter snippets…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-muted/40 border border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {paged.map((s) => {
          const active = selected?.id === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => select(s.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-xs font-medium truncate flex-1 ${active ? "text-foreground" : ""}`}>
                    {s.title}
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 rounded-lg bg-muted/60 border border-border/60 shrink-0">
                    {s.language}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{s.description || "No description"}</p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-3 py-10 text-xs text-muted-foreground text-center border border-dashed border-border/60 rounded-xl m-1">
            No snippets found.
          </li>
        )}
      </ul>
      <ListPagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} onPageChange={setPage} />
      <div className="p-2 pt-0 shrink-0">
        <button
          onClick={create}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition-colors border border-primary/20"
        >
          <Plus className="size-3.5" /> New Snippet
        </button>
      </div>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[260px]">
      {selected ? (
        <section className="flex flex-col flex-1 overflow-hidden">
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-border bg-background">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <Input value={selected.title} onChange={(e) => update({ title: e.target.value })} className="text-2xl font-semibold tracking-tight bg-transparent border-none p-0 focus:ring-0" />
                <Input value={selected.description} onChange={(e) => update({ description: e.target.value })} className="text-sm text-muted-foreground bg-transparent border-none p-0 focus:ring-0 mt-1" />
              </div>
              <button onClick={() => setConfirmOpen(true)} className="p-2 rounded-xl border border-border hover:bg-destructive/10 self-end sm:self-auto mt-2 sm:mt-0">
                <Trash2 className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Field label="Language"><Input value={selected.language} onChange={(e) => update({ language: e.target.value })} className="font-mono" /></Field>
              <Field label="Tags"><Input value={selected.tags.join(", ")} onChange={(e) => update({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className="font-mono" /></Field>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-8 min-h-0 bg-sidebar/20">
            <div className="w-full max-w-[1400px] mx-auto h-full">
              <div className="relative group h-full">
                <TextArea value={selected.code} onChange={(e) => update({ code: e.target.value })} className="h-full font-mono resize-none" />
                <button
                  onClick={() => { navigator.clipboard.writeText(selected.code); toast.success("Snippet copied"); }}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
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
            <Scissors className="size-10 text-muted-foreground/30 mx-auto mb-3" />
            <button onClick={create} className="text-xs font-semibold uppercase tracking-wider border border-border px-3 py-2 rounded-xl hover:bg-muted/60 transition-colors">
              Save your first snippet
            </button>
          </div>
        </section>
      )}

      <ConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} title="Delete snippet?" description="This snippet will be permanently removed. This action cannot be undone." confirmLabel="Delete" onConfirm={handleDelete} />
    </SplitLayout>
  );
}
