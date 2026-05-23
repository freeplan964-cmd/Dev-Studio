export type { InterviewQuestionSeed } from "./types.js";

import { angularQuestions } from "./angular.js";
import { reactQuestions } from "./react.js";
import { nextjsQuestions } from "./nextjs.js";
import { vueSvelteQuestions } from "./vue-svelte.js";
import { backendGeneralQuestions } from "./backend-general.js";
import { nodeFrameworksQuestions } from "./node-frameworks.js";
import { aspnetQuestions } from "./aspnet.js";
import { phpQuestions } from "./php.js";
import { devopsQuestions } from "./devops.js";
import { frontendCoreQuestions } from "./frontend-core.js";
import { testingQuestions } from "./testing.js";
import { generalQuestions } from "./general.js";
import { databaseQuestions } from "./database.js";
import { sqlServerQuestions } from "./sqlserver.js";
import { elasticsearchQuestions } from "./elasticsearch.js";

export const seedInterviewQuestions = [
  ...angularQuestions,
  ...reactQuestions,
  ...nextjsQuestions,
  ...vueSvelteQuestions,
  ...frontendCoreQuestions,
  ...backendGeneralQuestions,
  ...nodeFrameworksQuestions,
  ...aspnetQuestions,
  ...phpQuestions,
  ...devopsQuestions,
  ...testingQuestions,
  ...generalQuestions,
  ...databaseQuestions,
  ...sqlServerQuestions,
  ...elasticsearchQuestions,
];
