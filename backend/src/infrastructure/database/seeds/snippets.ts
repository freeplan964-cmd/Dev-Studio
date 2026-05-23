const now = Date.now();

export interface SnippetSeed {
  id: string;
  title: string;
  language: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export const seedSnippets: SnippetSeed[] = [
  {
    id: "s_1",
    title: "Drizzle ORM Connection",
    language: "typescript",
    description: "Postgres database connection using Drizzle with connection pooling.",
    code: `import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);`,
    tags: ["postgres", "drizzle", "database"],
    createdAt: now - 86400000 * 12,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "s_2",
    title: "Dockerfile — Next.js Standalone",
    language: "dockerfile",
    description: "Slim multi-stage build for Next.js standalone output.",
    code: `FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]`,
    tags: ["docker", "nextjs", "devops"],
    createdAt: now - 86400000 * 30,
    updatedAt: now - 86400000 * 14,
  },
  {
    id: "s_3",
    title: "Drizzle Schema — Users Table",
    language: "typescript",
    description: "Production-ready Drizzle users table with audit columns.",
    code: `import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;`,
    tags: ["typescript", "schema", "drizzle"],
    createdAt: now - 86400000 * 18,
    updatedAt: now - 86400000 * 6,
  },
  {
    id: "s_4",
    title: "useDebounce Hook",
    language: "typescript",
    description: "Generic debounce hook for search inputs and expensive operations.",
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
// const debouncedSearch = useDebounce(searchTerm, 400);`,
    tags: ["react", "hooks", "typescript", "performance"],
    createdAt: now - 86400000 * 8,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: "s_5",
    title: "JWT Auth Middleware — Express",
    language: "typescript",
    description: "Express middleware that validates JWT tokens from cookies or Authorization header.",
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}`,
    tags: ["express", "jwt", "auth", "middleware"],
    createdAt: now - 86400000 * 22,
    updatedAt: now - 86400000 * 5,
  },
  {
    id: "s_6",
    title: "Zod API Request Validator",
    language: "typescript",
    description: "Express middleware factory for validating request body with a Zod schema.",
    code: `import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      });
    }

    req.body = result.data;
    next();
  };
}

// Usage:
// const CreatePostSchema = z.object({ title: z.string().min(1), body: z.string() });
// router.post('/posts', validateBody(CreatePostSchema), createPost);`,
    tags: ["zod", "express", "validation", "typescript"],
    createdAt: now - 86400000 * 15,
    updatedAt: now - 86400000 * 4,
  },
  {
    id: "s_7",
    title: "React Query — Paginated Fetch",
    language: "typescript",
    description: "TanStack Query hook for cursor-based paginated data fetching.",
    code: `import { useInfiniteQuery } from '@tanstack/react-query';

interface Page<T> {
  data: T[];
  nextCursor: string | null;
}

export function usePaginatedList<T>(
  key: string[],
  fetcher: (cursor?: string) => Promise<Page<T>>
) {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam }) => fetcher(pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

// Usage:
// const { data, fetchNextPage, hasNextPage } = usePaginatedList(
//   ['posts'],
//   (cursor) => api.get(\`/posts?cursor=\${cursor}\`)
// );`,
    tags: ["react-query", "typescript", "pagination", "react"],
    createdAt: now - 86400000 * 11,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "s_8",
    title: "GitHub Actions — CI Pipeline",
    language: "yaml",
    description: "Full CI workflow with type-check, lint, test, and build on PRs.",
    code: `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --coverage

      - name: Build
        run: npm run build`,
    tags: ["github-actions", "ci", "devops", "yaml"],
    createdAt: now - 86400000 * 35,
    updatedAt: now - 86400000 * 7,
  },
  {
    id: "s_9",
    title: "Zustand Store with Persistence",
    language: "typescript",
    description: "Zustand store with localStorage persistence and devtools.",
    code: `import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  setTheme: (theme: SettingsState['theme']) => void;
  toggleSidebar: () => void;
  reset: () => void;
}

const defaults = { theme: 'dark' as const, sidebarCollapsed: false };

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        ...defaults,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () =>
          set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
        reset: () => set(defaults),
      }),
      { name: 'app-settings' }
    )
  )
);`,
    tags: ["zustand", "react", "typescript", "state"],
    createdAt: now - 86400000 * 9,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "s_10",
    title: "TanStack Router — Protected Route",
    language: "typescript",
    description: "File-based protected route that redirects unauthenticated users.",
    code: `import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/auth';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }

    return { user: session.user };
  },
});`,
    tags: ["tanstack-router", "auth", "react", "typescript"],
    createdAt: now - 86400000 * 6,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "s_11",
    title: "Async Error Boundary — React",
    language: "typescript",
    description: "Class-based error boundary that catches async render errors and shows fallback UI.",
    code: `import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      return this.props.fallback?.(error, this.reset) ?? (
        <div className="p-6 text-center text-destructive">
          <p className="font-semibold">Something went wrong</p>
          <button onClick={this.reset} className="mt-2 text-sm underline">
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`,
    tags: ["react", "typescript", "error-handling"],
    createdAt: now - 86400000 * 20,
    updatedAt: now - 86400000 * 8,
  },
  {
    id: "s_12",
    title: "Rate Limiter — Express",
    language: "typescript",
    description: "Per-route rate limiter using express-rate-limit with Redis or in-memory store.",
    code: `import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again in 15 minutes.',
  },
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  skipSuccessfulRequests: true,
  message: {
    error: 'Too many login attempts. Please try again in an hour.',
  },
});

// Usage:
// app.use('/api', apiLimiter);
// app.post('/api/auth/login', authLimiter, loginHandler);`,
    tags: ["express", "security", "rate-limiting", "typescript"],
    createdAt: now - 86400000 * 25,
    updatedAt: now - 86400000 * 10,
  },
];
