import { createFileRoute, useSearch } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { SkillTabs } from "@/features/tech-skills/skill-tabs";
import { SkillArea } from "@/features/tech-skills/skill-area";
import { MockChatView } from "@/features/ai-mock/mock-chat-view";
import { PageHeader, PageContainer, PageSection } from "@/components/layout";
import { TECH_AREAS } from "@/data/tech";
import type { TechAreaId } from "@/types/skills";
import { Code2 } from "lucide-react";
import { z } from "zod";

const MaterialsView = lazy(() =>
  import("@/features/tech-skills/materials-view").then((m) => ({ default: m.MaterialsView }))
);

const searchSchema = z.object({
  tab: z
    .enum(["frontend", "backend", "devops", "testing", "database", "materials", "ai-mock"])
    .optional()
    .default("frontend"),
});

export const Route = createFileRoute("/tech-skills")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Technical Skills Hub — Dev Studio" },
      {
        name: "description",
        content:
          "Master frontend, backend, devops, testing, databases, materials, and AI mock interviews.",
      },
    ],
  }),
  component: TechSkillsPage,
});

function TechSkillsPage() {
  const { tab } = useSearch({ from: "/tech-skills" });

  return (
    <PageContainer>
      <PageSection>
        <PageHeader icon={Code2} title="Technical Skills Hub" className="mb-4" />
        <SkillTabs />
      </PageSection>

      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "materials" ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Loading resources…
              </div>
            }
          >
            <MaterialsView />
          </Suspense>
        ) : tab === "ai-mock" ? (
          <MockChatView context="tech" />
        ) : (
          <SkillArea data={TECH_AREAS[tab as TechAreaId]} />
        )}
      </div>
    </PageContainer>
  );
}
