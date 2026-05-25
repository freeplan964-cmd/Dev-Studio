/**
 * Domain Constants Index
 * Central export point for all domain-level constants
 */

// ── Skills Constants ───────────────────────────────────────────────────────────

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
  SERVICE_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
  SKILL_ITEM_PRIORITIES,
  getAllSoftSkillItems,
  getSoftSkillItemById,
  getSoftSkillCategory,
  isTechArea,
  isSoftSkillArea,
} from "./skills";

export type {
  TechAreaId,
  SoftAreaId,
  SoftSkillItem,
  SoftSkillCategory,
  QuestionDifficulty,
  QuestionArea,
  ServiceCategory,
  TaskPriority,
  TaskStatus,
  SkillItemPriority,
} from "./skills";

// ── Materials Constants ────────────────────────────────────────────────────────

export {
  MATERIAL_TYPES,
  TYPE_LABELS,
  MATERIAL_AREA_IDS,
  MATERIAL_AREA_LABELS,
  MATERIAL_FILTERS,
  isMaterialArea,
  isMaterialType,
} from "./materials";

export type {
  MaterialType,
  Material,
  Area,
  AreaGroup,
  MaterialAreaId,
} from "./materials";
