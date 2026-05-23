import { Router } from "express";
import { getAll, create, deleteById, postAtsCheck, postParsePdf } from "../controllers/cv.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { CvProfileDto, AtsCheckDto, ParsePdfDto } from "../dtos/cv.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(CvProfileDto), create);
router.delete("/:id", validateParams(IdParamDto), deleteById);
router.post("/ats-check", validateBody(AtsCheckDto), postAtsCheck);
router.post("/parse-pdf", validateBody(ParsePdfDto), postParsePdf);

export default router;
