import { z } from "zod";
import {
  JOB_STATUSES,
  JOB_PLATFORMS,
  OFFER_STATUSES,
  OFFER_PLATFORMS,
  SERVICE_STATUSES,
  SERVICE_PLATFORMS,
} from "../../domain/enums.js";

const uuidOptional = z.string().uuid().optional();
const tagsArray = z.array(z.string()).default([]);

// ── Saved Job ─────────────────────────────────────────────────────────────────
export const SavedJobDto = z.object({
  id: uuidOptional,
  title: z.string().min(1, "Title is required").max(200),
  company: z.string().max(200).default(""),
  location: z.string().max(200).default(""),
  url: z.string().max(500).default(""),
  platform: z.enum(JOB_PLATFORMS).or(z.literal("")).default(""),
  status: z.enum(JOB_STATUSES).default("saved"),
  salary: z.string().max(100).default(""),
  remote: z.boolean().default(false),
  category: z.string().max(80).default(""),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  notes: z.string().max(2000).default(""),
});

// ── Freelance Offer ───────────────────────────────────────────────────────────
export const FreelanceOfferDto = z.object({
  id: uuidOptional,
  title: z.string().min(1, "Title is required").max(200),
  client: z.string().max(200).default(""),
  platform: z.enum(OFFER_PLATFORMS).or(z.literal("")).default(""),
  budget: z.string().max(100).default(""),
  currency: z.string().max(10).default("USD"),
  status: z.enum(OFFER_STATUSES).default("new"),
  description: z.string().max(5000).default(""),
  url: z.string().max(500).default(""),
  deadline: z.string().max(30).default(""),
  category: z.string().max(80).default(""),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  notes: z.string().max(2000).default(""),
});

// ── My Service ────────────────────────────────────────────────────────────────
export const MyServiceDto = z.object({
  id: uuidOptional,
  title: z.string().min(1, "Title is required").max(200),
  platform: z.enum(SERVICE_PLATFORMS).or(z.literal("")).default(""),
  url: z.string().max(500).default(""),
  category: z.string().max(80).default(""),
  price: z.string().max(100).default(""),
  currency: z.string().max(10).default("USD"),
  status: z.enum(SERVICE_STATUSES).default("active"),
  description: z.string().max(5000).default(""),
  deliveryDays: z.number().int().min(1).default(3),
  tags: tagsArray,
  slug: z.string().max(120).default(""),
  notes: z.string().max(2000).default(""),
});

export type SavedJobDtoType = z.infer<typeof SavedJobDto>;
export type FreelanceOfferDtoType = z.infer<typeof FreelanceOfferDto>;
export type MyServiceDtoType = z.infer<typeof MyServiceDto>;

// ── Job Queries ───────────────────────────────────────────────────────────────
export const RemoteJobsQueryDto = z.object({
  tag: z.string().optional().default(""),
});

export const ScrapeJobsQueryDto = z.object({
  q: z.string().optional().default("full stack developer"),
  location: z.string().optional().default(""),
  days: z.coerce.number().min(1).max(30).optional().default(1),
  sources: z.string().optional().default("indeed,wuzzuf,bayt,remoteok"),
});
