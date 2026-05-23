import { IRepository } from "./base.repository.js";

export interface IInterviewQuestionsRepository<TSelect = any, TInsert = any> extends IRepository<TSelect, TInsert> {
  findGlobalAndUserQuestions(userId: string): Promise<TSelect[]>;
}
