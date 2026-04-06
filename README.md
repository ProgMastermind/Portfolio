## Portfolio (Next.js + Tailwind)

Clean-minimal portfolio site for **Varaha Surya Prakash D.**  
Designed to look bespoke (no “AI template” gradients), with warm-amber accents and fully responsive layout.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Content lives in:
- `src/lib/site.ts` (data)
- `src/app/page.tsx` (layout/sections)

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import it into Vercel
3. (Recommended) Set an environment variable so metadata + sitemap use the right domain:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Resume

The resume file is served from `public/resume.pdf`.

---
Built with Next.js App Router + Tailwind CSS.
