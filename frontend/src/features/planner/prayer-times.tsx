import { useState } from "react";
import { Moon, MapPin, RefreshCw, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { to24hMin, formatCountdown, toDateStr } from "@/lib/planner-utils";

interface PrayerTimesProps {
  date: string;
  onPrayerTimesLoaded?: (prayers: ReturnType<typeof usePrayerTimes>["prayers"]) => void;
}

export function PrayerTimes({ date, onPrayerTimesLoaded: _ }: PrayerTimesProps) {
  const [open, setOpen] = useState(true);
  const { prayers, loading, error, city, nextIdx, nowMin, refresh } = usePrayerTimes(date);

  const isToday = date === toDateStr(new Date());
  const nextPrayerIdx = isToday ? nextIdx : -1;

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-200",
        open
          ? "border-primary/20 bg-gradient-to-b from-primary/5 to-transparent"
          : "border-border/40 bg-muted/20 hover:border-primary/15",
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <div
          className={cn(
            "size-8 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            open ? "bg-primary/15" : "bg-muted/60",
          )}
        >
          <Moon className={cn("size-4", open ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold", open ? "text-primary" : "text-foreground")}>
            Prayer Times
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            {city ? (
              <>
                <MapPin className="size-2.5 shrink-0" />
                {city}
              </>
            ) : (
              "Azan schedule"
            )}
          </p>
        </div>
        {loading ? (
          <RefreshCw className="size-3.5 text-muted-foreground animate-spin shrink-0" />
        ) : open ? (
          <ChevronUp className="size-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-primary/10 px-3 pb-3 pt-2 space-y-1">
          {loading && (
            <div className="py-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <RefreshCw className="size-3.5 animate-spin" /> Loading prayer times…
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            prayers.map((prayer, i) => {
              const isNext = isToday && i === nextPrayerIdx;
              const isPast = isToday && to24hMin(prayer.time) < nowMin;
              const diff = isNext ? to24hMin(prayer.time) - nowMin : 0;

              return (
                <div
                  key={prayer.name}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl transition-all",
                    isNext
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30"
                      : isPast
                        ? "opacity-40"
                        : "hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <prayer.Icon
                      className={cn(
                        "size-4 shrink-0",
                        isNext ? "text-primary-foreground" : prayer.iconColor,
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "text-xs font-semibold",
                          isNext ? "text-primary-foreground" : "text-foreground",
                        )}
                      >
                        {prayer.name}
                      </p>
                      <p
                        className={cn(
                          "text-[10px]",
                          isNext ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {prayer.arabicName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-xs font-bold font-mono",
                        isNext ? "text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {prayer.time}
                    </p>
                    {isNext && (
                      <p className="text-[10px] text-primary-foreground/70 flex items-center gap-0.5 justify-end">
                        <Clock className="size-2.5" />
                        {formatCountdown(diff)}
                      </p>
                    )}
                    {isPast && !isNext && <p className="text-[10px] text-muted-foreground">done</p>}
                  </div>
                </div>
              );
            })}

          {!loading && !error && prayers.length > 0 && (
            <button
              onClick={refresh}
              className="w-full mt-1 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors py-1 rounded-lg hover:bg-primary/5"
            >
              <RefreshCw className="size-2.5" /> Refresh
            </button>
          )}
        </div>
      )}
    </div>
  );
}
