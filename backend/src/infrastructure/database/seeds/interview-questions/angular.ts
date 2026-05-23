import type { InterviewQuestionSeed } from "./types.js";

const now = Date.now();

export const angularQuestions: InterviewQuestionSeed[] = [
  {
    id: "iq_ang_1",
    area: "frontend",
    difficulty: "junior",
    category: "Angular",
    question: "What is the difference between Components and Directives in Angular?",
    answer: "Component: a directive with a template. It defines a view and controls its logic via templates/styles. Directive: attaches behavior, modifies DOM, or alters layout of elements without a dedicated template. Categories of directives: structural (alter DOM layout, e.g., *ngIf) and attribute (alter appearance/behavior, e.g., ngStyle).",
    tags: ["angular", "components", "directives"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_ang_2",
    area: "frontend",
    difficulty: "mid",
    category: "Angular",
    question: "Explain Angular's dependency injection (DI) system and hierarchical injectors.",
    answer: "Angular has a hierarchical DI system. Injectors are created at module, component, or directive levels. Resolution bubbles up: if a dependency isn't found at the current level, it checks the parent injector up to the root/platform injector. Use `providedIn: 'root'` for singletons, or list in `providers: []` of a component to scope the dependency to that component and its children.",
    tags: ["angular", "dependency-injection", "architecture"],
    createdAt: now,
  },
  {
    id: "iq_ang_3",
    area: "frontend",
    difficulty: "mid",
    category: "Angular",
    question: "What are Angular Signals and how do they differ from RxJS?",
    answer: "Signals (Angular 16+) are reactive values that notify consumers when they change. Unlike RxJS observables, Signals do not require subscriptions/unsubscriptions, are synchronous, always have a value, and trigger change detection surgically without zones. Use Signals for state management and local UI reactivity; use RxJS for asynchronous event streams, HTTP requests, and complex operator piping.",
    tags: ["angular", "signals", "rxjs", "reactivity"],
    createdAt: now,
  },
  {
    id: "iq_ang_4",
    area: "frontend",
    difficulty: "mid",
    category: "Angular",
    question: "Explain Change Detection in Angular (Default vs OnPush).",
    answer: "Default: Angular checks all components from top to bottom on any event/async operation (zones). OnPush: component is only checked when input references change (@Input), an event handler inside triggers, or change detection is run manually (cdr.markForCheck()). OnPush improves performance by skipping unchanged subtrees.",
    tags: ["angular", "change-detection", "performance"],
    createdAt: now,
  },
];
