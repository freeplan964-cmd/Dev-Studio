import { TECH_DOMAIN_ICONS } from "@/constants/icons";
import type { Difficulty, FocusArea } from "@/types/common";

export const DIFFICULTIES: Difficulty[] = ["junior", "mid", "senior"];

export const FOCUS_AREAS: FocusArea[] = [
  "frontend",
  "backend",
  "devops",
  "testing",
  "database",
  "general",
];

export const DEPTH_LABEL_PRESETS = [
  "Deep dive",
  "Code example",
  "Real-world scenario",
  "Common mistake / Gotcha",
  "Follow-up question",
  "Step-by-step",
  "Senior perspective",
  "Custom…",
];

export const DOMAINS = [
  { id: "frontend", label: "Frontend", icon: TECH_DOMAIN_ICONS.frontend },
  { id: "backend", label: "Backend", icon: TECH_DOMAIN_ICONS.backend },
  { id: "database", label: "Database", icon: TECH_DOMAIN_ICONS.database },
  { id: "devops", label: "DevOps", icon: TECH_DOMAIN_ICONS.devops },
  { id: "architecture", label: "Architecture", icon: TECH_DOMAIN_ICONS.architecture },
  { id: "core", label: "Core CS", icon: TECH_DOMAIN_ICONS.core },
];
