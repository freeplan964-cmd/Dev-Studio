import { cn } from "@/lib/utils";
import { Agent } from "@/types/tools";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
        {label}
      </label>
      {children}
    </div>
  );
}

export function StatusDot({
  status,
  className = "",
}: {
  status: Agent["status"];
  className?: string;
}) {
  const color =
    status === "active"
      ? "bg-primary"
      : status === "idle"
        ? "bg-primary/50"
        : "bg-muted-foreground";
  return <span className={`size-2 rounded-full ${color} ${className}`} title={status} />;
}

import { Input as UIInput } from "@/components/ui/input";
import { Textarea as UITextarea } from "@/components/ui/textarea";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <UIInput className={cn("h-8 px-3 text-sm font-mono shadow-none", className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <UITextarea
      className={cn("min-h-[80px] resize-y font-mono text-sm shadow-none", className)}
      {...props}
    />
  );
}
