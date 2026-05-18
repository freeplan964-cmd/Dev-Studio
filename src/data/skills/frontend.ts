import type { SkillAreaData } from "../../types/skills";
import { Globe } from "lucide-react";

export const frontendArea: SkillAreaData = {
  id: "frontend",
  label: "Frontend",
  icon: Globe,
  description: "HTML, CSS, JavaScript and modern frameworks — choose a framework to dive deep.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "perf", label: "Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)" },
    { id: "a11y", label: "Semantic HTML & ARIA — screen reader accessible" },
    { id: "resp", label: "Responsive layout (mobile-first, fluid typography)" },
    { id: "seo", label: "Meta tags, OG, structured data (schema.org)" },
    { id: "bundle", label: "Bundle analysis — no unnecessary dependencies" },
    { id: "lazy", label: "Lazy load routes & heavy components" },
    { id: "error", label: "Error boundaries & graceful fallbacks" },
    { id: "csp", label: "Content Security Policy headers set" },
    { id: "fonts", label: "Font optimization (preload, font-display: swap)" },
    { id: "img", label: "Images: WebP/AVIF, srcset, lazy loading" },
  ],
  subAreas: [
    {
      id: "react",
      label: "React",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["react"],
      concepts: [
        {
          title: "Composition over Inheritance",
          body: "Build complex UIs by nesting specialized components. Use children prop for layouts.",
        },
        {
          title: "Immutability",
          body: "Never mutate state directly. Use setState/dispatch. Enables fast comparisons and time-travel debugging.",
        },
        {
          title: "Hooks Pattern",
          body: "Logic reuse without classes. Custom hooks for data fetching, auth, and complex state.",
        },
        {
          title: "Server Components",
          body: "Move logic to the server. Zero-bundle size for static parts. Direct DB access.",
        },
      ],
      resources: [
        {
          label: "React Docs",
          url: "https://react.dev",
          desc: "The new official React documentation.",
        },
        {
          label: "Beta Docs — Hooks",
          url: "https://react.dev/reference/react",
          desc: "Deep dive into React Hooks API.",
        },
      ],
    },
    {
      id: "angular",
      label: "Angular",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["angular"],
    },
    {
      id: "vue",
      label: "Vue.js",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["vue"],
    },
    {
      id: "svelte",
      label: "Svelte",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["svelte"],
    },
    {
      id: "nextjs",
      label: "Next.js",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["nextjs"],
    },
  ],
};
