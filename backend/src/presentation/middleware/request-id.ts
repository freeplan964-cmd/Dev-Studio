import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

/**
 * Attach a unique request ID to every inbound request.
 * Propagates any existing X-Request-ID header from upstream proxies.
 * The ID is echoed back in the response so clients can correlate logs.
 */
export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id =
    (req.headers["x-request-id"] as string | undefined) || randomUUID();
  req.headers["x-request-id"] = id;
  res.setHeader("X-Request-ID", id);
  next();
}
