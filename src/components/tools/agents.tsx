import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForge, newId } from "@/lib/store";
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
import { SplitLayout } from "../layout";
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
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Bot className="size-4" />
            </div>
            <h3 className="text-sm font-semibold">Agents</h3>
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
            placeholder="Filter agents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card/50 border border-border rounded-lg py-1.5 pl-9 pr-3 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {filtered.map((a) => {
          const active = selected?.id === a.id;
          return (
            <li key={a.id}>
              <button
                onClick={() => select(a.id)}
                className={`w-full text-left p-3 rounded-lg transition-all relative group ${
                  active ? "bg-card shadow-sm border border-border" : "hover:bg-card/40 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-md ${active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Bot className="size-3.5" />
                  </div>
                  <span className={`text-xs font-medium truncate ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {a.name}
                  </span>
                  <StatusDot status={a.status} className="ml-auto" />
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2 pl-8">
                  {a.role}
                </p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 ? (
          <li className="p-8 text-center text-xs text-muted-foreground italic">
            No agents found.
          </li>
        ) : null}
      </ul>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[300px]" className="border-t border-border">
      {selected ? (
        <section className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="size-12 rounded-lg bg-linear-to-br from-primary to-accent grid place-items-center shrink-0">
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
                className="p-2 rounded-md border border-border hover:bg-destructive/10 self-end sm:self-auto"
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
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                System prompt
              </label>
              <TextArea
                value={selected.systemPrompt}
                onChange={(e) => update({ systemPrompt: e.target.value })}
                rows={10}
                className="font-mono"
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Playground
                </p>
                <button
                  onClick={() => toast.info("Connect Lovable AI to run the agent")}
                  className="inline-flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md"
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
            <Bot className="size-10 text-muted-foreground mx-auto mb-3" />
            <button
              onClick={create}
              className="text-xs font-mono uppercase tracking-wider border border-border px-3 py-2 rounded-md"
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
