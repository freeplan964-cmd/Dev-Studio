import type {
  JobStatus,
  OfferStatus,
  ServiceStatus,
  JobPlatform,
  OfferPlatform,
  ServicePlatform,
} from "@shared/enums";

import {
  JOB_STATUSES,
  OFFER_STATUSES,
  SERVICE_STATUSES,
  JOB_PLATFORMS,
  OFFER_PLATFORMS,
  SERVICE_PLATFORMS,
} from "@shared/enums";

export type {
  JobStatus,
  OfferStatus,
  ServiceStatus,
  JobPlatform,
  OfferPlatform,
  ServicePlatform,
};

export {
  JOB_STATUSES,
  OFFER_STATUSES,
  SERVICE_STATUSES,
  JOB_PLATFORMS,
  OFFER_PLATFORMS,
  SERVICE_PLATFORMS,
};

export const JOB_CATEGORIES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Remote",
] as const;

export const OFFER_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "WordPress / CMS",
  "E-commerce",
  "Backend / API",
  "Full Stack",
  "Data & Analytics",
  "Content Writing",
  "SEO / Marketing",
  "DevOps",
  "Consulting",
  "Other",
] as const;

export const FREELANCE_SERVICE_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Copywriting",
  "SEO",
  "Digital Marketing",
  "Video Editing",
  "Data Entry",
  "Translation",
  "Consulting",
  "Other",
];

export interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  platform: JobPlatform | string;
  status: JobStatus;
  salary: string;
  remote: boolean;
  category: string;
  tags: string[];
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface FreelanceOffer {
  id: string;
  title: string;
  client: string;
  platform: OfferPlatform | string;
  budget: string;
  currency: string;
  status: OfferStatus;
  description: string;
  url: string;
  deadline: string;
  category: string;
  tags: string[];
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface MyService {
  id: string;
  title: string;
  platform: ServicePlatform | string;
  url: string;
  category: string;
  price: string;
  currency: string;
  status: ServiceStatus;
  description: string;
  deliveryDays: number;
  tags: string[];
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface RemoteJob {
  id: string;
  url: string;
  title: string;
  company: string;
  company_logo?: string;
  location: string;
  tags: string[];
  salary_min?: number;
  salary_max?: number;
  date: string;
  description?: string;
}

export interface ScrapedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  source: string;
  postedAt: string;
  tags?: string[];
  salary?: string;
  logo?: string;
}
