/**
 * Materials Data & Constants Index
 * Central export point for all materials-related data and constants
 */

export {
  MATERIAL_TYPES,
  TYPE_LABELS,
  TYPE_COLORS,
  MATERIAL_AREA_IDS,
  MATERIAL_AREA_LABELS,
  MATERIAL_TYPE_OPTIONS,

  isMaterialArea,
} from "./constants";

export type {
  MaterialType,
  Material,
  Area,
  AreaGroup,
  MaterialAreaId,
} from "./constants";

export {
  MATERIAL_AREA_GROUPS,
  getMaterialAreaById,
  getAllMaterialAreas,
} from "./areas";

export type {
  MaterialArea,
  MaterialAreaGroup,
} from "./areas";
