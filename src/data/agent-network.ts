// ─── Agent-network nodes for the cinematic hero (NetworkCanvas) ──────────────
// The named fleet Elad runs 24/7 on his private Contabo server, cast as nodes
// for the hero's "network → living system" sequence. Names + one-line roles per
// rules/elad-post-rules.md ("each agent = a character with a name and one job").
//
// This is the RUNTIME fleet framing (not the /guide catalog): the autonomous
// agents + the reliability/infra guards that the audit flagged as the real
// production fleet. AGENT_COUNT (site-facts.ts) stays the canonical marketing
// figure; this list is the visual cast for the decorative hero only.

export interface AgentNode {
  id: string;
  /** Short display name (Hebrew where the agent has a Hebrew persona). */
  label: string;
  labelEn: string;
  /** One-line role — the emotional hook. */
  role: string;
  roleEn: string;
  /** Hex color (no #) — reuses the site's category palette family. */
  color: string;
}

export const AGENT_NODES: AgentNode[] = [
  { id: 'kami', label: 'קאמי', labelEn: 'Kami', role: 'מנטור ה-WhatsApp', roleEn: 'WhatsApp mentor', color: '#A855F7' },
  { id: 'kaylee', label: 'קיילי', labelEn: 'Kaylee', role: 'תחזוקת שרת', roleEn: 'server maintenance', color: '#3B82F6' },
  { id: 'hermes', label: 'הרמס', labelEn: 'Hermes', role: 'בנייה וויזואל', roleEn: 'build & visuals', color: '#06B6D4' },
  { id: 'ranch', label: "ראנץ'", labelEn: 'Ranch', role: 'תוכן', roleEn: 'content', color: '#F43F5E' },
  { id: 'box', label: 'בוקס', labelEn: 'Box', role: 'מאמן אישי', roleEn: 'personal coach', color: '#F97316' },
  { id: 'solis', label: 'סוליס', labelEn: 'Solis', role: 'אנרגיה', roleEn: 'energy', color: '#10B981' },
  { id: 'oracle', label: 'אורקל', labelEn: 'Oracle', role: 'מוח-תזמור', roleEn: 'orchestrator brain', color: '#A855F7' },
  { id: 'guardian', label: 'שומר-תוצר', labelEn: 'Output-Guardian', role: 'אימות תוצרים', roleEn: 'result verification', color: '#10B981' },
  { id: 'leakguard', label: 'שומר-דליפות', labelEn: 'Leak-Guard', role: 'הגנת סודות', roleEn: 'secret protection', color: '#F43F5E' },
  { id: 'autonomy', label: 'עובד-אוטונומי', labelEn: 'Autonomy-Worker', role: 'ביצוע משימות', roleEn: 'task execution', color: '#3B82F6' },
  { id: 'gateway', label: 'שער-מודלים', labelEn: 'Model-Gateway', role: 'ניתוב LLM אחיד', roleEn: 'unified LLM gateway', color: '#06B6D4' },
  { id: 'memory', label: 'ליבת-זיכרון', labelEn: 'Memory-Kernel', role: 'זיכרון משותף', roleEn: 'shared memory', color: '#F97316' },
];
