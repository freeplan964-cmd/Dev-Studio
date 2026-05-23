import { ArrowUpRight } from "lucide-react";
import type { SkillAreaData } from "@/types/skills";

interface Props {
  data: SkillAreaData;
  subArea: string;
}

export function ResourcesSection({ data, subArea }: Props) {
  const saData = data.subAreas?.find((sa) => sa.id === subArea);
  const resources = saData?.resources || data.resources;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Essential Resources</h2>
        <p className="text-muted-foreground text-sm">Curated documentation and deep-dive guides.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {resources.map((r) => (
          <a
            key={r.label}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group relative overflow-hidden shadow-sm"
          >
            <div className="relative z-10">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {r.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
            </div>
            <ArrowUpRight className="size-4 absolute top-4 right-4 text-muted-foreground group-hover:text-primary transition-all" />
          </a>
        ))}

        {resources.length === 0 && (
          <div className="col-span-2 text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              Select a topic from the sidebar to view resources.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
