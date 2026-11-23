import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Container(props: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] px-6 sm:px-10", props.className)}>
      {props.children}
    </div>
  );
}

export function Eyebrow(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "font-mono text-[11px] tracking-[0.14em] text-muted uppercase",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export function Section(props: {
  id: string;
  index: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={props.id} className="scroll-mt-20">
      <Container className="py-16 sm:py-24">
        <header className="grid grid-cols-1 gap-y-4 border-t border-rule pt-5 md:grid-cols-12 md:gap-x-8">
          <Eyebrow className="md:col-span-3">
            <span className="text-accent">{props.index}</span>
            <span className="mx-2 text-faint">/</span>
            {props.title}
          </Eyebrow>
          {props.lede ? (
            <p className="font-serif text-2xl leading-snug tracking-[-0.01em] text-foreground sm:text-[28px] md:col-span-9 md:max-w-[34ch]">
              {props.lede}
            </p>
          ) : null}
        </header>
        <div className="mt-12 sm:mt-14">{props.children}</div>
      </Container>
    </section>
  );
}

export function TextLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const external = /^(https?:|mailto:)/.test(props.href) || props.href.endsWith(".pdf");
  const content = (
    <>
      {props.children}
      {props.arrow ? (
        <ArrowUpRight
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[0.9em] -translate-y-px"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if (!external) {
    return (
      <Link href={props.href} className={cn("link", props.className)}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={props.href}
      target={props.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      className={cn("link", props.className)}
    >
      {content}
    </a>
  );
}
