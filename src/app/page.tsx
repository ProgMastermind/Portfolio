import {
  BookOpen,
  Brain,
  Briefcase,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { BlogSection } from "@/components/blog-section";
import { ExperienceCard, ProjectCard } from "@/components/cards";
import { ContactForm } from "@/components/contact-form";
import { GitHubStatsCard } from "@/components/github-stats";
import { HeaderNav } from "@/components/header-nav";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TerminalTyping } from "@/components/terminal-typing";
import {
  Badge,
  ButtonLink,
  Container,
  ExternalLink,
  SectionHeading,
} from "@/components/ui";
import { site } from "@/lib/site";

const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Home() {
  return (
    <div className="min-h-full bg-background">
      <HeaderNav
        name={site.name}
        nav={nav}
        githubUrl={site.links.github}
        linkedinUrl={site.links.linkedin}
      />

      <main id="main-content" className="flex-1">
        {/* HERO */}
        <section className="border-b border-border">
          <Container className="py-16 sm:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {site.title} · {site.location}
                </div>

                <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
                  Software Engineer — systems, backend, and full‑stack engineering.
                </h1>

                <div className="mt-5 h-6">
                  <TerminalTyping />
                </div>

                <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {site.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink
                    href={`mailto:${site.email}`}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Mail className="h-4 w-4" />
                    Email me
                  </ButtonLink>
                  <ButtonLink
                    href={site.links.github}
                    variant="secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </ButtonLink>
                  <ButtonLink href="https://drive.google.com/file/d/1RXspcoM-4QtNWunIYm4rP7ZLiA1qhL4R/view?usp=sharing" variant="secondary" target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" />
                    Resume
                  </ButtonLink>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                  <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    What I build
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>Systems software</Badge>
                    <Badge>Backend services & APIs</Badge>
                    <Badge>Distributed systems</Badge>
                    <Badge>Performance & reliability</Badge>
                    <Badge>Developer tooling</Badge>
                    <Badge>User-facing interfaces</Badge>
                  </div>

                  <div className="mt-8 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-foreground">{site.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Mail className="h-4 w-4 text-accent" />
                      <ExternalLink href={`mailto:${site.email}`}>
                        {site.email}
                      </ExternalLink>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Phone className="h-4 w-4 text-accent" />
                      <span className="text-foreground">{site.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <FaXTwitter className="h-4 w-4 text-accent" />
                      <ExternalLink href={site.links.x}>
                        @PrakashCollymo1
                      </ExternalLink>
                    </div>
                  </div>
                </div>

                {/* Currently status */}
                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                  <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    Currently
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <span className="text-foreground">{site.currently.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-accent" />
                      <span className="text-muted">Learning: {site.currently.learning}</span>
                    </div>
                    {site.currently.reading && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span className="text-muted">Reading: {site.currently.reading}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24">
          <Container className="py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="About"
                  title="Strong fundamentals, shipped outcomes."
                  description="I'm comfortable across systems and backend: building reliable core components, shipping APIs/services, and delivering clean developer and user-facing interfaces when required."
                />
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                    <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                      Technical skills
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <SkillGroup title="Languages" items={site.skills.languages} />
                      <SkillGroup title="Frameworks" items={site.skills.frameworks} />
                      <SkillGroup title="Infra & Tools" items={site.skills.infra} />
                      <SkillGroup title="Databases" items={site.skills.databases} />
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                    <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                      Education
                    </div>
                    <div className="mt-4">
                      {site.education.map((e) => (
                        <div key={e.school} className="space-y-1">
                          <div className="font-medium text-foreground">{e.school}</div>
                          <div className="text-sm text-muted">{e.degree}</div>
                          <div className="text-sm text-muted">
                            {e.date} · {e.location} · {e.meta}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <GitHubStatsCard username="ProgMastermind" />
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-24 border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-col gap-10">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Experience"
                  title="Shipping impactful engineering."
                  description="Focus areas: automation at scale, reliability, and system boundaries (process isolation, IPC, and performance)."
                />
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-6">
                {site.experience.map((e, i) => (
                  <ScrollReveal key={`${e.company}-${e.role}`} delay={i * 0.1}>
                    <ExperienceCard
                      company={e.company}
                      role={e.role}
                      date={e.date}
                      location={e.location}
                      bullets={e.bullets}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24 border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-col gap-10">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Projects"
                  title="Projects across systems, backend, and product building."
                  description="Selected work across consensus, kernels, runtime/GC internals, scheduling, distributed caching, and tooling."
                />
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {site.projects.map((p, i) => (
                  <ScrollReveal key={p.name} delay={i * 0.08}>
                    <ProjectCard
                      name={p.name}
                      tagline={p.tagline}
                      stack={p.stack}
                      highlights={p.highlights}
                      repoUrl={p.links.repo}
                      proofLine={p.proofLine}
                      caseStudyUrl={p.links.caseStudy}
                    />
                  </ScrollReveal>
                ))}
              </div>

            </div>
          </Container>
        </section>

        {/* BLOG */}
        <section id="blog" className="scroll-mt-24 border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-col gap-10">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Blog"
                  title="Writing that ships with the code."
                  description="Deep dives into systems engineering, distributed consensus, and kernel internals — written alongside the projects."
                />
              </ScrollReveal>

              {(site.links.writeups.rustOs || site.links.writeups.raft) && (
                <ScrollReveal delay={0.05}>
                  <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
                    <div className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                      Featured deep dives
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      {site.links.writeups.rustOs && (
                        <ExternalLink href={site.links.writeups.rustOs}>
                          Rust_OS: I wrote an OS in Rust
                        </ExternalLink>
                      )}
                      {site.links.writeups.raft && (
                        <ExternalLink href={site.links.writeups.raft}>
                          RaftEx: I built Raft consensus from scratch in Elixir
                        </ExternalLink>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.1}>
                <BlogSection username={site.blog.hashnodeUsername} />
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Contact"
                  title="Let's build something great."
                  description="If you're hiring for systems, backend, full‑stack, SDE, or Member of Technical Staff roles, I'd love to talk."
                />
              </ScrollReveal>

              <div className="space-y-8">
                <ScrollReveal delay={0.1}>
                  <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={`mailto:${site.email}`}>
                        <Mail className="h-4 w-4" />
                        {site.email}
                      </ButtonLink>
                      <ButtonLink
                        href={site.links.linkedin}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedinIn className="h-4 w-4" />
                        LinkedIn
                      </ButtonLink>
                      <ButtonLink
                        href={site.links.github}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub className="h-4 w-4" />
                        GitHub
                      </ButtonLink>
                    </div>

                    <div className="mt-8 text-sm leading-6 text-muted">
                      Prefer a quick context? Here&rsquo;s what I&rsquo;m looking for:
                      <ul className="mt-3 space-y-2">
                        <li className="flex gap-3">
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          Systems / distributed systems roles with ownership.
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          Teams that value correctness, observability, and performance.
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          Work that ships: tools, infra, kernels/runtimes, core services.
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <ContactForm />
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        <footer className="border-t border-border py-10">
          <Container className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <div>
              &copy; {new Date().getFullYear()} {site.name}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {nav.map((i) => (
                <a key={i.href} href={i.href} className="hover:text-foreground">
                  {i.label}
                </a>
              ))}
            </div>
          </Container>
        </footer>
      </main>
    </div>
  );
}

function SkillGroup(props: { title: string; items: readonly string[] }) {
  return (
    <div>
      <div className="text-sm font-medium text-foreground">{props.title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {props.items.map((s) => (
          <Badge key={s} className="bg-background">
            {s}
          </Badge>
        ))}
      </div>
    </div>
  );
}
