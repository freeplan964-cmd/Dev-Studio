/**
 * Materials Seeds Index
 * Aggregates all learning resources from individual area files
 */

import { frontendMaterials } from "./frontend.js";
import { backendMaterials } from "./backend.js";
import { devopsMaterials } from "./devops.js";
import { testingMaterials } from "./testing.js";
import { databaseMaterials } from "./database.js";
import { architectureMaterials } from "./architecture.js";
import { designSystemsMaterials } from "./design-systems.js";
import { solidMaterials } from "./solid.js";
import { cleanCodeMaterials } from "./clean-code.js";
import { performanceMaterials } from "./performance.js";
import { securityMaterials } from "./security.js";
import { algorithmsMaterials } from "./algorithms.js";

export const seedMaterials = [
  ...frontendMaterials,
  ...backendMaterials,
  ...devopsMaterials,
  ...testingMaterials,
  ...databaseMaterials,
  ...architectureMaterials,
  ...designSystemsMaterials,
  ...solidMaterials,
  ...cleanCodeMaterials,
  ...performanceMaterials,
  ...securityMaterials,
  ...algorithmsMaterials,
];
