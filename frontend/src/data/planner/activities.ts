import { ACTIVITY_ICONS } from "@/constants/icons";
import { STORAGE_KEYS } from "@/types/system";
import type { LucideIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  done: boolean;
  time?: string;
}

export interface ActivitySuggestion {
  Icon: LucideIcon;
  label: string;
  bestTime: string;
  reason: string;
}

export type InnerTab = "prayer" | "sports" | "care" | "food";

export const INNER_TABS: { id: InnerTab; label: string; icon: LucideIcon; color: string }[] = [
  { id: "prayer", label: "Prayer", icon: ACTIVITY_ICONS.prayer, color: "text-indigo-500" },
  { id: "sports", label: "Sports", icon: ACTIVITY_ICONS.sports, color: "text-blue-500" },
  { id: "care", label: "Care", icon: ACTIVITY_ICONS.care, color: "text-rose-500" },
  { id: "food", label: "Food", icon: ACTIVITY_ICONS.food, color: "text-amber-500" },
];

export const ACTIVITIES_STORAGE_KEY = STORAGE_KEYS.ACTIVITIES;
export const PRAYER_TRACKER_KEY = STORAGE_KEYS.PRAYER_TRACKER;
