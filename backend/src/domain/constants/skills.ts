/**
 * Centralized Skills Constants
 * Shared across frontend and backend for consistency
 * 
 * This file contains all skill-related constants including:
 * - Skill area IDs and labels
 * - Soft skill groups and categories
 * - Interview configuration
 * - Service categories
 */

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

export type TechAreaId = (typeof TECH_AREA_IDS)[number];

export const TECH_AREA_LABELS: Record<TechAreaId, string> = {
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
export type SoftAreaId = typeof SOFT_AREA_ID;

export const SOFT_SKILL_AREA_LABEL = "Soft Skills";

// ── Soft Skill Groups & Categories ────────────────────────────────────────────

export interface SoftSkillItem {
  id: string;
  label: string;
}

export interface SoftSkillCategory {
  [category: string]: SoftSkillItem[];
}

export const SOFT_SKILL_GROUPS: SoftSkillCategory = {
  leadership: [
    { id: "time", label: "Time Management" },
    { id: "growth", label: "Growth Mindset" },
    { id: "mental-models", label: "Mental Models" },
  ],
  teamwork: [
    { id: "conflict", label: "Conflict Resolution" },
    { id: "remote", label: "Remote Collaboration" },
    { id: "pairing", label: "Pair Programming" },
    { id: "code-review", label: "Code Review Culture" },
    { id: "agile", label: "Agile / Scrum" },
  ],
};

// ── Special Sub-Areas ──────────────────────────────────────────────────────────

export const SPECIAL_SUB_AREAS = {
  TOP_10: {
    id: "top-10",
    label: "Top 10 Questions",
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

// ── Skill Item Priorities ──────────────────────────────────────────────────────

export const SKILL_ITEM_PRIORITIES = ["low", "medium", "high"] as const;
export type SkillItemPriority = (typeof SKILL_ITEM_PRIORITIES)[number];

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
  return TECH_AREA_IDS.includes(areaId as TechAreaId);
}

/**
 * Check if an area ID is a soft skill area
 */
export function isSoftSkillArea(areaId: string): boolean {
  return areaId === SOFT_AREA_ID;
}
