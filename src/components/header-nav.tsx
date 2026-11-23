"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";

export function HeaderNav(props: {
  name: string;
  nav: readonly { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="font-serif text-[17px] tracking-[-0.01em] text-foreground"
        >
          {props.name}
        </Link>

        <nav
          className="hidden items-center gap-8 font-mono text-[11px] tracking-[0.14em] uppercase md:flex"
          aria-label="Main navigation"
        >
          {props.nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {i.label}
            </Link>
          ))}
          <span aria-hidden className="h-3 w-px bg-border" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="mx-auto max-w-[1120px] px-6 py-2 sm:px-10">
          {props.nav.map((i) => (
            <li key={i.href} className="border-b border-border last:border-b-0">
              <Link
                href={i.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-serif text-xl text-foreground"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
