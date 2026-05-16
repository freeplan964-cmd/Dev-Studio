import { Mail, MessageCircle, FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { MailTemplate } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface MailsSidebarProps {
  channel: string;
  templates: MailTemplate[];
  activeTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
  onNewTemplate: () => void;
  onDeleteTemplate: (id: string) => void;
}

export function MailsSidebar({
  channel,
  templates,
  activeTemplateId,
  onSelectTemplate,
  onNewTemplate,
  onDeleteTemplate,
}: MailsSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const channelTemplates = templates.filter((t) => t.channel === channel);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              {channel === "cover-letter" && <FileText className="size-5" />}
              {channel === "gmail" && <Mail className="size-5" />}
              {channel === "whatsapp" && <MessageCircle className="size-5" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold capitalize">{channel.replace("-", " ")}</h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Communication
              </p>
            </div>
          </div>
          <button
            onClick={onNewTemplate}
            className="flex items-center gap-1.5 text-[11px] font-medium bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="size-3.5" /> New
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {channelTemplates.length > 0 ? (
          channelTemplates.map((template) => (
            <div
              key={template.id}
              className={`group relative w-full text-left px-3 py-2.5 rounded-md text-sm transition-all cursor-pointer border ${
                activeTemplateId === template.id
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-card hover:text-foreground border-transparent"
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="pr-6">
                <div className={`truncate leading-snug ${activeTemplateId === template.id ? "font-medium text-foreground" : ""}`}>
                  {template.subject || "Untitled Template"}
                </div>
                <div className="truncate text-[11px] text-muted-foreground mt-0.5 opacity-80">
                  {template.content || "Empty content"}
                </div>
                <div className="text-[10px] opacity-70 mt-1 flex items-center gap-2">
                  <span className={`shrink-0 w-1 h-1 rounded-full ${activeTemplateId === template.id ? "bg-primary" : "bg-muted-foreground"}`} />
                  {new Date(template.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDeleteId(template.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                title="Delete template"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="px-3 py-8 text-xs text-muted-foreground border border-dashed border-border rounded-lg text-center flex flex-col items-center gap-2 m-2">
            <div className="size-8 rounded-full bg-muted/20 flex items-center justify-center">
              <Plus className="size-4 opacity-50" />
            </div>
            No templates yet
          </div>
        )}
      </nav>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => { if (!open) setPendingDeleteId(null); }}
        title="Delete template?"
        description="This template will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteTemplate(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
