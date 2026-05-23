import { eq, and, isNull, or } from "drizzle-orm";
import { IRepository } from "../../domain/repositories/base.repository.js";

export class DrizzleBaseRepository<
  TTable extends Record<string, any>,
  TSelect = any,
  TInsert = any
> implements IRepository<TSelect, TInsert> {
  constructor(
    protected table: TTable,
    protected dbClient: any
  ) {}

  /**
   * Helper to automatically apply soft delete filter (isNull(deletedAt)) if it exists on the table.
   */
  protected applySoftDelete(whereClause?: any): any {
    const hasDeletedAt = "deletedAt" in this.table;
    if (!hasDeletedAt) {
      return whereClause;
    }

    const softDeleteFilter = isNull((this.table as any).deletedAt);
    if (!whereClause) {
      return softDeleteFilter;
    }

    return and(whereClause, softDeleteFilter);
  }

  async findById(id: string): Promise<TSelect | null> {
    const whereClause = this.applySoftDelete(eq((this.table as any).id, id));
    const [row] = await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
    return row || null;
  }

  async findAll(filter?: any): Promise<TSelect[]> {
    const whereClause = this.applySoftDelete(filter);
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async findByUserId(userId: string): Promise<TSelect[]> {
    if (!("userId" in this.table)) {
      throw new Error("Table does not have a userId column");
    }
    const userFilter = or(
      eq((this.table as any).userId, userId),
      eq((this.table as any).userId, "local"),
    );
    const whereClause = this.applySoftDelete(userFilter);
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async findByUserAndId(userId: string, id: string): Promise<TSelect[]> {
    if (!("userId" in this.table)) {
      throw new Error("Table does not have a userId column");
    }
    const whereClause = this.applySoftDelete(
      and(eq((this.table as any).id, id), eq((this.table as any).userId, userId))
    );
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async findByField(field: string, value: unknown): Promise<TSelect[]> {
    if (!(field in this.table)) {
      throw new Error(`Table does not have a '${field}' column`);
    }
    const whereClause = this.applySoftDelete(eq((this.table as any)[field], value));
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }

  async create(data: TInsert): Promise<TSelect> {
    const [row] = await this.dbClient
      .insert(this.table)
      .values(data)
      .returning();
    return row;
  }

  async createMany(data: TInsert[]): Promise<TSelect[]> {
    if (!data.length) return [];
    return await this.dbClient
      .insert(this.table)
      .values(data)
      .onConflictDoNothing()
      .returning();
  }

  async update(id: string, data: Partial<TInsert>): Promise<TSelect> {
    const whereClause = this.applySoftDelete(eq((this.table as any).id, id));
    const [row] = await this.dbClient
      .update(this.table)
      .set({ ...data, updatedAt: new Date() })
      .where(whereClause)
      .returning();
    return row;
  }

  async updateMany(filter: any, data: Partial<TInsert>): Promise<TSelect[]> {
    const whereClause = this.applySoftDelete(filter);
    return await this.dbClient
      .update(this.table)
      .set({ ...data, updatedAt: new Date() })
      .where(whereClause)
      .returning();
  }

  async delete(id: string): Promise<boolean> {
    const hasDeletedAt = "deletedAt" in this.table;
    const whereClause = eq((this.table as any).id, id);

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

  async deleteMany(filter: any): Promise<boolean> {
    const hasDeletedAt = "deletedAt" in this.table;
    const whereClause = this.applySoftDelete(filter);

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

  /**
   * Ownership-checked delete in a single query.
   * Avoids the extra findById round-trip that a separate check + delete would need.
   */
  async deleteByUserAndId(userId: string, id: string): Promise<boolean> {
    const hasDeletedAt = "deletedAt" in this.table;
    const whereClause = and(
      eq((this.table as any).id, id),
      eq((this.table as any).userId, userId),
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
