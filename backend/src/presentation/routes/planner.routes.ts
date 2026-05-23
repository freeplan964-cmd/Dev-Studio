import { Router } from "express";
import {
  getAll,
  getPresets,
  create,
  deleteById,
  postSuggest,
  postSeed,
} from "../controllers/planner.controller.js";
import { validateBody, validateQuery, validateParams } from "../middleware/validation.js";
import { PlannerTaskDto, PlannerSuggestDto, PlannerSeedDto, PlannerQueryDto } from "../dtos/planner.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";

const router = Router();
router.get("/", validateQuery(PlannerQueryDto), getAll);
router.get("/presets", getPresets);
router.post("/", validateBody(PlannerTaskDto), create);
router.delete("/:id", validateParams(IdParamDto), deleteById);
router.post("/suggest", validateBody(PlannerSuggestDto), postSuggest);
router.post("/seed", validateBody(PlannerSeedDto), postSeed);

export default router;
