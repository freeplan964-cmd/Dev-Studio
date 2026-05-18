import type { TechAreaId, SkillAreaData } from "../../types/skills";
import { frontendArea } from "./frontend";
import { backendArea } from "./backend";
import { databaseArea } from "./database";
import { devopsArea } from "./devops";
import { testingArea } from "./testing";
import { designPatternsArea } from "./design-patterns";
import { architectureArea } from "./architecture";
import { systemDesignArea } from "./system-design";
import { microservicesArea } from "./microservices";
import { securityArea } from "./security";
import { performanceArea } from "./performance";
import { softSkillsArea } from "./soft-skills";

export const TECH_AREAS: Record<TechAreaId, SkillAreaData> = {
  frontend: frontendArea,
  backend: backendArea,
  database: databaseArea,
  devops: devopsArea,
  testing: testingArea,
  "design-patterns": designPatternsArea,
  architecture: architectureArea,
  "system-design": systemDesignArea,
  microservices: microservicesArea,
  security: securityArea,
  performance: performanceArea,
};

export const SOFT_SKILLS_DATA: SkillAreaData = softSkillsArea;
