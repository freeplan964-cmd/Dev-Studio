import { IRepository } from "./base.repository.js";

export interface IUserProgressRepository<TSelect = any, TInsert = any> extends IRepository<TSelect, TInsert> {
  findByUserAndItem(userId: string, itemId: string): Promise<TSelect[]>;
  updateCompletedByUserAndItem(userId: string, itemId: string, completed: boolean): Promise<TSelect[]>;
}
