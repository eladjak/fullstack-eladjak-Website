// ─── Site-wide canonical facts ───────────────────────────────────────────────
// Single source of truth for facts that appear on multiple surfaces (meta
// descriptions, stats bar, JSON-LD, the chat bot's system prompt).
//
// Born from the 2026-07-10 staleness audit, which found FIVE different agent
// counts on the same site (3 / 9 / 10 / 12 / 13) and a dead Hetzner server
// still described as the network's core. Update HERE once — everything that
// imports from this file stays in sync.
//
// NOTE: messages/he.json + messages/en.json (FAQ, about) cannot import TS
// constants — when AGENT_COUNT changes, grep both files for the old number.

/**
 * Canonical count used across the site's copy for "the agent network".
 *
 * This is the number of agent-category GUIDES documented in /guide (2026-07),
 * NOT a literal headcount of the running fleet — the two overlap but are not
 * identical, so keep the distinction clear:
 *
 *   • 12 agents documented in /guide (the curated catalog this number tracks):
 *     Claude Code, Kami, Kaylee, Box, Gardax (Hermes), Ranch, Solis, CrewAI,
 *     Delegator, Adopter, Dashboard, Sailaco.
 *     (Claude Code / CrewAI / Delegator / Adopter / Dashboard are the
 *     frameworks, routers and UI layer that the fleet is built on, so they
 *     live in the guide catalog even though they aren't autonomous agents.)
 *
 *   • The real production fleet on Contabo is the autonomous set —
 *     Kami, Kaylee, Hermes/Gardax, Ranch, Box, Solis, plus the infra-layer
 *     agents Oracle/orchestrator-brain, output-guardian, gemini-leak-guard
 *     and autonomy-worker (each described in the relevant /guide entry).
 *
 * The "12" is what the marketing copy, FAQ, JSON-LD and llms.txt all cite,
 * so it stays the single source of truth for that figure.
 */
export const AGENT_COUNT = 12;

/** Where the network runs today (the old Hetzner VPS was decommissioned 2026-06-29). */
export const SERVER_LABEL_HE = 'שרת Contabo פרטי';
export const SERVER_LABEL_EN = 'a private Contabo server';
