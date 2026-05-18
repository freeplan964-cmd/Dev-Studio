import type { SkillAreaData } from "../../types/skills";
import { FlaskConical } from "lucide-react";

export const testingArea: SkillAreaData = {
  id: "testing",
  label: "Testing",
  icon: FlaskConical,
  description: "Frontend, Backend, and End-to-End testing strategies.",
  concepts: [
    {
      title: "Testing Pyramid",
      body: "Many unit tests, fewer integration tests, even fewer E2E tests.",
    },
    { title: "TDD", body: "Test-Driven Development: Red, Green, Refactor." },
  ],
  resources: [
    { label: "Vitest", url: "https://vitest.dev", desc: "Modern frontend testing." },
    { label: "Playwright", url: "https://playwright.dev", desc: "Reliable E2E testing." },
  ],
  checklist: [
    { id: "coverage", label: "Critical paths covered by unit tests" },
    { id: "e2e", label: "E2E smoke tests for main user flows" },
  ],
};
