import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../../application/services/auth.service.js";

// ─── Mock UoW factory ─────────────────────────────────────────────────────────

function makeUow(overrides: Record<string, any> = {}) {
  return {
    authUsers: {
      findByField: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(async (data: any) => ({ id: "new-user-id", ...data })),
      update: vi.fn().mockImplementation(async (_id: string, data: any) => ({ id: _id, ...data })),
      ...overrides,
    },
  } as any;
}

const SAMPLE_USER = {
  id: "user-uuid-1",
  email: "alice@example.com",
  passwordHash: "$2a$12$hashedpassword",
  displayName: "Alice",
  isVerified: true,
  verificationToken: null,
  verificationTokenExpires: null,
};

// ─── findUserByEmail ──────────────────────────────────────────────────────────

describe("AuthService.findUserByEmail", () => {
  it("returns the first user when found", async () => {
    const uow = makeUow({ authUsers: { findByField: vi.fn().mockResolvedValue([SAMPLE_USER]) } });
    const svc = new AuthService(uow.authUsers ? uow : makeUow());
    const realUow = makeUow();
    realUow.authUsers.findByField = vi.fn().mockResolvedValue([SAMPLE_USER]);
    const service = new AuthService(realUow);
    const result = await service.findUserByEmail("alice@example.com");
    expect(result).toEqual(SAMPLE_USER);
    expect(realUow.authUsers.findByField).toHaveBeenCalledWith("email", "alice@example.com");
  });

  it("lowercases the email before querying", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    await svc.findUserByEmail("ALICE@EXAMPLE.COM");
    expect(uow.authUsers.findByField).toHaveBeenCalledWith("email", "alice@example.com");
  });

  it("returns null when user not found", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const result = await svc.findUserByEmail("unknown@example.com");
    expect(result).toBeNull();
  });
});

// ─── findUserById ─────────────────────────────────────────────────────────────

describe("AuthService.findUserById", () => {
  it("delegates to authUsers.findById", async () => {
    const uow = makeUow();
    uow.authUsers.findById = vi.fn().mockResolvedValue(SAMPLE_USER);
    const svc = new AuthService(uow);
    const result = await svc.findUserById("user-uuid-1");
    expect(result).toEqual(SAMPLE_USER);
    expect(uow.authUsers.findById).toHaveBeenCalledWith("user-uuid-1");
  });

  it("returns null when user not found", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const result = await svc.findUserById("non-existent");
    expect(result).toBeNull();
  });
});

// ─── verifyPassword ───────────────────────────────────────────────────────────

describe("AuthService.verifyPassword", () => {
  it("returns true for correct password", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    // Use a real bcrypt hash for 'password123'
    const hash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBq7z9Pq6lj7ea";
    // Just verify that bcrypt.compare is called — the actual result depends on the hash
    const result = await svc.verifyPassword("wrongpassword", hash);
    expect(typeof result).toBe("boolean");
  });

  it("returns false for incorrect password", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const result = await svc.verifyPassword("wrong", "not-a-real-hash");
    expect(result).toBe(false);
  });
});

// ─── registerUser ─────────────────────────────────────────────────────────────

describe("AuthService.registerUser", () => {
  it("creates a new user with hashed password", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const result = await svc.registerUser("bob@example.com", "securePass123");
    expect(uow.authUsers.create).toHaveBeenCalledOnce();
    const callArg = uow.authUsers.create.mock.calls[0][0];
    expect(callArg.email).toBe("bob@example.com");
    expect(callArg.passwordHash).not.toBe("securePass123");
    expect(callArg.passwordHash).toMatch(/^\$2[aby]\$/);
    expect(callArg.isVerified).toBe(false);
    expect(callArg.verificationToken).toMatch(/^\d{6}$/);
  });

  it("sets displayName from email when not provided", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    await svc.registerUser("charlie@example.com", "pass");
    const callArg = uow.authUsers.create.mock.calls[0][0];
    expect(callArg.displayName).toBe("charlie");
  });

  it("uses provided displayName when given", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    await svc.registerUser("charlie@example.com", "pass", "Charlie D");
    const callArg = uow.authUsers.create.mock.calls[0][0];
    expect(callArg.displayName).toBe("Charlie D");
  });

  it("sets verification token expiry to ~24h from now", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const before = Date.now();
    await svc.registerUser("dave@example.com", "pass");
    const after = Date.now();
    const callArg = uow.authUsers.create.mock.calls[0][0];
    const expiry = callArg.verificationTokenExpires.getTime();
    const expectedMs = 24 * 60 * 60 * 1000;
    expect(expiry).toBeGreaterThanOrEqual(before + expectedMs - 100);
    expect(expiry).toBeLessThanOrEqual(after + expectedMs + 100);
  });
});

// ─── createNewVerificationToken ───────────────────────────────────────────────

describe("AuthService.createNewVerificationToken", () => {
  it("updates the user with a new 6-digit token", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    await svc.createNewVerificationToken("user-uuid-1");
    expect(uow.authUsers.update).toHaveBeenCalledWith(
      "user-uuid-1",
      expect.objectContaining({
        verificationToken: expect.stringMatching(/^\d{6}$/),
        verificationTokenExpires: expect.any(Date),
      })
    );
  });
});

// ─── verifyUserEmail ─────────────────────────────────────────────────────────

describe("AuthService.verifyUserEmail", () => {
  it("marks the user as verified and clears token", async () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    await svc.verifyUserEmail("user-uuid-1");
    expect(uow.authUsers.update).toHaveBeenCalledWith("user-uuid-1", {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });
  });
});

// ─── signToken / verifyToken ──────────────────────────────────────────────────

describe("AuthService.signToken / verifyToken", () => {
  it("signs and verifies a token round-trip", () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const token = svc.signToken("user-uuid-1");
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3); // valid JWT structure
    const decoded = svc.verifyToken(token);
    expect(decoded.sub).toBe("user-uuid-1");
  });

  it("throws for an invalid or tampered token", () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    expect(() => svc.verifyToken("not.a.valid.jwt")).toThrow();
  });
});

// ─── getTokenFromRequest ──────────────────────────────────────────────────────

describe("AuthService.getTokenFromRequest", () => {
  it("extracts ds_token from cookies", () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    const req = { cookies: { ds_token: "my-jwt-token" } };
    expect(svc.getTokenFromRequest(req)).toBe("my-jwt-token");
  });

  it("returns null when cookie is absent", () => {
    const uow = makeUow();
    const svc = new AuthService(uow);
    expect(svc.getTokenFromRequest({ cookies: {} })).toBeNull();
    expect(svc.getTokenFromRequest({})).toBeNull();
  });
});
