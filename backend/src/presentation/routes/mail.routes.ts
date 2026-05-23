import { Router } from "express";
import { getAll, create, createBulk, deleteById } from "../controllers/mail.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { MailTemplateDto } from "../dtos/integrations.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(MailTemplateDto), create);
router.post("/bulk", validateBody(z.array(MailTemplateDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
