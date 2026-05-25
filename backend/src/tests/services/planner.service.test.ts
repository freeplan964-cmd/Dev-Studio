import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlannerService } from "../../application/services/planner.service.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

const MOCK_SEEDS = {
  W1_WORK: [{ title: "W1 Work", priority: "high", category: "work" }],
  W1_LEARN: [{ title: "W1 Learn", priority: "medium", category: "learning" }],
  W2_WORK: [{ title: "W2 Work", priority: "high", category: "work" }],
  W2_LEARN: [{ title: "W2 Learn", priority: "medium", category: "learning" }],
  W3_WORK: [{ title: "W3 Work", priority: "high", category: "work" }],
  W3_LEARN: [{ title: "W3 Learn", priority: "medium", category: "learning" }],
  W4_WORK: [{ title: "W4 Work", priority: "high", category: "work" }],
  W4_LEARN: [{ title: "W4 Learn", priority: "medium", category: "learning" }],
  ACTIVITIES: [{ title: "Activity", priority: "low", category: "activity" }],
  PRESET_FOOD: [{ label: "Breakfast" }],
  PRESET_SPORTS: [{ label: "Running" }],
  PRESET_CARE: [{ label: "Meditation" }],
  PRESET_WORKING: [{ label: "Deep Work" }],
  PRESET_LEARNING: [{ label: "Study" }],
  WORKING_SUGGESTIONS: [{ text: "Focus on one task" }],
  LEARNING_SUGGESTIONS: [{ text: "Spaced repetition" }],
  PRAYER_SUGGESTIONS_TEMPLATES: { morning: "Morning prayer" },
};

function makeUow(overrides: Record<string, any> = {}) {
  return {
    plannerTasks: {
      findByUserId: vi.fn().mockResolvedValue([]),
      findByUserAndDateRange: vi.fn().mockResolvedValue([]),
      findByUserAndId: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(async (data: any) => ({
        id: VALID_UUID,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      createMany: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockImplementation(async (id: string, data: any) => ({
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      delete: vi.fn().mockResolvedValue(true),
      deleteByUserAndDateRange: vi.fn().mockResolvedValue(true),
      ...overrides,
    },
  } as any;
}

function makeLlm() {
  return {
    createJsonCompletion: vi.fn().mockResolvedValue({
      suggestions: ["Work in focused blocks"],
      schedule: "09:00 Deep work. 12:00 Lunch.",
    }),
  } as any;
}

// ─── getPresets ───────────────────────────────────────────────────────────────

describe("PlannerService.getPresets", () => {
  it("returns preset categories from seeds", () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    const result = svc.getPresets();
    expect(result.presets.food).toEqual(MOCK_SEEDS.PRESET_FOOD);
    expect(result.presets.sports).toEqual(MOCK_SEEDS.PRESET_SPORTS);
    expect(result.presets.working).toEqual(MOCK_SEEDS.PRESET_WORKING);
    expect(result.presets.learning).toEqual(MOCK_SEEDS.PRESET_LEARNING);
  });

  it("returns suggestion arrays from seeds", () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    const result = svc.getPresets();
    expect(result.suggestions.working).toEqual(MOCK_SEEDS.WORKING_SUGGESTIONS);
    expect(result.suggestions.learning).toEqual(MOCK_SEEDS.LEARNING_SUGGESTIONS);
    expect(result.suggestions.prayerTemplates).toEqual(MOCK_SEEDS.PRAYER_SUGGESTIONS_TEMPLATES);
  });

  it("returns empty arrays when optional seed sections are missing", () => {
    const minimalSeeds = { ...MOCK_SEEDS, PRESET_FOOD: undefined, WORKING_SUGGESTIONS: undefined };
    const svc = new PlannerService(makeUow(), makeLlm(), minimalSeeds as any);
    const result = svc.getPresets();
    expect(result.presets.food).toEqual([]);
    expect(result.suggestions.working).toEqual([]);
  });
});

// ─── getAll ───────────────────────────────────────────────────────────────────

describe("PlannerService.getAll", () => {
  it("fetches all tasks when no date range provided", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    await svc.getAll("user-1");
    expect(uow.plannerTasks.findByUserId).toHaveBeenCalledWith("user-1");
    expect(uow.plannerTasks.findByUserAndDateRange).not.toHaveBeenCalled();
  });

  it("fetches tasks by date range when from/to are provided", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    await svc.getAll("user-1", "2026-01-01", "2026-01-31");
    expect(uow.plannerTasks.findByUserAndDateRange).toHaveBeenCalledWith(
      "user-1",
      "2026-01-01",
      "2026-01-31"
    );
    expect(uow.plannerTasks.findByUserId).not.toHaveBeenCalled();
  });

  it("returns mapped tasks", async () => {
    const uow = makeUow();
    uow.plannerTasks.findByUserId = vi.fn().mockResolvedValue([
      {
        id: VALID_UUID,
        userId: "user-1",
        title: "Test Task",
        date: "2026-01-10",
        status: "todo",
        priority: "high",
        category: "work",
        description: null,
        order: 0,
        estimatedMinutes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.getAll("user-1");
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id", VALID_UUID);
    expect(result[0]).toHaveProperty("title", "Test Task");
  });
});

// ─── create ───────────────────────────────────────────────────────────────────

describe("PlannerService.create — validation", () => {
  it("throws when title is missing", async () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    await expect(
      svc.create("user-1", { date: "2026-01-10", status: "todo", priority: "high", category: "work" })
    ).rejects.toThrow("title is required");
  });

  it("throws when title is empty string", async () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    await expect(
      svc.create("user-1", { title: "  ", date: "2026-01-10", status: "todo", priority: "high", category: "work" })
    ).rejects.toThrow("title is required");
  });

  it("throws when date is missing", async () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    await expect(
      svc.create("user-1", { title: "My Task", status: "todo", priority: "high", category: "work" })
    ).rejects.toThrow("date is required");
  });

  it("throws when date format is invalid", async () => {
    const svc = new PlannerService(makeUow(), makeLlm(), MOCK_SEEDS);
    await expect(
      svc.create("user-1", { title: "Task", date: "10-01-2026", status: "todo", priority: "high", category: "work" })
    ).rejects.toThrow("date is required");
  });
});

describe("PlannerService.create — new record", () => {
  it("creates a new task and returns it mapped", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.create("user-1", {
      title: "New Task",
      date: "2026-01-10",
      status: "todo",
      priority: "high",
      category: "work",
    });
    expect(uow.plannerTasks.create).toHaveBeenCalledOnce();
    expect(uow.plannerTasks.update).not.toHaveBeenCalled();
    const callArg = uow.plannerTasks.create.mock.calls[0][0];
    expect(callArg.userId).toBe("user-1");
    expect(callArg.title).toBe("New Task");
  });

  it("updates an existing task when matching id found", async () => {
    const uow = makeUow();
    uow.plannerTasks.findByUserAndId = vi.fn().mockResolvedValue([{ id: VALID_UUID }]);
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    await svc.create("user-1", {
      id: VALID_UUID,
      title: "Updated Task",
      date: "2026-01-10",
      status: "done",
      priority: "medium",
      category: "work",
    });
    expect(uow.plannerTasks.update).toHaveBeenCalledWith(
      VALID_UUID,
      expect.objectContaining({ title: "Updated Task" })
    );
    expect(uow.plannerTasks.create).not.toHaveBeenCalled();
  });
});

// ─── deleteById ───────────────────────────────────────────────────────────────

describe("PlannerService.deleteById", () => {
  it("deletes the task when ownership matches", async () => {
    const uow = makeUow();
    uow.plannerTasks.findById = vi.fn().mockResolvedValue({ id: VALID_UUID, userId: "user-1" });
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.deleteById("user-1", VALID_UUID);
    expect(result).toBe(true);
    expect(uow.plannerTasks.delete).toHaveBeenCalledWith(VALID_UUID);
  });

  it("returns true without deleting if ownership does not match", async () => {
    const uow = makeUow();
    uow.plannerTasks.findById = vi.fn().mockResolvedValue({ id: VALID_UUID, userId: "other-user" });
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.deleteById("user-1", VALID_UUID);
    expect(result).toBe(true);
    expect(uow.plannerTasks.delete).not.toHaveBeenCalled();
  });

  it("returns true immediately for non-UUID ids", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.deleteById("user-1", "invalid-id");
    expect(result).toBe(true);
    expect(uow.plannerTasks.findById).not.toHaveBeenCalled();
  });
});

