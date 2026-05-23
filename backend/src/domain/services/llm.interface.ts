export interface ILLMService {
  createChatCompletion(
    prompt: string,
    systemPrompt?: string,
    config?: { model?: string; temperature?: number; maxTokens?: number }
  ): Promise<string>;

  createJsonCompletion<T>(
    prompt: string,
    systemPrompt: string,
    config?: { model?: string; temperature?: number }
  ): Promise<T>;
}
