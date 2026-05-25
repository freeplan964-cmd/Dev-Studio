import { describe, it, expect, vi, beforeEach } from "vitest";
import { DrizzlePlannerTasksRepository } from "../../infrastructure/repositories/drizzle-planner-tasks.repository.js";
import { DrizzleInterviewQuestionsRepository } from "../../infrastructure/repositories/drizzle-interview-questions.repository.js";
import { DrizzleUserProgressRepository } from "../../infrastructure/repositories/drizzle-user-progress.repository.js";

// ─── Shared DB mock factory ───────────────────────────────────────────────────

function makeDbClient({
  selectResult = [] as any[],
  updateResult = [{ id: "test-id" }] as any[],
} = {}) {
  const selectWhere = vi.fn().mockResolvedValue(selectResult);
  const selectFrom = vi.fn().mockReturnValue({ where: selectWhere });
  const select = vi.fn().mockReturnValue({ from: selectFrom });

  const updateReturning = vi.fn().mockResolvedValue(updateResult);
  const updateWhere = vi.fn().mockReturnValue({ returning: updateReturning });
  const updateSet = vi.fn().mockReturnValue({ where: updateWhere });
  const update = vi.fn().mockReturnValue({ set: updateSet });

  const deleteWhere = vi.fn().mockResolvedValue(undefined);
  const del = vi.fn().mockReturnValue({ where: deleteWhere });

  return {
    select,
    insert: vi.fn(),
    update,
    delete: del,
    _mocks: { selectWhere, selectFrom, select, updateReturning, updateWhere, updateSet, update, deleteWhere, del },
  };
}

// ─── Table fixtures ───────────────────────────────────────────────────────────

const PLANNER_TABLE = { id: true, userId: true, date: true, title: true, deletedAt: true, updatedAt: true };
const INTERVIEW_TABLE = { id: true, userId: true, isGlobal: true, question: true, deletedAt: true };
const PROGRESS_TABLE = { id: true, userId: true, itemId: true, completed: true, deletedAt: true, updatedAt: true };

// ─── DrizzlePlannerTasksRepository ───────────────────────────────────────────

describe("DrizzlePlannerTasksRepository — findByUserAndDateRange", () => {
  it("returns tasks within date range for the user", async () => {
    const tasks = [
      { id: "1", userId: "user-1", date: "2026-01-10" },
      { id: "2", userId: "user-1", date: "2026-01-15" },
    ];
    const db = makeDbClient({ selectResult: tasks });
    const repo = new DrizzlePlannerTasksRepository(PLANNER_TABLE, db);
    const result = await repo.findByUserAndDateRange("user-1", "2026-01-01", "2026-01-31");
    expect(result).toEqual(tasks);
    expect(db.select).toHaveBeenCalled();
    expect(db._mocks.selectFrom).toHaveBeenCalledWith(PLANNER_TABLE);
    expect(db._mocks.selectWhere).toHaveBeenCalled();
  });

  it("returns empty array when no tasks in range", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzlePlannerTasksRepository(PLANNER_TABLE, db);
    const result = await repo.findByUserAndDateRange("user-1", "2026-06-01", "2026-06-30");
    expect(result).toEqual([]);
  });
});

describe("DrizzlePlannerTasksRepository — deleteByUserAndDateRange", () => {
  it("soft-deletes tasks in range when deletedAt column exists", async () => {
    const db = makeDbClient();
    const repo = new DrizzlePlannerTasksRepository(PLANNER_TABLE, db);
    const result = await repo.deleteByUserAndDateRange("user-1", "2026-01-01", "2026-01-31");
    expect(result).toBe(true);
    expect(db.update).toHaveBeenCalledWith(PLANNER_TABLE);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ deletedAt: expect.any(Date), updatedAt: expect.any(Date) })
    );
  });

  it("hard-deletes when no deletedAt column", async () => {
    const tableNoDel = { id: true, userId: true, date: true, title: true };
    const db = makeDbClient();
    const repo = new DrizzlePlannerTasksRepository(tableNoDel, db);
    const result = await repo.deleteByUserAndDateRange("user-1", "2026-01-01", "2026-01-31");
    expect(result).toBe(true);
    expect(db.delete).toHaveBeenCalledWith(tableNoDel);
  });
});

// ─── DrizzleInterviewQuestionsRepository ─────────────────────────────────────

