import { z } from "zod";
import { QUESTION_DIFFICULTIES, QUESTION_AREAS } from "../../domain/enums.js";

const uuidOptional = z.string().uuid().optional();
const tagsArray = z.array(z.string()).default([]);

// ── Interview Question ────────────────────────────────────────────────────────
export const InterviewQuestionDto = z.object({
  id: uuidOptional,
  question: z.string().min(1, "Question is required").max(1000),
  answer: z.string().min(1, "Answer is required"),
  difficulty: z.enum(QUESTION_DIFFICULTIES).default("mid"),
  area: z.enum(QUESTION_AREAS),
  tags: tagsArray,
  category: z.string().max(80).optional(),
  slug: z.string().max(120).default(""),
  favorite: z.boolean().default(false),
  answerDepths: z.array(z.unknown()).default([]),
  isGlobal: z.boolean().default(false),
});

// ── Progress Toggle ───────────────────────────────────────────────────────────
export const ProgressToggleDto = z.object({
  itemId: z.string().min(1, "itemId is required"),
  areaId: z.string().min(1, "areaId is required"),
  completed: z.boolean(),
});

export type InterviewQuestionDtoType = z.infer<typeof InterviewQuestionDto>;
export type ProgressToggleDtoType = z.infer<typeof ProgressToggleDto>;
