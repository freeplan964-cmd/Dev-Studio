import { z } from "zod";

// ── User Profile ──────────────────────────────────────────────────────────────
export const ProfileDto = z.object({
  displayName: z.string().min(1).max(120).optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z.string().max(200).optional(),
});

export type ProfileDtoType = z.infer<typeof ProfileDto>;
