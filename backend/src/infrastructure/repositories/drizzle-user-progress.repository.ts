import { eq, and } from "drizzle-orm";
import { DrizzleBaseRepository } from "./drizzle-base.repository.js";
import { IUserProgressRepository } from "../../domain/repositories/user-progress.repository.interface.js";

export class DrizzleUserProgressRepository
  extends DrizzleBaseRepository<any, any, any>
  implements IUserProgressRepository
{
  async findByUserAndItem(userId: string, itemId: string): Promise<any[]> {
    const whereClause = this.applySoftDelete(
      and(
        eq((this.table as any).userId, userId),
        eq((this.table as any).itemId, itemId),
      ),
    );
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async updateCompletedByUserAndItem(
    userId: string,
    itemId: string,
    completed: boolean,
  ): Promise<any[]> {
    const whereClause = this.applySoftDelete(
      and(
        eq((this.table as any).userId, userId),
        eq((this.table as any).itemId, itemId),
      ),
    );
    return await this.dbClient
      .update(this.table)
      .set({ completed, updatedAt: new Date() })
      .where(whereClause)
      .returning();
  }
}
