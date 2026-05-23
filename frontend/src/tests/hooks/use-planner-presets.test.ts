import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Tests for use-planner-presets hook.
 *
 * Validates that the hook uses React Query correctly (no stale module-level cache).
 * We test the underlying getPlannerPresets API function since testing the hook
 * directly would require a full QueryClientProvider setup.
 */

const originalFetch = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("getPlannerPresets (backing fn for usePlannerPresets)", () => {
  it("fetches presets from /api/planner/presets", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        presets: { food: [], sports: [], care: [], morning: [], evening: [] },
        prayer: [],
      }),
    } as any);

    const { getPlannerPresets } = await import("../../lib/api/planner");
    const result = await getPlannerPresets();
    expect(result).toHaveProperty("presets");
    expect(result).toHaveProperty("prayer");
    expect(
      (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]
    ).toContain("/api/planner/presets");
  });

  it("returns a structurally correct response", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        presets: {
          food: [{ title: "Breakfast", time: "08:00" }],
          sports: [],
          care: [],
          morning: [],
          evening: [],
        },
        prayer: [{ iconName: "Moon", label: "Fajr" }],
      }),
    } as any);

    const { getPlannerPresets } = await import("../../lib/api/planner");
    const result = await getPlannerPresets();
    expect(result.presets.food).toHaveLength(1);
    expect(result.presets.food[0].title).toBe("Breakfast");
  });
});

describe("use-planner-presets module structure", () => {
  it("exports a usePlannerPresets function (not stale module state)", async () => {
    const mod = await import("../../hooks/use-planner-presets");
    expect(typeof mod.usePlannerPresets).toBe("function");
  });

  it("does not export module-level cachedPresets", async () => {
    const mod = await import("../../hooks/use-planner-presets");
    expect((mod as any).cachedPresets).toBeUndefined();
    expect((mod as any).promise).toBeUndefined();
  });
});
