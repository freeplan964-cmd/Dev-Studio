import {
  Coffee,
  Salad,
  UtensilsCrossed,
  Dumbbell,
  Footprints,
  HeartPulse,
  Sparkles,
  Droplets,
  BedDouble,
  Briefcase,
  Timer,
  MessageSquare,
  BookOpen,
  Monitor,
  FileCode2,
  type LucideIcon,
} from "lucide-react";
import type { PrayerTime } from "@/types/planner";
import type { ActivitySuggestion } from "@/data/planner/activities";
import { to24hMin, formatMinutesLabel } from "@/lib/planner-utils";

export const ICON_MAP: Record<string, LucideIcon> = {
  Coffee,
  Salad,
  UtensilsCrossed,
  Dumbbell,
  Footprints,
  HeartPulse,
  Sparkles,
  Droplets,
  BedDouble,
  Briefcase,
  Timer,
  MessageSquare,
  BookOpen,
  Monitor,
  FileCode2,
};

export function getPrayerSuggestions(
  prayers: PrayerTime[],
  templates: any,
): {
  food: ActivitySuggestion[];
  sports: ActivitySuggestion[];
  care: ActivitySuggestion[];
} {
  const { Activity } = { Activity: Sparkles };
  const result = {
    food: [] as ActivitySuggestion[],
    sports: [] as ActivitySuggestion[],
    care: [] as ActivitySuggestion[],
  };

  if (!templates || Object.keys(templates).length === 0) {
    return result;
  }

  const categories = ["food", "sports", "care"] as const;
  const fajrMin = to24hMin(prayers.find((p) => p.name === "Fajr")?.time ?? "05:00");
  const dhuhrMin = to24hMin(prayers.find((p) => p.name === "Dhuhr")?.time ?? "12:00");
  const asrMin = to24hMin(prayers.find((p) => p.name === "Asr")?.time ?? "15:30");
  const maghribMin = to24hMin(prayers.find((p) => p.name === "Maghrib")?.time ?? "18:30");
  const ishaMin = to24hMin(prayers.find((p) => p.name === "Isha")?.time ?? "20:00");
  const f = formatMinutesLabel;

  const getMinVal = (anchor: string) => {
    switch (anchor) {
      case "Fajr": return fajrMin;
      case "Dhuhr": return dhuhrMin;
      case "Asr": return asrMin;
      case "Maghrib": return maghribMin;
      case "Isha": return ishaMin;
      default: return 0;
    }
  };

  for (const cat of categories) {
    const list = templates[cat] || [];
    result[cat] = list.map((item: any) => {
      const Icon = ICON_MAP[item.iconName] || Activity;

      if (prayers.length === 0) {
        return {
          Icon,
          label: item.label,
          bestTime: item.fallbackTime,
          reason: item.fallbackReason,
        };
      }

      let bestTime = "";
      if (item.anchorStart && item.anchorEnd) {
        const start = getMinVal(item.anchorStart) + (item.offsetStart || 0);
        const end = getMinVal(item.anchorEnd) + (item.offsetEnd || 0);
        bestTime = `${f(start)} – ${f(end)}`;
      } else if (item.anchor) {
        const base = getMinVal(item.anchor);
        const start = base + (item.offsetStart || 0);
        const end = base + (item.offsetEnd || 0);
        bestTime = `${f(start)} – ${f(end)}`;
      } else {
        bestTime = item.fallbackTime;
      }

      return {
        Icon,
        label: item.label,
        bestTime,
        reason: item.reasonTemplate,
      };
    });
  }

  return result;
}
