import { stripDates, isUUID, generateSlug } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";
import { IScraperService } from "../../domain/services/scraper.interface.js";
import { cache, TTL } from "../../infrastructure/lib/cache.js";

export class JobsService {
  constructor(
    private uow: IUnitOfWork,
    private scraperService: IScraperService,
  ) {}

  async getSaved(userId: string) {
    return await this.uow.savedJobs.findByUserId(userId);
  }

  async saveJob(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw) as Record<string, any>;
    if (!data.slug) {
      const text = data.title ?? data.company ?? null;
      if (text) data.slug = generateSlug(String(text));
    }
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await this.uow.savedJobs.findByUserAndId(userId, safeId);
      if (existing.length > 0) {
        return this.uow.savedJobs.update(safeId, data);
      }
    }

    return this.uow.savedJobs.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);
  }

  async deleteSavedById(userId: string, id: string) {
    if (!isUUID(id)) return true;
    await this.uow.savedJobs.deleteByUserAndId(userId, id);
    return true;
  }

  async getRemoteJobs(tag: string) {
    const key = `remote_jobs:${tag}`;
    const cached = cache.get<any[]>(key);
    if (cached) return cached;

    const jobs = await this.scraperService.getRemoteJobs(tag);
    cache.set(key, jobs, TTL.MEDIUM);
    return jobs;
  }

  async scrapeJobs(
    query: string,
    location: string,
    days: number,
    sources: string[],
  ) {
    const key = `scrape_jobs:${query}:${location}:${days}:${sources.sort().join(",")}`;
    const cached = cache.get<any[]>(key);
    if (cached) return cached;

    const jobs = await this.scraperService.scrapeJobs(query, location, days, sources);
    cache.set(key, jobs, TTL.MEDIUM);
    return jobs;
  }
}

