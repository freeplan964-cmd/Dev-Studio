const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export interface ConnectorSeed {
  id: string;
  type: "companies" | "hr" | "clients";
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export const seedConnectors: ConnectorSeed[] = [
  {
    id: "conn_1",
    type: "companies",
    name: "Stripe",
    email: "partnerships@stripe.com",
    notes: "Payment infra. Contact for startup credits. API-first, excellent docs.",
    createdAt: d(60),
    updatedAt: d(5),
  },
  {
    id: "conn_2",
    type: "companies",
    name: "Vercel",
    email: "sales@vercel.com",
    notes: "Frontend cloud. Sponsor tier available for OSS projects.",
    createdAt: d(45),
    updatedAt: d(10),
  },
  {
    id: "conn_3",
    type: "companies",
    name: "PlanetScale",
    email: "hello@planetscale.com",
    notes: "Serverless MySQL. Great branching workflow for DB migrations.",
    createdAt: d(30),
    updatedAt: d(20),
  },
  {
    id: "conn_4",
    type: "hr",
    name: "Sarah Chen — TechCorp HR",
    email: "s.chen@techcorp.io",
    phone: "+1 415 555 0100",
    notes: "Recruiter for senior eng roles. Prefers initial contact via email. Replied within 24h last time.",
    createdAt: d(14),
    updatedAt: d(2),
  },
  {
    id: "conn_5",
    type: "hr",
    name: "Marcus Webb — DevHire",
    email: "marcus@devhire.co",
    notes: "Specialized in remote-first startups. Focuses on React/Node stack roles. Met at ReactConf.",
    createdAt: d(20),
    updatedAt: d(7),
  },
  {
    id: "conn_6",
    type: "hr",
    name: "Priya Nair — ScaleUp Talent",
    email: "priya.nair@scaleup.io",
    phone: "+44 20 7946 0123",
    notes: "UK + remote roles. Fintech and B2B SaaS focus. Quick to respond on LinkedIn.",
    createdAt: d(10),
    updatedAt: d(1),
  },
  {
    id: "conn_7",
    type: "clients",
    name: "Alex Rivera — SoloFounder.io",
    email: "alex@solofounder.io",
    notes: "Indie hacker. Needs help with full-stack features monthly. Pays on time. Slack-based comms.",
    createdAt: d(90),
    updatedAt: d(3),
  },
  {
    id: "conn_8",
    type: "clients",
    name: "Nimbus Analytics",
    email: "dev@nimbusanalytics.com",
    phone: "+1 628 555 0199",
    notes: "Dashboard redesign project. Needs data viz expertise. Decision-maker: CTO Leo Park.",
    createdAt: d(25),
    updatedAt: d(4),
  },
  {
    id: "conn_9",
    type: "clients",
    name: "Bloom Studio",
    email: "studio@bloom.design",
    notes: "Design agency. Subcontracts dev work. Prefers fixed-price. Good for filler work between projects.",
    createdAt: d(50),
    updatedAt: d(15),
  },
];
