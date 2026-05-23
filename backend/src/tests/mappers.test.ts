import { describe, it, expect } from "vitest";
import { AuthMapper } from "../domain/mappers/auth.mapper.js";
import { CVMapper } from "../domain/mappers/cv.mapper.js";

const mockUser = {
  id: "user-1",
  email: "test@example.com",
  displayName: "Test User",
  avatarUrl: "https://example.com/avatar.png",
  isVerified: true,
  passwordHash: "$2b$12$hashedpassword",
  verificationToken: "123456",
  verificationTokenExpires: new Date(),
  googleId: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-02"),
  deletedAt: null,
};

describe("AuthMapper.toDomain", () => {
  it("strips passwordHash and verificationToken", () => {
    const result = AuthMapper.toDomain(mockUser);
    expect(result).not.toHaveProperty("passwordHash");
    expect(result).not.toHaveProperty("verificationToken");
    expect(result).not.toHaveProperty("verificationTokenExpires");
  });

  it("converts timestamps to milliseconds", () => {
    const result = AuthMapper.toDomain(mockUser);
    expect(typeof result.createdAt).toBe("number");
    expect(typeof result.updatedAt).toBe("number");
  });

  it("preserves public fields", () => {
    const result = AuthMapper.toDomain(mockUser);
    expect(result.id).toBe("user-1");
    expect(result.email).toBe("test@example.com");
    expect(result.isVerified).toBe(true);
  });

  it("returns null/undefined as-is", () => {
    expect(AuthMapper.toDomain(null)).toBeNull();
    expect(AuthMapper.toDomain(undefined)).toBeUndefined();
  });
});

describe("AuthMapper.toPublic", () => {
  it("returns only safe public fields", () => {
    const result = AuthMapper.toPublic(mockUser);
    const keys = Object.keys(result);
    expect(keys).toEqual(["id", "email", "displayName", "avatarUrl", "name", "profileImage", "isVerified"]);
  });

  it("derives name from displayName", () => {
    const result = AuthMapper.toPublic(mockUser);
    expect(result.name).toBe("Test User");
  });

  it("falls back name to email when displayName is null", () => {
    const result = AuthMapper.toPublic({ ...mockUser, displayName: null });
    expect(result.name).toBe("test@example.com");
  });

  it("sets profileImage from avatarUrl", () => {
    const result = AuthMapper.toPublic(mockUser);
    expect(result.profileImage).toBe("https://example.com/avatar.png");
  });

  it("returns null profileImage when avatarUrl is null", () => {
    const result = AuthMapper.toPublic({ ...mockUser, avatarUrl: null });
    expect(result.profileImage).toBeNull();
  });
});

describe("CVMapper.toDomain", () => {
  const mockCV = {
    id: "cv-1",
    userId: "user-1",
    personalInfo: '{"name":"John"}',
    experience: '[{"company":"ACME"}]',
    skills: '{"js":5}',
    education: '[{"school":"MIT"}]',
    projects: '[{"name":"App"}]',
    languages: '[{"lang":"English"}]',
  };

  it("parses JSON string fields into objects", () => {
    const result = CVMapper.toDomain(mockCV);
    expect(result.personalInfo).toEqual({ name: "John" });
    expect(result.experience).toEqual([{ company: "ACME" }]);
    expect(result.skills).toEqual({ js: 5 });
    expect(result.education).toEqual([{ school: "MIT" }]);
  });

  it("passes through already-parsed objects", () => {
    const parsed = { ...mockCV, personalInfo: { name: "Alice" } };
    const result = CVMapper.toDomain(parsed);
    expect(result.personalInfo).toEqual({ name: "Alice" });
  });

  it("uses defaults for missing fields", () => {
    const result = CVMapper.toDomain({ id: "x" });
    expect(result.personalInfo).toEqual({});
    expect(result.experience).toEqual([]);
    expect(result.skills).toEqual({});
  });

  it("handles invalid JSON gracefully", () => {
    const result = CVMapper.toDomain({ ...mockCV, personalInfo: "not-json{" });
    expect(result).toBeTruthy();
  });
});
