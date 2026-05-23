import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Re-export domain utilities for backward compatibility
export { stripDates, isUUID } from "../../domain/utils.js";

const COOKIE_NAME = "ds_token";

export function getUserId(req: Request): string | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }
  return null;
}

export function requireUser(req: Request, res: Response): string | null {
  const id = getUserId(req);
  if (!id) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }
  return id;
}

