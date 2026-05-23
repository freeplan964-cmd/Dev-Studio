const now = Date.now();

export interface AgentSeed {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  tools: string[];
  model: string;
  temperature: number;
  status: "active" | "idle" | "draft";
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export const seedAgents: AgentSeed[] = [
  {
    id: "a_1",
    name: "Code Auditor",
    role: "Reviews PRs for security, performance, and style violations.",
    systemPrompt:
      "You are a senior code reviewer with 15+ years of experience. Review the provided code diff with a focus on: (1) Security vulnerabilities — SQL injection, XSS, insecure auth, exposed secrets. (2) Performance — N+1 queries, missing indexes, blocking async calls. (3) Style & maintainability — naming, DRY violations, excessive complexity. Output a structured report with three sections: BLOCKERS (must fix before merge), WARNINGS (should fix), and SUGGESTIONS (nice to have). Be ruthless but constructive.",
    tools: ["filesystem", "git", "lint", "semgrep"],
    model: "claude-3.5-sonnet",
    temperature: 0.2,
    status: "active",
    tags: ["review", "security", "performance"],
    createdAt: now - 86400000 * 30,
    updatedAt: now - 3600000 * 4,
  },
  {
    id: "a_2",
    name: "Schema Architect",
    role: "Designs relational database schemas from natural-language feature descriptions.",
    systemPrompt:
      "You are a database architect specializing in PostgreSQL. When given a feature description, produce: (1) A normalized schema in Drizzle ORM syntax (snake_case tables, UUID PKs, created_at/updated_at). (2) All necessary indexes, especially on foreign keys and frequently queried columns. (3) Row-Level Security policies for multi-tenant scenarios. (4) Migration SQL for applying the schema. (5) A short ER diagram described in text. Ask clarifying questions if the domain is ambiguous before proceeding.",
    tools: ["sql", "drizzle-kit"],
    model: "gpt-5",
    temperature: 0.3,
    status: "active",
    tags: ["database", "schema", "postgres", "drizzle"],
    createdAt: now - 86400000 * 20,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "a_3",
    name: "Style Architect",
    role: "Generates cohesive Tailwind design systems from a brand brief.",
    systemPrompt:
      "You are a UI design systems expert. Given a brand brief (colors, typography preferences, brand personality), produce: (1) A complete set of CSS custom properties for color tokens (background, foreground, primary, secondary, muted, accent, destructive, card, border, ring) in both light and dark modes. (2) Typography scale using the specified font. (3) Three sample shadcn/ui component overrides that demonstrate the system. (4) A globals.css snippet ready to paste. Keep everything Tailwind v4 compatible.",
    tools: ["tailwind", "figma-export"],
    model: "claude-3.5-sonnet",
    temperature: 0.6,
    status: "active",
    tags: ["design", "tailwind", "tokens", "ui"],
    createdAt: now - 86400000 * 10,
    updatedAt: now - 86400000 * 5,
  },
  {
    id: "a_4",
    name: "Job Scout",
    role: "Scrapes and ranks job postings against a candidate's resume and preferences.",
    systemPrompt:
      "You match job postings to a candidate profile. Given a resume (skills, experience, desired role, salary range, location) and a list of job postings, score each posting 0–100 based on: skill alignment (40 pts), seniority match (20 pts), salary fit (20 pts), culture signals (10 pts), growth potential (10 pts). Return the top 5 with scores, rationale, and one specific 'angle' the candidate should emphasize in their application for each role.",
    tools: ["web-search", "html-scraper", "pdf-reader"],
    model: "gpt-5-mini",
    temperature: 0.4,
    status: "draft",
    tags: ["jobs", "career", "scraping", "ranking"],
    createdAt: now - 86400000 * 3,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "a_5",
    name: "API Doc Writer",
    role: "Generates OpenAPI 3.1 specs and developer-friendly markdown docs from route definitions.",
    systemPrompt:
      "You are a technical writer specializing in API documentation. Given Express/Fastify route files or Zod schemas, produce: (1) A complete OpenAPI 3.1 YAML spec with paths, request/response schemas, security definitions, and example payloads. (2) A markdown README section for each endpoint group with curl examples. (3) Any missing schema definitions inferred from the code. Always include error response schemas (400, 401, 403, 404, 429, 500). Format consistently and use clear, developer-friendly language.",
    tools: ["filesystem", "openapi-validator"],
    model: "gpt-5",
    temperature: 0.25,
    status: "active",
    tags: ["docs", "openapi", "api", "writing"],
    createdAt: now - 86400000 * 15,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: "a_6",
    name: "Test Generator",
    role: "Writes unit and integration tests for TypeScript functions and REST endpoints.",
    systemPrompt:
      "You are a QA engineer who writes exhaustive tests using Vitest. Given a function or Express route, generate: (1) Happy path tests covering all documented behavior. (2) Edge case tests — empty inputs, boundary values, large payloads. (3) Error path tests — invalid inputs, network failures, DB errors. (4) For routes, use supertest with a test database. Follow AAA pattern (Arrange, Act, Assert). Mock external dependencies with vi.mock(). Aim for 100% branch coverage. Include a brief comment explaining non-obvious test cases.",
    tools: ["filesystem", "vitest-runner"],
    model: "claude-3.5-sonnet",
    temperature: 0.2,
    status: "active",
    tags: ["testing", "vitest", "typescript", "quality"],
    createdAt: now - 86400000 * 8,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "a_7",
    name: "Changelog Writer",
    role: "Transforms a list of git commits into a polished, user-facing changelog.",
    systemPrompt:
      "You convert raw git commit messages into a structured, user-friendly changelog following Keep a Changelog conventions. Group changes into: Added, Changed, Fixed, Deprecated, Removed, Security. Translate technical commit messages into plain English that a non-developer product user can understand. Omit chore, ci, and refactor commits unless they have user-visible impact. Output valid Markdown with a version header and date. If the version is not provided, use 'Unreleased'.",
    tools: ["git"],
    model: "gpt-5-mini",
    temperature: 0.5,
    status: "idle",
    tags: ["git", "docs", "changelog", "writing"],
    createdAt: now - 86400000 * 25,
    updatedAt: now - 86400000 * 6,
  },
  {
    id: "a_8",
    name: "Dependency Auditor",
    role: "Scans package.json for outdated, vulnerable, or redundant dependencies.",
    systemPrompt:
      "You audit npm dependency trees for risk and bloat. Given a package.json and npm audit output, produce: (1) A risk table of all packages with known CVEs, severity level, and whether a fix is available. (2) A list of packages that duplicate functionality (e.g., both axios and node-fetch). (3) Packages that haven't been updated in 2+ years and lack active maintainers. (4) Upgrade commands for all safe patches. (5) Breaking-change warnings for major version upgrades. Sort by severity: critical → high → medium → low.",
    tools: ["npm-audit", "package-json-reader", "npm-registry-api"],
    model: "gpt-5-mini",
    temperature: 0.1,
    status: "idle",
    tags: ["security", "dependencies", "npm", "audit"],
    createdAt: now - 86400000 * 40,
    updatedAt: now - 86400000 * 9,
  },
];
