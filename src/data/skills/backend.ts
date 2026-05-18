import type { SkillAreaData } from "../../types/skills";
import { Server } from "lucide-react";

export const backendArea: SkillAreaData = {
  id: "backend",
  label: "Backend",
  icon: Server,
  description: "APIs, databases, authentication, and scalable architecture — choose your stack.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "auth", label: "Authentication & authorization (JWT/session, RBAC)" },
    { id: "valid", label: "Input validation & sanitization on every endpoint" },
    { id: "sql", label: "Parameterized queries — no string concatenation" },
    { id: "rate", label: "Rate limiting on auth and sensitive endpoints" },
    { id: "https", label: "HTTPS enforced; security headers set" },
    { id: "logs", label: "Structured logging with correlation IDs" },
    { id: "health", label: "Health check endpoint configured" },
    { id: "migrations", label: "DB migrations versioned and reversible" },
    { id: "secrets", label: "Secrets in env vars / vault — never hardcoded" },
    { id: "timeout", label: "Request timeouts & circuit breakers on external calls" },
  ],
  subAreas: [
    {
      id: "node",
      label: "Node.js",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["nodejs"],
    },
    {
      id: "aspnet",
      label: "ASP.NET Core",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["aspnet"],
    },
    {
      id: "python",
      label: "Python/FastAPI",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["python", "fastapi"],
    },
    {
      id: "go",
      label: "Go",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["go"],
    },
    {
      id: "supabase",
      label: "Supabase",
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
      accent: "border-emerald-500/30",
      tags: ["supabase", "postgres", "baas"],
      concepts: [
        {
          title: "PostgreSQL Under the Hood",
          body: "Supabase is not a black-box NoSQL DB; it's a full Postgres database. Use triggers, functions, and RLS directly.",
        },
        {
          title: "Row Level Security (RLS)",
          body: "Secure data at the database layer. Policies determine who can read/write rows based on their JWT auth context.",
        },
        {
          title: "Realtime",
          body: "Listen to Postgres changes via WebSockets. Requires enabling Realtime on specific tables and proper RLS.",
        },
      ],
      resources: [
        {
          label: "Supabase Docs",
          url: "https://supabase.com/docs",
          desc: "Official documentation and guides.",
        },
      ],
    },
  ],
};
