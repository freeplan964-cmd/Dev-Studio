import { Router, Request, Response, NextFunction } from "express";
import { validateBody, validateParams } from "../middleware/validation.js";
import { RegisterDto, LoginDto, VerifyEmailDto, ResendVerificationDto } from "../dtos/auth.dto.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../../infrastructure/database/index.js";
import { authUsers } from "../../domain/schema.js";
import { eq, or } from "drizzle-orm";
import { authService } from "../../infrastructure/di/container.js";
import { uow } from "../../infrastructure/repositories/drizzle-unit-of-work.js";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "supersecretjwtkey_devstudio_2026_secure_random_string";
const COOKIE_NAME = "ds_token";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export function signToken(userId: string) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function sendToken(
  res: Response,
  userId: string,
  user: Record<string, unknown>,
) {
  const token = signToken(userId);
  res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
  res.json({ user });
}

export function safeUser(u: typeof authUsers.$inferSelect) {
  return {
    id: u.id,
    email: u.email,
    displayName: u.displayName,
    avatarUrl: u.avatarUrl,
    name: u.displayName ?? u.email ?? "User",
    profileImage: u.avatarUrl ?? null,
    isVerified: u.isVerified,
  };
}

// --- Handlers ---

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const existing = await authService.findUserByEmail(email);
    if (existing)
      return res
        .status(409)
        .json({ error: "An account with this email already exists" });

    const user = await authService.registerUser(email, password, displayName);
    console.log(
      `[auth] Dev Verification Code for ${user.email}: ${user.verificationToken}`,
    );

    res.json({
      requireVerification: true,
      email: user.email,
      devVerificationCode: user.verificationToken,
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    console.error("[auth] register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const user = await authService.findUserByEmail(email);
    if (!user || !user.passwordHash)
      return res.status(401).json({ error: "Invalid email or password" });

    const valid = await authService.verifyPassword(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });

    if (!user.isVerified) {
      const updated = await authService.createNewVerificationToken(user.id);
      console.log(
        `[auth] New Dev Verification Code for ${user.email}: ${updated.verificationToken}`,
      );
      return res.status(403).json({
        error: "Please verify your email first",
        requireVerification: true,
        email: user.email,
        devVerificationCode: updated.verificationToken,
      });
    }

    sendToken(res, user.id, safeUser(user));
  } catch (err) {
    console.error("[auth] login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified) return sendToken(res, user.id, safeUser(user));

    if (user.verificationToken !== code)
      return res.status(400).json({ error: "Invalid verification code" });

    if (
      user.verificationTokenExpires &&
      new Date() > user.verificationTokenExpires
    )
      return res
        .status(400)
        .json({
          error: "Verification code has expired. Please request a new one.",
        });

    const updated = await authService.verifyUserEmail(user.id);
    sendToken(res, updated.id, safeUser(updated));
  } catch (err) {
    console.error("[auth] verify-email error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified)
      return res.json({ message: "Email is already verified" });

    const updated = await authService.createNewVerificationToken(user.id);
    console.log(
      `[auth] Resent Dev Verification Code for ${email}: ${updated.verificationToken}`,
    );
    res.json({
      requireVerification: true,
      email: user.email,
      devVerificationCode: updated.verificationToken,
    });
  } catch (err) {
    console.error("[auth] resend-verification error:", err);
    res.status(500).json({ error: "Failed to resend verification code" });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
};

export const getUser = async (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    const user = await authService.findUserById(payload.sub);
    if (!user) return res.status(401).json({ error: "User not found" });
    res.json(safeUser(user));
  } catch {
    res.status(401).json({ error: "Invalid session" });
  }
};

export const getConfig = (_req: Request, res: Response) => {
  res.json({
    googleEnabled: !!(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ),
  });
};

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as typeof authUsers.$inferSelect;
  const frontendUrl = process.env.FRONTEND_URL || "https://dev-studio77.netlify.app";
  if (!user) return res.redirect(`${frontendUrl}/auth?error=google_failed`);
  const token = signToken(user.id);
  res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
  res.redirect(`${frontendUrl}/`);
};

// --- Google OAuth Passport Setup ---

export function setupGooglePassport() {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    console.warn(
      "[auth] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET not set — Google login disabled",
    );
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: "/api/auth/google/callback",
        scope: ["profile", "email"],
        proxy: true,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase() ?? null;
          const googleId = profile.id;
          const displayName = profile.displayName;
          const avatarUrl = profile.photos?.[0]?.value ?? null;

          const existing = await uow.authUsers.findAll(
            or(
              eq(authUsers.googleId, googleId),
              ...(email ? [eq(authUsers.email, email)] : []),
            ),
          );
          const firstExisting = existing[0] ?? null;

          if (firstExisting) {
            const updated = await uow.authUsers.update(firstExisting.id, {
              googleId,
              displayName: firstExisting.displayName ?? displayName,
              avatarUrl: firstExisting.avatarUrl ?? avatarUrl,
              isVerified: true,
            });
            return done(null, updated);
          }

          const created = await uow.authUsers.create({
            email,
            googleId,
            displayName,
            avatarUrl,
            isVerified: true,
          });
          return done(null, created);
        } catch (err) {
          return done(err as Error);
        }
      },
    ),
  );

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    const user = await uow.authUsers.findById(id);
    done(null, user ?? null);
  });
}
