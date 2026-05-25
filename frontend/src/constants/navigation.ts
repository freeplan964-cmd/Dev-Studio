/**
 * Centralized Navigation Constants
 * All navigation items, tabs, and routing configurations
 * Organized by feature domain
 */

import type { LucideIcon } from "lucide-react";
import {
  WORKSPACE_NAV_ICONS,
  COMMUNICATION_NAV_ICONS,
  FREELANCE_NAV_ICONS,
  SKILLS_NAV_ICONS,
  SOCIAL_PLATFORM_ICONS,
  MAIL_CHANNEL_ICONS,
  CONNECTOR_TYPE_ICONS,
  CV_SECTION_ICONS,
  TOOLS_TAB_ICONS,
  SOFT_SKILLS_TAB_ICONS,
  TECH_SKILLS_TAB_ICONS,
} from "./icons";

// ── Workspace Navigation ───────────────────────────────────────────────────────

export interface WorkspaceNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const WORKSPACE_NAV: WorkspaceNavItem[] = [
  { to: "/", label: "Dashboard", icon: WORKSPACE_NAV_ICONS.dashboard },
  { to: "/planner", label: "Planner", icon: WORKSPACE_NAV_ICONS.planner },
  { to: "/tools", label: "Tools", icon: WORKSPACE_NAV_ICONS.tools },
] as const;

// ── Communication Navigation ───────────────────────────────────────────────────

export interface CommunicationNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  match: string[];
  search: Record<string, string>;
}

export const COMMUNICATION_NAV: CommunicationNavItem[] = [
  {
    to: "/social",
    label: "Social Media",
    icon: COMMUNICATION_NAV_ICONS.social,
    match: ["/social"],
    search: { tab: "linkedin" },
  },
  {
    to: "/mails",
    label: "Mails & Messaging",
    icon: COMMUNICATION_NAV_ICONS.mails,
    match: ["/mails"],
    search: { tab: "cover-letter" },
  },
  {
    to: "/connectors",
    label: "Connectors",
    icon: COMMUNICATION_NAV_ICONS.connectors,
    match: ["/connectors"],
    search: { tab: "companies" },
  },
  {
    to: "/cv",
    label: "CV Builder",
    icon: COMMUNICATION_NAV_ICONS.cv,
    match: ["/cv"],
    search: {},
  },
] as const;

// ── Freelance Navigation ───────────────────────────────────────────────────────

export interface FreelanceNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  match: string[];
  search: Record<string, string>;
}

export const FREELANCE_NAV: FreelanceNavItem[] = [
  {
    to: "/jobs",
    label: "Jobs & Freelance",
    icon: FREELANCE_NAV_ICONS.jobs,
    match: ["/jobs"],
    search: { tab: "jobs" },
  },
] as const;

// ── Skills Navigation ──────────────────────────────────────────────────────────

export interface SkillsNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  match: string[];
  search: Record<string, string>;
}

export const SKILLS_NAV: SkillsNavItem[] = [
  {
    to: "/tech-skills",
    label: "Tech Skills",
    icon: SKILLS_NAV_ICONS["tech-skills"],
    match: ["/tech-skills"],
    search: { tab: "frontend" },
  },
  {
    to: "/soft-skills",
    label: "Soft Skills",
    icon: SKILLS_NAV_ICONS["soft-skills"],
    match: ["/soft-skills"],
    search: { tab: "communication" },
  },
] as const;

// ── Social Platform Tabs ───────────────────────────────────────────────────────

export interface SocialTab {
  id: "linkedin" | "twitter" | "instagram";
  label: string;
  icon: LucideIcon;
}

export const SOCIAL_TABS: SocialTab[] = [
  { id: "linkedin", label: "LinkedIn", icon: SOCIAL_PLATFORM_ICONS.linkedin },
  { id: "twitter", label: "X / Twitter", icon: SOCIAL_PLATFORM_ICONS.twitter },
  { id: "instagram", label: "Instagram", icon: SOCIAL_PLATFORM_ICONS.instagram },
] as const;

// ── Mail Channel Tabs ──────────────────────────────────────────────────────────

export interface MailTab {
  id: "cover-letter" | "gmail" | "whatsapp";
  label: string;
  icon: LucideIcon;
}

export const MAIL_TABS: MailTab[] = [
  { id: "cover-letter", label: "Cover Letters", icon: MAIL_CHANNEL_ICONS["cover-letter"] },
  { id: "gmail", label: "Gmail", icon: MAIL_CHANNEL_ICONS.gmail },
  { id: "whatsapp", label: "WhatsApp", icon: MAIL_CHANNEL_ICONS.whatsapp },
] as const;

// ── Connector Type Tabs ────────────────────────────────────────────────────────

export interface ConnectorTab {
  id: "companies" | "hr" | "clients";
  label: string;
  icon: LucideIcon;
}

export const CONNECTORS_TABS: ConnectorTab[] = [
  { id: "companies", label: "Companies", icon: CONNECTOR_TYPE_ICONS.companies },
  { id: "hr", label: "HR Contacts", icon: CONNECTOR_TYPE_ICONS.hr },
  { id: "clients", label: "Clients", icon: CONNECTOR_TYPE_ICONS.clients },
] as const;

// ── CV Builder Tabs ────────────────────────────────────────────────────────────

export interface CVBuilderTab {
  id: "personal" | "experience" | "skills" | "education" | "projects" | "ats";
  label: string;
  icon: LucideIcon;
}

