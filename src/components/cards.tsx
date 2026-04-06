import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { Badge, ExternalLink } from "@/components/ui";

export function Card(props: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export function ExperienceCard(props: {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: readonly string[];
}) {
  return (
    <Card>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div className="font-display text-lg tracking-tight">{props.role}</div>
          <div className="text-sm text-muted">{props.date}</div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <div className="font-medium text-foreground">{props.company}</div>
          <span className="text-muted">•</span>
          <div className="text-muted">{props.location}</div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ProjectCard(props: {
  name: string;
  tagline: string;
  stack: readonly string[];
  highlights: readonly string[];
  repoUrl: string;
  proofLine?: string;
  caseStudyUrl?: string;
}) {
  return (
    <Card className="group flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg tracking-tight">{props.name}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{props.tagline}</p>
          {props.proofLine ? (
            <p className="mt-2 text-xs font-medium text-foreground/80">
              {props.proofLine}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {props.caseStudyUrl ? (
            <ExternalLink
              href={props.caseStudyUrl}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium no-underline transition-colors hover:border-accent"
            >
              Case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ExternalLink>
          ) : null}
          <ExternalLink
            href={props.repoUrl}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium no-underline transition-colors hover:border-accent"
          >
            Repo{" "}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ExternalLink>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {props.stack.map((s) => (
          <Badge key={s} className="bg-background">
            {s}
          </Badge>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
        {props.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
