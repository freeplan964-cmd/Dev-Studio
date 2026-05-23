import { z } from "zod";

export const RegisterDto = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  displayName: z.string().min(1).max(80).optional(),
});

export const LoginDto = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const VerifyEmailDto = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  code: z.string().min(1, "Verification code is required"),
});

export const ResendVerificationDto = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
export type LoginDtoType = z.infer<typeof LoginDto>;
export type VerifyEmailDtoType = z.infer<typeof VerifyEmailDto>;
export type ResendVerificationDtoType = z.infer<typeof ResendVerificationDto>;
