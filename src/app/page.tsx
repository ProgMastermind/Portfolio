import { BlogSection } from "@/components/blog-section";
import { ContactForm } from "@/components/contact-form";
import { HeaderNav } from "@/components/header-nav";
import { Container, Eyebrow, Section, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

const metricCols = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
} as const;

const featuredWriting = [
  site.links.writeups.raft && {
    title: "I built Raft consensus from scratch in Elixir. Here’s what the paper doesn’t tell you.",
    url: site.links.writeups.raft,
  },
  site.links.writeups.rustOs && {
    title: "I wrote an OS in Rust to understand what my code runs on.",
    url: site.links.writeups.rustOs,
  },
].filter((p): p is { title: string; url: string } => Boolean(p));

export default function Home() {
  const education = site.education[0];

  return (
    <div id="top">
      <HeaderNav name={site.name} nav={nav} />

      <main id="main-content">
        <Container className="pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="rise">
            <Eyebrow>
              {site.title}
              <span className="mx-2 text-faint">·</span>
              {site.location}
            </Eyebrow>
            <h1 className="mt-8 max-w-[17ch] font-serif text-[42px] leading-[1.04] font-normal tracking-[-0.025em] text-foreground sm:text-[64px] lg:text-[76px]">
              Software engineer working on systems, backends, and the{" "}
              <em className="text-accent">tooling</em> around them.
            </h1>
            <p className="mt-10 max-w-[60ch] text-[17px] leading-[1.7] text-muted">
              I&rsquo;m a software engineer at Bytebeam, building a product backend from
              scratch in Rust and PostgreSQL. Before that I optimised LLM
              inference on AMD MI300X GPUs and built driver-validation automation at
              Intel. Outside work I build the things I want to understand properly:
              Raft in Elixir, a preemptive kernel in Rust, and a model of Go&rsquo;s
              garbage collector.
            </p>
          </div>

          <dl className="rise mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-6 [animation-delay:120ms] md:grid-cols-4">
            <Fact label="Now">
              {site.experience[0].company}
              <br />
              <span className="text-muted">SDE-1 · Rust</span>
            </Fact>
            <Fact label="Education">
              {education.school.replace("Vellore Institute of Technology", "VIT")},{" "}
              Integrated M.Tech
              <br />
              <span className="text-muted">{education.meta.replace("GPA: ", "GPA ")}</span>
            </Fact>
            <Fact label="Based in">{site.location}</Fact>
            <Fact label="Elsewhere">
              <span className="flex flex-col items-start gap-1">
                <TextLink href={site.resumeUrl} arrow>
                  Résumé
                </TextLink>
                <TextLink href={site.links.github} arrow>
                  GitHub
                </TextLink>
                <TextLink href={site.links.linkedin} arrow>
                  LinkedIn
                </TextLink>
              </span>
            </Fact>
          </dl>
        </Container>

        <Section
          id="work"
          index="01"
          title="Work"
          lede="Backend services, LLM inference performance, and validation tooling, where speed and repeatability both matter."
        >
          <div className="space-y-16">
            {site.experience.map((e, i) => (
              <article
                key={`${e.company}-${e.role}`}
                className={`grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-8 ${i > 0 ? "border-t border-border pt-16" : ""}`}
              >
                <div className="md:col-span-3">
                  <div className="font-mono text-[12px] text-foreground">{e.date}</div>
                  <div className="mt-1 font-mono text-[12px] text-muted">{e.location}</div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-[28px] leading-tight tracking-[-0.015em]">
                    {e.company}
                  </h3>
                  <div className="mt-1 text-[15px] text-muted">{e.role}</div>

                  {e.metrics.length > 0 ? (
                    <dl
                      className={`mt-10 grid grid-cols-1 border-y border-border ${metricCols[e.metrics.length as keyof typeof metricCols]}`}
                    >
                      {e.metrics.map((m, i) => (
                        <div
                          key={m.label}
                          className={`py-6 sm:px-6 ${i === 0 ? "sm:pl-0" : "border-t border-border sm:border-t-0 sm:border-l"}`}
                        >
                          <dt className="sr-only">{m.label}</dt>
                          <dd className="font-serif text-[44px] leading-none tracking-[-0.02em] text-accent tabular-nums">
                            {m.value}
                          </dd>
                          <dd className="mt-3 text-[13px] leading-5 text-muted">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <ul className="mt-10 max-w-[68ch] space-y-4">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-6 text-[15px] leading-7 text-foreground/85 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-3 before:bg-faint"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          index="02"
          title="Projects"
          lede="Systems I built to understand how they really work. Each one is tested and documented."
        >
          <div className="border-t border-border">
            {site.projects.map((p, i) => (
              <article
                key={p.name}
                className="grid grid-cols-1 gap-y-5 border-b border-border py-12 md:grid-cols-12 md:gap-x-8"
              >
                <div className="md:col-span-3">
                  <div className="font-mono text-[12px] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {p.domain}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-[32px] leading-tight tracking-[-0.02em]">
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-[56ch] text-[16px] leading-7 text-muted">
                    {p.tagline}
                  </p>

                  <ul className="mt-6 max-w-[68ch] space-y-3">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="relative pl-6 text-[15px] leading-7 text-foreground/85 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-3 before:bg-faint"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="font-mono text-[12px] text-muted">
                      {p.stack.join(" / ")}
                      {p.proofLine ? (
                        <span className="block text-faint sm:mt-1">{p.proofLine}</span>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-6 text-[14px]">
                      {p.links.caseStudy ? (
                        <TextLink href={p.links.caseStudy}>Case study</TextLink>
                      ) : null}
                      {p.links.writeup ? (
                        <TextLink href={p.links.writeup} arrow>
                          Write-up
                        </TextLink>
                      ) : null}
                      <TextLink href={p.links.repo} arrow>
                        Source
                      </TextLink>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="writing"
          index="03"
          title="Writing"
          lede="Long-form notes written alongside the code: what the papers leave out, and what broke."
        >
          <BlogSection username={site.blog.hashnodeUsername} featured={featuredWriting} />
        </Section>

        <Section id="background" index="04" title="Background">
          <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-3">
              <Eyebrow>Toolbox</Eyebrow>
            </div>
            <dl className="divide-y divide-border border-y border-border md:col-span-9">
              {(
                [
                  ["Languages", site.skills.languages],
                  ["Frameworks", site.skills.frameworks],
                  ["GenAI", site.skills.genai],
                  ["GPU & inference", site.skills.gpu],
                  ["Infrastructure", site.skills.infra],
                  ["Databases", site.skills.databases],
                ] as const
              ).map(([label, items]) => (
                <div key={label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr]">
                  <dt className="text-[14px] text-muted">{label}</dt>
                  <dd className="text-[15px] text-foreground">{items.join(", ")}</dd>
                </div>
              ))}
            </dl>

            <div className="md:col-span-3">
              <Eyebrow>Education</Eyebrow>
            </div>
            <div className="md:col-span-9">
              {site.education.map((e) => (
                <div
                  key={e.school}
                  className="flex flex-col gap-1 border-y border-border py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <div className="font-serif text-[22px] tracking-[-0.01em]">{e.school}</div>
                    <div className="mt-1 text-[15px] text-muted">
                      {e.degree} · {e.meta.replace("GPA: ", "GPA ")}
                    </div>
                  </div>
                  <div className="font-mono text-[12px] text-muted sm:text-right">
                    {e.date}
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> · </span>
                    {e.location}
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3">
              <Eyebrow>Certifications</Eyebrow>
            </div>
            <div className="md:col-span-9">
              <ul className="divide-y divide-border border-y border-border">
                {site.certifications.map((certification) => (
                  <li key={certification} className="py-3 text-[15px] text-foreground">
                    {certification}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="contact"
          index="05"
          title="Contact"
          lede="Hiring for systems, backend, or infrastructure work? I would like to hear about it."
        >
          <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-5 lg:col-span-4">
              <Eyebrow>Direct</Eyebrow>
              <a
                href={`mailto:${site.email}`}
                className="link mt-4 inline-block font-serif text-[22px] break-all sm:text-[24px]"
              >
                {site.email}
              </a>
              <div className="mt-3 font-mono text-[13px] text-muted">{site.phone}</div>

              <ul className="mt-10 space-y-2 text-[15px]">
                <li>
                  <TextLink href={site.links.linkedin} arrow>
                    LinkedIn
                  </TextLink>
                </li>
                <li>
                  <TextLink href={site.links.github} arrow>
                    GitHub
                  </TextLink>
                </li>
                <li>
                  <TextLink href={site.links.x} arrow>
                    X / Twitter
                  </TextLink>
                </li>
                <li>
                  <TextLink href={site.resumeUrl} arrow>
                    Résumé (PDF)
                  </TextLink>
                </li>
              </ul>
            </div>
            <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>

      <footer>
        <Container className="flex flex-col gap-3 border-t border-border py-8 font-mono text-[11px] tracking-[0.08em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Set in Newsreader and IBM Plex.</span>
          <a href="#top" className="transition-colors hover:text-foreground">
            Back to top ↑
          </a>
        </Container>
      </footer>
    </div>
  );
}

function Fact(props: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {props.label}
      </dt>
      <dd className="mt-3 text-[15px] leading-6 text-foreground">{props.children}</dd>
    </div>
  );
}
