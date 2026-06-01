"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";

type GitHubStats = {
  publicRepos: number;
  totalStars: number;
  loading: boolean;
  error: boolean;
};

function defaultStats(): GitHubStats {
  return { publicRepos: 0, totalStars: 0, loading: true, error: false };
}

export function GitHubStatsCard({ username }: { username: string }) {
  const [stats, setStats] = useState<GitHubStats>(defaultStats());

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );

        if (!res.ok) {
          if (!cancelled) setStats((s) => ({ ...s, loading: false, error: true }));
          return;
        }

        const repos = await res.json();
        const totalStars = repos.reduce(
          (sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count,
          0
        );

        if (!cancelled) {
          setStats({
            publicRepos: repos.length,
            totalStars,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) setStats((s) => ({ ...s, loading: false, error: true }));
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <FaGithub className="h-4 w-4 text-accent" />
        GitHub Activity
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-[var(--radius-md)] border border-border bg-background p-4 text-center">
          <div className="text-2xl font-display text-foreground tabular-nums">
            {stats.loading ? (
              <span className="inline-block w-8 h-7 bg-border rounded animate-pulse" />
            ) : stats.error ? (
              "—"
            ) : (
              stats.publicRepos
            )}
          </div>
          <div className="mt-1 text-xs text-muted">Repositories</div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-background p-4 text-center">
          <div className="text-2xl font-display text-foreground tabular-nums">
            {stats.loading ? (
              <span className="inline-block w-8 h-7 bg-border rounded animate-pulse" />
            ) : stats.error ? (
              "—"
            ) : (
              stats.totalStars
            )}
          </div>
          <div className="mt-1 text-xs text-muted">Stars earned</div>
        </div>
      </div>

      <div className="mt-4">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors"
        >
          github.com/{username} →
        </a>
      </div>
    </div>
  );
}
