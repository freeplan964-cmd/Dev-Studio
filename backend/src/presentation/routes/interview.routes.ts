import { Router } from "express";
import {
  getQuestions,
  postQuestions,
  postQuestionsBulk,
  deleteQuestionsById,
  getProgress,
  postProgressToggle,
} from "../controllers/interview.controller.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { InterviewQuestionDto, ProgressToggleDto } from "../dtos/learning.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

const router = Router();
router.get("/questions", getQuestions);
router.post("/questions", validateBody(InterviewQuestionDto), postQuestions);
router.post("/questions/bulk", validateBody(z.array(InterviewQuestionDto)), postQuestionsBulk);
router.delete("/questions/:id", validateParams(IdParamDto), deleteQuestionsById);
router.get("/progress", getProgress);
router.post("/progress/toggle", validateBody(ProgressToggleDto), postProgressToggle);

export default router;
