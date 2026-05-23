import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useForge } from "@/lib/store";
import { Sparkles, Bot, Component, LayoutTemplate, Code2, LayoutDashboard } from "lucide-react";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const navigate = useNavigate();
  const { prompts, agents, components, templates, snippets } = useForge();

  const go = (to: string, search?: Record<string, unknown>) => {
    onOpenChange(false);
    navigate({ to, search });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search everything — prompts, agents, components…" />
      <CommandList className="max-h-[480px]">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <LayoutDashboard className="size-4 mr-2" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/tools", { tab: "prompts" })}>
            <Sparkles className="size-4 mr-2" /> Prompts Library
          </CommandItem>
          <CommandItem onSelect={() => go("/tools", { tab: "agents" })}>
            <Bot className="size-4 mr-2" /> AI Agents
          </CommandItem>
          <CommandItem onSelect={() => go("/tools", { tab: "components" })}>
            <Component className="size-4 mr-2" /> Components
          </CommandItem>
          <CommandItem onSelect={() => go("/tools", { tab: "templates" })}>
            <LayoutTemplate className="size-4 mr-2" /> Templates
          </CommandItem>
          <CommandItem onSelect={() => go("/tools", { tab: "snippets" })}>
            <Code2 className="size-4 mr-2" /> Snippets
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Prompts">
          {prompts.slice(0, 6).map((p) => (
            <CommandItem key={p.id} onSelect={() => go("/tools", { tab: "prompts", id: p.id })}>
              <Sparkles className="size-4 mr-2 text-primary" />
              <span>{p.title}</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">
                {p.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Agents">
          {agents.slice(0, 5).map((a) => (
            <CommandItem key={a.id} onSelect={() => go("/tools", { tab: "agents", id: a.id })}>
              <Bot className="size-4 mr-2 text-accent" />
              {a.name}
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">
                {a.status}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Components">
          {components.slice(0, 5).map((c) => (
            <CommandItem key={c.id} onSelect={() => go("/tools", { tab: "components", id: c.id })}>
              <Component className="size-4 mr-2" />
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Templates">
          {templates.slice(0, 4).map((t) => (
            <CommandItem key={t.id} onSelect={() => go("/tools", { tab: "templates", id: t.id })}>
              <LayoutTemplate className="size-4 mr-2" />
              {t.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Snippets">
          {snippets.slice(0, 4).map((s) => (
            <CommandItem key={s.id} onSelect={() => go("/tools", { tab: "snippets", id: s.id })}>
              <Code2 className="size-4 mr-2" />
              {s.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
