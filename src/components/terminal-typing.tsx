"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const PHRASES = [
  "building kernels that boot to a shell",
  "implementing distributed consensus",
  "automating GPU driver validation",
  "writing garbage collectors from scratch",
  "architecting IPC with subprocess caching",
  "designing Redis-compatible caches",
];

export function TerminalTyping({ className }: { className?: string }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const text = PHRASES[phraseIdx].slice(0, charIdx);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (!deleting && charIdx < phrase.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), 60);
      return () => clearTimeout(timer);
    }

    if (!deleting && charIdx === phrase.length) {
      const timer = setTimeout(() => setDeleting(true), 2500);
      return () => clearTimeout(timer);
    }

    if (deleting && charIdx > 0) {
      const timer = setTimeout(() => setCharIdx((c) => c - 1), 30);
      return () => clearTimeout(timer);
    }

    if (deleting && charIdx === 0) {
      const timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((p) => (p + 1) % PHRASES.length);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [charIdx, deleting, phraseIdx]);

  return (
    <div className={cn("font-mono text-sm text-muted", className)}>
      <span className="text-accent mr-2" aria-hidden="true">
        &gt;
      </span>
      <span className="text-foreground">./engineer</span>
      <span className="text-accent mx-1">--focus</span>
      <span className="text-muted">{text}</span>
      <span
        className={cn(
          "inline-block w-2 h-[1em] align-middle ml-0.5 bg-accent",
          !showCursor && "opacity-0"
        )}
        role="presentation"
      />
    </div>
  );
}
