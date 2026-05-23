import { Router } from "express";
import { getAll, create, deleteById } from "../controllers/offers.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { FreelanceOfferDto } from "../dtos/career.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(FreelanceOfferDto), create);
router.delete("/:id", validateParams(IdParamDto), deleteById);

export default router;
