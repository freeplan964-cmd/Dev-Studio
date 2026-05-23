import { z } from "zod";
import { TECH_AREA_IDS } from "../../domain/enums.js";

const areaId = z.enum(TECH_AREA_IDS);

// ── Skill Task ────────────────────────────────────────────────────────────────
export const SkillTaskDto = z.object({
  areaId,
  title: z.string().min(1, "Title is required").max(300),
  notes: z.string().max(2000).default(""),
});

export const SkillTaskToggleDto = z.object({
  done: z.boolean(),
});

// ── Skill Project ─────────────────────────────────────────────────────────────
export const SkillProjectDto = z.object({
  id: z.string().uuid().optional(),
  areaId,
  title: z.string().min(1, "Title is required").max(300),
  desc: z.string().max(2000).default(""),
  url: z.string().max(500).default(""),
  tags: z.array(z.string().max(50)).default([]),
});

// ── Query ─────────────────────────────────────────────────────────────────────
export const SkillAreaQueryDto = z.object({
  areaId,
});

export type SkillTaskDtoType = z.infer<typeof SkillTaskDto>;
export type SkillProjectDtoType = z.infer<typeof SkillProjectDto>;
