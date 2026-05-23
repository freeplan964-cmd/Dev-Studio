export interface PlannerSeedItem {
  title: string;
  description?: string;
  priority: string;
  category: string;
  estimatedMinutes?: number;
}

export const W1_WORK: PlannerSeedItem[] = [
  {
    title: "Set up Docker environment",
    description: "Containerise dev stack with docker-compose",
    priority: "high",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "Configure CI/CD pipeline",
    description: "GitHub Actions: build, test, deploy stages",
    priority: "high",
    category: "work",
    estimatedMinutes: 120,
  },
  {
    title: "Review SSH key rotation policy",
    description: "Audit and rotate all access credentials",
    priority: "medium",
    category: "work",
    estimatedMinutes: 60,
  },
  {
    title: "Harden Nginx server config",
    description: "TLS 1.3, security headers, rate limiting",
    priority: "medium",
    category: "work",
    estimatedMinutes: 60,
  },
  {
    title: "Audit firewall rules & open ports",
    description: "UFW review and close unnecessary ports",
    priority: "high",
    category: "work",
    estimatedMinutes: 45,
  },
];

export const W1_LEARN: PlannerSeedItem[] = [
  {
    title: "Study Kubernetes architecture",
    description: "Pods, services, deployments overview",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 60,
  },
  {
    title: "Read OWASP Top 10 2024",
    description: "Focus on injection & broken auth sections",
    priority: "high",
    category: "learning",
    estimatedMinutes: 45,
  },
  {
    title: "Practice: write Ansible playbook",
    description: "Automate nginx install on Ubuntu",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 90,
  },
];

export const W2_WORK: PlannerSeedItem[] = [
  {
    title: "Optimize slow PostgreSQL queries",
    description: "Use EXPLAIN ANALYZE on top 5 heavy queries",
    priority: "high",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "Design normalised DB schema",
    description: "3NF for new feature — draw ER diagram first",
    priority: "high",
    category: "work",
    estimatedMinutes: 120,
  },
  {
    title: "Build web scraper with Playwright",
    description: "Scrape product listings, output to JSON",
    priority: "medium",
    category: "work",
    estimatedMinutes: 120,
  },
  {
    title: "Set up ETL data pipeline",
    description: "Extract → transform → load into PostgreSQL",
    priority: "medium",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "Add Redis caching layer",
    description: "Cache hot API responses, set TTL policies",
    priority: "medium",
    category: "work",
    estimatedMinutes: 60,
  },
];

export const W2_LEARN: PlannerSeedItem[] = [
  {
    title: "Study SQL indexing strategies",
    description: "B-tree vs GiST, partial indexes, INCLUDE columns",
    priority: "high",
    category: "learning",
    estimatedMinutes: 60,
  },
  {
    title: "Scrapy vs Playwright — deep dive",
    description: "When to use each, anti-bot evasion basics",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 45,
  },
  {
    title: "Read: database internals chapter",
    description: "Storage engines, WAL, MVCC concepts",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 60,
  },
];

export const W3_WORK: PlannerSeedItem[] = [
  {
    title: "Refactoring session: remove duplication",
    description: "Apply DRY principle across service layer",
    priority: "medium",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "LeetCode: 3 medium problems",
    description: "Focus: trees, sliding window, binary search",
    priority: "medium",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "Code review & PR feedback",
    description: "Review team PRs with thorough comments",
    priority: "high",
    category: "work",
    estimatedMinutes: 60,
  },
  {
    title: "Write unit tests for core module",
    description: "Aim for 80%+ coverage on business logic",
    priority: "high",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "Organise study materials & notes",
    description: "Consolidate Obsidian notes, add tags",
    priority: "low",
    category: "work",
    estimatedMinutes: 30,
  },
];

export const W3_LEARN: PlannerSeedItem[] = [
  {
    title: "Read Clean Code — 2 chapters",
    description: "Focus: functions & comments chapters",
    priority: "high",
    category: "learning",
    estimatedMinutes: 60,
  },
  {
    title: "Study SOLID principles with examples",
    description: "Write code examples for each principle",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 60,
  },
  {
    title: "Watch: system design interview video",
    description: "Design a URL shortener end-to-end",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 45,
  },
];

