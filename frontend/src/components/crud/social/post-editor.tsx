import { Save, Image as ImageIcon, Hash } from "lucide-react";
import type { SocialDraft } from "@/types/tools";
import { Input, TextArea } from "@/features/tools/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PostEditorProps {
  platform: string;
  activeDraft: SocialDraft | null;
  onUpdateDraft: (updates: Partial<SocialDraft>) => void;
  onSave: () => void;
}

const PLATFORM_LIMITS: Record<string, number> = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
};

export function PostEditor({ platform, activeDraft, onUpdateDraft, onSave }: PostEditorProps) {
  if (!activeDraft) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        Select a draft or create a new one to start writing.
      </div>
    );
  }

  const limit = PLATFORM_LIMITS[platform] || 2000;
  const currentLength = (activeDraft.content || "").length;
  const isOverLimit = currentLength > limit;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-10 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold capitalize">{platform} Workspace</h2>
        <Button
          onClick={onSave}
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Save className="size-4" /> Save Draft
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
        <div className="bg-card border border-border rounded-lg p-3 flex flex-col sm:flex-row flex-wrap gap-4">
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <Hash className="size-4 text-muted-foreground shrink-0" />
            <Input
              type="text"
              value=""
              onChange={() => {}}
              className="flex-1"
              placeholder="Add tags (e.g., #buildinpublic, #tech)"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ImageIcon className="size-4" /> Add Media
          </Button>
        </div>

        <div
          className={cn(
            "flex-1 bg-card border rounded-lg p-4 sm:p-6 flex flex-col transition-all",
            isOverLimit
              ? "border-destructive/50 focus-within:ring-1 focus-within:ring-destructive/20"
              : "border-border",
          )}
        >
          <TextArea
            value={activeDraft.content || ""}
            onChange={(e) => onUpdateDraft({ content: e.target.value })}
            className="w-full flex-1 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 shadow-none text-sm leading-relaxed"
            placeholder={`Write your ${platform} post here...\n\nDon't forget to include line breaks for readability!`}
          />
          <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[11px] font-mono">
            <span
              className={isOverLimit ? "text-destructive font-medium" : "text-muted-foreground"}
            >
              {currentLength} / {limit} characters
            </span>
            <span className="text-muted-foreground">
              Last updated: {new Date(activeDraft.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
