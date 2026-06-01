"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme-toggle";

export function HeaderNav(props: {
  name: string;
  nav: readonly { label: string; href: string }[];
  githubUrl: string;
  linkedinUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-display text-sm tracking-tight text-foreground"
          aria-label="Go to top"
        >
          {props.name}
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Main navigation">
          {props.nav.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="transition-colors hover:text-foreground"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={props.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-background"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href={props.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-background"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-background md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/20 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm border-l border-border bg-background p-6 transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between">
            <div className="font-display text-base tracking-tight">{props.name}</div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-1">
            {props.nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                {i.label}
              </a>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href={props.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={props.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
            >
              <FaLinkedinIn className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
