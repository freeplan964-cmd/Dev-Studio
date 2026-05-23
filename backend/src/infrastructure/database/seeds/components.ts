const now = Date.now();

export interface ComponentSeed {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  code: string;
  dependencies: string[];
  favorite?: boolean;
  usageCount?: number;
  createdAt: number;
  updatedAt: number;
}

export const seedComponents: ComponentSeed[] = [
  {
    id: "c_1",
    name: "Glass Sidebar",
    description: "Blurred dark sidebar with collapsible nav groups and active state indicators.",
    category: "Navigation",
    tags: ["sidebar", "tailwind", "react"],
    code: `import { useState } from 'react';
import { ChevronDown, LayoutDashboard, Settings, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Team', href: '/team', icon: <Users size={16} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
];

export function GlassSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const [active, setActive] = useState('/dashboard');

  return (
    <aside
      className={cn(
        'flex flex-col h-screen border-r border-white/10',
        'backdrop-blur-xl bg-white/5 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-white/10">
        {!collapsed && (
          <span className="font-semibold text-sm tracking-wide">Dev Studio</span>
        )}
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => setActive(item.href)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              active === item.href
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}`,
    dependencies: ["react", "tailwindcss", "lucide-react"],
    favorite: true,
    usageCount: 12,
    createdAt: now - 86400000 * 14,
    updatedAt: now - 3600000 * 6,
  },
  {
    id: "c_2",
    name: "Gradient Stat Card",
    description: "KPI card with trend indicator and gradient accent border.",
    category: "Data Display",
    tags: ["card", "stats", "kpi"],
    code: `import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
}

export function StatCard({ label, value, change, changeLabel }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="relative rounded-xl border border-white/10 p-5 bg-card overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"
        aria-hidden
      />
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
      {change !== undefined && (
        <div
          className={cn(
            'mt-3 inline-flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-emerald-400' : 'text-red-400'
          )}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{change}% {changeLabel ?? 'vs last month'}
        </div>
      )}
    </div>
  );
}`,
    dependencies: ["react", "lucide-react"],
    usageCount: 9,
    createdAt: now - 86400000 * 9,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: "c_3",
    name: "Command Palette",
    description: "Cmd+K palette with grouped search results and keyboard navigation.",
    category: "Overlays",
    tags: ["cmdk", "search", "keyboard"],
    code: `import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Cpu, Code2, Layers } from 'lucide-react';

const groups = [
  {
    label: 'Prompts',
    icon: <FileText size={14} />,
    items: ['Database Schema Architect', 'Bug Hunter', 'API Contract Designer'],
  },
  {
    label: 'Agents',
    icon: <Cpu size={14} />,
    items: ['Code Auditor', 'Schema Architect', 'Style Architect'],
  },
  {
    label: 'Snippets',
    icon: <Code2 size={14} />,
    items: ['useDebounce Hook', 'JWT Middleware', 'Zod Validator'],
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <Search size={14} className="text-muted-foreground" />
            <Command.Input
              placeholder="Search everything…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            {groups.map((group) => (
              <Command.Group key={group.label} heading={group.label}>
                {group.items.map((item) => (
                  <Command.Item
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10"
                    onSelect={() => setOpen(false)}
                  >
                    {group.icon}
                    {item}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}`,
    dependencies: ["cmdk", "react", "lucide-react"],
    favorite: true,
    usageCount: 18,
    createdAt: now - 86400000 * 22,
    updatedAt: now - 86400000 * 4,
  },
  {
    id: "c_4",
    name: "Tag Input",
    description: "Input that converts entries into removable tag chips on Enter or comma.",
    category: "Forms",
    tags: ["input", "tags", "forms"],
    code: `import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({ value, onChange, placeholder = 'Add tag…', className }: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5 p-2 rounded-lg border border-input bg-background min-h-10',
        className
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-secondary-foreground/60 hover:text-secondary-foreground"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-24 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}`,
    dependencies: ["react", "lucide-react"],
    usageCount: 4,
    createdAt: now - 86400000 * 5,
    updatedAt: now - 86400000 * 1,
  },
  {
    id: "c_5",
    name: "Streaming Chat Bubble",
    description: "Animated chat message bubble with typewriter streaming effect for AI responses.",
    category: "AI / Chat",
    tags: ["chat", "streaming", "ai", "animation"],
    code: `import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function ChatBubble({ role, content, isStreaming = false }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold',
          isUser ? 'bg-violet-500 text-white' : 'bg-neutral-800 text-white'
        )}
      >
        {isUser ? 'U' : 'AI'}
      </div>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-violet-500 text-white rounded-tr-sm'
            : 'bg-neutral-800 text-neutral-100 rounded-tl-sm'
        )}
      >
        {content}
        {isStreaming && (
          <span className="inline-block w-0.5 h-4 ml-0.5 bg-current align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}`,
    dependencies: ["react"],
    favorite: true,
    usageCount: 7,
    createdAt: now - 86400000 * 7,
    updatedAt: now - 86400000 * 2,
  },
  {
    id: "c_6",
    name: "Data Table with Sort",
    description: "Headless sortable data table using TanStack Table with column header controls.",
    category: "Data Display",
    tags: ["table", "tanstack", "react", "sorting"],
    code: `import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <span className="inline-flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? (
                      <ChevronUp size={13} />
                    ) : header.column.getIsSorted() === 'desc' ? (
                      <ChevronDown size={13} />
                    ) : (
                      <ChevronsUpDown size={13} className="opacity-40" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-border">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/30 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
    dependencies: ["@tanstack/react-table", "react", "lucide-react"],
    usageCount: 5,
    createdAt: now - 86400000 * 16,
    updatedAt: now - 86400000 * 3,
  },
  {
    id: "c_7",
    name: "Toast Notification System",
    description: "Lightweight toast hook and container using Sonner with success/error/info variants.",
    category: "Feedback",
    tags: ["toast", "notifications", "sonner"],
    code: `import { toast } from 'sonner';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

export const notify = {
  success: (message: string, description?: string) =>
    toast.success(message, {
      description,
      icon: <CheckCircle2 size={16} className="text-emerald-400" />,
    }),

  error: (message: string, description?: string) =>
    toast.error(message, {
      description,
      icon: <XCircle size={16} className="text-red-400" />,
    }),

  info: (message: string, description?: string) =>
    toast.info(message, {
      description,
      icon: <Info size={16} className="text-blue-400" />,
    }),

  warning: (message: string, description?: string) =>
    toast.warning(message, {
      description,
      icon: <AlertTriangle size={16} className="text-yellow-400" />,
    }),

  promise: <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => toast.promise(promise, messages),
};

// Usage:
// notify.success('Saved!', 'Your changes have been persisted.');
// notify.promise(saveData(), { loading: 'Saving...', success: 'Done!', error: 'Failed' });`,
    dependencies: ["sonner", "lucide-react"],
    usageCount: 22,
    createdAt: now - 86400000 * 18,
    updatedAt: now - 86400000 * 5,
  },
  {
    id: "c_8",
    name: "Collapsible Code Block",
    description: "Syntax-highlighted code block with copy button and expand/collapse toggle.",
    category: "Content",
    tags: ["code", "syntax", "copy", "react"],
    code: `import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  maxLines?: number;
}

export function CodeBlock({ code, language = 'tsx', maxLines = 10 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lines = code.split('\n');
  const needsCollapse = lines.length > maxLines;
  const displayed = expanded || !needsCollapse ? code : lines.slice(0, maxLines).join('\n');

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-neutral-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-neutral-900">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-neutral-200 font-mono leading-relaxed">
        <code>{displayed}</code>
        {needsCollapse && !expanded && <span className="text-neutral-600">…</span>}
      </pre>
      {needsCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 py-2 text-xs text-muted-foreground hover:text-foreground border-t border-border transition-colors"
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Collapse' : \`Show \${lines.length - maxLines} more lines\`}
        </button>
      )}
    </div>
  );
}`,
    dependencies: ["react", "lucide-react"],
    favorite: true,
    usageCount: 14,
    createdAt: now - 86400000 * 11,
    updatedAt: now - 86400000 * 2,
  },
];
