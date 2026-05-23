import type { SkillAreaData } from "../../types/skills";
import { Globe } from "lucide-react";

export const frontendArea: SkillAreaData = {
  id: "frontend",
  label: "Frontend",
  icon: Globe,
  description: "HTML, CSS, JavaScript and modern frameworks — choose a framework to dive deep.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "perf", label: "Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)" },
    { id: "a11y", label: "Semantic HTML & ARIA — screen reader accessible" },
    { id: "resp", label: "Responsive layout (mobile-first, fluid typography)" },
    { id: "seo", label: "Meta tags, OG, structured data (schema.org)" },
    { id: "bundle", label: "Bundle analysis — no unnecessary dependencies" },
    { id: "lazy", label: "Lazy load routes & heavy components" },
    { id: "error", label: "Error boundaries & graceful fallbacks" },
    { id: "csp", label: "Content Security Policy headers set" },
    { id: "fonts", label: "Font optimization (preload, font-display: swap)" },
    { id: "img", label: "Images: WebP/AVIF, srcset, lazy loading" },
  ],
  subAreas: [
    {
      id: "react",
      label: "React",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["react"],
      concepts: [
        {
          title: "Composition over Inheritance",
          body: "Build complex UIs by nesting specialized components. Use children prop for layouts and render props for behavior injection.",
        },
        {
          title: "Immutability & State",
          body: "Never mutate state directly. Use setState/dispatch with new references. Enables fast shallow comparisons and predictable re-renders.",
        },
        {
          title: "Hooks Pattern",
          body: "Custom hooks extract and reuse stateful logic across components. Rules: only call at top level, only from React functions.",
        },
        {
          title: "Reconciliation & Keys",
          body: "React diffs the virtual DOM using keys to identify list items. Stable keys prevent unnecessary unmounts; index keys cause bugs on reorder.",
        },
        {
          title: "Server Components (RSC)",
          body: "RSCs render on the server only — zero JS bundle cost. They can access databases directly. Client Components need 'use client' for hooks/events.",
        },
        {
          title: "Context vs External State",
          body: "Context is for low-frequency global values (theme, auth). Use Zustand/Redux for high-frequency updates to avoid widespread re-renders.",
        },
      ],
      resources: [
        {
          label: "React Official Docs",
          url: "https://react.dev",
          desc: "New official React documentation with interactive examples.",
        },
        {
          label: "React Hooks Reference",
          url: "https://react.dev/reference/react",
          desc: "Full API reference for all built-in hooks.",
        },
        {
          label: "React Patterns",
          url: "https://reactpatterns.com",
          desc: "Common component patterns with code examples.",
        },
        {
          label: "Josh Comeau's Blog",
          url: "https://www.joshwcomeau.com",
          desc: "Deep visual explanations of React internals and CSS.",
        },
      ],
      checklist: [
        { id: "r-keys", label: "Use stable unique keys in lists (never index for reorderable lists)" },
        { id: "r-memo", label: "Wrap expensive child components with React.memo" },
        { id: "r-cb", label: "Stabilize callbacks with useCallback when passed to memoized children" },
        { id: "r-usememo", label: "useMemo only for genuinely expensive computations" },
        { id: "r-effect", label: "No fetch calls inside useEffect without cleanup / AbortController" },
        { id: "r-suspense", label: "Wrap async boundaries with Suspense + meaningful fallback" },
        { id: "r-error", label: "ErrorBoundary around feature trees" },
        { id: "r-a11y", label: "Interactive elements are buttons/links with ARIA labels" },
        { id: "r-devtools", label: "React DevTools profiler used to identify slow renders" },
        { id: "r-strict", label: "StrictMode enabled in development" },
      ],
    },
    {
      id: "angular",
      label: "Angular",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["angular"],
      concepts: [
        {
          title: "Component Architecture",
          body: "Angular components are the building blocks of the UI. Each component has a template, styles, and a class with lifecycle hooks. Use @Input/@Output for parent-child communication.",
        },
        {
          title: "Dependency Injection (DI)",
          body: "Angular's hierarchical DI system creates injectors at module, component, and directive levels. Use providedIn: 'root' for app-wide singletons, component-level providers for scoped instances.",
        },
        {
          title: "Change Detection",
          body: "Default strategy checks all components on every async event. OnPush limits checks to when @Input references change or events fire inside the component — critical for performance at scale.",
        },
        {
          title: "Signals (Angular 16+)",
          body: "Signals are reactive primitives that trigger surgical change detection without zones. Use signal(), computed(), and effect() for fine-grained reactivity without RxJS overhead.",
        },
        {
          title: "RxJS & Observables",
          body: "Angular uses RxJS for async data streams (HTTP, forms, router). Key operators: switchMap, mergeMap, takeUntilDestroyed. Always unsubscribe to prevent memory leaks.",
        },
        {
          title: "Modules & Standalone Components",
          body: "NgModules group related components/directives/pipes. Standalone components (Angular 15+) skip NgModule declarations — the recommended approach for new Angular apps.",
        },
      ],
      resources: [
        {
          label: "Angular Official Docs",
          url: "https://angular.dev",
          desc: "Official Angular documentation with interactive tutorials.",
        },
        {
          label: "Angular University Blog",
          url: "https://blog.angular-university.io",
          desc: "In-depth articles on Signals, RxJS, and Angular patterns.",
        },
        {
          label: "RxJS Docs",
          url: "https://rxjs.dev",
          desc: "Full RxJS operator reference — essential for Angular async.",
        },
        {
          label: "Angular Style Guide",
          url: "https://angular.dev/style-guide",
          desc: "Official naming conventions, folder structure, and best practices.",
        },
      ],
      checklist: [
        { id: "a-onpush", label: "Use OnPush change detection on all non-root components" },
        { id: "a-signals", label: "Prefer Signals over manual RxJS for local component state" },
        { id: "a-track", label: "Use trackBy / @for track in all *ngFor / @for loops" },
        { id: "a-takeuntil", label: "Unsubscribe observables with takeUntilDestroyed or async pipe" },
        { id: "a-standalone", label: "New components use standalone: true (skip NgModules)" },
        { id: "a-lazy", label: "Lazy load feature routes with loadComponent / loadChildren" },
        { id: "a-guards", label: "Route guards for authentication and authorization" },
        { id: "a-resolvers", label: "Resolve critical data before route activation" },
        { id: "a-httperror", label: "Global HTTP error interceptor for auth and error handling" },
        { id: "a-reactive", label: "Use Reactive Forms (not template-driven) for complex forms" },
      ],
    },
    {
      id: "vue",
      label: "Vue.js",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["vue", "composition-api", "options-api", "reactivity", "pinia", "directives"],
      concepts: [
        {
          title: "Composition API vs Options API",
          body: "Options API organizes code by option type (data, methods, computed, watch) — intuitive for simple components but scatters related logic. Composition API (Vue 3) uses setup() and composables to co-locate logic by feature. Better TypeScript support and easier to extract reusable logic. Composition API is recommended for all new Vue 3 projects.",
        },
        {
          title: "Reactivity System (Proxy-based)",
          body: "Vue 3 uses ES Proxy for automatic dependency tracking. reactive() wraps objects in a Proxy — accessing a property inside computed/watchEffect registers it as a dependency. ref() wraps primitives in an object with a .value getter/setter. Computed values are lazy and cached. The system re-renders only the components whose reactive state changed.",
        },
        {
          title: "Pinia State Management",
          body: "Pinia is the official Vue state management library (Vuex successor). Stores are defined with defineStore(id, { state, getters, actions }). No mutations — just actions that directly modify state. Full TypeScript inference, devtools integration, composables-based design. Lighter and simpler than Vuex.",
        },
        {
          title: "Key Directives",
          body: "v-if/v-else: removes/inserts DOM (use for infrequent toggles). v-show: toggles CSS display (use for frequent toggles). v-for with :key: list rendering — always add a stable key. v-bind (:): dynamic attributes/props. v-on (@): event listeners. v-model: two-way binding for form inputs. v-slot: scoped slots for flexible component APIs.",
        },
        {
          title: "Computed vs Watchers",
          body: "Computed: declarative derived values, cached until reactive dependencies change, return a value. Use for derived UI data. watch: imperative side-effects on value change, use for async operations (API calls). watchEffect: runs immediately and re-runs when any reactive dependency accessed inside changes. Prefer computed over watch wherever possible.",
        },
        {
          title: "Component Communication",
          body: "Parent → Child: props (defineProps). Child → Parent: emit (defineEmits, $emit). Siblings / Cross-tree: Pinia store or provide/inject. provide/inject passes data down the component tree without prop-drilling — ideal for plugin-level or feature-level shared state.",
        },
      ],
      resources: [
        {
          label: "Vue 3 Official Docs",
          url: "https://vuejs.org/guide/introduction",
          desc: "Official guide covering Composition API, reactivity, and ecosystem.",
        },
        {
          label: "Pinia Docs",
          url: "https://pinia.vuejs.org",
          desc: "Official Pinia state management documentation with recipes.",
        },
        {
          label: "Vue School",
          url: "https://vueschool.io",
          desc: "Video courses on Vue 3, Nuxt, and Composition API patterns.",
        },
        {
          label: "VueUse",
          url: "https://vueuse.org",
          desc: "Collection of 200+ composable utilities for Vue — essential reference.",
        },
      ],
      checklist: [
        { id: "v-composition", label: "Use Composition API with <script setup> (not Options API)" },
        { id: "v-key", label: "Stable unique :key on all v-for loops (never index for reorderable lists)" },
        { id: "v-pinia", label: "Global state managed with Pinia (not Vuex)" },
        { id: "v-computed", label: "Derived values use computed() — not methods called in template" },
        { id: "v-emit", label: "Child-to-parent via defineEmits — no direct parent mutation" },
        { id: "v-lazy", label: "Routes lazy-loaded with defineAsyncComponent or dynamic import" },
        { id: "v-show", label: "v-show for frequent toggles; v-if for conditional rendering" },
        { id: "v-devtools", label: "Vue DevTools used to inspect component tree and state" },
        { id: "v-types", label: "Props fully typed with defineProps<{ ... }>()" },
        { id: "v-vueuse", label: "VueUse composables used before writing custom reactive utils" },
      ],
    },
    {
      id: "svelte",
      label: "Svelte",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["svelte", "compiler", "runes", "stores", "svelte5"],
      concepts: [
        {
          title: "Compiler, Not a Runtime",
          body: "Svelte is a compiler — it transforms .svelte files into optimized vanilla JavaScript at build time. No virtual DOM, no runtime diffing. Updates are surgical direct DOM mutations. Result: smaller bundles, faster runtime, and zero framework overhead at runtime. Tradeoff: smaller ecosystem than React/Vue.",
        },
        {
          title: "Svelte 5 Runes",
          body: "Runes replace Svelte 4's implicit reactivity with explicit primitives: $state() for reactive state, $derived() for computed values (replaces $:), $effect() for side effects, $props() for component props. More predictable than Svelte 4's 'assigning to a variable = reactive'. Better TypeScript support.",
        },
        {
          title: "Stores (Svelte 4 / Compatible)",
          body: "Stores are observable objects with a subscribe method. Built-ins: writable(value), readable(value, start), derived(stores, fn). The $ prefix auto-subscribes and unsubscribes in templates: $count auto-manages the lifecycle. Custom stores wrap writable with domain logic. No context/provider needed for global state.",
        },
        {
          title: "Two-Way Binding",
          body: "bind:value on inputs creates two-way data binding without explicit event handlers. bind:this captures a DOM element reference. Component bindings (bind:checked, bind:group) work on both native elements and custom components. Use sparingly — prefer explicit event handling for clarity in larger components.",
        },
        {
          title: "Transitions & Animations",
          body: "Svelte has built-in transition directives: transition:fade, fly, slide, scale, draw (SVG). in: / out: for enter/leave separately. animate:flip for list reordering animations. Custom transitions are functions returning CSS delay/duration/css or tick callbacks. Minimal code for polished, accessible animations.",
        },
        {
          title: "SvelteKit (Meta-framework)",
          body: "SvelteKit is Svelte's equivalent to Next.js: file-based routing, SSR/SSG/ISR, form actions (like Server Actions), progressive enhancement, adapter-based deployment (Vercel, Node, Cloudflare, static). load functions run on server or client based on context. Recommended for all production Svelte apps.",
        },
      ],
      resources: [
        {
          label: "Svelte Docs",
          url: "https://svelte.dev/docs",
          desc: "Official Svelte documentation including Runes and migration guides.",
        },
        {
          label: "SvelteKit Docs",
          url: "https://kit.svelte.dev/docs",
          desc: "SvelteKit full-stack framework documentation.",
        },
        {
          label: "Svelte Tutorial",
          url: "https://learn.svelte.dev",
          desc: "Official interactive tutorial covering all Svelte and SvelteKit concepts.",
        },
        {
          label: "Svelte Society",
          url: "https://sveltesociety.dev",
          desc: "Community recipes, packages, and a component directory.",
        },
      ],
      checklist: [
        { id: "sv-runes", label: "Use Svelte 5 Runes ($state, $derived, $effect) in new code" },
        { id: "sv-key", label: "{#each items as item (item.id)} — always key lists" },
        { id: "sv-lazy", label: "Routes and heavy components lazy-loaded with dynamic import" },
        { id: "sv-sveltekit", label: "Production apps use SvelteKit (not bare Svelte)" },
        { id: "sv-actions", label: "Form actions used for mutations — not fetch in event handlers" },
        { id: "sv-a11y", label: "Svelte a11y warnings resolved — no aria-label missing" },
        { id: "sv-transitions", label: "Transitions added to lists and modal-like UI for polish" },
        { id: "sv-types", label: "Props typed via $props() with TypeScript interfaces" },
        { id: "sv-stores", label: "Cross-component state via Svelte stores or Rune-based context" },
        { id: "sv-bundle", label: "Bundle analyzed — no unexpected large dependencies" },
      ],
    },
    {
      id: "nextjs",
      label: "Next.js",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["nextjs"],
      concepts: [
        {
          title: "App Router vs Pages Router",
          body: "App Router (/app directory, Next.js 13+): React Server Components by default, co-located layouts/loading/error, Server Actions. Pages Router (/pages): legacy model, all client-side. Use App Router for all new projects.",
        },
        {
          title: "React Server Components (RSC)",
          body: "Server Components render exclusively on the server — no JS bundle shipped. They can query databases and call APIs directly. Add 'use client' directive only when hooks or browser APIs are needed.",
        },
        {
          title: "Data Fetching Strategies",
          body: "SSR: fetch per request (no-store). SSG: fetch at build time (force-cache). ISR: static with revalidation interval. On-demand revalidation via revalidatePath() or revalidateTag().",
        },
        {
          title: "Server Actions",
          body: "Async functions marked 'use server' that run on the server, callable from Client Components. Replace API routes for form mutations and simple writes. Support progressive enhancement.",
        },
        {
          title: "Caching Model",
          body: "Next.js has multiple cache layers: Request Memoization (per render), Data Cache (persistent across requests), Full Route Cache (static HTML/RSC payload), Router Cache (client-side).",
        },
        {
          title: "Middleware",
          body: "Runs on the Edge before requests hit pages. Use for auth redirects, A/B testing, geolocation, and custom headers. Matches routes via matcher config in next.config.",
        },
      ],
      resources: [
        {
          label: "Next.js Docs",
          url: "https://nextjs.org/docs",
          desc: "Official documentation with full App Router guide.",
        },
        {
          label: "Next.js Learn",
          url: "https://nextjs.org/learn",
          desc: "Official interactive course — dashboard app from scratch.",
        },
        {
          label: "Vercel Blog",
          url: "https://vercel.com/blog",
          desc: "Deep dives on caching, RSC, and Next.js internals.",
        },
        {
          label: "Next.js Examples",
          url: "https://github.com/vercel/next.js/tree/canary/examples",
          desc: "Official example repos for auth, i18n, databases, and more.",
        },
      ],
      checklist: [
        { id: "n-rsc", label: "Default to Server Components; add 'use client' only where needed" },
        { id: "n-cache", label: "Set explicit fetch cache behavior (no-store vs force-cache)" },
        { id: "n-revalidate", label: "ISR pages use revalidate for time-based invalidation" },
        { id: "n-actions", label: "Server Actions used for mutations (no API route boilerplate)" },
        { id: "n-suspense", label: "Streaming with Suspense boundaries for slow data" },
        { id: "n-meta", label: "generateMetadata() function per page for SEO" },
        { id: "n-image", label: "All images use next/image (lazy load, responsive, WebP)" },
        { id: "n-link", label: "Navigation uses next/link (prefetching enabled)" },
        { id: "n-env", label: "Sensitive secrets in NEXT_PUBLIC_ only when intentional" },
        { id: "n-middleware", label: "Auth checks in middleware — not duplicated in every layout" },
      ],
    },
  ],
};
