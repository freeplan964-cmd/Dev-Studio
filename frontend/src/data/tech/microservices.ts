import type { SkillAreaData } from "../../types/skills";
import { Boxes, Scissors, Cable, ShieldCheck, DatabaseZap, MonitorDot } from "lucide-react";

export const microservicesArea: SkillAreaData = {
  id: "microservices",
  label: "Microservices",
  icon: Boxes,
  description:
    "Design, build, and operate distributed microservice architectures — decomposition, communication, resilience, data management, and observability.",
  subAreasLabel: "Topics",
  concepts: [
    {
      title: "Single Responsibility at Service Level",
      body: "Each service owns one business capability end-to-end. If two services always change together, they should be one service. If one service needs another's data for every request, reconsider the split.",
    },
    {
      title: "Decentralised Data Management",
      body: "Each service owns its own database. No shared databases between services — they create hidden coupling that defeats the purpose of microservices.",
    },
    {
      title: "Design for Failure",
      body: "Network calls fail. Services go down. Every inter-service call must have a timeout, retry policy, and a fallback. The system must degrade gracefully, not cascade.",
    },
    {
      title: "Operational Overhead",
      body: "Microservices add distributed systems complexity. You need service discovery, distributed tracing, contract testing, and deployment pipelines per service. Start with a modular monolith.",
    },
  ],
  resources: [
    {
      label: "Building Microservices",
      url: "https://samnewman.io/books/building_microservices_2nd_edition/",
      desc: "Sam Newman — the definitive guide to decomposition, communication, and deployment.",
    },
    {
      label: "Microservices Patterns",
      url: "https://microservices.io/book",
      desc: "Chris Richardson — Saga, CQRS, API Gateway, Service Mesh patterns with trade-off analysis.",
    },
    {
      label: "microservices.io",
      url: "https://microservices.io",
      desc: "The canonical pattern catalog for microservices.",
    },
    {
      label: "Monolith to Microservices",
      url: "https://samnewman.io/books/monolith-to-microservices/",
      desc: "Strangler fig, branch by abstraction, and parallel change strategies.",
    },
  ],
  checklist: [
    { id: "ms-bound", label: "Service boundaries aligned with business capabilities" },
    { id: "ms-db", label: "Each service has its own isolated database" },
    { id: "ms-timeout", label: "All inter-service calls have timeouts and retry policies" },
    { id: "ms-circuit", label: "Circuit breakers implemented for critical dependencies" },
    { id: "ms-trace", label: "Distributed tracing with correlation IDs across all services" },
    { id: "ms-contract", label: "Consumer-driven contract tests between services" },
    { id: "ms-health", label: "Health checks and readiness probes on every service" },
    { id: "ms-deploy", label: "Each service has an independent CI/CD pipeline" },
  ],
  subAreas: [
    {
      id: "decomposition",
      label: "Decomposition",
      icon: Scissors,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["decomposition", "bounded-context", "ddd"],
      concepts: [
        {
          title: "Decompose by Business Capability",
          body: "Identify the business capabilities your organisation performs. Each capability (Order Management, Payment, Notification) maps to a service. Aligns services with organisational structure.",
        },
        {
          title: "Decompose by Subdomain (DDD)",
          body: "Use Domain-Driven Design to identify core, supporting, and generic subdomains. Core subdomains get the most attention; generic ones use off-the-shelf solutions.",
        },
        {
          title: "Strangler Fig Pattern",
          body: "Gradually replace a monolith by routing specific requests to new microservices. The monolith shrinks over time. Never do a big-bang rewrite — it almost always fails.",
        },
        {
          title: "Avoiding Distributed Monolith",
          body: "Services that must all be deployed together or that synchronously call each other in a chain are a distributed monolith — the worst of both worlds. Design for independence.",
        },
      ],
      resources: [
        {
          label: "Monolith to Microservices — Sam Newman",
          url: "https://samnewman.io/books/monolith-to-microservices/",
          desc: "Step-by-step decomposition strategies with real patterns.",
        },
      ],
    },
    {
      id: "communication-ms",
      label: "Communication",
      icon: Cable,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["communication", "grpc", "rest", "async", "events"],
      concepts: [
        {
          title: "Synchronous vs Asynchronous",
          body: "Synchronous (HTTP, gRPC) is simpler but creates temporal coupling — if the downstream service is slow or down, the caller is too. Async (events, queues) decouples availability but adds complexity.",
        },
        {
          title: "gRPC for Internal Communication",
          body: "gRPC is binary, typed, and fast — ideal for high-throughput internal service calls. Auto-generates client SDKs from protobuf definitions. Built-in bidirectional streaming.",
        },
        {
          title: "Service Mesh",
          body: "Offload cross-cutting concerns (mTLS, retries, tracing, load balancing) to a sidecar proxy (Envoy/Istio). Services communicate as if on a reliable network — the mesh handles the rest.",
        },
        {
          title: "API Contracts",
          body: "Define strict API contracts using OpenAPI or protobuf. Use consumer-driven contract testing (Pact) to ensure providers never break their consumers unintentionally.",
        },
      ],
      resources: [
        {
          label: "gRPC Documentation",
          url: "https://grpc.io/docs/",
          desc: "High-performance RPC framework for inter-service communication.",
        },
        {
          label: "Istio Service Mesh Docs",
          url: "https://istio.io/latest/docs/",
          desc: "Traffic management, mTLS, observability for microservice fleets.",
        },
      ],
    },
    {
      id: "resilience",
      label: "Resilience Patterns",
      icon: ShieldCheck,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["resilience", "circuit-breaker", "retry", "bulkhead", "timeout"],
      concepts: [
        {
          title: "Circuit Breaker",
          body: "When failure rate exceeds a threshold, open the circuit — fail fast instead of waiting for timeouts. After a cooldown period, allow a test request through. Prevents cascading failures.",
        },
        {
          title: "Retry with Exponential Backoff",
          body: "Retry transient failures with increasing delay between attempts (1s, 2s, 4s, 8s) plus jitter. Without jitter, all retries hit the downstream service simultaneously — a thundering herd.",
        },
        {
          title: "Bulkhead",
          body: "Isolate resources (thread pools, connection pools) per downstream dependency. A slow database shouldn't exhaust all threads and starve other operations. Fail one compartment, not the ship.",
        },
        {
          title: "Graceful Degradation",
          body: "When a dependency fails, serve a reduced but functional experience. Return cached data, a default response, or a partial result — never a blank page or unhandled exception.",
        },
      ],
      resources: [
        {
          label: "Resilience4j Docs",
          url: "https://resilience4j.readme.io/docs",
          desc: "Lightweight fault tolerance library — circuit breaker, retry, bulkhead.",
        },
      ],
    },
    {
      id: "data-ms",
      label: "Data Management",
      icon: DatabaseZap,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["data", "saga", "cqrs", "eventual-consistency", "transactions"],
      concepts: [
        {
          title: "Saga Pattern",
          body: "Manage distributed transactions as a sequence of local transactions. Choreography: services react to events. Orchestration: a saga orchestrator tells services what to do and handles failures.",
        },
        {
          title: "Eventual Consistency",
          body: "Distributed systems cannot have strong consistency without sacrificing availability. Accept that replicas may diverge temporarily — design UX to handle stale reads gracefully.",
        },
        {
          title: "Database per Service",
          body: "Each service owns its schema and data. Other services query via API, never direct DB access. Enables independent schema evolution, different DB engines, and clear ownership.",
        },
        {
          title: "API Composition",
          body: "For queries that join data across services, have a dedicated aggregator service or gateway call each service and compose the result. Avoid cross-service joins at the database level.",
        },
      ],
      resources: [
        {
          label: "Microservices Patterns — Chris Richardson",
          url: "https://microservices.io/book",
          desc: "Saga, CQRS, and data management patterns with trade-off analysis.",
        },
      ],
    },
    {
      id: "observability-ms",
      label: "Observability",
      icon: MonitorDot,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["observability", "tracing", "metrics", "logging", "opentelemetry"],
      concepts: [
        {
          title: "Three Pillars",
          body: "Metrics (aggregated numbers — latency p99, error rate), Logs (timestamped events), Traces (request paths across services). You need all three — each answers different questions.",
        },
        {
          title: "Distributed Tracing",
          body: "Propagate a correlation ID through every service call. Visualise the full request path, identify latency contributors, and debug errors across service boundaries without grep.",
        },
        {
          title: "OpenTelemetry",
          body: "Vendor-neutral SDK for capturing traces, metrics, and logs. Instrument once, export to any backend (Jaeger, Grafana Tempo, Datadog). Becoming the industry standard.",
        },
        {
          title: "SLIs, SLOs, and SLAs",
          body: "SLI: a metric you measure (request success rate). SLO: your internal target (99.9% success). SLA: the contract with customers. Design monitoring around SLO burn rate, not raw thresholds.",
        },
      ],
      resources: [
        {
          label: "OpenTelemetry Documentation",
          url: "https://opentelemetry.io/docs/",
          desc: "Vendor-neutral observability framework for traces, metrics, and logs.",
        },
        {
          label: "Distributed Systems Observability",
          url: "https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/",
          desc: "Free O'Reilly book — metrics, logging, and tracing in distributed systems.",
        },
      ],
    },
  ],
};
