import { ILLMService } from "../../domain/services/llm.interface.js";
import { getOpenAI } from "../lib/openai.js";

export class OpenAILLMService implements ILLMService {
  async createChatCompletion(
    prompt: string,
    systemPrompt?: string,
    config?: { model?: string; temperature?: number; maxTokens?: number }
  ): Promise<string> {
    if (!prompt) {
      throw new Error("prompt is required");
    }

    const response = await getOpenAI().chat.completions.create({
      model: config?.model || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are an expert AI coding assistant.",
        },
        { role: "user", content: prompt },
      ],
      temperature: config?.temperature ?? 0.7,
      max_completion_tokens: config?.maxTokens,
    });

    return response.choices[0]?.message?.content ?? "";
  }

  async createJsonCompletion<T>(
    prompt: string,
    systemPrompt: string,
    config?: { model?: string; temperature?: number }
  ): Promise<T> {
    const response = await getOpenAI().chat.completions.create({
      model: config?.model || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: config?.temperature ?? 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(content) as T;
  }
}
