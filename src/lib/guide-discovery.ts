export type GuideDiscoveryCategory = "all" | "agent" | "infra" | "pattern";

export interface GuideDiscoveryItem {
  slug: string;
  category?: Exclude<GuideDiscoveryCategory, "all">;
  agentName: string;
  agentNameHe: string;
  tagline: string;
  heroDescription: string;
  badgeText: string;
}

const categories: GuideDiscoveryCategory[] = ["all", "agent", "infra", "pattern"];

export function normalizeGuideDiscoveryQuery(query: string): string {
  return query.normalize("NFC").trim().toLowerCase();
}

/** Repeated URL fields use the first value, matching a single-choice form. */
export function firstGuideSearchParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function isGuideDiscoveryCategory(value: string): value is GuideDiscoveryCategory {
  return categories.includes(value as GuideDiscoveryCategory);
}

export function filterGuides<T extends GuideDiscoveryItem>(
  guides: T[],
  { query, category }: { query: string; category: string },
): T[] {
  const normalizedQuery = normalizeGuideDiscoveryQuery(query);
  const selectedCategory = isGuideDiscoveryCategory(category) ? category : "all";

  return guides.filter((guide) => {
    const matchesCategory =
      selectedCategory === "all" || (guide.category ?? "agent") === selectedCategory;
    const searchableText = normalizeGuideDiscoveryQuery([
      guide.agentName,
      guide.agentNameHe,
      guide.tagline,
      guide.heroDescription,
      guide.badgeText,
    ]
      .join(" "));

    return matchesCategory && searchableText.includes(normalizedQuery);
  });
}
