import { Router } from "express";
import { getAll, create, createBulk, deleteById } from "../controllers/social.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { SocialDraftDto } from "../dtos/integrations.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(SocialDraftDto), create);
router.post("/bulk", validateBody(z.array(SocialDraftDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
