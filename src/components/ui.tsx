import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Container(props: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", props.className)}>
      {props.children}
    </div>
  );
}

export function SectionHeading(props: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {props.eyebrow ? (
        <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {props.eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
        {props.title}
      </h2>
      {props.description ? (
        <p className="max-w-2xl text-base leading-7 text-muted">
          {props.description}
        </p>
      ) : null}
    </div>
  );
}

export function Badge(props: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}

export function ButtonLink(props: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  target?: "_blank";
  rel?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
  const variant =
    props.variant === "secondary"
      ? "border border-border bg-surface text-foreground hover:bg-background"
      : "bg-foreground text-background hover:bg-foreground/90";

  const Comp = props.href.startsWith("/") ? Link : "a";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyComp: any = Comp;

  return (
    <AnyComp
      href={props.href}
      className={cn(base, variant, props.className)}
      target={props.target}
      rel={props.rel}
    >
      {props.children}
    </AnyComp>
  );
}

export function ExternalLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-foreground underline decoration-border underline-offset-4 hover:decoration-accent",
        props.className,
      )}
    >
      {props.children}
    </a>
  );
}

