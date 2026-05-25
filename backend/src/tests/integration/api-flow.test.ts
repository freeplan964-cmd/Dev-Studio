/**
 * Integration Tests — API Request Flow
 *
 * Strategy: Spin up a minimal Express app (mirroring the real app structure)
 * with mocked service layer. Tests exercise the full middleware → router →
 * controller → response chain without requiring a real database.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";

// ─── Mock rate limiters so tests aren't throttled ────────────────────────────
vi.mock("../../presentation/config/rate-limit.js", () => ({
  authLimiter: (_req: any, _res: any, next: any) => next(),
  globalLimiter: (_req: any, _res: any, next: any) => next(),
}));

// ─── Mock the DI container ───────────────────────────────────────────────────
const mockAuthService = vi.hoisted(() => ({
  findUserByEmail: vi.fn(),
  findUserById: vi.fn(),
  registerUser: vi.fn(),
  verifyPassword: vi.fn(),
  createNewVerificationToken: vi.fn(),
  verifyUserEmail: vi.fn(),
  signToken: vi.fn().mockReturnValue("mock-jwt-token"),
  verifyToken: vi.fn(),
  sendToken: vi.fn().mockImplementation((_res: any, _id: string, user: any) => {
    _res.json({ user });
  }),
  clearToken: vi.fn(),
  getTokenFromRequest: vi.fn(),
}));

vi.mock("../../infrastructure/di/container.js", () => ({
  authService: mockAuthService,
  uow: {
    authUsers: {
      findAll: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
    },
  },
}));

import authRoutes from "../../presentation/routes/auth.routes.js";

// ─── Test fixtures ────────────────────────────────────────────────────────────

const VERIFIED_USER = {
  id: "user-uuid-test",
  email: "test@example.com",
  passwordHash: "$2a$12$hashedpassword",
  displayName: "Test User",
  isVerified: true,
  verificationToken: null,
  verificationTokenExpires: null,
  googleId: null,
  deletedAt: null,
  avatarUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth", authRoutes);
  return app;
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────

describe("POST /api/auth/register — complete API flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 201 and user data on successful registration", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(null);
    mockAuthService.registerUser.mockResolvedValue(VERIFIED_USER);

    const res = await request(buildApp())
      .post("/api/auth/register")
      .send({ email: "new@example.com", password: "Password1!" });

    expect(res.status).toBe(201);
    expect(mockAuthService.findUserByEmail).toHaveBeenCalledWith("new@example.com");
    expect(mockAuthService.registerUser).toHaveBeenCalled();
  });

  it("returns 409 when email already exists", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(VERIFIED_USER);

    const res = await request(buildApp())
      .post("/api/auth/register")
      .send({ email: "existing@example.com", password: "Password1!" });

    expect(res.status).toBe(409);
    expect(mockAuthService.registerUser).not.toHaveBeenCalled();
  });

  it("returns 400 when request body is invalid", async () => {
    const res = await request(buildApp())
      .post("/api/auth/register")
      .send({ email: "not-an-email", password: "short" });

    expect(res.status).toBe(400);
    expect(mockAuthService.registerUser).not.toHaveBeenCalled();
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(buildApp())
      .post("/api/auth/register")
      .send({});

    expect(res.status).toBe(400);
  });
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

describe("POST /api/auth/login — complete API flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 and sets cookie on valid credentials", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(VERIFIED_USER);
    mockAuthService.verifyPassword.mockResolvedValue(true);

    const res = await request(buildApp())
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "Password1!" });

    expect(res.status).toBe(200);
    expect(mockAuthService.findUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockAuthService.verifyPassword).toHaveBeenCalled();
  });

  it("returns 401 when user does not exist", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(null);

    const res = await request(buildApp())
      .post("/api/auth/login")
      .send({ email: "ghost@example.com", password: "Password1!" });

    expect(res.status).toBe(401);
  });

  it("returns 401 when password is incorrect", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(VERIFIED_USER);
    mockAuthService.verifyPassword.mockResolvedValue(false);

    const res = await request(buildApp())
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "WrongPassword!" });

    expect(res.status).toBe(401);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(buildApp())
      .post("/api/auth/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
  });
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

describe("POST /api/auth/logout — complete API flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 and clears the auth cookie", async () => {
    const res = await request(buildApp()).post("/api/auth/logout");
    expect(res.status).toBe(200);
    expect(mockAuthService.clearToken).toHaveBeenCalled();
  });
});

// ─── GET /api/auth/user ───────────────────────────────────────────────────────

describe("GET /api/auth/user — complete API flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when no token is present", async () => {
    mockAuthService.getTokenFromRequest.mockReturnValue(null);

    const res = await request(buildApp()).get("/api/auth/user");

    expect(res.status).toBe(401);
  });

  it("returns 200 with user data when valid token provided", async () => {
    const token = "valid.jwt.token";
    mockAuthService.getTokenFromRequest.mockReturnValue(token);
    mockAuthService.verifyToken.mockReturnValue({ sub: VERIFIED_USER.id });
    mockAuthService.findUserById.mockResolvedValue(VERIFIED_USER);

    const res = await request(buildApp())
      .get("/api/auth/user")
      .set("Cookie", `ds_token=${token}`);

    expect(res.status).toBe(200);
  });
});

// ─── GET /api/auth/config ─────────────────────────────────────────────────────

describe("GET /api/auth/config — complete API flow", () => {
  it("returns 200 with auth configuration", async () => {
    const res = await request(buildApp()).get("/api/auth/config");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("googleAuthEnabled");
  });
});

// ─── Error scenario: downstream service throws ────────────────────────────────

describe("Error handling — service exceptions", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 500 when registerUser throws unexpectedly", async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(null);
    mockAuthService.registerUser.mockRejectedValue(new Error("DB error"));

    const res = await request(buildApp())
      .post("/api/auth/register")
      .send({ email: "crash@example.com", password: "Password1!" });

    expect(res.status).toBe(500);
  });
});