describe("DrizzleInterviewQuestionsRepository — findGlobalAndUserQuestions", () => {
  it("returns global and user-specific questions", async () => {
    const questions = [
      { id: "1", isGlobal: true, userId: null },
      { id: "2", isGlobal: false, userId: "user-1" },
    ];
    const db = makeDbClient({ selectResult: questions });
    const repo = new DrizzleInterviewQuestionsRepository(INTERVIEW_TABLE, db);
    const result = await repo.findGlobalAndUserQuestions("user-1");
    expect(result).toEqual(questions);
    expect(db.select).toHaveBeenCalled();
    expect(db._mocks.selectFrom).toHaveBeenCalledWith(INTERVIEW_TABLE);
    expect(db._mocks.selectWhere).toHaveBeenCalled();
  });

  it("returns empty when no matching questions", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleInterviewQuestionsRepository(INTERVIEW_TABLE, db);
    const result = await repo.findGlobalAndUserQuestions("user-unknown");
    expect(result).toEqual([]);
  });
});

// ─── DrizzleUserProgressRepository ───────────────────────────────────────────

describe("DrizzleUserProgressRepository — findByUserAndItem", () => {
  it("returns progress entries for user and item", async () => {
    const progress = [{ id: "1", userId: "user-1", itemId: "item-abc", completed: true }];
    const db = makeDbClient({ selectResult: progress });
    const repo = new DrizzleUserProgressRepository(PROGRESS_TABLE, db);
    const result = await repo.findByUserAndItem("user-1", "item-abc");
    expect(result).toEqual(progress);
    expect(db._mocks.selectWhere).toHaveBeenCalled();
  });

  it("returns empty array when no progress found", async () => {
    const db = makeDbClient({ selectResult: [] });
    const repo = new DrizzleUserProgressRepository(PROGRESS_TABLE, db);
    const result = await repo.findByUserAndItem("user-1", "missing-item");
    expect(result).toEqual([]);
  });
});

describe("DrizzleUserProgressRepository — updateCompletedByUserAndItem", () => {
  it("updates completed status and returns updated rows", async () => {
    const updated = [{ id: "1", userId: "user-1", itemId: "item-abc", completed: true }];
    const db = makeDbClient({ updateResult: updated });
    const repo = new DrizzleUserProgressRepository(PROGRESS_TABLE, db);
    const result = await repo.updateCompletedByUserAndItem("user-1", "item-abc", true);
    expect(result).toEqual(updated);
    expect(db.update).toHaveBeenCalledWith(PROGRESS_TABLE);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ completed: true, updatedAt: expect.any(Date) })
    );
    expect(db._mocks.updateReturning).toHaveBeenCalled();
  });

  it("sets completed to false", async () => {
    const updated = [{ id: "1", completed: false }];
    const db = makeDbClient({ updateResult: updated });
    const repo = new DrizzleUserProgressRepository(PROGRESS_TABLE, db);
    await repo.updateCompletedByUserAndItem("user-1", "item-abc", false);
    expect(db._mocks.updateSet).toHaveBeenCalledWith(
      expect.objectContaining({ completed: false })
    );
  });
});

// ─── DrizzleUnitOfWork (structural) ──────────────────────────────────────────

describe("DrizzleUnitOfWork — structure and initialization", () => {
  it("initialises all repository properties without error", async () => {
    const { DrizzleUnitOfWork } = await import("../../infrastructure/repositories/drizzle-unit-of-work.js");
    const uow = new DrizzleUnitOfWork({} as any);
    expect(uow.agents).toBeDefined();
    expect(uow.components).toBeDefined();
    expect(uow.prompts).toBeDefined();
    expect(uow.templates).toBeDefined();
    expect(uow.snippets).toBeDefined();
    expect(uow.plannerTasks).toBeDefined();
    expect(uow.interviewQuestions).toBeDefined();
    expect(uow.cvProfiles).toBeDefined();
    expect(uow.authUsers).toBeDefined();
    expect(uow.userProfiles).toBeDefined();
    expect(uow.userProgress).toBeDefined();
    expect(uow.skillTasks).toBeDefined();
    expect(uow.skillProjects).toBeDefined();
  });

  it("transaction callback receives a UoW instance", async () => {
    const { DrizzleUnitOfWork } = await import("../../infrastructure/repositories/drizzle-unit-of-work.js");
    const mockTx = async (cb: (uow: any) => Promise<any>) => cb({ agents: {} });
    const txClient = { transaction: vi.fn().mockImplementation(mockTx) };
    const uow = new DrizzleUnitOfWork(txClient as any);
    const cbResult = await uow.transaction(async (innerUow) => {
      return "tx-result";
    });
    expect(cbResult).toBe("tx-result");
  });
});
