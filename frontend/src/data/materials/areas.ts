/**
 * Materials Areas Configuration
 * Defines all material areas with icons, labels, and grouping
 */

import {
  Code2,
  Server,
  Cloud,
  TestTube,
  Database,
  Palette,
  Layers,
  Zap,
  Lightbulb,
  Gauge,
  Shield,
  Binary,
  type LucideIcon,
} from "lucide-react";
import type { MaterialAreaId } from "./constants";

export interface MaterialArea {
  id: MaterialAreaId;
  label: string;
  icon: LucideIcon;
  materials?: any[];
}

export interface MaterialAreaGroup {
  label: string;
  areas: MaterialArea[];
}

// ── Material Areas with Icons ──────────────────────────────────────────────────

const MATERIAL_AREAS: Record<MaterialAreaId, MaterialArea> = {
  frontend: {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
  },
  backend: {
    id: "backend",
    label: "Backend",
    icon: Server,
  },
  devops: {
    id: "devops",
    label: "DevOps",
    icon: Cloud,
  },
  testing: {
    id: "testing",
    label: "Testing",
    icon: TestTube,
  },
  database: {
    id: "database",
    label: "Database",
    icon: Database,
  },
  architecture: {
    id: "architecture",
    label: "Architecture",
    icon: Layers,
  },
  "design-systems": {
    id: "design-systems",
    label: "Design Systems",
    icon: Palette,
  },
  solid: {
    id: "solid",
    label: "SOLID & Patterns",
    icon: Zap,
  },
  "clean-code": {
    id: "clean-code",
    label: "Clean Code",
    icon: Lightbulb,
  },
  performance: {
    id: "performance",
    label: "Performance",
    icon: Gauge,
  },
  security: {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  algorithms: {
    id: "algorithms",
    label: "Algorithms & DSA",
    icon: Binary,
  },
};

// ── Material Area Groups ───────────────────────────────────────────────────────

export const MATERIAL_AREA_GROUPS: MaterialAreaGroup[] = [
  {
    label: "Core Skills",
    areas: [
      MATERIAL_AREAS.frontend,
      MATERIAL_AREAS.backend,
      MATERIAL_AREAS.database,
    ],
  },
  {
    label: "Infrastructure",
    areas: [
      MATERIAL_AREAS.devops,
      MATERIAL_AREAS.architecture,
    ],
  },
  {
    label: "Quality & Testing",
    areas: [
      MATERIAL_AREAS.testing,
      MATERIAL_AREAS.performance,
      MATERIAL_AREAS.security,
    ],
  },
  {
    label: "Design & Patterns",
    areas: [
      MATERIAL_AREAS["design-systems"],
      MATERIAL_AREAS.solid,
      MATERIAL_AREAS["clean-code"],
    ],
  },
  {
    label: "Fundamentals",
    areas: [
      MATERIAL_AREAS.algorithms,
    ],
  },
];

// ── Utility Functions ──────────────────────────────────────────────────────────

/**
 * Get material area by ID
 */
export function getMaterialAreaById(id: MaterialAreaId): MaterialArea | undefined {
  return MATERIAL_AREAS[id];
}

/**
 * Get all material areas flattened
 */
export function getAllMaterialAreas(): MaterialArea[] {
  return Object.values(MATERIAL_AREAS);
}
