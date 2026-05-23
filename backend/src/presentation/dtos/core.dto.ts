import { z } from "zod";
import {
  AGENT_STATUSES,
} from "../../domain/enums.js";

// ── Shared helpers ────────────────────────────────────────────────────────────
const uuidOptional = z.string().uuid().optional();
const tagsArray = z.array(z.string()).default([]);

// ── Agent ─────────────────────────────────────────────────────────────────────
export const AgentDto = z.object({
  id: uuidOptional,
  name: z.string().min(1, "Agent name is required").max(120),
  role: z.string().max(120).optional(),
  systemPrompt: z.string().min(1, "System prompt is required"),
  tools: tagsArray,
  model: z.string().max(80).optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  status: z.enum(AGENT_STATUSES).default("draft"),
  category: z.string().max(80).default(""),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
});

// ── Prompt ────────────────────────────────────────────────────────────────────
export const PromptDto = z.object({
  id: uuidOptional,
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(500).optional(),
  category: z.string().max(80).optional(),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  body: z.string().min(1, "Prompt body is required"),
  variables: tagsArray,
  model: z.string().max(80).optional(),
  favorite: z.boolean().default(false),
  usageCount: z.number().int().min(0).default(0),
  versions: z.array(z.unknown()).default([]),
});

// ── Snippet ───────────────────────────────────────────────────────────────────
export const SnippetDto = z.object({
  id: uuidOptional,
  title: z.string().min(1, "Title is required").max(200),
  language: z.string().min(1, "Language is required").max(60),
  description: z.string().max(500).optional(),
  code: z.string().min(1, "Code is required"),
  category: z.string().max(80).default(""),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
});

// ── Template ──────────────────────────────────────────────────────────────────
export const TemplateDto = z.object({
  id: uuidOptional,
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().max(500).optional(),
  stack: tagsArray,
  category: z.string().max(80).default(""),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  structure: z.string().optional(),
  notes: z.string().optional(),
  files: z.array(z.unknown()).default([]),
});

// ── Component ─────────────────────────────────────────────────────────────────
export const ComponentDto = z.object({
  id: uuidOptional,
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().max(500).optional(),
  category: z.string().max(80).optional(),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  code: z.string().min(1, "Code is required"),
  dependencies: tagsArray,
  favorite: z.boolean().default(false),
  usageCount: z.number().int().min(0).default(0),
});

export type AgentDtoType = z.infer<typeof AgentDto>;
export type PromptDtoType = z.infer<typeof PromptDto>;
export type SnippetDtoType = z.infer<typeof SnippetDto>;
export type TemplateDtoType = z.infer<typeof TemplateDto>;
export type ComponentDtoType = z.infer<typeof ComponentDto>;
