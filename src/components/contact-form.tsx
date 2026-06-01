"use client";

import { Check, Loader2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/cn";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c67cb029-a0fa-4a5e-9463-3831e2b90510",
          ...form,
        }),
      });

      if (res.ok) {
        setState("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-center">
        <Check className="mx-auto h-8 w-8 text-accent" />
        <p className="mt-3 font-medium text-foreground">Message sent!</p>
        <p className="mt-1 text-sm text-muted">
          Thanks for reaching out. I&rsquo;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={cn(
            "mt-1 block w-full rounded-[var(--radius-md)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          )}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={cn(
            "mt-1 block w-full rounded-[var(--radius-md)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          )}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(
            "mt-1 block w-full rounded-[var(--radius-md)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 resize-y",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          )}
          placeholder="Tell me about your opportunity..."
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors",
          "hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
