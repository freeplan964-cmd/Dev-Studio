import { eq, or } from "drizzle-orm";
import { DrizzleBaseRepository } from "./drizzle-base.repository.js";
import { IInterviewQuestionsRepository } from "../../domain/repositories/interview-questions.repository.interface.js";

export class DrizzleInterviewQuestionsRepository
  extends DrizzleBaseRepository<any, any, any>
  implements IInterviewQuestionsRepository
{
  async findGlobalAndUserQuestions(userId: string): Promise<any[]> {
    const whereClause = this.applySoftDelete(
      or(
        eq((this.table as any).isGlobal, true),
        eq((this.table as any).userId, userId),
      ),
    );
    return await this.dbClient
      .select()
      .from(this.table)
      .where(whereClause);
  }
}
