import { useState, useEffect, useRef } from "react";
import { TrendingUp, Pencil, Check } from "lucide-react";
import { STORAGE_KEYS } from "@/types/system";
import { Textarea } from "@/components/ui/textarea";

const ACHV_KEY = STORAGE_KEYS.WEEK_ACHIEVEMENTS;

function loadAchievements(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(ACHV_KEY) ?? "{}");
  } catch {
    return {};
  }
}
function saveAchievements(map: Record<string, string>) {
  try {
    localStorage.setItem(ACHV_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn("[planner-sidebar] Failed to save achievements:", err);
  }
}

interface WeekAchievementsProps {
  weekKey: string;
}

export function WeekAchievements({ weekKey }: WeekAchievementsProps) {
  const [editingAchv, setEditingAchv] = useState(false);
  const [achievements, setAchievements] = useState<Record<string, string>>(loadAchievements);
  const achvRef = useRef<HTMLTextAreaElement>(null);

  const achvText = achievements[weekKey] ?? "";

  const handleAchvChange = (val: string) => {
    const updated = { ...achievements, [weekKey]: val };
    setAchievements(updated);
    saveAchievements(updated);
  };

  useEffect(() => {
    if (editingAchv) achvRef.current?.focus();
  }, [editingAchv]);

  return (
    <div className="px-2.5 py-1.5 shrink-0">
      <div className="rounded-xl border border-border/40 bg-background overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30">
          <TrendingUp className="size-3.5 text-primary shrink-0" />
          <span className="text-[11px] font-semibold flex-1">Week Achievements</span>
          <button
            onClick={() => setEditingAchv((v) => !v)}
            className="size-5 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            {editingAchv ? <Check className="size-3" /> : <Pencil className="size-3" />}
          </button>
        </div>
        {editingAchv ? (
          <Textarea
            ref={achvRef}
            value={achvText}
            onChange={(e) => handleAchvChange(e.target.value)}
            onBlur={() => setEditingAchv(false)}
            placeholder={`e.g. DevOps 3d, Security 2d, AI 1d…`}
            rows={3}
            className="px-3 py-2 text-[11px] bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground/40 text-foreground border-0 shadow-none focus-visible:ring-0 rounded-none"
          />
        ) : (
          <div onClick={() => setEditingAchv(true)} className="px-3 py-2 min-h-[52px] cursor-text">
            {achvText ? (
              <p className="text-[11px] text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {achvText}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground/40 italic">Tap to add achievements…</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
