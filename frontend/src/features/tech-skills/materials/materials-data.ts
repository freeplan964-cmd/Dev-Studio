/**
 * Materials Data - Backward Compatibility
 * Re-exports from the centralized materials constants
 * 
 * DEPRECATED: Import directly from @/data/materials
 * This file is maintained for backward compatibility only.
 */

// Re-export all types and constants from centralized location
export type { MaterialType, Material, Area, AreaGroup } from "@/data/materials";
export {
  TYPE_LABELS,
  TYPE_COLORS,
  MATERIAL_TYPE_OPTIONS as FILTERS,
} from "@/data/materials";
