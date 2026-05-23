import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";
import { ILLMService } from "../../domain/services/llm.interface.js";
import { PlannerMapper } from "../../domain/mappers/planner.mapper.js";

export interface PlannerSeeds {
  W1_WORK: any[];
  W1_LEARN: any[];
  W2_WORK: any[];
  W2_LEARN: any[];
  W3_WORK: any[];
  W3_LEARN: any[];
  W4_WORK: any[];
  W4_LEARN: any[];
  ACTIVITIES: any[];
  PRESET_FOOD?: any[];
  PRESET_SPORTS?: any[];
  PRESET_CARE?: any[];
  PRESET_WORKING?: any[];
  PRESET_LEARNING?: any[];
  WORKING_SUGGESTIONS?: any[];
  LEARNING_SUGGESTIONS?: any[];
  PRAYER_SUGGESTIONS_TEMPLATES?: any;
}

export class PlannerService {
  constructor(
    private uow: IUnitOfWork,
    private llmService: ILLMService,
    private seeds: PlannerSeeds,
  ) {}

  getPresets() {
    return {
      presets: {
        food: this.seeds.PRESET_FOOD || [],
        sports: this.seeds.PRESET_SPORTS || [],
        care: this.seeds.PRESET_CARE || [],
        working: this.seeds.PRESET_WORKING || [],
        learning: this.seeds.PRESET_LEARNING || [],
      },
      suggestions: {
        working: this.seeds.WORKING_SUGGESTIONS || [],
        learning: this.seeds.LEARNING_SUGGESTIONS || [],
        prayerTemplates: this.seeds.PRAYER_SUGGESTIONS_TEMPLATES || {},
      },
    };
  }

  async getAll(userId: string, from?: string, to?: string) {
    let rows;
    if (from && to) {
      rows = await this.uow.plannerTasks.findByUserAndDateRange(userId, from, to);
    } else {
      rows = await this.uow.plannerTasks.findByUserId(userId);
    }
    return rows.map(PlannerMapper.toDomain);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw) as Record<string, unknown>;

    // Validate required fields
    if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
      throw new Error("title is required");
    }
    if (
      !data.date ||
      typeof data.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date as string)
    ) {
      throw new Error("date is required (YYYY-MM-DD)");
    }

    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await this.uow.plannerTasks.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await this.uow.plannerTasks.update(safeId!, data);
      return PlannerMapper.toDomain(r);
    } else {
      const r = await this.uow.plannerTasks.create({
        ...data,
        userId,
        ...(safeId ? { id: safeId } : {}),
      } as any);
      return PlannerMapper.toDomain(r);
    }
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) return true;
    const task = await this.uow.plannerTasks.findById(id);
    if (task && task.userId === userId) {
      await this.uow.plannerTasks.delete(id);
    }
    return true;
  }

  async suggest(date: string, tasks: any[]) {
    const taskList =
      (tasks || [])
        .map(
          (t: any) =>
            `- [${t.status}] ${t.title} (${t.priority} priority, ${t.category})${t.description ? `: ${t.description}` : ""}`,
        )
        .join("\n") || "No tasks yet for this day.";

    const systemPrompt = `You are a personal productivity coach for a software developer. Analyze their task list and provide helpful, practical suggestions to improve their schedule and productivity. Be concise and actionable.

Return ONLY a valid JSON object with this exact structure:
{
  "suggestions": ["<actionable suggestion>", "<actionable suggestion>", "<actionable suggestion>"],
  "schedule": "<A suggested daily schedule in plain text, e.g. 09:00 Deep work - [task]. 11:00 Meetings. etc.>"
}`;

    const userPrompt = `Date: ${date}\n\nCurrent tasks:\n${taskList}\n\nPlease analyze and suggest improvements.`;

    return await this.llmService.createJsonCompletion<any>(userPrompt, systemPrompt, { temperature: 0.7 });
  }

  async seed(userId: string, month?: string, clear?: boolean) {
    const now = new Date();
    const ym =
      month ??
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const [yr, mo] = ym.split("-").map(Number);

    const daysInMonth = new Date(yr, mo, 0).getDate();

    if (clear) {
      const from = `${ym}-01`;
      const to = `${ym}-${String(daysInMonth).padStart(2, "0")}`;
      await this.uow.plannerTasks.deleteByUserAndDateRange(userId, from, to);
    }

    const rows: any[] = [];
    let order = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${ym}-${String(day).padStart(2, "0")}`;
      const d = new Date(`${dateStr}T00:00:00`);
      const dow = d.getDay(); // 0=Sun,1=Mon..6=Sat
      const isWeekend = dow === 0 || dow === 6;
      if (isWeekend) continue;

      const week = Math.min(Math.ceil(day / 7), 4);
      const workSeeds =
        week === 1
          ? this.seeds.W1_WORK
          : week === 2
            ? this.seeds.W2_WORK
            : week === 3
              ? this.seeds.W3_WORK
              : this.seeds.W4_WORK;
      const learnSeeds =
        week === 1
          ? this.seeds.W1_LEARN
          : week === 2
            ? this.seeds.W2_LEARN
            : week === 3
              ? this.seeds.W3_LEARN
              : this.seeds.W4_LEARN;

      const dowIdx = dow - 1;

      const actTask = this.seeds.ACTIVITIES[dowIdx % this.seeds.ACTIVITIES.length];
      const workTask = workSeeds[dowIdx % workSeeds.length];
      const learnTask = learnSeeds[dowIdx % learnSeeds.length];

      for (const seed of [actTask, workTask, learnTask]) {
        rows.push({
          userId,
          date: dateStr,
          title: seed.title,
          description: seed.description ?? null,
          priority: seed.priority,
          status: "todo",
          category: seed.category,
          order: order++,
          estimatedMinutes: seed.estimatedMinutes ?? null,
        });
      }
    }

    if (rows.length > 0) {
      await this.uow.plannerTasks.createMany(rows as any[]);
    }

    return { count: rows.length };
  }
}
