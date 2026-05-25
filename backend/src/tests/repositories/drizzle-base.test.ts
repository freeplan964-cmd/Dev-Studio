import { describe, it, expect, vi, beforeEach } from "vitest";
import { DrizzleBaseRepository } from "../../infrastructure/repositories/drizzle-base.repository.js";

// ─── Mock DB client factory ──────────────────────────────────────────────────

function makeDbClient({
  selectResult = [] as any[],
  insertResult = [{ id: "test-id", title: "Test" }] as any[],
  updateResult = [{ id: "test-id", title: "Updated" }] as any[],
} = {}) {
  const updateWhereResult = { returning: vi.fn().mockResolvedValue(updateResult) };
  const updateWhere = vi.fn().mockReturnValue(updateWhereResult);
  const updateSet = vi.fn().mockReturnValue({ where: updateWhere });
  const update = vi.fn().mockReturnValue({ set: updateSet });

  const selectWhere = vi.fn().mockResolvedValue(selectResult);
  const selectFrom = vi.fn().mockReturnValue({ where: selectWhere });
  const select = vi.fn().mockReturnValue({ from: selectFrom });

  const insertReturning = vi.fn().mockResolvedValue(insertResult);
  const insertOnConflict = vi.fn().mockReturnValue({ returning: insertReturning });
  const insertValues = vi.fn().mockReturnValue({
    returning: insertReturning,
    onConflictDoNothing: insertOnConflict,
  });
  const insert = vi.fn().mockReturnValue({ values: insertValues });

  const deleteWhere = vi.fn().mockResolvedValue(undefined);
  const del = vi.fn().mockReturnValue({ where: deleteWhere });

  return {
    select,
    insert,
    update,
    delete: del,
    _mocks: { selectWhere, selectFrom, select, insertReturning, insertOnConflict, insertValues, insert, updateWhereResult, updateWhere, updateSet, update, deleteWhere, del },
  };
}

// ─── Table fixtures ───────────────────────────────────────────────────────────

const TABLE_FULL = { id: true, userId: true, name: true, deletedAt: true, updatedAt: true };
const TABLE_NO_SOFT_DELETE = { id: true, userId: true, name: true };
const TABLE_NO_USER = { id: true, name: true };

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DrizzleBaseRepository — findById", () => {
  it("returns the first row when found", async () => {
    const row = { id: "abc", name: "Test" };
    const db = makeDbClient({ selectResult: [row] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findById("abc");
    expect(result).toEqual(row);
  });

  it("returns null when no row found", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findById("missing");
    expect(result).toBeNull();
  });

  it("calls db.select().from().where()", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    await repo.findById("abc");
    expect(db.select).toHaveBeenCalled();
    expect(db._mocks.selectFrom).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.selectWhere).toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — findAll", () => {
  it("returns all rows", async () => {
    const rows = [{ id: "1" }, { id: "2" }];
    const db = makeDbClient({ selectResult: rows });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findAll();
    expect(result).toEqual(rows);
  });

  it("returns empty array when no rows", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findAll();
    expect(result).toEqual([]);
  });

  it("applies filter when provided", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    await repo.findAll({ someFilter: true });
    expect(db._mocks.selectWhere).toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — findByUserId", () => {
  it("returns rows belonging to the user", async () => {
    const rows = [{ id: "1", userId: "user-1" }];
    const db = makeDbClient({ selectResult: rows });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findByUserId("user-1");
    expect(result).toEqual(rows);
  });

  it("throws if table has no userId column", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_USER, db);
    await expect(repo.findByUserId("user-1")).rejects.toThrow(
      "Table does not have a userId column"
    );
  });
});

describe("DrizzleBaseRepository — findByUserAndId", () => {
  it("returns matching rows", async () => {
    const row = { id: "abc", userId: "user-1" };
    const db = makeDbClient({ selectResult: [row] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findByUserAndId("user-1", "abc");
    expect(result).toEqual([row]);
  });

  it("throws if table has no userId column", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_USER, db);
    await expect(repo.findByUserAndId("user-1", "abc")).rejects.toThrow(
      "Table does not have a userId column"
    );
  });
});

describe("DrizzleBaseRepository — findByField", () => {
  it("returns rows matching field value", async () => {
    const rows = [{ id: "1", name: "Alice" }];
    const db = makeDbClient({ selectResult: rows });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.findByField("name", "Alice");
    expect(result).toEqual(rows);
  });

  it("throws if field does not exist on table", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    await expect(repo.findByField("nonExistentField", "value")).rejects.toThrow(
      "Table does not have a 'nonExistentField' column"
    );
  });
});

