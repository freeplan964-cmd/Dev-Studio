/**
 * Centralized UI Component Constants (Legacy)
 * This file is kept for backward compatibility
 * New constants should be added to navigation.ts or other specific files
 */

import type { LucideIcon } from "lucide-react";
import { Moon, Dumbbell, User } from "lucide-react";
import { ACTIVITY_ICONS } from "./icons";

// ── Activity Inner Tabs (Legacy - kept for backward compatibility) ────────────

export interface ActivityTab {
  id: "prayer" | "sports" | "care" | "food";
  label: string;
  icon: LucideIcon;
  color: string;
}

export const ACTIVITY_TABS: ActivityTab[] = [
  { id: "prayer", label: "Prayer", icon: ACTIVITY_ICONS.prayer, color: "text-indigo-500" },
  { id: "sports", label: "Sports", icon: ACTIVITY_ICONS.sports, color: "text-blue-500" },
  { id: "care", label: "Care", icon: User, color: "text-pink-500" },
  { id: "food", label: "Food", icon: ACTIVITY_ICONS.food, color: "text-orange-500" },
] as const;
