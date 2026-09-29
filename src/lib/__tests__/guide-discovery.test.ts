import { describe, expect, it } from "vitest";
import {
  filterGuides,
  firstGuideSearchParam,
  normalizeGuideDiscoveryQuery,
  type GuideDiscoveryItem,
} from "@/lib/guide-discovery";

const guides: GuideDiscoveryItem[] = [
  {
    slug: "kami",
    category: "agent",
    agentName: "Kami",
    agentNameHe: "קאמי",
    tagline: "WhatsApp AI agent",
    heroDescription: "A practical WhatsApp assistant guide.",
    badgeText: "Agent · practical guide",
  },
  {
    slug: "docker",
    category: "infra",
    agentName: "Docker",
    agentNameHe: "דוקר",
    tagline: "Containers for reliable infrastructure",
    heroDescription: "Run services in containers.",
    badgeText: "Infrastructure · practical guide",
  },
  {
    slug: "autonomy",
    category: "pattern",
    agentName: "Autonomy",
    agentNameHe: "אוטונומיה",
    tagline: "A safe agent-network pattern",
    heroDescription: "Human approval stays in the loop.",
    badgeText: "Pattern · reference guide",
  },
];

describe("guide discovery", () => {
  it("uses the first repeated URL field and handles empty fields", () => {
    expect(firstGuideSearchParam(["docker", "kami"])).toBe("docker");
    expect(firstGuideSearchParam([])).toBe("");
    expect(firstGuideSearchParam(undefined)).toBe("");
  });

  it("normalizes equivalent Unicode forms consistently", () => {
    expect(normalizeGuideDiscoveryQuery("CAFÉ")).toBe(normalizeGuideDiscoveryQuery("cafe\u0301"));
  });

  it("returns an explicit empty result for a missing term", () => {
    expect(filterGuides(guides, { query: "no-such-guide-20260915", category: "all" })).toEqual([]);
  });
  it("normalizes search terms before matching", () => {
    expect(normalizeGuideDiscoveryQuery("  DOCKER  ")).toBe("docker");
  });

  it("finds a guide by its localized name and respects the selected category", () => {
    expect(filterGuides(guides, { query: "דוקר", category: "infra" })).toEqual([
      guides[1],
    ]);
    expect(filterGuides(guides, { query: "דוקר", category: "agent" })).toEqual([]);
  });

  it("matches useful reference text, not only the title", () => {
    expect(filterGuides(guides, { query: "approval", category: "all" })).toEqual([
      guides[2],
    ]);
  });

  it("does not treat an unknown category as a valid filter", () => {
    expect(filterGuides(guides, { query: "", category: "unknown" })).toEqual(guides);
  });
});