// ─── suggest ─────────────────────────────────────────────────────────────────

describe("PlannerService.suggest", () => {
  it("calls llmService with date and task list in prompt", async () => {
    const llm = makeLlm();
    const svc = new PlannerService(makeUow(), llm, MOCK_SEEDS);
    const tasks = [{ status: "todo", title: "Fix bug", priority: "high", category: "work" }];
    await svc.suggest("2026-01-10", tasks);
    expect(llm.createJsonCompletion).toHaveBeenCalledOnce();
    const [userPrompt] = llm.createJsonCompletion.mock.calls[0];
    expect(userPrompt).toContain("2026-01-10");
    expect(userPrompt).toContain("Fix bug");
  });

  it("handles empty task list gracefully", async () => {
    const llm = makeLlm();
    const svc = new PlannerService(makeUow(), llm, MOCK_SEEDS);
    await svc.suggest("2026-01-10", []);
    const [userPrompt] = llm.createJsonCompletion.mock.calls[0];
    expect(userPrompt).toContain("No tasks yet for this day");
  });
});

// ─── seed ─────────────────────────────────────────────────────────────────────

describe("PlannerService.seed", () => {
  it("inserts tasks for weekdays of the given month", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.seed("user-1", "2026-01");
    expect(uow.plannerTasks.createMany).toHaveBeenCalledOnce();
    expect(result.count).toBeGreaterThan(0);
    // January 2026 has 22 weekdays × 3 tasks/day = 66
    expect(result.count).toBe(66);
  });

  it("skips weekends", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    const result = await svc.seed("user-1", "2026-01");
    const rows: any[] = uow.plannerTasks.createMany.mock.calls[0][0];
    const dates = rows.map((r: any) => new Date(`${r.date}T00:00:00`).getDay());
    // No task should be on Sunday (0) or Saturday (6)
    expect(dates.every((d: number) => d !== 0 && d !== 6)).toBe(true);
  });

  it("clears existing tasks before seeding when clear=true", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    await svc.seed("user-1", "2026-01", true);
    expect(uow.plannerTasks.deleteByUserAndDateRange).toHaveBeenCalledWith(
      "user-1",
      "2026-01-01",
      "2026-01-31"
    );
  });

  it("does not clear when clear is false", async () => {
    const uow = makeUow();
    const svc = new PlannerService(uow, makeLlm(), MOCK_SEEDS);
    await svc.seed("user-1", "2026-01", false);
    expect(uow.plannerTasks.deleteByUserAndDateRange).not.toHaveBeenCalled();
  });
});
