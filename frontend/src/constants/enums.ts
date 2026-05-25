/**
 * Centralized Enums & Types Index
 * Re-exports all enums and types from their source locations
 * Organized by domain
 */

// ── Skills Enums & Types ───────────────────────────────────────────────────────

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
} from "../data/skills";

export type {
  SoftSkillItem,
  SoftSkillCategory,
  QuestionDifficulty,
  QuestionArea,
  ServiceCategory,
  TaskPriority,
  TaskStatus,
} from "../data/skills";

// ── Materials Enums & Types ────────────────────────────────────────────────────

export {
  MATERIAL_TYPES,
  TYPE_LABELS,
  MATERIAL_AREA_IDS,
  MATERIAL_AREA_LABELS,
} from "../data/materials";

export type {
  MaterialType,
  MaterialAreaId,
} from "../data/materials";

// ── Career & Jobs Enums & Types (from backend shared enums) ────────────────────

export type {
  JobStatus,
  OfferStatus,
  ServiceStatus,
  JobPlatform,
  OfferPlatform,
  ServicePlatform,
  TaskCategory,
  CVFocus,
  CVLanguageLevel,
  ATSGrade,
  AgentStatus,
  AssetKind,
  NotificationType,
  ActivityAction,
  ActivityEntityType,
  ConnectorType,
  SocialPlatform,
  MailChannel,
} from "@shared/enums";
