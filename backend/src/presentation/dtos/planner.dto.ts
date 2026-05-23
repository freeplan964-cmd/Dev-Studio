import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES, TASK_CATEGORIES } from "../../domain/enums.js";

const uuidOptional = z.string().uuid().optional();
const tagsArray = z.array(z.string()).default([]);

// ── Planner Task ──────────────────────────────────────────────────────────────
export const PlannerTaskDto = z.object({
  id: uuidOptional,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  title: z.string().min(1, "Title is required").max(300),
  description: z.string().max(2000).optional(),
  priority: z.enum(TASK_PRIORITIES).default("medium"),
  status: z.enum(TASK_STATUSES).default("todo"),
  category: z.enum(TASK_CATEGORIES).default("general"),
  order: z.number().int().min(0).default(0),
  estimatedMinutes: z.number().int().min(1).optional(),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
});

// ── Suggest ───────────────────────────────────────────────────────────────────
export const PlannerSuggestDto = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  tasks: z.array(z.unknown()).default([]),
});

// ── Seed ──────────────────────────────────────────────────────────────────────
export const PlannerSeedDto = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be YYYY-MM").optional(),
  clear: z.boolean().default(false),
});

// ── Query ─────────────────────────────────────────────────────────────────────
export const PlannerQueryDto = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export type PlannerTaskDtoType = z.infer<typeof PlannerTaskDto>;
export type PlannerSuggestDtoType = z.infer<typeof PlannerSuggestDto>;
export type PlannerSeedDtoType = z.infer<typeof PlannerSeedDto>;
export type PlannerQueryDtoType = z.infer<typeof PlannerQueryDto>;
