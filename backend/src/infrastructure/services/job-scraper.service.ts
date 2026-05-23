import { IScraperService } from "../../domain/services/scraper.interface.js";
import { scrapeIndeedRSS } from "../lib/scrapers/indeed.js";
import { scrapeWuzzuf } from "../lib/scrapers/wuzzuf.js";
import { scrapeBayt } from "../lib/scrapers/bayt.js";
import { scrapeRemoteOKTagged } from "../lib/scrapers/remoteok.js";

export class JobScraperService implements IScraperService {
  async getRemoteJobs(tag: string): Promise<any[]> {
    const tagQuery = tag ? `?tag=${encodeURIComponent(tag)}` : "";
    const r = await fetch(`https://remoteok.com/api${tagQuery}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 DevStudio/1.0",
        Accept: "application/json",
      },
    });

    if (!r.ok) throw new Error(`RemoteOK ${r.status}`);

    const data = (await r.json()) as any[];
    return data
      .slice(1)
      .filter((j: any) => j.id && j.title)
      .slice(0, 30);
  }

  async scrapeJobs(
    query: string,
    location: string,
    days: number,
    sources: string[]
  ): Promise<{ jobs: any[]; errors: string[] }> {
    const results: any[] = [];
    const errors: string[] = [];
    const tasks: Promise<void>[] = [];

    const runTask = async (name: string, fn: () => Promise<any[]>) => {
      try {
        const j = await fn();
        results.push(...j);
      } catch (err) {
        console.error(`Scraper error (${name}):`, err);
        errors.push(name);
      }
    };

    if (sources.includes("indeed"))
      tasks.push(
        runTask("indeed", () => scrapeIndeedRSS(query, location, days)),
      );
    if (sources.includes("wuzzuf"))
      tasks.push(runTask("wuzzuf", () => scrapeWuzzuf(query, location, days)));
    if (sources.includes("bayt"))
      tasks.push(runTask("bayt", () => scrapeBayt(query, location, days)));
    if (sources.includes("remoteok"))
      tasks.push(runTask("remoteok", () => scrapeRemoteOKTagged(query)));

    await Promise.allSettled(tasks);

    results.sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
    );

    return { jobs: results.slice(0, 60), errors };
  }
}
