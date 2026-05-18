import type { SkillAreaData } from "../../types/skills";
import { Database } from "lucide-react";

export const databaseArea: SkillAreaData = {
  id: "database",
  label: "Database",
  icon: Database,
  description:
    "SQL, NoSQL, Redis, indexing, transactions, schema design, and scaling — deeply covered.",
  concepts: [
    {
      title: "ACID Transactions",
      body: "Atomicity, Consistency, Isolation, Durability. Postgres is fully ACID.",
    },
    {
      title: "B-Tree Indexes",
      body: "Default index type. Sorted tree allowing O(log n) lookups and range scans.",
    },
    {
      title: "Query Planning",
      body: "Optimizer chooses between index scans, hash joins, etc. Use EXPLAIN ANALYZE.",
    },
    {
      title: "Normalization",
      body: "Reduce redundancy and maintain integrity. Denormalize only for performance.",
    },
  ],
  resources: [
    {
      label: "PostgreSQL Docs",
      url: "https://www.postgresql.org/docs/",
      desc: "Full PostgreSQL SQL reference.",
    },
    {
      label: "MongoDB Docs",
      url: "https://www.mongodb.com/docs/",
      desc: "Official MongoDB documentation.",
    },
    {
      label: "Use The Index, Luke",
      url: "https://use-the-index-luke.com",
      desc: "SQL indexing for developers.",
    },
  ],
  checklist: [
    { id: "migrate", label: "All schema changes via versioned migrations" },
    { id: "index", label: "Foreign keys and frequently-filtered columns indexed" },
    { id: "pool", label: "Connection pooling configured correctly" },
    { id: "backup", label: "Automated backups + restore tested" },
  ],
};
