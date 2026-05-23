import { Router } from "express";
import { create } from "../controllers/chat.controller.js";
import { validateBody } from "../middleware/validation.js";
import { ChatDto } from "../dtos/chat.dto.js";

const router = Router();
router.post("/completions", validateBody(ChatDto), create);

export default router;
