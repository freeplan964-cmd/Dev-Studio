import { Request, Response } from "express";
import { chatService } from "../../infrastructure/di/container.js";

export const create = async (req: Request, res: Response) => {
  try {
    const { prompt, systemPrompt, config } = req.body;
    const reply = await chatService.createChatCompletion(
      prompt,
      systemPrompt,
      config,
    );
    res.json({ reply });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res
      .status(errorMessage === "prompt is required" ? 400 : 500)
      .json({ error: errorMessage });
  }
};
