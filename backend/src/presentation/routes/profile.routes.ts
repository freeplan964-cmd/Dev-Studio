import { Router } from "express";
import { getAll, create } from "../controllers/profile.controller.js";
import { validateBody } from "../middleware/validation.js";
import { ProfileDto } from "../dtos/profile.dto.js";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(ProfileDto), create);

export default router;
