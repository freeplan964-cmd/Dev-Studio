import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mapJob, mapOffer, mapService } from "../../lib/api/jobs";

// ─── Mapper tests (pure functions, no fetch needed) ──────────────────────────

describe("mapJob", () => {
  it("maps a DB row to a SavedJob", () => {
    const row = {
      id: "j1",
      title: "Senior Frontend Engineer",
      company: "ACME Corp",
      location: "Remote",
      url: "https://example.com/job",
      platform: "LinkedIn",
      status: "applied",
      salary: "$120k",
      remote: true,
      tags: ["react", "typescript"],
      notes: "Good company",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
    };
    const job = mapJob(row);
    expect(job.id).toBe("j1");
    expect(job.title).toBe("Senior Frontend Engineer");
    expect(job.company).toBe("ACME Corp");
    expect(job.remote).toBe(true);
    expect(job.tags).toEqual(["react", "typescript"]);
    expect(typeof job.createdAt).toBe("number");
    expect(typeof job.updatedAt).toBe("number");
  });

  it("uses defaults for missing fields", () => {
    const job = mapJob({ id: "x", title: "Dev" });
    expect(job.company).toBe("");
    expect(job.status).toBe("saved");
    expect(job.remote).toBe(false);
    expect(job.tags).toEqual([]);
  });

  it("handles camelCase createdAt as fallback", () => {
    const now = Date.now();
    const job = mapJob({ id: "x", title: "Dev", createdAt: now });
    expect(job.createdAt).toBe(now);
  });
});

describe("mapOffer", () => {
  it("maps a DB row to a FreelanceOffer", () => {
    const row = {
      id: "o1",
      title: "Build a landing page",
      client: "StartupX",
      platform: "Upwork",
      budget: "$2000",
      currency: "USD",
      status: "in_review",
      description: "React project",
      url: "https://upwork.com/job",
      deadline: "2024-03-01",
      tags: ["react"],
      notes: "",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    };
    const offer = mapOffer(row);
    expect(offer.id).toBe("o1");
    expect(offer.budget).toBe("$2000");
    expect(offer.status).toBe("in_review");
  });

  it("defaults status to 'new'", () => {
    const offer = mapOffer({ id: "x", title: "Test" });
    expect(offer.status).toBe("new");
  });
});

describe("mapService", () => {
  it("maps a DB row to a MyService", () => {
    const row = {
      id: "s1",
      title: "React Component Library",
      platform: "Fiverr",
      url: "https://fiverr.com/my-gig",
      category: "Frontend",
      price: "$150",
      currency: "USD",
      status: "active",
      description: "Custom components",
      delivery_days: 5,
      tags: ["react"],
      notes: "",
    };
    const svc = mapService(row);
    expect(svc.id).toBe("s1");
    expect(svc.deliveryDays).toBe(5);
    expect(svc.status).toBe("active");
  });

  it("handles deliveryDays from camelCase fallback", () => {
    const svc = mapService({ id: "x", title: "Test", deliveryDays: 7 });
    expect(svc.deliveryDays).toBe(7);
  });

  it("defaults deliveryDays to 3", () => {
    const svc = mapService({ id: "x", title: "Test" });
    expect(svc.deliveryDays).toBe(3);
  });
});

// ─── getSavedJobs integration (fetch mock) ───────────────────────────────────

describe("getSavedJobs (fetch mock)", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns mapped jobs on success", async () => {
    const { getSavedJobs } = await import("../../lib/api/jobs");
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "j1", title: "Dev", status: "saved" }],
    } as any);

    const jobs = await getSavedJobs();
    expect(jobs).toHaveLength(1);
    expect(jobs[0].id).toBe("j1");
  });

  it("returns empty array on network error", async () => {
    const { getSavedJobs } = await import("../../lib/api/jobs");
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error("Network error"));

    const jobs = await getSavedJobs();
    expect(jobs).toEqual([]);
  });
});
