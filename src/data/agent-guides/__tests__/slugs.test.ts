import { describe, expect, it } from "vitest";
import { allGuides } from "..";
import { allGuidesEn } from "../en";
import { GUIDE_SLUGS, GUIDE_SLUG_SET } from "../slugs";

/**
 * GUIDE_SLUGS is duplicated from the guide data on purpose (the edge proxy
 * cannot import the content). These tests are what stop the copy from rotting:
 * add or remove a guide without updating slugs.ts and CI goes red, instead of
 * the route silently 404ing a real guide or 200ing a dead one.
 */
const routable = (guides: { slug: string }[]) =>
  guides.map((g) => g.slug).filter((s) => s !== "claude-code");

describe("GUIDE_SLUGS", () => {
  it("matches the routable Hebrew guides exactly", () => {
    expect([...GUIDE_SLUGS].sort()).toEqual(routable(allGuides).sort());
  });

  it("matches the routable English guides exactly", () => {
    expect([...GUIDE_SLUGS].sort()).toEqual(routable(allGuidesEn).sort());
  });

  it("excludes the retired claude-code route", () => {
    expect(GUIDE_SLUG_SET.has("claude-code")).toBe(false);
  });

  it("has no duplicates", () => {
    expect(GUIDE_SLUG_SET.size).toBe(GUIDE_SLUGS.length);
  });
});
