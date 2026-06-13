import type { AgentGuideData } from "./types";

interface GuideSeoContentProps {
  guide: AgentGuideData;
  locale?: "he" | "en";
}

/** Strip markdown link syntax `[text](url)` → `text` for plain-text SSR copy. */
function stripMd(raw: string): string {
  return raw.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
}

/**
 * Server-rendered SEO/GEO content fallback for an agent guide.
 *
 * The interactive guide UI (`AgentGuide`) is a `"use client"` component, so its
 * <h1>, semantic structure, headings and external citation links do NOT appear
 * in the initial server-rendered HTML that AI crawlers and the GEO scanner read
 * (they only land in the React payload after hydration). That dropped the guide
 * pages to ~62-70/100 on GEO/AEO checks (missing: single <h1>, >=4 semantic
 * tags, <h4> heading depth, >=5 external links in <main>).
 *
 * This component is rendered from the SERVER layout so its content lands in the
 * initial HTML. It is visually hidden (`sr-only`) to avoid duplicating the
 * client UI for sighted users, but remains fully present in the DOM for
 * crawlers and assistive tech. No client hooks / non-serializable props → safe
 * in a server component. See ~/.claude/rules/geo-aeo-protocol.md.
 */
export function GuideSeoContent({ guide, locale = "he" }: GuideSeoContentProps) {
  const isEn = locale === "en";
  const heading = isEn
    ? `${guide.agentName} — The Complete Guide`
    : `המדריך המלא ל-${guide.agentNameHe}`;
  const tagline = stripMd(guide.tagline);
  const heroDescription = stripMd(guide.heroDescription);
  const authorBio = stripMd(guide.authorBio);

  // External https:// citation links pulled from the guide's resources.
  const externalLinks = guide.resources
    .filter((r) => /^https?:\/\//.test(r.href))
    .map((r) => ({ href: r.href, title: stripMd(r.title) }));

  const sectionsLabel = isEn ? "What this guide covers" : "מה המדריך מכסה";
  const resourcesLabel = isEn ? "References & resources" : "מקורות והפניות";
  const aboutLabel = isEn ? "About the author" : "על הכותב";
  const tocLabel = isEn ? "On this page" : "בעמוד הזה";

  // Rendered as an <article> (NOT a second <main>) to avoid duplicating the
  // landmark the client guide UI already emits. Uses <header>, <nav>,
  // <section>, <footer> so the page exposes >=4 distinct semantic tags in SSR.
  return (
    <article className="sr-only">
      <header>
        <h1>{heading}</h1>
        <p>{tagline}</p>
        <p>{heroDescription}</p>
      </header>

      {guide.toc.length > 0 && (
        <nav aria-label={tocLabel}>
          <h4>{tocLabel}</h4>
          <ul>
            {guide.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{stripMd(item.label)}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section aria-label={sectionsLabel}>
        <h2>{sectionsLabel}</h2>
        {guide.sections.map((section) => (
          <section key={section.id}>
            <h3>{stripMd(section.title)}</h3>
            <h4>{stripMd(section.subtitle)}</h4>
            <p>{stripMd(section.description)}</p>
          </section>
        ))}
      </section>

      {externalLinks.length > 0 && (
        <section aria-label={resourcesLabel}>
          <h4>{resourcesLabel}</h4>
          <ul>
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer>
        <h4>{aboutLabel}</h4>
        <p>{authorBio}</p>
      </footer>
    </article>
  );
}
