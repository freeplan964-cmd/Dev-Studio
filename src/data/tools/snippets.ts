import type { Snippet } from "../../types/tools";

const now = Date.now();
const id = (p: string, i: number) => `${p}_${i}`;

export const seedSnippets: Snippet[] = [
  {
    id: "s_1",
    title: "Drizzle ORM Connection",
    language: "typescript",
    description: "Postgres database connection using Drizzle.",
    code: `import { drizzle } from 'drizzle-orm/node-postgres';\nimport { Pool } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n});\nexport const db = drizzle(pool);`,
    tags: ["postgres", "drizzle"],
    createdAt: now - 86400000 * 12,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "s_2",
    title: "Dockerfile — Next.js standalone",
    language: "dockerfile",
    description: "Slim multi-stage build for Next.js standalone output.",
    code: `FROM node:20-alpine AS base\nWORKDIR /app\nCOPY package.json bun.lock ./\nRUN npm i -g bun && bun install\nCOPY . .\nRUN bun run build\nCMD ["node", ".next/standalone/server.js"]`,
    tags: ["docker", "next"],
    createdAt: now - 86400000 * 30,
    updatedAt: now - 86400000 * 14,
  },
  {
    id: "s_3",
    title: "Drizzle Schema — Users Table",
    language: "typescript",
    description: "Common Drizzle table schema for users.",
    code: `import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';\n\nexport const users = pgTable('users', {\n  id: uuid('id').primaryKey().defaultRandom(),\n  email: text('email').notNull().unique(),\n  createdAt: timestamp('created_at').defaultNow().notNull(),\n});`,
    tags: ["typescript", "schema", "drizzle"],
    createdAt: now - 86400000 * 18,
    updatedAt: now - 86400000 * 6,
  },
];
