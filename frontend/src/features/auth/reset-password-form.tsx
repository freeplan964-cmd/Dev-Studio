import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm text-center">
        <div className="space-y-1">
          <h2 className="font-semibold text-base">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            If an account exists for <strong>{email}</strong>, a reset link has been sent.
          </p>
        </div>
        <Link
          to="/auth"
          search={{ error: undefined }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Reset your password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Send reset link
        </button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        <Link
          to="/auth"
          search={{ error: undefined }}
          className="hover:text-foreground transition-colors"
        >
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}
