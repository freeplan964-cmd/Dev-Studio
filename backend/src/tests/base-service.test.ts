import { describe, it, expect, beforeEach, vi } from "vitest";
import { BaseService } from "../application/services/base.service.js";
import { IUnitOfWork } from "../domain/repositories/unit-of-work.interface.js";

// ─── Minimal mock repository ──────────────────────────────────────────────────

function makeRepo(overrides: Record<string, any> = {}) {
  return {
    findByUserId: vi.fn().mockResolvedValue([]),
    findByUserAndId: vi.fn().mockResolvedValue([]),
    findById: vi.fn().mockResolvedValue(null),
    findAll: vi.fn().mockResolvedValue([]),
    findByField: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation(async (data: any) => ({ id: "new-id", ...data })),
    createMany: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockImplementation(async (_id: string, data: any) => data),
    updateMany: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(true),
    deleteMany: vi.fn().mockResolvedValue(true),
    deleteByUserAndId: vi.fn().mockResolvedValue(true),
    ...overrides,
  };
}

// ─── Concrete subclass for testing ──────────────────────────────────────────

class TestService extends BaseService {
  public mockRepo: ReturnType<typeof makeRepo>;

  constructor(repo: ReturnType<typeof makeRepo>) {
    const fakeUow = {} as IUnitOfWork;
    super(fakeUow, () => repo as any);
    this.mockRepo = repo;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("BaseService.getAll", () => {
  it("delegates to findByUserId", async () => {
    const repo = makeRepo({ findByUserId: vi.fn().mockResolvedValue([{ id: "1" }]) });
    const svc = new TestService(repo);
    const result = await svc.getAll("user-1");
    expect(repo.findByUserId).toHaveBeenCalledWith("user-1");
    expect(result).toEqual([{ id: "1" }]);
  });
});

describe("BaseService.upsert — create path", () => {
  it("creates a new record when no id is supplied", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    const result = await svc.upsert("user-1", { title: "My Agent" });
    expect(repo.create).toHaveBeenCalledOnce();
    const callArg = repo.create.mock.calls[0][0];
    expect(callArg.userId).toBe("user-1");
    expect(callArg.title).toBe("My Agent");
    expect(callArg.slug).toBe("my-agent");
    expect(repo.update).not.toHaveBeenCalled();
  });

  it("creates a new record when id is not a valid UUID", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    await svc.upsert("user-1", { id: "not-a-uuid", title: "Test" });
    expect(repo.create).toHaveBeenCalledOnce();
    expect(repo.findByUserAndId).not.toHaveBeenCalled();
  });
});

describe("BaseService.upsert — update path", () => {
  it("updates when a matching record exists for the user", async () => {
    const existingId = "550e8400-e29b-41d4-a716-446655440000";
    const repo = makeRepo({
      findByUserAndId: vi.fn().mockResolvedValue([{ id: existingId, userId: "user-1" }]),
    });
    const svc = new TestService(repo);
    await svc.upsert("user-1", { id: existingId, title: "Updated" });
    expect(repo.update).toHaveBeenCalledWith(existingId, expect.objectContaining({ title: "Updated" }));
    expect(repo.create).not.toHaveBeenCalled();
  });
});

describe("BaseService.upsertBulk", () => {
  it("returns empty array for empty input", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    const result = await svc.upsertBulk("user-1", []);
    expect(result).toEqual([]);
    expect(repo.createMany).not.toHaveBeenCalled();
  });

  it("calls createMany with userId injected and slugs generated", async () => {
    const repo = makeRepo({ createMany: vi.fn().mockResolvedValue([{ id: "1" }]) });
    const svc = new TestService(repo);
    await svc.upsertBulk("user-1", [
      { title: "First Item" },
      { title: "Second Item" },
    ]);
    expect(repo.createMany).toHaveBeenCalledOnce();
    const [values] = repo.createMany.mock.calls[0];
    expect(values[0].userId).toBe("user-1");
    expect(values[0].slug).toBe("first-item");
    expect(values[1].slug).toBe("second-item");
  });

  it("strips date fields from each item", async () => {
    const repo = makeRepo({ createMany: vi.fn().mockResolvedValue([]) });
    const svc = new TestService(repo);
    await svc.upsertBulk("user-1", [{ title: "X", createdAt: new Date(), updatedAt: new Date() }]);
    const [values] = repo.createMany.mock.calls[0];
    expect(values[0]).not.toHaveProperty("createdAt");
    expect(values[0]).not.toHaveProperty("updatedAt");
  });
});

describe("BaseService.deleteById", () => {
  it("calls deleteByUserAndId for a valid UUID", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    const id = "550e8400-e29b-41d4-a716-446655440000";
    const result = await svc.deleteById("user-1", id);
    expect(repo.deleteByUserAndId).toHaveBeenCalledWith("user-1", id);
    expect(result).toBe(true);
  });

  it("short-circuits for invalid UUIDs without touching the DB", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    await svc.deleteById("user-1", "bad-id");
    expect(repo.deleteByUserAndId).not.toHaveBeenCalled();
  });
});

describe("BaseService slug auto-generation", () => {
  it("uses name field when title is absent", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    await svc.upsert("user-1", { name: "My Tool" });
    const callArg = repo.create.mock.calls[0][0];
    expect(callArg.slug).toBe("my-tool");
  });

  it("does not overwrite an existing slug", async () => {
    const repo = makeRepo();
    const svc = new TestService(repo);
    await svc.upsert("user-1", { title: "Test", slug: "custom-slug" });
    const callArg = repo.create.mock.calls[0][0];
    expect(callArg.slug).toBe("custom-slug");
  });
});
