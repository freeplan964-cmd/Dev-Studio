import type { SkillAreaData } from "../../types/skills";
import { Cpu, Layers, Radio, Puzzle, Brain, CloudCog } from "lucide-react";

export const architectureArea: SkillAreaData = {
  id: "architecture",
  label: "Architecture",
  icon: Cpu,
  description:
    "Software architectural styles, structural patterns, and the principles that govern how systems are organized, evolved, and scaled.",
  subAreasLabel: "Styles",
  concepts: [
    {
      title: "Separation of Concerns",
      body: "Divide a system so each module addresses a distinct concern. Reduces coupling, improves testability, and makes changes local — the foundation of every architectural style.",
    },
    {
      title: "Dependency Rule",
      body: "Source code dependencies must point inward — toward higher-level policies, never toward lower-level details. Frameworks, databases, and UIs are details; business rules are the core.",
    },
    {
      title: "Architecture Characteristics",
      body: "Define what qualities the system must have — scalability, reliability, security, maintainability. These drive which architectural style to choose, not technology preference.",
    },
    {
      title: "Fitness Functions",
      body: "Automated checks that verify architectural characteristics over time. Like unit tests for your architecture — prevent drift and ensure the system evolves without losing its properties.",
    },
  ],
  resources: [
    {
      label: "Clean Architecture",
      url: "https://www.oreilly.com/library/view/clean-architecture/9780134494272/",
      desc: "Robert C. Martin — boundaries, use cases, and the dependency rule.",
    },
    {
      label: "Fundamentals of Software Architecture",
      url: "https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/",
      desc: "Architectural styles, characteristics, decisions, and fitness functions.",
    },
    {
      label: "Martin Fowler's bliki",
      url: "https://martinfowler.com",
      desc: "Authoritative articles on CQRS, event sourcing, strangler fig, and bounded context.",
    },
    {
      label: "Architecture of Open Source Applications",
      url: "https://aosabook.org",
      desc: "How real systems like NGINX, Git, and Eclipse are designed.",
    },
  ],
  checklist: [
    { id: "arch-dep", label: "Dependencies point inward — domain layer has no framework imports" },
    { id: "arch-bound", label: "Bounded contexts defined with clear interfaces between them" },
    { id: "arch-fitness", label: "Fitness functions in CI checking key architectural properties" },
    { id: "arch-adr", label: "Architecture Decision Records (ADRs) written for major choices" },
    {
      id: "arch-modular",
      label: "Modules/packages enforce their own boundaries (no spaghetti imports)",
    },
    {
      id: "arch-testable",
      label: "Core business logic testable without starting a server or database",
    },
    {
      id: "arch-evolvable",
      label: "Strangler fig or anti-corruption layer used when migrating legacy code",
    },
  ],
  subAreas: [
    {
      id: "clean-arch",
      label: "Clean Architecture",
      icon: Layers,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["clean-architecture", "solid", "use-cases"],
      concepts: [
        {
          title: "Concentric Layers",
          body: "Entities → Use Cases → Interface Adapters → Frameworks & Drivers. Each ring can only know about rings inside it — never outside. UI and databases are outermost, most replaceable.",
        },
        {
          title: "Entities",
          body: "Enterprise-wide business rules. Pure domain objects with no framework dependencies. These are the highest-level policies — they change least and mean the most.",
        },
        {
          title: "Use Cases",
          body: "Application-specific business rules. Orchestrate entity interactions to fulfill a user goal. They define what the system does, independent of how it is presented or stored.",
        },
        {
          title: "Interface Adapters",
          body: "Convert data between use case format and external formats (REST, GraphQL, database). Controllers, presenters, gateways, and repository implementations live here.",
        },
      ],
      resources: [
        {
          label: "Clean Architecture — Robert C. Martin",
          url: "https://www.oreilly.com/library/view/clean-architecture/9780134494272/",
          desc: "The book that defines the clean architecture model.",
        },
        {
          label: "Architecture Patterns with Python",
          url: "https://www.cosmicpython.com",
          desc: "TDD, DDD, and clean architecture with Python — freely available online.",
        },
      ],
    },
    {
      id: "event-driven-arch",
      label: "Event-Driven",
      icon: Radio,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["event-driven", "events", "pub-sub", "event-sourcing"],
      concepts: [
        {
          title: "Event Notification",
          body: "Services publish events when something happens; other services react. Decouples producers from consumers — the publisher doesn't know or care who is listening.",
        },
        {
          title: "Event-Carried State Transfer",
          body: "Events carry enough data that consumers don't need to call back to the source. Eliminates synchronous coupling and enables local state caching in consumers.",
        },
        {
          title: "Event Sourcing",
          body: "The system's state is derived by replaying an immutable log of events. Enables full audit trail, temporal queries, and projecting multiple read models from one event stream.",
        },
        {
          title: "CQRS with Events",
          body: "Write side processes commands and emits events. Read side builds query-optimised projections from those events. Each side scales and evolves independently.",
        },
      ],
      resources: [
        {
          label: "Event-Driven Architecture — Martin Fowler",
          url: "https://martinfowler.com/articles/201701-event-driven.html",
          desc: "Fowler's authoritative breakdown of event notification, sourcing, and CQRS.",
        },
        {
          label: "Kafka Documentation",
          url: "https://kafka.apache.org/documentation/",
          desc: "The de-facto standard for event streaming at scale.",
        },
      ],
    },
    {
      id: "hexagonal",
      label: "Hexagonal / Ports & Adapters",
      icon: Puzzle,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["hexagonal", "ports-and-adapters", "alistair-cockburn"],
      concepts: [
        {
          title: "Ports",
          body: "Technology-agnostic interfaces (APIs) that the application exposes or uses. Primary ports are driven by actors (e.g. REST controller). Secondary ports drive external systems (e.g. database).",
        },
        {
          title: "Adapters",
          body: "Concrete implementations that connect ports to the outside world. An HTTP adapter connects a REST call to a primary port. A Postgres adapter implements a secondary port.",
        },
        {
          title: "The Application at the Centre",
          body: "The application core contains business logic only. It has no knowledge of REST, databases, or message brokers. It can be tested in total isolation from infrastructure.",
        },
        {
          title: "Inside-Out Development",
          body: "Build and test the application core first. Add adapters later. This lets you prove business rules work before committing to any specific framework or database.",
        },
      ],
      resources: [
        {
          label: "Hexagonal Architecture — Alistair Cockburn",
          url: "https://alistair.cockburn.us/hexagonal-architecture/",
          desc: "The original article that defined ports and adapters.",
        },
      ],
    },
    {
      id: "ddd",
      label: "Domain-Driven Design",
      icon: Brain,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["ddd", "domain", "bounded-context", "aggregate"],
      concepts: [
        {
          title: "Ubiquitous Language",
          body: "Use the same language in code, conversations, and documentation as domain experts. When the code reflects the business vocabulary, misunderstandings surface immediately.",
        },
        {
          title: "Bounded Context",
          body: "A clear boundary within which a particular domain model applies. 'Order' means different things in Shipping vs Billing — bound each meaning to its own context.",
        },
        {
          title: "Aggregates",
          body: "A cluster of domain objects treated as a single unit. The aggregate root enforces invariants. Transactions should not cross aggregate boundaries.",
        },
        {
          title: "Domain Events",
          body: "Capture something that happened in the domain — OrderPlaced, PaymentReceived. Events are first-class citizens used to integrate bounded contexts.",
        },
      ],
      resources: [
        {
          label: "Domain-Driven Design — Eric Evans",
          url: "https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/",
          desc: "The original DDD blue book — bounded contexts, aggregates, repositories.",
        },
        {
          label: "DDD Quickly (free PDF)",
          url: "https://www.infoq.com/minibooks/domain-driven-design-quickly/",
          desc: "A free condensed summary of the core DDD concepts.",
        },
      ],
    },
    {
      id: "serverless-arch",
      label: "Serverless",
      icon: CloudCog,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["serverless", "functions", "faas", "lambda"],
      concepts: [
        {
          title: "Function as a Service (FaaS)",
          body: "Deploy individual functions that are invoked on demand. No server management, auto-scaling to zero — you pay per invocation, not per hour.",
        },
        {
          title: "Cold Starts",
          body: "Functions must be initialised before the first request. Keep packages small, use provisioned concurrency for latency-sensitive paths, and warm critical functions on a schedule.",
        },
        {
          title: "Event-Driven Composition",
          body: "Serverless functions are ideal when triggered by events — S3 uploads, queue messages, HTTP requests. Compose workflows using event bridges and orchestration services.",
        },
        {
          title: "Stateless by Default",
          body: "Functions must not rely on local state between invocations. Store state in external systems (S3, DynamoDB, Redis). This is what enables the auto-scaling model.",
        },
      ],
      resources: [
        {
          label: "AWS Lambda Docs",
          url: "https://docs.aws.amazon.com/lambda/",
          desc: "Official Lambda documentation — functions, layers, triggers.",
        },
        {
          label: "Serverless Framework",
          url: "https://www.serverless.com/framework/docs",
          desc: "Deploy serverless apps to any cloud with a single config.",
        },
      ],
    },
  ],
};
