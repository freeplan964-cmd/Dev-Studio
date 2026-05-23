import { createFileRoute, useSearch } from "@tanstack/react-router";
import { SoftSkillView } from "@/features/soft-skills/soft-skill-view";
import { SoftSkillTabs } from "@/features/soft-skills/soft-skill-tabs";
import { MockChatView } from "@/features/ai-mock/mock-chat-view";
import { Top10QuestionsView } from "@/features/soft-skills/top10-view";
import { PageHeader, PageContainer, PageSection } from "@/components/layout";
import { Heart } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  tab: z
    .enum(["top-10", "communication", "leadership", "problem-solving", "teamwork", "ai-mock"])
    .optional()
    .default("top-10"),
});

export const Route = createFileRoute("/soft-skills")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Soft Skills Hub — Dev Studio" },
      {
        name: "description",
        content: "Master communication, leadership, and human engineering with our unified hub.",
      },
    ],
  }),
  component: SoftSkillsPage,
});

function SoftSkillsPage() {
  const { tab } = useSearch({ from: "/soft-skills" });

  return (
    <PageContainer>
      <PageSection>
        <PageHeader icon={Heart} title="Communication & Soft Skills" className="mb-4" />
        <SoftSkillTabs />
      </PageSection>

      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "ai-mock" ? (
          <MockChatView context="soft" />
        ) : tab === "top-10" ? (
          <Top10QuestionsView />
        ) : (
          <SoftSkillView activeTab={tab} />
        )}
      </div>
    </PageContainer>
  );
}
