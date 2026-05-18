import type { SkillAreaData } from "../../types/skills";
import { Network, BarChart2, Gauge, Radio, HardDrive, Cable } from "lucide-react";

export const systemDesignArea: SkillAreaData = {
  id: "system-design",
  label: "System Design",
  icon: Network,
  description:
    "Design large-scale distributed systems — scalability, reliability, consistency, and the trade-offs that define modern infrastructure.",
  subAreasLabel: "Topics",
  concepts: [
    {
      title: "CAP Theorem",
      body: "A distributed system can only guarantee two of three: Consistency, Availability, Partition Tolerance. Most systems choose AP (eventually consistent) or CP (consistent but may be unavailable).",
    },
    {
      title: "Horizontal vs Vertical Scaling",
      body: "Vertical: bigger machine. Horizontal: more machines. Horizontal is preferred for availability and cost at scale — but requires stateless services and distributed data.",
    },
    {
      title: "Latency vs Throughput",
      body: "Latency is time for one request. Throughput is requests per second. Optimising one often harms the other — batch processing improves throughput but increases individual latency.",
    },
    {
      title: "Back-of-Envelope Estimation",
      body: "Estimate QPS, storage, bandwidth before designing. 1M DAU × 10 req/day ÷ 86400 ≈ 115 QPS. Numbers ground decisions about caching, sharding, and server count.",
    },
  ],
  resources: [
    {
      label: "System Design Primer",
      url: "https://github.com/donnemartin/system-design-primer",
      desc: "The most-starred system design resource on GitHub — scalability, caching, and more.",
    },
    {
      label: "Designing Data-Intensive Applications",
      url: "https://dataintensive.net",
      desc: "The bible of distributed systems — replication, sharding, consistency, consensus.",
    },
    {
      label: "ByteByteGo",
      url: "https://bytebytego.com",
      desc: "Visual system design explanations loved by engineers worldwide.",
    },
    {
      label: "High Scalability Blog",
      url: "http://highscalability.com",
      desc: "Real-world architecture teardowns of Twitter, YouTube, Amazon, and more.",
    },
    {
      label: "AWS Architecture Center",
      url: "https://aws.amazon.com/architecture/",
      desc: "Reference architectures and best practices for scalable cloud systems.",
    },
  ],
  checklist: [
    { id: "sd-reqs", label: "Functional and non-functional requirements clarified before designing" },
    { id: "sd-est", label: "Back-of-envelope estimates done (QPS, storage, bandwidth)" },
    { id: "sd-sing", label: "Single points of failure identified and eliminated" },
    { id: "sd-cache", label: "Caching strategy defined (what to cache, TTL, invalidation)" },
    { id: "sd-db", label: "Database choice justified — SQL vs NoSQL vs hybrid" },
    { id: "sd-async", label: "Async processing used for long-running tasks (queues, workers)" },
    { id: "sd-monitor", label: "Monitoring, alerting, and runbooks defined" },
    { id: "sd-failover", label: "Failover and disaster recovery strategy documented" },
  ],
  subAreas: [
    {
      id: "scalability",
      label: "Scalability & Load Balancing",
      icon: BarChart2,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["scalability", "load-balancing", "horizontal-scaling"],
      concepts: [
        {
          title: "Load Balancers",
          body: "Distribute traffic across multiple servers. Layer 4 (TCP) for raw throughput; Layer 7 (HTTP) for content-aware routing. Use health checks to remove unhealthy instances automatically.",
        },
        {
          title: "Stateless Services",
          body: "Services that store no session data locally can be scaled horizontally with zero configuration. Move all session state to Redis or a database — any instance can then handle any request.",
        },
        {
          title: "Auto-Scaling",
          body: "Automatically add or remove instances based on load. Use CPU, memory, or custom metrics (queue depth, request latency) as triggers. Design for both scale-out and scale-in.",
        },
        {
          title: "CDN",
          body: "Serve static assets and cached responses from edge nodes close to users. Offloads origin servers dramatically. Cache-Control headers determine what CDNs store and for how long.",
        },
      ],
      resources: [
        { label: "The System Design Primer — Scalability", url: "https://github.com/donnemartin/system-design-primer#scalability", desc: "Scalability chapter from the most-starred system design repo." },
      ],
    },
    {
      id: "caching-sd",
      label: "Caching Strategies",
      icon: Gauge,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["caching", "redis", "memcached", "cache-invalidation"],
      concepts: [
        {
          title: "Cache-Aside (Lazy Loading)",
          body: "Application checks cache first. On miss, reads from DB and populates cache. Simple and resilient to cache failures. Risk: cache misses on new data cause DB spikes.",
        },
        {
          title: "Write-Through",
          body: "Write to cache and DB simultaneously on every update. Data is always fresh, but adds write latency. Good for read-heavy workloads with low write volume.",
        },
        {
          title: "Cache Eviction Policies",
          body: "LRU (Least Recently Used) is the default. LFU (Least Frequently Used) better for skewed access patterns. TTL-based expiry is mandatory to prevent stale data accumulation.",
        },
        {
          title: "Cache Stampede",
          body: "Many requests hit the DB simultaneously on cache expiry. Mitigate with mutex locks, staggered TTLs, or probabilistic early expiration (re-compute before TTL expires).",
        },
      ],
      resources: [
        { label: "Redis Documentation", url: "https://redis.io/documentation", desc: "Full Redis reference — data types, persistence, clustering, pub/sub." },
      ],
    },
    {
      id: "messaging",
      label: "Messaging & Queues",
      icon: Radio,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["messaging", "kafka", "rabbitmq", "queues", "pub-sub"],
      concepts: [
        {
          title: "Message Queues",
          body: "Decouple producers from consumers. Producers write to the queue; consumers process at their own pace. Buffers load spikes and allows independent scaling of each side.",
        },
        {
          title: "Pub/Sub",
          body: "Publishers broadcast messages to a topic. Multiple subscribers consume independently. Unlike queues, each subscriber gets a copy — used for fan-out, event broadcasting, and notifications.",
        },
        {
          title: "At-Least-Once Delivery",
          body: "Messages are guaranteed to be delivered but may be delivered more than once. Consumers must be idempotent — processing the same message twice must produce the same result.",
        },
        {
          title: "Dead Letter Queues",
          body: "Failed messages land in a DLQ after max retries. Prevents poison messages from blocking the queue. Inspect and replay from DLQ after fixing the underlying issue.",
        },
      ],
      resources: [
        { label: "Apache Kafka Docs", url: "https://kafka.apache.org/documentation/", desc: "The de-facto standard for distributed event streaming." },
        { label: "RabbitMQ Tutorials", url: "https://www.rabbitmq.com/tutorials", desc: "Hands-on queue patterns — work queues, pub/sub, routing, and RPC." },
      ],
    },
    {
      id: "storage-sd",
      label: "Storage & Databases",
      icon: HardDrive,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["databases", "sharding", "replication", "nosql", "sql"],
      concepts: [
        {
          title: "Database Sharding",
          body: "Horizontally partition data across multiple DB nodes. Each shard holds a subset of rows. Choose a shard key that distributes load evenly and keeps related data on the same shard.",
        },
        {
          title: "Replication",
          body: "Leader-follower: writes go to leader, reads from followers. Improves read throughput and availability. Trade-off: replication lag means followers may serve stale data.",
        },
        {
          title: "SQL vs NoSQL",
          body: "SQL: strong consistency, ACID, joins, well-understood. NoSQL: flexible schema, horizontal scale, eventual consistency. Choose based on access patterns, not hype.",
        },
        {
          title: "Object Storage",
          body: "Store blobs (images, videos, backups) in S3-compatible stores. Infinitely scalable, cheap, and globally available. Serve directly via CDN — never proxy through your app servers.",
        },
      ],
      resources: [
        { label: "Designing Data-Intensive Applications", url: "https://dataintensive.net", desc: "Replication, partitioning, transactions, and distributed consensus." },
      ],
    },
    {
      id: "api-design",
      label: "API Design",
      icon: Cable,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["api", "rest", "graphql", "grpc", "api-gateway"],
      concepts: [
        {
          title: "API Gateway",
          body: "Single entry point that routes, authenticates, rate-limits, and transforms requests. Hides internal service topology from clients and enables cross-cutting concerns centrally.",
        },
        {
          title: "REST vs GraphQL vs gRPC",
          body: "REST: simple, widely understood, HTTP caching. GraphQL: flexible queries, single endpoint, great for complex UIs. gRPC: binary, typed, high-performance — ideal for internal service calls.",
        },
        {
          title: "Idempotency",
          body: "Ensure repeated identical requests have the same effect as a single request. Use idempotency keys for payment and order APIs. GET/PUT/DELETE are idempotent; POST is not by default.",
        },
        {
          title: "Versioning",
          body: "Version your APIs from day one — /v1/, /v2/ in the URL or via headers. Never make breaking changes to an existing version. Deprecate with a sunset date and migration guide.",
        },
      ],
      resources: [
        { label: "REST API Design Rulebook", url: "https://www.oreilly.com/library/view/rest-api-design/9781449317904/", desc: "Principles for designing consistent, intuitive REST APIs at scale." },
      ],
    },
  ],
};
