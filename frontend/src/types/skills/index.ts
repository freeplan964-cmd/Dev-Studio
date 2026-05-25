/**
 * Skills Types Index
 * Central export point for all tech and soft skills types
 */

// ── Tech Skills Exports ────────────────────────────────────────────────────────

export type { TechAreaId } from "./tech-skills";
export type {
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
} from "./tech-skills";

// ── Soft Skills Exports ────────────────────────────────────────────────────────

export type { SoftAreaId } from "./soft-skills";
export type {
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
} from "./soft-skills";

// ── Unified Area ID Type ───────────────────────────────────────────────────────

import type { TechAreaId } from "./tech-skills";
import type { SoftAreaId } from "./soft-skills";

export type AreaId = TechAreaId | SoftAreaId;
