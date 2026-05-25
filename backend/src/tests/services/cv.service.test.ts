import { describe, it, expect, vi, beforeEach } from "vitest";
import { CVService } from "../../application/services/cv.service.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

function makeUow(overrides: Record<string, any> = {}) {
  return {
    cvProfiles: {
      findByUserId: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      findByUserAndId: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockImplementation(async (data: any) => ({
        id: VALID_UUID,
        userId: "user-1",
        title: data.title ?? "My CV",
        focus: data.focus ?? "fullstack",
        summary: data.summary ?? "",
        personalInfo: JSON.stringify({}),
        experience: JSON.stringify([]),
        skills: JSON.stringify({ technical: [], soft: [], tools: [], languages: [] }),
        education: JSON.stringify([]),
        projects: JSON.stringify([]),
        languages: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      update: vi.fn().mockImplementation(async (id: string, data: any) => ({
        id,
        userId: "user-1",
        ...data,
        personalInfo: data.personalInfo ?? JSON.stringify({}),
        experience: data.experience ?? JSON.stringify([]),
        skills: data.skills ?? JSON.stringify({ technical: [], soft: [], tools: [], languages: [] }),
        education: data.education ?? JSON.stringify([]),
        projects: data.projects ?? JSON.stringify([]),
        languages: data.languages ?? JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      delete: vi.fn().mockResolvedValue(true),
      ...overrides,
    },
  } as any;
}

function makeLlm(overrides: Record<string, any> = {}) {
  return {
    createJsonCompletion: vi.fn().mockResolvedValue({ score: 85, grade: "Good" }),
    createChatCompletion: vi.fn().mockResolvedValue({ content: "AI response" }),
    ...overrides,
  } as any;
}

// ─── getAll ───────────────────────────────────────────────────────────────────

describe("CVService.getAll", () => {
  it("returns mapped CV profiles for a user", async () => {
    const dbRow = {
      id: VALID_UUID,
      userId: "user-1",
      title: "Dev CV",
      focus: "frontend",
      summary: "A great developer",
      personalInfo: JSON.stringify({ name: "Alice" }),
      experience: JSON.stringify([]),
      skills: JSON.stringify({ technical: ["React"], soft: [], tools: [], languages: [] }),
      education: JSON.stringify([]),
      projects: JSON.stringify([]),
      languages: JSON.stringify([]),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const uow = makeUow();
    uow.cvProfiles.findByUserId = vi.fn().mockResolvedValue([dbRow]);
    const svc = new CVService(uow, makeLlm());
    const result = await svc.getAll("user-1");
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id", VALID_UUID);
    expect(result[0]).toHaveProperty("title", "Dev CV");
    expect(uow.cvProfiles.findByUserId).toHaveBeenCalledWith("user-1");
  });

  it("returns empty array when user has no CVs", async () => {
    const uow = makeUow();
    const svc = new CVService(uow, makeLlm());
    const result = await svc.getAll("user-empty");
    expect(result).toEqual([]);
  });
});

// ─── create — new record ──────────────────────────────────────────────────────

describe("CVService.create — new record", () => {
  it("creates a new CV when no id is given", async () => {
    const uow = makeUow();
    const svc = new CVService(uow, makeLlm());
    const result = await svc.create("user-1", {
      title: "My CV",
      focus: "fullstack",
      summary: "Summary text",
      personalInfo: { name: "Alice" },
      experience: [],
      skills: { technical: ["TS"], soft: [], tools: [], languages: [] },
      education: [],
      projects: [],
      languages: [],
    });
    expect(uow.cvProfiles.create).toHaveBeenCalledOnce();
    expect(uow.cvProfiles.update).not.toHaveBeenCalled();
    const callArg = uow.cvProfiles.create.mock.calls[0][0];
    expect(callArg.userId).toBe("user-1");
    expect(callArg.personalInfo).toBe(JSON.stringify({ name: "Alice" }));
  });

  it("JSON-stringifies nested objects before storing", async () => {
    const uow = makeUow();
    const svc = new CVService(uow, makeLlm());
    await svc.create("user-1", {
      title: "CV",
      focus: "backend",
      personalInfo: { name: "Bob", email: "bob@example.com" },
      experience: [{ role: "Dev", company: "Corp" }],
      skills: { technical: ["Node"], soft: [], tools: [], languages: [] },
      education: [],
      projects: [],
      languages: [],
    });
    const callArg = uow.cvProfiles.create.mock.calls[0][0];
    expect(typeof callArg.personalInfo).toBe("string");
    expect(typeof callArg.experience).toBe("string");
    expect(JSON.parse(callArg.experience)).toEqual([{ role: "Dev", company: "Corp" }]);
  });
});

// ─── create — update path ─────────────────────────────────────────────────────

describe("CVService.create — update path", () => {
  it("updates when a matching record exists for the user", async () => {
    const existing = { id: VALID_UUID, userId: "user-1" };
    const uow = makeUow();
    uow.cvProfiles.findByUserAndId = vi.fn().mockResolvedValue([existing]);
    const svc = new CVService(uow, makeLlm());
    await svc.create("user-1", {
      id: VALID_UUID,
      title: "Updated CV",
      focus: "frontend",
      personalInfo: {},
      experience: [],
      skills: { technical: [], soft: [], tools: [], languages: [] },
      education: [],
      projects: [],
      languages: [],
    });
    expect(uow.cvProfiles.update).toHaveBeenCalledWith(
      VALID_UUID,
      expect.objectContaining({ title: "Updated CV" })
    );
    expect(uow.cvProfiles.create).not.toHaveBeenCalled();
  });

  it("creates new when id is not a valid UUID", async () => {
    const uow = makeUow();
    const svc = new CVService(uow, makeLlm());
    await svc.create("user-1", {
      id: "not-a-valid-uuid",
      title: "CV",
      focus: "general",
      personalInfo: {},
      experience: [],
      skills: { technical: [], soft: [], tools: [], languages: [] },
      education: [],
      projects: [],
      languages: [],
    });
    expect(uow.cvProfiles.create).toHaveBeenCalledOnce();
    expect(uow.cvProfiles.update).not.toHaveBeenCalled();
  });
});

// ─── deleteById ───────────────────────────────────────────────────────────────

describe("CVService.deleteById", () => {
  it("deletes the CV when ownership matches", async () => {
    const uow = makeUow();
    uow.cvProfiles.findById = vi.fn().mockResolvedValue({ id: VALID_UUID, userId: "user-1" });
    const svc = new CVService(uow, makeLlm());
    const result = await svc.deleteById("user-1", VALID_UUID);
    expect(result).toBe(true);
    expect(uow.cvProfiles.delete).toHaveBeenCalledWith(VALID_UUID);
  });

  it("returns true without deleting if ownership does not match", async () => {
    const uow = makeUow();
    uow.cvProfiles.findById = vi.fn().mockResolvedValue({ id: VALID_UUID, userId: "other-user" });
    const svc = new CVService(uow, makeLlm());
    const result = await svc.deleteById("user-1", VALID_UUID);
    expect(result).toBe(true);
    expect(uow.cvProfiles.delete).not.toHaveBeenCalled();
  });

  it("returns true immediately for non-UUID ids", async () => {
    const uow = makeUow();
    const svc = new CVService(uow, makeLlm());
    const result = await svc.deleteById("user-1", "not-a-uuid");
    expect(result).toBe(true);
    expect(uow.cvProfiles.findById).not.toHaveBeenCalled();
  });
});

// ─── atsCheck ────────────────────────────────────────────────────────────────

describe("CVService.atsCheck", () => {
  it("throws when cvProfile is missing", async () => {
    const svc = new CVService(makeUow(), makeLlm());
    await expect(svc.atsCheck(null, "Job description")).rejects.toThrow(
      "cvProfile and jobDescription are required"
    );
  });

  it("throws when jobDescription is empty", async () => {
    const svc = new CVService(makeUow(), makeLlm());
    await expect(svc.atsCheck({ personalInfo: {}, focus: "fullstack" }, "")).rejects.toThrow(
      "cvProfile and jobDescription are required"
    );
  });

  it("calls llmService.createJsonCompletion with cv and job description", async () => {
    const llm = makeLlm();
    const svc = new CVService(makeUow(), llm);
    const cv = {
      personalInfo: { name: "Alice", title: "Developer" },
      focus: "fullstack",
      summary: "Experienced dev",
      experience: [],
      skills: { technical: ["React"], soft: [], tools: [], languages: [] },
      education: [],
      projects: [],
    };
    await svc.atsCheck(cv, "We need a React developer");
    expect(llm.createJsonCompletion).toHaveBeenCalledOnce();
    const [userPrompt, systemPrompt, config] = llm.createJsonCompletion.mock.calls[0];
    expect(userPrompt).toContain("We need a React developer");
    expect(systemPrompt).toContain("ATS");
    expect(config).toEqual({ temperature: 0.3 });
  });
});

// ─── parsePdf ─────────────────────────────────────────────────────────────────

describe("CVService.parsePdf", () => {
  it("throws when no fileBase64 is provided", () => {
    const svc = new CVService(makeUow(), makeLlm());
    expect(() => svc.parsePdf("")).toThrow("fileBase64 required");
  });

  it("returns a string for valid base64 content", () => {
    const svc = new CVService(makeUow(), makeLlm());
    const fakeBase64 = Buffer.from("This is some basic text content of a document").toString("base64");
    const result = svc.parsePdf(fakeBase64);
    expect(typeof result).toBe("string");
  });
});
