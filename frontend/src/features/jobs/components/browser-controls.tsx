import { Search, Loader2, RefreshCw, AlertCircle, ExternalLink, MapPin } from "lucide-react";
import { CATEGORIES, TIME_OPTIONS, SOURCES } from "@/data/jobs/jobs";
import { Input } from "@/components/ui/input";

interface BrowserControlsProps {
  category: string;
  query: string;
  location: string;
  days: number;
  sources: string[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
  linkedInUrl: string;
  onPickCategory: (cat: (typeof CATEGORIES)[number]) => void;
  onQueryChange: (q: string) => void;
  onLocationChange: (l: string) => void;
  onDaysChange: (d: number) => void;
  onToggleSource: (id: string) => void;
  onSearch: () => void;
}

export function BrowserControls({
  category,
  query,
  location,
  days,
  sources,
  loading,
  fetched,
  errors,
  linkedInUrl,
  onPickCategory,
  onQueryChange,
  onLocationChange,
  onDaysChange,
  onToggleSource,
  onSearch,
}: BrowserControlsProps) {
  return (
    <div className="shrink-0 border-b border-border bg-background p-4 space-y-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onPickCategory(cat)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              category === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Query + location row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Job title or skills…"
            className="pl-8 pr-3 py-2 h-auto focus-visible:ring-1 focus-visible:ring-ring shadow-none"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Location"
            className="w-32 pl-7 pr-3 py-2 h-auto focus-visible:ring-1 focus-visible:ring-ring shadow-none"
          />
        </div>
      </div>

      {/* Time + sources + LinkedIn + Search button */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5 shrink-0">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => onDaysChange(t.value)}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                days === t.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              onClick={() => onToggleSource(s.id)}
              className={`px-2 py-1 text-[11px] font-medium rounded-md border transition-all ${
                sources.includes(s.id)
                  ? s.color
                  : "bg-transparent text-muted-foreground/40 border-border"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors"
        >
          <ExternalLink className="size-3" /> LinkedIn
        </a>

        <button
          onClick={onSearch}
          disabled={loading || !sources.length}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0"
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <RefreshCw className="size-3.5" />
          )}
          {fetched ? "Refresh" : "Search Jobs"}
        </button>
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-md px-2.5 py-1.5">
          <AlertCircle className="size-3.5 shrink-0" />
          <span>
            Could not reach: <strong>{errors.join(", ")}</strong>. Results shown from other sources.
          </span>
        </div>
      )}
    </div>
  );
}
