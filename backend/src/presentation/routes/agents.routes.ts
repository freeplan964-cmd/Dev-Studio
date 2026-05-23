import { Router } from "express";
import { getAll, create, createBulk, deleteById } from "../controllers/agents.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { AgentDto } from "../dtos/core.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(AgentDto), create);
router.post("/bulk", validateBody(z.array(AgentDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
