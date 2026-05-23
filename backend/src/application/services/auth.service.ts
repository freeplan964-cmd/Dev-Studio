import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class AuthService {
  constructor(private uow: IUnitOfWork) {}

  async findUserByEmail(email: string) {
    const [user] = await this.uow.authUsers.findByField('email', email.toLowerCase());
    return user ?? null;
  }

  async findUserById(id: string) {
    return await this.uow.authUsers.findById(id);
  }

  async verifyPassword(passwordPlain: string, passwordHash: string) {
    return await bcrypt.compare(passwordPlain, passwordHash);
  }

  async registerUser(
    email: string,
    passwordPlain: string,
    displayName?: string,
  ) {
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const passwordHash = await bcrypt.hash(passwordPlain, 12);

    const user = await this.uow.authUsers.create({
      email: email.toLowerCase(),
      passwordHash,
      displayName: displayName || email.split("@")[0],
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    return user;
  }

  async createNewVerificationToken(userId: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const updated = await this.uow.authUsers.update(userId, {
      verificationToken: code,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return updated;
  }

  async verifyUserEmail(userId: string) {
    const updated = await this.uow.authUsers.update(userId, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });
    return updated;
  }

  // ─── Token helpers (belong in application layer, not presentation) ───────

  private static readonly JWT_SECRET =
    process.env.JWT_SECRET ||
    "supersecretjwtkey_devstudio_2026_secure_random_string";
  private static readonly COOKIE_NAME = "ds_token";
  private static readonly COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  signToken(userId: string): string {
    return jwt.sign({ sub: userId }, AuthService.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string): { sub: string } {
    return jwt.verify(token, AuthService.JWT_SECRET) as { sub: string };
  }

  sendToken(res: Response, userId: string, user: Record<string, unknown>): void {
    const token = this.signToken(userId);
    res.cookie(AuthService.COOKIE_NAME, token, AuthService.COOKIE_OPTS);
    res.json({ user });
  }

  clearToken(res: Response): void {
    res.clearCookie(AuthService.COOKIE_NAME);
  }

  getTokenFromRequest(req: { cookies?: Record<string, string> }): string | null {
    return req.cookies?.[AuthService.COOKIE_NAME] ?? null;
  }
}

