import { DrizzleUnitOfWork } from "../repositories/drizzle-unit-of-work.js";
import { OpenAILLMService } from "../services/openai-llm.service.js";
import { JobScraperService } from "../services/job-scraper.service.js";
import { ChatService } from "../../application/services/chat.service.js";
import { AuthService } from "../../application/services/auth.service.js";
import { AgentsService } from "../../application/services/agents.service.js";
import { ComponentsService } from "../../application/services/components.service.js";
import { ConnectorsService } from "../../application/services/connectors.service.js";
import { CVService } from "../../application/services/cv.service.js";
import { InterviewService } from "../../application/services/interview.service.js";
import { JobsService } from "../../application/services/jobs.service.js";
import { MailService } from "../../application/services/mail.service.js";
import { OffersService } from "../../application/services/offers.service.js";
import { PlannerService } from "../../application/services/planner.service.js";
import { ProfileService } from "../../application/services/profile.service.js";
import { PromptsService } from "../../application/services/prompts.service.js";
import { MyServicesService } from "../../application/services/services.service.js";
import { SkillsService } from "../../application/services/skills.service.js";
import { SnippetsService } from "../../application/services/snippets.service.js";
import { SocialService } from "../../application/services/social.service.js";
import { TemplatesService } from "../../application/services/templates.service.js";
import * as plannerSeeds from "../database/seeds/planner.js";


// Instantiated Infrastructure dependencies
export const uow = new DrizzleUnitOfWork();
export const llmService = new OpenAILLMService();
export const scraperService = new JobScraperService();

// Instantiated Application services
export const chatService = new ChatService(llmService);
export const authService = new AuthService(uow);
export const agentsService = new AgentsService(uow);
export const componentsService = new ComponentsService(uow);
export const connectorsService = new ConnectorsService(uow);
export const cvService = new CVService(uow, llmService);
export const interviewService = new InterviewService(uow);
export const jobsService = new JobsService(uow, scraperService);
export const mailService = new MailService(uow);
export const offersService = new OffersService(uow);
export const plannerService = new PlannerService(uow, llmService, plannerSeeds);
export const profileService = new ProfileService(uow);
export const promptsService = new PromptsService(uow);
export const myServicesService = new MyServicesService(uow);
export const skillsService = new SkillsService(uow);
export const snippetsService = new SnippetsService(uow);
export const socialService = new SocialService(uow);
export const templatesService = new TemplatesService(uow);
