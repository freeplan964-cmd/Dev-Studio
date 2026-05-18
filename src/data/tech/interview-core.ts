import type { InterviewQuestion } from "../../types/skills";

const now = Date.now();
const q = (i: number) => `iq_${i}`;

export const seedInterviewQuestions: InterviewQuestion[] = [
  // ─── FRONTEND ────────────────────────────────────────────────────────────
  {
    id: q(1),
    area: "frontend",
    difficulty: "junior",
    question: "What is the difference between `==` and `===` in JavaScript?",
    answer:
      "`==` performs type coercion before comparing, so `'5' == 5` is `true`. `===` (strict equality) compares both value AND type without coercion, so `'5' === 5` is `false`. Always prefer `===` to avoid subtle bugs.",
    tags: ["javascript", "basics"],
    createdAt: now,
  },
  {
    id: q(2),
    area: "frontend",
    difficulty: "junior",
    question: "What is the CSS box model?",
    answer:
      "Every element is a rectangular box composed of: Content → Padding → Border → Margin. `box-sizing: border-box` makes width/height include padding and border, which is usually what you want. Default `content-box` excludes them.",
    tags: ["css", "layout"],
    createdAt: now,
  },
  {
    id: q(3),
    area: "frontend",
    difficulty: "mid",
    question: "Explain React's reconciliation algorithm (Virtual DOM diffing).",
    answer:
      "React maintains a virtual DOM tree. On state/prop change it creates a new vDOM and diffs it against the previous one (O(n) heuristic). It assumes elements of different types produce different trees; uses `key` to identify list items across renders. Minimal patches are applied to the real DOM.",
    tags: ["react", "performance"],
    createdAt: now,
  },
  {
    id: q(4),
    area: "frontend",
    difficulty: "mid",
    question: "What are React hooks rules and why do they exist?",
    answer:
      "1. Only call hooks at the top level — not inside loops, conditions, or nested functions. 2. Only call hooks from React function components or custom hooks. These rules exist because React relies on call order to associate hook state with a component instance across renders.",
    tags: ["react", "hooks"],
    createdAt: now,
  },
  {
    id: q(5),
    area: "frontend",
    difficulty: "mid",
    question: "What is event delegation in JavaScript?",
    answer:
      "Instead of attaching a listener to every child element, attach one listener to a parent and use `event.target` to identify which child triggered it. Leverages bubbling. More memory-efficient for large lists (e.g., click handler on `<ul>` instead of every `<li>`).",
    tags: ["javascript", "events", "performance"],
    createdAt: now,
  },
  {
    id: q(6),
    area: "frontend",
    difficulty: "mid",
    question: "What is the difference between `useMemo` and `useCallback`?",
    answer:
      "`useMemo` memoizes the *result* of a function call. `useCallback` memoizes the *function reference itself*. Use `useCallback` when passing a stable callback to a memoized child component; use `useMemo` for expensive computed values. Both take a dependency array.",
    tags: ["react", "performance", "hooks"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(7),
    area: "frontend",
    difficulty: "senior",
    question: "How do you optimize a React app with thousands of list items?",
    answer:
      "1. Windowing/virtualization (react-window, TanStack Virtual) — only render visible rows. 2. Memoize list items with `React.memo`. 3. Stable keys. 4. Avoid anonymous functions in JSX that create new references. 5. Move state as low as possible to limit re-render scope. 6. Use transitions (`startTransition`) for non-urgent updates.",
    tags: ["react", "performance", "virtualization"],
    createdAt: now,
  },
  {
    id: q(8),
    area: "frontend",
    difficulty: "senior",
    question: "Explain the Critical Rendering Path and how to optimize it.",
    answer:
      "Browser: HTML → DOM, CSS → CSSOM → Render Tree → Layout → Paint → Composite. Optimizations: defer non-critical JS, inline critical CSS, use `preload` for fonts/key assets, reduce render-blocking resources, minimize layout thrashing (batch DOM reads/writes), use `will-change` or `transform` for composited animations.",
    tags: ["performance", "browser", "css"],
    createdAt: now,
  },
  {
    id: q(9),
    area: "frontend",
    difficulty: "senior",
    question: "What is hydration in SSR/SSG frameworks and what are hydration mismatches?",
    answer:
      "Hydration is the process of attaching React's event listeners and state to server-rendered HTML. A mismatch occurs when the client-rendered output differs from the server HTML (e.g., using `Date.now()` or `window` on server). Mismatches cause React to re-render the entire tree client-side, defeating SSR performance benefits. Solutions: `suppressHydrationWarning`, dynamic imports, or deferring browser-only code to `useEffect`.",
    tags: ["ssr", "react", "next.js"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(10),
    area: "frontend",
    difficulty: "mid",
    question: "What is CSS specificity and how is it calculated?",
    answer:
      "Specificity determines which CSS rule wins conflicts. Calculated as (a, b, c): a = inline styles (1,0,0), b = IDs (0,1,0), c = classes/pseudo-classes/attributes (0,0,1), elements/pseudo-elements (0,0,1 too). Higher specificity wins; same specificity → last in source wins. `!important` overrides all (avoid it).",
    tags: ["css"],
    createdAt: now,
  },

  // ─── BACKEND ─────────────────────────────────────────────────────────────
  {
    id: q(11),
    area: "backend",
    difficulty: "junior",
    question: "What is the difference between REST and GraphQL?",
    answer:
      "REST: multiple fixed endpoints, over/under-fetching is common, versioning needed. GraphQL: single endpoint, client specifies exact data shape, solves over/under-fetching, built-in introspection. REST is simpler for simple APIs; GraphQL shines when many clients need different data shapes.",
    tags: ["api", "rest", "graphql"],
    createdAt: now,
  },
  {
    id: q(12),
    area: "backend",
    difficulty: "junior",
    question: "What is the difference between SQL and NoSQL databases?",
    answer:
      "SQL: relational, structured schema, ACID transactions, joins (Postgres, MySQL). NoSQL: flexible schema, horizontal scaling, eventual consistency (MongoDB document, Redis key-value, Cassandra wide-column, Neo4j graph). Choose SQL for complex relations/transactions; NoSQL for high write throughput, flexible schemas, or specific access patterns.",
    tags: ["database", "sql", "nosql"],
    createdAt: now,
  },
  {
    id: q(13),
    area: "backend",
    difficulty: "mid",
    question: "Explain database indexing. When should you NOT add an index?",
    answer:
      "An index is a data structure (usually B-tree) that speeds up reads by avoiding full table scans. Don't add indexes on: columns with very low cardinality (boolean), tables with heavy write ratios (indexes slow INSERT/UPDATE/DELETE), rarely queried columns. Each index costs storage and write overhead.",
    tags: ["database", "performance", "sql"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(14),
    area: "backend",
    difficulty: "mid",
    question: "What is the N+1 query problem and how do you fix it?",
    answer:
      "N+1 occurs when fetching a list of N records and then issuing 1 extra query per record (e.g., loop fetching user's posts). Fix: eager loading / JOIN queries, DataLoader (batching in GraphQL), or ORM `include`/`preload`. Use query logging to detect it.",
    tags: ["database", "performance", "orm"],
    createdAt: now,
  },
  {
    id: q(15),
    area: "backend",
    difficulty: "mid",
    question: "What are ACID properties in databases?",
    answer:
      "Atomicity: transaction is all-or-nothing. Consistency: DB moves from one valid state to another. Isolation: concurrent transactions don't interfere. Durability: committed data survives crashes. Postgres is fully ACID; some NoSQL databases trade isolation/consistency for availability/performance.",
    tags: ["database", "transactions"],
    createdAt: now,
  },
  {
    id: q(16),
    area: "backend",
    difficulty: "mid",
    question: "How does JWT authentication work?",
    answer:
      "1. User logs in → server creates a signed JWT (header.payload.signature) with claims. 2. Client stores it (localStorage or httpOnly cookie). 3. Each request includes the JWT. 4. Server verifies signature using secret/public key — no DB lookup needed. Downside: can't revoke until expiry unless using a token blacklist or short expiry + refresh tokens.",
    tags: ["auth", "jwt", "security"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(17),
    area: "backend",
    difficulty: "senior",
    question: "What is database connection pooling and why does it matter?",
    answer:
      "Opening a DB connection is expensive (TCP handshake, auth, memory). A pool pre-creates N connections and reuses them. Without pooling, every request opens/closes a connection — at scale this exhausts DB connection limits and adds latency. Tools: PgBouncer for Postgres, built-in pool in most ORMs. Configure pool size based on CPU cores × 2 as a starting point.",
    tags: ["database", "performance", "postgres"],
    createdAt: now,
  },
  {
    id: q(18),
    area: "backend",
    difficulty: "senior",
    question: "Explain CAP theorem and its practical implications.",
    answer:
      "In a distributed system you can only guarantee 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (system works despite network splits). Networks always partition → real choice is CP (Postgres, HBase) vs AP (Cassandra, DynamoDB eventual). Most systems allow tunable consistency.",
    tags: ["distributed-systems", "database"],
    createdAt: now,
  },
  {
    id: q(19),
    area: "backend",
    difficulty: "senior",
    question: "How do you design an API rate limiter?",
    answer:
      "Common algorithms: Token Bucket (smooth bursts), Fixed Window Counter (simple, boundary spikes), Sliding Window Log (accurate, memory heavy), Sliding Window Counter (good tradeoff). Implementation: Redis INCR + EXPIRE for distributed state. Track by IP or user ID. Return `429 Too Many Requests` with `Retry-After` header. Consider separate limits per endpoint/tier.",
    tags: ["api", "rate-limiting", "redis"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(20),
    area: "backend",
    difficulty: "mid",
    question: "What is the difference between optimistic and pessimistic locking?",
    answer:
      "Pessimistic: lock the row on read (`SELECT FOR UPDATE`), preventing others from modifying until commit. High contention overhead. Optimistic: no lock on read; on write, check a version/timestamp column — if changed, abort and retry. Best when conflicts are rare. Optimistic is used by most ORMs by default.",
    tags: ["database", "concurrency"],
    createdAt: now,
  },

  // ─── DEVOPS ──────────────────────────────────────────────────────────────
  {
    id: q(21),
    area: "devops",
    difficulty: "junior",
    question: "What is the difference between a Docker image and a container?",
    answer:
      "An image is a read-only blueprint (layers of filesystem changes + metadata). A container is a running instance of an image with its own writable layer, network, and process space. Multiple containers can run from the same image simultaneously.",
    tags: ["docker", "containers"],
    createdAt: now,
  },
  {
    id: q(22),
    area: "devops",
    difficulty: "junior",
    question: "What is CI/CD and why is it important?",
    answer:
      "CI (Continuous Integration): automatically build and test code on every push, catching bugs early. CD (Continuous Delivery/Deployment): automatically deploy validated code to staging or production. Together they reduce release risk, shorten feedback loops, and enable frequent reliable releases.",
    tags: ["ci-cd", "automation"],
    createdAt: now,
  },
  {
    id: q(23),
    area: "devops",
    difficulty: "mid",
    question: "Explain the difference between horizontal and vertical scaling.",
    answer:
      "Vertical (scale up): add more CPU/RAM to existing server. Simple but has limits and single point of failure. Horizontal (scale out): add more servers behind a load balancer. Requires stateless services (session in DB/Redis) but provides near-unlimited scale and redundancy. Cloud-native apps favor horizontal.",
    tags: ["scalability", "architecture"],
    createdAt: now,
  },
  {
    id: q(24),
    area: "devops",
    difficulty: "mid",
    question: "What is Kubernetes and what problems does it solve?",
    answer:
      "Kubernetes (K8s) is a container orchestration platform. It solves: scheduling containers across nodes, auto-scaling (HPA), self-healing (restarts failed pods), rolling updates with zero downtime, service discovery, secret/config management, and storage orchestration. Overkill for small teams; powerful for microservices at scale.",
    tags: ["kubernetes", "containers", "orchestration"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(25),
    area: "devops",
    difficulty: "mid",
    question: "What is Infrastructure as Code (IaC) and name some tools?",
    answer:
      "IaC means defining and provisioning infrastructure through code files (version-controlled, reviewable, repeatable) instead of manual UI clicks. Tools: Terraform (multi-cloud, declarative), Pulumi (code in TS/Python), AWS CDK, Ansible (configuration management), Helm (K8s package manager). Benefits: reproducibility, drift detection, disaster recovery.",
    tags: ["iac", "terraform", "devops"],
    createdAt: now,
  },
  {
    id: q(26),
    area: "devops",
    difficulty: "mid",
    question: "What is a blue-green deployment?",
    answer:
      "Two identical production environments (blue = current, green = new). Deploy new version to green, run smoke tests, then switch traffic (load balancer or DNS) from blue to green. Instant rollback: just switch back. Cost: double infrastructure during transition. Variant: canary deployment gradually shifts % of traffic.",
    tags: ["deployment", "zero-downtime"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(27),
    area: "devops",
    difficulty: "senior",
    question: "How do you handle secrets in a CI/CD pipeline securely?",
    answer:
      "Never store secrets in code or plain env files. Use: CI secrets store (GitHub Actions secrets, GitLab CI variables), cloud vaults (AWS Secrets Manager, HashiCorp Vault), K8s Secrets (encrypted at rest). Rotate secrets regularly. Audit secret access logs. Use short-lived credentials (IAM roles, OIDC) over long-lived keys. Mask secrets in logs.",
    tags: ["security", "secrets", "ci-cd"],
    createdAt: now,
  },
  {
    id: q(28),
    area: "devops",
    difficulty: "senior",
    question: "Explain the concept of observability and its three pillars.",
    answer:
      "Observability is the ability to understand internal system state from external outputs. Three pillars: 1) Logs — structured event records (use JSON, add correlation IDs). 2) Metrics — numeric measurements over time (latency p95/p99, error rate, throughput — USE method). 3) Traces — request flow across distributed services. Tools: OpenTelemetry, Datadog, Grafana/Prometheus, Jaeger.",
    tags: ["observability", "monitoring", "sre"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(29),
    area: "devops",
    difficulty: "senior",
    question: "What is a multi-stage Docker build and why use it?",
    answer:
      "Multi-stage builds use multiple `FROM` statements in one Dockerfile. Build dependencies (compiler, test tools) are in early stages; only artifacts are copied to the final minimal image. Result: production image has no build tools, drastically smaller (e.g., 1GB Node build → 100MB Alpine runtime). Improves security and pull times.",
    tags: ["docker", "optimization", "security"],
    createdAt: now,
  },
  {
    id: q(30),
    area: "devops",
    difficulty: "mid",
    question: "What is the difference between a load balancer and an API gateway?",
    answer:
      "Load balancer: distributes traffic across server instances (L4 TCP or L7 HTTP), health checks, sticky sessions. API Gateway: higher-level — handles auth, rate limiting, request transformation, routing to multiple backend services, SSL termination, caching. Often used together: gateway in front, LB behind each service.",
    tags: ["networking", "architecture"],
    createdAt: now,
  },

  // ─── TESTING ─────────────────────────────────────────────────────────────
  {
    id: q(31),
    area: "testing",
    difficulty: "junior",
    question: "What is the difference between unit, integration, and E2E tests?",
    answer:
      "Unit: test a single function/class in isolation (mock dependencies). Fast, cheap. Integration: test multiple units working together (DB, external services). Slower, catches interface bugs. E2E: test the full system as a user would (browser, real server). Slow, expensive, most confidence. Follow the Testing Pyramid: many unit, some integration, few E2E.",
    tags: ["testing", "strategy"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(32),
    area: "testing",
    difficulty: "junior",
    question: "What is a test double (mock, stub, spy, fake)?",
    answer:
      "Test doubles replace real dependencies in tests. Stub: returns hardcoded data. Mock: stub + verifies it was called correctly. Spy: wraps real implementation + records calls. Fake: working lightweight implementation (in-memory DB). Use the least powerful double that makes the test meaningful.",
    tags: ["testing", "mocking"],
    createdAt: now,
  },
  {
    id: q(33),
    area: "testing",
    difficulty: "mid",
    question: "What is Test-Driven Development (TDD) and what are its benefits?",
    answer:
      "TDD: Red → Green → Refactor. Write a failing test first, make it pass minimally, then refactor. Benefits: forces design thinking, creates living documentation, prevents over-engineering (YAGNI), catches regressions immediately. Criticism: slow for exploratory work, can lead to over-testing implementation details.",
    tags: ["tdd", "methodology"],
    createdAt: now,
  },
  {
    id: q(34),
    area: "testing",
    difficulty: "mid",
    question: "What is code coverage and what are its limitations?",
    answer:
      "Coverage measures % of code lines/branches executed during tests. 100% coverage does NOT mean bug-free — tests may pass without meaningful assertions. It misses: wrong business logic, concurrency bugs, integration failures. Use coverage as a minimum bar (e.g., 80%) to find untested areas, not as a quality metric.",
    tags: ["testing", "coverage", "metrics"],
    createdAt: now,
  },
  {
    id: q(35),
    area: "testing",
    difficulty: "mid",
    question: "How do you test asynchronous code in JavaScript?",
    answer:
      "1. Return a Promise from the test. 2. Use `async/await`. 3. Use `done` callback (older Jest). 4. Use `vi.useFakeTimers()` / `jest.useFakeTimers()` to control time-based async. 5. For HTTP: use `msw` (Mock Service Worker) to intercept network requests. Always handle rejections — unhandled rejections can silently pass tests.",
    tags: ["javascript", "async", "testing"],
    createdAt: now,
  },
  {
    id: q(36),
    area: "testing",
    difficulty: "mid",
    question: "What is the difference between Vitest and Jest?",
    answer:
      "Both are JavaScript test runners with similar APIs. Vitest: Vite-native, uses Vite's transform pipeline (fast, ESM-first, no config for modern stacks), watch mode is instant. Jest: mature, wider ecosystem, transpiles via Babel/tsc. For Vite/React projects Vitest is preferred; Jest for legacy CRA/Node projects.",
    tags: ["vitest", "jest", "tooling"],
    createdAt: now,
  },
  {
    id: q(37),
    area: "testing",
    difficulty: "senior",
    question: "How do you approach testing a React component that fetches data?",
    answer:
      "1. Use `@testing-library/react` (query by accessible role, not implementation). 2. Mock network with `msw` (Mock Service Worker) — intercepts at the network layer, not the fetch function. 3. Use `screen.findBy*` (async) to wait for data to render. 4. Test loading state, success state, and error state. Avoid testing internal state; test what the user sees.",
    tags: ["react", "testing-library", "msw"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(38),
    area: "testing",
    difficulty: "senior",
    question: "What is snapshot testing and when should you use or avoid it?",
    answer:
      "Snapshot tests serialize component output and compare against a stored file. Good for: detecting unintended UI changes in stable components, serializing complex data structures. Avoid when: snapshots are large/unreadable, updated blindly with `--updateSnapshot`, testing implementation details. Prefer explicit assertions for meaningful logic.",
    tags: ["testing", "snapshots", "react"],
    createdAt: now,
  },
  {
    id: q(39),
    area: "testing",
    difficulty: "senior",
    question: "How do you write good E2E tests with Playwright/Cypress?",
    answer:
      "1. Use `data-testid` or ARIA roles — not CSS selectors. 2. Test critical user journeys, not every edge case. 3. Use fixtures/factories for test data; clean up after each test. 4. Run against a staging env with seeded data. 5. Parallelize across shards. 6. Retry flaky selectors with auto-wait (Playwright does this). 7. Screenshot on failure for debugging.",
    tags: ["e2e", "playwright", "cypress"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(40),
    area: "testing",
    difficulty: "mid",
    question: "What is property-based testing?",
    answer:
      "Instead of example-based tests (specific inputs/outputs), you define properties that should hold for all inputs, and the framework generates hundreds of random inputs to find counterexamples. Tools: fast-check (JS), Hypothesis (Python), QuickCheck (Haskell). Great for: parsers, serializers, algorithms where invariants can be expressed. Hard to write for UIs.",
    tags: ["testing", "property-based"],
    createdAt: now,
  },

  // ─── GENERAL ─────────────────────────────────────────────────────────────
  {
    id: q(41),
    area: "general",
    difficulty: "mid",
    question: "What is the SOLID principles? Give a brief description of each.",
    answer:
      "S: Single Responsibility — one class, one reason to change. O: Open/Closed — open for extension, closed for modification. L: Liskov Substitution — subclasses must be substitutable for base classes. I: Interface Segregation — many specific interfaces > one general. D: Dependency Inversion — depend on abstractions, not concretions.",
    tags: ["architecture", "design-patterns"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(42),
    area: "general",
    difficulty: "mid",
    question: "What is the difference between concurrency and parallelism?",
    answer:
      "Concurrency: dealing with multiple things at once (structure) — e.g., Node.js event loop handles many requests on one thread by interleaving. Parallelism: doing multiple things simultaneously (execution) — requires multiple CPU cores. You can have concurrency without parallelism (single core multitasking).",
    tags: ["concurrency", "systems"],
    createdAt: now,
  },
  {
    id: q(43),
    area: "general",
    difficulty: "senior",
    question: "How do you approach a system design interview?",
    answer:
      "1. Clarify requirements (functional + non-functional: QPS, latency, scale). 2. Estimate scale (DAU, storage, bandwidth). 3. High-level design (API, data model, main components). 4. Deep dive on bottlenecks (DB choice, caching, sharding, CDN). 5. Discuss tradeoffs explicitly — no perfect answer. 6. Address reliability (replication, retries, circuit breakers).",
    tags: ["system-design", "interview"],
    favorite: true,
    createdAt: now,
  },
  {
    id: q(44),
    area: "general",
    difficulty: "mid",
    question: "What is the difference between a monolith, microservices, and modular monolith?",
    answer:
      "Monolith: single deployable unit, simple to develop initially, hard to scale selectively. Microservices: independently deployable services, each owns its data; network overhead, distributed complexity. Modular monolith: clear internal module boundaries, single deployment — best of both worlds for most teams. Start modular monolith, extract services only when you have clear scaling needs.",
    tags: ["architecture", "microservices"],
    createdAt: now,
  },
  {
    id: q(45),
    area: "general",
    difficulty: "junior",
    question: "What is Git rebasing vs merging?",
    answer:
      "Merge: creates a merge commit preserving full branch history. Rebase: replays commits on top of target branch, creating a linear history. Rebase rewrites SHA hashes — never rebase shared/public branches. Use merge for feature → main; rebase for keeping feature branch up-to-date with main locally.",
    tags: ["git", "version-control"],
    createdAt: now,
  },
];
