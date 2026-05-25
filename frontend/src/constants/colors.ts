/**
 * Centralized Color Constants
 * All color schemes and styling for the application
 * Organized by feature domain
 */

// ── Material Type Colors ───────────────────────────────────────────────────────

export const MATERIAL_TYPE_COLORS = {
  book: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  course: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  docs: "bg-green-500/10 text-green-500 border-green-500/20",
  tool: "bg-purple-500/10 text-purple-500 border-purple-500/20",
} as const;

// ── Job Status Colors ──────────────────────────────────────────────────────────

export const JOB_STATUS_COLORS = {
  saved: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  applied: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  interview: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  offer: "bg-green-500/15 text-green-400 border-green-500/20",
  rejected: "bg-red-500/15 text-red-400 border-red-500/20",
} as const;

// ── Offer Status Colors ────────────────────────────────────────────────────────

export const OFFER_STATUS_COLORS = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  in_review: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  accepted: "bg-green-500/15 text-green-400 border-green-500/20",
  rejected: "bg-red-500/15 text-red-400 border-red-500/20",
  completed: "bg-teal-500/15 text-teal-400 border-teal-500/20",
} as const;

// ── Service Status Colors ──────────────────────────────────────────────────────

export const SERVICE_STATUS_COLORS = {
  active: "bg-green-500/15 text-green-400 border-green-500/20",
  paused: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  draft: "bg-muted text-muted-foreground border-border",
} as const;

// ── Platform Colors ───────────────────────────────────────────────────────────

export const PLATFORM_COLORS = {
  Fiverr: "bg-emerald-500/15 text-emerald-400",
  Mostaql: "bg-amber-500/15 text-amber-400",
  Khamsat: "bg-rose-500/15 text-rose-400",
  Upwork: "bg-green-500/15 text-green-400",
  Freelancer: "bg-blue-500/15 text-blue-400",
  LinkedIn: "bg-sky-500/15 text-sky-400",
  Indeed: "bg-indigo-500/15 text-indigo-400",
  RemoteOK: "bg-cyan-500/15 text-cyan-400",
  Wuzzuf: "bg-teal-500/15 text-teal-400",
  Bayt: "bg-orange-500/15 text-orange-400",
  Toptal: "bg-blue-600/15 text-blue-300",
  PeoplePerHour: "bg-orange-500/15 text-orange-400",
  Glassdoor: "bg-teal-500/15 text-teal-400",
  AngelList: "bg-rose-500/15 text-rose-400",
  "We Work Remotely": "bg-indigo-500/15 text-indigo-400",
  Other: "bg-muted text-muted-foreground",
} as const;

// ── CV Focus Colors ───────────────────────────────────────────────────────────

export const CV_FOCUS_COLORS = {
  frontend: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  backend: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  fullstack: "bg-teal-500/15 text-teal-400 border-teal-500/20",
  general: "bg-muted text-muted-foreground border-border",
} as const;

// ── Interview Difficulty Colors ───────────────────────────────────────────────

export const DIFFICULTY_COLORS = {
  junior: "bg-primary/10 text-primary border-primary/20",
  mid: "bg-primary/10 text-primary border-primary/20",
  senior: "bg-primary/10 text-primary border-primary/20",
} as const;

// ── Interview Depth Colors ────────────────────────────────────────────────────

export const DEPTH_COLORS = [
  "border-primary/30 bg-primary/5 text-primary",
  "border-primary/40 bg-primary/10 text-primary",
  "border-primary/50 bg-primary/15 text-primary",
  "border-primary/60 bg-primary/20 text-primary",
  "border-primary/70 bg-primary/25 text-primary",
  "border-primary/80 bg-primary/30 text-primary",
] as const;

// ── AI Model Provider Colors ───────────────────────────────────────────────────

export const PROVIDER_COLORS = {
  openai: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  anthropic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  google: "bg-blue-500/10 text-blue-400 border-blue-500/20",
} as const;

// ── Prayer Time Colors ─────────────────────────────────────────────────────────

export const PRAYER_TIME_COLORS = {
  Fajr: "text-indigo-400",
  Dhuhr: "text-amber-500",
  Asr: "text-sky-400",
  Maghrib: "text-orange-500",
  Isha: "text-violet-400",
} as const;

// ── Activity Type Colors ───────────────────────────────────────────────────────

export const ACTIVITY_TYPE_COLORS = {
  prayer: "text-indigo-500",
  sports: "text-blue-500",
  care: "text-pink-500",
  food: "text-orange-500",
} as const;

// ── Utility: Get color by status ───────────────────────────────────────────────

export function getStatusColor(
  status: string,
  type: "job" | "offer" | "service" | "platform" | "focus" | "difficulty" | "provider" | "activity"
): string {
  switch (type) {
    case "job":
      return JOB_STATUS_COLORS[status as keyof typeof JOB_STATUS_COLORS] || "";
    case "offer":
      return OFFER_STATUS_COLORS[status as keyof typeof OFFER_STATUS_COLORS] || "";
    case "service":
      return SERVICE_STATUS_COLORS[status as keyof typeof SERVICE_STATUS_COLORS] || "";
    case "platform":
      return PLATFORM_COLORS[status as keyof typeof PLATFORM_COLORS] || "";
    case "focus":
      return CV_FOCUS_COLORS[status as keyof typeof CV_FOCUS_COLORS] || "";
    case "difficulty":
      return DIFFICULTY_COLORS[status as keyof typeof DIFFICULTY_COLORS] || "";
    case "provider":
      return PROVIDER_COLORS[status as keyof typeof PROVIDER_COLORS] || "";
    case "activity":
      return ACTIVITY_TYPE_COLORS[status as keyof typeof ACTIVITY_TYPE_COLORS] || "";
    default:
      return "";
  }
}
