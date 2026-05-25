/**
 * Skills Types - Backward Compatibility
 * Re-exports from the new organized skills types structure
 * 
 * DEPRECATED: Import directly from @/types/skills/tech-skills or @/types/skills/soft-skills
 * This file is maintained for backward compatibility only.
 */

// Re-export all types from the new structure
export type {
  TechAreaId,
  SkillConcept,
  SkillResource,
  SkillChecklistItem,
  ServiceCategory,
  ServiceSnippet,
  ServiceIntegration,
  SkillSubArea,
  SkillAreaData,
  SkillTask,
  SkillProject,
  SkillAreaProps,
  TasksSectionProps,
  ProjectsSectionProps,
  ResourcesSectionProps,
  ServicesSectionProps,
  OverviewSectionProps,
  InterviewSectionProps,
  SkillTabsProps,
  SectionId,
  SubAreaTab,
} from "./skills/tech-skills";

export type {
  SoftAreaId,
  Scenario,
  Question,
  InterviewQuestion,
  SoftSkillAreaData,
  SoftSkillGroupItem,
  SoftSkillGroups,
  SoftSkillViewProps,
  SoftSkillTabsProps,
  Top10ViewProps,
  QuestionSidebarProps,
  GuideSectionProps,
  ScenariosSectionProps,
  ScenarioFormProps,
  ScenarioCardProps,
  AddQuestionFormProps,
} from "./skills/soft-skills";

// ── Unified Area ID Type ───────────────────────────────────────────────────────

import type { TechAreaId } from "./skills/tech-skills";
import type { SoftAreaId } from "./skills/soft-skills";

export type AreaId = TechAreaId | SoftAreaId;
