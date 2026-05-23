import {
  Swords,
  Wifi,
  Terminal,
  GitPullRequest,
  Clock,
  Sparkles,
  Brain,
  Repeat2,
} from "lucide-react";
import { SkillArea } from "@/features/tech-skills/skill-area";
import { SOFT_SKILLS_DATA } from "@/data/soft";

export const SOFT_SKILL_GROUPS: Record<string, { id: string; label: string; icon: any }[]> = {
  leadership: [
    { id: "time", label: "Time Management", icon: Clock },
    { id: "growth", label: "Growth Mindset", icon: Sparkles },
    { id: "mental-models", label: "Mental Models", icon: Brain },
  ],
  teamwork: [
    { id: "conflict", label: "Conflict Resolution", icon: Swords },
    { id: "remote", label: "Remote Collaboration", icon: Wifi },
    { id: "pairing", label: "Pair Programming", icon: Terminal },
    { id: "code-review", label: "Code Review Culture", icon: GitPullRequest },
    { id: "agile", label: "Agile / Scrum", icon: Repeat2 },
  ],
};

const SOFT_SKILLS_DATA_FILTERED = {
  ...SOFT_SKILLS_DATA,
  subAreas: SOFT_SKILLS_DATA.subAreas?.filter((sa) => sa.id !== "top-10"),
};

export function SoftSkillView({ activeTab }: { activeTab?: string }) {
  return (
    <SkillArea
      data={SOFT_SKILLS_DATA_FILTERED}
      activeSubArea={activeTab}
      subAreaGroups={SOFT_SKILL_GROUPS}
    />
  );
}
