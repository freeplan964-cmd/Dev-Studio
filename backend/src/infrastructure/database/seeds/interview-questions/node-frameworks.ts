import type { InterviewQuestionSeed } from "./types.js";

const now = Date.now();

export const nodeFrameworksQuestions: InterviewQuestionSeed[] = [
  {
    id: "iq_fwb_1",
    area: "backend",
    difficulty: "junior",
    category: "Node.js Frameworks",
    question: "What is Express.js middleware and how does the request-response cycle work?",
    answer: "Express.js middleware are functions with access to the request (`req`), response (`res`), and the next middleware (`next`) in the application cycle. They execute code, modify `req`/`res`, and end the cycle or pass control using `next()`. If a middleware doesn't call `next()` or send a response, the request hangs.",
    tags: ["node", "express", "middleware"],
    createdAt: now,
  },
  {
    id: "iq_fwb_2",
    area: "backend",
    difficulty: "mid",
    category: "Node.js Frameworks",
    question: "What is the difference between NestJS and Express.js?",
    answer: "Express: unopinionated, minimal web framework for Node.js. Flexible but lacks built-in architecture guidelines. NestJS: opinionated, TypeScript-first framework built on top of Express (or Fastify) enforcing Angular-like architecture (modules, controllers, services). Built-in Dependency Injection, decorators, and module organization.",
    tags: ["node", "nestjs", "express", "architecture"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_fwb_3",
    area: "backend",
    difficulty: "mid",
    category: "Django",
    question: "Explain Django's MTV architecture vs traditional MVC.",
    answer: "Django uses MTV: Model (data structure/DB definition), Template (HTML layout/presentation layer), View (controllers logic handling requests and returning responses). Traditional MVC maps to MTV: Model = Model, View = Template, Controller = View. The framework itself acts as the controller dispatching requests.",
    tags: ["python", "django", "architecture"],
    createdAt: now,
  },
  {
    id: "iq_fwb_4",
    area: "backend",
    difficulty: "mid",
    category: "Django",
    question: "What is Django's ORM and what is N+1 query problem?",
    answer: "Django ORM maps DB rows to Python objects. N+1 problem: querying a list of N objects and fetching a foreign key relationship per item, resulting in N+1 database queries. Solution: use `select_related()` (SQL JOIN for single relationships) or `prefetch_related()` (separate lookup query for multi-value relations).",
    tags: ["python", "django", "databases", "performance"],
    createdAt: now,
  },
  {
    id: "iq_fwb_5",
    area: "backend",
    difficulty: "mid",
    category: "FastAPI",
    question: "Why is FastAPI preferred for modern Python web APIs?",
    answer: "FastAPI: high performance (built on Starlette/Uvicorn), automatic interactive swagger docs (OpenAPI/Redoc), strict validation and serialization using Pydantic, native `async`/`await` support, clean dependency injection. Standardizes type-hinting which speeds up development.",
    tags: ["python", "fastapi", "performance"],
    createdAt: now,
  },
];
