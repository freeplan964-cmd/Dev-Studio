import { Router } from "express";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
  getProjects,
  upsertProject,
  deleteProject,
} from "../controllers/skills.controller.js";
import { validateBody, validateQuery, validateParams } from "../middleware/validation.js";
import { SkillTaskDto, SkillTaskToggleDto, SkillProjectDto, SkillAreaQueryDto } from "../dtos/skills.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";

const router = Router();

// Tasks
router.get("/tasks", validateQuery(SkillAreaQueryDto), getTasks);
router.post("/tasks", validateBody(SkillTaskDto), createTask);
router.patch("/tasks/:id", validateParams(IdParamDto), validateBody(SkillTaskToggleDto), toggleTask);
router.delete("/tasks/:id", validateParams(IdParamDto), deleteTask);

// Projects
router.get("/projects", validateQuery(SkillAreaQueryDto), getProjects);
router.post("/projects", validateBody(SkillProjectDto), upsertProject);
router.delete("/projects/:id", validateParams(IdParamDto), deleteProject);

export default router;
