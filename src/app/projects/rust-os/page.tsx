import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { HeaderNav } from "@/components/header-nav";
import { Container, Eyebrow, Section, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `FerrOS, a preemptive x86_64 kernel in Rust · ${site.name}`,
  description:
    "How FerrOS boots from BIOS to an interactive shell, including interrupts, paging, allocators, scheduling, syscalls, and a ramdisk filesystem.",
};

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
] as const;

const repo = "https://github.com/ProgMastermind/Rust_OS";

const overview = [
  "BIOS boot into 64-bit Long Mode, then jump into kernel_main.",
  "VGA text output and serial debugging (UART 0x3F8).",
  "CPU exceptions and hardware interrupts (PIC timer and PS/2 keyboard).",
  "4-level page tables and bitmap physical frame allocator.",
  "Multiple heap allocators (bump, free-list with coalescing, fixed-size block).",
  "Preemptive round-robin scheduler with context switching in naked asm.",
  "Syscall interface via int 0x80 with pointer validation and errno-style results.",
  "In-memory ramdisk filesystem and per-process FD tables and blocking stdin I/O.",
  "Shell with built-in commands (help/echo/ls/cat/pid/uptime/clear/exit).",
];

const subsystems = [
  ["Boot and init", "GDT/TSS, IDT, PIC initialisation, enabling interrupts, process table setup."],
  ["Memory", "Page table init, global mapper, frame allocator, heap mapping and allocators."],
  [
    "Scheduling",
    "The timer interrupt drives a preemptive round-robin scheduler and context switch.",
  ],
  [
    "Syscalls and FS",
    "int 0x80 dispatch, read/write/open/close, ramdisk VFS, per-process FD table.",
  ],
] as const;

const choices = [
  "Guard pages around process stacks to detect stack overflow reliably.",
  "Blocked process states with wakeup from ISR (keyboard interrupt wakes stdin readers).",
  "Allocator progression: educational allocators → fixed-size allocator for O(1) allocation.",
  "Kernel tests that boot in QEMU and report over serial (integration-level confidence).",
];

function Offset(props: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8">
      <div className="md:col-span-9 md:col-start-4">{props.children}</div>
    </div>
  );
}

const bulletClass =
  "relative pl-6 text-[15px] leading-7 text-foreground/85 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-3 before:bg-faint";

export default function RustOsCaseStudy() {
  return (
    <div id="top">
      <HeaderNav name={site.name} nav={nav} />

      <main id="main-content">
        <Container className="pt-16 pb-12 sm:pt-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            All projects
          </Link>
          <div className="rise mt-10">
            <Eyebrow>Case study · Operating systems</Eyebrow>
            <h1 className="mt-6 font-serif text-[48px] leading-[1.02] tracking-[-0.025em] sm:text-[72px]">
              FerrOS
            </h1>
            <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.65] text-muted">
              A minimal x86_64 kernel written in Rust that boots to an interactive shell in QEMU. I
              built it to understand the real boot-to-shell path: interrupts, paging, allocation,
              preemptive scheduling, syscalls, and a small in-memory filesystem.
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-6 md:grid-cols-4">
            {(
              [
                ["Language", "Rust, no_std"],
                ["Target", "x86_64, QEMU"],
                ["Tests", "23 QEMU integration tests"],
                ["Links", null],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {k}
                </dt>
                <dd className="mt-3 text-[15px] leading-6">
                  {v ?? (
                    <span className="flex flex-col items-start gap-1">
                      <TextLink href={repo} arrow>
                        Source
                      </TextLink>
                      {site.links.writeups.rustOs ? (
                        <TextLink href={site.links.writeups.rustOs} arrow>
                          Write-up
                        </TextLink>
                      ) : null}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Container>

        <Section
          id="overview"
          index="01"
          title="Overview"
          lede="A real bootable kernel that runs in ring 0, not a userspace simulation."
        >
          <Offset>
            <ul className="max-w-[68ch] space-y-3">
              {overview.map((x) => (
                <li key={x} className={bulletClass}>
                  {x}
                </li>
              ))}
            </ul>
          </Offset>
        </Section>

        <Section
          id="architecture"
          index="02"
          title="Architecture"
          lede="A small kernel with clear module boundaries. Every layer is implemented, not stubbed."
        >
          <Offset>
            <dl className="divide-y divide-border border-y border-border">
              {subsystems.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[200px_1fr]">
                  <dt className="font-serif text-[20px] tracking-[-0.01em]">{k}</dt>
                  <dd className="text-[15px] leading-7 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </Offset>
        </Section>

        <Section
          id="choices"
          index="03"
          title="Engineering choices"
          lede="The goal was correctness and clarity, not only getting it to boot."
        >
          <Offset>
            <ul className="max-w-[68ch] space-y-3">
              {choices.map((x) => (
                <li key={x} className={bulletClass}>
                  {x}
                </li>
              ))}
            </ul>
          </Offset>
        </Section>

        <Section
          id="run"
          index="04"
          title="Run it"
          lede="Requires Rust nightly, QEMU, and bootimage."
        >
          <Offset>
            <pre className="overflow-x-auto border-y border-border bg-surface px-6 py-6 font-mono text-[13px] leading-6 text-foreground">
              {`# Requirements: Rust nightly and QEMU and bootimage
rustup default nightly
rustup component add rust-src llvm-tools
cargo install bootimage

# Run the OS (opens QEMU)
cargo run

# Run the integration tests (headless, via serial)
cargo test`}
            </pre>
          </Offset>
        </Section>
      </main>

      <footer>
        <Container className="flex flex-col gap-3 border-t border-border py-8 font-mono text-[11px] tracking-[0.08em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <Link href="/" className="transition-colors hover:text-foreground">
            Back to home
          </Link>
        </Container>
      </footer>
    </div>
  );
}
