import { useState, useEffect } from "react";
import { Loader2, Trash2, ExternalLink, Handshake } from "lucide-react";
import type { FreelanceOffer, OfferStatus } from "@/types/jobs";
import { OFFER_STATUSES, OFFER_PLATFORMS, OFFER_CATEGORIES } from "@/types/jobs";
import { OFFER_STATUS_LABELS } from "@/constants";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
  offer: FreelanceOffer | null;
  isNew: boolean;
  onSave: (offer: Partial<FreelanceOffer>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const EMPTY: Partial<FreelanceOffer> = {
  title: "",
  client: "",
  platform: "Mostaql",
  budget: "",
  currency: "USD",
  status: "new",
  description: "",
  url: "",
  deadline: "",
  category: "",
  tags: [],
  notes: "",
};

const CURRENCIES = ["USD", "EUR", "SAR", "EGP", "AED", "GBP"];

export function OfferEditor({ offer, isNew, onSave, onDelete }: Props) {
  const [form, setForm] = useState<Partial<FreelanceOffer>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (offer) {
      setForm({ ...offer });
      setTagInput("");
    } else if (isNew) {
      setForm({ ...EMPTY });
      setTagInput("");
    }
  }, [offer, isNew]);

  if (!offer && !isNew) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
        <div className="size-12 rounded-full bg-primary/10 grid place-items-center">
          <Handshake className="size-5 text-primary" />
        </div>
        <p className="text-sm font-medium">Track Freelance Offers</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Log offers you receive from Mostaql, Upwork, Freelancer, Fiverr and other platforms. Track
          budget, status, and deadlines.
        </p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!form.title?.trim()) {
      toast.error("Title is required.");
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!offer) return;
    if (!confirm("Delete this offer?")) return;
    setDeleting(true);
    try {
      await onDelete(offer.id);
    } finally {
      setDeleting(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags?.includes(t)) setForm((p) => ({ ...p, tags: [...(p.tags ?? []), t] }));
    setTagInput("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border shrink-0 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold flex-1 truncate">
          {offer ? `Edit: ${offer.title}` : "Add Offer"}
        </h2>
        {offer && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="size-7 grid place-items-center rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
            title="Delete"
          >
            {deleting ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-xl space-y-4">
          <Field label="Offer Title *">
            <Input
              value={form.title ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Build a React dashboard"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client Name">
              <Input
                value={form.client ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))}
                placeholder="John D."
              />
            </Field>
            <Field label="Platform">
              <Select
                value={form.platform ?? "Mostaql"}
                onValueChange={(v) => setForm((p) => ({ ...p, platform: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OFFER_PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <Select
                value={form.category || undefined}
                onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {OFFER_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <Select
                value={form.status ?? "new"}
                onValueChange={(v) => setForm((p) => ({ ...p, status: v as OfferStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OFFER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{OFFER_STATUS_LABELS[s] ?? s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field label="Budget">
                <Input
                  value={form.budget ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                  placeholder="500"
                />
              </Field>
            </div>
            <Field label="Currency">
              <Select
                value={form.currency ?? "USD"}
                onValueChange={(v) => setForm((p) => ({ ...p, currency: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Deadline">
            <Input
              type="date"
              value={form.deadline ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
            />
          </Field>
          <Field label="Offer URL">
            <Input
              type="url"
              value={form.url ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://mostaql.com/projects/…"
            />
          </Field>
          <Field label="Description">
            <Textarea
              className="min-h-[80px] resize-y"
              value={form.description ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What the client needs…"
            />
          </Field>
          <Field label="Tags">
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {(form.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                >
                  {t}{" "}
                  <button
                    onClick={() => setForm((p) => ({ ...p, tags: p.tags?.filter((x) => x !== t) }))}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag…"
              />
              <button
                onClick={addTag}
                className="px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-sidebar-accent/40 text-muted-foreground hover:text-foreground transition-colors"
              >
                Add
              </button>
            </div>
          </Field>
          <Field label="Notes">
            <Textarea
              className="min-h-[70px] resize-y"
              value={form.notes ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Your notes, questions, proposal ideas…"
            />
          </Field>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity font-medium"
            >
              {saving && <Loader2 className="size-3.5 animate-spin" />}
              {offer ? "Save Changes" : "Add Offer"}
            </button>
            {offer?.url && (
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-md hover:bg-sidebar-accent/40 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="size-3.5" /> Open
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
