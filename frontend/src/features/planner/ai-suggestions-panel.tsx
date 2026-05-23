import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  Clock,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { getAISuggestions } from "@/lib/api/planner";
import type { PlannerTask } from "@/types/planner";
import { cn } from "@/lib/utils";

interface AISuggestionsPanelProps {
  date: string;
  tasks: PlannerTask[];
}

export function AISuggestionsPanel({ date, tasks }: AISuggestionsPanelProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ suggestions: string[]; schedule: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const data = await getAISuggestions(date, tasks);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to get suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!result && !loading) {
      fetch();
      return;
    }
    setOpen((v) => !v);
  };

  const handleRefresh = () => {
    setResult(null);
    fetch();
  };

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-200",
        open
          ? "border-primary/25 bg-gradient-to-b from-primary/5 to-transparent"
          : "border-border/50 bg-muted/20 hover:border-primary/20",
      )}
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors"
      >
        <div
          className={cn(
            "size-8 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            open ? "bg-primary/15" : "bg-muted/60",
          )}
        >
          <Sparkles className={cn("size-4", open ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold", open ? "text-primary" : "text-foreground")}>
            AI Plan Assistant
          </p>
          <p className="text-xs text-muted-foreground">
            {tasks.length > 0
              ? `Analyze ${tasks.length} task${tasks.length !== 1 ? "s" : ""} and suggest improvements`
              : "Get a suggested schedule for today"}
          </p>
        </div>
        {loading ? (
          <Loader2 className="size-4 text-primary animate-spin shrink-0" />
        ) : open ? (
          <ChevronUp className="size-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-primary/10 px-4 py-4 space-y-4">
          {loading && (
            <div className="flex items-center gap-3 text-sm text-primary/70 py-2">
              <Loader2 className="size-4 animate-spin shrink-0" />
              <span>Analyzing your schedule…</span>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-xs text-destructive">
              {error}
            </div>
          )}

          {result && !loading && (
            <>
              {result.suggestions?.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Lightbulb className="size-3.5 text-primary/70" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                      Suggestions
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed"
                      >
                        <span className="size-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.schedule && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Clock className="size-3.5 text-primary/70" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                      Suggested Schedule
                    </p>
                  </div>
                  <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-sans leading-relaxed bg-background/70 rounded-xl px-3.5 py-3 border border-border/40">
                    {result.schedule}
                  </pre>
                </div>
              )}

              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-[11px] font-medium text-primary/60 hover:text-primary transition-colors py-0.5"
              >
                <RefreshCw className="size-3" />
                Regenerate
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
