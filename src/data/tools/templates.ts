import type { Template } from "../../types/tools";

const now = Date.now();
const id = (p: string, i: number) => `${p}_${i}`;

export const seedTemplates: Template[] = [
  {
    id: "t_1",
    name: "SaaS Boilerplate (Next.js + Drizzle)",
    description: "Auth, billing stub, dashboard, marketing site.",
    stack: ["next.js", "drizzle", "postgres", "tailwind", "shadcn"],
    tags: ["saas", "boilerplate"],
    structure:
      "app/\n  (marketing)/\n    page.tsx\n  (app)/\n    dashboard/\n    settings/\n  api/\n    webhook/stripe/\nserver/\n  db/\n  auth/\nmiddleware.ts",
    notes: "Includes Drizzle migrations and a dark-first design system.",
    createdAt: now - 86400000 * 60,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "t_2",
    name: "AI App Starter",
    description: "Chat UI + streaming + tool calling + memory.",
    stack: ["next.js", "vercel-ai", "drizzle", "postgres"],
    tags: ["ai", "chat"],
    structure: "app/\n  chat/\n  api/chat/\nlib/\n  ai/\n  tools/",
    notes: "Edge runtime by default.",
    createdAt: now - 86400000 * 30,
    updatedAt: now - 86400000 * 7,
  },
  {
    id: "t_3",
    name: "Multi-tenant Dashboard",
    description: "Org switcher, RBAC, invites, audit log.",
    stack: ["next.js", "drizzle", "tailwind"],
    tags: ["dashboard", "multi-tenant"],
    structure: "app/\n  [org]/\n    dashboard/\n    members/\n    settings/",
    notes: "Uses generic authorization at the API level for tenant isolation.",
    createdAt: now - 86400000 * 45,
    updatedAt: now - 86400000 * 10,
  },
];
