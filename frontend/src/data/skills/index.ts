/**
 * Skills Data & Constants Index
 * Central export point for all skills-related data, constants, and types
 */

// ── Constants ──────────────────────────────────────────────────────────────────

export {
  TECH_AREA_IDS,
  TECH_AREA_LABELS,
  SOFT_AREA_ID,
  SOFT_SKILL_AREA_LABEL,
  SOFT_SKILL_GROUPS,
  SPECIAL_SUB_AREAS,
  QUESTION_DIFFICULTIES,
  QUESTION_AREAS,
  DEPTH_LABEL_PRESETS,
  DOMAINS,
  DIFFICULTY_COLORS,
  DEPTH_COLORS,
  SERVICE_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
  getAllSoftSkillItems,
  getSoftSkillItemById,
  getSoftSkillCategory,
  isTechArea,
  isSoftSkillArea,
} from "./constants";

export type {
  SoftSkillItem,
  SoftSkillCategory,
  QuestionDifficulty,
  QuestionArea,
  ServiceCategory,
  TaskPriority,
  TaskStatus,
  DomainConfig,
} from "./constants";

// ── Types ──────────────────────────────────────────────────────────────────────

export type { TechAreaId } from "../../types/skills";
export type { SoftAreaId, SkillAreaData } from "../../types/skills";

// ── Legacy Exports (for backward compatibility) ────────────────────────────────

export { top10SubArea } from "./areas/top10";
