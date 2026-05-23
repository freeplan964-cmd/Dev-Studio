import { db, pool } from "./index.js";
import { interviewQuestions } from "../../domain/schema/learning.js";
import { prompts, agents, components, snippets, templates } from "../../domain/schema/core.js";
import { connectors, socialDrafts, mailTemplates } from "../../domain/schema/integrations.js";

import { seedInterviewQuestions } from "./seeds/interview-questions.js";
import { defaultQuestions, suggestedQuestions } from "./seeds/behavioral.js";
import { seedPrompts } from "./seeds/prompts.js";
import { seedAgents } from "./seeds/agents.js";
import { seedComponents } from "./seeds/components.js";
import { seedSnippets } from "./seeds/snippets.js";
import { seedTemplates } from "./seeds/templates.js";
import { seedConnectors } from "./seeds/connectors.js";
import { seedSocialDrafts } from "./seeds/social-drafts.js";
import { seedMailTemplates } from "./seeds/mail-templates.js";

async function seedGlobalInterviewQuestions() {
  const existing = await db
    .select({ id: interviewQuestions.id })
    .from(interviewQuestions)
    .limit(1);
  if (existing.length > 0) {
    console.log("Interview questions already seeded — skipping.");
    return;
  }

  const allTechQuestions = seedInterviewQuestions;
  const allBehavioralQuestions = [...defaultQuestions, ...suggestedQuestions];

  const rows = [
    ...allTechQuestions.map((q) => ({
      question: q.question,
      answer: q.answer,
      difficulty: q.difficulty ?? "mid",
      area: q.area === "testing" ? ("testing" as const) : (q.area as any),
      tags: q.tags ?? [],
      isGlobal: true,
      userId: null,
    })),
    ...allBehavioralQuestions.map((q) => ({
      question: q.question,
      answer: q.answer,
      difficulty: q.difficulty ?? "mid",
      area: "softskills" as const,
      tags: q.tags ?? [],
      isGlobal: true,
      userId: null,
    })),
  ];

  await db.insert(interviewQuestions).values(rows as any[]);
  console.log(`Seeded ${rows.length} global interview questions.`);
}

async function seedTableIfEmpty(table: any, data: any[], name: string) {
  const existing = await db
    .select({ id: table.id })
    .from(table)
    .limit(1);
  if (existing.length > 0) {
    console.log(`${name} already seeded — skipping.`);
    return;
  }

  const rows = data.map(({ id: _id, ...row }) => {
    const mapped: any = {
      ...row,
      userId: "local",
    };
    if (row.createdAt) mapped.createdAt = new Date(row.createdAt);
    if (row.updatedAt) mapped.updatedAt = new Date(row.updatedAt);
    return mapped;
  });

  await db.insert(table).values(rows);
  console.log(`Seeded ${rows.length} rows into ${name}.`);
}

export async function runSeeding() {
  // 1. Seed global interview questions
  await seedGlobalInterviewQuestions();

  // 2. Seed core assets
  await seedTableIfEmpty(prompts, seedPrompts, "prompts");
  await seedTableIfEmpty(agents, seedAgents, "agents");
  await seedTableIfEmpty(components, seedComponents, "components");
  await seedTableIfEmpty(snippets, seedSnippets, "snippets");
  await seedTableIfEmpty(templates, seedTemplates, "templates");

  // 3. Seed integration assets
  await seedTableIfEmpty(connectors, seedConnectors, "connectors");
  await seedTableIfEmpty(socialDrafts, seedSocialDrafts, "socialDrafts");
  await seedTableIfEmpty(mailTemplates, seedMailTemplates, "mailTemplates");
}

async function main() {
  try {
    await runSeeding();
    console.log("Database seeding completed successfully.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith("seed.ts") || 
  process.argv[1].endsWith("seed.js") || 
  process.argv[1].includes("/seed") || 
  process.argv[1].includes("\\seed")
);

if (isDirectRun) {
  main();
}
