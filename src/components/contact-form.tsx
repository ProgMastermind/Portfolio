"use client";

import { type FormEvent, useState } from "react";

const fieldClass =
  "mt-2 block w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground placeholder:text-faint focus:border-foreground focus:ring-0 focus:outline-none focus-visible:outline-none transition-colors";

const labelClass = "font-mono text-[11px] tracking-[0.14em] text-muted uppercase";

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
      <div className="border-t border-rule pt-6">
        <p className="font-serif text-2xl text-foreground">Thank you. Your message is on its way.</p>
        <p className="mt-2 text-[15px] text-muted">I usually reply within a couple of days.</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link mt-6 text-[15px]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${fieldClass} resize-y`}
          placeholder="The role, the team, and what you are working on."
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-foreground px-6 py-3 text-[14px] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" ? (
          <p className="text-[14px] text-accent" role="alert">
            That didn&rsquo;t go through. Please email me directly instead.
          </p>
        ) : null}
      </div>
    </form>
  );
}
