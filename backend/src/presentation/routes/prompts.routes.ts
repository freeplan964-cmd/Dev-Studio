import { Router } from "express";
import { getAll, create, createBulk, deleteById } from "../controllers/prompts.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { PromptDto } from "../dtos/core.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(PromptDto), create);
router.post("/bulk", validateBody(z.array(PromptDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
