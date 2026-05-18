import type { SkillAreaData } from "../../types/skills";
import {
  Heart, Mic, Handshake, Swords, Wifi, Terminal,
  GitPullRequest, RefreshCw, Clock, Sparkles, Brain, Repeat2, Trophy,
} from "lucide-react";

export const softSkillsArea: SkillAreaData = {
  id: "softskills",
  label: "Soft Skills",
  icon: Heart,
  description:
    "The human side of engineering — communication, leadership, and emotional intelligence.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "agenda", label: "Meeting has clear agenda & desired outcome" },
    { id: "feedback", label: "Feedback is specific, behavioral, and timely" },
    { id: "focus", label: "Deep work blocks scheduled in calendar" },
    { id: "listen", label: "Repeat back understanding before disagreeing" },
    { id: "write", label: "Key decisions documented in writing" },
    { id: "delegate", label: "Delegate the 'what', not the 'how'" },
  ],
  subAreas: [
    {
      id: "communication",
      label: "Communication",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["communication"],
      concepts: [
        {
          title: "Active Listening",
          body: "Repeat back what you heard before responding. Ask clarifying questions. In code review, comment on intent before style.",
        },
        {
          title: "Async Writing",
          body: "Lead with the conclusion (BLUF). Use bullet points for scanability. Record decisions and 'why' — future you will thank you.",
        },
        {
          title: "Technical Storytelling",
          body: "Frame trade-offs as 'option A buys X but costs Y'. Use diagrams for systems. Anchor numbers (latency, cost) before opinions.",
        },
        {
          title: "Stakeholder Translation",
          body: "Translate engineering jargon into business outcomes. 'Refactor' → 'reduces incident frequency'. 'Tech debt' → 'slowing feature velocity 30%'.",
        },
        {
          title: "1:1 Conversations",
          body: "Show up with one topic, not a status report. Ask open questions ('what's draining you?'). Silence is a tool — let people finish their thought.",
        },
        {
          title: "Disagree & Commit",
          body: "State your objection once, clearly, with evidence. If the team chooses otherwise, commit fully — no sabotage, no 'I told you so'.",
        },
        {
          title: "Written Standups",
          body: "Yesterday / Today / Blockers — kept under 5 lines. Tag people you need from. Async beats a 30-minute meeting for 6 people.",
        },
      ],
      resources: [
        {
          label: "Nonviolent Communication",
          url: "https://www.cnvc.org/",
          desc: "The foundational framework for empathy.",
        },
        {
          label: "Crucial Conversations",
          url: "https://cruciallearning.com/",
          desc: "Tools for talking when stakes are high.",
        },
        {
          label: "Never Split the Difference",
          url: "https://www.blackswanltd.com/",
          desc: "Tactical empathy and negotiation by an ex-FBI hostage negotiator.",
        },
      ],
    },
    {
      id: "speaking",
      label: "Public Speaking",
      icon: Mic,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["speaking", "presentations", "talks"],
      concepts: [
        {
          title: "Open With a Hook",
          body: "First 30 seconds decide whether the room listens. Start with a surprising number, a sharp question, or a 1-sentence story — never with 'My name is...'.",
        },
        {
          title: "Rule of Three",
          body: "Group ideas in threes: 3 problems, 3 reasons, 3 takeaways. The brain remembers triplets and forgets lists of seven.",
        },
        {
          title: "Slow Down, Then Slow Down Again",
          body: "Nerves push you to 1.5x speed. Mark deliberate pauses on your slides. A 2-second silence after a key point lands harder than any animation.",
        },
        {
          title: "Demo Discipline",
          body: "Record a backup video. Pre-stage data. Zoom your terminal to 18pt+. Never type a password on stage — paste from a notes file.",
        },
        {
          title: "Q&A Without Panic",
          body: "Repeat the question (buys time, helps the room). 'I don't know — I'll follow up' is a strong answer. Park hostile threads: 'great topic, let's chat after'.",
        },
      ],
      resources: [
        {
          label: "Talk Like TED",
          url: "https://www.ted.com/playlists",
          desc: "Watch 3 talks in your domain, copy what works, drop what doesn't.",
        },
        {
          label: "Presentation Zen",
          url: "https://presentationzen.com/",
          desc: "Slide design philosophy that kills bullet-heavy decks.",
        },
      ],
    },
    {
      id: "negotiation",
      label: "Negotiation",
      icon: Handshake,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["negotiation", "influence"],
      concepts: [
        {
          title: "Anchor First",
          body: "Whoever names the first number shapes the range. Research market data, then open at the high end of reasonable.",
        },
        {
          title: "Trade, Don't Concede",
          body: "Never give without getting. 'I can do that deadline if scope drops feature X' beats 'sure, no problem'.",
        },
        {
          title: "BATNA",
          body: "Know your Best Alternative To a Negotiated Agreement. If you have no walk-away option, you're not negotiating — you're begging.",
        },
      ],
    },
    {
      id: "leadership",
      label: "Leadership",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["leadership"],
      concepts: [
        {
          title: "Lead Without Authority",
          body: "Influence by demonstrating, not directing. Write the first RFC. Build the smallest reference implementation. Volunteer for the boring glue.",
        },
        {
          title: "Delegation",
          body: "Delegate outcomes, not steps. Give context, constraints, and a deadline. Trust the person to choose the path.",
        },
        {
          title: "Run Effective 1:1s",
          body: "Their agenda first, yours second. Weekly cadence, 30 minutes. Notes in a shared doc you both edit — career, blockers, feedback.",
        },
        {
          title: "Radical Candor",
          body: "Care personally + challenge directly. Praise in public, critique in private, always specific and timely.",
        },
      ],
      resources: [
        {
          label: "Extreme Ownership",
          url: "https://echelonfront.com/",
          desc: "Leadership principles from Navy SEALs.",
        },
        {
          label: "The Manager's Path",
          url: "https://www.oreilly.com/",
          desc: "Guide for tech leaders.",
        },
        {
          label: "Radical Candor",
          url: "https://www.radicalcandor.com/",
          desc: "Kim Scott's framework for honest, caring feedback.",
        },
      ],
    },
    {
      id: "problem-solving",
      label: "Problem Solving",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["problem-solving"],
      concepts: [
        {
          title: "First Principles",
          body: "Strip the problem to physical/logical truths. Rebuild from there. Avoid 'this is how we always do it' as a solution.",
        },
        {
          title: "5 Whys",
          body: "Ask 'why' five times to drive past symptoms to root cause. Pairs well with blameless post-mortems.",
        },
        {
          title: "Rubber Duck",
          body: "Explain the problem out loud to a duck (or a colleague who isn't even listening). The act of verbalizing exposes the gap.",
        },
        {
          title: "Inversion",
          body: "Instead of 'how do I succeed?', ask 'what guarantees failure?' — then avoid those. Often a faster path to the answer.",
        },
      ],
    },
    {
      id: "teamwork",
      label: "Teamwork",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["teamwork"],
      concepts: [
        {
          title: "Psychological Safety",
          body: "Reward 'I don't know' and 'I was wrong'. Punish blame, not mistakes.",
        },
        {
          title: "Assume Positive Intent",
          body: "Default to 'they had a reason' instead of 'they're an idiot'. Ask before you assume — 90% of the time it's missing context, not malice.",
        },
        {
          title: "Shared Ownership",
          body: "The team ships the feature, not the individual. Rotate ownership of modules so no single person is a bus factor.",
        },
      ],
      resources: [
        { label: "The Five Dysfunctions of a Team", url: "https://www.tablegroup.com/product/dysfunctions/", desc: "Patrick Lencioni's model for building trust and accountability." },
        { label: "Team Topologies", url: "https://teamtopologies.com/", desc: "Organising teams for fast flow of change." },
      ],
    },
    {
      id: "conflict",
      label: "Conflict Resolution",
      icon: Swords,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["conflict", "teamwork"],
      concepts: [
        {
          title: "Separate People from Problems",
          body: "Attack the issue, not the person. 'This approach has a flaw' vs 'your idea is bad'. Keeps conversations productive.",
        },
        {
          title: "Identify Interests, Not Positions",
          body: "Ask 'why do you want that?' instead of debating 'what'. Shared interests often exist beneath opposing positions.",
        },
        {
          title: "Blameless Post-Mortems",
          body: "Focus on systems and processes that allowed a mistake, not the person who made it. Culture of learning over culture of fear.",
        },
        {
          title: "The Crucial Conversation Framework",
          body: "Notice when a conversation turns crucial (stakes + emotions + differing opinions). Create safety, share your path, explore others' paths.",
        },
        {
          title: "Disagree in Private, Align in Public",
          body: "Raise concerns before the decision is made, in the right forum. Once the team decides, present a unified front to stakeholders.",
        },
      ],
      resources: [
        { label: "Crucial Conversations", url: "https://cruciallearning.com/", desc: "Tools for high-stakes disagreements." },
        { label: "Nonviolent Communication", url: "https://www.cnvc.org/", desc: "Empathy-first framework for resolving tension." },
        { label: "Getting to Yes", url: "https://www.pon.harvard.edu/", desc: "Harvard negotiation project — principled conflict resolution." },
      ],
    },
    {
      id: "remote",
      label: "Remote Collaboration",
      icon: Wifi,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["remote", "async", "teamwork"],
      concepts: [
        {
          title: "Async by Default",
          body: "Write it down before scheduling a meeting. Loom + Notion + Slack threads handle 80% of communication without synchronous cost.",
        },
        {
          title: "Overlap Hours Are Sacred",
          body: "Protect shared working hours for critical discussions and pairing. Everything else is async.",
        },
        {
          title: "Over-Communicate Context",
          body: "Remote removes hallway conversations. Add 'why' to every decision. Leave a trail of context in tickets, PRs, and docs.",
        },
        {
          title: "Camera On for Hard Conversations",
          body: "Tone is lost in text. Difficult feedback, disagreements, and 1:1s deserve a video call where facial cues are visible.",
        },
        {
          title: "Document Decisions, Not Just Outcomes",
          body: "Record what you decided AND why you rejected alternatives. Future teammates won't repeat the same discussions.",
        },
      ],
      resources: [
        { label: "GitLab Remote Playbook", url: "https://handbook.gitlab.com/handbook/company/culture/all-remote/", desc: "Industry-leading async remote culture guide." },
        { label: "Basecamp — Shape Up", url: "https://basecamp.com/shapeup", desc: "Async-first product development at scale." },
      ],
    },
    {
      id: "pairing",
      label: "Pair Programming",
      icon: Terminal,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["pairing", "mob-programming", "teamwork"],
      concepts: [
        {
          title: "Driver / Navigator Pattern",
          body: "Driver types, navigator thinks ahead and reviews. Swap every 15–25 min with a timer. Never let one person drive for an hour.",
        },
        {
          title: "Strong-Style Pairing",
          body: "'For an idea to go from your head into the computer, it must go through someone else's hands.' The navigator holds all decisions.",
        },
        {
          title: "Mob Programming",
          body: "Whole team on one keyboard, one screen, rotating driver every few minutes. Extreme knowledge sharing — nothing gets siloed. Use for onboarding and complex problems.",
        },
        {
          title: "When to Pair",
          body: "Complex architecture decisions, debugging gnarly issues, onboarding new team members, or spreading knowledge of a critical system. Don't pair on trivial tasks — it's expensive.",
        },
      ],
      resources: [
        { label: "Martin Fowler — Pair Programming", url: "https://martinfowler.com/articles/on-pair-programming.html", desc: "Exhaustive guide to pairing styles, benefits, and practical patterns." },
      ],
    },
    {
      id: "code-review",
      label: "Code Review",
      icon: GitPullRequest,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["code-review", "pr", "feedback"],
      concepts: [
        {
          title: "Review Intent, Then Implementation",
          body: "First check: does this PR do the right thing? Then: is it done the right way? A well-written PR that solves the wrong problem should be blocked, not merged and refactored.",
        },
        {
          title: "Nit vs Blocking",
          body: "Label comments: 'nit:' (take it or leave it), 'suggestion:' (worth considering), 'blocking:' (must fix). Reviewers who block on every nit slow teams and breed resentment.",
        },
        {
          title: "Small PRs",
          body: "A PR with 50 lines gets real review. A PR with 500 lines gets a rubber stamp. Break work into reviewable chunks. Feature flags let you merge incomplete features safely.",
        },
        {
          title: "Author Responsibility",
          body: "Don't submit PRs that you wouldn't review. Write a clear description — what, why, how to test. Add screenshots for UI changes. Make the reviewer's job easy.",
        },
      ],
    },
    {
      id: "continuous-learning",
      label: "Continuous Learning",
      icon: RefreshCw,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["learning", "growth", "career"],
      concepts: [
        {
          title: "Deliberate Practice",
          body: "Reading about programming ≠ practicing programming. Build things at the edge of your ability. Katas, side projects, and open source contributions beat passive consumption.",
        },
        {
          title: "T-Shaped Skills",
          body: "Go deep in one area (your specialisation) while maintaining breadth across others (system design, testing, communication). Specialists who understand context are far more valuable.",
        },
        {
          title: "Public Learning",
          body: "Write about what you learn — blog posts, tweets, internal RFCs. Teaching forces clarity. It builds your reputation and helps others. The best engineers give more than they take.",
        },
        {
          title: "The 20% Rule",
          body: "Protect 20% of your time for learning, experimentation, and technical exploration. If you're always in delivery mode, you'll stagnate. Learning is not optional — it's part of the job.",
        },
      ],
    },
    {
      id: "time",
      label: "Time Management",
      icon: Clock,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["time", "productivity", "leadership"],
      concepts: [
        {
          title: "Time-Blocking",
          body: "Assign every hour a job before the day starts. Deep work goes in your peak energy window (morning for most). Shallow tasks — email, Slack, meetings — fill the gaps. A blank calendar is not free time, it's stolen time.",
        },
        {
          title: "Eisenhower Matrix",
          body: "Split tasks into 4 quadrants: Urgent+Important (do now), Important+Not Urgent (schedule), Urgent+Not Important (delegate), Neither (eliminate). Most engineers live in quadrant 1 — the goal is to spend more time in quadrant 2.",
        },
        {
          title: "Eat the Frog",
          body: "Do your hardest, most important task first — before email, before Slack. Once the frog is eaten, every other task feels easy. Procrastination feeds on easy wins.",
        },
        {
          title: "Pomodoro Technique",
          body: "25 minutes of focused work, 5-minute break, repeat 4×, then take a longer 20-minute break. Forces single-tasking. The break is not optional — it's when your brain consolidates.",
        },
        {
          title: "Single-Tasking",
          body: "Multitasking is a myth. Context-switching costs ~23 minutes of recovery per interruption. Close unrelated tabs. Put your phone face down. Batch your communication windows.",
        },
        {
          title: "Weekly Review",
          body: "Every Friday: review what shipped, what didn't, and why. Reschedule incomplete high-priority tasks before Monday. 30 minutes of weekly planning saves 5 hours of reactive scrambling.",
        },
      ],
      checklist: [
        { id: "time-block-week", label: "Next week's deep work blocks scheduled" },
        { id: "frog-identified", label: "Most important task identified for tomorrow" },
        { id: "distractions-blocked", label: "Notifications off during focus sessions" },
        { id: "weekly-review", label: "Weekly review completed every Friday" },
      ],
      resources: [
        { label: "Deep Work — Cal Newport", url: "https://calnewport.com/deep-work/", desc: "The definitive case for focused, distraction-free work and how to cultivate it." },
        { label: "Getting Things Done — David Allen", url: "https://gettingthingsdone.com/", desc: "Trusted productivity system for capturing and processing all your commitments." },
        { label: "The Eisenhower Matrix", url: "https://todoist.com/productivity-methods/eisenhower-matrix", desc: "Visual guide to the 4-quadrant prioritisation framework." },
      ],
    },
    {
      id: "growth",
      label: "Growth Mindset",
      icon: Sparkles,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["growth", "mindset", "learning", "leadership"],
      concepts: [
        {
          title: "Fixed vs Growth Mindset",
          body: "Fixed mindset: talent is static, failure is identity. Growth mindset: ability is developed, failure is data. Carol Dweck's research shows growth mindset predicts achievement better than IQ in challenging domains.",
        },
        {
          title: "Embrace Deliberate Discomfort",
          body: "If a task feels easy, you're not growing. Deliberately seek projects slightly above your current level. The stretch zone — not the comfort zone — is where skill is built.",
        },
        {
          title: "Reframe Failure as Feedback",
          body: "'I failed' → 'that approach didn't work — here's why.' Keep a failure log: what happened, what I learned, what I'd do differently. Engineers who embrace this compound faster than those who avoid mistakes.",
        },
        {
          title: "Seek Feedback Actively",
          body: "Don't wait for performance reviews. Ask after every project: 'What's one thing I could have done better?' Specific, frequent feedback accelerates growth faster than annual reviews.",
        },
        {
          title: "The Power of 'Not Yet'",
          body: "Replace 'I can't do X' with 'I can't do X yet.' This tiny word signals to your brain that skill is learnable, not fixed. It maintains motivation through the difficult early phase of any skill.",
        },
      ],
      resources: [
        { label: "Mindset — Carol Dweck", url: "https://www.mindsetonline.com/", desc: "The original research on fixed vs growth mindset and how it shapes achievement." },
        { label: "Grit — Angela Duckworth", url: "https://angeladuckworth.com/grit-book/", desc: "How passion + perseverance outperforms raw talent over long time horizons." },
      ],
    },
    {
      id: "mental-models",
      label: "Mental Models",
      icon: Brain,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["mental-models", "thinking", "decision-making"],
      concepts: [
        {
          title: "Inversion",
          body: "Instead of asking 'how do I succeed?', ask 'what guarantees failure?' Then avoid those. Charlie Munger: 'All I want to know is where I'm going to die, so I'll never go there.' Apply to systems: what must never happen in production?",
        },
        {
          title: "First Principles Thinking",
          body: "Break assumptions until you reach physical or logical truths, then build back up. Musk used this to cut rocket costs 10×. Engineers use it to question 'this is how it's always done' — which is usually the wrong reason.",
        },
        {
          title: "Second-Order Thinking",
          body: "Ask 'and then what?' after every decision. First-order: this optimization speeds up the API. Second-order: faster API increases traffic → database becomes the bottleneck. Think two steps ahead before committing.",
        },
        {
          title: "Pareto Principle (80/20)",
          body: "80% of results come from 20% of effort. Identify the 20% of features, fixes, or tasks that produce 80% of value. Cut the rest — or do it last. This is why MVPs beat perfect products in the market.",
        },
        {
          title: "Occam's Razor",
          body: "Among competing explanations, prefer the simplest one that fits the facts. In debugging: check environment variables before assuming cache corruption. In architecture: choose the boring technology before the clever one.",
        },
        {
          title: "Maps Are Not the Territory",
          body: "Your mental model of a system is not the system. Documentation is not the code. The spec is not the user. Constantly test your assumptions against reality — instruments over intuition.",
        },
      ],
      resources: [
        { label: "The Great Mental Models — Farnam Street", url: "https://fs.blog/tgmm/", desc: "A curated collection of the most useful mental models across disciplines." },
        { label: "Poor Charlie's Almanack", url: "https://www.stripe.press/poor-charlies-almanack", desc: "Charlie Munger's worldly wisdom through mental models." },
      ],
    },
    {
      id: "agile",
      label: "Agile / Scrum",
      icon: Repeat2,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["agile", "scrum", "teamwork", "process"],
      concepts: [
        {
          title: "Sprint Planning",
          body: "Agree on the sprint goal before picking tickets. The goal is a commitment, not a to-do list. Each item should have a clear Definition of Done. Velocity is a planning tool — not a performance metric.",
        },
        {
          title: "Daily Standup",
          body: "What did I do yesterday? What am I doing today? What's blocking me? Keep it under 15 minutes — it's a sync, not a status report. If discussion is needed, take it offline with the relevant people.",
        },
        {
          title: "Retrospectives",
          body: "The most underrated ceremony. Keep / Try / Drop format or Start / Stop / Continue. Safety to speak honestly is more important than the format. The retro only has value if actions are tracked and followed through.",
        },
        {
          title: "Definition of Done",
          body: "A shared checklist that every piece of work must pass before 'done' is declared: code reviewed, tests passing, deployed to staging, documentation updated. Without DoD, 'done' means nothing.",
        },
        {
          title: "Kanban vs Scrum",
          body: "Scrum: time-boxed sprints, roles (PO, SM), planning ceremonies — good for product teams with regular delivery cadence. Kanban: continuous flow, WIP limits — good for ops, support, or maintenance teams. Know which your team actually runs.",
        },
        {
          title: "The Agile Manifesto Values",
          body: "Individuals & interactions over processes & tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan. Most teams cargo-cult the ceremonies and miss the values.",
        },
      ],
      checklist: [
        { id: "sprint-goal-clear", label: "Sprint goal defined before picking tickets" },
        { id: "dod-written", label: "Definition of Done written and agreed by the team" },
        { id: "retro-actions-tracked", label: "Retro action items tracked across sprints" },
        { id: "standup-under-15", label: "Daily standup kept under 15 minutes" },
      ],
      resources: [
        { label: "Agile Manifesto", url: "https://agilemanifesto.org/", desc: "The original 4 values and 12 principles — read before anything else." },
        { label: "Scrum Guide", url: "https://scrumguides.org/", desc: "The official, free Scrum Guide by Schwaber & Sutherland." },
        { label: "Shape Up — Basecamp", url: "https://basecamp.com/shapeup", desc: "An alternative to Scrum for async-first product teams." },
      ],
    },
    {
      id: "top-10",
      label: "Top 10 Questions",
      icon: Trophy,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["interview", "hr", "behavioral", "career"],
      concepts: [
        {
          title: "Tell Me About Yourself",
          body: "Use the Present → Past → Future formula. Present: your current role and what you deliver. Past: the experience that made you effective at it. Future: why this role is the next logical step. Keep it under 2 minutes. Never start with your university — start with your value.",
        },
        {
          title: "What Is Your Greatest Strength?",
          body: "Pick ONE specific strength. Back it with a concrete example (STAR: Situation, Task, Action, Result). Connect it directly to the role you're interviewing for. 'I'm a hard worker' is a red flag — 'I debug complex distributed systems quickly' is a strength.",
        },
        {
          title: "What Is Your Greatest Weakness?",
          body: "Avoid fake weaknesses ('I work too hard'). Pick a real one that you're actively improving. Framework: name the weakness → show self-awareness → show what you've done to address it → show evidence of improvement. Example: 'I used to underestimate how long tasks take. I now time-box every task and track actual vs estimated — my estimates are within 20% now.'",
        },
        {
          title: "Why Do You Want to Work Here?",
          body: "This question tests whether you researched the company. Answer requires: (1) something specific about their product/mission/culture that genuinely excites you, (2) how your skills connect to their current challenges, (3) what you want to learn or build there. 'Good salary' is never the answer — even if it's true.",
        },
        {
          title: "Where Do You See Yourself in 5 Years?",
          body: "They're not asking for a career plan — they're asking: will you leave in 6 months, and do you have ambition? Answer: show growth ambition within the domain (not 'your job'). 'I want to go deeper in distributed systems and eventually lead architecture decisions for high-scale products' is strong. 'I want to be a manager' is fine if it fits the role.",
        },
        {
          title: "How Do You Manage Your Time and Priorities?",
          body: "Name a real system you use (time-blocking, Eisenhower Matrix, weekly review). Give a specific example of how it helped you deliver in a crunch. Interviewers are checking whether you are self-organised or chaotic.",
        },
        {
          title: "Tell Me About a Conflict With a Colleague",
          body: "Use STAR. Choose a conflict where you were wrong or partly wrong — it shows self-awareness. Focus on how you resolved it, what you learned, and what changed in your working relationship. Never blame the other person.",
        },
        {
          title: "What's Your Biggest Failure?",
          body: "Pick a real one — something that mattered. Structure: what happened, what your role was, what you did to address it, and crucially — what you changed as a result. A failure with no lesson learned is a red flag. A failure with a clear lesson is a strength signal.",
        },
        {
          title: "Why Are You Leaving Your Current Role?",
          body: "Never badmouth the current employer — it signals you'll badmouth this one too. Acceptable: 'I've grown as much as I can here, I want a new challenge.' 'The company direction changed.' 'I want to work at this scale.' Keep it forward-looking.",
        },
        {
          title: "Do You Have Any Questions for Us?",
          body: "Always have 3 prepared. Best questions: 'What does success look like in this role after 90 days?' 'What's the biggest challenge the team is facing right now?' 'How does engineering interact with product and design?' These signal you're serious. 'How much vacation do I get?' signals you're already planning to leave.",
        },
      ],
    },
  ],
};
