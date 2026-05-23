const now = Date.now();

export interface TemplateSeed {
  id: string;
  name: string;
  description: string;
  stack: string[];
  tags: string[];
  structure: string;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export const seedTemplates: TemplateSeed[] = [
  {
    id: "t_1",
    name: "SaaS Boilerplate (Next.js + Drizzle)",
    description: "Full SaaS starter with auth, billing stub, dashboard shell, and marketing site.",
    stack: ["next.js", "drizzle", "postgres", "tailwind", "shadcn"],
    tags: ["saas", "boilerplate", "fullstack"],
    structure: `app/
  (marketing)/
    page.tsx            # Landing page
    pricing/page.tsx
    blog/page.tsx
  (app)/
    layout.tsx          # Auth guard wrapper
    dashboard/page.tsx
    settings/
      profile/page.tsx
      billing/page.tsx
  api/
    auth/[...nextauth]/route.ts
    webhook/stripe/route.ts
server/
  db/
    schema.ts
    migrations/
  auth/
    config.ts
  stripe/
    client.ts
middleware.ts
.env.example`,
    notes: "Includes Drizzle migrations, dark-first design system, and Stripe webhook stub. Use \`npm run db:push\` to init schema.",
    createdAt: now - 86400000 * 60,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "t_2",
    name: "AI Chat App Starter",
    description: "Streaming AI chat with tool calling, memory, and multi-model support.",
    stack: ["next.js", "vercel-ai-sdk", "drizzle", "postgres", "openai"],
    tags: ["ai", "chat", "streaming"],
    structure: `app/
  chat/
    [id]/page.tsx       # Chat thread view
    page.tsx            # Chat list
  api/
    chat/route.ts       # Streaming AI endpoint
    threads/route.ts
lib/
  ai/
    tools.ts            # Tool definitions
    memory.ts           # Conversation memory
    models.ts           # Model registry
  db/
    schema.ts
components/
  chat/
    bubble.tsx
    input.tsx
    thread-list.tsx`,
    notes: "Edge runtime by default. Switch to Node runtime if using heavy tools. Set OPENAI_API_KEY and DATABASE_URL.",
    createdAt: now - 86400000 * 30,
    updatedAt: now - 86400000 * 7,
  },
  {
    id: "t_3",
    name: "Multi-tenant Dashboard",
    description: "Org-based multi-tenancy with RBAC, member invites, and audit logging.",
    stack: ["next.js", "drizzle", "tailwind", "shadcn", "postgres"],
    tags: ["dashboard", "multi-tenant", "rbac"],
    structure: `app/
  [org]/
    layout.tsx          # Org context provider
    dashboard/page.tsx
    members/
      page.tsx
      invite/page.tsx
    settings/
      general/page.tsx
      security/page.tsx
  api/
    orgs/[org]/
      members/route.ts
      invites/route.ts
server/
  db/
    schema/
      orgs.ts
      members.ts
      audit.ts
  auth/
    rbac.ts             # Role checks
    policies.ts`,
    notes: "Uses row-level security. Org slug is resolved in middleware and injected via headers. Roles: owner, admin, member.",
    createdAt: now - 86400000 * 45,
    updatedAt: now - 86400000 * 10,
  },
  {
    id: "t_4",
    name: "REST API — Clean Architecture",
    description: "Express 5 API organized with domain, application, and infrastructure layers.",
    stack: ["express", "drizzle", "postgres", "zod", "typescript", "vitest"],
    tags: ["backend", "api", "clean-architecture", "rest"],
    structure: `src/
  domain/
    entities/
      user.ts
    repositories/
      user.repository.ts   # Interface
    schema.ts              # Drizzle schema
  application/
    use-cases/
      create-user.ts
      get-user.ts
    services/
      auth.service.ts
  infrastructure/
    database/
      index.ts
      repositories/
        drizzle-user.repo.ts
    external/
      openai.client.ts
  presentation/
    routes.ts
    controllers/
      user.controller.ts
    middleware/
      auth.ts
      validation.ts
    dtos/
      user.dto.ts
  index.ts                 # Express entry
tests/
  unit/
  integration/`,
    notes: "Dependency injection via a container.ts file. Use Vitest for unit tests and supertest for integration. Run \`npm run db:push\` then \`npm start\`.",
    createdAt: now - 86400000 * 50,
    updatedAt: now - 86400000 * 5,
  },
  {
    id: "t_5",
    name: "Browser Extension (Vite + React)",
    description: "MV3 Chrome extension with popup, content script, and background service worker.",
    stack: ["vite", "react", "tailwind", "typescript", "crxjs"],
    tags: ["extension", "chrome", "vite", "mv3"],
    structure: `src/
  popup/
    index.html
    main.tsx
    App.tsx
  content/
    index.ts             # Content script
    overlay.tsx          # Injected UI
  background/
    service-worker.ts    # MV3 background
  options/
    index.html
    Options.tsx
  lib/
    storage.ts           # chrome.storage helpers
    messaging.ts         # Runtime message bus
manifest.json
vite.config.ts`,
    notes: "Uses @crxjs/vite-plugin for HMR during development. Run \`npm run build\` then load \`dist/\` as unpacked extension in chrome://extensions.",
    createdAt: now - 86400000 * 20,
    updatedAt: now - 86400000 * 8,
  },
  {
    id: "t_6",
    name: "CLI Tool (Node + Commander)",
    description: "Node.js CLI with subcommands, config file, interactive prompts, and self-update.",
    stack: ["node.js", "typescript", "commander", "inquirer", "ora"],
    tags: ["cli", "node", "typescript", "tooling"],
    structure: `src/
  index.ts               # Entry — program definition
  commands/
    init.ts
    deploy.ts
    config.ts
  lib/
    config.ts            # ~/.myapp/config.json
    api.ts               # Backend API client
    logger.ts            # Chalk-colored output
  utils/
    update-check.ts      # Update notifier
bin/
  myapp.js               # Shebang wrapper
package.json             # "bin" field configured`,
    notes: "Compiled with tsup to a single CJS bundle. Publish to npm with \`npm publish\`. Install globally with \`npm i -g\`.",
    createdAt: now - 86400000 * 35,
    updatedAt: now - 86400000 * 12,
  },
  {
    id: "t_7",
    name: "Real-time Collab App (Socket.io)",
    description: "Real-time collaborative workspace with rooms, presence, and CRDT-ready data model.",
    stack: ["next.js", "socket.io", "redis", "drizzle", "postgres"],
    tags: ["realtime", "websocket", "collaboration"],
    structure: `app/
  room/
    [id]/page.tsx        # Collaboration canvas
  api/
    rooms/route.ts
server/
  socket/
    server.ts            # Socket.io init
    handlers/
      presence.ts
      document.ts
  redis/
    client.ts            # Pub/sub + cache
  db/
    schema.ts
lib/
  socket-client.ts       # Browser socket hook
  crdt/
    document.ts          # Yjs integration point`,
    notes: "Redis is used for pub/sub across server instances and ephemeral presence. Yjs recommended for conflict resolution on shared documents.",
    createdAt: now - 86400000 * 28,
    updatedAt: now - 86400000 * 6,
  },
];
