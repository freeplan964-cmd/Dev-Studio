export interface IScraperService {
  scrapeJobs(
    query: string,
    location: string,
    days: number,
    sources: string[]
  ): Promise<{ jobs: any[]; errors: string[] }>;

  getRemoteJobs(tag: string): Promise<any[]>;
}