export const BUILDER_TABS: CVBuilderTab[] = [
  { id: "personal", label: "Personal", icon: CV_SECTION_ICONS.personal },
  { id: "experience", label: "Experience", icon: CV_SECTION_ICONS.experience },
  { id: "skills", label: "Skills", icon: CV_SECTION_ICONS.skills },
  { id: "education", label: "Education", icon: CV_SECTION_ICONS.education },
  { id: "projects", label: "Projects", icon: CV_SECTION_ICONS.projects },
  { id: "ats", label: "ATS Check", icon: CV_SECTION_ICONS.ats },
] as const;

// ── Jobs Tabs ──────────────────────────────────────────────────────────────────

export interface JobsTab {
  id: "jobs" | "offers" | "services";
  label: string;
}

export const JOBS_TABS: JobsTab[] = [
  { id: "jobs", label: "Jobs" },
  { id: "offers", label: "Offers" },
  { id: "services", label: "Services" },
] as const;

// ── Soft Skills Tabs ───────────────────────────────────────────────────────────

export interface SoftSkillTab {
  id: "top-10" | "communication" | "leadership" | "problem-solving" | "teamwork" | "ai-mock";
  label: string;
  icon: LucideIcon;
}

export const SOFT_SKILL_TABS: SoftSkillTab[] = [
  { id: "top-10", label: "Top 10", icon: SOFT_SKILLS_TAB_ICONS["top-10"] },
  { id: "communication", label: "Communication", icon: SOFT_SKILLS_TAB_ICONS.communication },
  { id: "leadership", label: "Leadership", icon: SOFT_SKILLS_TAB_ICONS.leadership },
  { id: "problem-solving", label: "Problem Solving", icon: SOFT_SKILLS_TAB_ICONS["problem-solving"] },
  { id: "teamwork", label: "Teamwork", icon: SOFT_SKILLS_TAB_ICONS.teamwork },
  { id: "ai-mock", label: "AI Mock Chat", icon: SOFT_SKILLS_TAB_ICONS["ai-mock"] },
] as const;

// ── Tech Skills Tabs ───────────────────────────────────────────────────────────

export interface TechSkillTab {
  to: string;
  search: Record<string, string>;
  label: string;
  icon: LucideIcon;
  id: "frontend" | "backend" | "devops" | "testing" | "database" | "materials" | "ai-mock";
}

export const TECH_SKILL_TABS: TechSkillTab[] = [
  {
    to: "/tech-skills",
    search: { tab: "frontend" },
    label: "Frontend",
    icon: TECH_SKILLS_TAB_ICONS.frontend,
    id: "frontend",
  },
  {
    to: "/tech-skills",
    search: { tab: "backend" },
    label: "Backend",
    icon: TECH_SKILLS_TAB_ICONS.backend,
    id: "backend",
  },
  {
    to: "/tech-skills",
    search: { tab: "devops" },
    label: "DevOps",
    icon: TECH_SKILLS_TAB_ICONS.devops,
    id: "devops",
  },
  {
    to: "/tech-skills",
    search: { tab: "testing" },
    label: "Testing",
    icon: TECH_SKILLS_TAB_ICONS.testing,
    id: "testing",
  },
  {
    to: "/tech-skills",
    search: { tab: "database" },
    label: "Database",
    icon: TECH_SKILLS_TAB_ICONS.database,
    id: "database",
  },
  {
    to: "/tech-skills",
    search: { tab: "materials" },
    label: "Materials",
    icon: TECH_SKILLS_TAB_ICONS.materials,
    id: "materials",
  },
  {
    to: "/tech-skills",
    search: { tab: "ai-mock" },
    label: "AI Mock Chat",
    icon: TECH_SKILLS_TAB_ICONS["ai-mock"],
    id: "ai-mock",
  },
] as const;

// ── Tools Tabs ─────────────────────────────────────────────────────────────────

export interface ToolsTab {
  id: "prompts" | "agents" | "components" | "templates" | "snippets";
  label: string;
  icon: LucideIcon;
}

export const TOOLS_TABS: ToolsTab[] = [
  { id: "prompts", label: "Prompts", icon: TOOLS_TAB_ICONS.prompts },
  { id: "agents", label: "Agents", icon: TOOLS_TAB_ICONS.agents },
  { id: "components", label: "Components", icon: TOOLS_TAB_ICONS.components },
  { id: "templates", label: "Templates", icon: TOOLS_TAB_ICONS.templates },
  { id: "snippets", label: "Snippets", icon: TOOLS_TAB_ICONS.snippets },
] as const;

// ── Utility: Get tab label ─────────────────────────────────────────────────────

export function getTabLabel(
  tabId: string,
  tabGroup:
    | "tools"
    | "soft-skills"
    | "tech-skills"
    | "cv"
    | "jobs"
    | "mail"
    | "social"
    | "connectors"
): string {
  const tabs = {
    tools: TOOLS_TABS,
    "soft-skills": SOFT_SKILL_TABS,
    "tech-skills": TECH_SKILL_TABS,
    cv: BUILDER_TABS,
    jobs: JOBS_TABS,
    mail: MAIL_TABS,
    social: SOCIAL_TABS,
    connectors: CONNECTORS_TABS,
  };

  const tab = tabs[tabGroup].find((t) => t.id === tabId);
  return tab?.label || "";
}
