import type { InterviewQuestionSeed } from "./types.js";

const now = Date.now();

export const nextjsQuestions: InterviewQuestionSeed[] = [
  {
    id: "iq_nxt_1",
    area: "frontend",
    difficulty: "mid",
    category: "Next.js",
    question: "What is the difference between App Router and Pages Router in Next.js?",
    answer: "Pages Router (Next.js < 13): file-based routing in /pages, getServerSideProps/getStaticProps for data fetching, all components are client-side by default. App Router (Next.js 13+): file-based routing in /app, React Server Components by default, co-located layouts/loading/error files, Server Actions for mutations, streaming with Suspense. App Router is the recommended path for new projects.",
    tags: ["nextjs", "app-router", "pages-router"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_nxt_2",
    area: "frontend",
    difficulty: "mid",
    category: "Next.js",
    question: "What are React Server Components (RSC) and how do they differ from Client Components?",
    answer: "Server Components render exclusively on the server — they can fetch data directly (DB, APIs), import server-only modules, and never ship their code to the client. Client Components (`'use client'`) run in the browser and can use hooks, event handlers, browser APIs. RSCs can render Client Components but not vice versa. RSCs reduce JS bundle size and enable direct data access without API layers.",
    tags: ["nextjs", "rsc", "server-components"],
    createdAt: now,
  },
  {
    id: "iq_nxt_3",
    area: "frontend",
    difficulty: "mid",
    category: "Next.js",
    question: "What is Incremental Static Regeneration (ISR) in Next.js?",
    answer: "ISR lets you create or update static pages after build time without a full rebuild. Configure with `revalidate` in App Router (`export const revalidate = 60`). On-demand revalidation via `revalidatePath()` or `revalidateTag()`. Pages are served from cache and regenerated in the background when stale. Best for: e-commerce product pages, blog posts, dashboards that tolerate slight staleness.",
    tags: ["nextjs", "isr", "ssg", "caching"],
    createdAt: now,
  },
  {
    id: "iq_nxt_4",
    area: "frontend",
    difficulty: "mid",
    category: "Next.js",
    question: "What are Server Actions in Next.js?",
    answer: "Server Actions (Next.js 14+) are async functions that run on the server, callable from Client Components. Decorated with `'use server'`. Used for form submissions, mutations, database writes — eliminating the need for API routes for simple mutations. They integrate with React's form action pattern, support progressive enhancement, and can be used with `useFormState` / `useFormStatus` hooks.",
    tags: ["nextjs", "server-actions", "mutations"],
    createdAt: now,
  },
];