export const W4_WORK: PlannerSeedItem[] = [
  {
    title: "Build React component library",
    description: "Button, Input, Modal with Storybook docs",
    priority: "high",
    category: "work",
    estimatedMinutes: 120,
  },
  {
    title: "Implement global state with Zustand",
    description: "Auth, theme, notifications store slices",
    priority: "medium",
    category: "work",
    estimatedMinutes: 90,
  },
  {
    title: "CSS animations: micro-interactions",
    description: "Hover effects, skeleton loaders, transitions",
    priority: "medium",
    category: "work",
    estimatedMinutes: 60,
  },
  {
    title: "Performance audit with Lighthouse",
    description: "Aim for 95+ score on all metrics",
    priority: "high",
    category: "work",
    estimatedMinutes: 60,
  },
  {
    title: "Responsive layout: mobile-first pass",
    description: "Review all pages on 375px and 768px",
    priority: "medium",
    category: "work",
    estimatedMinutes: 60,
  },
];

export const W4_LEARN: PlannerSeedItem[] = [
  {
    title: "Study Next.js App Router docs",
    description: "Server components, layouts, route handlers",
    priority: "high",
    category: "learning",
    estimatedMinutes: 60,
  },
  {
    title: "Tailwind CSS v4 — new features",
    description: "CSS variables theming, logical properties",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 45,
  },
  {
    title: "Accessibility: WCAG 2.2 checklist",
    description: "Apply Level AA to current project",
    priority: "medium",
    category: "learning",
    estimatedMinutes: 60,
  },
];

export const ACTIVITIES: PlannerSeedItem[] = [
  {
    title: "Morning review & daily planning",
    description: "Set 3 priorities, check messages, review plan",
    priority: "high",
    category: "activities",
    estimatedMinutes: 15,
  },
  {
    title: "Exercise / movement break",
    description: "30 min walk, gym, or stretching session",
    priority: "medium",
    category: "activities",
    estimatedMinutes: 30,
  },
  {
    title: "End-of-day wrap-up & reflection",
    description: "Log wins, blockers, and tomorrow's top task",
    priority: "medium",
    category: "activities",
    estimatedMinutes: 15,
  },
];

export const PRESET_FOOD = [
  { title: "Breakfast", time: "" },
  { title: "Lunch", time: "" },
  { title: "Dinner", time: "" },
  { title: "Morning hydration", time: "" },
  { title: "Evening supplements", time: "" },
];

export const PRESET_SPORTS = [
  { title: "Strength training", time: "" },
  { title: "Morning walk", time: "" },
  { title: "Cardio / run", time: "" },
  { title: "Yoga / stretching", time: "" },
  { title: "Sports session", time: "" },
];

export const PRESET_CARE = [
  { title: "Morning grooming", time: "" },
  { title: "Shower / bath", time: "" },
  { title: "Skincare routine", time: "" },
  { title: "Meditation", time: "" },
  { title: "Sleep prep", time: "" },
];

export const PRESET_WORKING = [
  { title: "Deep work block", time: "" },
  { title: "Code review", time: "" },
  { title: "Planning session", time: "" },
  { title: "Email & Slack", time: "" },
  { title: "Team standup", time: "" },
];

export const PRESET_LEARNING = [
  { title: "Read documentation", time: "" },
  { title: "Watch tutorial", time: "" },
  { title: "Practice exercises", time: "" },
  { title: "Review notes", time: "" },
  { title: "Build a project", time: "" },
];

export const WORKING_SUGGESTIONS = [
  {
    iconName: "Briefcase",
    label: "Deep work block",
    bestTime: "09:00 – 11:00",
    reason: "Peak focus window",
  },
  {
    iconName: "Timer",
    label: "Pomodoro × 4",
    bestTime: "10:00 – 12:00",
    reason: "4 × 25-min sprints",
  },
  {
    iconName: "Coffee",
    label: "Morning standup",
    bestTime: "09:00 – 09:15",
    reason: "Quick daily sync",
  },
  {
    iconName: "MessageSquare",
    label: "Email & Slack",
    bestTime: "12:30 – 13:00",
    reason: "Batch check after lunch",
  },
];

