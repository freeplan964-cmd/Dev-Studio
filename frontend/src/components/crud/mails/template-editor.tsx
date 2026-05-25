import { Save } from "lucide-react";
import type { MailTemplate } from "@/types/tools";
import { Input, TextArea } from "@/features/tools/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TemplateEditorProps {
  channel: string;
  activeTemplate: MailTemplate | null;
  onUpdateTemplate: (updates: Partial<MailTemplate>) => void;
  onSave: () => void;
}

export function TemplateEditor({
  channel,
  activeTemplate,
  onUpdateTemplate,
  onSave,
}: TemplateEditorProps) {
  if (!activeTemplate) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        Select a template or create a new one to start writing.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-10 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold capitalize">
          {channel.replace("-", " ")} Workspace
        </h2>
        <Button
          onClick={onSave}
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Save className="size-4" /> Save Template
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
        <div className="bg-card border border-border rounded-lg p-3 flex flex-col sm:flex-row flex-wrap gap-4">
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground w-12 shrink-0">To:</span>
            <Input
              type="text"
              value=""
              onChange={() => {}}
              className="flex-1"
              placeholder={channel === "whatsapp" ? "+1 (555) 000-0000" : "recipient@example.com"}
            />
          </div>
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground w-12 shrink-0">Tone:</span>
            <Select value="professional" onValueChange={() => {}}>
              <SelectTrigger className="flex-1 h-9">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly / Casual</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {channel === "gmail" && (
          <div className="bg-card border border-border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-muted-foreground sm:w-14 shrink-0">
              Subject:
            </span>
            <Input
              type="text"
              value={activeTemplate.subject || ""}
              onChange={(e) => onUpdateTemplate({ subject: e.target.value })}
              className="flex-1 font-medium"
              placeholder="Enter subject line..."
            />
          </div>
        )}

        <div className="flex-1 bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col">
          <TextArea
            value={activeTemplate.content || ""}
            onChange={(e) => onUpdateTemplate({ content: e.target.value })}
            className="w-full flex-1 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 shadow-none text-sm leading-relaxed"
            placeholder={`Write your ${channel.replace("-", " ")} message here...\n\nTips:\n- Use [Name] as a placeholder\n- Keep your tone consistent`}
          />
          <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[11px] text-muted-foreground font-mono">
            <span>{(activeTemplate.content || "").length} characters</span>
            <span>Last updated: {new Date(activeTemplate.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
