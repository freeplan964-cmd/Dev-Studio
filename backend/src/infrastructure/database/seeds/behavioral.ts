const now = Date.now();

export interface BehavioralQuestionSeed {
  id: string;
  area: "softskills";
  difficulty: "junior" | "mid" | "senior";
  question: string;
  answer: string;
  tags: string[];
  favorite?: boolean;
  createdAt: number;
}

export const defaultQuestions: BehavioralQuestionSeed[] = [
  {
    id: "b11b5e02-4919-4a9f-a89a-41bf762e5b8d",
    area: "softskills",
    difficulty: "mid",
    question: "Tell Me About Yourself",
    answer: "Use the Present → Past → Future formula. Present: your current role and what you deliver. Past: the experience that made you effective at it. Future: why this role is the next logical step. Keep it under 2 minutes. Never start with your university — start with your value.",
    tags: ["behavioral", "default"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "225b6a7a-6240-410a-8bf7-e179219ea2b0",
    area: "softskills",
    difficulty: "mid",
    question: "What Is Your Greatest Strength?",
    answer: "Pick ONE specific strength. Back it with a concrete example (STAR: Situation, Task, Action, Result). Connect it directly to the role you're interviewing for. 'I'm a hard worker' is a red flag — 'I debug complex distributed systems quickly' is a strength.",
    tags: ["behavioral", "default"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "a57e62a3-f0bd-4fa6-848e-d9c490fb1b6c",
    area: "softskills",
    difficulty: "mid",
    question: "What Is Your Greatest Weakness?",
    answer: "Avoid fake weaknesses ('I work too hard'). Pick a real one that you're actively improving. Framework: name the weakness → show self-awareness → show what you've done to address it → show evidence of improvement.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "67cd0fa6-1e64-4e2e-b6be-d8869c0d12df",
    area: "softskills",
    difficulty: "mid",
    question: "Why Do You Want to Work Here?",
    answer: "This tests whether you researched the company. Answer requires: (1) something specific about their product/mission/culture that genuinely excites you, (2) how your skills connect to their current challenges, (3) what you want to learn or build there.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "e06c7d1e-8e4a-4712-ae78-5a21db597148",
    area: "softskills",
    difficulty: "mid",
    question: "Where Do You See Yourself in 5 Years?",
    answer: "They're asking: will you leave in 6 months, and do you have ambition? Show growth ambition within the domain. 'I want to go deeper in distributed systems and eventually lead architecture decisions for high-scale products' is strong.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "1e88e8b2-3b8c-4a3d-bf5c-a5b7d90d8157",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Manage Your Time & Priorities?",
    answer: "Walk them through your actual system — not a textbook answer. Mention: how you prioritise competing tasks (impact vs effort), how you handle interruptions, how you communicate when timelines shift. Use a real example.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "cf633a92-d352-4cf3-a7ad-e7ea6c28f090",
    area: "softskills",
    difficulty: "mid",
    question: "What Are Your Salary Expectations?",
    answer: "Do market research first (Glassdoor, Levels.fyi, LinkedIn Salary). Give a range anchored at the high end of reasonable. Don't give a single number — it anchors too low. Don't say 'whatever is fair' — it signals no self-worth.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "d09990e9-b50a-4da2-bbbd-21501bfa82a1",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Handle Conflict or Pressure?",
    answer: "Use a real story. STAR method: the conflict (Situation), your role (Task), what you actually did (Action), the outcome (Result). Show that you addressed the issue directly, kept the relationship intact, and focused on the problem not the person.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "83e5828d-192a-43c3-8833-288219abf558",
    area: "softskills",
    difficulty: "mid",
    question: "Tell Me About a Challenge You Overcame",
    answer: "STAR method is non-negotiable here. Pick a challenge that was genuinely hard. The Action phase is the longest: break down exactly what YOU did. The Result must be measurable or at least concrete. Common mistake: 80% on situation, 20% on action — flip it.",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
  {
    id: "f11d6cc2-3788-4db8-b5ad-29cf6cf8e734",
    area: "softskills",
    difficulty: "mid",
    question: "Do You Have Any Questions for Us?",
    answer: "Always have 3 prepared. Never say 'no, I think you covered everything.' Good questions: 'What does success look like in the first 90 days?', 'What's the biggest technical challenge the team faces?', 'How do you handle disagreements on technical direction?'",
    tags: ["behavioral", "default"],
    createdAt: now,
  },
];

export const suggestedQuestions: BehavioralQuestionSeed[] = [
  {
    id: "b11b6d05-4f30-4e4b-97a6-bf88849bbf28",
    area: "softskills",
    difficulty: "mid",
    question: "Tell Me About a Time You Failed",
    answer: "Own the failure completely — no excuses, no blame-shifting. Show self-awareness, what you learned, and most importantly, what changed afterward. The bigger the failure you can own, the more credible your growth story.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "d22883e0-6e3e-4860-bfa7-cf847d022b9f",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Handle Feedback?",
    answer: "Demonstrate that you actively seek feedback, not just receive it. Use a specific example: someone gave you hard feedback → you implemented it → measurable improvement resulted. 'I welcome feedback' with no example is worthless.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "9cc88a6d-e740-496a-85b5-79cfd86fb83e",
    area: "softskills",
    difficulty: "mid",
    question: "Tell Me About a Time You Disagreed With Your Manager",
    answer: "This tests: do you have a backbone, and can you disagree professionally? Answer structure: what was the disagreement → how you raised it (data, private conversation) → what happened → what you learned. No complaining.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "ee99e2a5-48fa-4a7b-a320-ebbf291fa278",
    area: "softskills",
    difficulty: "mid",
    question: "What Motivates You?",
    answer: "Connect your answer to the actual work in the role. 'Money' is honest but weak alone. 'I'm most alive when debugging a gnarly system issue and finding the root cause' shows self-awareness and role alignment.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "7ea783c1-7a70-4dbf-8b2b-cf0f1712a14e",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Prioritize When Everything Is Urgent?",
    answer: "Show a real framework: impact vs effort, business criticality, deadline dependency. Then give an example where you applied it. Bonus: mention how you communicate reprioritization to stakeholders.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "cc88c21a-e8e0-4a81-9f2b-88a2c2ffab51",
    area: "softskills",
    difficulty: "mid",
    question: "Tell Me About a Time You Led a Project",
    answer: "Even if you're not a manager — you've led initiatives. Focus: how you defined scope, aligned people, unblocked issues, and delivered. Leadership is influence, not title.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "4e7e9a8f-cc9e-4e8c-8fbd-177bf0e762c9",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Work With Ambiguity?",
    answer: "Senior engineers love this question because ambiguity is the norm. Show: you identify what you know vs don't know, ask the right questions to reduce it, make a reversible decision and move, then adjust. Don't say 'I ask my manager.'",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
  {
    id: "887cf45a-c8e4-4d87-bfdf-79bf9aa95d03",
    area: "softskills",
    difficulty: "mid",
    question: "How Do You Stay Current With Technology?",
    answer: "Be specific: newsletters you actually read, open-source you contribute to, projects you've built to experiment. 'I read tech blogs' is too vague. Give one concrete example from the last 3 months.",
    tags: ["behavioral", "suggested"],
    createdAt: now,
  },
];
