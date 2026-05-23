import { isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class SkillsService {
  constructor(private uow: IUnitOfWork) {}

  // ── Tasks ────────────────────────────────────────────────────────────────

  async getTasks(userId: string, areaId: string) {
    const rows = await this.uow.skillTasks.findByUserId(userId);
    return rows
      .filter((r: any) => r.areaId === areaId)
      .map((r: any) => ({
        id: r.id,
        areaId: r.areaId,
        title: r.title,
        notes: r.notes ?? "",
        done: r.done ?? false,
        createdAt: new Date(r.createdAt).getTime(),
        updatedAt: new Date(r.updatedAt).getTime(),
      }));
  }

  async createTask(userId: string, data: { areaId: string; title: string; notes?: string }) {
    const row = await this.uow.skillTasks.create({
      userId,
      areaId: data.areaId,
      title: data.title.trim(),
      notes: (data.notes ?? "").trim(),
      done: false,
    } as any);
    return {
      id: row.id,
      areaId: row.areaId,
      title: row.title,
      notes: row.notes ?? "",
      done: row.done ?? false,
      createdAt: new Date(row.createdAt).getTime(),
      updatedAt: new Date(row.updatedAt).getTime(),
    };
  }

  async toggleTask(userId: string, id: string, done: boolean) {
    if (!isUUID(id)) throw new Error("Invalid task id");
    const existing = await this.uow.skillTasks.findByUserAndId(userId, id);
    if (!existing.length) throw new Error("Task not found");
    const row = await this.uow.skillTasks.update(id, { done } as any);
    return {
      id: row.id,
      areaId: row.areaId,
      title: row.title,
      notes: row.notes ?? "",
      done: row.done ?? false,
      createdAt: new Date(row.createdAt).getTime(),
      updatedAt: new Date(row.updatedAt).getTime(),
    };
  }

  async deleteTask(userId: string, id: string) {
    if (!isUUID(id)) return true;
    const existing = await this.uow.skillTasks.findByUserAndId(userId, id);
    if (existing.length) await this.uow.skillTasks.delete(id);
    return true;
  }

  // ── Projects ─────────────────────────────────────────────────────────────

  async getProjects(userId: string, areaId: string) {
    const rows = await this.uow.skillProjects.findByUserId(userId);
    return rows
      .filter((r: any) => r.areaId === areaId)
      .map((r: any) => ({
        id: r.id,
        areaId: r.areaId,
        title: r.title,
        desc: r.desc ?? "",
        url: r.url ?? "",
        tags: r.tags ?? [],
        createdAt: new Date(r.createdAt).getTime(),
        updatedAt: new Date(r.updatedAt).getTime(),
      }));
  }

  async upsertProject(
    userId: string,
    data: { id?: string; areaId: string; title: string; desc?: string; url?: string; tags?: string[] },
  ) {
    const safeId = isUUID(data.id ?? "") ? data.id : undefined;
    const payload = {
      userId,
      areaId: data.areaId,
      title: data.title.trim(),
      desc: (data.desc ?? "").trim(),
      url: (data.url ?? "").trim(),
      tags: data.tags ?? [],
    };

    if (safeId) {
      const existing = await this.uow.skillProjects.findByUserAndId(userId, safeId);
      if (existing.length) {
        const row = await this.uow.skillProjects.update(safeId, payload as any);
        return this._mapProject(row);
      }
    }

    const row = await this.uow.skillProjects.create({ ...payload } as any);
    return this._mapProject(row);
  }

  async deleteProject(userId: string, id: string) {
    if (!isUUID(id)) return true;
    const existing = await this.uow.skillProjects.findByUserAndId(userId, id);
    if (existing.length) await this.uow.skillProjects.delete(id);
    return true;
  }

  private _mapProject(r: any) {
    return {
      id: r.id,
      areaId: r.areaId,
      title: r.title,
      desc: r.desc ?? "",
      url: r.url ?? "",
      tags: r.tags ?? [],
      createdAt: new Date(r.createdAt).getTime(),
      updatedAt: new Date(r.updatedAt).getTime(),
    };
  }
}
