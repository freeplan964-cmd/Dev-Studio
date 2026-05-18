import type { Agent } from "../../types/tools";

const now = Date.now();
const id = (p: string, i: number) => `${p}_${i}`;

export const seedAgents: Agent[] = [
  {
    id: "a_1",
    name: "Code Auditor",
    role: "Reviews PRs for security, performance, and style violations.",
    systemPrompt:
      "You are a senior code reviewer. Be ruthless but constructive. Output: blockers, nits, suggestions.",
    tools: ["filesystem", "git", "lint"],
    model: "claude-3.5-sonnet",
    temperature: 0.2,
    status: "active",
    tags: ["review", "security"],
    createdAt: now - 86400000 * 30,
    updatedAt: now - 3600000 * 4,
  },
  {
    id: "a_2",
    name: "Schema Architect",
    role: "Designs database schemas from feature descriptions.",
    systemPrompt: "You design relational schemas. Always emit migration SQL + RLS.",
    tools: ["sql"],
    model: "gpt-5",
    temperature: 0.3,
    status: "active",
    tags: ["db", "design"],
    createdAt: now - 86400000 * 20,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "a_3",
    name: "Style Architect",
    role: "Generates Tailwind design systems from a brief.",
    systemPrompt: "You craft cohesive design tokens. Output CSS variables + sample components.",
    tools: ["tailwind"],
    model: "claude-3.5-sonnet",
    temperature: 0.6,
    status: "idle",
    tags: ["ui", "tokens"],
    createdAt: now - 86400000 * 10,
    updatedAt: now - 86400000 * 5,
  },
  {
    id: "a_4",
    name: "Job Forge Scout",
    role: "Scrapes & ranks job postings against a resume.",
    systemPrompt: "You score jobs vs candidate skills, return top matches.",
    tools: ["web", "scraper"],
    model: "gpt-5-mini",
    temperature: 0.4,
    status: "draft",
    tags: ["jobs", "ranking"],
    createdAt: now - 86400000 * 3,
    updatedAt: now - 86400000 * 1,
  },
];
