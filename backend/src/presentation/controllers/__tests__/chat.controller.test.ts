import { describe, it, expect, vi, beforeEach } from "vitest";
import { create } from "../chat.controller.js";
import { Request, Response } from "express";

// Mock the openai infrastructure library
vi.mock("../../../infrastructure/lib/openai.js", () => {
  return {
    getOpenAI: vi.fn().mockReturnValue({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: "Hello from mock AI!",
                },
              },
            ],
          }),
        },
      },
    }),
  };
});

describe("Chat Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnThis();
    req = {
      body: {},
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return 400 error if prompt is missing", async () => {
    req.body = {};
    await create(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: "prompt is required" });
  });

  it("should return chat reply if prompt is present", async () => {
    req.body = { prompt: "Hello" };
    await create(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalledWith({ reply: "Hello from mock AI!" });
  });
});