export const LEARNING_SUGGESTIONS = [
  {
    iconName: "BookOpen",
    label: "Read docs",
    bestTime: "08:00 – 09:00",
    reason: "Fresh morning mind",
  },
  {
    iconName: "Monitor",
    label: "Watch tutorial",
    bestTime: "14:00 – 15:00",
    reason: "Post-lunch learning",
  },
  {
    iconName: "FileCode2",
    label: "Practice / build",
    bestTime: "15:00 – 17:00",
    reason: "Apply what you learned",
  },
  {
    iconName: "BedDouble",
    label: "Review notes",
    bestTime: "21:00 – 21:30",
    reason: "Before sleep — boosts retention",
  },
];

export const PRAYER_SUGGESTIONS_TEMPLATES = {
  food: [
    {
      iconName: "Coffee",
      label: "Breakfast",
      offsetStart: 20,
      offsetEnd: 60,
      anchor: "Fajr",
      fallbackTime: "06:30 – 08:00",
      fallbackReason: "After Fajr prayer",
      reasonTemplate: "20–60 min after Fajr",
    },
    {
      iconName: "Salad",
      label: "Lunch",
      offsetStart: 15,
      offsetEnd: 75,
      anchor: "Dhuhr",
      fallbackTime: "12:30 – 13:30",
      fallbackReason: "After Dhuhr prayer",
      reasonTemplate: "After Dhuhr prayer",
    },
    {
      iconName: "UtensilsCrossed",
      label: "Dinner",
      offsetStart: 15,
      offsetEnd: 75,
      anchor: "Maghrib",
      fallbackTime: "19:30 – 20:30",
      fallbackReason: "After Maghrib prayer",
      reasonTemplate: "After Maghrib prayer",
    },
  ],
  sports: [
    {
      iconName: "Dumbbell",
      label: "Strength training",
      anchorStart: "Fajr",
      offsetStart: 70,
      anchorEnd: "Dhuhr",
      offsetEnd: -60,
      fallbackTime: "08:00 – 10:00",
      fallbackReason: "After breakfast, high energy",
      reasonTemplate: "Post-breakfast energy peak",
    },
    {
      iconName: "Footprints",
      label: "Walk / cardio",
      anchorStart: "Asr",
      offsetStart: 20,
      anchorEnd: "Maghrib",
      offsetEnd: -20,
      fallbackTime: "15:30 – 17:00",
      fallbackReason: "Before Maghrib, cooler air",
      reasonTemplate: "Asr → Maghrib window, cool air",
    },
    {
      iconName: "HeartPulse",
      label: "Yoga / stretch",
      anchorStart: "Fajr",
      offsetStart: 5,
      offsetEnd: 35,
      anchor: "Fajr",
      fallbackTime: "05:30 – 06:00",
      fallbackReason: "Before Fajr, peaceful time",
      reasonTemplate: "Right after Fajr, peaceful",
    },
  ],
  care: [
    {
      iconName: "Sparkles",
      label: "Morning grooming",
      anchorStart: "Fajr",
      offsetStart: -20,
      offsetEnd: 0,
      anchor: "Fajr",
      fallbackTime: "06:00 – 06:30",
      fallbackReason: "Before Fajr, fresh start",
      reasonTemplate: "Before Fajr, fresh start",
    },
    {
      iconName: "Droplets",
      label: "Shower / bath",
      anchorStart: "Maghrib",
      offsetStart: 20,
      offsetEnd: 50,
      anchor: "Maghrib",
      fallbackTime: "20:00 – 21:00",
      fallbackReason: "After Maghrib, wind down",
      reasonTemplate: "After Maghrib, relax",
    },
    {
      iconName: "BedDouble",
      label: "Sleep routine",
      anchorStart: "Isha",
      offsetStart: 60,
      offsetEnd: 90,
      anchor: "Isha",
      fallbackTime: "22:00 – 23:00",
      fallbackReason: "After Isha, restful night",
      reasonTemplate: "90 min after Isha, quality sleep",
    },
  ],
};

