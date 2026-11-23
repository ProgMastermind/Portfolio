export type SiteProject = {
  name: string;
  domain: string;
  tagline: string;
  stack: string[];
  proofLine?: string;
  links: {
    repo: string;
    caseStudy?: string;
    writeup?: string;
  };
  highlights: string[];
};

export type Site = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  metaDescription: string;
  links: {
    github: string;
    linkedin: string;
    x: string;
    writeups: {
      rustOs?: string;
      raft?: string;
    };
  };
  summary: string;
  currently: {
    role: string;
    learning: string;
    reading: string;
  };
  skills: {
    languages: string[];
    frameworks: string[];
    infra: string[];
    databases: string[];
  };
  experience: {
    company: string;
    role: string;
    date: string;
    location: string;
    metrics: { value: string; label: string }[];
    bullets: string[];
  }[];
  education: {
    school: string;
    degree: string;
    date: string;
    location: string;
    meta: string;
  }[];
  projects: SiteProject[];
  blog: {
    hashnodeUsername: string;
  };
};

export const site: Site = {
  name: "Varaha Surya Prakash D.",
  title: "Software Engineer",
  location: "Bengaluru, India",
  email: "prakashcollymore@gmail.com",
  phone: "+91-9398233616",
  resumeUrl: "https://drive.google.com/file/d/1RXspcoM-4QtNWunIYm4rP7ZLiA1qhL4R/view?usp=sharing",
  metaDescription:
    "Software engineer working on systems and backend software: distributed consensus, kernels, runtimes, and validation tooling for GPU drivers at Intel.",
  links: {
    github: "https://github.com/ProgMastermind",
    linkedin: "https://www.linkedin.com/in/soulglory/",
    x: "https://twitter.com/PrakashCollymo1",
    writeups: {
      // Public write-up (preferred over repo markdown for recruiters).
      rustOs:
        "https://rustos.hashnode.dev/i-wrote-an-os-in-rust-to-understand-what-my-code-runs-on",
      raft:
        "https://elixir-raft.hashnode.dev/i-built-raft-consensus-from-scratch-in-elixir-here-s-what-the-paper-doesn-t-tell-you",
    },
  },
  summary:
    "Software engineer with strong systems and backend fundamentals (performance, reliability, distributed systems) and experience building the tooling and interfaces that make platforms usable. Currently a GPU Software Development Intern at Intel, focused on fast, reliable automation for graphics driver validation.",
  currently: {
    role: "GPU Software Development Intern at Intel",
    learning: "Gen AI & Agentic Engineering",
    reading: "",
  },
  skills: {
    languages: ["Go", "Elixir", "Rust", "Java", "Python", "JavaScript"],
    frameworks: ["OTP", "Phoenix", "React", "Node.js", "Express"],
    infra: ["Linux", "Docker", "Kubernetes", "OpenCV", "Git"],
    databases: ["Redis", "MongoDB", "MySQL"],
  },
  experience: [
    {
      company: "Intel Corporation",
      role: "GPU Software Development Intern",
      date: "Jul 2025 — Present",
      location: "Bengaluru, India",
      metrics: [
        { value: "4×", label: "driver validation throughput" },
        { value: "5×", label: "faster tool response via IPC" },
        { value: "½ day", label: "code generation, down from 2–3 days" },
      ],
      bullets: [
        "Developed and deployed automated validation frameworks for graphics driver testing, increasing validation throughput 4× (from 1 game per two weeks to 2 per week) across diverse titles and resolution configurations.",
        "Architected an IPC system with subprocess caching that accelerated tool response times by 5× (from ~1–1.2s to 0.1–0.3s per call), replacing network calls with system-level IPC and eliminating server overhead.",
        "Integrated OCR-based validation into the OpenCV–Sikuli pipeline, improving detection accuracy and removing manual threshold calibration; API adopted by multiple teams.",
        "Designed a pipe-based communication bridge for isolated subprocesses, resolving critical dependency conflicts while keeping modules independently executable.",
        "Automated the end-to-end code generation pipeline using OmniParser and Qwen VLM, cutting manual effort from 2–3 days to half a day by replacing hand-written extraction with vision-based parsing and automated code synthesis.",
      ],
    },
  ],
  education: [
    {
      school: "Vellore Institute of Technology",
      degree: "Integrated M.Tech in Software Engineering",
      date: "Dec 2021 — May 2026",
      location: "Amaravati, AP",
      meta: "GPA: 9.42 / 10.0",
    },
  ],
  projects: [
    {
      name: "RaftEx",
      domain: "Distributed systems",
      tagline: "The Raft consensus protocol, implemented from the paper in Elixir/OTP.",
      stack: ["Elixir", "OTP", "gen_statem", "TCP", "DETS"],
      proofLine: "19 stars · interactive demo · test suite",
      links: {
        repo: "https://github.com/ProgMastermind/raft-elixir",
        writeup: "https://elixir-raft.hashnode.dev/i-built-raft-consensus-from-scratch-in-elixir-here-s-what-the-paper-doesn-t-tell-you",
      },
      highlights: [
        "Complete Raft implementation: leader election, log replication, snapshots, and joint-consensus membership changes.",
        "Framed TCP transport with connection pooling and reconnect; crash-safe persistence of term/vote/log state via DETS.",
        "Includes an interactive demo and comprehensive tests; code annotated with Raft paper sections.",
      ],
    },
    {
      name: "ElixirCache",
      domain: "Storage & networking",
      tagline: "Redis-compatible in-memory cache with replication and RESP.",
      stack: ["Elixir", "OTP", "ETS", "RESP", "Replication"],
      proofLine: "15 stars · 20+ Redis commands · replication",
      links: {
        repo: "https://github.com/ProgMastermind/ElixirCache",
      },
      highlights: [
        "Redis protocol compatibility across 20+ commands: transactions, pub/sub, streams, lists, sorted sets, TTL, and BLPOP disconnection handling.",
        "Master–replica replication with Redis-compatible PSYNC-style synchronization and command buffering.",
        "Built for high concurrency with fault-isolated processes and automated recovery workflows, with tests and demos.",
      ],
    },
    {
      name: "FerrOS",
      domain: "Operating systems",
      tagline: "A preemptive x86_64 kernel in Rust that boots to an interactive shell.",
      stack: ["Rust", "x86_64", "Paging", "Scheduling", "Syscalls"],
      proofLine: "no_std · 23 QEMU integration tests",
      links: {
        repo: "https://github.com/ProgMastermind/Rust_OS",
        caseStudy: "/projects/rust-os",
        writeup: "https://rustos.hashnode.dev/i-wrote-an-os-in-rust-to-understand-what-my-code-runs-on",
      },
      highlights: [
        "Boot-to-shell path: interrupts (PIC remap), page tables, bitmap frame allocator, and heap allocation strategies.",
        "Preemptive multitasking with guard pages, 15-line naked-asm context switch, round-robin scheduling, and int 0x80 syscalls.",
        "Ramdisk filesystem with per-process FD tables; 23 integration/unit tests that boot in QEMU and report via serial.",
      ],
    },
    {
      name: "Work-Stealing Scheduler",
      domain: "Concurrency",
      tagline: "A work-stealing task scheduler in Go, modelled on the Go runtime.",
      stack: ["Go", "Work Stealing", "Queues", "Metrics"],
      proofLine: "17 stars · per-processor queues",
      links: {
        repo: "https://github.com/ProgMastermind/work-stealing",
      },
      highlights: [
        "Local queues per processor with randomized victim selection for stealing, plus a global queue for balancing.",
        "Supports blocking/non-blocking tasks with a network poller abstraction and runtime monitoring.",
        "Designed to minimize contention with atomic metrics and low-overhead task state tracking.",
      ],
    },
    {
      name: "TriMark",
      domain: "Language runtimes",
      tagline: "A working model of Go’s concurrent tri-color mark-and-sweep collector.",
      stack: ["Go", "Concurrency", "Write Barriers", "Runtime Internals"],
      proofLine: "10 phases · race-tested · design doc",
      links: {
        repo: "https://github.com/ProgMastermind/Garbage-Collector",
      },
      highlights: [
        "Built progressively across 10 phases: STW mark-sweep → concurrent trace/sweep with hybrid write barrier and GC assist.",
        "Models Go’s four-phase cycle, GOGC-based pacing, goroutine stack scanning for root discovery, and span-based memory with per-span locking.",
        "Includes demos and a large test suite (one intentionally failing test to prove the barrier necessity).",
      ],
    },
  ],
  blog: {
    hashnodeUsername: "progmastermind",
  },
};
