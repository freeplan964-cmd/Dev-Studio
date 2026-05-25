import {
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
  primaryKey,
  index,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

import { QUESTION_DIFFICULTIES, QUESTION_AREAS, SKILL_ITEM_PRIORITIES, MATERIAL_TYPES } from "../enums.js";

export const questionDifficultyEnum = pgEnum(
  "question_difficulty",
  QUESTION_DIFFICULTIES,
);
export const questionAreaEnum = pgEnum("question_area", QUESTION_AREAS);
export const materialTypeEnum = pgEnum("material_type", MATERIAL_TYPES);

export const interviewQuestions = pgTable(
  "interview_questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id"),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    difficulty: questionDifficultyEnum("difficulty").default("mid"),
    area: questionAreaEnum("area").notNull(),
    tags: text("tags").array().default([]),
    category: text("category"),
    slug: text("slug").default(""),
    favorite: boolean("favorite").default(false),
    answerDepths: jsonb("answer_depths").default([]),
    isGlobal: boolean("is_global").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    index("interview_questions_user_id_idx").on(t.userId),
    index("interview_questions_is_global_idx").on(t.isGlobal),
  ],
);

export const userProgress = pgTable(
  "user_progress",
  {
    userId: text("user_id").notNull(),
    itemId: text("item_id").notNull(),
    areaId: text("area_id").notNull(),
    completed: boolean("completed").default(true),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.itemId] }),
    index("user_progress_user_id_idx").on(t.userId),
  ],
);

export const skillItemPriorityEnum = pgEnum("skill_item_priority", SKILL_ITEM_PRIORITIES);

export const skillTasks = pgTable(
  "skill_tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    areaId: text("area_id").notNull(),
    title: text("title").notNull(),
    notes: text("notes").default(""),
    done: boolean("done").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("skill_tasks_user_area_idx").on(t.userId, t.areaId),
  ],
);

export const skillProjects = pgTable(
  "skill_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    areaId: text("area_id").notNull(),
    title: text("title").notNull(),
    desc: text("desc").default(""),
    url: text("url").default(""),
    tags: text("tags").array().default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("skill_projects_user_area_idx").on(t.userId, t.areaId),
  ],
);

export const materials = pgTable(
  "materials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    areaId: text("area_id").notNull(),
    title: text("title").notNull(),
    author: text("author"),
    url: text("url").notNull(),
    desc: text("desc").notNull(),
    type: materialTypeEnum("type").notNull(),
    free: boolean("free").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("materials_area_id_idx").on(t.areaId),
    index("materials_type_idx").on(t.type),
  ],
);
