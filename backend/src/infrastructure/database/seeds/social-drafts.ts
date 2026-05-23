const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export interface SocialDraftSeed {
  id: string;
  platform: "twitter" | "linkedin" | "instagram";
  content: string;
  mediaUrls: string[];
  createdAt: number;
  updatedAt: number;
}

export const seedSocialDrafts: SocialDraftSeed[] = [
  {
    id: "soc_1",
    platform: "linkedin",
    content: `Just shipped a feature I've been thinking about for weeks — a command palette (Cmd+K) for navigating between all your dev assets instantly.

No more clicking through tabs. Just start typing and jump straight to any prompt, agent, snippet, or component.

Built with cmdk + TanStack Router + Zustand. The trick was keeping the full index in memory and debouncing search to 120ms — fast enough to feel instant, slow enough not to thrash.

What QoL features do you build into your own tools first? 👇`,
    mediaUrls: [],
    createdAt: d(3),
    updatedAt: d(1),
  },
  {
    id: "soc_2",
    platform: "linkedin",
    content: `6 months of freelancing as a dev. 3 lessons that changed everything:

1. Scope creep is the enemy — put every requirement in writing before touching code. "We'll figure it out" is a red flag.

2. Hourly vs fixed price: fixed is better for well-defined deliverables, hourly for ambiguous R&D work. Never do fixed on R&D.

3. Your best clients come from referrals, not cold outreach. One happy client is worth 50 cold emails.

Building in public has been the single biggest lever for attracting inbound quality clients.

What would you add?`,
    mediaUrls: [],
    createdAt: d(10),
    updatedAt: d(8),
  },
  {
    id: "soc_3",
    platform: "twitter",
    content: `hot take: the best thing about TypeScript isn't type safety

it's the tooling

autocomplete that actually works, refactors that don't silently break things, errors before you even run the code

the types are just how you unlock the real value`,
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
→ put everything in writing, always

took me 2 years to learn all of this the hard way`,
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
  {
    id: "soc_6",
    platform: "twitter",
    content: `the best code review feedback I ever got:

"this is clever. that's the problem."

took me a year to fully understand it

now it's my north star for every function I write`,
    mediaUrls: [],
    createdAt: d(14),
    updatedAt: d(13),
  },
  {
    id: "soc_7",
    platform: "linkedin",
    content: `I've been using AI coding tools daily for a year. Here's what I've actually learned:

❌ AI won't replace you if you do this:
- Write the spec yourself (AI can't know your constraints)
- Review every line it outputs (it's confidently wrong ~20% of the time)
- Use it for boilerplate, not architecture

✅ Where it genuinely 10x'd my speed:
- Test generation — I describe behavior, it writes assertions
- Docs — transform rough notes into polished READMEs
- Prototyping — rough out a UI in minutes, refine from there

The devs getting left behind aren't the ones refusing AI. They're the ones using it as a crutch instead of a tool.`,
    mediaUrls: [],
    createdAt: d(18),
    updatedAt: d(17),
  },
  {
    id: "soc_8",
    platform: "twitter",
    content: `my 3-layer debugging process for production issues:

1. check logs first. always. obvious but people skip it.
2. reproduce locally with production data shape
3. add observability BEFORE fixing — you'll need it when it happens again

the fix is the last step, not the first`,
    mediaUrls: [],
    createdAt: d(21),
    updatedAt: d(20),
  },
  {
    id: "soc_9",
    platform: "instagram",
    content: `3 books that changed how I think about software 📚

1. A Philosophy of Software Design — Ousterhout
   → complexity is the enemy. deep modules, simple interfaces.

2. The Pragmatic Programmer — Hunt & Thomas
   → you are your craft. own it.

3. Designing Data-Intensive Applications — Kleppmann
   → finally understood distributed systems

Which one would you add? 👇

#softwaredevelopment #programming #bookrecommendations`,
    mediaUrls: [],
    createdAt: d(30),
    updatedAt: d(29),
  },
  {
    id: "soc_10",
    platform: "linkedin",
    content: `I used to think senior devs wrote better code.

After working with a few, I realized: senior devs write less code.

They ask "do we actually need this?" before building.
They delete features instead of adding configuration.
They choose boring technology that works over clever technology that's exciting.

The best engineers I've worked with have all had one thing in common: they're comfortable with "no, we don't need that."

That instinct is worth more than any framework knowledge.`,
    mediaUrls: [],
    createdAt: d(40),
    updatedAt: d(39),
  },
];
