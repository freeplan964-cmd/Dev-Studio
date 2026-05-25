/**
 * Centralized Filter Constants
 * All filter configurations and filter-related data
 * Organized by feature domain
 */

// ── Material Filters ───────────────────────────────────────────────────────────

export const MATERIAL_FILTERS = {
  type: ["book", "course", "docs", "tool"],
  area: [
    "frontend",
    "backend",
    "devops",
    "testing",
    "database",
    "architecture",
    "design-systems",
    "solid",
    "clean-code",
    "performance",
    "security",
    "algorithms",
  ],
} as const;

// ── Job Status Filters ─────────────────────────────────────────────────────────

export const JOB_STATUS_FILTERS = ["saved", "applied", "interview", "offer", "rejected"] as const;

// ── Offer Status Filters ──────────────────────────────────────────────────────

export const OFFER_STATUS_FILTERS = ["new", "in_review", "accepted", "rejected", "completed"] as const;

// ── Service Status Filters ────────────────────────────────────────────────────

export const SERVICE_STATUS_FILTERS = ["active", "paused", "draft"] as const;

// ── Platform Filters ──────────────────────────────────────────────────────────

export const PLATFORM_FILTERS = [
  "Fiverr",
  "Mostaql",
  "Khamsat",
  "Upwork",
  "Freelancer",
  "LinkedIn",
  "Indeed",
  "RemoteOK",
  "Wuzzuf",
  "Bayt",
  "Toptal",
  "PeoplePerHour",
  "Glassdoor",
  "AngelList",
  "We Work Remotely",
  "Other",
] as const;

// ── CV Focus Filters ──────────────────────────────────────────────────────────

export const CV_FOCUS_FILTERS = ["frontend", "backend", "fullstack", "general"] as const;

// ── Interview Difficulty Filters ──────────────────────────────────────────────

export const DIFFICULTY_FILTERS = ["junior", "mid", "senior"] as const;

// ── Interview Domain Filters ──────────────────────────────────────────────────

export const DOMAIN_FILTERS = [
  "frontend",
  "backend",
  "database",
  "devops",
  "architecture",
  "core",
] as const;

// ── Soft Skill Category Filters ────────────────────────────────────────────────

export const SOFT_SKILL_CATEGORY_FILTERS = [
  "communication",
  "leadership",
  "problem-solving",
  "teamwork",
] as const;

// ── Tech Skill Area Filters ────────────────────────────────────────────────────

export const TECH_SKILL_AREA_FILTERS = [
  "frontend",
  "backend",
  "devops",
  "testing",
  "database",
] as const;

// ── Activity Type Filters ──────────────────────────────────────────────────────

export const ACTIVITY_TYPE_FILTERS = ["prayer", "sports", "care", "food"] as const;

// ── Social Platform Filters ───────────────────────────────────────────────────

export const SOCIAL_PLATFORM_FILTERS = ["linkedin", "twitter", "instagram"] as const;

// ── Mail Channel Filters ──────────────────────────────────────────────────────

export const MAIL_CHANNEL_FILTERS = ["cover-letter", "gmail", "whatsapp"] as const;

// ── Connector Type Filters ────────────────────────────────────────────────────

export const CONNECTOR_TYPE_FILTERS = ["companies", "hr", "clients"] as const;

// ── Sidebar List Filter Options ────────────────────────────────────────────────

export const CONNECTOR_CONTACT_FILTERS = [
  { label: "All", value: "all" },
  { label: "Has Email", value: "email" },
  { label: "Has Phone", value: "phone" },
];

export const MAIL_LIST_FILTERS = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "A–Z", value: "az" },
];

export const SOCIAL_DATE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "Older", value: "older" },
];

export const JOB_SIDEBAR_FILTERS = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
];

// ── Utility: Get filter options ────────────────────────────────────────────────

export function getFilterOptions(
  filterType:
    | "material-type"
    | "material-area"
    | "job-status"
    | "offer-status"
    | "service-status"
    | "platform"
    | "cv-focus"
    | "difficulty"
    | "domain"
    | "soft-skill-category"
    | "tech-skill-area"
    | "activity-type"
    | "social-platform"
    | "mail-channel"
    | "connector-type"
): readonly string[] {
  const filters = {
    "material-type": MATERIAL_FILTERS.type,
    "material-area": MATERIAL_FILTERS.area,
    "job-status": JOB_STATUS_FILTERS,
    "offer-status": OFFER_STATUS_FILTERS,
    "service-status": SERVICE_STATUS_FILTERS,
    platform: PLATFORM_FILTERS,
    "cv-focus": CV_FOCUS_FILTERS,
    difficulty: DIFFICULTY_FILTERS,
    domain: DOMAIN_FILTERS,
    "soft-skill-category": SOFT_SKILL_CATEGORY_FILTERS,
    "tech-skill-area": TECH_SKILL_AREA_FILTERS,
    "activity-type": ACTIVITY_TYPE_FILTERS,
    "social-platform": SOCIAL_PLATFORM_FILTERS,
    "mail-channel": MAIL_CHANNEL_FILTERS,
    "connector-type": CONNECTOR_TYPE_FILTERS,
  };

  return filters[filterType] || [];
}
