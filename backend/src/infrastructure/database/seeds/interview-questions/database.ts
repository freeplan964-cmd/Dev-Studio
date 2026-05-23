import type { InterviewQuestionSeed } from "./types.js";

const now = Date.now();

export const databaseQuestions: InterviewQuestionSeed[] = [
  // ─── PostgreSQL ───────────────────────────────────────────
  {
    id: "iq_db_1",
    area: "database",
    difficulty: "junior",
    category: "PostgreSQL",
    question: "What is ACID and how does PostgreSQL guarantee it?",
    answer:
      "ACID stands for Atomicity (all-or-nothing writes), Consistency (constraints always hold), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). PostgreSQL guarantees ACID via WAL (Write-Ahead Logging) for durability, MVCC for isolation, and constraint enforcement for consistency. Every transaction either fully commits or fully rolls back.",
    tags: ["postgresql", "database", "transactions", "acid"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_2",
    area: "database",
    difficulty: "mid",
    category: "PostgreSQL",
    question: "What is MVCC and how does it affect PostgreSQL performance?",
    answer:
      "MVCC (Multi-Version Concurrency Control) allows PostgreSQL to serve consistent reads without locking. Writers create new row versions; readers see a snapshot of the data as of their transaction start. This means readers never block writers and writers never block readers. The downside: old row versions accumulate as 'dead tuples'. VACUUM reclaims this space — without it, tables bloat and performance degrades. autovacuum handles this automatically, but long-running transactions can prevent VACUUM from running.",
    tags: ["postgresql", "database", "mvcc", "concurrency"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_3",
    area: "database",
    difficulty: "mid",
    category: "PostgreSQL",
    question: "Explain the difference between B-Tree, GIN, and GiST indexes in PostgreSQL.",
    answer:
      "B-Tree (default): sorted tree, works for =, <, >, BETWEEN, LIKE 'prefix%'. Best for most use cases. GIN (Generalized Inverted Index): for multi-element values — arrays, JSONB, full-text search. Stores each element → document mapping. Slower to build, faster to search. GiST (Generalized Search Tree): for geometric data, range types, full-text (tsvector). More flexible, supports custom operator classes. Rule of thumb: B-Tree for scalars, GIN for arrays/JSONB/text search, GiST for ranges and geometry.",
    tags: ["postgresql", "database", "indexes", "performance"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_4",
    area: "database",
    difficulty: "mid",
    category: "PostgreSQL",
    question: "How do you diagnose a slow query in PostgreSQL?",
    answer:
      "1. EXPLAIN SELECT ... — shows the query plan without running it. 2. EXPLAIN ANALYZE SELECT ... — runs the query and shows actual vs estimated rows and timings. Key things to look for: Seq Scan on a large table (missing index), high 'actual rows' vs 'plan rows' mismatch (stale statistics — run ANALYZE), Nested Loop on large joins (should be Hash Join). 3. Check pg_stat_statements for queries with high total_time. 4. Look for bloat via pg_bloat check — vacuum dead tuples.",
    tags: ["postgresql", "database", "performance", "query-optimization"],
    createdAt: now,
  },
  {
    id: "iq_db_5",
    area: "database",
    difficulty: "senior",
    category: "PostgreSQL",
    question: "What is connection pooling and why is it necessary for PostgreSQL at scale?",
    answer:
      "PostgreSQL spawns a new OS process per connection — each costs ~5–10MB RAM and CPU overhead for process creation. Under high load (hundreds of concurrent connections), this overwhelms the server. PgBouncer is the standard connection pooler: it maintains a small pool of persistent DB connections and multiplexes many app connections onto them. Transaction mode is most efficient (connection returned to pool between transactions) but incompatible with prepared statements and session-level settings. Session mode preserves session state but is less efficient. Always use a pooler in production.",
    tags: ["postgresql", "database", "connection-pooling", "performance"],
    createdAt: now,
  },
  {
    id: "iq_db_6",
    area: "database",
    difficulty: "senior",
    category: "PostgreSQL",
    question: "What are database transactions isolation levels and when would you change them?",
    answer:
      "PostgreSQL supports four isolation levels: READ UNCOMMITTED (treated as READ COMMITTED in PG), READ COMMITTED (default — sees committed data at statement time), REPEATABLE READ (snapshot at transaction start — no non-repeatable reads), SERIALIZABLE (full serializable isolation — no anomalies, detected and rolled back if they occur). Most apps work fine with READ COMMITTED. Use REPEATABLE READ for reports or batch jobs that need a consistent view across multiple queries. SERIALIZABLE is for financial operations where phantom reads or write skew would cause incorrect results — it's significantly slower due to tracking.",
    tags: ["postgresql", "database", "transactions", "isolation-levels"],
    createdAt: now,
  },
  // ─── MongoDB ──────────────────────────────────────────────
  {
    id: "iq_db_7",
    area: "database",
    difficulty: "junior",
    category: "MongoDB",
    question: "When should you embed documents vs use references in MongoDB?",
    answer:
      "Embed: when data is always read together (a blog post with its comments if there are few comments), when the child data is exclusive to the parent (order line items), or when the sub-document is small and bounded. Reference (store ObjectId): when the child data is large or unbounded (a post with thousands of comments), when the data is shared between multiple documents, or when the child is updated independently. Rule: embed for one-to-few, reference for one-to-many or many-to-many. Embedding is faster for reads (no $lookup); references avoid document bloat and allow independent updates.",
    tags: ["mongodb", "database", "schema-design"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_8",
    area: "database",
    difficulty: "mid",
    category: "MongoDB",
    question: "Explain the MongoDB aggregation pipeline and its most important stages.",
    answer:
      "$match: filter documents — always put first to reduce dataset early. $group: group by a field and accumulate (sum, count, avg, push). $project: reshape documents — include, exclude, or compute fields. $lookup: left outer join with another collection (equivalent to SQL JOIN). $unwind: deconstructs an array field into separate documents. $sort/$limit/$skip: pagination and ordering. $facet: runs multiple aggregation pipelines in parallel on the same input. Performance rule: $match and $limit as early as possible to reduce the working set before expensive stages.",
    tags: ["mongodb", "database", "aggregation"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_9",
    area: "database",
    difficulty: "mid",
    category: "MongoDB",
    question: "What is the ESR rule for MongoDB compound index design?",
    answer:
      "ESR = Equality → Sort → Range. When building a compound index, order fields as: 1. Equality fields first (fields tested with =). 2. Sort fields second (fields in the ORDER BY clause). 3. Range fields last (fields tested with >, <, $in on multiple values). This order maximizes index efficiency — equality fields narrow the result set most aggressively, sort fields allow index-based sorting without an in-memory sort stage, and range fields are kept at the end because they result in non-contiguous index entries.",
    tags: ["mongodb", "database", "indexes", "performance"],
    createdAt: now,
  },
  {
    id: "iq_db_10",
    area: "database",
    difficulty: "senior",
    category: "MongoDB",
    question: "How do MongoDB read and write concerns affect consistency and performance?",
    answer:
      "Write concern (w): w:1 (default) — acknowledged by primary only. Fast but risks data loss if primary fails before replication. w:'majority' — acknowledged by a majority of replica set members. Safer, slower. w:0 — fire and forget (unacknowledged). Only for logging or metrics. Read concern: 'local' (default) — reads primary's current data (may not be replicated yet). 'majority' — reads data acknowledged by majority. 'linearizable' — strongest guarantee, reads reflect all prior writes acknowledged by majority. For financial or critical data: use w:'majority' + readConcern:'majority'. For analytics/logging: w:1 or even w:0 is fine.",
    tags: ["mongodb", "database", "consistency", "replication"],
    createdAt: now,
  },
  // ─── Redis ────────────────────────────────────────────────
  {
    id: "iq_db_11",
    area: "database",
    difficulty: "junior",
    category: "Redis",
    question: "What are Redis data structures and what is each best used for?",
    answer:
      "String: key-value, counters (INCR), cached JSON blobs, feature flags. List: ordered queue (LPUSH/RPOP), recent items timeline, task queue. Set: unique members, tags, social graph (SADD/SISMEMBER/SUNION). Sorted Set: leaderboards (ZADD score), rate limiting, priority queues — members ranked by score. Hash: object with named fields (HSET/HGET), user sessions, lightweight document store. Stream: durable append-only log with consumer groups — reliable message queue (Redis 5+). HyperLogLog: approximate cardinality counting (unique visitor counts) using fixed memory.",
    tags: ["redis", "database", "data-structures"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_12",
    area: "database",
    difficulty: "mid",
    category: "Redis",
    question: "What is the difference between Redis RDB and AOF persistence, and which should you use?",
    answer:
      "RDB (Redis Database): point-in-time snapshots at intervals (e.g., every 5 minutes or after N writes). Compact files, fast restarts, but you lose data since the last snapshot. AOF (Append Only File): logs every write command. With appendfsync everysec, you lose at most 1 second of data. Larger files, slower restarts. Best practice: use both. AOF for durability (minimize data loss), RDB for fast disaster recovery (smaller backup files, faster full restores). For pure caching with no persistence requirements, disable both for maximum performance.",
    tags: ["redis", "database", "persistence", "reliability"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_13",
    area: "database",
    difficulty: "mid",
    category: "Redis",
    question: "How would you implement a distributed rate limiter using Redis?",
    answer:
      "Using a sliding window with sorted sets: ZADD limit:user:123 timestamp timestamp (score = timestamp). ZREMRANGEBYSCORE limit:user:123 0 (now-window). ZCARD limit:user:123 — if count >= limit, reject. EXPIRE limit:user:123 window. This tracks exact request times per user. Simpler token bucket via Lua script: atomic INCR + EXPIRE. Or use the Redis Cell module (cl.throttle) which implements GCRA algorithm. Always use Lua scripts or transactions for multi-command rate limiters to ensure atomicity — otherwise race conditions allow burst through.",
    tags: ["redis", "database", "rate-limiting", "distributed-systems"],
    createdAt: now,
  },
  {
    id: "iq_db_14",
    area: "database",
    difficulty: "senior",
    category: "Redis",
    question: "When would you use Redis Streams over Pub/Sub, and how do consumer groups work?",
    answer:
      "Pub/Sub is fire-and-forget — if a subscriber is offline, messages are lost. No persistence, no delivery guarantees. Use for ephemeral real-time notifications (live dashboard updates). Streams are durable — messages persist until explicitly deleted. Consumer groups allow multiple consumers to process a stream with guaranteed at-least-once delivery. XADD adds messages. XREADGROUP reads messages assigned to a consumer. XACK acknowledges successful processing. Pending Entry List (PEL) tracks unacknowledged messages — XPENDING shows them, XCLAIM reassigns stale ones. Use Streams when you need message persistence, replay, or reliable processing — like a lightweight Kafka.",
    tags: ["redis", "database", "streams", "pub-sub", "messaging"],
    createdAt: now,
  },
  // ─── General SQL / Database ───────────────────────────────
  {
    id: "iq_db_15",
    area: "database",
    difficulty: "junior",
    category: "SQL",
    question: "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?",
    answer:
      "INNER JOIN: returns only rows where both tables have a matching key. Most restrictive. LEFT JOIN (LEFT OUTER JOIN): returns all rows from the left table, with matching rows from the right — NULLs for non-matching right columns. Use when you want all records from one side regardless of a match (e.g., all users and their optional orders). RIGHT JOIN: same as LEFT but from the right table's perspective. FULL OUTER JOIN: all rows from both tables — NULLs on both sides for non-matching rows. Common for finding gaps: WHERE right.id IS NULL in a LEFT JOIN finds left-table rows with no match.",
    tags: ["sql", "database", "joins"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_16",
    area: "database",
    difficulty: "mid",
    category: "SQL",
    question: "What is an N+1 query problem and how do you fix it?",
    answer:
      "N+1 occurs when you fetch N records and then make 1 additional query per record. Example: fetch 100 users (1 query), then fetch each user's profile (100 queries) = 101 queries total. Fixes: 1. Eager loading — JOIN or include the related data in the original query. In ORMs: User.findAll({ include: Profile }) vs separate queries. 2. Batch loading — collect all IDs, fetch in one WHERE id IN (...) query. DataLoader pattern for GraphQL. 3. Add ORM query logging in development to spot N+1 patterns early. N+1 is one of the most common performance killers in database-backed applications.",
    tags: ["sql", "database", "performance", "orm"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_db_17",
    area: "database",
    difficulty: "mid",
    category: "SQL",
    question: "Explain database indexing — what makes a query use an index or not?",
    answer:
      "An index is a sorted data structure (B-tree by default) that lets the DB find rows without a full table scan. Indexes are used when: the query filters or sorts by indexed columns, the index covers the query (covering index — all needed columns are in the index). Indexes are NOT used when: the query applies a function to the indexed column (WHERE LOWER(email) = 'x' — use functional index instead), the selectivity is low (< ~5% of rows — table scan is faster), the query uses LIKE '%suffix' (not prefix), or the optimizer estimates a full scan is cheaper. Always EXPLAIN your queries and check whether the expected index appears in the plan.",
    tags: ["sql", "database", "indexes", "performance"],
    createdAt: now,
  },
  {
    id: "iq_db_18",
    area: "database",
    difficulty: "mid",
    category: "SQL",
    question: "What are database migrations and what best practices should you follow?",
    answer:
      "Migrations are version-controlled scripts that evolve the database schema incrementally. Best practices: 1. Every migration has an up (apply) and down (rollback) script. 2. Migrations are idempotent — safe to run multiple times. 3. Never modify existing migrations — add new ones instead. 4. Keep migrations small and focused — one logical change per migration. 5. Test rollback in staging. 6. Avoid destructive operations (DROP COLUMN) in the same migration as a deployment — deprecate the column first, remove it in a follow-up after all code stops using it. 7. Run migrations before deploying new code — not after. Tools: Flyway, Liquibase, Drizzle Kit, Prisma Migrate.",
    tags: ["sql", "database", "migrations", "best-practices"],
    createdAt: now,
  },
  {
    id: "iq_db_19",
    area: "database",
    difficulty: "senior",
    category: "SQL",
    question: "What strategies exist for scaling a relational database to handle high traffic?",
    answer:
      "1. Read replicas: route reads to replicas, writes to primary. Reduces primary load for read-heavy apps. 2. Connection pooling (PgBouncer): reduces connection overhead. 3. Caching (Redis): cache frequent reads at application layer — reduces DB queries entirely. 4. Query optimization: indexes, denormalization, materialized views. 5. Vertical scaling: bigger instance — limited and expensive but simple. 6. Table partitioning: partition large tables by range (date) or hash to limit query scope and parallelize VACUUM. 7. Database sharding: split data across multiple DB instances by a key (user_id % N). Highest complexity — introduces cross-shard query problems. Use only when other options are exhausted. 8. CQRS: separate read and write models, each optimized independently.",
    tags: ["sql", "database", "scaling", "performance", "architecture"],
    createdAt: now,
  },
  {
    id: "iq_db_20",
    area: "database",
    difficulty: "senior",
    category: "SQL",
    question: "What is a database deadlock and how do you prevent and resolve it?",
    answer:
      "A deadlock occurs when two transactions each hold a lock the other needs, and both wait indefinitely. Example: Transaction A locks row 1, then tries to lock row 2. Transaction B locks row 2, then tries to lock row 1. PostgreSQL detects deadlocks and kills one transaction (the victim), which receives a deadlock error. Prevention: 1. Always acquire locks in a consistent order across all transactions (e.g., always lock user before account). 2. Use SELECT FOR UPDATE to lock rows explicitly early in the transaction. 3. Keep transactions short — reduce time locks are held. 4. Use NOWAIT or SKIP LOCKED to fail fast instead of waiting. Resolution: the killed transaction must retry. Application code should detect deadlock errors (PostgreSQL error code 40P01) and retry with exponential backoff.",
    tags: ["sql", "database", "deadlock", "concurrency", "transactions"],
    createdAt: now,
  },
];
