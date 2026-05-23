import { IRepository } from "./base.repository.js";
import { IPlannerTasksRepository } from "./planner-tasks.repository.interface.js";
import { IInterviewQuestionsRepository } from "./interview-questions.repository.interface.js";
import { IUserProgressRepository } from "./user-progress.repository.interface.js";

export interface IUnitOfWork {
  agents: IRepository<any, any>;
  components: IRepository<any, any>;
  connectors: IRepository<any, any>;
  prompts: IRepository<any, any>;
  templates: IRepository<any, any>;
  snippets: IRepository<any, any>;
  mailTemplates: IRepository<any, any>;
  socialDrafts: IRepository<any, any>;
  savedJobs: IRepository<any, any>;
  freelanceOffers: IRepository<any, any>;
  myServices: IRepository<any, any>;
  interviewQuestions: IInterviewQuestionsRepository<any, any>;
  cvProfiles: IRepository<any, any>;
  plannerTasks: IPlannerTasksRepository<any, any>;
  authUsers: IRepository<any, any>;
  userProfiles: IRepository<any, any>;
  userProgress: IUserProgressRepository<any, any>;
  skillTasks: IRepository<any, any>;
  skillProjects: IRepository<any, any>;

  transaction<T>(callback: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
}

