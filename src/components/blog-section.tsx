"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type HashnodePost = {
  title: string;
  brief: string;
  url: string;
  dateAdded: string;
  coverImage?: string;
};

export function BlogSection({ username }: { username: string }) {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        const query = `{ publication(host: "${username}.hashnode.dev") { posts(first: 3) { edges { node { title brief url dateAdded coverImage { url } } } } } }`;
        const res = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          if (!cancelled) setLoading(false);
          return;
        }

        const json = await res.json();
        const edges = json.data?.publication?.posts?.edges ?? [];
        if (!cancelled) {
          setPosts(edges.map((e: { node: HashnodePost }) => e.node));
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 animate-pulse"
          >
            <div className="h-5 w-3/4 bg-border rounded" />
            <div className="mt-2 h-4 w-full bg-border rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {posts.map((post) => (
        <a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors hover:border-accent"
        >
          <h4 className="font-display text-sm tracking-tight text-foreground line-clamp-2">
            {post.title}
          </h4>
          <p className="mt-2 text-xs leading-5 text-muted line-clamp-2">
            {post.brief}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <time className="text-xs text-muted/70">
              {new Date(post.dateAdded).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
          </div>
        </a>
      ))}
    </div>
  );
}
