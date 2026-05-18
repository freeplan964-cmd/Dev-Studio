import type { SkillAreaData } from "../../types/skills";
import { Container } from "lucide-react";

export const devopsArea: SkillAreaData = {
  id: "devops",
  label: "DevOps",
  icon: Container,
  description: "CI/CD, containers, infrastructure as code, and observability.",
  concepts: [
    {
      title: "Infrastructure as Code",
      body: "Define resources in code (Terraform, CloudFormation). Versioned and reproducible.",
    },
    {
      title: "CI/CD Pipelines",
      body: "Automated build, test, and deploy. Use Github Actions or GitLab CI.",
    },
  ],
  resources: [
    { label: "Docker Docs", url: "https://docs.docker.com", desc: "Containerization reference." },
    {
      label: "Terraform Registry",
      url: "https://registry.terraform.io",
      desc: "Infrastructure modules.",
    },
  ],
  checklist: [
    { id: "pipeline", label: "Automated CI pipeline on every PR" },
    { id: "secrets", label: "Secrets managed in vault/env vars" },
    { id: "monitoring", label: "Real-time monitoring and alerting" },
  ],
};
