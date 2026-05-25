/**
 * Centralized Skills Constants
 * Shared across frontend and backend for consistency
 * 
 * This file contains all skill-related constants including:
 * - Skill area IDs and labels
 * - Soft skill groups and categories
 * - Interview configuration
 * - Color schemes and styling
 */

import {
  Clock,
  Sparkles,
  Brain,
  Swords,
  Wifi,
  Terminal,
  GitPullRequest,
  Repeat2,
  Trophy,
} from "lucide-react";
import type { ElementType } from "react";

// ── Tech Skill Area IDs ────────────────────────────────────────────────────────

export const TECH_AREA_IDS = [
  "frontend",
  "backend",
  "devops",
  "testing",
  "database",
  "design-patterns",
  "architecture",
  "system-design",
  "microservices",
  "security",
  "performance",
] as const;

export const TECH_AREA_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  testing: "Testing",
  database: "Database",
  "design-patterns": "Design Patterns",
  architecture: "Architecture",
  "system-design": "System Design",
  microservices: "Microservices",
  security: "Security",
  performance: "Performance",
};

// ── Soft Skill Area IDs ────────────────────────────────────────────────────────

export const SOFT_AREA_ID = "softskills" as const;

export const SOFT_SKILL_AREA_LABEL = "Soft Skills";

// ── Soft Skill Groups & Categories ────────────────────────────────────────────

export interface SoftSkillItem {
  id: string;
  label: string;
  icon?: ElementType;
}

export interface SoftSkillCategory {
  [category: string]: SoftSkillItem[];
}

export const SOFT_SKILL_GROUPS: Record<string, { id: string; label: string; icon?: ElementType }[]> = {
  leadership: [
    { id: "time", label: "Time Management", icon: Clock },
    { id: "growth", label: "Growth Mindset", icon: Sparkles },
    { id: "mental-models", label: "Mental Models", icon: Brain },
  ],
  teamwork: [
    { id: "conflict", label: "Conflict Resolution", icon: Swords },
    { id: "remote", label: "Remote Collaboration", icon: Wifi },
    { id: "pairing", label: "Pair Programming", icon: Terminal },
    { id: "code-review", label: "Code Review Culture", icon: GitPullRequest },
    { id: "agile", label: "Agile / Scrum", icon: Repeat2 },
  ],
};

// ── Special Sub-Areas ──────────────────────────────────────────────────────────

export const SPECIAL_SUB_AREAS = {
  TOP_10: {
    id: "top-10",
    label: "Top 10 Questions",
    icon: Trophy,
    color: "border-primary/40 bg-primary/10 text-primary",
    accent: "border-primary/30",
    tags: ["interview", "hr", "behavioral", "career"],
  },
} as const;

// ── Interview Configuration ────────────────────────────────────────────────────

export const QUESTION_DIFFICULTIES = ["junior", "mid", "senior"] as const;
export type QuestionDifficulty = (typeof QUESTION_DIFFICULTIES)[number];

export const QUESTION_AREAS = [
  "frontend",
  "backend",
  "devops",
  "testing",
  "database",
  "softskills",
  "general",
] as const;
export type QuestionArea = (typeof QUESTION_AREAS)[number];

export const DEPTH_LABEL_PRESETS = [
  "Deep dive",
  "Code example",
  "Real-world scenario",
  "Common mistake / Gotcha",
  "Follow-up question",
  "Step-by-step",
  "Senior perspective",
  "Custom…",
] as const;

// ── Domain Configuration ───────────────────────────────────────────────────────

export interface DomainConfig {
  id: string;
  label: string;
  icon: ElementType;
}

export const DOMAINS: DomainConfig[] = [
  { id: "frontend", label: "Frontend", icon: Terminal },
  { id: "backend", label: "Backend", icon: Terminal },
  { id: "database", label: "Database", icon: Terminal },
  { id: "devops", label: "DevOps", icon: Terminal },
  { id: "architecture", label: "Architecture", icon: Terminal },
  { id: "core", label: "Core CS", icon: Terminal },
];

// ── Service Categories ─────────────────────────────────────────────────────────

export const SERVICE_CATEGORIES = [
  "auth",
  "payment",
  "email",
  "cache",
  "queue",
  "storage",
  "realtime",
  "monitoring",
  "search",
] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

// ── Task & Project Configuration ───────────────────────────────────────────────

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

// ── Utility Functions ──────────────────────────────────────────────────────────

/**
 * Get all soft skill items flattened
 */
export function getAllSoftSkillItems(): SoftSkillItem[] {
  return Object.values(SOFT_SKILL_GROUPS).flat();
}

/**
 * Get soft skill item by ID
 */
export function getSoftSkillItemById(id: string): SoftSkillItem | undefined {
  return getAllSoftSkillItems().find((item) => item.id === id);
}

/**
 * Get soft skill category for an item ID
 */
export function getSoftSkillCategory(itemId: string): string | undefined {
  for (const [category, items] of Object.entries(SOFT_SKILL_GROUPS)) {
    if (items.some((item) => item.id === itemId)) {
      return category;
    }
  }
  return undefined;
}

/**
 * Check if an area ID is a tech area
 */
export function isTechArea(areaId: string): boolean {
  return TECH_AREA_IDS.includes(areaId as any);
}

/**
 * Check if an area ID is a soft skill area
 */
export function isSoftSkillArea(areaId: string): boolean {
  return areaId === SOFT_AREA_ID;
}
