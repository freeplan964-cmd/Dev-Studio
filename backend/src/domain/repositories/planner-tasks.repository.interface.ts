import { IRepository } from "./base.repository.js";

export interface IPlannerTasksRepository<TSelect = any, TInsert = any> extends IRepository<TSelect, TInsert> {
  findByUserAndDateRange(userId: string, fromDate: string, toDate: string): Promise<TSelect[]>;
  deleteByUserAndDateRange(userId: string, fromDate: string, toDate: string): Promise<boolean>;
}
