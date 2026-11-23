"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export type Post = {
  title: string;
  url: string;
  date?: string;
};

function host(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export function BlogSection(props: { username: string; featured: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(props.featured);

  useEffect(() => {
    let cancelled = false;
    const query = `{ publication(host: "${props.username}.hashnode.dev") { posts(first: 5) { edges { node { title url publishedAt } } } } }`;

    fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const edges: { node: { title: string; url: string; publishedAt: string } }[] =
          json?.data?.publication?.posts?.edges ?? [];
        if (cancelled || edges.length === 0) return;
        const latest = edges.map((e) => ({
          title: e.node.title,
          url: e.node.url,
          date: e.node.publishedAt,
        }));
        setPosts((prev) => [
          ...prev,
          ...latest.filter((p) => !prev.some((f) => f.url === p.url)),
        ]);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [props.username]);

  return (
    <ol className="border-t border-border">
      {posts.map((post) => (
        <li key={post.url} className="border-b border-border">
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="group grid grid-cols-1 gap-y-2 py-6 md:grid-cols-12 md:items-baseline md:gap-x-8"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase md:col-span-3">
              {post.date ? formatDate(post.date) : host(post.url)}
            </span>
            <span className="font-serif text-xl leading-snug tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent sm:text-2xl md:col-span-8">
              {post.title}
            </span>
            <ArrowUpRight
              aria-hidden
              strokeWidth={1.5}
              className="hidden h-5 w-5 justify-self-end text-faint transition-colors group-hover:text-accent md:col-span-1 md:block"
            />
          </a>
        </li>
      ))}
    </ol>
  );
}
