const now = Date.now();
const id = (p: string, i: number) => `${p}_${i}`;

export interface PromptSeed {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  body: string;
  variables: string[];
  model?: string;
  favorite?: boolean;
  usageCount: number;
  versions: { id: string; createdAt: number; body: string; note?: string }[];
  createdAt: number;
  updatedAt: number;
}

export const seedPrompts: PromptSeed[] = [
  {
    id: id("p", 1),
    title: "Database Schema Architect",
    description:
      "Generates production-ready PostgreSQL schemas with RLS, relations, indexes, and audit columns.",
    category: "Backend",
    tags: ["postgres", "drizzle", "schema", "database"],
    body: `Act as a senior database architect. Design a production-ready PostgreSQL schema for {{project_name}} using {{tech_stack}}.

Requirements:
1. snake_case table names, UUID primary keys with defaultRandom()
2. created_at / updated_at timestamps with defaultNow()
3. Drizzle ORM definitions with full TypeScript types
4. Indexes on all foreign keys and high-cardinality query columns
5. Row-Level Security policies for user-scoped tables
6. Provide migration SQL and a brief ER diagram in text form

Domain context: {{domain_description}}`,
    variables: ["project_name", "tech_stack", "domain_description"],
    model: "claude-3.5-sonnet",
    favorite: true,
    usageCount: 27,
    versions: [
      {
        id: "v1",
        createdAt: now - 86400000 * 14,
        body: "Act as a database architect. Design a PostgreSQL schema for {{project_name}}.",
        note: "Initial version — no RLS",
      },
      {
        id: "v2",
        createdAt: now - 86400000 * 7,
        body: "Act as a senior database architect. Design a production-ready PostgreSQL schema for {{project_name}} using {{tech_stack}}.",
        note: "Added tech_stack variable and Drizzle requirement",
      },
    ],
    createdAt: now - 86400000 * 14,
    updatedAt: now - 3600000 * 2,
  },
  {
    id: id("p", 2),
    title: "Next.js Auth Wrapper",
    description:
      "Generates a complete NextAuth v5 setup with providers, middleware, session typing, and protected route helpers.",
    category: "System Prompts",
    tags: ["nextjs", "auth", "typescript", "middleware"],
    body: `You are an expert Next.js engineer. Generate a NextAuth v5 (Auth.js) setup for {{project_name}}.

Providers to configure: {{providers}}

Include:
- auth.ts config with all providers, callbacks, and session strategy
- Middleware for protecting routes matching {{protected_routes}}
- TypeScript module augmentation for session types
- useSession hook wrapper with loading/unauthenticated states
- A signIn/signOut UI component
- Environment variable documentation in .env.example format`,
    variables: ["project_name", "providers", "protected_routes"],
    model: "gpt-5",
    usageCount: 14,
    versions: [],
    createdAt: now - 86400000 * 21,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: id("p", 3),
    title: "Radix + Motion Component Generator",
    description: "Wraps Radix UI primitives with Framer Motion entrance and exit animations.",
    category: "UI/UX",
    tags: ["radix", "framer-motion", "react", "animation"],
    body: `Build a {{component_type}} using Radix UI + Framer Motion. Requirements:
- Tailwind CSS styling with dark mode support
- Framer Motion AnimatePresence for mount/unmount transitions
- Variants: {{variants}}
- Full keyboard accessibility (Radix handles this by default)
- TypeScript props interface with JSDoc comments
- CVA (class-variance-authority) for variant management
- Export both the component and its variant types`,
    variables: ["component_type", "variants"],
    model: "claude-3.5-sonnet",
    usageCount: 8,
    versions: [],
    createdAt: now - 86400000 * 30,
    updatedAt: now - 86400000 * 21,
  },
  {
    id: id("p", 4),
    title: "SaaS Full Launch Pack",
    description: "Scaffolds a complete SaaS including landing page, dashboard, auth, and billing stub.",
    category: "SaaS Prompts",
    tags: ["saas", "boilerplate", "landing", "dashboard"],
    body: `Build {{product_name}} — a SaaS for {{audience}}.

Pages to generate:
1. Landing page: hero, features grid, pricing table ({{pricing_tiers}} tiers), testimonials, FAQ, footer
2. Auth: sign up, sign in, forgot password, email verification
3. Dashboard: sidebar nav, overview with KPI cards, and a main data view
4. Settings: profile, notifications, billing (Stripe stub), danger zone

Design direction: {{design_style}}
Brand primary color: {{brand_color}}
Tech stack: Next.js App Router, Tailwind, shadcn/ui, Drizzle, NextAuth

Include a component file structure and routing plan before generating code.`,
    variables: ["product_name", "audience", "pricing_tiers", "design_style", "brand_color"],
    favorite: true,
    usageCount: 42,
    versions: [],
    createdAt: now - 86400000 * 5,
    updatedAt: now - 3600000 * 12,
  },
  {
    id: id("p", 5),
    title: "Bug Hunter — Stack Trace Forensics",
    description: "Analyzes a stack trace and code snippet, then proposes 3 ranked root-cause hypotheses.",
    category: "Debugging",
    tags: ["debug", "errors", "typescript", "analysis"],
    body: `You are a debugging expert. Analyze the following and identify the root cause.

Stack trace:
\`\`\`
{{stack_trace}}
\`\`\`

Relevant code:
\`\`\`{{language}}
{{code}}
\`\`\`

Environment: {{environment}}

Produce exactly 3 hypotheses, ranked by likelihood:
1. **Hypothesis** — one-sentence explanation
   - Evidence supporting this
   - How to verify: specific command or log to check
   - Fix if confirmed: code snippet or config change

End with a "Most likely" summary and the single first debugging step to take.`,
    variables: ["stack_trace", "language", "code", "environment"],
    usageCount: 19,
    versions: [],
    createdAt: now - 86400000 * 10,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: id("p", 6),
    title: "API Contract Designer",
    description: "Designs RESTful or tRPC API contracts with Zod schemas, error envelopes, and OpenAPI export.",
    category: "Architecture",
    tags: ["api", "zod", "openapi", "rest"],
    body: `Design a {{style}} API for the {{domain}} domain.

Resources to cover: {{resources}}

For each resource provide:
- Full CRUD endpoint list (method, path, description)
- Request body Zod schema
- Response envelope: \`{ data, meta?, error? }\`
- Error codes and their meanings
- Pagination strategy (cursor-based preferred)
- Idempotency key requirement (yes/no + rationale)

Output: (1) OpenAPI 3.1 YAML, (2) Zod schema file, (3) TypeScript client types.`,
    variables: ["style", "domain", "resources"],
    usageCount: 6,
    versions: [],
    createdAt: now - 86400000 * 40,
    updatedAt: now - 86400000 * 12,
  },
  {
    id: id("p", 7),
    title: "PR Description Generator",
    description: "Writes a structured, informative pull request description from a git diff and ticket context.",
    category: "Productivity",
    tags: ["git", "pr", "writing", "productivity"],
    body: `Write a clear pull request description for the following change.

Ticket: {{ticket_id}} — {{ticket_title}}
Type of change: {{change_type}}

Git diff summary:
{{diff_summary}}

Generate a PR description with these sections:
## What
One-paragraph plain-English summary of what changed and why.

## How
Bullet points of the key technical decisions made.

## Testing
How was this tested? Include commands to reproduce.

## Screenshots
[placeholder if UI changed]

## Checklist
- [ ] Tests added/updated
- [ ] Docs updated
- [ ] No breaking changes (or migration notes added)`,
    variables: ["ticket_id", "ticket_title", "change_type", "diff_summary"],
    usageCount: 31,
    versions: [],
    createdAt: now - 86400000 * 18,
    updatedAt: now - 86400000 * 4,
  },
  {
    id: id("p", 8),
    title: "Technical Interview Prep",
    description: "Generates a mock technical interview session with tailored questions, hints, and ideal answers.",
    category: "Career",
    tags: ["interview", "career", "practice", "preparation"],
    body: `Act as a senior {{role}} interviewer at a {{company_type}} company. Conduct a mock technical interview session for me.

My background: {{candidate_background}}
Target role level: {{level}}
Focus areas: {{focus_areas}}

Session format:
1. Start with one warm-up question to ease in
2. Ask 3–4 progressively harder technical questions in the focus areas
3. For each question: wait for my answer (I'll provide it), then give structured feedback: what was good, what was missing, the ideal answer, and a follow-up question if my answer was strong
4. End with one system design or architecture question appropriate for {{level}}
5. Close with 2 questions I should ask the interviewer

Begin the session now with the warm-up question.`,
    variables: ["role", "company_type", "candidate_background", "level", "focus_areas"],
    favorite: true,
    usageCount: 53,
    versions: [],
    createdAt: now - 86400000 * 8,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: id("p", 9),
    title: "Refactor to Clean Architecture",
    description: "Breaks a monolithic file into domain, application, and infrastructure layers.",
    category: "Refactoring",
    tags: ["refactoring", "clean-architecture", "typescript", "backend"],
    body: `Refactor the following {{language}} code into Clean Architecture layers.

Original code:
\`\`\`{{language}}
{{original_code}}
\`\`\`

Target structure:
- **Domain**: entities, value objects, repository interfaces (no framework dependencies)
- **Application**: use cases, DTOs, service interfaces
- **Infrastructure**: DB adapters, external API clients, concrete repository implementations
- **Presentation**: controllers/routes, input validation

Rules:
1. Domain must have zero external imports
2. Each use case is a single class with an \`execute()\` method
3. Use dependency injection — no singletons
4. Maintain identical external behavior
5. Add TypeScript interfaces for every dependency boundary

Output each file separately with its full path.`,
    variables: ["language", "original_code"],
    usageCount: 11,
    versions: [],
    createdAt: now - 86400000 * 25,
    updatedAt: now - 86400000 * 9,
  },
  {
    id: id("p", 10),
    title: "Landing Page Copy Writer",
    description: "Writes conversion-optimized landing page copy from a product brief.",
    category: "Marketing",
    tags: ["copy", "marketing", "saas", "landing-page"],
    body: `Write conversion-optimized landing page copy for {{product_name}}.

Product: {{product_description}}
Target audience: {{target_audience}}
Primary pain point solved: {{pain_point}}
Key differentiator vs competitors: {{differentiator}}
Tone: {{tone}}

Generate copy for:
1. **Hero**: H1 headline (max 8 words), sub-headline (max 20 words), CTA button text
2. **Social proof bar**: 3 company name placeholders + metric (e.g. "10k teams")
3. **Features section**: 3 features, each with icon suggestion, title, and 2-sentence description
4. **How it works**: 3 numbered steps
5. **Testimonials**: 2 realistic quotes with name/role/company
6. **Pricing section**: 3 tier names + 1-line description each
7. **Final CTA**: Headline + sub-copy + button

Apply copywriting principles: clarity over cleverness, benefits over features, specific over vague.`,
    variables: ["product_name", "product_description", "target_audience", "pain_point", "differentiator", "tone"],
    usageCount: 16,
    versions: [],
    createdAt: now - 86400000 * 12,
    updatedAt: now - 86400000 * 3,
  },
];