describe("DrizzleBaseRepository — create", () => {
  it("inserts data and returns the created row", async () => {
    const created = { id: "new-id", title: "Created" };
    const db = makeDbClient({ insertResult: [created] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.create({ title: "Created" } as any);
    expect(result).toEqual(created);
    expect(db.insert).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.insertValues).toHaveBeenCalledWith({ title: "Created" });
    expect(db._mocks.insertReturning).toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — createMany", () => {
  it("returns empty array for empty input", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.createMany([]);
    expect(result).toEqual([]);
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("inserts all items with onConflictDoNothing", async () => {
    const items = [{ title: "A" }, { title: "B" }];
    const db = makeDbClient({ insertResult: items });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    await repo.createMany(items as any[]);
    expect(db.insert).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.insertOnConflict).toHaveBeenCalled();
    expect(db._mocks.insertReturning).toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — update", () => {
  it("updates the row and returns the updated record", async () => {
    const updated = { id: "abc", title: "Updated" };
    const db = makeDbClient({ updateResult: [updated] });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.update("abc", { title: "Updated" } as any);
    expect(result).toEqual(updated);
    expect(db.update).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Updated", updatedAt: expect.any(Date) })
    );
  });
});

describe("DrizzleBaseRepository — delete (soft)", () => {
  it("soft-deletes by setting deletedAt when table has deletedAt", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.delete("abc");
    expect(result).toBe(true);
    expect(db.update).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ deletedAt: expect.any(Date), updatedAt: expect.any(Date) })
    );
  });

  it("hard-deletes when table has no deletedAt", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_SOFT_DELETE, db);
    const result = await repo.delete("abc");
    expect(result).toBe(true);
    expect(db.delete).toHaveBeenCalledWith(TABLE_NO_SOFT_DELETE);
    expect(db.update).not.toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — deleteByUserAndId", () => {
  it("soft-deletes by userId+id when deletedAt is present", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.deleteByUserAndId("user-1", "abc");
    expect(result).toBe(true);
    expect(db.update).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ deletedAt: expect.any(Date), updatedAt: expect.any(Date) })
    );
  });

  it("hard-deletes when no deletedAt column", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_SOFT_DELETE, db);
    const result = await repo.deleteByUserAndId("user-1", "abc");
    expect(result).toBe(true);
    expect(db.delete).toHaveBeenCalledWith(TABLE_NO_SOFT_DELETE);
  });
});

describe("DrizzleBaseRepository — applySoftDelete", () => {
  it("returns undefined filter as-is when no deletedAt column", () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_SOFT_DELETE, db) as any;
    const result = repo.applySoftDelete(undefined);
    expect(result).toBeUndefined();
  });

  it("wraps existing filter with soft delete when deletedAt exists", () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db) as any;
    const filter = { someCondition: true };
    const result = repo.applySoftDelete(filter);
    expect(result).toBeDefined();
  });

  it("returns soft delete filter alone when no other filter provided", () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db) as any;
    const result = repo.applySoftDelete(undefined);
    expect(result).toBeDefined();
  });
});

describe("DrizzleBaseRepository — deleteMany", () => {
  it("soft-deletes matching rows when deletedAt is present", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.deleteMany({ someFilter: true });
    expect(result).toBe(true);
    expect(db.update).toHaveBeenCalled();
  });

  it("hard-deletes matching rows when no deletedAt", async () => {
    const db = makeDbClient();
    const repo = new DrizzleBaseRepository(TABLE_NO_SOFT_DELETE, db);
    const result = await repo.deleteMany({ someFilter: true });
    expect(result).toBe(true);
    expect(db.delete).toHaveBeenCalled();
  });
});

describe("DrizzleBaseRepository — updateMany", () => {
  it("updates all matching rows and returns them", async () => {
    const updated = [{ id: "1" }, { id: "2" }];
    const db = makeDbClient({ updateResult: updated });
    const repo = new DrizzleBaseRepository(TABLE_FULL, db);
    const result = await repo.updateMany({ someFilter: true }, { name: "Bulk" } as any);
    expect(db.update).toHaveBeenCalledWith(TABLE_FULL);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Bulk", updatedAt: expect.any(Date) })
    );
  });
});
