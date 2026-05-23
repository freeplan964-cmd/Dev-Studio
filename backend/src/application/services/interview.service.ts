import { stripDates, isUUID, generateSlug } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class InterviewService {
  constructor(private uow: IUnitOfWork) {}

  async getQuestions(userId: string) {
    return await this.uow.interviewQuestions.findGlobalAndUserQuestions(userId);
  }

  async createQuestion(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw) as Record<string, any>;

    // Auto-generate slug from question text if not provided
    if (!data.slug && data.question) {
      data.slug = generateSlug(String(data.question));
    }

    // Auto-set category from area if not provided
    if (!data.category && data.area) {
      data.category = String(data.area);
    }

    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? [await this.uow.interviewQuestions.findById(safeId)].filter(Boolean)
      : [];

    if (existing.length > 0 && existing[0].userId === userId) {
      const r = await this.uow.interviewQuestions.update(safeId!, data);
      return r;
    } else {
      const r = await this.uow.interviewQuestions.create({
        ...data,
        userId,
        ...(safeId ? { id: safeId } : {}),
      } as any);
      return r;
    }
  }

  async createQuestionsBulk(userId: string, items: any[]) {
    if (!items.length) {
      return [];
    }
    const values = items.map(({ id, ...raw }) => {
      const data = stripDates(raw) as Record<string, any>;
      const safeId = isUUID(id) ? id : undefined;
      // Auto-generate slug and category
      if (!data.slug && data.question) {
        data.slug = generateSlug(String(data.question));
      }
      if (!data.category && data.area) {
        data.category = String(data.area);
      }
      return { ...data, userId, ...(safeId ? { id: safeId } : {}) } as any;
    });

    return await this.uow.interviewQuestions.createMany(values);
  }

  async deleteQuestionById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const question = await this.uow.interviewQuestions.findById(id);
    if (question && question.userId === userId) {
      await this.uow.interviewQuestions.delete(id);
    }
    return true;
  }

  async getProgress(userId: string) {
    return await this.uow.userProgress.findByUserId(userId);
  }

  async toggleProgress(
    userId: string,
    itemId: string,
    areaId: string,
    completed: boolean,
  ) {
    const existing = await this.uow.userProgress.findByUserAndItem(userId, itemId);

    if (existing.length > 0) {
      const [r] = await this.uow.userProgress.updateCompletedByUserAndItem(
        userId,
        itemId,
        completed,
      );
      return r;
    } else {
      const r = await this.uow.userProgress.create({
        userId,
        itemId,
        areaId,
        completed,
      });
      return r;
    }
  }
}
