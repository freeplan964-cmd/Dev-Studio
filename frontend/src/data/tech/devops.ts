import type { SkillAreaData } from "../../types/skills";
import { Container } from "lucide-react";

export const devopsArea: SkillAreaData = {
  id: "devops",
  label: "DevOps",
  icon: Container,
  description:
    "CI/CD, containers, cloud infrastructure, and observability — choose your toolchain to dive deep.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "pipeline", label: "Automated CI pipeline on every PR" },
    { id: "secrets", label: "Secrets managed in vault/env vars" },
    { id: "monitoring", label: "Real-time monitoring and alerting" },
    { id: "iac", label: "Infrastructure defined as code (not click-ops)" },
    { id: "rollback", label: "Deployments are reversible with a single command" },
    { id: "immutable", label: "Immutable artifacts (Docker images tagged by SHA)" },
    { id: "logs", label: "Centralized structured logging with correlation IDs" },
  ],
  subAreas: [
    {
      id: "docker",
      label: "Docker",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["docker", "containers", "devops"],
      concepts: [
        {
          title: "Images vs Containers",
          body: "An image is an immutable, layered read-only template built from a Dockerfile. A container is a running instance of an image — an isolated process with its own filesystem, network, and PID namespace. Multiple containers can run from the same image. Images are stored in registries (Docker Hub, ECR, GCR).",
        },
        {
          title: "Layer Caching & Ordering",
          body: "Each Dockerfile instruction creates a layer. Layers are cached — a layer rebuilds only if it or a preceding layer changes. Order matters: copy package.json first, run npm install, then copy source. This way, dependencies only reinstall when package.json changes, not on every code edit.",
        },
        {
          title: "Multi-Stage Builds",
          body: "Multi-stage builds produce minimal production images. Stage 1 (builder): full Node/Go/Rust image with build tools, compiles the app. Stage 2 (runner): minimal base image (alpine, distroless), copies only the compiled artifact. Result: production image is 5–20× smaller with no build tools or source code.",
        },
        {
          title: "Networking",
          body: "Bridge (default): containers on the same bridge network communicate by container name via Docker's internal DNS. Host: container shares the host's network stack (Linux only). None: isolated. Overlay: multi-host networking for Swarm/Kubernetes. Use user-defined bridge networks — not the default bridge — for DNS-based service discovery.",
        },
        {
          title: "Volumes & Data Persistence",
          body: "Containers are ephemeral — data written to the container filesystem is lost on restart. Named volumes (docker volume create) persist data managed by Docker. Bind mounts map a host directory into the container — useful for development hot-reload. tmpfs mounts store data in memory only.",
        },
        {
          title: "Docker Compose",
          body: "Compose defines multi-container applications in a YAML file. Services, networks, and volumes are declared declaratively. Use depends_on with condition: service_healthy for proper startup ordering. Override config with .env and multiple compose files (compose.yml + compose.override.yml).",
        },
      ],
      resources: [
        {
          label: "Docker Docs",
          url: "https://docs.docker.com",
          desc: "Official Docker documentation — Dockerfile reference, networking, volumes.",
        },
        {
          label: "Docker Compose Docs",
          url: "https://docs.docker.com/compose/",
          desc: "Full reference for Compose YAML spec and CLI commands.",
        },
        {
          label: "Dive",
          url: "https://github.com/wagoodman/dive",
          desc: "Explore image layers and identify wasted space in Docker images.",
        },
      ],
      checklist: [
        { id: "dk-multistage", label: "Multi-stage builds for production images" },
        { id: "dk-nonroot", label: "Container runs as non-root user (USER directive)" },
        { id: "dk-pin", label: "Base images pinned to a specific SHA or version tag" },
        { id: "dk-layer", label: "package.json copied before source for cache efficiency" },
        { id: "dk-ignore", label: ".dockerignore excludes node_modules, .git, .env" },
        { id: "dk-health", label: "HEALTHCHECK instruction defined in Dockerfile" },
        { id: "dk-scan", label: "Images scanned for CVEs (docker scout / Trivy)" },
        { id: "dk-size", label: "Production image < 200MB (alpine or distroless base)" },
      ],
    },
    {
      id: "kubernetes",
      label: "Kubernetes",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["kubernetes", "k8s", "containers", "devops"],
      concepts: [
        {
          title: "Core Objects",
          body: "Pod: smallest deployable unit — one or more containers sharing network and storage. Deployment: manages ReplicaSets, handles rolling updates and rollbacks. Service: stable network endpoint for a set of pods (ClusterIP, NodePort, LoadBalancer). ConfigMap/Secret: inject config and sensitive data without baking them into images.",
        },
        {
          title: "Deployments & Rolling Updates",
          body: "Deployments manage desired state. Rolling updates replace pods one-by-one — zero downtime by default. RollingUpdate strategy: maxUnavailable and maxSurge control rollout speed. kubectl rollout undo deployment/name reverts to previous ReplicaSet. readinessProbe gates traffic to new pods before old ones are removed.",
        },
        {
          title: "Services & Ingress",
          body: "Service types: ClusterIP (internal only), NodePort (exposes on every node), LoadBalancer (cloud LB). Ingress is an API object that manages external HTTP access — host/path routing, TLS termination. Ingress controllers (nginx, Traefik, AWS ALB) implement the Ingress spec in the cluster.",
        },
        {
          title: "Resource Requests & Limits",
          body: "Requests: guaranteed resources the scheduler uses for placement. Limits: maximum the container can use before being throttled (CPU) or OOM-killed (memory). Always set both. LimitRange sets defaults per namespace. ResourceQuota caps total usage per namespace. VPA automatically adjusts requests based on usage history.",
        },
        {
          title: "Health Probes",
          body: "livenessProbe: restart container if it fails (stuck process, deadlock). readinessProbe: remove pod from Service endpoints until it passes (startup delay, dependency check). startupProbe: gives slow-starting containers time before liveness kicks in. HTTP, TCP, and exec probe types. Failing liveness causes restarts — set thresholds carefully.",
        },
        {
          title: "ConfigMaps & Secrets",
          body: "ConfigMaps store non-sensitive config (env vars, config files). Secrets store sensitive data (base64-encoded, not encrypted by default — use Sealed Secrets or Vault for at-rest encryption). Mount as volume files or inject as env vars. Secrets mounted as volumes update automatically when the Secret changes.",
        },
      ],
      resources: [
        {
          label: "Kubernetes Docs",
          url: "https://kubernetes.io/docs/home/",
          desc: "Official Kubernetes documentation — concepts, tasks, API reference.",
        },
        {
          label: "k3s",
          url: "https://k3s.io",
          desc: "Lightweight Kubernetes — great for local dev and edge deployments.",
        },
        {
          label: "Kubernetes The Hard Way",
          url: "https://github.com/kelseyhightower/kubernetes-the-hard-way",
          desc: "Bootstrap Kubernetes from scratch to understand every component.",
        },
      ],
      checklist: [
        { id: "k8-requests", label: "CPU/memory requests and limits set on all containers" },
        { id: "k8-probes", label: "readinessProbe and livenessProbe defined" },
        { id: "k8-replicas", label: "Deployments run ≥ 2 replicas with PodDisruptionBudget" },
        { id: "k8-rbac", label: "RBAC roles follow least-privilege principle" },
        { id: "k8-secrets", label: "Secrets encrypted at rest (Sealed Secrets or Vault)" },
        { id: "k8-ns", label: "Workloads separated into namespaces (not all in default)" },
        { id: "k8-hpa", label: "HPA configured for services with variable load" },
        { id: "k8-images", label: "imagePullPolicy: Always for mutable tags (latest)" },
      ],
    },
    {
      id: "github-actions",
      label: "GitHub Actions",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["github-actions", "ci-cd", "devops"],
      concepts: [
        {
          title: "Workflow Anatomy",
          body: "Workflows are YAML files in .github/workflows/. Trigger on events: push, pull_request, schedule, workflow_dispatch. Each workflow has jobs. Jobs have steps. Steps run actions (uses: actions/checkout@v4) or shell commands (run: npm install). Jobs run in parallel by default; use needs: to serialize.",
        },
        {
          title: "Runners",
          body: "GitHub-hosted runners: ubuntu-latest, windows-latest, macos-latest — ephemeral VMs. Each job gets a fresh runner. Self-hosted runners: your own machines registered with GitHub — useful for private networks, GPU, or ARM builds. Reusable runners reduce cold-start time and cost at scale.",
        },
        {
          title: "Secrets & Environments",
          body: "Repository secrets: Settings > Secrets — injected as env vars, never logged. Organization secrets: shared across repos. Environment secrets: tied to a deployment environment (production) with required reviewers and wait timers before a job can access them. Use ${{ secrets.NAME }} in YAML.",
        },
        {
          title: "Caching Dependencies",
          body: "actions/cache stores and restores directories between runs keyed by a hash. Cache node_modules by hashing package-lock.json — only reinstalls when lockfile changes. GitHub-hosted runners restore cache on startup. Cache hit/miss is reported in logs. Stale caches auto-evict after 7 days of inactivity.",
        },
        {
          title: "Matrix Strategy",
          body: "Matrix builds run the same job across multiple parameter combinations: Node versions [18, 20, 22], OS [ubuntu, macos]. Jobs run in parallel — fail-fast: false continues other matrix entries if one fails. Exclude specific combos with exclude:. Reduce matrix in PRs, run full matrix only on main.",
        },
        {
          title: "Reusable Workflows & Composite Actions",
          body: "Reusable workflows (.github/workflows/deploy.yml called with workflow_call trigger) let you DRY up pipelines across repos. Composite actions (action.yml in a repo or directory) bundle multiple steps into one action reference. Use them to enforce standards across an engineering organization.",
        },
      ],
      resources: [
        {
          label: "GitHub Actions Docs",
          url: "https://docs.github.com/en/actions",
          desc: "Official GitHub Actions documentation with workflow syntax reference.",
        },
        {
          label: "actions/starter-workflows",
          url: "https://github.com/actions/starter-workflows",
          desc: "Official starter workflow templates for common languages and platforms.",
        },
        {
          label: "actionlint",
          url: "https://github.com/rhysd/actionlint",
          desc: "Static checker for GitHub Actions workflow files.",
        },
      ],
      checklist: [
        { id: "ga-pin", label: "Actions pinned to SHA (not a mutable tag like @main)" },
        { id: "ga-secrets", label: "All secrets use ${{ secrets.* }} — never hardcoded" },
        { id: "ga-cache", label: "Dependencies cached (actions/cache or setup-* built-in cache)" },
        { id: "ga-perm", label: "Minimal permissions: permissions: { contents: read } by default" },
        { id: "ga-env", label: "Deployment jobs use GitHub Environments with required reviewers" },
        { id: "ga-fail", label: "Workflows fail loudly — no silent continues on error" },
        { id: "ga-timeout", label: "timeout-minutes set to prevent runaway jobs" },
      ],
    },
    {
      id: "terraform",
      label: "Terraform / IaC",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["terraform", "iac", "infrastructure", "devops"],
      concepts: [
        {
          title: "Core Workflow",
          body: "terraform init: download providers and modules. terraform plan: show diff between current state and desired config (never applies). terraform apply: execute the plan. terraform destroy: tear down all managed resources. Always run plan before apply — review the diff carefully before confirming.",
        },
        {
          title: "State",
          body: "Terraform tracks the real-world state of infrastructure in a state file. Local state is fine for learning; remote state (S3 + DynamoDB lock, Terraform Cloud, GCS) is required for teams — enables collaboration and prevents concurrent modifications. Never commit state files — they contain secrets.",
        },
        {
          title: "Resources, Data Sources & Modules",
          body: "resource: creates/manages infrastructure. data: reads existing infrastructure not managed by Terraform (lookup AMI IDs, existing VPCs). module: a reusable package of resources with inputs (variables) and outputs. Use modules for shared patterns (VPC, EKS cluster, RDS). The Terraform Registry hosts community modules.",
        },
        {
          title: "Variables & Outputs",
          body: "variable blocks declare inputs — set via tfvars files, environment variables (TF_VAR_name), or CLI flags. output blocks expose values after apply (IP addresses, ARNs). sensitive = true masks output values in logs. Use locals for intermediate computed values — reduces repetition without exposing as outputs.",
        },
        {
          title: "Providers & Versioning",
          body: "Providers are plugins that interact with cloud APIs (hashicorp/aws, hashicorp/google). Pin provider versions in required_providers to prevent unexpected upgrades. terraform.lock.hcl records exact provider checksums — commit this file. Use ~> 5.0 to allow patch releases but not major version changes.",
        },
        {
          title: "Workspaces vs Directories",
          body: "Workspaces share code but separate state — useful for feature branch environments. Directory-based separation (environments/dev/, environments/prod/) is more explicit and safer for production isolation. Most teams prefer directories for prod/non-prod separation and workspaces for ephemeral environments.",
        },
      ],
      resources: [
        {
          label: "Terraform Docs",
          url: "https://developer.hashicorp.com/terraform/docs",
          desc: "Full Terraform language reference and CLI documentation.",
        },
        {
          label: "Terraform Registry",
          url: "https://registry.terraform.io",
          desc: "Community modules and provider documentation.",
        },
        {
          label: "tfsec",
          url: "https://github.com/aquasecurity/tfsec",
          desc: "Static analysis for Terraform — finds security misconfigurations.",
        },
      ],
      checklist: [
        { id: "tf-remote", label: "Remote state backend configured (S3/GCS + lock)" },
        { id: "tf-lock", label: "terraform.lock.hcl committed to version control" },
        { id: "tf-pin", label: "Provider versions pinned in required_providers" },
        { id: "tf-plan", label: "plan output reviewed and approved before apply in CI" },
        { id: "tf-nostate", label: "State files excluded from git (.gitignore)" },
        { id: "tf-modules", label: "Reusable patterns extracted into modules" },
        { id: "tf-scan", label: "tfsec or Checkov runs in CI to catch misconfigurations" },
      ],
    },
    {
      id: "cloud",
      label: "Cloud (AWS / GCP / Azure)",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["aws", "gcp", "azure", "cloud", "devops"],
      concepts: [
        {
          title: "Shared Responsibility Model",
          body: "Cloud providers secure the infrastructure (hardware, data centers, hypervisor). You secure everything on top: OS patches, network config, IAM policies, data encryption, application security. 'Secure by default' is a myth — misconfigured S3 buckets, overly-permissive IAM, and unencrypted databases are your responsibility.",
        },
        {
          title: "IAM: Least Privilege",
          body: "IAM (Identity and Access Management) controls who can do what. Attach policies to roles, not users. Grant only permissions required for the task. Use service accounts/roles for applications — never hardcode access keys. Audit permissions regularly with IAM Access Analyzer (AWS) or Policy Analyzer (GCP).",
        },
        {
          title: "Compute Options",
          body: "VMs (EC2, Compute Engine, VMs): full control, OS management overhead. Containers (ECS, Cloud Run, Container Apps): managed orchestration, scale to zero. Serverless functions (Lambda, Cloud Functions, Azure Functions): event-driven, pay-per-invocation, cold starts. Choose based on workload: persistent → VMs/containers, bursty → serverless.",
        },
        {
          title: "Networking: VPC & Subnets",
          body: "VPC (Virtual Private Cloud) is your isolated network. Public subnets have an internet gateway route — for load balancers. Private subnets have no direct internet access — for databases and app servers. NAT Gateway allows private resources to initiate outbound connections. Security Groups act as stateful firewalls on resources.",
        },
        {
          title: "Observability: Logs, Metrics, Traces",
          body: "Logs: CloudWatch Logs (AWS), Cloud Logging (GCP), Azure Monitor. Metrics: CloudWatch Metrics, Cloud Monitoring. Distributed tracing: AWS X-Ray, Cloud Trace, Azure Application Insights. The three pillars of observability. Use structured JSON logs. Set alarms on error rates and latency p99, not just averages.",
        },
        {
          title: "Cost Management",
          body: "Reserved/Committed Use Instances: 40–70% cheaper than on-demand for steady workloads. Spot/Preemptible: up to 90% cheaper but can be reclaimed — suitable for batch jobs, ML training. Right-sizing: use Cost Explorer or Recommender to identify over-provisioned resources. Tag all resources for cost allocation by team/project/env.",
        },
      ],
      resources: [
        {
          label: "AWS Well-Architected",
          url: "https://aws.amazon.com/architecture/well-architected/",
          desc: "AWS framework for building secure, efficient, reliable systems.",
        },
        {
          label: "Google Cloud Architecture Center",
          url: "https://cloud.google.com/architecture",
          desc: "Reference architectures, guides, and best practices for GCP.",
        },
        {
          label: "Azure Architecture Center",
          url: "https://learn.microsoft.com/en-us/azure/architecture/",
          desc: "Patterns, best practices, and reference architectures for Azure.",
        },
      ],
      checklist: [
        { id: "cl-iam", label: "IAM roles follow least-privilege; no wildcard * on prod resources" },
        { id: "cl-mfa", label: "MFA enforced on all human IAM users" },
        { id: "cl-vpc", label: "App servers and DBs in private subnets; only LB in public" },
        { id: "cl-encrypt", label: "Data encrypted at rest (EBS, S3 SSE) and in transit (TLS)" },
        { id: "cl-logs", label: "Centralized logging with retention policy and alerts" },
        { id: "cl-tags", label: "All resources tagged (env, team, project) for cost attribution" },
        { id: "cl-budget", label: "Budget alerts configured to catch unexpected cost spikes" },
      ],
    },
  ],
};
