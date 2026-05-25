import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddQuestionFormProps {
  onSave: (title: string, guide: string) => void;
  onCancel: () => void;
}

export function AddQuestionForm({ onSave, onCancel }: AddQuestionFormProps) {
  const [title, setTitle] = useState("");
  const [guide, setGuide] = useState("");

  return (
    <div className="p-3 border-b border-border/60 space-y-2 bg-muted/20">
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Question title…"
        className="bg-background border-border/60 rounded-xl text-xs focus:ring-1 focus:ring-primary/30 focus:border-primary/40 shadow-none"
      />
      <Textarea
        rows={2}
        value={guide}
        onChange={(e) => setGuide(e.target.value)}
        placeholder="Answer guide / tips (optional)"
        className="bg-background border-border/60 rounded-xl text-xs focus:ring-1 focus:ring-primary/30 focus:border-primary/40 resize-none shadow-none"
      />
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => title.trim() && onSave(title, guide)}
          disabled={!title.trim()}
          className={cn(
            "flex-1 py-1.5 rounded-xl text-xs font-medium transition-all",
            title.trim()
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
        >
          Add Question
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-xl text-xs text-muted-foreground hover:bg-muted/60 transition-all"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  );
}
