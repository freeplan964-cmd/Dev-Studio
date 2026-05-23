import { Router } from "express";
import { getAll, create, createBulk, deleteById } from "../controllers/snippets.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { SnippetDto } from "../dtos/core.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(SnippetDto), create);
router.post("/bulk", validateBody(z.array(SnippetDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
