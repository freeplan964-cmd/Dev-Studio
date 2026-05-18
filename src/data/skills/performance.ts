import type { SkillAreaData } from "../../types/skills";
import { Zap, MonitorDot, Server as ServerIcon, DatabaseZap, Network } from "lucide-react";

export const performanceArea: SkillAreaData = {
  id: "performance",
  label: "Performance",
  icon: Zap,
  description:
    "Measure and improve application speed at every layer — frontend rendering, backend throughput, database queries, and network delivery.",
  subAreasLabel: "Topics",
  concepts: [
    {
      title: "Measure Before Optimising",
      body: "Premature optimisation is the root of all evil. Profile first — find the actual bottleneck. Gut feelings are wrong more often than not. A 5% improvement on a non-bottleneck changes nothing.",
    },
    {
      title: "Amdahl's Law",
      body: "Speedup from parallelising is limited by the sequential fraction. If 20% of work is sequential, max speedup is 5× regardless of how many cores you add. Optimise the bottleneck.",
    },
    {
      title: "Latency Numbers Every Dev Should Know",
      body: "L1 cache: 1ns. RAM: 100ns. SSD: 100µs. Network round-trip: 1–100ms. These orders-of-magnitude guide architecture — avoid a DB call where a cache lookup will do.",
    },
    {
      title: "The 80/20 Rule",
      body: "80% of performance gain comes from 20% of optimisations. Find the slow path (using profilers and tracing) and fix that — don't micro-optimise code that runs 0.1% of the time.",
    },
  ],
  resources: [
    {
      label: "High Performance Browser Networking",
      url: "https://hpbn.co",
      desc: "TCP, TLS, HTTP/2, WebSockets, WebRTC — free book by Ilya Grigorik.",
    },
    {
      label: "web.dev — Performance",
      url: "https://web.dev/performance/",
      desc: "Google's authoritative guide to Core Web Vitals, lazy loading, and caching.",
    },
    {
      label: "The USE Method",
      url: "https://www.brendangregg.com/usemethod.html",
      desc: "Utilization, Saturation, Errors — a systematic framework for diagnosing bottlenecks.",
    },
    {
      label: "WebPageTest",
      url: "https://www.webpagetest.org",
      desc: "Deep performance testing from real browsers in real locations — waterfall, filmstrip.",
    },
  ],
  checklist: [
    { id: "perf-profile", label: "Production profiling done before any optimisation" },
    { id: "perf-cwv", label: "Core Web Vitals pass: LCP < 2.5s, CLS < 0.1, INP < 200ms" },
    { id: "perf-cache", label: "Static assets served with long Cache-Control max-age via CDN" },
    { id: "perf-query", label: "Slow queries identified with EXPLAIN and indexes added" },
    { id: "perf-n1", label: "N+1 query problem eliminated — use joins or DataLoader batching" },
    { id: "perf-bundle", label: "JS bundle analysed — code split, tree-shaken, no duplicate deps" },
    { id: "perf-img", label: "Images served as WebP/AVIF with correct sizes and lazy loading" },
    { id: "perf-compress", label: "Gzip/Brotli compression enabled on server responses" },
  ],
  subAreas: [
    {
      id: "frontend-perf",
      label: "Frontend Performance",
      icon: MonitorDot,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["frontend", "web-vitals", "bundle", "rendering"],
      concepts: [
        {
          title: "Core Web Vitals",
          body: "LCP (Largest Contentful Paint < 2.5s): page load speed. CLS (Cumulative Layout Shift < 0.1): visual stability. INP (Interaction to Next Paint < 200ms): responsiveness. Google uses these for ranking.",
        },
        {
          title: "Critical Rendering Path",
          body: "HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite. Blocking resources (render-blocking scripts, large CSS) delay this. Preload critical resources, defer non-critical scripts.",
        },
        {
          title: "Code Splitting & Lazy Loading",
          body: "Split your JS bundle by route. Lazy-load components not needed on initial render. React.lazy + Suspense, dynamic import(). Don't ship code users may never run.",
        },
        {
          title: "Image Optimisation",
          body: "Use WebP/AVIF (40–60% smaller than JPEG). Set explicit width/height to prevent CLS. Use srcset for responsive images. Lazy-load below-the-fold images with loading='lazy'.",
        },
        {
          title: "Perceived Performance",
          body: "Skeleton screens, optimistic UI updates, and instant feedback make apps feel faster than they are. Show something immediately — even a spinner is better than a blank screen.",
        },
      ],
      resources: [
        { label: "web.dev — Performance", url: "https://web.dev/performance/", desc: "Core Web Vitals, rendering, and browser performance from Google." },
        { label: "Chrome DevTools Performance", url: "https://developer.chrome.com/docs/devtools/performance/", desc: "How to profile, flame charts, long tasks, and memory leaks." },
        { label: "Lighthouse Docs", url: "https://developer.chrome.com/docs/lighthouse/", desc: "Automated auditing for performance, accessibility, SEO, and best practices." },
      ],
    },
    {
      id: "backend-perf",
      label: "Backend Performance",
      icon: ServerIcon,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["backend", "throughput", "concurrency", "profiling"],
      concepts: [
        {
          title: "Profiling First",
          body: "Use a profiler (py-spy, clinic.js, pprof) to find where CPU time is spent. Flame graphs show the call stack. Fix the widest bars — small optimisations elsewhere are noise.",
        },
        {
          title: "Concurrency Models",
          body: "Thread-per-request (traditional): simple but memory-intensive at scale. Async/event-loop (Node, Go): high concurrency with low overhead. CPU-bound work belongs in worker threads or processes.",
        },
        {
          title: "Caching",
          body: "Cache expensive computations and frequent DB queries in Redis with appropriate TTLs. Even a 1-second cache on a hot endpoint can eliminate thousands of DB calls per minute.",
        },
        {
          title: "Connection Pooling",
          body: "Opening a DB connection is expensive. Pool connections and reuse them. Set pool size based on DB thread limit and server concurrency. Too large a pool is as bad as too small.",
        },
      ],
      resources: [
        { label: "Systems Performance — Brendan Gregg", url: "https://www.brendangregg.com/systems-performance.html", desc: "CPU, memory, storage, and network performance analysis using flame graphs." },
      ],
    },
    {
      id: "db-perf",
      label: "Database Performance",
      icon: DatabaseZap,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["database", "indexing", "query-optimization", "n+1"],
      concepts: [
        {
          title: "EXPLAIN ANALYZE",
          body: "Run EXPLAIN ANALYZE on slow queries. Look for Seq Scan on large tables (needs an index), high row estimates, nested loops on large datasets. This is the most valuable performance tool you have.",
        },
        {
          title: "Indexing Strategy",
          body: "Index columns used in WHERE, JOIN, and ORDER BY. Composite indexes: put the most selective column first. Partial indexes for frequently queried subsets. Too many indexes slow writes.",
        },
        {
          title: "N+1 Query Problem",
          body: "Fetching a list of N records and then querying for related data N times. Fix with JOIN, eager loading, or DataLoader batching. EXPLAIN reveals it; query logging confirms it.",
        },
        {
          title: "Query Optimisation Patterns",
          body: "Select only needed columns — never SELECT *. Use pagination (LIMIT/OFFSET or cursor-based). Avoid functions on indexed columns in WHERE clauses — they prevent index use.",
        },
      ],
      resources: [
        { label: "Use The Index, Luke", url: "https://use-the-index-luke.com", desc: "SQL performance explained — how indexes really work, query plans, and tuning." },
        { label: "PostgreSQL EXPLAIN documentation", url: "https://www.postgresql.org/docs/current/using-explain.html", desc: "Official guide to reading query plans in Postgres." },
      ],
    },
    {
      id: "network-perf",
      label: "Network & CDN",
      icon: Network,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["network", "cdn", "http2", "compression", "caching"],
      concepts: [
        {
          title: "HTTP/2 & HTTP/3",
          body: "HTTP/2 multiplexes requests over a single connection — eliminates head-of-line blocking and makes domain sharding counterproductive. HTTP/3 (QUIC) improves performance on lossy networks.",
        },
        {
          title: "Compression",
          body: "Gzip/Brotli compress text responses (HTML, CSS, JS, JSON) by 70–90%. Brotli compresses ~20% better than Gzip. Never compress already-compressed formats (JPEG, PNG, MP4).",
        },
        {
          title: "CDN Strategy",
          body: "Serve static assets with far-future Cache-Control max-age via CDN. Cache API responses at the edge for public data. Use cache invalidation rather than short TTLs.",
        },
        {
          title: "DNS & TLS Optimisation",
          body: "Preconnect to third-party origins (<link rel='preconnect'>). Use TLS 1.3 for 1-RTT handshakes. Enable OCSP stapling to eliminate certificate revocation round-trips.",
        },
      ],
      resources: [
        { label: "High Performance Browser Networking", url: "https://hpbn.co", desc: "TCP, TLS, HTTP/2, WebSockets — how the network works and how to optimize it." },
        { label: "WebPageTest", url: "https://www.webpagetest.org", desc: "Deep performance testing from real browsers and locations." },
      ],
    },
  ],
};
