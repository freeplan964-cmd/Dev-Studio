import { createFileRoute, Link } from "@tanstack/react-router";
import { useForge } from "@/lib/store";
import { PageHeader, PageContainer, PageSection } from "@/components/layout";
import { SplitLayout } from "@/components/layout";
import {
  Sparkles,
  Bot,
  Component as ComponentIcon,
  LayoutTemplate,
  ArrowUpRight,
  Flame,
  TrendingUp,
  Globe,
  Server,
  Container,
  FlaskConical,
  GraduationCap,
  Star,
  Database,
  Heart,
  Users,
  Send,
  Mail,
  Code2,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
  LayoutDashboard,
  CalendarDays,
  Briefcase,
  Code,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Dev Studio" },
      { name: "description", content: "Overview of your AI dev hub." },
    ],
  }),
  component: Index,
});

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function Index() {
  const {
    prompts,
    agents,
    components,
    templates,
    snippets,
    interviewQuestions,
    connectors,
    socialDrafts,
    mailTemplates,
  } = useForge();

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const recentPrompts = [...prompts].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);
  const favoritePrompts = prompts.filter((p) => p.favorite);
  const totalUsage = prompts.reduce((acc, p) => acc + p.usageCount, 0);
  const favInterviewQs = interviewQuestions.filter((q) => q.favorite);
  const recentConnectors = [...connectors].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);
  const companiesCount = connectors.filter((c) => c.type === "companies").length;
  const hrCount = connectors.filter((c) => c.type === "hr").length;
  const clientsCount = connectors.filter((c) => c.type === "clients").length;
  const linkedInDrafts = socialDrafts.filter((d) => d.platform === "linkedin").length;
  const twitterDrafts = socialDrafts.filter((d) => d.platform === "twitter").length;
  const instagramDrafts = socialDrafts.filter((d) => d.platform === "instagram").length;
  const coverLetters = mailTemplates.filter((m) => m.channel === "cover-letter").length;
  const gmailTemplates = mailTemplates.filter((m) => m.channel === "gmail").length;
  const whatsappTemplates = mailTemplates.filter((m) => m.channel === "whatsapp").length;

  const toolStats = [
    {
      label: "Prompts",
      value: prompts.length,
      hint: "in library",
      icon: Sparkles,
      to: "/tools" as const,
      tab: "prompts" as const,
    },
    {
      label: "Agents",
      value: activeAgents,
      hint: `${agents.length} total`,
      icon: Bot,
      to: "/tools" as const,
      tab: "agents" as const,
    },
    {
      label: "Components",
      value: components.length,
      hint: "ready to reuse",
      icon: ComponentIcon,
      to: "/tools" as const,
      tab: "components" as const,
    },
    {
      label: "Templates",
      value: templates.length,
      hint: `${snippets.length} snippets`,
      icon: LayoutTemplate,
      to: "/tools" as const,
      tab: "templates" as const,
    },
  ];

  const networkStats = [
    {
      label: "Connectors",
      value: connectors.length,
      hint: `${companiesCount} co · ${hrCount} HR`,
      icon: Users,
      to: "/connectors" as const,
    },
    {
      label: "Social drafts",
      value: socialDrafts.length,
      hint: `${linkedInDrafts} LI · ${twitterDrafts} X`,
      icon: Send,
      to: "/social" as const,
    },
    {
      label: "Mail templates",
      value: mailTemplates.length,
      hint: `${coverLetters} cover · ${gmailTemplates} gmail`,
      icon: Mail,
      to: "/mails" as const,
    },
    {
      label: "Snippets",
      value: snippets.length,
      hint: "code snippets",
      icon: Code2,
      to: "/tools" as const,
    },
  ];

  const focusAreas = [
    {
      to: "/tech-skills",
      label: "Frontend",
      icon: Globe,
      desc: "React, Angular, Vue, Next.js",
      area: "frontend",
      search: { tab: "frontend" },
    },
    {
      to: "/tech-skills",
      label: "Backend",
      icon: Server,
      desc: "Node.js, ASP.NET, Python, Go",
      area: "backend",
      search: { tab: "backend" },
    },
    {
      to: "/tech-skills",
      label: "DevOps",
      icon: Container,
      desc: "CI/CD, containers, IaC",
      area: "devops",
      search: { tab: "devops" },
    },
    {
      to: "/tech-skills",
      label: "Testing",
      icon: FlaskConical,
      desc: "Unit, integration, E2E",
      area: "testing",
      search: { tab: "testing" },
    },
    {
      to: "/tech-skills",
      label: "Database",
      icon: Database,
      desc: "SQL, NoSQL, Redis, transactions",
      area: "database",
      search: { tab: "database" },
    },
    {
      to: "/soft-skills",
      label: "Soft Skills",
      icon: Heart,
      desc: "Communication, leadership, growth",
      area: "softskills",
      search: { tab: "communication" },
    },
  ] as const;

  const quickLinks = [
    { to: "/planner", label: "Planner", icon: CalendarDays },
    { to: "/tools", label: "Tools", icon: Code2 },
    { to: "/connectors", label: "Connectors", icon: Users },
    { to: "/cv", label: "CV Builder", icon: FileText },
    { to: "/jobs", label: "Jobs", icon: Briefcase },
    { to: "/social", label: "Social", icon: Send },
    { to: "/mails", label: "Mails", icon: Mail },
    { to: "/tech-skills", label: "Tech Skills", icon: Code },
    { to: "/interview", label: "Interview", icon: GraduationCap },
  ] as const;

  const platformIcon = (p: string) =>
    p === "linkedin" ? Linkedin : p === "twitter" ? Twitter : Instagram;
  const channelLabel = (c: string) =>
    c === "cover-letter" ? "Cover letter" : c === "gmail" ? "Gmail" : "WhatsApp";

  /* ── Sidebar ───────────────────────────────────────── */
  const sidebar = (
    <div className="flex flex-col h-full min-h-0">
      {/* Dev tools stats */}
      <div className="px-3 pt-3 pb-2 border-b border-border/60 shrink-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">
          Dev tools
        </p>
        <ul className="space-y-0.5">
          {toolStats.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.label}>
                <Link
                  to={s.to}
                  search={{ tab: s.tab }}
                  className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground truncate transition-colors">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold font-mono tabular-nums shrink-0">
                    {s.value}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Network stats */}
      <div className="px-3 pt-2.5 pb-2 border-b border-border/60 shrink-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">
          Network & comms
        </p>
        <ul className="space-y-0.5">
          {networkStats.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.label}>
                <Link
                  to={s.to}
                  className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground truncate transition-colors">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold font-mono tabular-nums shrink-0">
                    {s.value}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick links */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pt-2.5 pb-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">
          Quick navigate
        </p>
        <ul className="space-y-0.5">
          {quickLinks.map((l) => {
            const Icon = l.icon;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <Icon className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {l.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Builder card */}
      <div className="px-3 pb-3 pt-2 border-t border-border/60 shrink-0">
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Flame className="size-3.5 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Builder
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed">
            Pull the right prompts, components & templates instantly.
          </p>
          <Link
            to="/tools"
            search={{ tab: "prompts" }}
            className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[11px] font-medium px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Open builder <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );

  /* ── Render ────────────────────────────────────────── */
  return (
    <PageContainer>
      <PageSection>
        <PageHeader
          icon={LayoutDashboard}
          eyebrow="Welcome back"
          title="Your development hub"
          description="Save, organize and reuse everything that powers your next ship — prompts, agents, components, templates, snippets."
          actions={
            <Link
              to="/tools"
              search={{ tab: "prompts" }}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-border rounded-xl px-3 py-2 hover:bg-muted/60 transition-colors shrink-0"
            >
              Browse library <ArrowUpRight className="size-3.5" />
            </Link>
          }
        />
      </PageSection>

      <div className="flex-1 min-h-0 overflow-hidden">
        <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[260px]">
          <div className="overflow-y-auto scrollbar-thin h-full">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-5 space-y-8">
              {/* ── Focus areas ─────────────────────────── */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold tracking-tight">Focus areas</h2>
                  <Link
                    to="/interview"
                    className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <GraduationCap className="size-3.5" /> Interview prep
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
                  {focusAreas.map((a) => {
                    const Icon = a.icon;
                    const count = interviewQuestions.filter((q) => q.area === a.area).length;
                    return (
                      <Link
                        key={a.label}
                        to={a.to}
                        search={a.search}
                        className="group p-4 rounded-xl border border-border/60 bg-primary/5 hover:bg-primary/10 hover:border-primary/20 transition-all"
                      >
                        <Icon className="size-4 text-primary mb-2.5" />
                        <p className="text-xs font-semibold mb-0.5">{a.label}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {a.desc}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-2 flex items-center gap-1">
                          {count} Q&A
                          <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* ── Recent prompts ──────────────────────── */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" /> Recently updated prompts
                  </h2>
                  <Link
                    to="/tools"
                    search={{ tab: "prompts" }}
                    className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View all
                  </Link>
                </div>
                {recentPrompts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {recentPrompts.map((p) => (
                      <Link
                        key={p.id}
                        to="/tools"
                        search={{ tab: "prompts", id: p.id }}
                        className="block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:bg-card transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-1.5 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-mono uppercase">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                            {timeAgo(p.updatedAt)}
                          </span>
                        </div>
                        <h3 className="text-xs font-semibold mb-1 text-balance leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border/60 p-6 text-center">
                    <Sparkles className="size-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      No prompts yet. Create your first one in the Tools library.
                    </p>
                  </div>
                )}
              </section>

              {/* ── Two-col: recent connectors + starred Q&A ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent connectors */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                      <Users className="size-3.5 text-primary" /> Recent connectors
                    </h2>
                    <Link
                      to="/connectors"
                      className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View all
                    </Link>
                  </div>
                  {recentConnectors.length > 0 ? (
                    <div className="space-y-2">
                      {recentConnectors.slice(0, 3).map((c) => (
                        <Link
                          key={c.id}
                          to="/connectors"
                          className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all"
                        >
                          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="size-3.5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate">{c.name}</p>
                            <p className="text-[10px] text-muted-foreground capitalize">
                              {c.type} · {timeAgo(c.updatedAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border/60 p-5 text-center">
                      <p className="text-[11px] text-muted-foreground">No connectors yet.</p>
                    </div>
                  )}
                </section>

                {/* Starred interview Q&A */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                      <GraduationCap className="size-3.5 text-primary" /> Starred Q&A
                    </h2>
                    <Link
                      to="/interview"
                      className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View all
                    </Link>
                  </div>
                  {favInterviewQs.length > 0 ? (
                    <div className="space-y-2">
                      {favInterviewQs.slice(0, 3).map((q) => (
                        <Link
                          key={q.id}
                          to="/interview"
                          className="flex items-start gap-3 p-3 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all"
                        >
                          <Star className="size-3.5 text-amber-400 fill-amber-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground leading-relaxed line-clamp-2">
                            {q.question}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border/60 p-5 text-center">
                      <p className="text-[11px] text-muted-foreground">
                        Star interview questions to see them here.
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* ── Social + mail latest ───────────────── */}
              {(socialDrafts.length > 0 || mailTemplates.length > 0) && (
                <section>
                  <h2 className="text-sm font-semibold tracking-tight mb-3">Latest activity</h2>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {socialDrafts.length > 0 &&
                      (() => {
                        const draft = [...socialDrafts].sort(
                          (a, b) => b.updatedAt - a.updatedAt,
                        )[0];
                        const PIcon = platformIcon(draft.platform);
                        return (
                          <Link
                            to="/social"
                            className="block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2.5">
                              <PIcon className="size-3.5 text-primary" />
                              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                Latest draft · {draft.platform}
                              </p>
                              <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                                {timeAgo(draft.updatedAt)}
                              </span>
                            </div>
                            <p className="text-[11px] text-foreground line-clamp-3 leading-relaxed">
                              {draft.content}
                            </p>
                            <p className="text-[11px] font-mono text-primary mt-2.5 flex items-center gap-1">
                              {socialDrafts.length} drafts total <ArrowUpRight className="size-3" />
                            </p>
                          </Link>
                        );
                      })()}

                    {mailTemplates.length > 0 &&
                      (() => {
                        const tpl = [...mailTemplates].sort((a, b) => b.updatedAt - a.updatedAt)[0];
                        return (
                          <Link
                            to="/mails"
                            className="block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2.5">
                              <FileText className="size-3.5 text-primary" />
                              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                Latest · {channelLabel(tpl.channel)}
                              </p>
                              <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                                {timeAgo(tpl.updatedAt)}
                              </span>
                            </div>
                            {tpl.subject && (
                              <p className="text-xs font-semibold mb-1 truncate">{tpl.subject}</p>
                            )}
                            <p className="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed">
                              {tpl.content}
                            </p>
                            <p className="text-[11px] font-mono text-primary mt-2.5 flex items-center gap-1">
                              {mailTemplates.length} templates <ArrowUpRight className="size-3" />
                            </p>
                          </Link>
                        );
                      })()}
                  </div>
                </section>
              )}

              {/* ── Top usage ─────────────────────────── */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                    <TrendingUp className="size-3.5 text-primary" /> Prompt usage
                  </h2>
                </div>
                <div className="rounded-xl border border-border/60 bg-card p-4">
                  <div className="flex items-end gap-3 mb-4">
                    <p className="text-3xl font-semibold tracking-tight">{totalUsage}</p>
                    <p className="text-xs text-muted-foreground pb-1">
                      total invocations across all prompts
                    </p>
                  </div>
                  {favoritePrompts.length > 0 ? (
                    <ul className="space-y-2">
                      {favoritePrompts.slice(0, 4).map((p) => (
                        <li key={p.id} className="flex items-center justify-between gap-2">
                          <Link
                            to="/tools"
                            search={{ tab: "prompts", id: p.id }}
                            className="text-xs text-foreground hover:text-primary transition-colors truncate"
                          >
                            {p.title}
                          </Link>
                          <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                            {p.usageCount}×
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Star prompts to track usage here.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </SplitLayout>
      </div>
    </PageContainer>
  );
}
