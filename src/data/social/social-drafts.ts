import type { SocialDraft } from "../../types/tools";

const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export const seedSocialDrafts: SocialDraft[] = [
  {
    id: "soc_1",
    platform: "linkedin",
    content: `Just shipped a feature I've been thinking about for weeks — a command palette (Cmd+K) for navigating between all your dev assets instantly.

No more clicking through tabs. Just start typing and jump straight to any prompt, agent, snippet, or component.

Built with cmdk + TanStack Router + some Zustand magic. The trick was keeping the index in memory and debouncing the search.

What QoL features do you build into your own tools first? 👇`,
    mediaUrls: [],
    createdAt: d(3),
    updatedAt: d(1),
  },
  {
    id: "soc_2",
    platform: "linkedin",
    content: `6 months of freelancing, 3 lessons learned:

1. Scope creep is the enemy — put everything in writing before starting
2. Hourly vs fixed: fixed is better for well-defined work, hourly for R&D
3. Your best clients come from referrals, not cold outreach

Building in public has been the single biggest lever for finding quality clients.

What would you add to the list?`,
    mediaUrls: [],
    createdAt: d(10),
    updatedAt: d(8),
  },
  {
    id: "soc_3",
    platform: "twitter",
    content: `hot take: the best thing about TypeScript isn't type safety

it's the tooling

autocomplete that actually works, refactors that don't break things, IDE errors before you even run the code

the types are just how you unlock the tooling`,
    mediaUrls: [],
    createdAt: d(5),
    updatedAt: d(4),
  },
  {
    id: "soc_4",
    platform: "twitter",
    content: `things I wish I knew before going freelance as a dev:

→ raise your rates sooner than you think
→ always have 3 months runway before quitting your job  
→ the proposal is half the work
→ bad clients don't get better with time
→ niching down doubles your close rate

took me 2 years to figure all of this out`,
    mediaUrls: [],
    createdAt: d(7),
    updatedAt: d(6),
  },
  {
    id: "soc_5",
    platform: "instagram",
    content: `My dev setup for 2026 ✦

Dark theme all day. Mechanical keyboard. Noise-cancelling headphones.

The tools change. The focus stays the same.

What's in your setup? Drop it below 👇

#developer #devsetup #coding #buildinpublic`,
    mediaUrls: [],
    createdAt: d(2),
    updatedAt: d(1),
  },
];
