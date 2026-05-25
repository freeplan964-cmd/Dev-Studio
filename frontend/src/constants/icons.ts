/**
 * Centralized Icon Constants
 * All icon definitions and icon registry
 * Organized by feature domain
 */

import {
  // Navigation & UI
  LayoutDashboard,
  CalendarDays,
  Code2,
  Component as ComponentIcon,
  Bot,
  Users,
  FileText,
  Briefcase,
  Code,
  Heart,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Instagram,
  Send,
  Mail,
  MessageCircle,
  Building2,
  User,
  GraduationCap,
  FolderGit2,
  Sparkles,
  Trophy,
  Target,
  Lightbulb,
  MessageSquare,
  Globe,
  Server,
  Container,
  FlaskConical,
  Database,
  BookOpen,
  LayoutTemplate,
  // Tech Skills
  Cpu,
  Network,
  Boxes,
  Shield,
  Zap,
  Package,
  Link,
  Activity,
  Layers,
  Radio,
  Puzzle,
  Brain,
  CloudCog,
  ChartNoAxesColumn,
  Gauge,
  HardDrive,
  Cable,
  Scissors,
  ShieldCheck,
  DatabaseZap,
  MonitorDot,
  Earth,
  Key,
  Lock,
  PlugZap,
  Mic,
  Handshake,
  Clock,
  Swords,
  Wifi,
  Terminal,
  GitPullRequest,
  RefreshCw,
  Repeat2,
  Circle,
  // Prayer & Activities
  Moon,
  Sun,
  CloudSun,
  Sunset,
  MoonStar,
  Dumbbell,
  Bath,
  Utensils,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

// ── Icon Registry ──────────────────────────────────────────────────────────────

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  // Navigation & UI
  LayoutDashboard,
  CalendarDays,
  Code2,
  ComponentIcon,
  Bot,
  Users,
  FileText,
  Briefcase,
  Code,
  Heart,
  LinkedinIcon,
  TwitterIcon,
  Instagram,
  Send,
  Mail,
  MessageCircle,
  Building2,
  User,
  GraduationCap,
  FolderGit2,
  Sparkles,
  Trophy,
  Target,
  Lightbulb,
  MessageSquare,
  Globe,
  Server,
  Container,
  FlaskConical,
  Database,
  BookOpen,
  LayoutTemplate,
  // Tech Skills
  Cpu,
  Network,
  Boxes,
  Shield,
  Zap,
  Package,
  Link,
  Activity,
  Layers,
  Radio,
  Puzzle,
  Brain,
  CloudCog,
  ChartNoAxesColumn,
  Gauge,
  HardDrive,
  Cable,
  Scissors,
  ShieldCheck,
  DatabaseZap,
  MonitorDot,
  Earth,
  Key,
  Lock,
  PlugZap,
  Mic,
  Handshake,
  Clock,
  Swords,
  Wifi,
  Terminal,
  GitPullRequest,
  RefreshCw,
  Repeat2,
  Circle,
  // Prayer & Activities
  Moon,
  Sun,
  CloudSun,
  Sunset,
  MoonStar,
  Dumbbell,
  Bath,
  Utensils,
  GitBranch,
};

export function resolveIcon(name?: string): LucideIcon {
  if (!name) return Circle;
  return ICON_REGISTRY[name] ?? Circle;
}

// ── Prayer Time Icons ──────────────────────────────────────────────────────────

export const PRAYER_ICONS = {
  Fajr: Moon,
  Dhuhr: Sun,
  Asr: CloudSun,
  Maghrib: Sunset,
  Isha: MoonStar,
} as const;

// ── Activity Type Icons ────────────────────────────────────────────────────────

export const ACTIVITY_ICONS = {
  prayer: Moon,
  sports: Dumbbell,
  care: Bath,
  food: Utensils,
} as const;

// ── Tech Skill Domain Icons ────────────────────────────────────────────────────

export const TECH_DOMAIN_ICONS = {
  frontend: Globe,
  backend: Server,
  database: Database,
  devops: Container,
  architecture: LayoutTemplate,
  core: Cpu,
} as const;

// ── Social Platform Icons ──────────────────────────────────────────────────────

export const SOCIAL_PLATFORM_ICONS = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: Instagram,
} as const;

// ── Mail Channel Icons ─────────────────────────────────────────────────────────

export const MAIL_CHANNEL_ICONS = {
  "cover-letter": Send,
  gmail: Mail,
  whatsapp: MessageCircle,
} as const;

// ── Connector Type Icons ───────────────────────────────────────────────────────

export const CONNECTOR_TYPE_ICONS = {
  companies: Building2,
  hr: Briefcase,
  clients: Users,
} as const;

// ── CV Builder Section Icons ───────────────────────────────────────────────────

export const CV_SECTION_ICONS = {
  personal: User,
  experience: Briefcase,
  skills: Code2,
  education: GraduationCap,
  projects: FolderGit2,
  ats: Sparkles,
} as const;

// ── Tools Tab Icons ────────────────────────────────────────────────────────────

export const TOOLS_TAB_ICONS = {
  prompts: Sparkles,
  agents: Bot,
  components: ComponentIcon,
  templates: LayoutTemplate,
  snippets: Code2,
} as const;

// ── Soft Skills Tab Icons ──────────────────────────────────────────────────────

export const SOFT_SKILLS_TAB_ICONS = {
  "top-10": Trophy,
  communication: MessageCircle,
  leadership: Target,
  "problem-solving": Lightbulb,
  teamwork: Users,
  "ai-mock": MessageSquare,
} as const;

// ── Tech Skills Tab Icons ──────────────────────────────────────────────────────

export const TECH_SKILLS_TAB_ICONS = {
  frontend: Globe,
  backend: Server,
  devops: Container,
  testing: FlaskConical,
  database: Database,
  materials: BookOpen,
  "ai-mock": MessageSquare,
} as const;

// ── Workspace Navigation Icons ─────────────────────────────────────────────────

export const WORKSPACE_NAV_ICONS = {
  dashboard: LayoutDashboard,
  planner: CalendarDays,
  tools: Code2,
} as const;

// ── Communication Navigation Icons ────────────────────────────────────────────

export const COMMUNICATION_NAV_ICONS = {
  social: ComponentIcon,
  mails: Bot,
  connectors: Users,
  cv: FileText,
} as const;

// ── Freelance Navigation Icons ─────────────────────────────────────────────────

export const FREELANCE_NAV_ICONS = {
  jobs: Briefcase,
} as const;

// ── Skills Navigation Icons ───────────────────────────────────────────────────

export const SKILLS_NAV_ICONS = {
  "tech-skills": Code,
  "soft-skills": Heart,
} as const;
