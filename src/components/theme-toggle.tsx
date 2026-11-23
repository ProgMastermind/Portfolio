"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground",
        className,
      )}
      aria-label={`Switch to ${next} theme`}
    >
      {next === "dark" ? "Dark" : "Light"}
    </button>
  );
}
