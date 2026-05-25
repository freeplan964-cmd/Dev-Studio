/**
 * Centralized Materials Constants
 * Shared across frontend and backend for consistency
 * 
 * Data is seeded from backend database
 */

// ── Material Types ─────────────────────────────────────────────────────────────

export type MaterialType = "book" | "course" | "docs" | "tool";

export const MATERIAL_TYPES = ["book", "course", "docs", "tool"] as const;

export const TYPE_LABELS: Record<MaterialType, string> = {
  book: "Book",
  course: "Course",
  docs: "Docs",
  tool: "Tool",
};

// ── Material Interfaces ────────────────────────────────────────────────────────

export interface Material {
  title: string;
  author?: string;
  url: string;
  desc: string;
  type: MaterialType;
  free?: boolean;
}

export interface Area {
  id: string;
  label: string;
  materials: Material[];
}

export interface AreaGroup {
  label: string;
  areas: Area[];
}

// ── Material Area IDs ──────────────────────────────────────────────────────────

export const MATERIAL_AREA_IDS = [
  "frontend",
  "backend",
  "devops",
  "testing",
  "database",
  "architecture",
  "design-systems",
  "solid",
  "clean-code",
  "performance",
  "security",
  "algorithms",
] as const;

export type MaterialAreaId = (typeof MATERIAL_AREA_IDS)[number];

export const MATERIAL_AREA_LABELS: Record<MaterialAreaId, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  testing: "Testing",
  database: "Database",
  architecture: "Architecture",
  "design-systems": "Design Systems",
  solid: "SOLID & Patterns",
  "clean-code": "Clean Code",
  performance: "Performance",
  security: "Security",
  algorithms: "Algorithms & DSA",
};

// ── Filters ────────────────────────────────────────────────────────────────────

export const MATERIAL_FILTERS: { id: MaterialType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "book", label: "Books" },
  { id: "course", label: "Courses" },
  { id: "docs", label: "Docs" },
  { id: "tool", label: "Tools" },
];

// ── Utility Functions ──────────────────────────────────────────────────────────

export function isMaterialArea(areaId: string): boolean {
  return MATERIAL_AREA_IDS.includes(areaId as MaterialAreaId);
}

export function isMaterialType(type: string): type is MaterialType {
  return MATERIAL_TYPES.includes(type as MaterialType);
}
