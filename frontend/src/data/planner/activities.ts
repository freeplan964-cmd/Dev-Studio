import {
  Moon,
  Dumbbell,
  Bath,
  Utensils,
  LucideIcon,
} from "lucide-react";
import { STORAGE_KEYS } from "../../constants/system";

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
  { id: "prayer", label: "Prayer", icon: Moon, color: "text-indigo-500" },
  { id: "sports", label: "Sports", icon: Dumbbell, color: "text-blue-500" },
  { id: "care", label: "Care", icon: Bath, color: "text-rose-500" },
  { id: "food", label: "Food", icon: Utensils, color: "text-amber-500" },
];

export const ACTIVITIES_STORAGE_KEY = STORAGE_KEYS.ACTIVITIES;
export const PRAYER_TRACKER_KEY = STORAGE_KEYS.PRAYER_TRACKER;
