import { ElementType } from "react";
import { FocusArea, Difficulty, AnswerDepth } from "../common";
import { SkillConcept, SkillResource, SkillChecklistItem } from "./tech-skills";

/**
 * Soft Skills Type Definitions
 * Centralized types for all soft skill areas and related data structures
 */

// ── Soft Skill Area IDs ────────────────────────────────────────────────────────

export type SoftAreaId = "softskills";

// ── Soft Skill Scenarios & Questions ───────────────────────────────────────────

export interface Scenario {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  createdAt: number;
}

export interface Question {
  id: string;
  title: string;
  guide: string;
  scenarios: Scenario[];
  isDefault?: boolean;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  answerDepths?: AnswerDepth[];
  area: FocusArea;
  difficulty: Difficulty;
  tags: string[];
  category?: string;
  favorite?: boolean;
  isGlobal?: boolean;
  userId?: string;
  createdAt: number;
}

// ── Soft Skill Area Data ───────────────────────────────────────────────────────

export interface SoftSkillAreaData {
  id: SoftAreaId;
  label: string;
  icon: ElementType;
  description: string;
  concepts: SkillConcept[];
  resources: SkillResource[];
  checklist: SkillChecklistItem[];
  subAreasLabel?: string;
  subAreas?: {
    id: string;
    label: string;
    icon?: ElementType;
    color: string;
    accent: string;
    tags: string[];
    concepts?: SkillConcept[];
    resources?: SkillResource[];
    checklist?: SkillChecklistItem[];
  }[];
}

// ── Soft Skill Group Configuration ─────────────────────────────────────────────

export interface SoftSkillGroupItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface SoftSkillGroups {
  [category: string]: SoftSkillGroupItem[];
}

// ── Component Props Types ──────────────────────────────────────────────────────

export interface SoftSkillViewProps {
  activeTab?: string;
}

export interface SoftSkillTabsProps {
  activeTab?: string;
}

export interface Top10ViewProps {
  activeTab?: string;
}

export interface QuestionSidebarProps {
  questions: Question[];
  activeQuestionId?: string;
  onSelectQuestion: (id: string) => void;
  onAddQuestion: () => void;
}

export interface GuideSectionProps {
  question: Question;
  onEditGuide: (guide: string) => void;
}

export interface ScenariosSectionProps {
  scenarios: Scenario[];
  onAddScenario: () => void;
  onEditScenario: (scenario: Scenario) => void;
  onDeleteScenario: (id: string) => void;
}

export interface ScenarioFormProps {
  scenario?: Scenario;
  onSubmit: (scenario: Scenario) => void;
  onCancel: () => void;
}

export interface ScenarioCardProps {
  scenario: Scenario;
  onEdit: (scenario: Scenario) => void;
  onDelete: (id: string) => void;
}

export interface AddQuestionFormProps {
  onSubmit: (question: Question) => void;
  onCancel: () => void;
}
