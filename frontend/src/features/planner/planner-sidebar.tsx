import type { ReactNode } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlannerTask } from "@/types/planner";
import { CATEGORY_ICON_COMPONENTS, CATEGORY_LABELS } from "@/data/planner/planner";
import { getWeekTheme, toDateStr, addDays } from "@/lib/utils/planner";
import { STATUS_FILTERS } from "@/constants";
import type { StatusFilter } from "@/types/planner";
import { WeekCalendar } from "./components/week-calendar";
import { WeekThemeCard } from "./components/week-theme-card";
import { WeekAchievements } from "./components/week-achievements";
import { Input } from "@/components/ui/input";

interface PlannerSidebarProps {
  selectedDate: string;
  weekStart: Date;
  tasks: PlannerTask[];
  onSelectDate: (date: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onAddTask: () => void;
  weekTheme?: ReturnType<typeof getWeekTheme>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (f: StatusFilter) => void;
  extraBottom?: ReactNode;
}

export function PlannerSidebar({
  selectedDate,
  weekStart,
  tasks,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  weekTheme,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  extraBottom,
}: PlannerSidebarProps) {
  const weekEnd = addDays(weekStart, 6);
  const weekKey = toDateStr(weekStart);
  const currentTheme = weekTheme ?? getWeekTheme(selectedDate);

  const weekTasks = tasks.filter(
    (t) => t.date >= toDateStr(weekStart) && t.date <= toDateStr(weekEnd),
  );
  const weekTotal = weekTasks.length;
  const weekDone = weekTasks.filter((t) => t.status === "done").length;
  const weekPct = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-muted/20 border-r border-border/50 overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* ── Search + filter ── */}
        <div className="px-2.5 pt-3 pb-1 space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks…"
              className="h-8 pl-8 pr-7 text-xs rounded-xl bg-background border-border/50 focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/50 shadow-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          <div className="flex gap-1">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => onStatusFilterChange(f.id)}
                className={cn(
                  "flex-1 text-[10px] font-semibold py-1 rounded-lg border transition-all",
                  statusFilter === f.id
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "border-border/40 text-muted-foreground hover:border-border/60 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Week calendar ── */}
        <WeekCalendar
          weekStart={weekStart}
          selectedDate={selectedDate}
          tasks={tasks}
          onSelectDate={onSelectDate}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
          onToday={onToday}
        />

        {/* ── Weekly theme card ── */}
        <WeekThemeCard currentTheme={currentTheme} />

        {/* ── Week achievements ── */}
        <WeekAchievements weekKey={weekKey} />

        {/* ── Daily structure ── */}
        <div className="px-2.5 py-1 shrink-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 px-1 mb-1.5">
            Daily Structure
          </p>
          <div className="space-y-0.5">
            {(["activities", "work", "learning"] as const).map((cat) => {
              const CatIcon = CATEGORY_ICON_COMPONENTS[cat];
              const dayT = tasks.filter((t) => t.date === selectedDate && t.category === cat);
              const done = dayT.filter((t) => t.status === "done").length;
              return (
                <div
                  key={cat}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <CatIcon className="size-3.5 text-muted-foreground shrink-0" />
                  <span className="text-[11px] font-medium text-muted-foreground flex-1">
                    {CATEGORY_LABELS[cat]}
                  </span>
                  {dayT.length > 0 ? (
                    <span className="text-[10px] font-semibold text-muted-foreground/70">
                      {done}/{dayT.length}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground/30">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Week progress (fixed bottom) ── */}
      <div className="px-2.5 py-2 shrink-0">
        <div className="px-3 py-2.5 rounded-xl bg-muted/40 border border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-3.5 text-primary" />
            <span className="text-[11px] font-semibold">Week progress</span>
            <span className="ml-auto text-[10px] font-bold text-primary">{weekPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${weekPct}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {weekDone} of {weekTotal} tasks complete
          </p>
        </div>
      </div>

      {extraBottom && <div className="px-2.5 pb-2.5 shrink-0 space-y-2">{extraBottom}</div>}
    </div>
  );
}
