import { eq, and, gte, lte } from "drizzle-orm";
import { DrizzleBaseRepository } from "./drizzle-base.repository.js";
import { IPlannerTasksRepository } from "../../domain/repositories/planner-tasks.repository.interface.js";

export class DrizzlePlannerTasksRepository
  extends DrizzleBaseRepository<any, any, any>
  implements IPlannerTasksRepository
{
  async findByUserAndDateRange(
    userId: string,
    fromDate: string,
    toDate: string,
  ): Promise<any[]> {
    const whereClause = this.applySoftDelete(
      and(
        eq((this.table as any).userId, userId),
        gte((this.table as any).date, fromDate),
        lte((this.table as any).date, toDate),
      ),
    );
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async deleteByUserAndDateRange(
    userId: string,
    fromDate: string,
    toDate: string,
  ): Promise<boolean> {
    const hasDeletedAt = "deletedAt" in this.table;
    const whereClause = and(
      eq((this.table as any).userId, userId),
      gte((this.table as any).date, fromDate),
      lte((this.table as any).date, toDate),
    );

    if (hasDeletedAt) {
      await this.dbClient
        .update(this.table)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(whereClause);
    } else {
      await this.dbClient
        .delete(this.table)
        .where(whereClause);
    }
    return true;
  }
}
