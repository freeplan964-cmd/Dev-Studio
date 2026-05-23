import { Router } from "express";
import { getAll, create, deleteById } from "../controllers/services.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { MyServiceDto } from "../dtos/career.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(MyServiceDto), create);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
