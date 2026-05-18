import type { ComponentAsset } from "../../types/tools";

const now = Date.now();
const id = (p: string, i: number) => `${p}_${i}`;

export const seedComponents: ComponentAsset[] = [
  {
    id: "c_1",
    name: "Glass Sidebar",
    description: "Blurred dark sidebar with collapsible groups.",
    category: "Navigation",
    tags: ["sidebar", "tailwind", "react"],
    code: `export function GlassSidebar() {\n  return (\n    <aside className="w-64 backdrop-blur-xl bg-white/5 border-r">\n      {/* nav items */}\n    </aside>\n  );\n}`,
    dependencies: ["react", "tailwindcss"],
    favorite: true,
    usageCount: 12,
    createdAt: now - 86400000 * 14,
    updatedAt: now - 3600000 * 6,
  },
  {
    id: "c_2",
    name: "Gradient Stat Card",
    description: "KPI card with sparkline and gradient border.",
    category: "Data Display",
    tags: ["card", "stats"],
    code: `export function StatCard({ label, value }: { label: string; value: string }) {\n  return (\n    <div className="rounded-xl border p-5 bg-card">\n      <p className="text-xs text-muted-foreground">{label}</p>\n      <p className="text-2xl font-semibold">{value}</p>\n    </div>\n  );\n}`,
    dependencies: ["react"],
    usageCount: 9,
    createdAt: now - 86400000 * 9,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: "c_3",
    name: "Command Palette",
    description: "Cmd+K palette with grouped results & keyboard nav.",
    category: "Overlays",
    tags: ["cmdk", "search"],
    code: `// cmdk-based palette — see CommandPalette in this app`,
    dependencies: ["cmdk", "react"],
    favorite: true,
    usageCount: 18,
    createdAt: now - 86400000 * 22,
    updatedAt: now - 86400000 * 4,
  },
  {
    id: "c_4",
    name: "Animated Tag Input",
    description: "Tag chips with animated add/remove.",
    category: "Forms",
    tags: ["input", "tags"],
    code: `// Input with chip rendering on Enter`,
    dependencies: ["react", "framer-motion"],
    usageCount: 4,
    createdAt: now - 86400000 * 5,
    updatedAt: now - 86400000 * 1,
  },
];
