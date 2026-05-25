import type { SkillAreaData } from "../../../types/skills";
import { Trophy } from "lucide-react";

type SubArea = NonNullable<SkillAreaData["subAreas"]>[number];

export const top10SubArea: SubArea = {
  id: "top-10",
  label: "Top 10 Questions",
  icon: Trophy,
  color: "border-primary/40 bg-primary/10 text-primary",
  accent: "border-primary/30",
  tags: ["interview", "hr", "behavioral", "career"],
  concepts: [],
};
