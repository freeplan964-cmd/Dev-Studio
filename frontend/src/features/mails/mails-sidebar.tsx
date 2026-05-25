import { Mail, MessageCircle, FileText } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { ListPagination } from "@/components/ui/list-pagination";
import type { MailTemplate } from "@/types/tools";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ONE_WEEK_MS, MAIL_LIST_FILTERS } from "@/constants";
import {
  InnerSidebar,
  InnerSidebarHeader,
  InnerSidebarSearch,
  InnerSidebarFilters,
  InnerSidebarDivider,
  InnerSidebarList,
  InnerSidebarItem,
  InnerSidebarEmpty,
  InnerSidebarAddButton,
} from "@/components/layout";

interface MailsSidebarProps {
  channel: string;
  templates: MailTemplate[];
  activeTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
  onNewTemplate: () => void;
  onDeleteTemplate: (id: string) => void;
}

const ChannelIcon = ({ channel }: { channel: string }) => {
  if (channel === "cover-letter") return <FileText className="size-3.5" />;
  if (channel === "gmail") return <Mail className="size-3.5" />;
  return <MessageCircle className="size-3.5" />;
};

export function MailsSidebar({
  channel,
  templates,
  activeTemplateId,
  onSelectTemplate,
  onNewTemplate,
  onDeleteTemplate,
}: MailsSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const now = Date.now();
  const channelTemplates = templates.filter((t) => t.channel === channel);

  let filtered = channelTemplates.filter((t) => {
    const matchesSearch =
      (t.subject ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.content ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const age = now - new Date(t.updatedAt).getTime();
    const matchesFilter =
      activeFilter === "all" ||
      activeFilter === "az" ||
      (activeFilter === "recent" && age <= ONE_WEEK_MS);
    return matchesSearch && matchesFilter;
  });

  if (activeFilter === "az") {
    filtered = [...filtered].sort((a, b) => (a.subject ?? "").localeCompare(b.subject ?? ""));
  }

  const { page, setPage, totalPages, paged, total, pageSize } = usePagination(filtered, 15);

  return (
    <InnerSidebar>
      <InnerSidebarHeader
        icon={<ChannelIcon channel={channel} />}
        title={channel.replace("-", " ")}
        count={channelTemplates.length}
        onAdd={onNewTemplate}
        addLabel="New Template"
      />
      <InnerSidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search templates…"
      />
      <InnerSidebarFilters filters={MAIL_LIST_FILTERS} active={activeFilter} onChange={setActiveFilter} />
      <InnerSidebarDivider />
      <InnerSidebarList>
        {filtered.length > 0 ? (
          paged.map((template) => (
            <InnerSidebarItem
              key={template.id}
              active={activeTemplateId === template.id}
              onClick={() => onSelectTemplate(template.id)}
              onDelete={() => setPendingDeleteId(template.id)}
              deleteLabel="Delete template"
            >
              <div
                className={`truncate leading-snug text-xs font-medium ${activeTemplateId === template.id ? "text-foreground" : ""}`}
              >
                {template.subject || "Untitled Template"}
              </div>
              <div className="truncate text-[10px] text-muted-foreground mt-0.5">
                {template.content || "Empty content"}
              </div>
              <div className="text-[9px] text-muted-foreground/60 mt-1">
                {new Date(template.updatedAt).toLocaleDateString()}
              </div>
            </InnerSidebarItem>
          ))
        ) : (
          <InnerSidebarEmpty
            message={
              searchQuery || activeFilter !== "all" ? "No matching templates" : "No templates yet"
            }
          />
        )}
      </InnerSidebarList>
      <ListPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <InnerSidebarAddButton onClick={onNewTemplate} label="New Template" />
      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="Delete template?"
        description="This template will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteId) onDeleteTemplate(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </InnerSidebar>
  );
}
