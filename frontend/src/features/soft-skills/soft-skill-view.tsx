import { useQuery } from "@tanstack/react-query";
import { SkillArea } from "@/features/tech-skills/skill-area";
import { getSoftSkillArea } from "@/lib/api/skills";
import { SOFT_SKILL_GROUPS } from "@/data/skills";

export function SoftSkillView({ activeTab }: { activeTab?: string }) {
  const { data: softArea, isLoading } = useQuery({
    queryKey: ["skill-areas", "soft"],
    queryFn: getSoftSkillArea,
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!softArea) return null;

  const softAreaFiltered = {
    ...softArea,
    subAreas: softArea.subAreas?.filter((sa) => sa.id !== "top-10"),
  };

  return (
    <SkillArea
      data={softAreaFiltered}
      activeSubArea={activeTab}
      subAreaGroups={SOFT_SKILL_GROUPS as any}
    />
  );
}
