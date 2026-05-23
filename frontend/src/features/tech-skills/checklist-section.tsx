import { useForge } from "@/lib/store";
import type { SkillAreaData } from "@/types/skills";

interface Props {
  data: SkillAreaData;
}

export function ChecklistSection({ data }: Props) {
  const { userProgress, toggleProgress } = useForge();

  const areaItems = data.checklist;
  const doneCount = areaItems.filter((item) => !!userProgress[item.id]).length;
  const total = areaItems.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Production Checklist</h2>
        <p className="text-muted-foreground text-sm">
          Follow these best practices to ensure excellence.
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>
            {doneCount} / {total} completed
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden shadow-sm">
        {areaItems.map((item) => {
          const isCompleted = !!userProgress[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggleProgress(item.id, data.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors group"
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/30 group-hover:border-primary/50"
                }`}
              >
                {isCompleted && <div className="size-1.5 rounded-full bg-primary-foreground" />}
              </div>
              <span
                className={`text-sm transition-all ${
                  isCompleted ? "text-muted-foreground line-through opacity-60" : "text-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {areaItems.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground">
            No checklist items defined for this area.
          </div>
        )}
      </div>
    </div>
  );
}
