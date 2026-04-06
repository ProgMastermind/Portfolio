import { ArrowLeft, ArrowUpRight, Terminal } from "lucide-react";
import type { ReactNode } from "react";

import { Badge, ButtonLink, Container, ExternalLink, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = {
  title: "FerrOS (Rust_OS) — Case Study",
  description:
    "How FerrOS boots from BIOS to an interactive shell, including interrupts, paging, allocators, scheduling, syscalls, and a ramdisk filesystem.",
};

export default function RustOsCaseStudy() {
  const repo = "https://github.com/ProgMastermind/Rust_OS";

  return (
    <div className="min-h-full bg-background">
      <header className="border-b border-border">
        <Container className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-3">
              <a
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </a>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
                FerrOS (Rust_OS)
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted">
                A minimal <span className="text-foreground">x86_64</span> kernel written in{" "}
                <span className="text-foreground">Rust</span> that boots to an interactive
                shell in QEMU. Built to understand the real boot-to-shell stack: interrupts,
                paging, allocation, preemptive scheduling, syscalls, and a small in-memory
                filesystem.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={repo} variant="secondary" target="_blank" rel="noreferrer">
                Repo <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/resume.pdf" variant="secondary">
                Resume
              </ButtonLink>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Rust", "no_std", "x86_64", "Paging", "Preemptive Scheduling", "Syscalls"].map(
              (t) => (
                <Badge key={t} className="bg-background">
                  {t}
                </Badge>
              ),
            )}
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-14 sm:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div className="space-y-12">
              <section>
                <SectionHeading
                  eyebrow="Overview"
                  title="What it does"
                  description="A real bootable kernel (not a toy userspace program) that runs in Ring 0 and boots to a shell prompt."
                />
                <ul className="mt-6 space-y-2 text-sm leading-6 text-muted">
                  {[
                    "BIOS boot into 64-bit Long Mode, then jump into kernel_main.",
                    "VGA text output + serial debugging (UART 0x3F8).",
                    "CPU exceptions + hardware interrupts (PIC timer + PS/2 keyboard).",
                    "4-level page tables + bitmap physical frame allocator.",
                    "Multiple heap allocators (bump, free-list w/ coalescing, fixed-size block).",
                    "Preemptive round-robin scheduler with context switching in naked asm.",
                    "Syscall interface via int 0x80 with pointer validation + errno-style results.",
                    "In-memory ramdisk filesystem + per-process FD tables + blocking stdin I/O.",
                    "Shell with built-in commands (help/echo/ls/cat/pid/uptime/clear/exit).",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <SectionHeading
                  eyebrow="Architecture"
                  title="Subsystem map"
                  description="Organized as a small kernel with clear module boundaries—each layer is implemented from scratch, not stubbed."
                />
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoBox title="Boot + Init">
                    GDT/TSS, IDT, PIC init, interrupts enable, process table setup.
                  </InfoBox>
                  <InfoBox title="Memory">
                    Page table init, global mapper, frame allocator, heap mapping + allocators.
                  </InfoBox>
                  <InfoBox title="Scheduling">
                    Timer interrupt drives a preemptive round-robin scheduler + context switch.
                  </InfoBox>
                  <InfoBox title="Syscalls + FS">
                    int 0x80 dispatch, read/write/open/close, ramdisk VFS, per-process FD table.
                  </InfoBox>
                </div>
              </section>

              <section>
                <SectionHeading
                  eyebrow="Engineering choices"
                  title="Details that make it real"
                  description="The goal was correctness and clarity, not just “it boots.”"
                />
                <ul className="mt-6 space-y-2 text-sm leading-6 text-muted">
                  {[
                    "Guard pages around process stacks to detect stack overflow reliably.",
                    "Blocked process states w/ wakeup from ISR (keyboard interrupt wakes stdin readers).",
                    "Allocator progression: educational allocators → fixed-size allocator for O(1) allocation.",
                    "Kernel tests that boot in QEMU and report over serial (integration-level confidence).",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-accent" />
                  <div className="text-sm font-medium text-foreground">
                    How to run (QEMU)
                  </div>
                </div>
                <div className="mt-4 rounded-[var(--radius-md)] border border-border bg-background p-4">
                  <pre className="overflow-x-auto text-xs leading-5 text-foreground">
{`# Requirements: Rust nightly + QEMU + bootimage
rustup default nightly
rustup component add rust-src llvm-tools
cargo install bootimage

# Run the OS (opens QEMU)
cargo run

# Run the integration tests (headless, via serial)
cargo test`}
                  </pre>
                </div>
                <p className="mt-4 text-sm text-muted">
                  Repo: <ExternalLink href={repo}>{repo}</ExternalLink>
                </p>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  Why it matters for Systems SWE
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  This project demonstrates systems fundamentals end-to-end: CPU/interrupt
                  model, memory translation, allocation strategies, concurrency primitives,
                  safe syscall boundaries, and testability at the integration level.
                </p>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  Write-up
                </div>
                <p className="mt-3 text-sm text-muted">
                  Read the full build notes and design decisions:
                </p>
                <div className="mt-3">
                  <ExternalLink href={site.links.writeups.rustOs ?? repo}>
                    docs/blog-post.md <ArrowUpRight className="inline-block h-4 w-4" />
                  </ExternalLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}

function InfoBox(props: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <div className="text-sm font-medium text-foreground">{props.title}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{props.children}</div>
    </div>
  );
}
