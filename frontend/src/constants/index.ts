/**
 * Centralized Constants Index
 * Single source of truth for all application constants
 * Organized by category: colors, UI components, icons, navigation, and filters
 */

// ── Colors ─────────────────────────────────────────────────────────────────────

export {
  MATERIAL_TYPE_COLORS,
  JOB_STATUS_COLORS,
  OFFER_STATUS_COLORS,
  SERVICE_STATUS_COLORS,
  PLATFORM_COLORS,
  CV_FOCUS_COLORS,
  DIFFICULTY_COLORS,
  DEPTH_COLORS,
  PROVIDER_COLORS,
  PRAYER_TIME_COLORS,
  ACTIVITY_TYPE_COLORS,
  getStatusColor,
} from "./colors";

// ── Icons ──────────────────────────────────────────────────────────────────────

export {
  ICON_REGISTRY,
  resolveIcon,
  PRAYER_ICONS,
  ACTIVITY_ICONS,
  TECH_DOMAIN_ICONS,
  SOCIAL_PLATFORM_ICONS,
  MAIL_CHANNEL_ICONS,
  CONNECTOR_TYPE_ICONS,
  CV_SECTION_ICONS,
  TOOLS_TAB_ICONS,
  SOFT_SKILLS_TAB_ICONS,
  TECH_SKILLS_TAB_ICONS,
  WORKSPACE_NAV_ICONS,
  COMMUNICATION_NAV_ICONS,
  FREELANCE_NAV_ICONS,
  SKILLS_NAV_ICONS,
} from "./icons";

// ── Navigation ─────────────────────────────────────────────────────────────────

export {
  WORKSPACE_NAV,
  COMMUNICATION_NAV,
  FREELANCE_NAV,
  SKILLS_NAV,
  SOCIAL_TABS,
  MAIL_TABS,
  CONNECTORS_TABS,
  BUILDER_TABS,
  JOBS_TABS,
  SOFT_SKILL_TABS,
  TECH_SKILL_TABS,
  TOOLS_TABS,
  getTabLabel,
} from "./navigation";

export type {
  WorkspaceNavItem,
  CommunicationNavItem,
  FreelanceNavItem,
  SkillsNavItem,
  SocialTab,
  MailTab,
  ConnectorTab,
  CVBuilderTab,
  JobsTab,
  SoftSkillTab,
  TechSkillTab,
  ToolsTab,
} from "./navigation";

// ── Filters ────────────────────────────────────────────────────────────────────

export {
  MATERIAL_FILTERS,
  JOB_STATUS_FILTERS,
  OFFER_STATUS_FILTERS,
  SERVICE_STATUS_FILTERS,
  PLATFORM_FILTERS,
  CV_FOCUS_FILTERS,
  DIFFICULTY_FILTERS,
  DOMAIN_FILTERS,
  SOFT_SKILL_CATEGORY_FILTERS,
  TECH_SKILL_AREA_FILTERS,
  ACTIVITY_TYPE_FILTERS,
  SOCIAL_PLATFORM_FILTERS,
  MAIL_CHANNEL_FILTERS,
  CONNECTOR_TYPE_FILTERS,
  CONNECTOR_CONTACT_FILTERS,
  MAIL_LIST_FILTERS,
  SOCIAL_DATE_FILTERS,
  JOB_SIDEBAR_FILTERS,
  getFilterOptions,
} from "./filters";

// ── Labels ────────────────────────────────────────────────────────────────────

export * from "./labels";

// ── UI Components (Legacy - kept for backward compatibility) ────────────────────

export {
  ACTIVITY_TABS,
} from "./ui";

export type { ActivityTab } from "./ui";

// ── Enums & Types ──────────────────────────────────────────────────────────────

export type {
  // Skills
  SoftSkillItem,
  SoftSkillCategory,
  QuestionDifficulty,
  QuestionArea,
  ServiceCategory,
  TaskPriority,
  TaskStatus,
  // Materials
  MaterialType,
  MaterialAreaId,
  // Career & Jobs
  JobStatus,
  OfferStatus,
  ServiceStatus,
  JobPlatform,
  OfferPlatform,
  ServicePlatform,
  TaskCategory,
  // CV
  CVFocus,
  CVLanguageLevel,
  ATSGrade,
  // Core & Assets
  AgentStatus,
  AssetKind,
  // Notifications & Activity
  NotificationType,
  ActivityAction,
  ActivityEntityType,
  // Integrations
  ConnectorType,
  SocialPlatform,
  MailChannel,
} from "./enums";

// ── Data Constants (from data folder) ──────────────────────────────────────────

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
  DOMAINS,
} from "../data/skills";
export * from "../data/materials";
export { MATERIAL_AREA_GROUPS } from "../data/materials/areas";
export { DIFFICULTIES, FOCUS_AREAS } from "../data/tech/interview";
export * from "../data/jobs/jobs";
export * from "../data/planner/planner";
export * from "../data/planner/activities";

// ── Job & Freelance Categories ─────────────────────────────────────────────────

export { JOB_CATEGORIES, OFFER_CATEGORIES, FREELANCE_SERVICE_CATEGORIES } from "../types/jobs";

// ── System & Types ────────────────────────────────────────────────────────────

export * from "@/types/system";
