/**
 * Centralized Label Constants
 * Human-readable display labels for enum values and category lists
 * Organized by feature domain
 */

// ── Job Status Labels ──────────────────────────────────────────────────────────

export const JOB_STATUS_LABELS: Record<string, string> = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

// ── Offer Status Labels ────────────────────────────────────────────────────────

export const OFFER_STATUS_LABELS: Record<string, string> = {
  new: "New",
  in_review: "In Review",
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Done",
};

// ── Service Status Labels ──────────────────────────────────────────────────────

export const SERVICE_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  paused: "Paused",
  draft: "Draft",
};
