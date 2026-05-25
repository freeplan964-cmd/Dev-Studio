import { describe, it, expect, vi } from "vitest";
import { ChatService } from "../../application/services/chat.service.js";

// ─── Mock LLM service ─────────────────────────────────────────────────────────

function makeLlmService(overrides: Record<string, any> = {}) {
  return {
    createChatCompletion: vi.fn().mockResolvedValue({
      content: "Mocked AI response",
      model: "gpt-4o-mini",
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
    }),
    createJsonCompletion: vi.fn().mockResolvedValue({ result: "json-result" }),
    ...overrides,
  };
}

// ─── createChatCompletion ─────────────────────────────────────────────────────

describe("ChatService.createChatCompletion", () => {
  it("delegates directly to llmService.createChatCompletion", async () => {
    const llm = makeLlmService();
    const svc = new ChatService(llm as any);
    const result = await svc.createChatCompletion("Hello", "You are helpful");
    expect(llm.createChatCompletion).toHaveBeenCalledWith(
      "Hello",
      "You are helpful",
      undefined
    );
    expect(result).toEqual({
      content: "Mocked AI response",
      model: "gpt-4o-mini",
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
    });
  });

  it("passes config options through to llmService", async () => {
    const llm = makeLlmService();
    const svc = new ChatService(llm as any);
    const config = { model: "gpt-4o", temperature: 0.5, maxTokens: 500 };
    await svc.createChatCompletion("Prompt", undefined, config);
    expect(llm.createChatCompletion).toHaveBeenCalledWith("Prompt", undefined, config);
  });

  it("works without a system prompt", async () => {
    const llm = makeLlmService();
    const svc = new ChatService(llm as any);
    await svc.createChatCompletion("Just a prompt");
    expect(llm.createChatCompletion).toHaveBeenCalledWith("Just a prompt", undefined, undefined);
  });

  it("propagates errors from llmService", async () => {
    const llm = makeLlmService({
      createChatCompletion: vi.fn().mockRejectedValue(new Error("LLM unavailable")),
    });
    const svc = new ChatService(llm as any);
    await expect(svc.createChatCompletion("Fail")).rejects.toThrow("LLM unavailable");
  });

  it("handles empty prompt string", async () => {
    const llm = makeLlmService();
    const svc = new ChatService(llm as any);
    await svc.createChatCompletion("");
    expect(llm.createChatCompletion).toHaveBeenCalledWith("", undefined, undefined);
  });
});

// ─── Dependency injection ─────────────────────────────────────────────────────

describe("ChatService — dependency injection", () => {
  it("stores the injected llmService and uses it for calls", async () => {
    const llm1 = makeLlmService({ createChatCompletion: vi.fn().mockResolvedValue("response-1") });
    const llm2 = makeLlmService({ createChatCompletion: vi.fn().mockResolvedValue("response-2") });
    const svc1 = new ChatService(llm1 as any);
    const svc2 = new ChatService(llm2 as any);
    const r1 = await svc1.createChatCompletion("hello");
    const r2 = await svc2.createChatCompletion("hello");
    expect(r1).toBe("response-1");
    expect(r2).toBe("response-2");
    expect(llm1.createChatCompletion).toHaveBeenCalledOnce();
    expect(llm2.createChatCompletion).toHaveBeenCalledOnce();
  });
});
