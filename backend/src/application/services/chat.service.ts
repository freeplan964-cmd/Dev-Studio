import { ILLMService } from "../../domain/services/llm.interface.js";

export class ChatService {
  constructor(private llmService: ILLMService) {}

  async createChatCompletion(
    prompt: string,
    systemPrompt?: string,
    config?: { model?: string; temperature?: number; maxTokens?: number },
  ) {
    return this.llmService.createChatCompletion(prompt, systemPrompt, config);
  }
}

