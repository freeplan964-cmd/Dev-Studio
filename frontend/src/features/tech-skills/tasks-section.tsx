import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ClipboardList } from "lucide-react";
import type { SkillAreaData } from "@/types/skills";
import { cn } from "@/lib/utils";
import {
  getSkillTasks,
  createSkillTask,
  toggleSkillTask,
  deleteSkillTask,
  type SkillTask,
} from "@/lib/api/skills";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  data: SkillAreaData;
  triggerAdd?: number;
}

export function TasksSection({ data, triggerAdd }: Props) {
  const [tasks, setTasks] = useState<SkillTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const rows = await getSkillTasks(data.id);
    setTasks(rows);
    setLoading(false);
  }, [data.id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (triggerAdd) setShowForm(true);
  }, [triggerAdd]);

  const add = async () => {
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      const created = await createSkillTask({ areaId: data.id, title: title.trim(), notes: notes.trim() });
      setTasks((prev) => [...prev, created]);
      setTitle("");
      setNotes("");
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (id: string, done: boolean) => {
    try {
      const updated = await toggleSkillTask(id, !done);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      // optimistic revert not needed — just re-load
      load();
    }
  };

  const remove = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteSkillTask(id);
    } catch {
      load();
    }
  };

  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "todo" ? !t.done : t.done,
  );
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">{data.label} Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {doneCount}/{tasks.length} completed
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 shadow-sm"
          >
            <Plus className="size-4" /> Add Task
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(["all", "todo", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border transition-all capitalize",
              filter === f
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") add();
              if (e.key === "Escape") {
                setShowForm(false);
                setTitle("");
                setNotes("");
              }
            }}
            placeholder="Task title…"
            className="bg-background border-border/60 rounded-lg px-3 py-2 h-auto focus-visible:ring-2 focus-visible:ring-primary/30 shadow-none"
          />
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)…"
            rows={2}
            className="bg-background border-border/60 rounded-lg px-3 py-2 resize-none focus-visible:ring-2 focus-visible:ring-primary/30 shadow-none"
          />
          <div className="flex gap-2">
            <button
              onClick={add}
              disabled={saving}
              className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Adding…" : "Add"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setTitle("");
                setNotes("");
              }}
              className="px-4 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted/60 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-sm text-muted-foreground">Loading…</div>
      ) : filtered.length > 0 ? (
        <div className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden shadow-sm">
          {filtered.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-4 group hover:bg-muted/30 transition-colors"
            >
              <button onClick={() => toggle(task.id, task.done)} className="mt-0.5 shrink-0">
                {task.done ? (
                  <CheckCircle2 className="size-5 text-primary" />
                ) : (
                  <Circle className="size-5 text-muted-foreground/40 hover:text-primary/60 transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium leading-snug",
                    task.done && "line-through text-muted-foreground/60",
                  )}
                >
                  {task.title}
                </p>
                {task.notes && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {task.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => remove(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/10">
          <ClipboardList className="size-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            {filter !== "all" ? `No ${filter} tasks` : "No tasks yet — add your first one"}
          </p>
          {filter === "all" && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-xs text-primary hover:underline"
            >
              Add a task
            </button>
          )}
        </div>
      )}
    </div>
  );
}
