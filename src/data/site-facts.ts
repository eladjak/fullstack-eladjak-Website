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
 * Canonical size of Elad's production AI agent network.
 * Matches the truth-audited agent list in /guide (2026-07):
 * Claude Code, Kami, Kaylee, Box, Gardax (Hermes), Ranch, Solis, CrewAI,
 * Delegator, Adopter, Dashboard, Sailaco.
 */
export const AGENT_COUNT = 12;

/** Where the network runs today (the old Hetzner VPS was decommissioned 2026-06-29). */
export const SERVER_LABEL_HE = 'שרת Contabo פרטי';
export const SERVER_LABEL_EN = 'a private Contabo server';
