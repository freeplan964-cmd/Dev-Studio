import { describe, it, expect } from "vitest";
import { generateSlug, isUUID, stripDates } from "../domain/utils.js";

describe("generateSlug", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(generateSlug("What is React?")).toBe("what-is-react");
  });

  it("strips special characters", () => {
    expect(generateSlug("Hello, World! (2024)")).toBe("hello-world-2024");
  });

  it("collapses consecutive hyphens", () => {
    expect(generateSlug("foo   ---   bar")).toBe("foo-bar");
  });

  it("trims whitespace", () => {
    expect(generateSlug("  hello  ")).toBe("hello");
  });

  it("truncates at 100 characters", () => {
    const long = "a".repeat(150);
    expect(generateSlug(long)).toHaveLength(100);
  });

  it("returns empty string for empty input", () => {
    expect(generateSlug("")).toBe("");
  });

  it("handles already-slugified input", () => {
    expect(generateSlug("clean-slug")).toBe("clean-slug");
  });
});

describe("isUUID", () => {
  it("accepts a valid v4 UUID", () => {
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
  });

  it("rejects a non-UUID string", () => {
    expect(isUUID("not-a-uuid")).toBe(false);
  });

  it("rejects a number", () => {
    expect(isUUID(42)).toBe(false);
  });

  it("rejects undefined", () => {
    expect(isUUID(undefined)).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isUUID("")).toBe(false);
  });
});

describe("stripDates", () => {
  it("removes createdAt and updatedAt", () => {
    const result = stripDates({
      id: "1",
      name: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(result).not.toHaveProperty("createdAt");
    expect(result).not.toHaveProperty("updatedAt");
    expect(result.id).toBe("1");
    expect(result.name).toBe("test");
  });

  it("removes snake_case date fields", () => {
    const result = stripDates({ id: "1", created_at: "x", updated_at: "y" });
    expect(result).not.toHaveProperty("created_at");
    expect(result).not.toHaveProperty("updated_at");
  });

  it("preserves all non-date fields", () => {
    const data = { id: "1", title: "Hello", count: 5, active: true };
    const result = stripDates(data);
    expect(result).toEqual(data);
  });
});
