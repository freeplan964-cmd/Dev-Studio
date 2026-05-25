import { Save, Mail, Phone, User } from "lucide-react";
import type { Connector } from "@/types/tools";
import { Input, TextArea } from "@/features/tools/shared";
import { Button } from "@/components/ui/button";

interface ConnectorEditorProps {
  type: string;
  activeConnector: Connector | null;
  onUpdateConnector: (updates: Partial<Connector>) => void;
  onSave: () => void;
}

export function ConnectorEditor({
  type,
  activeConnector,
  onUpdateConnector,
  onSave,
}: ConnectorEditorProps) {
  if (!activeConnector) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        Select a contact or create a new one to start editing.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-10 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold capitalize">
          {type.replace("-", " ")} Details
        </h2>
        <Button
          onClick={onSave}
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Save className="size-4" /> Save Details
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-muted-foreground sm:w-20 shrink-0 flex items-center gap-2">
              <User className="size-4" /> Name:
            </span>
            <Input
              type="text"
              value={activeConnector.name || ""}
              onChange={(e) => onUpdateConnector({ name: e.target.value })}
              className="flex-1 font-medium"
              placeholder={`Enter ${type === "companies" ? "company" : "contact"} name...`}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-muted-foreground sm:w-20 shrink-0 flex items-center gap-2">
              <Mail className="size-4" /> Email:
            </span>
            <Input
              type="email"
              value={activeConnector.email || ""}
              onChange={(e) => onUpdateConnector({ email: e.target.value })}
              className="flex-1"
              placeholder="email@example.com"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-muted-foreground sm:w-20 shrink-0 flex items-center gap-2">
              <Phone className="size-4" /> Phone:
            </span>
            <Input
              type="tel"
              value={activeConnector.phone || ""}
              onChange={(e) => onUpdateConnector({ phone: e.target.value })}
              className="flex-1"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="flex-1 bg-card border border-border rounded-lg p-6 flex flex-col">
          <span className="text-sm font-medium text-muted-foreground mb-3 block">
            Notes & Details:
          </span>
          <TextArea
            value={activeConnector.notes || ""}
            onChange={(e) => onUpdateConnector({ notes: e.target.value })}
            className="w-full flex-1 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 shadow-none text-sm leading-relaxed bg-transparent"
            placeholder={`Add notes about this ${type === "companies" ? "company" : "contact"}...\n\n- Meeting dates\n- Interaction history\n- Important context`}
          />
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[11px] text-muted-foreground font-mono">
            <span>Last updated: {new Date(activeConnector.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
