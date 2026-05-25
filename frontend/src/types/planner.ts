import type { TaskPriority, TaskStatus, TaskCategory } from "@shared/enums";
import type { LucideIcon } from "lucide-react";

export type { TaskPriority, TaskStatus, TaskCategory };

export interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  Icon: LucideIcon;
  iconColor: string;
}

export interface PlannerTask {
  id: string;
  date: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  order: number;
  estimatedMinutes?: number;
  createdAt: number;
  updatedAt: number;
}

export type StatusFilter = "all" | "todo" | "in-progress" | "done";

export interface WeekTheme {
  week: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
}
