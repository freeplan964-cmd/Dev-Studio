import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import { Bot, Plus, Trash2, Play, Search } from "lucide-react";
import { toast } from "sonner";
import type { Agent } from "@/types/tools";
import { Field, StatusDot, Input, TextArea } from "./shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SplitLayout } from "../../components/layout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function Agents({ selectedId }: { selectedId?: string }) {
  const navigate = useNavigate({ from: "/tools" });
  const search = useSearch({ from: "/tools" });
  const { agents, upsertAgent, deleteAgent } = useForge();
  const [query, setQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = useMemo(
    () => agents.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [agents, query],
  );
  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);
  const selected = selectedId ? agents.find((a) => a.id === selectedId) : filtered[0];

  const select = (aid: string) => navigate({ search: (prev) => ({ ...prev, id: aid }) });

  const create = () => {
    const a: Agent = {
      id: newId("a"),
      name: "New Agent",
      role: "Describe what this agent does.",
      systemPrompt: "You are…",
      tools: [],
      model: "claude-3.5-sonnet",
      temperature: 0.4,
      status: "draft",
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    upsertAgent(a);
    select(a.id);
    toast.success("Agent created");
  };

  const update = (patch: Partial<Agent>) => {
    if (!selected) return;
    upsertAgent({ ...selected, ...patch, updatedAt: Date.now() });
    toast.success("Agent updated");
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteAgent(selected.id);
    navigate({ search: (prev) => ({ ...prev, id: undefined }) });
    toast.success("Agent deleted");
  };

  const sidebar = (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-3 py-2.5 border-b border-border/60 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
              <Bot className="size-3.5" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              Agents ({agents.length})
            </span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter agents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-muted/40 border border-border/60 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {paged.map((a) => {
          const active = selected?.id === a.id;
          return (
            <li key={a.id}>
              <button
                onClick={() => select(a.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium truncate flex-1 ${active ? "text-foreground" : ""}`}
                  >
                    {a.name}
                  </span>
                  <StatusDot status={a.status} />
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{a.role}</p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-3 py-10 text-xs text-muted-foreground text-center border border-dashed border-border/60 rounded-xl m-1">
            No agents found.
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
          <Plus className="size-3.5" /> New Agent
        </button>
      </div>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[260px]">
      {selected ? (
        <section className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="size-12 rounded-xl bg-linear-to-br from-primary to-accent grid place-items-center shrink-0">
                <Bot className="size-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  value={selected.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full text-2xl font-semibold tracking-tight bg-transparent focus:outline-none border-none p-0 h-auto"
                />
                <Input
                  value={selected.role}
                  onChange={(e) => update({ role: e.target.value })}
                  className="w-full text-sm text-muted-foreground bg-transparent focus:outline-none border-none p-0 h-auto mt-1"
                />
              </div>
              <button
                onClick={() => setConfirmOpen(true)}
                className="p-2 rounded-xl border border-border hover:bg-destructive/10 self-end sm:self-auto"
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <Field label="Status">
                <Select
                  value={selected.status}
                  onValueChange={(value) => update({ status: value as Agent["status"] })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">draft</SelectItem>
                    <SelectItem value="idle">idle</SelectItem>
                    <SelectItem value="active">active</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Model">
                <Input
                  value={selected.model}
                  onChange={(e) => update({ model: e.target.value })}
                  className="font-mono"
                />
              </Field>
              <Field label="Temperature">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={selected.temperature}
                  onChange={(e) => update({ temperature: parseFloat(e.target.value) || 0 })}
                  className="font-mono"
                />
              </Field>
              <Field label="Tools">
                <Input
                  value={selected.tools.join(", ")}
                  onChange={(e) =>
                    update({
                      tools: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  className="font-mono"
                />
              </Field>
            </div>

            <div className="border-t border-border pt-6">
              <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 block mb-2">
                System prompt
              </label>
              <TextArea
                value={selected.systemPrompt}
                onChange={(e) => update({ systemPrompt: e.target.value })}
                rows={10}
                className="font-mono"
              />
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                  Playground
                </p>
                <button
                  onClick={() => toast.info("Connect Lovable AI to run the agent")}
                  className="inline-flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1 rounded-xl"
                >
                  <Play className="size-3.5" /> Run
                </button>
              </div>
              <TextArea
                rows={4}
                placeholder="Send a test message to this agent…"
                className="bg-background"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="grid place-items-center p-8 text-center flex-1">
          <div>
            <Bot className="size-10 text-muted-foreground/30 mx-auto mb-3" />
            <button
              onClick={create}
              className="text-xs font-semibold uppercase tracking-wider border border-border px-3 py-2 rounded-xl hover:bg-muted/60 transition-colors"
            >
              Provision your first agent
            </button>
          </div>
        </section>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete agent?"
        description="This agent will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </SplitLayout>
  );
}
