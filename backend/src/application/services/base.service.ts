/**
 * BaseService — shared CRUD logic for every simple user-scoped resource.
 *
 * Eliminates the copy-paste pattern in AgentsService, PromptsService,
 * SnippetsService, TemplatesService, ComponentsService, etc.
 *
 * Concrete services extend this and supply only the repo accessor.
 */

import { IRepository } from "../../domain/repositories/base.repository.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";
import { stripDates, isUUID, generateSlug } from "../../domain/utils.js";

export abstract class BaseService {
  constructor(
    protected uow: IUnitOfWork,
    private repoGetter: (uow: IUnitOfWork) => IRepository<any, any>,
  ) {}

  protected get repo(): IRepository<any, any> {
    return this.repoGetter(this.uow);
  }

  async getAll(userId: string): Promise<any[]> {
    return this.repo.findByUserId(userId);
  }

  /**
   * Create-or-update a single item.
   * If a valid UUID `id` is supplied and the record belongs to the user, it updates.
   * Otherwise it creates a new record.
   * Slug is auto-generated from title / name / question if the field is empty.
   */
  async upsert(userId: string, rawData: any): Promise<any> {
    const { id, ...raw } = rawData;
    const data = stripDates(raw) as Record<string, any>;
    this.ensureSlug(data);

    const safeId = isUUID(id) ? id : undefined;
    if (safeId) {
      const existing = await this.repo.findByUserAndId(userId, safeId);
      if (existing.length > 0) {
        return this.repo.update(safeId, data);
      }
    }

    return this.repo.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);
  }

  /**
   * Bulk-insert items for a user.
   * Uses createMany with onConflictDoNothing — fast single-round-trip insert.
   */
  async upsertBulk(userId: string, items: any[]): Promise<any[]> {
    if (!items.length) return [];

    const values = items.map(({ id, ...raw }) => {
      const data = stripDates(raw) as Record<string, any>;
      this.ensureSlug(data);
      const safeId = isUUID(id) ? id : undefined;
      return { ...data, userId, ...(safeId ? { id: safeId } : {}) } as any;
    });

    return this.repo.createMany(values);
  }

  /**
   * Delete by ID — ownership-checked in one query via deleteByUserAndId,
   * avoiding the extra findById + delete round-trip.
   */
  async deleteById(userId: string, id: string): Promise<boolean> {
    if (!isUUID(id)) return true;
    await this.repo.deleteByUserAndId(userId, id);
    return true;
  }

  /** Auto-fill slug from the first available text field. */
  private ensureSlug(data: Record<string, any>): void {
    if (data.slug) return;
    const text = data.title ?? data.name ?? data.question ?? null;
    if (text) data.slug = generateSlug(String(text));
  }
}
